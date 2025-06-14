
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Users, Activity } from "lucide-react";
import { PipelineStage, Deal } from "@/types/dashboard";
import { useDealScoring } from "@/hooks/useDealScoring";

interface PipelineSectionProps {
  stages: PipelineStage[];
  deals?: Deal[];
}

// Datos mock para demostrar el scoring
const mockDeals: Deal[] = [
  {
    id: 1,
    name: "Proyecto Software ABC",
    company: "Tech Solutions S.A.",
    value: 50000,
    stage: "Propuesta",
    probability: 70,
    closeDate: "2025-07-15",
    owner: "Ana García",
    interactions: { calls: 8, emails: 15, meetings: 3 },
    lastActivity: "2025-06-12",
    companySize: "large",
    industry: "Tecnología",
    leadActivity: "high"
  },
  {
    id: 2,
    name: "Implementación CRM",
    company: "Marketing Plus Ltda.",
    value: 25000,
    stage: "Negociación",
    probability: 85,
    closeDate: "2025-06-30",
    owner: "Carlos López",
    interactions: { calls: 3, emails: 8, meetings: 1 },
    lastActivity: "2025-06-10",
    companySize: "medium",
    industry: "Marketing",
    leadActivity: "medium"
  },
  {
    id: 3,
    name: "Consultoría Digital",
    company: "Innovate Corp",
    value: 15000,
    stage: "Calificación",
    probability: 45,
    closeDate: "2025-08-10",
    owner: "María Rodríguez",
    interactions: { calls: 1, emails: 3, meetings: 0 },
    lastActivity: "2025-05-28",
    companySize: "small",
    industry: "Retail",
    leadActivity: "low"
  }
];

export function PipelineSection({ stages, deals = mockDeals }: PipelineSectionProps) {
  const { calculateScore, getScoreColor, getScoreLabel } = useDealScoring();

  return (
    <div className="space-y-6">
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

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Scoring de Oportunidades</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {deals.map((deal) => {
            const score = calculateScore(deal);
            return (
              <div key={deal.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">{deal.name}</h4>
                    <p className="text-sm text-slate-500">{deal.company}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getScoreColor(score.level)}>
                      {getScoreLabel(score.level)}
                    </Badge>
                    <p className="text-xs text-slate-500 mt-1">
                      Score: {score.total}/100
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <Activity className="w-3 h-3 text-blue-500" />
                    <span>Interacciones: {score.breakdown.interactions}/25</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-3 h-3 text-green-500" />
                    <span>Recencia: {score.breakdown.recency}/25</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3 text-purple-500" />
                    <span>Empresa: {score.breakdown.company}/25</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-orange-500" />
                    <span>Actividad: {score.breakdown.activity}/25</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded p-2">
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Progreso del Score</span>
                    <span>{score.total}/100</span>
                  </div>
                  <Progress value={score.total} className="h-2" />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
