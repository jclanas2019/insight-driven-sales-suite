
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Star,
  Send,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MeetingFeedback {
  meetingId: string;
  title: string;
  duration: string;
  participant: string;
  scores: {
    empathy: number;
    clarity: number;
    closing: number;
    overall: number;
  };
  aiAnalysis: {
    keyStrengths: string[];
    improvementAreas: string[];
    missedOpportunities: string[];
    nextSteps: string[];
  };
  managerNotes?: string;
}

interface PostMeetingFeedbackProps {
  meetingData?: {
    title: string;
    duration: string;
    participant: string;
  };
}

export const PostMeetingFeedback = ({ meetingData }: PostMeetingFeedbackProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [managerNotes, setManagerNotes] = useState("");
  
  // Simulated AI-generated feedback
  const feedback: MeetingFeedback = {
    meetingId: "meeting-" + Date.now(),
    title: meetingData?.title || "Reunión con Cliente",
    duration: meetingData?.duration || "45 min",
    participant: meetingData?.participant || "Cliente",
    scores: {
      empathy: 82,
      clarity: 75,
      closing: 68,
      overall: 75
    },
    aiAnalysis: {
      keyStrengths: [
        "Excelente rapport inicial y construcción de confianza",
        "Preguntas de descubrimiento muy efectivas",
        "Escucha activa demostrada consistentemente",
        "Manejo profesional de la presentación del producto"
      ],
      improvementAreas: [
        "Mejorar técnicas de cierre - no aprovechó 2 oportunidades claras",
        "Ser más específico al presentar beneficios tangibles",
        "Confirmar entendimiento con mayor frecuencia",
        "Abordar objeciones de presupuesto con más confianza"
      ],
      missedOpportunities: [
        "Cross-selling: Cliente mencionó necesidades de capacitación",
        "Upselling: Interés en funcionalidades premium no explorado",
        "Referidos: Cliente satisfecho podría recomendar a otros"
      ],
      nextSteps: [
        "Programar demo específico de funcionalidades premium",
        "Enviar propuesta detallada en 24 horas",
        "Agendar seguimiento en 3 días para dudas",
        "Preparar material de capacitación como valor agregado"
      ]
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const handleSendFeedback = () => {
    toast({
      title: "Retroalimentación enviada",
      description: "El vendedor recibirá la retroalimentación y plan de mejora por email.",
    });
    setIsOpen(false);
  };

  const handleSaveToCRM = () => {
    toast({
      title: "Guardado en CRM",
      description: "La retroalimentación se ha guardado en el perfil del vendedor.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4" />
          <span>Ver Retroalimentación</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Retroalimentación Post-Reunión: {feedback.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Scores Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Puntuación de Interacción</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(feedback.scores.empathy)}`}>
                    {feedback.scores.empathy}
                  </div>
                  <div className="text-sm text-gray-600">Empatía</div>
                  <Progress value={feedback.scores.empathy} className="h-2 mt-2" />
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(feedback.scores.clarity)}`}>
                    {feedback.scores.clarity}
                  </div>
                  <div className="text-sm text-gray-600">Claridad</div>
                  <Progress value={feedback.scores.clarity} className="h-2 mt-2" />
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(feedback.scores.closing)}`}>
                    {feedback.scores.closing}
                  </div>
                  <div className="text-sm text-gray-600">Cierre</div>
                  <Progress value={feedback.scores.closing} className="h-2 mt-2" />
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(feedback.scores.overall)}`}>
                    {feedback.scores.overall}
                  </div>
                  <div className="text-sm text-gray-600">General</div>
                  <Badge className={getScoreBadgeColor(feedback.scores.overall)}>
                    {feedback.scores.overall >= 80 ? "Excelente" : 
                     feedback.scores.overall >= 60 ? "Bueno" : "Necesita Mejora"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Star className="w-5 h-5" />
                  <span>Fortalezas Clave</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feedback.aiAnalysis.keyStrengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Improvement Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Áreas de Mejora</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feedback.aiAnalysis.improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Target className="w-4 h-4 mt-0.5 text-orange-600" />
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Missed Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-700">
                  <TrendingUp className="w-5 h-5" />
                  <span>Oportunidades Perdidas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feedback.aiAnalysis.missedOpportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <TrendingUp className="w-4 h-4 mt-0.5 text-blue-600" />
                      <span className="text-sm">{opportunity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-700">
                  <CheckCircle className="w-5 h-5" />
                  <span>Próximos Pasos Recomendados</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feedback.aiAnalysis.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-purple-600" />
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Manager Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notas del Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Añade comentarios adicionales, contexto específico o recomendaciones personalizadas..."
                value={managerNotes}
                onChange={(e) => setManagerNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between space-x-4">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleSaveToCRM}>
                <FileText className="w-4 h-4 mr-2" />
                Guardar en CRM
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSendFeedback}>
                <Send className="w-4 h-4 mr-2" />
                Enviar Retroalimentación
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
