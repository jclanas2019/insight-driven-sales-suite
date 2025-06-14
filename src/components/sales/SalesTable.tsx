
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Receipt } from "lucide-react";
import { Sale } from "@/types/sales";

interface SalesTableProps {
  sales: Sale[];
  onGenerateInvoice: (sale: Sale) => void;
}

const formatCLP = (amount: number) => {
  return `$${amount.toLocaleString('es-CL')} CLP`;
};

export const SalesTable = ({ sales, onGenerateInvoice }: SalesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSales = sales.filter(sale =>
    sale.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Facturada": return "bg-blue-100 text-blue-800";
      case "Completada": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Ventas</CardTitle>
        <CardDescription>
          Gestiona las ventas generadas desde cotizaciones aprobadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar ventas..."
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
              <TableHead>Cliente</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.number}</TableCell>
                <TableCell>{sale.client}</TableCell>
                <TableCell>{sale.title}</TableCell>
                <TableCell>{formatCLP(sale.amount)}</TableCell>
                <TableCell>{sale.saleDate}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(sale.status)}>{sale.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {sale.status === "Pendiente" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onGenerateInvoice(sale)}
                      >
                        <Receipt className="w-4 h-4 mr-1" />
                        Facturar
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Ver
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
