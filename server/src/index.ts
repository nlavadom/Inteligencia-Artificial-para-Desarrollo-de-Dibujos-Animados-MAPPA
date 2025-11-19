import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db/connection.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import drawingRoutes from './routes/drawings.js';
import chatRoutes from './routes/chat.js';
import processRoutes from './routes/processes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate critical environment variables
const validateEnv = () => {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing: string[] = [];
  
  required.forEach(key => {
    if (!process.env[key] || process.env[key] === 'your-secret-key') {
      missing.push(key);
    }
  });
  
  if (missing.length > 0) {
    console.error('❌ ERROR: Variables de entorno faltantes o inválidas:');
    missing.forEach(key => {
      console.error(`   - ${key}`);
    });
    console.error('\nPor favor, configura estas variables en tu archivo .env');
    process.exit(1);
  }
  
  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.warn('⚠️  ADVERTENCIA: JWT_SECRET debería tener al menos 32 caracteres para mayor seguridad');
  }
};

validateEnv();

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 5000;
const MAX_PORT_RETRIES = 5;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drawings', drawingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/processes', processRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server with automatic port retry if occupied
const startServer = (port: number, attempt = 0) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE' && attempt < MAX_PORT_RETRIES) {
      const nextPort = port + 1;
      console.warn(`⚠️  Port ${port} is busy. Retrying on port ${nextPort}...`);
      setTimeout(() => startServer(nextPort, attempt + 1), 500);
    } else {
      console.error('❌ Unable to start server:', error);
      process.exit(1);
    }
  });
};

startServer(DEFAULT_PORT);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  await pool.end();
  process.exit(0);
});

