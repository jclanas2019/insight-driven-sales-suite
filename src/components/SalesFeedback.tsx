
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Star,
  Award,
  BarChart3
} from "lucide-react";

interface InteractionScore {
  empathy: number;
  clarity: number;
  closing: number;
  overall: number;
}

interface FeedbackSession {
  id: number;
  meetingTitle: string;
  date: string;
  duration: string;
  client: string;
  scores: InteractionScore;
  feedback: {
    strengths: string[];
    improvements: string[];
    actionItems: string[];
  };
  skillsAnalysis: {
    listening: number;
    questioning: number;
    objectionHandling: number;
    presentation: number;
  };
}

interface SkillEvolution {
  skill: string;
  currentScore: number;
  previousScore: number;
  trend: "up" | "down" | "stable";
  sessions: number;
}

export const SalesFeedback = () => {
  const [selectedSession, setSelectedSession] = useState<FeedbackSession | null>(null);

  const feedbackSessions: FeedbackSession[] = [
    {
      id: 1,
      meetingTitle: "Demo - Tech Solutions S.A.",
      date: "2025-06-14",
      duration: "45 min",
      client: "María López",
      scores: {
        empathy: 85,
        clarity: 78,
        closing: 65,
        overall: 76
      },
      feedback: {
        strengths: [
          "Excelente construcción de rapport inicial",
          "Preguntas de descubrimiento muy efectivas",
          "Manejo profesional de la presentación"
        ],
        improvements: [
          "Mejorar técnicas de cierre",
          "Ser más específico en los beneficios",
          "Confirmar entendimiento con más frecuencia"
        ],
        actionItems: [
          "Practicar técnicas de cierre consultivo",
          "Preparar preguntas de confirmación",
          "Revisar módulo de cierre de ventas"
        ]
      },
      skillsAnalysis: {
        listening: 88,
        questioning: 82,
        objectionHandling: 70,
        presentation: 75
      }
    },
    {
      id: 2,
      meetingTitle: "Seguimiento - Marketing Plus Ltda.",
      date: "2025-06-13",
      duration: "32 min",
      client: "Ana Rodríguez",
      scores: {
        empathy: 92,
        clarity: 85,
        closing: 88,
        overall: 88
      },
      feedback: {
        strengths: [
          "Excelente seguimiento de compromisos anteriores",
          "Cierre natural y efectivo",
          "Gran conexión emocional con el cliente"
        ],
        improvements: [
          "Explorar más oportunidades de cross-selling",
          "Documentar mejor los acuerdos"
        ],
        actionItems: [
          "Implementar checklist de cross-selling",
          "Mejorar proceso de documentación"
        ]
      },
      skillsAnalysis: {
        listening: 90,
        questioning: 85,
        objectionHandling: 88,
        presentation: 85
      }
    }
  ];

  const skillsEvolution: SkillEvolution[] = [
    {
      skill: "Escucha Activa",
      currentScore: 88,
      previousScore: 82,
      trend: "up",
      sessions: 12
    },
    {
      skill: "Técnicas de Cierre",
      currentScore: 65,
      previousScore: 58,
      trend: "up",
      sessions: 12
    },
    {
      skill: "Manejo de Objeciones",
      currentScore: 70,
      previousScore: 75,
      trend: "down",
      sessions: 12
    },
    {
      skill: "Presentación",
      currentScore: 75,
      previousScore: 75,
      trend: "stable",
      sessions: 12
    }
  ];

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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Retroalimentación Reciente</TabsTrigger>
          <TabsTrigger value="evolution">Evolución de Habilidades</TabsTrigger>
          <TabsTrigger value="detailed">Análisis Detallado</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sessions List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Sesiones de Retroalimentación</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackSessions.map((session) => (
                    <div 
                      key={session.id} 
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedSession(session)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{session.meetingTitle}</h3>
                        <Badge className={getScoreBadgeColor(session.scores.overall)}>
                          {session.scores.overall}/100
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{session.date}</span>
                        </div>
                        <span>{session.duration}</span>
                        <span>Cliente: {session.client}</span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <p className="text-gray-500">Empatía</p>
                          <p className={`font-semibold ${getScoreColor(session.scores.empathy)}`}>
                            {session.scores.empathy}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Claridad</p>
                          <p className={`font-semibold ${getScoreColor(session.scores.clarity)}`}>
                            {session.scores.clarity}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Cierre</p>
                          <p className={`font-semibold ${getScoreColor(session.scores.closing)}`}>
                            {session.scores.closing}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Feedback */}
            {selectedSession && (
              <Card>
                <CardHeader>
                  <CardTitle>Retroalimentación Detallada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Fortalezas Identificadas</span>
                      </h4>
                      <ul className="space-y-1">
                        {selectedSession.feedback.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <Star className="w-3 h-3 mt-1 text-green-600" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-orange-700 mb-2 flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Áreas de Mejora</span>
                      </h4>
                      <ul className="space-y-1">
                        {selectedSession.feedback.improvements.map((improvement, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <Target className="w-3 h-3 mt-1 text-orange-600" />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-blue-700 mb-2 flex items-center space-x-2">
                        <Award className="w-4 h-4" />
                        <span>Plan de Acción</span>
                      </h4>
                      <ul className="space-y-1">
                        {selectedSession.feedback.actionItems.map((action, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 mt-1 text-blue-600" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Análisis de Habilidades</h4>
                      <div className="space-y-3">
                        {Object.entries(selectedSession.skillsAnalysis).map(([skill, score]) => (
                          <div key={skill} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1')}</span>
                              <span className={`font-semibold ${getScoreColor(score)}`}>{score}%</span>
                            </div>
                            <Progress value={score} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="evolution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Evolución de Habilidades Comerciales</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillsEvolution.map((skill, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{skill.skill}</h3>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(skill.trend)}
                        <span className={`text-sm font-semibold ${getTrendColor(skill.trend)}`}>
                          {skill.trend === "up" && "+"}
                          {skill.currentScore - skill.previousScore}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Puntuación Actual</span>
                        <span className={`font-semibold ${getScoreColor(skill.currentScore)}`}>
                          {skill.currentScore}%
                        </span>
                      </div>
                      <Progress value={skill.currentScore} className="h-2" />
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Basado en {skill.sessions} sesiones analizadas
                    </div>
                    
                    <div className="mt-3 text-xs">
                      <span className="text-gray-500">Anterior: </span>
                      <span className={getScoreColor(skill.previousScore)}>
                        {skill.previousScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Detallado de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">84%</div>
                    <div className="text-sm text-gray-600">Promedio General</div>
                    <div className="text-xs text-gray-500">Últimas 12 sesiones</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">89%</div>
                    <div className="text-sm text-gray-600">Mejor Habilidad</div>
                    <div className="text-xs text-gray-500">Escucha Activa</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">65%</div>
                    <div className="text-sm text-gray-600">Área de Mejora</div>
                    <div className="text-xs text-gray-500">Técnicas de Cierre</div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Recomendaciones Prioritarias</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Enfocarse en módulos de cierre de ventas</li>
                    <li>• Practicar role-playing de manejo de objeciones</li>
                    <li>• Revisar técnicas de confirmación y resumen</li>
                    <li>• Participar en sesiones de coaching 1-1 adicionales</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
