
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";
import type { PerformanceMetric } from "@/types/coaching";

interface PerformanceOverviewProps {
  metrics: PerformanceMetric[];
}

export const PerformanceOverview = ({ metrics }: PerformanceOverviewProps) => {
  const formatCLP = (amount: number) => {
    return `$${amount.toLocaleString('es-CL')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Rendimiento de Ventas</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
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
  );
};
