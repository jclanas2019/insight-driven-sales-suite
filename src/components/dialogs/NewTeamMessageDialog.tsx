
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Send, Users, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewTeamMessageDialogProps {
  trigger?: React.ReactNode;
  onMessageSent?: () => void;
}

export function NewTeamMessageDialog({ trigger, onMessageSent }: NewTeamMessageDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    priority: "media",
    recipients: [] as string[]
  });
  const [newRecipient, setNewRecipient] = useState("");
  const { toast } = useToast();

  const teamMembers = [
    "María González", "Carlos Mendoza", "Ana García", "Roberto Silva", 
    "Laura Pérez", "Diego Martín", "Sofia Rodriguez", "Miguel Torres"
  ];

  const handleAddRecipient = (recipient: string) => {
    if (recipient && !formData.recipients.includes(recipient)) {
      setFormData(prev => ({
        ...prev,
        recipients: [...prev.recipients, recipient]
      }));
      setNewRecipient("");
    }
  };

  const handleRemoveRecipient = (recipient: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.filter(r => r !== recipient)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.message || formData.recipients.length === 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mensaje enviado",
      description: `Mensaje "${formData.subject}" enviado a ${formData.recipients.length} miembro(s) del equipo`,
    });

    setOpen(false);
    setFormData({
      subject: "",
      message: "",
      priority: "media",
      recipients: []
    });
    onMessageSent?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Mensaje
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nuevo Mensaje de Equipo</DialogTitle>
          <DialogDescription>
            Envía un mensaje a los miembros de tu equipo
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Asunto *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Ej: Actualización del Pipeline Q4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">Baja</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Destinatarios *</Label>
            <Select value={newRecipient} onValueChange={handleAddRecipient}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar miembro del equipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todo el equipo</SelectItem>
                {teamMembers.filter(member => !formData.recipients.includes(member)).map((member) => (
                  <SelectItem key={member} value={member}>{member}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.recipients.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.recipients.map((recipient) => (
                  <Badge key={recipient} variant="secondary" className="flex items-center gap-1">
                    {recipient}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => handleRemoveRecipient(recipient)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Enviar Mensaje
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
