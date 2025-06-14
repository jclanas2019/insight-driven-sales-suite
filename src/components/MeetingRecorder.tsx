import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MicOff, Play, Pause, Square, FileText, Download, Users, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PostMeetingFeedback } from "@/components/PostMeetingFeedback";

interface Recording {
  id: number;
  title: string;
  duration: string;
  date: string;
  participants: string[];
  status: "recording" | "completed" | "processing";
  summary?: string;
  transcript?: string;
  opportunities?: Opportunity[];
  followUpActions?: FollowUpAction[];
}

interface Opportunity {
  id: number;
  type: "cross-sell" | "upsell" | "new-requirement" | "pain-point";
  description: string;
  confidence: number;
  suggestedAction: string;
}

interface FollowUpAction {
  id: number;
  action: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  assignedTo?: string;
}

export const MeetingRecorder = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [recordings] = useState<Recording[]>([
    {
      id: 1,
      title: "Reunión con Tech Solutions S.A.",
      duration: "45:30",
      date: "2025-06-14",
      participants: ["Juan Pérez", "María González", "Carlos Silva"],
      status: "completed",
      summary: "Se discutieron los requerimientos para las licencias de software empresarial. El cliente mostró interés especial en las funcionalidades de seguridad avanzada.",
      transcript: "Hola Juan, gracias por recibirnos. Como mencioné en el email, estamos evaluando opciones para actualizar nuestro software empresarial...",
      opportunities: [
        {
          id: 1,
          type: "cross-sell",
          description: "Cliente mencionó necesidad de capacitación en seguridad",
          confidence: 85,
          suggestedAction: "Proponer paquete de capacitación en ciberseguridad"
        },
        {
          id: 2,
          type: "upsell",
          description: "Interés en versión Premium por funcionalidades avanzadas",
          confidence: 92,
          suggestedAction: "Enviar demo de funcionalidades Premium"
        }
      ],
      followUpActions: [
        {
          id: 1,
          action: "Enviar propuesta detallada de licencias Premium",
          priority: "high",
          dueDate: "2025-06-16",
          assignedTo: "Carlos Silva"
        },
        {
          id: 2,
          action: "Programar demo de funcionalidades de seguridad",
          priority: "medium",
          dueDate: "2025-06-18"
        }
      ]
    },
    {
      id: 2,
      title: "Seguimiento Marketing Plus Ltda.",
      duration: "32:15",
      date: "2025-06-13",
      participants: ["Ana Rodríguez", "Pedro López"],
      status: "completed",
      summary: "Reunión de seguimiento sobre servicios de consultoría. Se acordaron los próximos pasos y se confirmó la aprobación del presupuesto.",
      opportunities: [
        {
          id: 3,
          type: "new-requirement",
          description: "Cliente solicitó servicios adicionales de marketing digital",
          confidence: 78,
          suggestedAction: "Preparar propuesta para servicios de marketing digital"
        }
      ],
      followUpActions: [
        {
          id: 3,
          action: "Enviar contrato firmado",
          priority: "high",
          dueDate: "2025-06-15",
          assignedTo: "Pedro López"
        }
      ]
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
      description: "La reunión se está grabando. La transcripción y análisis se generarán automáticamente.",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (currentRecording) {
      setCurrentRecording({ ...currentRecording, status: "processing" });
      // Simular procesamiento automático
      setTimeout(() => {
        toast({
          title: "Procesamiento completado",
          description: "Transcripción lista y oportunidades detectadas. Resumen enviado al CRM.",
        });
      }, 3000);
    }
    toast({
      title: "Grabación finalizada",
      description: "Procesando transcripción y detectando oportunidades automáticamente...",
    });
  };

  const handleSendToCRM = (recording: Recording) => {
    toast({
      title: "Enviado al CRM",
      description: `Resumen y acciones de seguimiento de "${recording.title}" han sido agregados al CRM.`,
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

  const getOpportunityColor = (type: string) => {
    switch (type) {
      case "cross-sell": return "bg-blue-100 text-blue-800";
      case "upsell": return "bg-green-100 text-green-800";
      case "new-requirement": return "bg-purple-100 text-purple-800";
      case "pain-point": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Recorder Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Grabación Inteligente de Reuniones</CardTitle>
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
                  <span className="font-medium">Grabando en vivo...</span>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Procesamiento Automático</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Transcripción en tiempo real</li>
              <li>✓ Detección automática de oportunidades</li>
              <li>✓ Identificación de acciones de seguimiento</li>
              <li>✓ Integración directa con CRM</li>
            </ul>
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
                      <div className="flex space-x-2">
                        <PostMeetingFeedback 
                          meetingData={{
                            title: recording.title,
                            duration: recording.duration,
                            participant: recording.participants.join(", ")
                          }}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedRecording(recording)}
                        >
                          Ver Detalles
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleSendToCRM(recording)}
                        >
                          Enviar a CRM
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                {recording.participants.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">{recording.participants.join(", ")}</p>
                  </div>
                )}
                
                {recording.opportunities && recording.opportunities.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-green-700">
                      {recording.opportunities.length} oportunidades detectadas
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed View Modal/Card */}
      {selectedRecording && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Detalles: {selectedRecording.title}</span>
              <Button variant="outline" onClick={() => setSelectedRecording(null)}>
                Cerrar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Resumen</TabsTrigger>
                <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
                <TabsTrigger value="actions">Acciones</TabsTrigger>
                <TabsTrigger value="transcript">Transcripción</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Resumen Ejecutivo</h4>
                    <p className="text-sm text-gray-700">{selectedRecording.summary}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Participantes</h5>
                      <ul className="text-sm space-y-1">
                        {selectedRecording.participants.map((participant, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Users className="w-3 h-3" />
                            <span>{participant}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Métricas</h5>
                      <div className="text-sm space-y-1">
                        <p>Duración: {selectedRecording.duration}</p>
                        <p>Oportunidades: {selectedRecording.opportunities?.length || 0}</p>
                        <p>Acciones: {selectedRecording.followUpActions?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="opportunities" className="mt-4">
                <div className="space-y-3">
                  {selectedRecording.opportunities?.map((opportunity) => (
                    <div key={opportunity.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <Badge className={getOpportunityColor(opportunity.type)}>
                            {opportunity.type}
                          </Badge>
                        </div>
                        <span className="text-sm font-medium">{opportunity.confidence}% confianza</span>
                      </div>
                      <p className="text-sm mb-2">{opportunity.description}</p>
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-sm font-medium text-blue-900">Acción sugerida:</p>
                        <p className="text-sm text-blue-800">{opportunity.suggestedAction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="actions" className="mt-4">
                <div className="space-y-3">
                  {selectedRecording.followUpActions?.map((action) => (
                    <div key={action.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <Badge className={getPriorityColor(action.priority)}>
                            {action.priority}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">Vence: {action.dueDate}</span>
                      </div>
                      <p className="text-sm mb-2">{action.action}</p>
                      {action.assignedTo && (
                        <p className="text-sm text-gray-600">Asignado a: {action.assignedTo}</p>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="transcript" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
                  <h4 className="font-medium mb-2">Transcripción Completa</h4>
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedRecording.transcript || "Transcripción no disponible"}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
