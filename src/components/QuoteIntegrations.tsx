
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Globe, Building, FileText, Send, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [integrationStatus, setIntegrationStatus] = useState({
    whatsapp: false,
    sii: false,
    googleAds: false,
    previred: false
  });

  // Plantillas predefinidas para Chile
  const whatsappTemplates = {
    seguimiento: `Hola! Te escribo de [EMPRESA] para hacer seguimiento de la cotización ${selectedQuote?.number} por $${selectedQuote?.amount?.toLocaleString()}.

¿Tienes alguna consulta? ¿Necesitas ajustes en la propuesta?

Quedo atento a tus comentarios 📋`,
    recordatorio: `Hola! Te recordamos que la cotización ${selectedQuote?.number} vence el ${selectedQuote?.validUntil}.

Si necesitas una extensión o tienes consultas, no dudes en contactarnos.

¡Estamos para ayudarte! 💪`,
    aprobacion: `¡Excelente! La cotización ${selectedQuote?.number} ha sido aprobada.

Próximos pasos:
✅ Envío de OC/contrato
✅ Coordinación de entrega
✅ Facturación

Te contactaremos pronto para coordinar detalles.`
  };

  const handleWhatsAppSend = (template: string) => {
    if (!selectedQuote) {
      toast({
        title: "Error",
        description: "Selecciona una cotización primero",
        variant: "destructive",
      });
      return;
    }

    // Simular envío a WhatsApp Business API
    const message = whatsappTemplates[template as keyof typeof whatsappTemplates];
    console.log("Enviando mensaje WhatsApp:", message);
    
    toast({
      title: "Mensaje enviado",
      description: `Mensaje de ${template} enviado por WhatsApp`,
    });
  };

  const handleSIIIntegration = () => {
    if (!selectedQuote) return;

    // Simular integración con SII para facturación
    console.log("Integrando con SII para cotización:", selectedQuote.number);
    
    toast({
      title: "SII Integrado",
      description: "Datos preparados para facturación electrónica",
    });
  };

  const handleGoogleAdsSync = () => {
    console.log("Sincronizando con Google Ads para remarketing");
    
    toast({
      title: "Google Ads Sincronizado",
      description: "Audiencias actualizadas para remarketing",
    });
  };

  return (
    <div className="space-y-6">
      {/* Estado de Integraciones */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">WhatsApp</p>
              <Badge variant={integrationStatus.whatsapp ? "default" : "outline"}>
                {integrationStatus.whatsapp ? "Conectado" : "Desconectado"}
              </Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">SII</p>
              <Badge variant={integrationStatus.sii ? "default" : "outline"}>
                {integrationStatus.sii ? "Conectado" : "Desconectado"}
              </Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-medium">Google Ads</p>
              <Badge variant={integrationStatus.googleAds ? "default" : "outline"}>
                {integrationStatus.googleAds ? "Conectado" : "Desconectado"}
              </Badge>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium">Previred</p>
              <Badge variant={integrationStatus.previred ? "default" : "outline"}>
                {integrationStatus.previred ? "Conectado" : "Desconectado"}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="whatsapp" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="sii">SII</TabsTrigger>
          <TabsTrigger value="ads">Google Ads</TabsTrigger>
          <TabsTrigger value="previred">Previred</TabsTrigger>
        </TabsList>

        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business</CardTitle>
              <CardDescription>
                Envía seguimiento automático por WhatsApp usando plantillas optimizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedQuote ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Cotización Seleccionada:</h4>
                    <p className="text-sm">{selectedQuote.number} - {selectedQuote.client}</p>
                    <p className="text-sm text-gray-600">Monto: ${selectedQuote.amount.toLocaleString()}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button onClick={() => handleWhatsAppSend("seguimiento")} className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Seguimiento
                    </Button>
                    <Button onClick={() => handleWhatsAppSend("recordatorio")} variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Recordatorio
                    </Button>
                    <Button onClick={() => handleWhatsAppSend("aprobacion")} variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Aprobación
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Selecciona una cotización para enviar mensajes personalizados
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sii" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integración SII</CardTitle>
              <CardDescription>
                Sincronización con Servicio de Impuestos Internos para facturación electrónica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedQuote?.status === "Aprobada" ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Lista para Facturación</h4>
                    <p className="text-sm text-green-700">
                      Cotización {selectedQuote.number} aprobada y lista para generar factura electrónica
                    </p>
                  </div>
                  
                  <Button onClick={handleSIIIntegration} className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Generar Factura Electrónica
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Solo cotizaciones aprobadas pueden generar facturas
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Google Ads</CardTitle>
              <CardDescription>
                Sincroniza datos para remarketing y optimización de campañas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Audiencias Disponibles</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Clientes con cotizaciones pendientes</li>
                    <li>• Clientes que no respondieron en 7 días</li>
                    <li>• Clientes con cotizaciones de alto valor</li>
                  </ul>
                </div>
                
                <Button onClick={handleGoogleAdsSync} className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Sincronizar Audiencias
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="previred" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Previred</CardTitle>
              <CardDescription>
                Integración para gestión de recursos humanos y nóminas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Funcionalidades Disponibles</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Validación de RUT de clientes</li>
                  <li>• Verificación de datos empresariales</li>
                  <li>• Sincronización de comisiones de ventas</li>
                </ul>
              </div>
              
              <Button variant="outline" className="w-full">
                <Building className="w-4 h-4 mr-2" />
                Configurar Integración
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
