
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Activity {
  id: number;
  type: string;
  subject: string;
  contact: string;
  company: string;
  date: string;
  time: string;
  status: string;
  duration: string;
  owner: string;
}

interface EditActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: Activity | null;
  onUpdateActivity: (updatedActivity: Activity) => void;
}

export const EditActivityDialog = ({ open, onOpenChange, activity, onUpdateActivity }: EditActivityDialogProps) => {
  const [formData, setFormData] = useState<Activity>(
    activity || {
      id: 0,
      type: "Llamada",
      subject: "",
      contact: "",
      company: "",
      date: "",
      time: "",
      status: "Programada",
      duration: "",
      owner: ""
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateActivity(formData);
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof Activity, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!activity) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Actividad</DialogTitle>
          <DialogDescription>
            Modifica los datos de la actividad.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Llamada">Llamada</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Reunión">Reunión</SelectItem>
              </SelectContent>
            </Select>
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
            <Label htmlFor="contact">Contacto</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => handleInputChange("contact", e.target.value)}
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
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="time">Hora</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Programada">Programada</SelectItem>
                <SelectItem value="Completada">Completada</SelectItem>
                <SelectItem value="Enviado">Enviado</SelectItem>
                <SelectItem value="Perdida">Perdida</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="duration">Duración</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="ej: 30 min"
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
