# Guía de Despliegue - MAPPA Kids

## Pre-requisitos

1. Base de datos Neon configurada
2. Variables de entorno configuradas
3. Docker instalado (para despliegue con Docker)

## Configuración de Base de Datos (Neon)

1. Crear proyecto en Neon: https://neon.tech
2. Obtener connection string
3. Ejecutar el script SQL:

```bash
psql "<CONNECTION_STRING>" -f mappa_kids.sql
```

O desde el dashboard de Neon, ejecutar el contenido de `mappa_kids.sql`.

## Variables de Entorno

### Backend (`server/.env`)

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (`.env`)

```env
VITE_API_URL=https://your-api-domain.com/api
```

## Despliegue con Docker

### Desarrollo Local

```bash
# Backend
cd server
npm install
npm run dev

# Frontend (en otra terminal)
npm install
npm run dev
```

### Producción con Docker Compose

1. Configurar variables de entorno en `docker-compose.yml` o usar archivo `.env`

2. Construir y ejecutar:

```bash
docker-compose up -d
```

3. Verificar que los servicios estén corriendo:

```bash
docker-compose ps
```

4. Ver logs:

```bash
docker-compose logs -f
```

## Despliegue con Jenkins

### Configuración de Jenkins

1. Crear un nuevo pipeline job
2. Configurar el repositorio Git
3. Configurar variables de entorno en Jenkins:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `DOCKER_REGISTRY` (opcional)

4. El `Jenkinsfile` incluido manejará:
   - Instalación de dependencias
   - Linting (si está configurado)
   - Build de frontend y backend
   - Construcción de imágenes Docker
   - Push a registry (opcional)
   - Despliegue (configurar según tu infraestructura)

### Pipeline Stages

1. **Checkout**: Clona el código
2. **Install Dependencies**: Instala dependencias de frontend y backend
3. **Lint & Test**: Ejecuta linters y tests
4. **Build**: Compila frontend y backend
5. **Docker Build**: Construye imágenes Docker
6. **Docker Push**: Sube imágenes al registry (solo en main/master)
7. **Deploy**: Despliega la aplicación (configurar según necesidad)

## Despliegue Manual

### Backend

```bash
cd server
npm install
npm run build
npm start
```

### Frontend

```bash
npm install
npm run build
# Servir con nginx o cualquier servidor estático
```

## Verificación Post-Despliegue

1. Health check del backend:
```bash
curl http://localhost:5000/health
```

2. Verificar que el frontend carga correctamente

3. Probar autenticación:
   - Registrar un usuario
   - Iniciar sesión
   - Verificar token JWT

## Troubleshooting

### Error de conexión a base de datos

- Verificar `DATABASE_URL` en `.env`
- Verificar que la base de datos esté accesible
- Verificar firewall/red

### Error de autenticación

- Verificar `JWT_SECRET` está configurado
- Verificar que el token se esté enviando correctamente

### Error de CORS

- Verificar `FRONTEND_URL` en backend `.env`
- Verificar que el frontend esté usando la URL correcta

### Archivos no se suben

- Verificar permisos del directorio `server/uploads/`
- Verificar configuración de multer

## Monitoreo

- Logs de aplicación: `docker-compose logs -f`
- Health checks: `/health` endpoint
- Base de datos: Monitorear desde dashboard de Neon

## Seguridad en Producción

1. ✅ Cambiar `JWT_SECRET` a un valor seguro y único
2. ✅ Usar HTTPS en producción
3. ✅ Configurar CORS correctamente
4. ✅ Validar todas las entradas
5. ✅ Limitar tamaño de archivos subidos
6. ✅ Implementar rate limiting
7. ✅ Usar variables de entorno para secretos
8. ✅ No commitear `.env` files

