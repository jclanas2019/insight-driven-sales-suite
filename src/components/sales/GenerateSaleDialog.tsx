
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sale } from "@/types/sales";

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

interface GenerateSaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: Quote | null;
  onSaleGenerated: (sale: Sale) => void;
}

export const GenerateSaleDialog = ({ open, onOpenChange, quote, onSaleGenerated }: GenerateSaleDialogProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSale = async () => {
    if (!quote) return;

    setIsGenerating(true);

    try {
      // Simulate sale generation
      const newSale: Sale = {
        id: Math.floor(Math.random() * 10000),
        quoteId: quote.id,
        number: `VEN-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        client: quote.client,
        title: quote.title,
        amount: quote.amount,
        saleDate: new Date().toISOString().split('T')[0],
        status: "Pendiente"
      };

      onSaleGenerated(newSale);
      
      toast({
        title: "Venta Generada",
        description: `Venta ${newSale.number} generada exitosamente desde la cotización ${quote.number}`,
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar la venta",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!quote) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generar Venta</DialogTitle>
          <DialogDescription>
            Convertir cotización aprobada en venta
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Cotización Aprobada</h4>
            <div className="text-sm text-green-700 space-y-1">
              <p><strong>Número:</strong> {quote.number}</p>
              <p><strong>Cliente:</strong> {quote.client}</p>
              <p><strong>Título:</strong> {quote.title}</p>
              <p><strong>Monto:</strong> ${quote.amount.toLocaleString('es-CL')} CLP</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Número de Venta (se generará automáticamente)</Label>
            <Input 
              value={`VEN-${new Date().getFullYear()}-XXX`} 
              disabled 
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label>Fecha de Venta</Label>
            <Input 
              type="date" 
              value={new Date().toISOString().split('T')[0]} 
              disabled 
              className="bg-gray-100"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleGenerateSale} disabled={isGenerating}>
            <FileText className="w-4 h-4 mr-2" />
            {isGenerating ? "Generando..." : "Generar Venta"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
