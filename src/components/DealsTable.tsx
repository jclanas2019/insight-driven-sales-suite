
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, User, Edit, Trash2 } from "lucide-react";
import { Deal } from "@/types/dashboard";
import { useDealScoring } from "@/hooks/useDealScoring";

interface DealsTableProps {
  deals: Deal[];
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (deal: Deal) => void;
}

export const DealsTable = ({ deals, onEditDeal, onDeleteDeal }: DealsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { calculateScore, getScoreColor, getScoreLabel } = useDealScoring();

  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Propuesta": return "bg-blue-100 text-blue-800";
      case "Negociación": return "bg-orange-100 text-orange-800";
      case "Calificación": return "bg-yellow-100 text-yellow-800";
      case "Cerrado Ganado": return "bg-green-100 text-green-800";
      case "Cerrado Perdido": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline de Ventas</CardTitle>
        <CardDescription>
          Gestiona tus oportunidades de venta y pipeline comercial con sistema de scoring inteligente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar oportunidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Etapa</TableHead>
              <TableHead>Nivel Madurez</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Probabilidad</TableHead>
              <TableHead>Cierre Estimado</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeals.map((deal) => {
              const score = calculateScore(deal);
              return (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.name}</TableCell>
                  <TableCell>{deal.company}</TableCell>
                  <TableCell>${deal.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getScoreColor(score.level)}>
                      {getScoreLabel(score.level)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{score.total}/100</span>
                  </TableCell>
                  <TableCell>{deal.probability}%</TableCell>
                  <TableCell>{deal.closeDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {deal.owner}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditDeal(deal)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteDeal(deal)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
