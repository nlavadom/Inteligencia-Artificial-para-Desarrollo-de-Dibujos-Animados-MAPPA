import express from 'express';
import multer from 'multer';
import { query } from '../db/connection.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs/promises';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = 'uploads/drawings';
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `drawing-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (JPEG, JPG, PNG, GIF)'));
    }
  }
});

// Upload drawing
router.post('/', authenticate, upload.single('drawing'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    const { descripcion } = req.body;
    const rutaArchivo = `/uploads/drawings/${req.file.filename}`;

    const result = await query(
      'INSERT INTO dibujo (id_usuario, ruta_archivo, descripcion) VALUES ($1, $2, $3) RETURNING *',
      [req.userId, rutaArchivo, descripcion || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error('Upload drawing error:', error);
    res.status(500).json({ error: 'Error al subir dibujo' });
  }
});

// Get user drawings
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'SELECT * FROM dibujo WHERE id_usuario = $1 ORDER BY fecha_subida DESC',
      [req.userId]
    );

    res.json(result.rows);
  } catch (error: any) {
    console.error('Get drawings error:', error);
    res.status(500).json({ error: 'Error al obtener dibujos' });
  }
});

// Get drawing by ID
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'SELECT * FROM dibujo WHERE id_dibujo = $1 AND id_usuario = $2',
      [req.params.id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dibujo no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    console.error('Get drawing error:', error);
    res.status(500).json({ error: 'Error al obtener dibujo' });
  }
});

// Delete drawing
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'DELETE FROM dibujo WHERE id_dibujo = $1 AND id_usuario = $2 RETURNING *',
      [req.params.id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dibujo no encontrado' });
    }

    // Delete file
    const rutaArchivo = result.rows[0].ruta_archivo;
    try {
      await fs.unlink(path.join(process.cwd(), rutaArchivo));
    } catch (fileError) {
      console.warn('Could not delete file:', rutaArchivo);
    }

    res.json({ message: 'Dibujo eliminado' });
  } catch (error: any) {
    console.error('Delete drawing error:', error);
    res.status(500).json({ error: 'Error al eliminar dibujo' });
  }
});

export default router;

