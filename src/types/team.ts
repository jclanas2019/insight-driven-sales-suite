
export type UserRole = "Ejecutivo" | "Supervisor" | "Administrador";
export type InvitationStatus = "aceptado" | "pendiente" | "rebotado";

export interface TeamInvitation {
  id: string;
  email: string;
  role: UserRole;
  status: InvitationStatus;
  sentAt: Date;
  acceptedAt?: Date;
  revokedAt?: Date;
}
