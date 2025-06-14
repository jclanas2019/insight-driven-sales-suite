
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sale, Invoice } from "@/types/sales";

interface GenerateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sale: Sale | null;
  onInvoiceGenerated: (invoice: Invoice) => void;
}

export const GenerateInvoiceDialog = ({ open, onOpenChange, sale, onInvoiceGenerated }: GenerateInvoiceDialogProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    type: "Boleta" as "Boleta" | "Factura",
    rutClient: "",
    address: "",
    dueDate: ""
  });

  const handleGenerateInvoice = async () => {
    if (!sale) return;

    if (formData.type === "Factura" && (!formData.rutClient || !formData.address)) {
      toast({
        title: "Error",
        description: "Para facturas se requiere RUT y dirección del cliente",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate SII integration
      const newInvoice: Invoice = {
        id: Math.floor(Math.random() * 10000),
        saleId: sale.id,
        number: formData.type === "Boleta" ? 
          `BOL-${String(Date.now()).slice(-6)}` : 
          `FAC-${String(Date.now()).slice(-6)}`,
        type: formData.type,
        client: sale.client,
        amount: sale.amount,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: formData.dueDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        paymentStatus: "Pendiente",
        siiStatus: "Pendiente",
        rutClient: formData.rutClient,
        address: formData.address
      };

      // Simulate SII submission
      setTimeout(() => {
        newInvoice.siiStatus = "Enviado";
        setTimeout(() => {
          newInvoice.siiStatus = "Aceptado";
        }, 2000);
      }, 1000);

      onInvoiceGenerated(newInvoice);
      
      toast({
        title: "Factura Generada",
        description: `${formData.type} ${newInvoice.number} enviada al SII exitosamente`,
      });

      onOpenChange(false);
      setFormData({
        type: "Boleta",
        rutClient: "",
        address: "",
        dueDate: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar la factura",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!sale) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-blue-600" />
            <span>Generar Factura Electrónica</span>
          </DialogTitle>
          <DialogDescription>
            Integración con SII para facturación electrónica
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Datos de la Venta</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Venta:</strong> {sale.number}</p>
              <p><strong>Cliente:</strong> {sale.client}</p>
              <p><strong>Monto:</strong> ${sale.amount.toLocaleString('es-CL')} CLP</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Documento</Label>
            <Select value={formData.type} onValueChange={(value: "Boleta" | "Factura") => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Boleta">Boleta Electrónica</SelectItem>
                <SelectItem value="Factura">Factura Electrónica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === "Factura" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="rutClient">RUT Cliente *</Label>
                <Input
                  id="rutClient"
                  value={formData.rutClient}
                  onChange={(e) => setFormData({...formData, rutClient: e.target.value})}
                  placeholder="12.345.678-9"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección Cliente *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Dirección completa del cliente"
                  required
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="dueDate">Fecha de Vencimiento</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Nota:</strong> La factura será enviada automáticamente al SII para su validación
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleGenerateInvoice} disabled={isGenerating}>
            <FileText className="w-4 h-4 mr-2" />
            {isGenerating ? "Enviando al SII..." : `Generar ${formData.type}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
