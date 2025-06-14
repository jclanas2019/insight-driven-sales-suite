import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Target } from "lucide-react";
import { EditDealDialog } from "@/components/EditDealDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { AddDealDialog } from "@/components/AddDealDialog";
import { DealsStatistics } from "@/components/DealsStatistics";
import { DealsTable } from "@/components/DealsTable";
import { useToast } from "@/hooks/use-toast";
import { Deal } from "@/types/dashboard";

// Mock data actualizado con campos de scoring
const mockDealsData: Deal[] = [
  {
    id: 1,
    name: "Proyecto Software ABC",
    company: "Tech Solutions S.A.",
    value: 50000,
    stage: "Propuesta",
    probability: 70,
    closeDate: "2025-07-15",
    owner: "Ana García",
    interactions: { calls: 8, emails: 15, meetings: 3 },
    lastActivity: "2025-06-12",
    companySize: "large",
    industry: "Tecnología",
    leadActivity: "high"
  },
  {
    id: 2,
    name: "Implementación CRM",
    company: "Marketing Plus Ltda.",
    value: 25000,
    stage: "Negociación",
    probability: 85,
    closeDate: "2025-06-30",
    owner: "Carlos López",
    interactions: { calls: 3, emails: 8, meetings: 1 },
    lastActivity: "2025-06-10",
    companySize: "medium",
    industry: "Marketing",
    leadActivity: "medium"
  },
  {
    id: 3,
    name: "Consultoría Digital",
    company: "Innovate Corp",
    value: 15000,
    stage: "Calificación",
    probability: 45,
    closeDate: "2025-08-10",
    owner: "María Rodríguez",
    interactions: { calls: 1, emails: 3, meetings: 0 },
    lastActivity: "2025-05-28",
    companySize: "small",
    industry: "Retail",
    leadActivity: "low"
  }
];

const Deals = () => {
  const [deals, setDeals] = useState(mockDealsData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingDeal, setDeletingDeal] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

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
            <AddDealDialog
              open={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
            />
          </div>

          <div className="p-6 space-y-6">
            <DealsStatistics deals={deals} />
            <DealsTable
              deals={deals}
              onEditDeal={handleEditDeal}
              onDeleteDeal={handleDeleteDeal}
            />
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
