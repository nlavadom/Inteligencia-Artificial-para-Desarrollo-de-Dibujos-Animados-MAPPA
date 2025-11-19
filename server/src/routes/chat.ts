import express from 'express';
import { query } from '../db/connection.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Create chat session
router.post('/sessions', authenticate, async (req: AuthRequest, res) => {
  try {
    const { titulo } = req.body;

    const result = await query(
      'INSERT INTO sesion_chat (id_usuario, titulo) VALUES ($1, $2) RETURNING *',
      [req.userId, titulo || 'Nueva conversación']
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error('Create session error:', error);
    res.status(500).json({ error: 'Error al crear sesión' });
  }
});

// Get user chat sessions
router.get('/sessions', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'SELECT * FROM sesion_chat WHERE id_usuario = $1 ORDER BY fecha_inicio DESC',
      [req.userId]
    );

    res.json(result.rows);
  } catch (error: any) {
    console.error('Get sessions error:', error);
    res.status(500).json({ error: 'Error al obtener sesiones' });
  }
});

// Get session messages
router.get('/sessions/:sessionId/messages', authenticate, async (req: AuthRequest, res) => {
  try {
    // Verify session belongs to user
    const sessionCheck = await query(
      'SELECT id_sesion FROM sesion_chat WHERE id_sesion = $1 AND id_usuario = $2',
      [req.params.sessionId, req.userId]
    );

    if (sessionCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Sesión no encontrada' });
    }

    const result = await query(
      'SELECT * FROM mensaje WHERE id_sesion = $1 ORDER BY fecha_envio ASC',
      [req.params.sessionId]
    );

    res.json(result.rows);
  } catch (error: any) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

// Send message
router.post('/sessions/:sessionId/messages', authenticate, async (req: AuthRequest, res) => {
  try {
    const { texto, id_dibujo, id_resultado } = req.body;

    // Verify session belongs to user
    const sessionCheck = await query(
      'SELECT id_sesion FROM sesion_chat WHERE id_sesion = $1 AND id_usuario = $2',
      [req.params.sessionId, req.userId]
    );

    if (sessionCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Sesión no encontrada' });
    }

    const result = await query(
      'INSERT INTO mensaje (id_sesion, autor, texto, id_dibujo, id_resultado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.params.sessionId, 'usuario', texto, id_dibujo || null, id_resultado || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

// Close session
router.patch('/sessions/:sessionId/close', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'UPDATE sesion_chat SET fecha_fin = NOW() WHERE id_sesion = $1 AND id_usuario = $2 RETURNING *',
      [req.params.sessionId, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sesión no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    console.error('Close session error:', error);
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
});

export default router;

