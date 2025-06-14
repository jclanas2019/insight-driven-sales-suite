
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Globe, Building, FileText } from "lucide-react";
import { IntegrationStatusCard } from "@/components/integrations/IntegrationStatusCard";
import { WhatsAppIntegration } from "@/components/integrations/WhatsAppIntegration";
import { SIIIntegration } from "@/components/integrations/SIIIntegration";
import { GoogleAdsIntegration } from "@/components/integrations/GoogleAdsIntegration";
import { PreviredIntegration } from "@/components/integrations/PreviredIntegration";

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

interface QuoteIntegrationsProps {
  selectedQuote?: Quote | null;
}

export const QuoteIntegrations = ({ selectedQuote }: QuoteIntegrationsProps) => {
  const [integrationStatus] = useState({
    whatsapp: false,
    sii: false,
    googleAds: false,
    previred: false
  });

  return (
    <div className="space-y-6">
      {/* Estado de Integraciones */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <IntegrationStatusCard
          icon={MessageSquare}
          name="WhatsApp"
          isConnected={integrationStatus.whatsapp}
          iconColor="text-green-600"
        />
        <IntegrationStatusCard
          icon={Building}
          name="SII"
          isConnected={integrationStatus.sii}
          iconColor="text-blue-600"
        />
        <IntegrationStatusCard
          icon={Globe}
          name="Google Ads"
          isConnected={integrationStatus.googleAds}
          iconColor="text-red-600"
        />
        <IntegrationStatusCard
          icon={FileText}
          name="Previred"
          isConnected={integrationStatus.previred}
          iconColor="text-orange-600"
        />
      </div>

      <Tabs defaultValue="whatsapp" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="sii">SII</TabsTrigger>
          <TabsTrigger value="ads">Google Ads</TabsTrigger>
          <TabsTrigger value="previred">Previred</TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="space-y-4">
          <WhatsAppIntegration selectedQuote={selectedQuote} />
        </TabsContent>

        <TabsContent value="sii" className="space-y-4">
          <SIIIntegration selectedQuote={selectedQuote} />
        </TabsContent>

        <TabsContent value="ads" className="space-y-4">
          <GoogleAdsIntegration />
        </TabsContent>

        <TabsContent value="previred" className="space-y-4">
          <PreviredIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};
