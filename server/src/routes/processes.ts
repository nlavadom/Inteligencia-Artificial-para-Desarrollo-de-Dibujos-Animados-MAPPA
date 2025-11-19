import express from 'express';
import { query } from '../db/connection.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get process types
router.get('/types', async (req, res) => {
  try {
    const result = await query('SELECT * FROM tipo_proceso ORDER BY id_tipo_proceso');
    res.json(result.rows);
  } catch (error: any) {
    console.error('Get process types error:', error);
    res.status(500).json({ error: 'Error al obtener tipos de proceso' });
  }
});

// Create AI process
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id_dibujo, id_tipo_proceso, parametros } = req.body;

    // Verify drawing belongs to user
    const drawingCheck = await query(
      'SELECT id_dibujo FROM dibujo WHERE id_dibujo = $1 AND id_usuario = $2',
      [id_dibujo, req.userId]
    );

    if (drawingCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Dibujo no encontrado' });
    }

    const result = await query(
      'INSERT INTO proceso_ia (id_dibujo, id_tipo_proceso, parametros, estado) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_dibujo, id_tipo_proceso, JSON.stringify(parametros || {}), 'pendiente']
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error('Create process error:', error);
    res.status(500).json({ error: 'Error al crear proceso' });
  }
});

// Get user processes
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      `SELECT p.*, d.ruta_archivo, tp.nombre as tipo_nombre 
       FROM proceso_ia p
       JOIN dibujo d ON p.id_dibujo = d.id_dibujo
       JOIN tipo_proceso tp ON p.id_tipo_proceso = tp.id_tipo_proceso
       WHERE d.id_usuario = $1
       ORDER BY p.fecha_inicio DESC`,
      [req.userId]
    );

    res.json(result.rows);
  } catch (error: any) {
    console.error('Get processes error:', error);
    res.status(500).json({ error: 'Error al obtener procesos' });
  }
});

// Get process by ID
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      `SELECT p.*, d.ruta_archivo, tp.nombre as tipo_nombre 
       FROM proceso_ia p
       JOIN dibujo d ON p.id_dibujo = d.id_dibujo
       JOIN tipo_proceso tp ON p.id_tipo_proceso = tp.id_tipo_proceso
       WHERE p.id_proceso = $1 AND d.id_usuario = $2`,
      [req.params.id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proceso no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    console.error('Get process error:', error);
    res.status(500).json({ error: 'Error al obtener proceso' });
  }
});

// Get process results
router.get('/:id/results', authenticate, async (req: AuthRequest, res) => {
  try {
    // Verify process belongs to user
    const processCheck = await query(
      `SELECT p.id_proceso 
       FROM proceso_ia p
       JOIN dibujo d ON p.id_dibujo = d.id_dibujo
       WHERE p.id_proceso = $1 AND d.id_usuario = $2`,
      [req.params.id, req.userId]
    );

    if (processCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Proceso no encontrado' });
    }

    const result = await query(
      'SELECT * FROM resultado WHERE id_proceso = $1 ORDER BY fecha_creacion DESC',
      [req.params.id]
    );

    res.json(result.rows);
  } catch (error: any) {
    console.error('Get results error:', error);
    res.status(500).json({ error: 'Error al obtener resultados' });
  }
});

export default router;

