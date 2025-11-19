import express from 'express';
import { query } from '../db/connection.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get current user profile
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'SELECT id_usuario, nombre, email, rol, fecha_registro FROM usuario WHERE id_usuario = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// Update user profile
router.put('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const { nombre, email } = req.body;

    const result = await query(
      'UPDATE usuario SET nombre = COALESCE($1, nombre), email = COALESCE($2, email) WHERE id_usuario = $3 RETURNING id_usuario, nombre, email, rol',
      [nombre, email, req.userId]
    );

    res.json(result.rows[0]);
  } catch (error: any) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Get user statistics
router.get('/me/stats', authenticate, async (req: AuthRequest, res) => {
  try {
    const [drawings, sessions, processes] = await Promise.all([
      query('SELECT COUNT(*) as count FROM dibujo WHERE id_usuario = $1', [req.userId]),
      query('SELECT COUNT(*) as count FROM sesion_chat WHERE id_usuario = $1', [req.userId]),
      query('SELECT COUNT(*) as count FROM proceso_ia WHERE id_dibujo IN (SELECT id_dibujo FROM dibujo WHERE id_usuario = $1)', [req.userId])
    ]);

    res.json({
      historias_creadas: parseInt(drawings.rows[0].count),
      sesiones_chat: parseInt(sessions.rows[0].count),
      procesos_ia: parseInt(processes.rows[0].count)
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

export default router;

