
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Play, Pause, Square, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recording {
  id: number;
  title: string;
  duration: string;
  date: string;
  participants: string[];
  status: "recording" | "completed" | "processing";
  summary?: string;
}

export const MeetingRecorder = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [recordings] = useState<Recording[]>([
    {
      id: 1,
      title: "Reunión con Tech Solutions S.A.",
      duration: "45:30",
      date: "2025-06-14",
      participants: ["Juan Pérez", "María González", "Carlos Silva"],
      status: "completed",
      summary: "Se discutieron los requerimientos para las licencias de software empresarial. El cliente mostró interés especial en las funcionalidades de seguridad avanzada."
    },
    {
      id: 2,
      title: "Seguimiento Marketing Plus Ltda.",
      duration: "32:15",
      date: "2025-06-13",
      participants: ["Ana Rodríguez", "Pedro López"],
      status: "completed",
      summary: "Reunión de seguimiento sobre servicios de consultoría. Se acordaron los próximos pasos y se confirmó la aprobación del presupuesto."
    },
    {
      id: 3,
      title: "Demo CRM Innovate Corp",
      duration: "28:45",
      date: "2025-06-12",
      participants: ["Luis Martín", "Sofia Ruiz", "Diego Castro"],
      status: "processing"
    }
  ]);

  const handleStartRecording = () => {
    setIsRecording(true);
    const newRecording: Recording = {
      id: Date.now(),
      title: `Reunión ${new Date().toLocaleDateString()}`,
      duration: "00:00",
      date: new Date().toISOString().split('T')[0],
      participants: [],
      status: "recording"
    };
    setCurrentRecording(newRecording);
    toast({
      title: "Grabación iniciada",
      description: "La reunión se está grabando. El resumen se generará automáticamente.",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (currentRecording) {
      setCurrentRecording({ ...currentRecording, status: "processing" });
    }
    toast({
      title: "Grabación finalizada",
      description: "Procesando el audio y generando resumen...",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recording": return "bg-red-100 text-red-800";
      case "completed": return "bg-green-100 text-green-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "recording": return "Grabando";
      case "completed": return "Completada";
      case "processing": return "Procesando";
      default: return "Desconocido";
    }
  };

  return (
    <div className="space-y-6">
      {/* Recorder Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Grabación y Resumen de Reuniones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            {!isRecording ? (
              <Button onClick={handleStartRecording} className="flex items-center space-x-2">
                <Mic className="w-4 h-4" />
                <span>Iniciar Grabación</span>
              </Button>
            ) : (
              <div className="flex items-center space-x-4">
                <Button onClick={handleStopRecording} variant="destructive" className="flex items-center space-x-2">
                  <Square className="w-4 h-4" />
                  <span>Detener Grabación</span>
                </Button>
                <div className="flex items-center space-x-2 text-red-600">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="font-medium">Grabando...</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recordings List */}
      <Card>
        <CardHeader>
          <CardTitle>Reuniones Grabadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recordings.map((recording) => (
              <div key={recording.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{recording.title}</h3>
                    <p className="text-sm text-gray-500">
                      {recording.date} • {recording.duration}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(recording.status)}>
                      {getStatusText(recording.status)}
                    </Badge>
                    {recording.status === "completed" && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {recording.participants.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Participantes:</p>
                    <p className="text-sm text-gray-600">{recording.participants.join(", ")}</p>
                  </div>
                )}
                
                {recording.summary && (
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Resumen IA</span>
                    </div>
                    <p className="text-sm text-blue-800">{recording.summary}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
