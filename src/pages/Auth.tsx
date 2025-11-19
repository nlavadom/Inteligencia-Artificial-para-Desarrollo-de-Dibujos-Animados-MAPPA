import { useState } from "react";
import { Sparkles, Mail, Lock, User as UserIcon } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { api } from "../services/api";

export function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (mode === "login") {
        await api.login(email, password);
      } else {
        const nombre = formData.get("nombre") as string;
        const rol = (formData.get("role") as string) === "child" ? "NIÑO" : "PADRE";
        await api.register({ nombre, email, password, rol });
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Error al autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-light via-sky-blue-light to-mint-light flex items-center justify-center p-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Illustration */}
        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow to-peach rounded-3xl rotate-3 opacity-20"></div>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1744451658473-cf5c564d5a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMHJvYm90JTIwbWFzY290fGVufDF8fHx8MTc2MzM5Mzg3MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Mascota amigable"
            className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover"
          />
          
          <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
            <h3 className="text-purple-dark mb-2">¡Hola! Soy Mappi 👋</h3>
            <p className="text-gray-700">
              Tu compañero de aventuras creativas. ¡Vamos a crear historias increíbles juntos!
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-white">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-blue to-purple flex items-center justify-center shadow-md">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="bg-gradient-to-r from-sky-blue-dark to-purple-dark bg-clip-text text-transparent">
              MAPPA Kids
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-2xl">
            <button
              onClick={() => setMode("login")}
              className={`
                flex-1 py-3 rounded-xl transition-all
                ${mode === "login" 
                  ? "bg-gradient-to-r from-sky-blue to-purple text-white shadow-md" 
                  : "text-gray-600 hover:text-gray-800"
                }
              `}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setMode("register")}
              className={`
                flex-1 py-3 rounded-xl transition-all
                ${mode === "register" 
                  ? "bg-gradient-to-r from-sky-blue to-purple text-white shadow-md" 
                  : "text-gray-600 hover:text-gray-800"
                }
              `}
            >
              Crear cuenta
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {mode === "register" && (
              <div>
                <label className="block mb-2">
                  <UserIcon className="inline w-5 h-5 mr-2 text-purple" />
                  Nombre del niño o tutor
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Ej: María García"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-blue focus:outline-none"
                  required
                />
              </div>
            )}

            <div>
              <label className="block mb-2">
                <Mail className="inline w-5 h-5 mr-2 text-sky-blue" />
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-blue focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2">
                <Lock className="inline w-5 h-5 mr-2 text-peach" />
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-blue focus:outline-none"
                required
              />
            </div>

            {mode === "register" && (
              <div>
                <label className="block mb-2">Soy un...</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-sky-blue transition-all">
                    <input type="radio" name="role" value="child" className="w-5 h-5" />
                    <span>🧒 Niño</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-sky-blue transition-all">
                    <input type="radio" name="role" value="parent" className="w-5 h-5" defaultChecked />
                    <span>👨‍👩‍👧 Padre/Tutor</span>
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-peach to-yellow text-white hover:shadow-colored-peach transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : mode === "login" ? "Iniciar sesión" : "Registrarme"}
            </button>

            {mode === "login" && (
              <div className="text-center">
                <p className="text-gray-600">
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="text-sky-blue-dark hover:underline"
                  >
                    Crear una aquí
                  </button>
                </p>
              </div>
            )}
          </form>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-gray-500 hover:text-sky-blue-dark">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
