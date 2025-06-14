
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Edit, Trash2 } from "lucide-react";

interface Quote {
  id: number;
  number: string;
  client: string;
  title: string;
  amount: number;
  status: string;
  validUntil: string;
  createdDate: string;
}

interface QuotesTableProps {
  quotes: Quote[];
  onRowClick: (quote: Quote) => void;
  onEditQuote: (quote: Quote) => void;
  onDeleteQuote: (quote: Quote) => void;
}

const formatCLP = (amount: number) => {
  return `$${amount.toLocaleString('es-CL')} CLP`;
};

export const QuotesTable = ({ quotes, onRowClick, onEditQuote, onDeleteQuote }: QuotesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuotes = quotes.filter(quote =>
    quote.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Borrador": return "bg-gray-100 text-gray-800";
      case "Enviada": return "bg-blue-100 text-blue-800";
      case "Aprobada": return "bg-green-100 text-green-800";
      case "Rechazada": return "bg-red-100 text-red-800";
      case "Vencida": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Cotizaciones</CardTitle>
        <CardDescription>
          Gestiona y da seguimiento a todas tus cotizaciones. Haz clic en una fila para ver análisis IA.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cotizaciones..."
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
              <TableHead>Estado</TableHead>
              <TableHead>Válida Hasta</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.map((quote) => (
              <TableRow 
                key={quote.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onRowClick(quote)}
              >
                <TableCell className="font-medium">{quote.number}</TableCell>
                <TableCell>{quote.client}</TableCell>
                <TableCell>{quote.title}</TableCell>
                <TableCell>{formatCLP(quote.amount)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                </TableCell>
                <TableCell>{quote.validUntil}</TableCell>
                <TableCell>{quote.createdDate}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEditQuote(quote)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onDeleteQuote(quote)}
                    >
                      <Trash2 className="w-4 h-4" />
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
