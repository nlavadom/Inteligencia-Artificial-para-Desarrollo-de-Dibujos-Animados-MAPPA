import { useState, useEffect } from "react";
import { MessageCircle, Send, Mic, Sparkles } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  texto: string;
  autor: "usuario" | "ia";
  fecha_envio: string;
}

export function Chat() {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState("Dragon");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate("/auth");
      return;
    }

    const initializeChat = async () => {
      try {
        const session = await api.createChatSession("Chat con personaje");
        setSessionId(session.id_sesion);
        // Load initial messages if any
        const existingMessages = await api.getChatMessages(session.id_sesion);
        setMessages(existingMessages);
      } catch (err: any) {
        setError(err.message || "Error al inicializar chat");
      }
    };

    initializeChat();
  }, [navigate]);

  const characters = [
    { name: "Dragón Mágico", id: "Dragon", emoji: "🐉", color: "from-purple to-purple-light" },
    { name: "Robot Amigo", id: "Robot", emoji: "🤖", color: "from-sky-blue to-sky-blue-light" },
    { name: "Unicornio", id: "Unicorn", emoji: "🦄", color: "from-peach to-peach-light" },
    { name: "Astronauta", id: "Astronaut", emoji: "👨‍🚀", color: "from-mint to-mint-light" },
  ];

  const handleSendMessage = async () => {
    if (!message.trim() || !sessionId) return;

    setLoading(true);
    setError("");

    try {
      // Send user message
      const userMessage = await api.sendMessage(sessionId, message);
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");

      // Simulate AI response (in production, this would call an AI service)
      setTimeout(async () => {
        const responses = [
          "¡Qué interesante! Cuéntame más sobre eso.",
          "¡Me encanta esa idea! ¿Y qué pasó después?",
          "Eso suena muy divertido. ¿Quieres que te cuente algo similar?",
          "¡Genial! Yo también pienso lo mismo.",
        ];
        
        const aiResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // In a real implementation, you would create an AI message via the backend
        // For now, we'll just add it to the local state
        const aiMessage: Message = {
          id: Date.now(),
          texto: aiResponse,
          autor: "ia",
          fecha_envio: new Date().toISOString(),
        };
        
        setMessages((prev) => [...prev, aiMessage]);
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Error al enviar mensaje");
      setLoading(false);
    }
  };

  const currentCharacter = characters.find((c) => c.id === selectedCharacter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-light via-sky-blue-light to-purple-light">
      <Navbar />
      
      <div className="container mx-auto px-8 pt-32 pb-16">
        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Left Sidebar - Characters */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-32">
              <h3 className="mb-4 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-purple" />
                Personajes
              </h3>
              
              <div className="space-y-3">
                {characters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharacter(char.id)}
                    className={`
                      w-full p-4 rounded-2xl border-3 transition-all text-left
                      ${selectedCharacter === char.id
                        ? `bg-gradient-to-br ${char.color} border-transparent shadow-md`
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                      }
                    `}
                  >
                    <div className="text-3xl mb-2">{char.emoji}</div>
                    <div className="font-semibold text-sm">{char.name}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-yellow-light to-peach-light rounded-2xl">
                <div className="text-2xl mb-2">✨</div>
                <p className="text-sm text-gray-700">
                  Crea más personajes subiendo nuevos dibujos
                </p>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-[calc(100vh-200px)] flex flex-col">
              {/* Chat Header */}
              <div className={`p-6 bg-gradient-to-r ${currentCharacter?.color} border-b-4 border-white`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-3xl shadow-md">
                    {currentCharacter?.emoji}
                  </div>
                  <div>
                    <h3 className="text-gray-800">{currentCharacter?.name}</h3>
                    <p className="text-sm text-gray-600">En línea • Listo para chatear</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {error && (
                  <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl">
                    {error}
                  </div>
                )}
                {messages.length === 0 && !loading && (
                  <div className="text-center text-gray-500 py-8">
                    ¡Comienza una conversación!
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.autor === "usuario" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md
                      ${msg.autor === "usuario" 
                        ? "bg-gradient-to-br from-peach to-yellow" 
                        : `bg-gradient-to-br ${currentCharacter?.color}`
                      }
                    `}>
                      {msg.autor === "usuario" ? (
                        <span className="text-white">👧</span>
                      ) : (
                        <span>{currentCharacter?.emoji}</span>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`
                        max-w-md px-5 py-3 rounded-2xl shadow-sm
                        ${msg.autor === "usuario"
                          ? "bg-gradient-to-r from-peach to-yellow text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none border-2 border-gray-100"
                        }
                      `}
                    >
                      <p className={msg.autor === "usuario" ? "text-white" : "text-gray-800"}>
                        {msg.texto}
                      </p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md bg-gradient-to-br ${currentCharacter?.color}`}>
                      <span>{currentCharacter?.emoji}</span>
                    </div>
                    <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none border-2 border-gray-100 px-5 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t-2 border-gray-100">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Escribe tu mensaje aquí..."
                    className="flex-1 px-5 py-3 rounded-full border-2 border-gray-200 focus:border-sky-blue focus:outline-none"
                  />
                  
                  <button
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                    title="Usar micrófono"
                  >
                    <Mic className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || loading}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-blue to-purple text-white hover:shadow-colored-blue transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  🎤 Puedes usar el micrófono para dictar tu mensaje
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-gradient-to-r from-mint-light to-sky-blue-light rounded-2xl p-6 border-4 border-mint">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💬</div>
                <div>
                  <h4 className="mb-2">Ideas para conversar</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Cuéntame un chiste", "¿Qué te gusta hacer?", "Inventa una aventura", "Pregúntame algo"].map((tip) => (
                      <button
                        key={tip}
                        onClick={() => setMessage(tip)}
                        className="px-4 py-2 bg-white rounded-full text-sm hover:shadow-md transition-all"
                      >
                        {tip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
