import { Home, Upload, MessageCircle, Sparkles, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: "/dashboard", icon: Home, label: "Inicio" },
    { path: "/upload", icon: Upload, label: "Subir" },
    { path: "/chat", icon: MessageCircle, label: "Chat" },
    { path: "/animation", icon: Sparkles, label: "Animaciones" },
    { path: "/profile", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full px-6 py-3 shadow-lg border-4 border-sky-blue-light">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 pr-4 border-r-2 border-gray-200">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-blue to-purple flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-sky-blue-dark to-purple-dark bg-clip-text text-transparent">
            MAPPA Kids
          </span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full transition-all
                  ${isActive 
                    ? 'bg-gradient-to-r from-sky-blue to-purple-light text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
