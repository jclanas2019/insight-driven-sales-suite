
import { PerformanceOverview } from "@/components/coaching/PerformanceOverview";
import { CoachingModules } from "@/components/coaching/CoachingModules";
import { CoachingSessions } from "@/components/coaching/CoachingSessions";
import type { CoachingModule, PerformanceMetric, CoachingSession } from "@/types/coaching";

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

  return (
    <div className="space-y-6">
      <PerformanceOverview metrics={performanceMetrics} />
      <CoachingModules modules={modules} />
      <CoachingSessions sessions={coachingSessions} />
    </div>
  );
};
