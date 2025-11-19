import { useState, useEffect } from "react";
import { User, Settings, LogOut, Sparkles, Trophy, Heart } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate("/auth");
      return;
    }

    const loadData = async () => {
      try {
        const [userData, statsData] = await Promise.all([
          api.getCurrentUserProfile(),
          api.getUserStats(),
        ]);
        setUser(userData);
        setStats(statsData);
      } catch (err: any) {
        setError(err.message || "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    api.logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-blue-light via-purple-light to-peach-light">
        <Navbar />
        <div className="container mx-auto px-8 pt-32 pb-16 text-center">
          <div className="text-2xl">Cargando...</div>
        </div>
      </div>
    );
  }

  const displayStats = [
    { label: "Historias creadas", value: stats?.historias_creadas || 0, icon: Sparkles, color: "from-purple to-purple-light" },
    { label: "Sesiones de chat", value: stats?.sesiones_chat || 0, icon: Heart, color: "from-peach to-peach-light" },
    { label: "Procesos IA", value: stats?.procesos_ia || 0, icon: Trophy, color: "from-yellow to-yellow-light" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-blue-light via-purple-light to-peach-light">
      <Navbar />
      
      <div className="container mx-auto px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-blue to-purple flex items-center justify-center text-5xl shadow-lg">
                👧
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="mb-2">{user?.nombre || "Usuario"}</h2>
                <p className="text-gray-600 mb-4">
                  {user?.rol === "NIÑO" ? "Creador de historias mágicas ✨" : 
                   user?.rol === "PADRE" ? "Tutor" : "Administrador"}
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-light to-sky-blue-light rounded-full text-sm border-2 border-purple/20">
                    🎨 Artista
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-peach-light to-yellow-light rounded-full text-sm border-2 border-peach/20">
                    📖 Narradora
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-mint-light to-sky-blue-light rounded-full text-sm border-2 border-mint/20">
                    ⭐ Creativa
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-blue to-purple text-white shadow-md hover:shadow-colored-blue transition-all flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configuración
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl mb-8">
              {error}
            </div>
          )}

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {displayStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-3xl p-6 shadow-lg">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
            <h3 className="mb-6">Configuración de cuenta</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2">Nombre</label>
                <input
                  type="text"
                  defaultValue={user?.nombre || ""}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-2">Correo electrónico</label>
                <input
                  type="email"
                  defaultValue={user?.email || ""}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-2">Tipo de cuenta</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    user?.rol === "NIÑO" ? "border-sky-blue bg-sky-blue-light/20" : "border-gray-200 hover:border-sky-blue"
                  }`}>
                    <input type="radio" name="accountType" value="child" className="w-5 h-5" checked={user?.rol === "NIÑO"} disabled />
                    <span>🧒 Niño</span>
                  </label>
                  <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    user?.rol === "PADRE" ? "border-sky-blue bg-sky-blue-light/20" : "border-gray-200 hover:border-sky-blue"
                  }`}>
                    <input type="radio" name="accountType" value="parent" className="w-5 h-5" checked={user?.rol === "PADRE"} disabled />
                    <span>👨‍👩‍👧 Padre/Tutor</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-mint to-mint-dark text-white shadow-md hover:shadow-colored-mint transition-all">
                  Guardar cambios
                </button>
                <button className="px-8 py-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
            <h3 className="mb-6">Logros desbloqueados</h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { emoji: "🎨", title: "Primera historia", unlocked: true },
                { emoji: "🌟", title: "5 historias", unlocked: true },
                { emoji: "🚀", title: "Aventurero", unlocked: true },
                { emoji: "🏆", title: "10 historias", unlocked: true },
                { emoji: "💬", title: "Conversador", unlocked: true },
                { emoji: "🎭", title: "Dramático", unlocked: true },
                { emoji: "🦄", title: "Mágico", unlocked: true },
                { emoji: "⭐", title: "Súper estrella", unlocked: true },
                { emoji: "🔮", title: "20 historias", unlocked: false },
                { emoji: "👑", title: "Leyenda", unlocked: false },
                { emoji: "🎪", title: "Showman", unlocked: false },
                { emoji: "🌈", title: "Arcoíris", unlocked: false },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className={`
                    p-4 rounded-2xl border-2 text-center transition-all
                    ${achievement.unlocked
                      ? "bg-gradient-to-br from-yellow-light to-peach-light border-yellow"
                      : "bg-gray-50 border-gray-200 opacity-50"
                    }
                  `}
                >
                  <div className="text-4xl mb-2">{achievement.emoji}</div>
                  <div className="text-sm font-semibold">{achievement.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-red-100">
            <h4 className="mb-4 text-red-600">Zona de peligro</h4>
            
            <div className="space-y-4">
              <button
                onClick={handleLogout}
                className="px-8 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all shadow-md flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
