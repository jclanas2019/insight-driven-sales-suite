
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { Invoice } from "@/types/sales";
import { useToast } from "@/hooks/use-toast";

interface InvoicesTableProps {
  invoices: Invoice[];
  onUpdatePaymentStatus: (invoiceId: number, status: "Pendiente" | "Pagado" | "Vencido") => void;
}

const formatCLP = (amount: number) => {
  return `$${amount.toLocaleString('es-CL')} CLP`;
};

export const InvoicesTable = ({ invoices, onUpdatePaymentStatus }: InvoicesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredInvoices = invoices.filter(invoice =>
    invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Pagado": return "bg-green-100 text-green-800";
      case "Vencido": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSIIStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente": return "bg-gray-100 text-gray-800";
      case "Enviado": return "bg-blue-100 text-blue-800";
      case "Aceptado": return "bg-green-100 text-green-800";
      case "Rechazado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleMarkAsPaid = (invoice: Invoice) => {
    onUpdatePaymentStatus(invoice.id, "Pagado");
    toast({
      title: "Estado Actualizado",
      description: `Factura ${invoice.number} marcada como pagada`,
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facturas Electrónicas</CardTitle>
        <CardDescription>
          Gestión de boletas y facturas con integración SII
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar facturas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha Emisión</TableHead>
              <TableHead>Vencimiento</TableHead>
              <TableHead>Estado Pago</TableHead>
              <TableHead>Estado SII</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.number}</TableCell>
                <TableCell>
                  <Badge variant="outline">{invoice.type}</Badge>
                </TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{formatCLP(invoice.amount)}</TableCell>
                <TableCell>{invoice.issueDate}</TableCell>
                <TableCell className={isOverdue(invoice.dueDate) && invoice.paymentStatus !== "Pagado" ? "text-red-600 font-medium" : ""}>
                  {invoice.dueDate}
                </TableCell>
                <TableCell>
                  <Badge className={getPaymentStatusColor(
                    isOverdue(invoice.dueDate) && invoice.paymentStatus === "Pendiente" 
                      ? "Vencido" 
                      : invoice.paymentStatus
                  )}>
                    {isOverdue(invoice.dueDate) && invoice.paymentStatus === "Pendiente" 
                      ? "Vencido" 
                      : invoice.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getSIIStatusColor(invoice.siiStatus)}>
                    {invoice.siiStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {invoice.paymentStatus !== "Pagado" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMarkAsPaid(invoice)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Marcar Pagado
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Ver PDF
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
