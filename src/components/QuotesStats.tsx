
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, DollarSign, Calendar, Mic, BarChart3, Users, TrendingUp } from "lucide-react";

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

interface QuotesStatsProps {
  quotes: Quote[];
}

const formatCLP = (amount: number) => {
  return `$${amount.toLocaleString('es-CL')} CLP`;
};

export const QuotesStats = ({ quotes }: QuotesStatsProps) => {
  const totalAmount = quotes.reduce((sum, quote) => sum + quote.amount, 0);
  const approvedQuotes = quotes.filter(quote => quote.status === "Aprobada").length;
  const pendingQuotes = quotes.filter(quote => quote.status === "Enviada").length;
  
  // Datos mejorados para las nuevas funcionalidades
  const recordedMeetings = 15; // Incrementado
  const analysisScore = 87;
  const coachingSessions = 12;
  const detectedOpportunities = 23; // Nueva métrica

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Cotizaciones</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{quotes.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCLP(totalAmount)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{approvedQuotes}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingQuotes}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reuniones Grabadas</CardTitle>
          <Mic className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recordedMeetings}</div>
          <p className="text-xs text-green-600 mt-1">+3 esta semana</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Oportunidades IA</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{detectedOpportunities}</div>
          <p className="text-xs text-blue-600 mt-1">Detectadas automáticamente</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Score Análisis</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analysisScore}%</div>
          <p className="text-xs text-green-600 mt-1">+2% vs mes anterior</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sesiones Coaching</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{coachingSessions}</div>
          <p className="text-xs text-purple-600 mt-1">4 programadas</p>
        </CardContent>
      </Card>
    </div>
  );
};
