-- ============================================================
-- MAPPA KIDS - Base de Datos en Neon (PostgreSQL)
-- ============================================================
-- Nota: Neon no requiere CREATE SCHEMA, las tablas se crean directamente

-- ============================================================
-- TABLA: Usuario
-- ============================================================
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT NOW(),
    rol VARCHAR(10) CHECK (rol IN ('NIÑO','PADRE','ADMIN')) DEFAULT 'NIÑO',
    id_padre INT,
    CONSTRAINT fk_usuario_padre FOREIGN KEY (id_padre)
        REFERENCES usuario(id_usuario)
        ON DELETE SET NULL
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_usuario_email ON usuario(email);
CREATE INDEX IF NOT EXISTS idx_usuario_rol ON usuario(rol);
CREATE INDEX IF NOT EXISTS idx_usuario_padre ON usuario(id_padre);

-- Nota: Los usuarios iniciales deben crearse con contraseñas hasheadas
-- usando bcrypt. Se crearán desde la aplicación backend.

-- ============================================================
-- TABLA: SesionChat
-- ============================================================
CREATE TABLE IF NOT EXISTS sesion_chat (
    id_sesion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    titulo VARCHAR(150),
    fecha_inicio TIMESTAMP DEFAULT NOW(),
    fecha_fin TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sesion_usuario ON sesion_chat(id_usuario);

-- ============================================================
-- TABLA: Dibujo
-- ============================================================
CREATE TABLE IF NOT EXISTS dibujo (
    id_dibujo SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    ruta_archivo TEXT NOT NULL,
    descripcion TEXT,
    fecha_subida TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dibujo_usuario ON dibujo(id_usuario);
CREATE INDEX IF NOT EXISTS idx_dibujo_fecha ON dibujo(fecha_subida);

-- ============================================================
-- TABLA: TipoProceso (catálogo)
-- ============================================================
CREATE TABLE IF NOT EXISTS tipo_proceso (
    id_tipo_proceso SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Insertar tipos de proceso (usar INSERT ... ON CONFLICT para evitar duplicados)
INSERT INTO tipo_proceso (nombre, descripcion) VALUES
('mejora', 'Mejora la calidad o nitidez del dibujo'),
('escena', 'Genera una nueva escena basada en el dibujo'),
('colorización', 'Colorea un dibujo en blanco y negro'),
('historia', 'Crea una historia basada en el dibujo'),
('otros', 'Procesos IA adicionales')
ON CONFLICT (nombre) DO NOTHING;

-- ============================================================
-- TABLA: ProcesoIA
-- ============================================================
CREATE TABLE IF NOT EXISTS proceso_ia (
    id_proceso SERIAL PRIMARY KEY,
    id_dibujo INT NOT NULL REFERENCES dibujo(id_dibujo) ON DELETE CASCADE,
    id_tipo_proceso INT NOT NULL REFERENCES tipo_proceso(id_tipo_proceso),
    parametros JSONB,
    estado VARCHAR(15) CHECK (estado IN ('pendiente','procesando','completado','fallido')) DEFAULT 'pendiente',
    fecha_inicio TIMESTAMP DEFAULT NOW(),
    fecha_fin TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_proceso_dibujo ON proceso_ia(id_dibujo);
CREATE INDEX IF NOT EXISTS idx_proceso_estado ON proceso_ia(estado);
CREATE INDEX IF NOT EXISTS idx_proceso_tipo ON proceso_ia(id_tipo_proceso);

-- ============================================================
-- TABLA: Resultado
-- ============================================================
CREATE TABLE IF NOT EXISTS resultado (
    id_resultado SERIAL PRIMARY KEY,
    id_proceso INT NOT NULL REFERENCES proceso_ia(id_proceso) ON DELETE CASCADE,
    tipo_resultado VARCHAR(10) CHECK (tipo_resultado IN ('imagen','texto')) NOT NULL,
    texto_generado TEXT,
    ruta_imagen TEXT,
    fecha_creacion TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resultado_proceso ON resultado(id_proceso);
CREATE INDEX IF NOT EXISTS idx_resultado_tipo ON resultado(tipo_resultado);

-- ============================================================
-- TABLA: Mensaje
-- ============================================================
CREATE TABLE IF NOT EXISTS mensaje (
    id_mensaje SERIAL PRIMARY KEY,
    id_sesion INT NOT NULL REFERENCES sesion_chat(id_sesion) ON DELETE CASCADE,
    autor VARCHAR(10) CHECK (autor IN ('usuario','ia')) NOT NULL,
    texto TEXT,
    fecha_envio TIMESTAMP DEFAULT NOW(),
    id_dibujo INT REFERENCES dibujo(id_dibujo) ON DELETE SET NULL,
    id_resultado INT REFERENCES resultado(id_resultado) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_mensaje_sesion ON mensaje(id_sesion);
CREATE INDEX IF NOT EXISTS idx_mensaje_fecha ON mensaje(fecha_envio);
CREATE INDEX IF NOT EXISTS idx_mensaje_autor ON mensaje(autor);
