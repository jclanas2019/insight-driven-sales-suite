
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface EditCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign | null;
  onUpdateCampaign: (updatedCampaign: Campaign) => void;
}

export const EditCampaignDialog = ({ open, onOpenChange, campaign, onUpdateCampaign }: EditCampaignDialogProps) => {
  const [formData, setFormData] = useState<Campaign>({
    id: 0,
    name: "",
    subject: "",
    status: "Borrador",
    recipients: 0,
    opens: 0,
    clicks: 0,
    sendDate: "",
    type: "Newsletter"
  });

  useEffect(() => {
    if (campaign) {
      setFormData(campaign);
    }
  }, [campaign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCampaign(formData);
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof Campaign, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!campaign) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Campaña</DialogTitle>
          <DialogDescription>
            Modifica los datos de la campaña de email.
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
            <Label htmlFor="subject">Asunto</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
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
          <div>
            <Label htmlFor="recipients">Destinatarios</Label>
            <Input
              id="recipients"
              type="number"
              value={formData.recipients}
              onChange={(e) => handleInputChange("recipients", Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label htmlFor="sendDate">Fecha de Envío</Label>
            <Input
              id="sendDate"
              type="date"
              value={formData.sendDate}
              onChange={(e) => handleInputChange("sendDate", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
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
