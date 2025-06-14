
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, UserPlus, X, RotateCcw, Ban, CheckCircle, Clock, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { UserRole, InvitationStatus, TeamInvitation } from "@/types/team";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddTeamDialogProps {
  trigger?: React.ReactNode;
  onTeamAdded?: () => void;
}

interface PendingInvitation {
  email: string;
  role: UserRole;
}

export function AddTeamDialog({ trigger, onTeamAdded }: AddTeamDialogProps) {
  const [open, setOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("Ejecutivo");
  const [pendingInvitations, setPendingInvitations] = useState<PendingInvitation[]>([]);
  const [sentInvitations, setSentInvitations] = useState<TeamInvitation[]>([
    {
      id: "1",
      email: "maria.gonzalez@empresa.com",
      role: "Supervisor",
      status: "aceptado",
      sentAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      acceptedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      email: "carlos.mendoza@empresa.com",
      role: "Ejecutivo",
      status: "pendiente",
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "3",
      email: "ana.garcia@empresa.com",
      role: "Administrador",
      status: "rebotado",
      sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]);
  const { toast } = useToast();

  const handleEmailKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInvitation();
    }
  };

  const addInvitation = () => {
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

    if (pendingInvitations.some(inv => inv.email === trimmedEmail) || 
        sentInvitations.some(inv => inv.email === trimmedEmail)) {
      toast({
        title: "Error",
        description: "Este email ya ha sido agregado o invitado",
        variant: "destructive"
      });
      return;
    }

    setPendingInvitations(prev => [...prev, { email: trimmedEmail, role: selectedRole }]);
    setEmailInput("");
  };

  const removeInvitation = (emailToRemove: string) => {
    setPendingInvitations(prev => prev.filter(inv => inv.email !== emailToRemove));
  };

  const updateInvitationRole = (email: string, newRole: UserRole) => {
    setPendingInvitations(prev => 
      prev.map(inv => inv.email === email ? { ...inv, role: newRole } : inv)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pendingInvitations.length === 0) {
      toast({
        title: "Error",
        description: "Por favor agrega al menos un correo electrónico",
        variant: "destructive"
      });
      return;
    }

    const newInvitations: TeamInvitation[] = pendingInvitations.map(inv => ({
      id: Math.random().toString(36).substr(2, 9),
      email: inv.email,
      role: inv.role,
      status: "pendiente" as InvitationStatus,
      sentAt: new Date()
    }));

    setSentInvitations(prev => [...prev, ...newInvitations]);

    toast({
      title: "Invitaciones enviadas",
      description: `Se han enviado ${pendingInvitations.length} invitaciones exitosamente`,
    });

    setPendingInvitations([]);
    setEmailInput("");
    onTeamAdded?.();
  };

  const resendInvitation = (invitationId: string) => {
    setSentInvitations(prev => 
      prev.map(inv => 
        inv.id === invitationId 
          ? { ...inv, sentAt: new Date(), status: "pendiente" as InvitationStatus }
          : inv
      )
    );
    
    toast({
      title: "Invitación reenviada",
      description: "La invitación ha sido reenviada exitosamente",
    });
  };

  const revokeInvitation = (invitationId: string) => {
    setSentInvitations(prev => 
      prev.filter(inv => inv.id !== invitationId)
    );
    
    toast({
      title: "Invitación revocada",
      description: "La invitación ha sido revocada",
    });
  };

  const getStatusIcon = (status: InvitationStatus) => {
    switch (status) {
      case "aceptado": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pendiente": return <Clock className="w-4 h-4 text-yellow-600" />;
      case "rebotado": return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: InvitationStatus) => {
    switch (status) {
      case "aceptado": return "bg-green-100 text-green-800";
      case "pendiente": return "bg-yellow-100 text-yellow-800";
      case "rebotado": return "bg-red-100 text-red-800";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Invita a tu equipo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border border-slate-200 shadow-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-b border-slate-100 pb-4">
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            <span>Invita a tu equipo</span>
          </DialogTitle>
          <DialogDescription>
            Gestiona las invitaciones de tu equipo y define roles para cada miembro
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="new-invitation" className="pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-invitation">Nueva Invitación</TabsTrigger>
            <TabsTrigger value="manage-invitations">Gestionar Invitaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="new-invitation" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-input">Correo electrónico</Label>
                  <Input
                    id="email-input"
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyPress={handleEmailKeyPress}
                    placeholder="Ej: ejecutivo@empresa.com"
                    className="border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-select">Rol</Label>
                  <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ejecutivo">Ejecutivo</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="button" onClick={addInvitation} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Agregar invitación
              </Button>

              {pendingInvitations.length > 0 && (
                <div className="space-y-2">
                  <Label>Invitaciones pendientes de envío ({pendingInvitations.length})</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto border border-slate-200 rounded-md p-2">
                    {pendingInvitations.map((invitation, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm">
                        <div className="flex-1">
                          <span className="font-medium">{invitation.email}</span>
                          <Badge className="ml-2 bg-blue-100 text-blue-800">{invitation.role}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Select 
                            value={invitation.role} 
                            onValueChange={(value: UserRole) => updateInvitationRole(invitation.email, value)}
                          >
                            <SelectTrigger className="w-32 h-6 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ejecutivo">Ejecutivo</SelectItem>
                              <SelectItem value="Supervisor">Supervisor</SelectItem>
                              <SelectItem value="Administrador">Administrador</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeInvitation(invitation.email)}
                            className="h-6 w-6 p-0 hover:bg-slate-200"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <DialogFooter className="border-t border-slate-100 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Enviar Invitaciones ({pendingInvitations.length})
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="manage-invitations" className="space-y-4">
            <div className="space-y-3">
              {sentInvitations.map((invitation) => (
                <div key={invitation.id} className="border border-slate-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{invitation.email}</span>
                        <Badge className="bg-purple-100 text-purple-800">{invitation.role}</Badge>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(invitation.status)}
                          <Badge className={getStatusColor(invitation.status)}>
                            {invitation.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600">
                        Enviado: {formatDate(invitation.sentAt)}
                        {invitation.acceptedAt && (
                          <span className="ml-2">• Aceptado: {formatDate(invitation.acceptedAt)}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {invitation.status !== "aceptado" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => resendInvitation(invitation.id)}
                            className="text-xs"
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Reenviar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revokeInvitation(invitation.id)}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            <Ban className="w-3 h-3 mr-1" />
                            Revocar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
