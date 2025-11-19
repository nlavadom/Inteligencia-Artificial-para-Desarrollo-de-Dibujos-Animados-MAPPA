import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { query } from '../db/connection.js';

const router = express.Router();

// Validate JWT_SECRET is configured
const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === 'your-secret-key') {
    throw new Error('JWT_SECRET no está configurado. Configure la variable de entorno JWT_SECRET.');
  }
  return secret;
};

// Register
router.post('/register', [
  body('nombre').trim().isLength({ min: 1 }).withMessage('Nombre requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Contraseña debe tener al menos 6 caracteres'),
  body('rol').optional().isIn(['NIÑO', 'PADRE', 'ADMIN']).withMessage('Rol inválido'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, password, rol = 'NIÑO', id_padre } = req.body;

    // Check if user exists
    const existingUser = await query('SELECT id_usuario FROM usuario WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const result = await query(
      'INSERT INTO usuario (nombre, email, password_hash, rol, id_padre) VALUES ($1, $2, $3, $4, $5) RETURNING id_usuario, nombre, email, rol',
      [nombre, email, passwordHash, rol, id_padre || null]
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign(
      { userId: user.id_usuario, role: user.rol },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      },
      token
    });
  } catch (error: any) {
    console.error('Register error:', error);
    
    // Handle JWT_SECRET error specifically
    if (error.message?.includes('JWT_SECRET')) {
      return res.status(500).json({ error: 'Error de configuración del servidor' });
    }
    
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Contraseña requerida'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const result = await query(
      'SELECT id_usuario, nombre, email, password_hash, rol FROM usuario WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id_usuario, role: user.rol },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      },
      token
    });
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Handle JWT_SECRET error specifically
    if (error.message.includes('JWT_SECRET')) {
      return res.status(500).json({ error: 'Error de configuración del servidor' });
    }
    
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Verify token endpoint (optional but useful)
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, getJwtSecret()) as any;
    
    res.json({
      valid: true,
      userId: decoded.userId,
      role: decoded.role
    });
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado', expired: true });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    res.status(401).json({ error: 'Error al verificar token' });
  }
});

export default router;

