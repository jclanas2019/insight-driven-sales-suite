
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Brain, TrendingUp, Users, Target, Star, AlertTriangle, CheckCircle, ArrowUp, ArrowDown } from "lucide-react";

// Mock data para insights de IA
const salesPredictions = [
  { mes: "Ene", prediccion: 145000, real: 142000 },
  { mes: "Feb", prediccion: 158000, real: 156000 },
  { mes: "Mar", prediccion: 162000, real: 159000 },
  { mes: "Abr", prediccion: 175000, real: null },
  { mes: "May", prediccion: 180000, real: null },
  { mes: "Jun", prediccion: 185000, real: null },
];

const leadScoring = [
  { rango: "90-100", cantidad: 12, color: "#10b981" },
  { rango: "80-89", cantidad: 28, color: "#3b82f6" },
  { rango: "70-79", cantidad: 45, color: "#f59e0b" },
  { rango: "60-69", cantidad: 34, color: "#ef4444" },
  { rango: "<60", cantidad: 18, color: "#6b7280" },
];

const insights = [
  {
    id: 1,
    type: "oportunidad",
    title: "Oportunidad de Cross-selling",
    description: "Tech Solutions tiene 85% probabilidad de comprar servicios adicionales basado en patrones similares",
    confidence: 85,
    impact: "Alto",
    action: "Contactar en próximos 3 días"
  },
  {
    id: 2,
    type: "riesgo",
    title: "Cliente en Riesgo",
    description: "Marketing Plus muestra signos de churn. Actividad reducida 60% en últimas 2 semanas",
    confidence: 92,
    impact: "Alto",
    action: "Programar llamada urgente"
  },
  {
    id: 3,
    type: "optimizacion",
    title: "Optimización de Pipeline",
    description: "Los leads del sector tecnológico tienen 3x más probabilidad de conversión los martes",
    confidence: 78,
    impact: "Medio",
    action: "Ajustar cronograma de seguimiento"
  },
  {
    id: 4,
    type: "prediccion",
    title: "Predicción de Ventas",
    description: "Abril mostrará un crecimiento del 12% si se mantienen las tendencias actuales",
    confidence: 89,
    impact: "Alto",
    action: "Preparar recursos adicionales"
  }
];

const recommendations = [
  {
    id: 1,
    title: "Incrementar seguimiento a leads calientes",
    description: "Los leads con score >80 tienen 40% más conversión con seguimiento diario",
    priority: "Alta",
    savings: "€15,000/mes"
  },
  {
    id: 2,
    title: "Personalizar emails por sector",
    description: "Emails segmentados por industria aumentan open rate en 25%",
    priority: "Media",
    savings: "€8,500/mes"
  },
  {
    id: 3,
    title: "Optimizar horarios de llamadas",
    description: "Llamadas entre 10-11 AM tienen 60% más éxito en sector financiero",
    priority: "Media",
    savings: "€5,200/mes"
  }
];

const AIInsights = () => {
  const [selectedTab, setSelectedTab] = useState("insights");

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "oportunidad": return <TrendingUp className="w-5 h-5 text-green-600" />;
      case "riesgo": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "optimizacion": return <Target className="w-5 h-5 text-blue-600" />;
      case "prediccion": return <Brain className="w-5 h-5 text-purple-600" />;
      default: return <CheckCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 75) return "text-blue-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Media": return "bg-yellow-100 text-yellow-800";
      case "Baja": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-purple-600" />
                <h1 className="text-xl font-semibold text-slate-900">IA & Insights</h1>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Brain className="w-4 h-4 mr-2" />
              Generar Análisis
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Precisión IA</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1 text-green-500" />
                    +2.1% vs mes anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Insights Activos</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insights.length}</div>
                  <p className="text-xs text-muted-foreground">
                    3 alta prioridad
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ahorro Estimado</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€28.7k</div>
                  <p className="text-xs text-muted-foreground">
                    por mes potencial
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leads Analizados</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">
                    este mes
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different AI insights */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="insights">Insights IA</TabsTrigger>
                <TabsTrigger value="predictions">Predicciones</TabsTrigger>
                <TabsTrigger value="scoring">Lead Scoring</TabsTrigger>
                <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Insights Generados por IA</CardTitle>
                    <CardDescription>
                      Análisis automático de patrones y oportunidades detectadas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {insights.map((insight) => (
                        <div key={insight.id} className="flex items-start space-x-4 p-4 border rounded-lg bg-white">
                          <div className="flex-shrink-0 mt-1">
                            {getInsightIcon(insight.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 mb-1">
                              {insight.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                            <div className="flex items-center space-x-4 text-xs">
                              <span className={`font-medium ${getConfidenceColor(insight.confidence)}`}>
                                {insight.confidence}% confianza
                              </span>
                              <Badge variant="outline">{insight.impact} impacto</Badge>
                              <span className="text-gray-500">{insight.action}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Progress value={insight.confidence} className="w-20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="predictions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Predicciones de Ventas</CardTitle>
                    <CardDescription>
                      Forecasting basado en IA con datos históricos y tendencias actuales
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesPredictions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [
                            `€${value?.toLocaleString()}`, 
                            name === 'prediccion' ? 'Predicción' : 'Real'
                          ]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="real" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          name="real"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="prediccion" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="prediccion"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scoring" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribución Lead Scoring</CardTitle>
                      <CardDescription>
                        Segmentación automática de leads por puntuación IA
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={leadScoring}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="cantidad"
                          >
                            {leadScoring.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Leads Calientes</CardTitle>
                      <CardDescription>
                        Leads con mayor probabilidad de conversión
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: "InnovaTech Corp", score: 95, trend: "up" },
                          { name: "Digital Solutions", score: 92, trend: "up" },
                          { name: "Future Systems", score: 89, trend: "stable" },
                          { name: "Smart Industries", score: 87, trend: "down" },
                          { name: "Tech Dynamics", score: 85, trend: "up" }
                        ].map((lead, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="font-medium">{lead.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold">{lead.score}%</span>
                              {lead.trend === "up" && <ArrowUp className="w-4 h-4 text-green-500" />}
                              {lead.trend === "down" && <ArrowDown className="w-4 h-4 text-red-500" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recomendaciones de Optimización</CardTitle>
                    <CardDescription>
                      Sugerencias basadas en IA para mejorar el rendimiento de ventas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendations.map((rec) => (
                        <div key={rec.id} className="flex items-start justify-between p-4 border rounded-lg bg-white">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-sm font-medium text-gray-900">{rec.title}</h3>
                              <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="font-medium text-green-600">
                                Ahorro potencial: {rec.savings}
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="ml-4">
                            Implementar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AIInsights;
