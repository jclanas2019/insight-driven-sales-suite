
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Eye } from "lucide-react";

interface AnalysisMetric {
  label: string;
  value: number;
  status: "excellent" | "good" | "needs-improvement";
  description: string;
}

interface ConversationInsight {
  id: number;
  title: string;
  type: "opportunity" | "concern" | "success";
  description: string;
  confidence: number;
}

export const ConversationAnalysis = () => {
  const metrics: AnalysisMetric[] = [
    {
      label: "Tiempo de Habla del Cliente",
      value: 65,
      status: "excellent",
      description: "El cliente habló el 65% del tiempo - excelente escucha activa"
    },
    {
      label: "Preguntas Abiertas",
      value: 78,
      status: "good",
      description: "78% de preguntas fueron abiertas - buen descubrimiento"
    },
    {
      label: "Manejo de Objeciones",
      value: 45,
      status: "needs-improvement",
      description: "Solo se abordaron 45% de las objeciones identificadas"
    },
    {
      label: "Construcción de Rapport",
      value: 88,
      status: "excellent",
      description: "Excelente conexión emocional establecida"
    }
  ];

  const insights: ConversationInsight[] = [
    {
      id: 1,
      title: "Oportunidad de Cross-selling",
      type: "opportunity",
      description: "El cliente mencionó necesidades de capacitación que podrían complementar la propuesta principal",
      confidence: 92
    },
    {
      id: 2,
      title: "Preocupación sobre Presupuesto",
      type: "concern",
      description: "Se detectaron 3 menciones sobre restricciones presupuestarias en el Q4",
      confidence: 87
    },
    {
      id: 3,
      title: "Decisor Identificado",
      type: "success",
      description: "Se confirmó que María González tiene autoridad final para la decisión",
      confidence: 95
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "needs-improvement": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity": return "bg-green-100 text-green-800";
      case "concern": return "bg-red-100 text-red-800";
      case "success": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity": return <TrendingUp className="w-4 h-4" />;
      case "concern": return <AlertTriangle className="w-4 h-4" />;
      case "success": return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analysis Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Análisis de Conversación</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className={`text-sm font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}%
                  </span>
                </div>
                <Progress value={metric.value} className="h-2" />
                <p className="text-xs text-gray-600">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights de IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium">{insight.title}</h3>
                        <Badge className={getInsightColor(insight.type)}>
                          {insight.type === "opportunity" && "Oportunidad"}
                          {insight.type === "concern" && "Preocupación"}
                          {insight.type === "success" && "Éxito"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500">Confianza:</span>
                        <span className="text-xs font-medium">{insight.confidence}%</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
