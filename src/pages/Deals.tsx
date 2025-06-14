
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Target, DollarSign, Calendar, User, Edit, Trash2 } from "lucide-react";
import { EditDealDialog } from "@/components/EditDealDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";

// Mock data for deals
const mockDealsData = [
  {
    id: 1,
    name: "Proyecto Software ABC",
    company: "Tech Solutions S.A.",
    value: 50000,
    stage: "Propuesta",
    probability: 70,
    closeDate: "2025-07-15",
    owner: "Ana García"
  },
  {
    id: 2,
    name: "Implementación CRM",
    company: "Marketing Plus Ltda.",
    value: 25000,
    stage: "Negociación",
    probability: 85,
    closeDate: "2025-06-30",
    owner: "Carlos López"
  },
  {
    id: 3,
    name: "Consultoría Digital",
    company: "Innovate Corp",
    value: 15000,
    stage: "Calificación",
    probability: 45,
    closeDate: "2025-08-10",
    owner: "María Rodríguez"
  }
];

const Deals = () => {
  const [deals, setDeals] = useState(mockDealsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingDeal, setDeletingDeal] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditDeal = (deal) => {
    setEditingDeal(deal);
    setIsEditDialogOpen(true);
  };

  const handleUpdateDeal = (updatedDeal) => {
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === updatedDeal.id ? updatedDeal : deal
      )
    );
    toast({
      title: "Oportunidad actualizada",
      description: "Los datos se han actualizado correctamente.",
    });
  };

  const handleDeleteDeal = (deal) => {
    setDeletingDeal(deal);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteDeal = () => {
    if (deletingDeal) {
      setDeals(prevDeals => prevDeals.filter(deal => deal.id !== deletingDeal.id));
      toast({
        title: "Oportunidad eliminada",
        description: "La oportunidad ha sido eliminada correctamente.",
      });
      setIsDeleteDialogOpen(false);
      setDeletingDeal(null);
    }
  };

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

  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const avgProbability = filteredDeals.reduce((sum, deal) => sum + deal.probability, 0) / filteredDeals.length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <Target className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Oportunidades</h1>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Oportunidad
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Oportunidad</DialogTitle>
                  <DialogDescription>
                    Crea una nueva oportunidad de venta en el pipeline.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-gray-600">Formulario de nueva oportunidad aquí...</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="p-6 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Oportunidades</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredDeals.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Probabilidad Promedio</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgProbability.toFixed(0)}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">En Negociación</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {filteredDeals.filter(deal => deal.stage === "Negociación").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Pipeline de Ventas</CardTitle>
                <CardDescription>
                  Gestiona tus oportunidades de venta y pipeline comercial
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
                      <TableHead>Probabilidad</TableHead>
                      <TableHead>Cierre Estimado</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDeals.map((deal) => (
                      <TableRow key={deal.id}>
                        <TableCell className="font-medium">{deal.name}</TableCell>
                        <TableCell>{deal.company}</TableCell>
                        <TableCell>${deal.value.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
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
                              onClick={() => handleEditDeal(deal)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDeal(deal)}
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
          </div>
        </main>
      </div>

      <EditDealDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        deal={editingDeal}
        onUpdateDeal={handleUpdateDeal}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Eliminar Oportunidad"
        description={`¿Estás seguro de que deseas eliminar "${deletingDeal?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={confirmDeleteDeal}
      />
    </SidebarProvider>
  );
};

export default Deals;
