
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
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

interface AddQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (quote: Omit<Quote, 'id'>) => void;
}

export const AddQuoteDialog = ({ open, onOpenChange, onAdd }: AddQuoteDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    number: "",
    client: "",
    title: "",
    amount: "",
    status: "Borrador",
    validUntil: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client || !formData.title || !formData.amount || !formData.validUntil) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const newQuote = {
      number: formData.number || `COT-2025-${String(Date.now()).slice(-3)}`,
      client: formData.client,
      title: formData.title,
      amount: parseFloat(formData.amount),
      status: formData.status,
      validUntil: formData.validUntil,
      createdDate: new Date().toISOString().split('T')[0],
    };

    onAdd(newQuote);
    setFormData({
      number: "",
      client: "",
      title: "",
      amount: "",
      status: "Borrador",
      validUntil: "",
    });
    onOpenChange(false);
    
    toast({
      title: "Cotización creada",
      description: "La cotización se ha creado exitosamente.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Cotización
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Cotización</DialogTitle>
          <DialogDescription>
            Complete los datos para crear una nueva cotización.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="number">Número de Cotización</Label>
            <Input
              id="number"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              placeholder="Se generará automáticamente si se deja vacío"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client">Cliente *</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              placeholder="Nombre del cliente"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Título de la cotización"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Monto *</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Borrador">Borrador</option>
              <option value="Enviada">Enviada</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Rechazada">Rechazada</option>
              <option value="Vencida">Vencida</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="validUntil">Válida Hasta *</Label>
            <Input
              id="validUntil"
              type="date"
              value={formData.validUntil}
              onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Cotización</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
