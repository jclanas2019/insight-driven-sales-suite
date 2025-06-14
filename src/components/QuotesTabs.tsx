
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare } from "lucide-react";
import { QuoteAIInsights } from "@/components/QuoteAIInsights";
import { QuoteIntegrations } from "@/components/QuoteIntegrations";
import { QuotesTable } from "@/components/QuotesTable";

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

interface QuotesTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  quotes: Quote[];
  selectedQuote: Quote | null;
  onRowClick: (quote: Quote) => void;
  onEditQuote: (quote: Quote) => void;
  onDeleteQuote: (quote: Quote) => void;
  onGenerateSale?: (quote: Quote) => void;
}

export const QuotesTabs = ({
  activeTab,
  onTabChange,
  quotes,
  selectedQuote,
  onRowClick,
  onEditQuote,
  onDeleteQuote,
  onGenerateSale
}: QuotesTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="lista">Lista de Cotizaciones</TabsTrigger>
        <TabsTrigger value="ia-insights">IA & Predicciones</TabsTrigger>
        <TabsTrigger value="integraciones">Integraciones</TabsTrigger>
      </TabsList>

      <TabsContent value="lista" className="space-y-4">
        <QuotesTable
          quotes={quotes}
          onRowClick={onRowClick}
          onEditQuote={onEditQuote}
          onDeleteQuote={onDeleteQuote}
        />
      </TabsContent>

      <TabsContent value="ia-insights" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>Inteligencia Artificial para Ventas</span>
            </CardTitle>
            <CardDescription>
              Predicciones, análisis de riesgo y recomendaciones basadas en IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuoteAIInsights quotes={quotes} selectedQuote={selectedQuote} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="integraciones" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <span>Integraciones Nativas</span>
            </CardTitle>
            <CardDescription>
              WhatsApp Business, SII, Google Ads y plataformas chilenas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuoteIntegrations selectedQuote={selectedQuote} onGenerateSale={onGenerateSale} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
