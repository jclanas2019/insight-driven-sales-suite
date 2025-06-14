
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, DollarSign, Calendar } from "lucide-react";

interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  closeDate: string;
  owner: string;
}

interface DealsStatisticsProps {
  deals: Deal[];
}

const formatCLP = (amount: number) => {
  return `$${amount.toLocaleString('es-CL')} CLP`;
};

export const DealsStatistics = ({ deals }: DealsStatisticsProps) => {
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const avgProbability = deals.reduce((sum, deal) => sum + deal.probability, 0) / deals.length;
  const negotiationDeals = deals.filter(deal => deal.stage === "Negociación").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Oportunidades</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deals.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCLP(totalValue)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Probabilidad Promedio</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgProbability.toFixed(0)}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En Negociación</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{negotiationDeals}</div>
        </CardContent>
      </Card>
    </div>
  );
};
