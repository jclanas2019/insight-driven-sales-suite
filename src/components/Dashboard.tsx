
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  DollarSign,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SalesMetrics } from "@/components/dashboard/SalesMetrics";
import { PipelineSection } from "@/components/dashboard/PipelineSection";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { SalesTrends } from "@/components/dashboard/SalesTrends";
import { SalesMetric, PipelineStage, RecentActivity, SalesTrendData } from "@/types/dashboard";

const salesMetrics: SalesMetric[] = [
  {
    title: "Ingresos del Mes",
    value: "$187,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "Nuevos Leads",
    value: "342",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Tasa de Conversión",
    value: "24.8%",
    change: "-2.1%",
    trend: "down",
    icon: Target,
    color: "text-purple-600"
  },
  {
    title: "Negocios Activos",
    value: "156",
    change: "+15.3%",
    trend: "up",
    icon: BarChart3,
    color: "text-orange-600"
  }
];

const pipelineStages: PipelineStage[] = [
  { stage: "Prospecto", deals: 45, value: "$125,000", progress: 85 },
  { stage: "Calificado", deals: 32, value: "$89,500", progress: 70 },
  { stage: "Propuesta", deals: 18, value: "$67,800", progress: 55 },
  { stage: "Negociación", deals: 12, value: "$45,200", progress: 40 },
  { stage: "Cierre", deals: 8, value: "$28,100", progress: 25 }
];

const recentActivities: RecentActivity[] = [
  {
    type: "call",
    contact: "María González",
    company: "TechCorp S.A.",
    time: "Hace 15 min",
    status: "completed"
  },
  {
    type: "email",
    contact: "Carlos Ruiz",
    company: "Innovatech",
    time: "Hace 32 min",
    status: "sent"
  },
  {
    type: "meeting",
    contact: "Ana Martínez",
    company: "Digital Plus",
    time: "En 1 hora",
    status: "scheduled"
  },
  {
    type: "call",
    contact: "Luis García",
    company: "SoftSolutions",
    time: "Hace 2 horas",
    status: "missed"
  }
];

// Sales trends data
const salesTrendsData: SalesTrendData[] = [
  { mes: "Oct", ventas: 125000, oportunidades: 45, leads: 180, meta: 120000 },
  { mes: "Nov", ventas: 142000, oportunidades: 52, leads: 195, meta: 140000 },
  { mes: "Dic", ventas: 158000, oportunidades: 48, leads: 210, meta: 150000 },
  { mes: "Ene", ventas: 167000, oportunidades: 58, leads: 225, meta: 160000 },
  { mes: "Feb", ventas: 145000, oportunidades: 44, leads: 190, meta: 145000 },
  { mes: "Mar", ventas: 187500, oportunidades: 62, leads: 240, meta: 180000 }
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <DashboardHeader />

      {/* Métricas principales */}
      <SalesMetrics metrics={salesMetrics} />

      {/* Pipeline y actividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineSection stages={pipelineStages} />
        <RecentActivities activities={recentActivities} />
      </div>

      {/* Gráfico de tendencias */}
      <SalesTrends data={salesTrendsData} />
    </div>
  );
}
