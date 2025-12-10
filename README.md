# MAPPA Kids - Plataforma Educativa para Niños

Plataforma educativa interactiva que permite a los niños crear historias mágicas a partir de sus dibujos usando inteligencia artificial. Esta aplicación es **Frontend-Only** y se conecta directamente a servicios en la nube.

## 🚀 Características

- **Autenticación de usuarios** (Niños, Padres/Tutores, Administradores)
- **Subida de dibujos** con procesamiento de imágenes
- **Chat interactivo** con personajes virtuales (Logic-based AI)
- **Procesamiento IA** para crear historias a partir de dibujos
- **Gestión de perfil** y estadísticas de usuario

## 🛠️ Tecnologías

### Frontend & Lógica
- **React 18** con TypeScript
- **Vite** (Build tool)
- **Tailwind CSS** (Estilos)
- **Radix UI** (Componentes accesibles)
- **Tau Prolog** (IA Lógica en el navegador)

### Backend & Datos (Serverless)
- **Neon** (PostgreSQL Serverless) - Base de datos
- **Firebase Hosting** / **Vercel** - Despliegue y CDN Global

## 📋 Requisitos Previos

- Node.js 20+
- npm o yarn

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/nlavadom/Inteligencia-Artificial-para-Desarrollo-de-Dibujos-Animados-MAPPA.git
cd "MAPPAKids react"
```

### 2. Configurar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` basado en `.env.example` y configura tus credenciales de Neon PostgreSQL.

## 🏃 Ejecución

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
.
├── src/                    # Frontend React
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   ├── services/          # Servicios API (Directo a Neon)
│   └── main.tsx           # Punto de entrada
├── .github/workflows/      # CI/CD (Firebase & Tests)
├── firebase.json          # Configuración de Firebase
├── Jenkinsfile            # Pipeline de Tests (Legacy/Backup)
└── mappa_kids.sql         # Esquema de base de datos
```

## 🧪 Testing

```bash
npm test
```

## 🚢 Despliegue (CI/CD)

Este proyecto cuenta con un pipeline de despliegue automatizado moderno:

### 1. GitHub Actions + Firebase (Producción)
Cada vez que se hace un `push` a la rama `main`, GitHub Actions:
1. Instala dependencias.
2. Construye la aplicación (`npm run build`).
3. Despliega automáticamente a **Firebase Hosting** (Google Cloud).

### 2. Vercel (CD Alternativo)
Conectado al repositorio, despliega automáticamente en cada push.
link del despliegue: https://mappa-kidsia.vercel.app/

### 3. Jenkins (CI)
Usado para ejecución de pruebas automatizadas y validación de calidad de código.

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