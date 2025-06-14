
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCLP } from "@/lib/utils";

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

interface WhatsAppIntegrationProps {
  selectedQuote?: Quote | null;
}

export const WhatsAppIntegration = ({ selectedQuote }: WhatsAppIntegrationProps) => {
  const { toast } = useToast();

  const whatsappTemplates = {
    seguimiento: `Hola! Te escribo de [EMPRESA] para hacer seguimiento de la cotización ${selectedQuote?.number} por ${selectedQuote?.amount ? formatCLP(selectedQuote.amount) : ''}.

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

    const message = whatsappTemplates[template as keyof typeof whatsappTemplates];
    console.log("Enviando mensaje WhatsApp:", message);
    
    toast({
      title: "Mensaje enviado",
      description: `Mensaje de ${template} enviado por WhatsApp`,
    });
  };

  return (
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
              <p className="text-sm text-gray-600">Monto: {formatCLP(selectedQuote.amount)}</p>
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
  );
};
