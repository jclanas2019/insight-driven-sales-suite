
export interface Sale {
  id: number;
  quoteId: number;
  number: string;
  client: string;
  title: string;
  amount: number;
  saleDate: string;
  invoiceId?: number;
  status: "Pendiente" | "Facturada" | "Completada";
}

export interface Invoice {
  id: number;
  saleId: number;
  number: string;
  type: "Boleta" | "Factura";
  client: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  paymentStatus: "Pendiente" | "Pagado" | "Vencido";
  siiStatus: "Pendiente" | "Enviado" | "Aceptado" | "Rechazado";
  rutClient?: string;
  address?: string;
}
