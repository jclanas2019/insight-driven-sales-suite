
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Campaign {
  id: number;
  name: string;
  subject: string;
  status: string;
  recipients: number;
  opens: number;
  clicks: number;
  sendDate: string;
  type: string;
}

interface AddCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCampaign: (campaign: Omit<Campaign, 'id' | 'opens' | 'clicks'>) => void;
}

export function AddCampaignDialog({ open, onOpenChange, onAddCampaign }: AddCampaignDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    status: "Borrador",
    recipients: 0,
    sendDate: "",
    type: "Newsletter"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.subject) {
      onAddCampaign(formData);
      setFormData({
        name: "",
        subject: "",
        status: "Borrador",
        recipients: 0,
        sendDate: "",
        type: "Newsletter"
      });
      onOpenChange(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Crear Nueva Campaña</DialogTitle>
            <DialogDescription>
              Crea una nueva campaña de email marketing para tus contactos.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="col-span-3"
                placeholder="Nombre de la campaña"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Asunto *
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                className="col-span-3"
                placeholder="Asunto del email"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Newsletter">Newsletter</SelectItem>
                  <SelectItem value="Promocional">Promocional</SelectItem>
                  <SelectItem value="Secuencia">Secuencia</SelectItem>
                  <SelectItem value="Reactivación">Reactivación</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipients" className="text-right">
                Destinatarios
              </Label>
              <Input
                id="recipients"
                type="number"
                value={formData.recipients}
                onChange={(e) => handleInputChange("recipients", Number(e.target.value))}
                className="col-span-3"
                placeholder="Número de destinatarios"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sendDate" className="text-right">
                Fecha de Envío
              </Label>
              <Input
                id="sendDate"
                type="date"
                value={formData.sendDate}
                onChange={(e) => handleInputChange("sendDate", e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Estado
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Borrador">Borrador</SelectItem>
                  <SelectItem value="Programada">Programada</SelectItem>
                  <SelectItem value="Enviada">Enviada</SelectItem>
                  <SelectItem value="Pausada">Pausada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Campaña</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
