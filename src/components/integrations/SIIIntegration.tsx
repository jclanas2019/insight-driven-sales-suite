
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ShoppingCart } from "lucide-react";
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
  onGenerateSale?: (quote: Quote) => void;
}

export const SIIIntegration = ({ selectedQuote, onGenerateSale }: SIIIntegrationProps) => {
  const { toast } = useToast();

  const handleSIIIntegration = () => {
    if (!selectedQuote) return;

    console.log("Integrando con SII para cotización:", selectedQuote.number);
    
    toast({
      title: "SII Integrado",
      description: "Datos preparados para facturación electrónica",
    });
  };

  const handleGenerateSale = () => {
    if (!selectedQuote || !onGenerateSale) return;
    onGenerateSale(selectedQuote);
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
              <h4 className="font-medium text-green-800 mb-2">Lista para Proceso</h4>
              <p className="text-sm text-green-700">
                Cotización {selectedQuote.number} aprobada y lista para generar venta y factura electrónica
              </p>
            </div>
            
            <div className="space-y-2">
              <Button onClick={handleGenerateSale} className="w-full" variant="default">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Generar Venta
              </Button>
              
              <Button onClick={handleSIIIntegration} className="w-full" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Preparar Facturación SII
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Solo cotizaciones aprobadas pueden generar ventas y facturas
          </div>
        )}
      </CardContent>
    </Card>
  );
};
