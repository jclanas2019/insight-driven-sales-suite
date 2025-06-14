import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, AlertTriangle, Target, CheckCircle, Clock, DollarSign } from "lucide-react";

interface Quote {
  id: number;
  number: string;
  client: string;
  title: string;
  amount: number;
  status: string;
  validUntil: string;
  createdDate: string;
}

interface QuoteAIInsightsProps {
  quotes: Quote[];
  selectedQuote?: Quote | null;
}

interface AIInsight {
  type: "prediccion" | "riesgo" | "oportunidad" | "accion";
  title: string;
  description: string;
  confidence: number;
  priority: "Alta" | "Media" | "Baja";
  action?: string;
  impact?: string;
}

const formatCLP = (amount: number) => {
  return `$${amount.toLocaleString('es-CL')} CLP`;
};

export const QuoteAIInsights = ({ quotes, selectedQuote }: QuoteAIInsightsProps) => {
  const [activeTab, setActiveTab] = useState("predicciones");

  // Simulación de predicciones de IA para cotizaciones
  const generateQuotePredictions = (quote: Quote) => {
    const daysToExpiry = Math.ceil((new Date(quote.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const quoteAge = Math.ceil((new Date().getTime() - new Date(quote.createdDate).getTime()) / (1000 * 60 * 60 * 24));
    
    let closeProbability = 70;
    let riskLevel = "Bajo";
    
    // Ajustar probabilidad basada en estado y tiempo
    if (quote.status === "Aprobada") closeProbability = 95;
    else if (quote.status === "Enviada" && daysToExpiry > 10) closeProbability = 75;
    else if (quote.status === "Enviada" && daysToExpiry < 5) closeProbability = 45;
    else if (quote.status === "Vencida") closeProbability = 15;
    
    // Evaluar riesgo de abandono
    if (daysToExpiry < 3 && quote.status === "Enviada") riskLevel = "Alto";
    else if (quoteAge > 7 && quote.status === "Borrador") riskLevel = "Medio";
    
    return { closeProbability, riskLevel, daysToExpiry, quoteAge };
  };

  // Insights generales del pipeline de cotizaciones
  const pipelineInsights: AIInsight[] = [
    {
      type: "prediccion",
      title: "Proyección de Ingresos",
      description: "Las cotizaciones actuales proyectan $88.400.000 CLP en ingresos para este trimestre",
      confidence: 87,
      priority: "Alta",
      impact: "$88.400.000 CLP"
    },
    {
      type: "riesgo",
      title: "Cotizaciones en Riesgo",
      description: "3 cotizaciones están próximas a vencer sin respuesta del cliente",
      confidence: 92,
      priority: "Alta",
      action: "Contactar clientes en 24h"
    },
    {
      type: "oportunidad",
      title: "Momento Óptimo de Seguimiento",
      description: "Los martes a las 10 AM tienen 40% más éxito en seguimiento de cotizaciones",
      confidence: 78,
      priority: "Media",
      action: "Programar llamadas para martes"
    },
    {
      type: "accion",
      title: "Personalización por Sector",
      description: "Sector tecnológico responde mejor a cotizaciones con descuentos por volumen",
      confidence: 83,
      priority: "Media",
      action: "Ajustar estrategia de precios"
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "prediccion": return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case "riesgo": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "oportunidad": return <Target className="w-5 h-5 text-green-600" />;
      case "accion": return <CheckCircle className="w-5 h-5 text-purple-600" />;
      default: return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Media": return "bg-yellow-100 text-yellow-800";
      case "Baja": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalValue = quotes.reduce((sum, quote) => sum + quote.amount, 0);
  const avgCloseTime = 14; // días promedio
  const conversionRate = 67; // porcentaje

  return (
    <div className="space-y-6">
      {/* Métricas de IA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predicción de Cierre</CardTitle>
            <Brain className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Pipeline actual
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCloseTime} días</div>
            <p className="text-xs text-muted-foreground">
              Desde envío a cierre
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Proyectado</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCLP(Math.round(totalValue * 0.67))}</div>
            <p className="text-xs text-muted-foreground">
              Basado en IA
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="predicciones">Predicciones</TabsTrigger>
          <TabsTrigger value="analisis">Análisis Individual</TabsTrigger>
          <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="predicciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insights del Pipeline</CardTitle>
              <CardDescription>
                Análisis automático de patrones y tendencias en cotizaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelineInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg bg-white">
                    <div className="flex-shrink-0 mt-1">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="font-medium text-blue-600">
                          {insight.confidence}% confianza
                        </span>
                        <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                        {insight.action && (
                          <span className="text-gray-500">{insight.action}</span>
                        )}
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

        <TabsContent value="analisis" className="space-y-4">
          {selectedQuote ? (
            <Card>
              <CardHeader>
                <CardTitle>Análisis IA: {selectedQuote.number}</CardTitle>
                <CardDescription>
                  Predicciones específicas para esta cotización
                </CardDescription>
              </CardHeader>
              <CardContent>
                {(() => {
                  const analysis = generateQuotePredictions(selectedQuote);
                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Probabilidad de Cierre</h4>
                          <div className="flex items-center space-x-2">
                            <Progress value={analysis.closeProbability} className="flex-1" />
                            <span className="text-sm font-bold">{analysis.closeProbability}%</span>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Nivel de Riesgo</h4>
                          <Badge className={
                            analysis.riskLevel === "Alto" ? "bg-red-100 text-red-800" :
                            analysis.riskLevel === "Medio" ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }>
                            {analysis.riskLevel}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Recomendaciones Específicas</h4>
                        <div className="space-y-2">
                          {analysis.daysToExpiry < 5 && (
                            <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                              <p className="text-sm text-orange-800">
                                ⚠️ Cotización vence en {analysis.daysToExpiry} días. Contactar cliente urgente.
                              </p>
                            </div>
                          )}
                          {selectedQuote.status === "Borrador" && analysis.quoteAge > 3 && (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                              <p className="text-sm text-blue-800">
                                📤 Cotización en borrador {analysis.quoteAge} días. Considerar envío inmediato.
                              </p>
                            </div>
                          )}
                          {selectedQuote.amount > 15000000 && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded">
                              <p className="text-sm text-green-800">
                                💎 Alto valor comercial. Programar reunión personalizada.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-gray-500">Selecciona una cotización para ver análisis específico</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recomendaciones" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones Inmediatas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-3 border-l-4 border-red-500 bg-red-50">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Contactar 3 clientes hoy</p>
                    <p className="text-xs text-red-700">Cotizaciones próximas a vencer</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 border-l-4 border-orange-500 bg-orange-50">
                  <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">Enviar 2 borradores</p>
                    <p className="text-xs text-orange-700">Más de 5 días sin enviar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Optimizaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                  <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Ajustar precios sector tech</p>
                    <p className="text-xs text-blue-700">+15% conversión esperada</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 border-l-4 border-green-500 bg-green-50">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Seguimiento martes 10 AM</p>
                    <p className="text-xs text-green-700">Horario óptimo identificado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
