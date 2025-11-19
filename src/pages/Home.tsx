import { Upload, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FeatureCard } from "../components/FeatureCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-blue-light via-mint-light to-peach-light">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-blue to-purple flex items-center justify-center shadow-md">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl bg-gradient-to-r from-sky-blue-dark to-purple-dark bg-clip-text text-transparent">
            MAPPA Kids
          </h1>
        </div>
        
        <div className="flex gap-4">
          <Link to="/auth?mode=login">
            <button className="px-6 py-3 rounded-full border-3 border-sky-blue text-sky-blue-dark hover:bg-sky-blue hover:text-white transition-all shadow-sm">
              Iniciar sesión
            </button>
          </Link>
          <Link to="/auth?mode=register">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-blue to-purple text-white hover:shadow-colored-blue transition-all shadow-md">
              Crear cuenta
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-white shadow-sm">
              <span className="text-purple-dark">✨ Plataforma educativa con IA</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl">
              Imagina, crea y{" "}
              <span className="bg-gradient-to-r from-sky-blue-dark via-purple to-peach-dark bg-clip-text text-transparent">
                aprende con IA
              </span>
            </h1>
            
            <p className="text-xl text-gray-700">
              Convierte tus dibujos en historias animadas, chatea con tus personajes favoritos 
              y descubre un mundo de creatividad sin límites.
            </p>
            
            <div className="flex gap-4 pt-4">
              <Link to="/auth?mode=register">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-peach to-yellow text-white hover:shadow-colored-peach transition-all shadow-md flex items-center gap-2 group">
                  Comenzar gratis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="px-8 py-4 rounded-full bg-white text-gray-700 hover:shadow-lg transition-all shadow-md">
                Ver demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-light to-mint rounded-3xl rotate-3 opacity-20"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1628605007510-696cd5731961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwdGFibGV0fGVufDF8fHx8MTc2MzQ4NzQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Niños aprendiendo con tablets"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="mb-4">¿Qué puedes hacer?</h2>
          <p className="text-xl text-gray-600">
            Explora todas las funciones mágicas de MAPPA Kids
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Upload}
            title="Sube tu dibujo"
            description="Dibuja lo que imagines en papel y súbelo. Nuestra IA lo convertirá en algo increíble."
            gradient="from-sky-blue to-sky-blue-dark"
          />
          <FeatureCard
            icon={Sparkles}
            title="Genera historias animadas con IA"
            description="Crea historias únicas y animadas basadas en tus dibujos. ¡Cada historia es diferente!"
            gradient="from-purple to-purple-dark"
          />
          <FeatureCard
            icon={MessageCircle}
            title="Chatea con tu personaje"
            description="Habla con los personajes de tus historias. Pregúntales lo que quieras y aprende jugando."
            gradient="from-peach to-peach-dark"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-8 py-16">
        <div className="bg-gradient-to-r from-sky-blue via-purple to-peach rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-white mb-4">¡Empieza tu aventura hoy!</h2>
          <p className="text-xl mb-8 text-white opacity-95">
            Únete a miles de niños que ya están creando y aprendiendo
          </p>
          <Link to="/auth?mode=register">
            <button className="px-8 py-4 rounded-full bg-white text-purple-dark hover:shadow-2xl transition-all shadow-lg">
              Crear cuenta gratis
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white mt-16 py-8 border-t-4 border-sky-blue-light">
        <div className="container mx-auto px-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-blue to-purple flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-800">MAPPA Kids</span>
            </div>
            
            <div className="flex gap-8">
              <a href="#contacto" className="text-gray-600 hover:text-sky-blue-dark">
                Contacto
              </a>
              <a href="#terminos" className="text-gray-600 hover:text-sky-blue-dark">
                Términos
              </a>
              <a href="#privacidad" className="text-gray-600 hover:text-sky-blue-dark">
                Privacidad
              </a>
            </div>
          </div>
          
          <div className="text-center mt-6 text-gray-500">
            <p>© 2025 MAPPA Kids. Hecho con 💙 para niños creativos.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
