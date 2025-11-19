# 🧪 Guía de Pruebas - Sistema de Autenticación MAPPA Kids

## 📋 Pre-requisitos

1. Backend corriendo en `http://localhost:5000`
2. Frontend corriendo en `http://localhost:3000`
3. Base de datos configurada y accesible
4. Variables de entorno configuradas:
   - `DATABASE_URL`
   - `JWT_SECRET` (mínimo 32 caracteres)

---

## ✅ Prueba 1: Validación de Variables de Entorno

### Objetivo
Verificar que el servidor valida las variables críticas al iniciar.

### Pasos:
1. Eliminar o comentar `JWT_SECRET` en `server/.env`
2. Intentar iniciar el servidor: `cd server && npm run dev`
3. **Resultado esperado:** El servidor debe mostrar error y no iniciar:
   ```
   ❌ ERROR: Variables de entorno faltantes o inválidas:
      - JWT_SECRET
   ```
4. Restaurar `JWT_SECRET` en `.env`
5. Iniciar servidor nuevamente
6. **Resultado esperado:** Servidor inicia correctamente

---

## ✅ Prueba 2: Registro de Usuario

### Objetivo
Verificar que el registro funciona correctamente.

### Pasos:
1. Abrir `http://localhost:3000/auth?mode=register`
2. Llenar formulario:
   - **Nombre:** "Juan Pérez"
   - **Email:** "juan@test.com"
   - **Password:** "password123"
   - **Rol:** Seleccionar "Padre/Tutor"
3. Hacer clic en "Registrarme"
4. **Resultado esperado:**
   - ✅ Redirección a `/dashboard`
   - ✅ En DevTools > Application > Local Storage:
     - `token` existe y es un string largo
     - `user` existe y contiene: `{ id, nombre, email, rol }`
5. Verificar en consola del backend:
   - ✅ Query de inserción ejecutado
   - ✅ Password hasheado (no aparece en texto plano)

### Prueba de Validación:
1. Intentar registrar con email duplicado
2. **Resultado esperado:** Error "El email ya está registrado"
3. Intentar registrar con password < 6 caracteres
4. **Resultado esperado:** Error de validación "Contraseña debe tener al menos 6 caracteres"
5. Intentar registrar con email inválido
6. **Resultado esperado:** Error "Email inválido"

---

## ✅ Prueba 3: Login

### Objetivo
Verificar que el login funciona correctamente.

### Pasos:
1. Ir a `http://localhost:3000/auth`
2. Usar credenciales del usuario creado en Prueba 2:
   - **Email:** "juan@test.com"
   - **Password:** "password123"
3. Hacer clic en "Iniciar sesión"
4. **Resultado esperado:**
   - ✅ Redirección a `/dashboard`
   - ✅ Token y user guardados en localStorage
5. Verificar en consola del backend:
   - ✅ Query de búsqueda por email
   - ✅ Comparación de password con bcrypt

### Prueba de Credenciales Incorrectas:
1. Intentar login con password incorrecto
2. **Resultado esperado:** Error "Credenciales inválidas" (401)
3. Intentar login con email que no existe
4. **Resultado esperado:** Error "Credenciales inválidas" (401)

---

## ✅ Prueba 4: Verificación de Token JWT

### Objetivo
Verificar que el token JWT es válido y contiene la información correcta.

### Pasos:
1. Hacer login exitoso
2. Abrir DevTools > Application > Local Storage
3. Copiar el valor de `token`
4. Ir a https://jwt.io
5. Pegar el token en "Encoded"
6. **Resultado esperado:**
   - ✅ Payload decodificado muestra:
     ```json
     {
       "userId": 1,
       "role": "PADRE",
       "iat": 1234567890,
       "exp": 1234567890
     }
     ```
   - ✅ `exp` es aproximadamente 7 días después de `iat`
   - ✅ La firma es válida (si tienes el JWT_SECRET)

---

## ✅ Prueba 5: Rutas Protegidas

### Objetivo
Verificar que las rutas protegidas requieren autenticación.

### Pasos:
1. **Sin autenticación:**
   - Eliminar `token` de localStorage
   - Intentar acceder a `http://localhost:3000/dashboard`
   - **Resultado esperado:** Redirección a `/auth`
2. **Con autenticación:**
   - Hacer login
   - Acceder a `http://localhost:3000/dashboard`
   - **Resultado esperado:** Dashboard carga correctamente
3. **Petición API protegida:**
   - Abrir DevTools > Network
   - Hacer una acción que llame a `/api/users/me`
   - **Resultado esperado:**
     - ✅ Request incluye header: `Authorization: Bearer <token>`
     - ✅ Response 200 con datos del usuario

---

## ✅ Prueba 6: Manejo de Token Expirado

### Objetivo
Verificar que el sistema maneja tokens expirados correctamente.

### Pasos:
1. Hacer login
2. Modificar el token en localStorage para que esté expirado (usar jwt.io para crear uno expirado)
3. Intentar acceder a una ruta protegida
4. **Resultado esperado:**
   - ✅ Error 401 con mensaje "Token expirado"
   - ✅ Frontend redirige a `/auth`
   - ✅ Token eliminado de localStorage

---

## ✅ Prueba 7: Endpoint /auth/me

### Objetivo
Verificar el nuevo endpoint de verificación de token.

### Pasos:
1. Hacer login
2. Abrir DevTools > Console
3. Ejecutar:
   ```javascript
   fetch('http://localhost:5000/api/auth/me', {
     headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
   }).then(r => r.json()).then(console.log)
   ```
4. **Resultado esperado:**
   ```json
   {
     "valid": true,
     "userId": 1,
     "role": "PADRE"
   }
   ```

---

## ✅ Prueba 8: Manejo de Errores de Validación

### Objetivo
Verificar que los errores de validación se muestran correctamente.

### Pasos:
1. Ir a registro
2. Dejar campos vacíos y enviar
3. **Resultado esperado:** Mensajes de error específicos:
   - "Campo: Nombre requerido"
   - "Campo: Email inválido"
   - "Campo: Contraseña debe tener al menos 6 caracteres"
4. Llenar email inválido (ej: "noemail")
5. **Resultado esperado:** Error "Campo: Email inválido"

---

## ✅ Prueba 9: CORS y Credentials

### Objetivo
Verificar que CORS está configurado correctamente.

### Pasos:
1. Abrir DevTools > Network
2. Hacer cualquier petición al backend
3. Verificar headers de respuesta:
   - ✅ `Access-Control-Allow-Origin: http://localhost:3000`
   - ✅ `Access-Control-Allow-Credentials: true`
4. Verificar headers de request:
   - ✅ `Content-Type: application/json`
   - ✅ `Authorization: Bearer <token>` (en peticiones autenticadas)

---

## ✅ Prueba 10: Flujo Completo End-to-End

### Objetivo
Verificar el flujo completo desde registro hasta uso de la aplicación.

### Pasos:
1. **Registro:**
   - Registrar nuevo usuario
   - Verificar redirección a dashboard
2. **Navegación:**
   - Navegar a `/profile`
   - Verificar que carga datos del usuario
3. **Acciones:**
   - Subir un dibujo (si está implementado)
   - Crear sesión de chat
   - Verificar que todas las peticiones incluyen el token
4. **Logout:**
   - Cerrar sesión
   - Verificar que token y user se eliminan de localStorage
   - Verificar redirección a home o auth

---

## 🐛 Problemas Comunes y Soluciones

### Error: "JWT_SECRET no está configurado"
**Solución:** Configurar `JWT_SECRET` en `server/.env` con al menos 32 caracteres.

### Error: CORS bloqueado
**Solución:** Verificar que `FRONTEND_URL` en backend `.env` coincida con la URL del frontend.

### Error: "Token inválido" después de login
**Solución:** Verificar que `JWT_SECRET` es el mismo en todas las instancias del servidor.

### Error: Password no coincide
**Solución:** Verificar que bcrypt está hasheando correctamente. El hash debe empezar con `$2a$` o `$2b$`.

### Error: 401 en todas las peticiones
**Solución:** 
1. Verificar que el token se está enviando en el header
2. Verificar formato: `Authorization: Bearer <token>` (con espacio después de Bearer)
3. Verificar que el token no está expirado

---

## 📊 Checklist de Pruebas

- [ ] Prueba 1: Validación de variables de entorno
- [ ] Prueba 2: Registro de usuario
- [ ] Prueba 3: Login
- [ ] Prueba 4: Verificación de token JWT
- [ ] Prueba 5: Rutas protegidas
- [ ] Prueba 6: Manejo de token expirado
- [ ] Prueba 7: Endpoint /auth/me
- [ ] Prueba 8: Manejo de errores de validación
- [ ] Prueba 9: CORS y credentials
- [ ] Prueba 10: Flujo completo end-to-end

---

**Nota:** Todas las pruebas deben pasar antes de considerar el sistema listo para producción.

