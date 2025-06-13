
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const salesMetrics = [
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

const pipelineStages = [
  { stage: "Prospecto", deals: 45, value: "$125,000", progress: 85 },
  { stage: "Calificado", deals: 32, value: "$89,500", progress: 70 },
  { stage: "Propuesta", deals: 18, value: "$67,800", progress: 55 },
  { stage: "Negociación", deals: 12, value: "$45,200", progress: 40 },
  { stage: "Cierre", deals: 8, value: "$28,100", progress: 25 }
];

const recentActivities = [
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

export function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard de Ventas</h1>
          <p className="text-slate-600 mt-1">Resumen completo de tu actividad comercial</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          En tiempo real
        </Badge>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric) => (
          <Card key={metric.title} className="hover:shadow-lg transition-shadow bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
              <div className="flex items-center space-x-1 mt-2">
                {metric.trend === "up" ? (
                  <ArrowUp className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-500" />
                )}
                <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change} vs mes anterior
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline y actividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline de ventas */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span>Pipeline de Ventas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pipelineStages.map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">{stage.stage}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-slate-900">{stage.deals} deals</span>
                    <span className="text-xs text-slate-500 ml-2">{stage.value}</span>
                  </div>
                </div>
                <Progress value={stage.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actividades recientes */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span>Actividades Recientes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === "call" && <Phone className="h-4 w-4 text-blue-600" />}
                  {activity.type === "email" && <Mail className="h-4 w-4 text-green-600" />}
                  {activity.type === "meeting" && <Calendar className="h-4 w-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.contact}</p>
                  <p className="text-xs text-slate-500">{activity.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">{activity.time}</p>
                  <Badge 
                    variant={activity.status === "completed" ? "default" : "outline"}
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de tendencias */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <span>Tendencias de Ventas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
              <p className="text-slate-600">Gráfico de tendencias interactivo</p>
              <p className="text-sm text-slate-500 mt-1">Los datos se actualizarán en tiempo real</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
