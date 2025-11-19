import { Play, RotateCcw, Download, Share2, Sparkles, Tag } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Animation() {
  const story = {
    title: "El Dragón Mágico y el Reino Perdido",
    summary: "Un valiente dragón encuentra un reino olvidado lleno de criaturas mágicas y debe ayudarles a recuperar su luz perdida. Una aventura llena de amistad y magia.",
    tags: ["aventura", "magia", "dragones", "amistad"],
    duration: "3:45",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-light via-peach-light to-yellow-light">
      <Navbar />
      
      <div className="container mx-auto px-8 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
              <Sparkles className="w-12 h-12 text-purple-dark" />
            </div>
            <h1 className="mb-4">{story.title}</h1>
            <p className="text-xl text-gray-600">
              Tu historia está lista para ver
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="md:col-span-2 space-y-6">
              {/* Player Card */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Video Area */}
                <div className="relative aspect-video bg-gradient-to-br from-purple via-sky-blue to-peach flex items-center justify-center">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1585071863827-ce9571f45f52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYXRlZCUyMHN0b3J5dGVsbGluZyUyMGtpZHN8ZW58MXx8fHwxNzYzNDg3NDY4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Historia animada"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  
                  <button className="relative z-10 w-20 h-20 rounded-full bg-white hover:bg-gray-50 shadow-2xl flex items-center justify-center transition-all hover:scale-110">
                    <Play className="w-10 h-10 text-purple-dark ml-1" />
                  </button>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white">
                    {story.duration}
                  </div>
                </div>

                {/* Controls */}
                <div className="p-6 border-t-4 border-gray-100">
                  <div className="flex gap-3 flex-wrap">
                    <button className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-purple to-sky-blue text-white hover:shadow-colored-blue transition-all shadow-md flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" />
                      Reproducir
                    </button>
                    
                    <button className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all flex items-center gap-2">
                      <RotateCcw className="w-5 h-5 text-gray-700" />
                      Regenerar
                    </button>
                    
                    <button className="px-6 py-3 rounded-full bg-gradient-to-r from-mint to-mint-dark text-white hover:shadow-colored-mint transition-all shadow-md flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Descargar
                    </button>
                    
                    <button className="px-6 py-3 rounded-full bg-gradient-to-r from-peach to-yellow text-white hover:shadow-colored-peach transition-all shadow-md flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      Compartir
                    </button>
                  </div>
                </div>
              </div>

              {/* Story Transcript */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="mb-4">Guión de la historia</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Narrador:</strong> Había una vez, en un reino muy lejano, un dragón mágico de escamas brillantes...
                  </p>
                  <p>
                    <strong>Dragón:</strong> ¡Hola! Soy Zafiro, el dragón guardián de este reino. Hoy descubrí algo increíble...
                  </p>
                  <p>
                    <strong>Narrador:</strong> Zafiro encontró un mapa antiguo que mostraba el camino hacia el Reino Perdido, un lugar donde la magia había desaparecido hace muchos años...
                  </p>
                  <p className="text-center text-gray-500 italic">
                    ... y la aventura continúa ...
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar - Info */}
            <div className="md:col-span-1 space-y-6">
              {/* Summary Card */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h4 className="mb-4">Resumen</h4>
                <p className="text-gray-700 mb-6">
                  {story.summary}
                </p>

                {/* Tags */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-5 h-5 text-purple" />
                    <span className="font-semibold">Etiquetas</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-purple-light to-sky-blue-light rounded-full text-sm border-2 border-purple/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-gray-100">
                  <div>
                    <div className="text-2xl mb-1">👁️</div>
                    <div className="text-sm text-gray-600">Visto 1 vez</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="text-sm text-gray-600">Favorito</div>
                  </div>
                </div>
              </div>

              {/* Related Characters */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h4 className="mb-4">Personajes</h4>
                <div className="space-y-3">
                  {[
                    { name: "Zafiro", emoji: "🐉", color: "from-purple to-purple-light" },
                    { name: "Hada Luz", emoji: "🧚", color: "from-yellow to-yellow-light" },
                    { name: "Rey León", emoji: "🦁", color: "from-peach to-peach-light" },
                  ].map((character) => (
                    <div
                      key={character.name}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${character.color} flex items-center gap-3`}
                    >
                      <div className="text-3xl">{character.emoji}</div>
                      <div>
                        <div className="font-semibold">{character.name}</div>
                        <div className="text-sm text-gray-700">Chatea con {character.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create New */}
              <div className="bg-gradient-to-br from-mint-light to-sky-blue-light rounded-3xl p-6 border-4 border-mint">
                <div className="text-3xl mb-3">✨</div>
                <h4 className="mb-2">¿Otra historia?</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Crea una nueva aventura con tus dibujos
                </p>
                <button className="w-full py-3 rounded-full bg-white text-mint-dark hover:shadow-md transition-all">
                  Crear nueva historia
                </button>
              </div>
            </div>
          </div>

          {/* More Stories */}
          <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="mb-6">Tus otras historias</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Aventura Espacial", color: "from-sky-blue to-sky-blue-light", emoji: "🚀" },
                { title: "El Robot Amigo", color: "from-mint to-mint-light", emoji: "🤖" },
                { title: "Bosque Encantado", color: "from-peach to-peach-light", emoji: "🌳" },
                { title: "Ciudad de Cristal", color: "from-purple to-purple-light", emoji: "🏰" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                >
                  <div className={`h-40 rounded-2xl bg-gradient-to-br ${item.color} mb-3 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform shadow-md`}>
                    {item.emoji}
                  </div>
                  <h4 className="mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">2:30 min</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
