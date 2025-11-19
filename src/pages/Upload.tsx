import { useState } from "react";
import { Upload as UploadIcon, Sparkles, Image, CheckCircle2 } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export function Upload() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadedDrawingId, setUploadedDrawingId] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setError("");
    setIsProcessing(true);
    
    try {
      const drawing = await api.uploadDrawing(selectedFile);
      setUploadedDrawingId(drawing.id_dibujo);
    } catch (err: any) {
      setError(err.message || "Error al subir dibujo");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateStory = async () => {
    if (!uploadedDrawingId) return;
    
    setIsProcessing(true);
    try {
      // Get process types and create a story process
      const types = await api.getProcessTypes();
      const historiaType = types.find((t: any) => t.nombre === 'historia');
      
      if (historiaType) {
        await api.createProcess({
          id_dibujo: uploadedDrawingId,
          id_tipo_proceso: historiaType.id_tipo_proceso,
        });
      }
      
      navigate("/animation");
    } catch (err: any) {
      setError(err.message || "Error al crear historia");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-light via-yellow-light to-sky-blue-light">
      <Navbar />
      
      <div className="container mx-auto px-8 pt-32 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <UploadIcon className="w-12 h-12 text-peach-dark" />
          </div>
          <h1 className="mb-4">Sube tu dibujo</h1>
          <p className="text-xl text-gray-600">
            Comparte tu creatividad y convierte tu arte en una historia mágica
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!uploadedFile ? (
            /* Upload Zone */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`
                relative bg-white rounded-3xl p-16 shadow-xl border-4 border-dashed
                transition-all cursor-pointer
                ${isDragging 
                  ? "border-peach-dark bg-peach-light/20 scale-105" 
                  : "border-gray-300 hover:border-peach hover:shadow-colored-peach"
                }
              `}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-peach to-yellow flex items-center justify-center shadow-md">
                    <Image className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h3 className="mb-3">Arrastra tu dibujo aquí</h3>
                <p className="text-gray-600 mb-6">
                  o haz clic para seleccionar un archivo
                </p>
                
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-peach to-yellow text-white shadow-lg hover:shadow-colored-peach transition-all">
                  Subir archivo
                </button>
                
                <p className="text-sm text-gray-500 mt-6">
                  Formatos aceptados: JPG, PNG, GIF (máx. 10MB)
                </p>
              </div>
            </div>
          ) : (
            /* Preview and Process */
            <div className="space-y-8">
              {error && (
                <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}
              
              {/* Preview Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-mint-dark" />
                  <h3 className="text-mint-dark">¡Dibujo subido con éxito!</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Image Preview */}
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={uploadedFile}
                      alt="Tu dibujo"
                      className="w-full h-80 object-contain bg-gray-50"
                    />
                  </div>
                  
                  {/* Options */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-3">Elige el tipo de historia</h4>
                      <div className="space-y-3">
                        {["Aventura", "Magia", "Animales", "Espacio", "Fantasía"].map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-purple hover:bg-purple-light/10 transition-all"
                          >
                            <input type="radio" name="storyType" className="w-5 h-5" />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setSelectedFile(null);
                    setUploadedDrawingId(null);
                    setError("");
                  }}
                  className="px-8 py-4 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all shadow-md"
                >
                  Cambiar dibujo
                </button>
                {!uploadedDrawingId ? (
                  <button
                    onClick={handleUpload}
                    disabled={isProcessing}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-purple to-sky-blue text-white hover:shadow-colored-blue transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <UploadIcon className="w-5 h-5" />
                        Subir dibujo
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleCreateStory}
                    disabled={isProcessing}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-purple to-sky-blue text-white hover:shadow-colored-blue transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creando historia...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Crear historia con IA
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Progress Indicator */}
              {isProcessing && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple to-sky-blue flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <div>
                      <h4>La IA está trabajando en tu historia...</h4>
                      <p className="text-gray-600">Esto puede tomar unos segundos</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple to-sky-blue rounded-full animate-pulse w-3/4"></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 bg-gradient-to-r from-yellow-light to-peach-light rounded-2xl p-6 border-4 border-yellow">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h4 className="mb-2">Consejos para mejores resultados</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Usa colores brillantes y claros</li>
                  <li>✓ Dibuja personajes grandes y definidos</li>
                  <li>✓ Asegúrate de que la foto esté bien iluminada</li>
                  <li>✓ ¡Deja volar tu imaginación!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
