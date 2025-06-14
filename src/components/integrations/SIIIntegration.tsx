
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
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

interface SIIIntegrationProps {
  selectedQuote?: Quote | null;
}

export const SIIIntegration = ({ selectedQuote }: SIIIntegrationProps) => {
  const { toast } = useToast();

  const handleSIIIntegration = () => {
    if (!selectedQuote) return;

    console.log("Integrando con SII para cotización:", selectedQuote.number);
    
    toast({
      title: "SII Integrado",
      description: "Datos preparados para facturación electrónica",
    });
  };

  return (
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
  );
};
