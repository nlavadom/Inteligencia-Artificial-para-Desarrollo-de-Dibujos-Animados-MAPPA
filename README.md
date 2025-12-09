# MAPPA Kids - Plataforma Educativa para Niños

Plataforma educativa interactiva que permite a los niños crear historias mágicas a partir de sus dibujos usando inteligencia artificial.

## 🚀 Características

- **Autenticación de usuarios** (Niños, Padres/Tutores, Administradores)
- **Subida de dibujos** con procesamiento de imágenes
- **Chat interactivo** con personajes virtuales
- **Procesamiento IA** para crear historias a partir de dibujos
- **Gestión de perfil** y estadísticas de usuario

## 🛠️ Tecnologías

### Tecnologías
- React 18 con TypeScript
- Vite hola buenas buenas holas
- React Router
- Tailwind CSS
- Radix UI
- PostgreSQL (Neon) - Base de datos serverless


## 📋 Requisitos Previos

- Node.js 20+
- npm o yarn


## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd "MAPPAKids react"
```

### 2. Configurar Base de Datos (Neon)

El proyecto utiliza Neon PostgreSQL directamente desde el frontend. Asegúrate de tener una cuenta de Neon configurada.

### 3. Configurar Variables de Entorno


### 4. Configurar Frontend

```bash
# Desde la raíz del proyecto
npm install
cp .env.example .env
```

Editar `.env` con las variables necesarias para tu configuración de Neon.


## 🏃 Ejecución

## 🏃 Ejecución

### Desarrollo

```bash
# Desde la raíz
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`




## 📁 Estructura del Proyecto

```
.
├── src/                    # Frontend React
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   ├── services/          # Servicios API
│   └── main.tsx           # Punto de entrada
├── Dockerfile.frontend
├── Jenkinsfile
└── mappa_kids.sql         # Esquema de base de datos
```




## 🧪 Testing

## 🧪 Testing

```bash
npm test
```


## 🚢 Despliegue

## 🚢 Despliegue

### Vercel (Recomendado)

El proyecto está optimizado para desplegarse en [Vercel](https://vercel.com).
Simplemente conecta tu repositorio de GitHub a Vercel y el despliegue será automático.

### Con Jenkins

Configura el pipeline usando el `Jenkinsfile` incluido. Este pipeline ejecutará los tests y verificará el build.


## 🔒 Seguridad

- Autenticación segura (Client-side/Neon)
- Variables de entorno para secretos


## 📝 Notas

- La base de datos usa Neon (PostgreSQL serverless)


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