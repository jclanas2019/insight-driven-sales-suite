
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, BookOpen, Award, Calendar, Play } from "lucide-react";

interface CoachingModule {
  id: number;
  title: string;
  description: string;
  progress: number;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
}

interface PerformanceMetric {
  label: string;
  current: number;
  target: number;
  improvement: number;
}

interface CoachingSession {
  id: number;
  title: string;
  date: string;
  duration: string;
  coach: string;
  status: "completed" | "scheduled" | "cancelled";
  score?: number;
}

export const SalesCoaching = () => {
  const modules: CoachingModule[] = [
    {
      id: 1,
      title: "Técnicas de Escucha Activa",
      description: "Aprende a escuchar efectivamente y hacer las preguntas correctas",
      progress: 100,
      estimatedTime: "45 min",
      difficulty: "beginner",
      completed: true
    },
    {
      id: 2,
      title: "Manejo de Objeciones",
      description: "Estrategias para abordar y superar objeciones comunes",
      progress: 60,
      estimatedTime: "60 min",
      difficulty: "intermediate",
      completed: false
    },
    {
      id: 3,
      title: "Cierre de Ventas Avanzado",
      description: "Técnicas avanzadas para cerrar ventas complejas",
      progress: 0,
      estimatedTime: "90 min",
      difficulty: "advanced",
      completed: false
    },
    {
      id: 4,
      title: "Construcción de Rapport",
      description: "Cómo establecer conexiones sólidas con los clientes",
      progress: 80,
      estimatedTime: "30 min",
      difficulty: "beginner",
      completed: false
    }
  ];

  const performanceMetrics: PerformanceMetric[] = [
    {
      label: "Tasa de Conversión",
      current: 25,
      target: 30,
      improvement: 15
    },
    {
      label: "Tiempo Promedio de Ciclo",
      current: 45,
      target: 35,
      improvement: -22
    },
    {
      label: "Valor Promedio de Deal",
      current: 15000000,
      target: 18000000,
      improvement: 12
    }
  ];

  const coachingSessions: CoachingSession[] = [
    {
      id: 1,
      title: "Sesión 1-1: Técnicas de Descubrimiento",
      date: "2025-06-14",
      duration: "60 min",
      coach: "Ana Rodríguez",
      status: "completed",
      score: 8.5
    },
    {
      id: 2,
      title: "Role Play: Manejo de Objeciones",
      date: "2025-06-16",
      duration: "45 min",
      coach: "Carlos Silva",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Revisión de Llamadas Grabadas",
      date: "2025-06-12",
      duration: "30 min",
      coach: "Ana Rodríguez",
      status: "completed",
      score: 7.8
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCLP = (amount: number) => {
    return `$${amount.toLocaleString('es-CL')}`;
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Rendimiento de Ventas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">
                      {metric.label.includes("Valor") 
                        ? formatCLP(metric.current)
                        : `${metric.current}${metric.label.includes("Tasa") ? "%" : " días"}`
                      }
                    </span>
                    <Badge className={metric.improvement > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {metric.improvement > 0 ? "+" : ""}{metric.improvement}%
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={metric.label.includes("Tiempo") ? 100 - (metric.current / metric.target * 100) : (metric.current / metric.target * 100)} 
                  className="h-2" 
                />
                <p className="text-xs text-gray-500">
                  Meta: {metric.label.includes("Valor") 
                    ? formatCLP(metric.target)
                    : `${metric.target}${metric.label.includes("Tasa") ? "%" : " días"}`
                  }
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Coaching Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Módulos de Entrenamiento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => (
              <div key={module.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{module.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                  </div>
                  {module.completed && <Award className="w-5 h-5 text-green-600" />}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(module.difficulty)}>
                    {module.difficulty === "beginner" && "Principiante"}
                    {module.difficulty === "intermediate" && "Intermedio"}
                    {module.difficulty === "advanced" && "Avanzado"}
                  </Badge>
                  <span className="text-xs text-gray-500">{module.estimatedTime}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progreso</span>
                    <span className="text-sm font-medium">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
                
                <Button 
                  className="w-full" 
                  variant={module.completed ? "outline" : "default"}
                  size="sm"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {module.completed ? "Revisar" : module.progress > 0 ? "Continuar" : "Comenzar"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Coaching Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Sesiones de Coaching</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coachingSessions.map((session) => (
              <div key={session.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{session.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{session.date}</span>
                      </div>
                      <span>{session.duration}</span>
                      <span>Coach: {session.coach}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.score && (
                      <Badge className="bg-blue-100 text-blue-800">
                        {session.score}/10
                      </Badge>
                    )}
                    <Badge className={getStatusColor(session.status)}>
                      {session.status === "completed" && "Completada"}
                      {session.status === "scheduled" && "Programada"}
                      {session.status === "cancelled" && "Cancelada"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
