
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";
import { PipelineStage } from "@/types/dashboard";

interface PipelineSectionProps {
  stages: PipelineStage[];
}

export function PipelineSection({ stages }: PipelineSectionProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-blue-600" />
          <span>Pipeline de Ventas</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stages.map((stage) => (
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
  );
}
