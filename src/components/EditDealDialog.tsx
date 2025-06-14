
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Deal {
  id: number;
  name: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  closeDate: string;
  owner: string;
}

interface EditDealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deal: Deal | null;
  onUpdateDeal: (updatedDeal: Deal) => void;
}

export const EditDealDialog = ({ open, onOpenChange, deal, onUpdateDeal }: EditDealDialogProps) => {
  const [formData, setFormData] = useState<Deal>(
    deal || {
      id: 0,
      name: "",
      company: "",
      value: 0,
      stage: "Calificación",
      probability: 0,
      closeDate: "",
      owner: ""
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateDeal(formData);
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof Deal, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!deal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Oportunidad</DialogTitle>
          <DialogDescription>
            Modifica los datos de la oportunidad de venta.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="value">Valor</Label>
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={(e) => handleInputChange("value", Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label htmlFor="stage">Etapa</Label>
            <Select value={formData.stage} onValueChange={(value) => handleInputChange("stage", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar etapa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Calificación">Calificación</SelectItem>
                <SelectItem value="Propuesta">Propuesta</SelectItem>
                <SelectItem value="Negociación">Negociación</SelectItem>
                <SelectItem value="Cerrado Ganado">Cerrado Ganado</SelectItem>
                <SelectItem value="Cerrado Perdido">Cerrado Perdido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="probability">Probabilidad (%)</Label>
            <Input
              id="probability"
              type="number"
              min="0"
              max="100"
              value={formData.probability}
              onChange={(e) => handleInputChange("probability", Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label htmlFor="closeDate">Fecha de Cierre</Label>
            <Input
              id="closeDate"
              type="date"
              value={formData.closeDate}
              onChange={(e) => handleInputChange("closeDate", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="owner">Responsable</Label>
            <Input
              id="owner"
              value={formData.owner}
              onChange={(e) => handleInputChange("owner", e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Actualizar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
