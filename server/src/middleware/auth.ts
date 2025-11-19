import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: string;
}

// Validate JWT_SECRET is configured
const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === 'your-secret-key') {
    throw new Error('JWT_SECRET no está configurado. Configure la variable de entorno JWT_SECRET.');
  }
  return secret;
};

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, getJwtSecret()) as any;
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error: any) {
    // Distinguish between different JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado', 
        expired: true 
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Token inválido' 
      });
    }
    if (error.message?.includes('JWT_SECRET')) {
      console.error('JWT_SECRET configuration error:', error);
      return res.status(500).json({ 
        error: 'Error de configuración del servidor' 
      });
    }
    return res.status(401).json({ error: 'Error al verificar token' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

