# Guía Técnica: Arquitectura y DevOps de MAPPA Kids

Este documento explica **cómo funcionan** las tecnologías integradas en el proyecto, enfocándose en la infraestructura, despliegue y flujo de datos, más allá de la funcionalidad de la aplicación.

---

## 1. Arquitectura General: "Frontend-First / Serverless"

El proyecto sigue una arquitectura moderna donde **no existe un servidor backend tradicional** (como Node.js/Express corriendo en un servidor). En su lugar, el Frontend se comunica directamente con servicios en la nube gestionados (Serverless).

**Diagrama Mental:**
`Usuario (Navegador)` <--> `CDN (Firebase/Vercel)` <--> `Base de Datos (Neon)`

---

## 2. Tecnologías y Herramientas

### A. Frontend (El Motor)
- **React + Vite**:
    - **Vite** no es solo un servidor de desarrollo. Su función crítica aquí es el **Build System**.
    - Cuando ejecutamos `npm run build`, Vite toma todo el código React, TypeScript e imágenes y lo "comprime" en archivos HTML/JS/CSS estáticos súper ligeros (carpeta `dist`).
    - **Por qué funciona en la nube:** Porque el resultado final son archivos estáticos que no necesitan lógica de servidor para "servirse".

### B. Base de Datos (Neon)
- **PostgreSQL Serverless**:
    - A diferencia de un Postgres normal que requiere un servidor encendido 24/7, Neon separa el almacenamiento del cómputo.
    - **Conexión Directa:** Usamos un driver especial (`neondatabase/serverless`) que permite al navegador conectarse a la DB vía **WebSockets** seguros. Esto elimina la necesidad de una API intermedia para consultas simples.

---

## 3. DevOps: El Pipeline CI/CD

El proyecto utiliza un enfoque de **Multi-Pipeline** para garantizar la calidad y disponibilidad. Tenemos 3 herramientas trabajando en paralelo o por fases.

### Flujo de Trabajo (Workflow)

1.  **Developer** hace `git push` a la rama `main` en GitHub.
2.  **GitHub** recibe el código y dispara automáticamente eventos (Webhooks).

### Herramienta 1: Jenkins (CI - Integración Continua)
*   **Función:** Guardián de Calidad.
*   **Ubicación:** Servidor Local / On-Premise.
*   **Cómo funciona:**
    - Detecta cambios en GitHub (vía Polling o Webhook).
    - Descarga el código fresco.
    - Ejecuta `npm install` (prepara entorno).
    - Ejecuta `npm test` (corre pruebas unitarias con Vitest).
    - **Resultado:** Si falla, avisa al desarrollador. No despliega nada. Su trabajo es asegurar que el código no rompe nada.

### Herramienta 2: GitHub Actions + Firebase (CD - Despliegue Continuo)
*   **Función:** Despliegue a Producción (Google Cloud).
*   **Ubicación:** Nube de GitHub y Google.
*   **Cómo funciona:**
    - Archivo: `.github/workflows/firebase-hosting-merge.yml`.
    - Al hacer push, GitHub "presta" una computadora virtual (Runner).
    - Instala dependencias y construye la app (`npm run build`).
    - Usa las credenciales secretas (`FIREBASE_SERVICE_ACCOUNT`) para subir la carpeta `dist` a los servidores de Google.
    - **Resultado:** La web se actualiza mundialmente en segundos.

### Herramienta 3: Vercel (CD - Despliegue Alternativo)
*   **Función:** Backup / Entorno de Preview.
*   **Cómo funciona:**
    - Vercel está conectado directamente a la repo.
    - Al detectar el push, Vercel clona y construye el sitio en su propia infraestructura.
    - **Diferencia:** Es completamente automático y "caja negra" (zero config).

---

## 4. Nube e Infraestructura (Cloud)

### Google Cloud (Firebase Hosting)
- **CDN Global:** Cuando subimos los archivos, Google los copia en cientos de servidores alrededor del mundo.
- **Atomic Deploys:** Si subes una nueva versión y está rota, puedes volver a la versión anterior con un solo clic en la consola de Firebase.
- **SSL Automático:** Provee el candado de seguridad (HTTPS) sin configuración.

### Comparativa de Roles
| Herramienta | Rol Principal | ¿Automatizado? | ¿Dónde corre? |
| :--- | :--- | :--- | :--- |
| **Jenkins** | Testeo (CI) | Sí (Local/Servidor) | Tu PC / Server |
| **GitHub Actions** | Orquestador de Deploy | Sí | GitHub Cloud |
| **Firebase** | Hosting (Servidor Web) | Sí (vía Actions) | Google Cloud |
| **Vercel** | Hosting Backup | Sí | Vercel Cloud |
| **Neon** | Persistencia de Datos | Sí (Serverless) | AWS (lo gestiona Neon) |

---

## Resumen del Ciclo de Vida
1.  **Código**: Escribes en VS Code.
2.  **Commit/Push**: Envías a GitHub.
3.  **Validación**: Jenkins despierta y corre los tests.
4.  **Despliegue**:
    - GitHub Actions construye la app.
    - Sube los archivos a Firebase.
    - Vercel hace lo mismo en paralelo.
5.  **Usuario**: Entra a la URL, descarga el JS de Firebase y se conecta a Neon para ver sus datos.
