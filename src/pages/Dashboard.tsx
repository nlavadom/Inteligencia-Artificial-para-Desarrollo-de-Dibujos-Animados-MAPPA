import { useEffect, useState } from "react";
import { Upload, Sparkles, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { FeatureCard } from "../components/FeatureCard";
import { api } from "../services/api";

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate("/auth");
      return;
    }

    const loadUser = async () => {
      try {
        const userData = await api.getCurrentUserProfile();
        setUser(userData);
      } catch (err) {
        navigate("/auth");
      }
    };

    loadUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-blue-light via-mint-light to-yellow-light">
      <Navbar />
      
      <div className="container mx-auto px-8 pt-32 pb-16">
        {/* Welcome Header */}
        <div className="mb-12">
          <div className="inline-block px-6 py-3 bg-white rounded-full shadow-md mb-4">
            <span className="text-2xl">👋</span>
          </div>
          <h1 className="mb-2">¡Hola, {user?.nombre || "Usuario"}!</h1>
          <p className="text-xl text-gray-600">
            ¿Qué quieres crear hoy?
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={Upload}
            title="Subir dibujo"
            description="Sube un dibujo y conviértelo en una historia increíble"
            gradient="from-sky-blue to-sky-blue-dark"
            onClick={() => navigate("/upload")}
          />
          <FeatureCard
            icon={Sparkles}
            title="Generar animación"
            description="Crea historias animadas con la magia de la IA"
            gradient="from-purple to-purple-dark"
            onClick={() => navigate("/animation")}
          />
          <FeatureCard
            icon={MessageCircle}
            title="Chat con tu personaje"
            description="Habla con los personajes de tus historias"
            gradient="from-peach to-peach-dark"
            onClick={() => navigate("/chat")}
          />
        </div>

        {/* Recent Creations */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="mb-6">Tus creaciones recientes</h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "El dragón mágico", type: "Historia", color: "from-purple to-purple-light" },
              { title: "Aventura espacial", type: "Animación", color: "from-sky-blue to-sky-blue-light" },
              { title: "El robot amigo", type: "Chat", color: "from-peach to-peach-light" },
              { title: "Bosque encantado", type: "Historia", color: "from-mint to-mint-light" },
            ].map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className={`h-40 rounded-2xl bg-gradient-to-br ${item.color} mb-3 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md`}>
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h4 className="mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-yellow-light to-peach-light rounded-2xl p-6 border-4 border-yellow">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h4 className="mb-2">Consejo del día</h4>
                <p className="text-gray-700">
                  ¡Prueba a dibujar personajes con muchos colores! Tus historias serán más divertidas.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-mint-light to-sky-blue-light rounded-2xl p-6 border-4 border-mint">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🎨</div>
              <div>
                <h4 className="mb-2">Desafío creativo</h4>
                <p className="text-gray-700">
                  Crea una historia sobre un animal que puede volar. ¡Usa tu imaginación!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
