# MAPPA Kids - Plataforma Educativa para Niños

Plataforma educativa interactiva que permite a los niños crear historias mágicas a partir de sus dibujos usando inteligencia artificial.

## 🚀 Características

- **Autenticación de usuarios** (Niños, Padres/Tutores, Administradores)
- **Subida de dibujos** con procesamiento de imágenes
- **Chat interactivo** con personajes virtuales
- **Procesamiento IA** para crear historias a partir de dibujos
- **Gestión de perfil** y estadísticas de usuario

## 🛠️ Tecnologías

### Frontend
- React 18 con TypeScript
- Vite
- React Router
- Tailwind CSS
- Radix UI

### Backend
- Node.js con Express
- TypeScript
- PostgreSQL (Neon)
- JWT para autenticación
- Multer para uploads

### DevOps
- Docker & Docker Compose
- Jenkins CI/CD
- Nginx para producción

## 📋 Requisitos Previos

- Node.js 20+
- npm o yarn
- PostgreSQL (Neon o local)
- Docker (opcional, para despliegue)

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd "MAPPAKids react"
```

### 2. Configurar Base de Datos

1. Crear una base de datos en Neon (https://neon.tech) o usar PostgreSQL local
2. Ejecutar el script SQL:

```bash
psql <DATABASE_URL> -f mappa_kids.sql
```

O desde la consola de Neon, copiar y ejecutar el contenido de `mappa_kids.sql`.

### 3. Configurar Backend

```bash
cd server
npm install
cp .env.example .env
```

Editar `server/.env` con tus credenciales:

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

### 4. Configurar Frontend

```bash
# Desde la raíz del proyecto
npm install
cp .env.example .env
```

Editar `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃 Ejecución

### Desarrollo

#### Backend
```bash
cd server
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

#### Frontend
```bash
# Desde la raíz
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Producción con Docker

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

## 📁 Estructura del Proyecto

```
.
├── server/                 # Backend API
│   ├── src/
│   │   ├── db/            # Conexión a base de datos
│   │   ├── middleware/    # Middleware (auth, etc.)
│   │   ├── routes/        # Rutas de la API
│   │   └── index.ts       # Punto de entrada
│   ├── Dockerfile
│   └── package.json
├── src/                    # Frontend React
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   ├── services/          # Servicios API
│   └── main.tsx           # Punto de entrada
├── docker-compose.yml
├── Dockerfile.frontend
├── Jenkinsfile
└── mappa_kids.sql         # Esquema de base de datos
```

## 🔐 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/users/me` - Obtener perfil actual
- `PUT /api/users/me` - Actualizar perfil
- `GET /api/users/me/stats` - Obtener estadísticas

### Dibujos
- `POST /api/drawings` - Subir dibujo
- `GET /api/drawings` - Listar dibujos del usuario
- `GET /api/drawings/:id` - Obtener dibujo específico
- `DELETE /api/drawings/:id` - Eliminar dibujo

### Chat
- `POST /api/chat/sessions` - Crear sesión de chat
- `GET /api/chat/sessions` - Listar sesiones
- `GET /api/chat/sessions/:id/messages` - Obtener mensajes
- `POST /api/chat/sessions/:id/messages` - Enviar mensaje
- `PATCH /api/chat/sessions/:id/close` - Cerrar sesión

### Procesos IA
- `GET /api/processes/types` - Obtener tipos de proceso
- `POST /api/processes` - Crear proceso IA
- `GET /api/processes` - Listar procesos
- `GET /api/processes/:id` - Obtener proceso específico
- `GET /api/processes/:id/results` - Obtener resultados

## 🧪 Testing

```bash
# Backend
cd server
npm test

# Frontend
npm test
```

## 🚢 Despliegue

### Con Jenkins

1. Configurar Jenkins con el `Jenkinsfile` incluido
2. Configurar variables de entorno en Jenkins:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `DOCKER_REGISTRY` (opcional)

### Manual

1. Construir imágenes Docker:
```bash
docker build -t mappa-kids-backend ./server
docker build -t mappa-kids-frontend -f Dockerfile.frontend .
```

2. Ejecutar con docker-compose:
```bash
docker-compose up -d
```

## 🔒 Seguridad

- Las contraseñas se hashean con bcrypt
- Autenticación JWT
- Validación de entrada con express-validator
- CORS configurado
- Variables de entorno para secretos

## 📝 Notas

- Asegúrate de cambiar `JWT_SECRET` en producción
- Los archivos subidos se guardan en `server/uploads/`
- La base de datos usa PostgreSQL con compatibilidad Neon

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y propietario.

## 👥 Autores

- Equipo MAPPA Kids

## 🙏 Agradecimientos

- Neon por el servicio de PostgreSQL
- La comunidad de React y Node.js

prueba de jenkins.