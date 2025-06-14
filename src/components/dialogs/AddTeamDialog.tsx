
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, UserPlus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddTeamDialogProps {
  trigger?: React.ReactNode;
  onTeamAdded?: () => void;
}

export function AddTeamDialog({ trigger, onTeamAdded }: AddTeamDialogProps) {
  const [open, setOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const { toast } = useToast();

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    const trimmedEmail = emailInput.trim();
    
    if (!trimmedEmail) return;
    
    if (!trimmedEmail.includes("@")) {
      toast({
        title: "Error",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      });
      return;
    }

    if (emails.includes(trimmedEmail)) {
      toast({
        title: "Error",
        description: "Este email ya ha sido agregado",
        variant: "destructive"
      });
      return;
    }

    setEmails(prev => [...prev, trimmedEmail]);
    setEmailInput("");
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(prev => prev.filter(email => email !== emailToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emails.length === 0) {
      toast({
        title: "Error",
        description: "Por favor agrega al menos un correo electrónico",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Invitaciones enviadas",
      description: `Se han enviado ${emails.length} invitaciones exitosamente`,
    });

    setOpen(false);
    setEmails([]);
    setEmailInput("");
    onTeamAdded?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Invita a tu equipo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            <span>Invita a tu equipo</span>
          </DialogTitle>
          <DialogDescription>
            Ingresa el correo de los ejecutivos a quienes quieras invitar a usar diio. Presiona [Enter] para agregar cada correo
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-input">Correos electrónicos</Label>
            <Input
              id="email-input"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyPress={handleEmailKeyPress}
              placeholder="Ej: ejecutivo@empresa.com"
            />
            <p className="text-xs text-slate-500">Presiona Enter para agregar cada correo</p>
          </div>

          {emails.length > 0 && (
            <div className="space-y-2">
              <Label>Correos agregados ({emails.length})</Label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {emails.map((email, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-50 rounded px-2 py-1 text-sm">
                    <span>{email}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEmail(email)}
                      className="h-6 w-6 p-0 hover:bg-slate-200"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Enviar Invitaciones ({emails.length})
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
