import { Sparkles, Heart, Star, Send } from "lucide-react";
import { Navbar } from "../components/Navbar";

export function DesignSystem() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-8 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4">Sistema de Diseño MAPPA Kids</h1>
            <p className="text-xl text-gray-600">
              Componentes, colores y guías de estilo para la plataforma
            </p>
          </div>

          {/* Colors */}
          <section className="mb-16">
            <h2 className="mb-6">Paleta de Colores</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {/* Sky Blue */}
              <div>
                <h4 className="mb-3 text-sky-blue-dark">Azul Cielo</h4>
                <div className="space-y-2">
                  <div className="h-20 rounded-2xl bg-sky-blue-light border-2 border-gray-200 flex items-center justify-center">
                    Light
                  </div>
                  <div className="h-20 rounded-2xl bg-sky-blue text-white flex items-center justify-center shadow-md">
                    Default
                  </div>
                  <div className="h-20 rounded-2xl bg-sky-blue-dark text-white flex items-center justify-center shadow-md">
                    Dark
                  </div>
                </div>
              </div>

              {/* Mint */}
              <div>
                <h4 className="mb-3 text-mint-dark">Verde Menta</h4>
                <div className="space-y-2">
                  <div className="h-20 rounded-2xl bg-mint-light border-2 border-gray-200 flex items-center justify-center">
                    Light
                  </div>
                  <div className="h-20 rounded-2xl bg-mint text-white flex items-center justify-center shadow-md">
                    Default
                  </div>
                  <div className="h-20 rounded-2xl bg-mint-dark text-white flex items-center justify-center shadow-md">
                    Dark
                  </div>
                </div>
              </div>

              {/* Peach */}
              <div>
                <h4 className="mb-3 text-peach-dark">Durazno</h4>
                <div className="space-y-2">
                  <div className="h-20 rounded-2xl bg-peach-light border-2 border-gray-200 flex items-center justify-center">
                    Light
                  </div>
                  <div className="h-20 rounded-2xl bg-peach text-white flex items-center justify-center shadow-md">
                    Default
                  </div>
                  <div className="h-20 rounded-2xl bg-peach-dark text-white flex items-center justify-center shadow-md">
                    Dark
                  </div>
                </div>
              </div>

              {/* Yellow */}
              <div>
                <h4 className="mb-3 text-yellow-dark">Amarillo</h4>
                <div className="space-y-2">
                  <div className="h-20 rounded-2xl bg-yellow-light border-2 border-gray-200 flex items-center justify-center">
                    Light
                  </div>
                  <div className="h-20 rounded-2xl bg-yellow text-gray-800 flex items-center justify-center shadow-md">
                    Default
                  </div>
                  <div className="h-20 rounded-2xl bg-yellow-dark text-gray-800 flex items-center justify-center shadow-md">
                    Dark
                  </div>
                </div>
              </div>
            </div>

            {/* Gradients */}
            <div className="mt-8">
              <h4 className="mb-4">Gradientes</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="h-24 rounded-2xl bg-gradient-to-r from-sky-blue to-purple text-white flex items-center justify-center shadow-lg">
                  Sky to Purple
                </div>
                <div className="h-24 rounded-2xl bg-gradient-to-r from-peach to-yellow text-white flex items-center justify-center shadow-lg">
                  Peach to Yellow
                </div>
                <div className="h-24 rounded-2xl bg-gradient-to-r from-mint to-sky-blue text-white flex items-center justify-center shadow-lg">
                  Mint to Sky
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="mb-16 bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="mb-6">Tipografía</h2>
            
            <div className="space-y-6">
              <div>
                <span className="text-sm text-gray-500 mb-2 block">Heading 1</span>
                <h1>El dragón mágico vuela alto</h1>
              </div>
              
              <div>
                <span className="text-sm text-gray-500 mb-2 block">Heading 2</span>
                <h2>Aventuras increíbles te esperan</h2>
              </div>
              
              <div>
                <span className="text-sm text-gray-500 mb-2 block">Heading 3</span>
                <h3>Crea historias asombrosas</h3>
              </div>
              
              <div>
                <span className="text-sm text-gray-500 mb-2 block">Heading 4</span>
                <h4>Personajes únicos y divertidos</h4>
              </div>
              
              <div>
                <span className="text-sm text-gray-500 mb-2 block">Paragraph</span>
                <p>
                  MAPPA Kids es una plataforma educativa donde los niños pueden dar rienda suelta a su creatividad. 
                  Convierte tus dibujos en historias animadas y chatea con personajes increíbles.
                </p>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section className="mb-16">
            <h2 className="mb-6">Botones</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Primary Buttons */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="mb-4">Primarios</h4>
                <div className="space-y-4">
                  <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-sky-blue to-purple text-white shadow-md hover:shadow-colored-blue transition-all">
                    Crear historia
                  </button>
                  
                  <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-peach to-yellow text-white shadow-md hover:shadow-colored-peach transition-all">
                    Subir dibujo
                  </button>
                  
                  <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-mint to-mint-dark text-white shadow-md hover:shadow-colored-mint transition-all">
                    Guardar
                  </button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="mb-4">Secundarios</h4>
                <div className="space-y-4">
                  <button className="w-full px-6 py-3 rounded-full bg-white border-3 border-sky-blue text-sky-blue-dark hover:bg-sky-blue hover:text-white transition-all shadow-sm">
                    Cancelar
                  </button>
                  
                  <button className="w-full px-6 py-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                    Ver más
                  </button>
                  
                  <button className="w-full px-6 py-3 rounded-full bg-white text-gray-700 hover:shadow-lg transition-all shadow-md">
                    Regresar
                  </button>
                </div>
              </div>

              {/* Icon Buttons */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="mb-4">Con Iconos</h4>
                <div className="space-y-4">
                  <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-purple to-sky-blue text-white shadow-md hover:shadow-colored-blue transition-all flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generar con IA
                  </button>
                  
                  <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-peach to-peach-dark text-white shadow-md hover:shadow-colored-peach transition-all flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    Favorito
                  </button>
                  
                  <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-yellow to-yellow-dark text-gray-800 shadow-md transition-all flex items-center justify-center gap-2">
                    <Star className="w-5 h-5" />
                    Calificar
                  </button>
                </div>
              </div>

              {/* States */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="mb-4">Estados</h4>
                <div className="space-y-4">
                  <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-sky-blue to-purple text-white shadow-md">
                    Normal
                  </button>
                  
                  <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-sky-blue to-purple text-white shadow-md opacity-50 cursor-not-allowed">
                    Deshabilitado
                  </button>
                  
                  <button className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-sky-blue to-purple text-white shadow-md flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Cargando...
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Form Inputs */}
          <section className="mb-16 bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="mb-6">Campos de Formulario</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block mb-2">Entrada de texto</label>
                  <input
                    type="text"
                    placeholder="Escribe aquí..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2">Área de texto</label>
                  <textarea
                    placeholder="Escribe tu historia..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-sky-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2">Radio buttons</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-sky-blue">
                      <input type="radio" name="example" className="w-5 h-5" />
                      <span>Opción 1</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-sky-blue">
                      <input type="radio" name="example" className="w-5 h-5" />
                      <span>Opción 2</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Checkbox</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-sky-blue">
                      <input type="checkbox" className="w-5 h-5" />
                      <span>Acepto términos y condiciones</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cards */}
          <section className="mb-16">
            <h2 className="mb-6">Tarjetas</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Basic Card */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-blue to-sky-blue-dark flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="mb-2">Tarjeta básica</h4>
                <p className="text-gray-600">
                  Una tarjeta simple con título, descripción e icono.
                </p>
              </div>

              {/* Gradient Card */}
              <div className="bg-gradient-to-br from-purple-light to-peach-light rounded-3xl p-6 border-4 border-purple/20 shadow-lg">
                <div className="text-3xl mb-3">✨</div>
                <h4 className="mb-2">Tarjeta con gradiente</h4>
                <p className="text-gray-700">
                  Perfecta para destacar contenido importante.
                </p>
              </div>

              {/* Interactive Card */}
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer border-4 border-transparent hover:border-sky-blue-light">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h4 className="mb-2">Tarjeta interactiva</h4>
                <p className="text-gray-600">
                  Con efectos hover y cursor pointer.
                </p>
              </div>
            </div>
          </section>

          {/* Icons */}
          <section className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="mb-6">Iconos (Lucide React)</h2>
            
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
              {[Sparkles, Heart, Star, Send].map((Icon, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-blue-light to-purple-light flex items-center justify-center">
                    <Icon className="w-7 h-7 text-purple-dark" />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 mt-6">
              Usamos Lucide React para todos los iconos. Tamaños recomendados: w-5 h-5 (botones), w-6 h-6 (tarjetas), w-12 h-12 (héroes).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
