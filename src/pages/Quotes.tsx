
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { EditQuoteDialog } from "@/components/EditQuoteDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { QuotesHeader } from "@/components/QuotesHeader";
import { QuotesStats } from "@/components/QuotesStats";
import { QuotesTabs } from "@/components/QuotesTabs";
import { useToast } from "@/hooks/use-toast";

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

// Mock data for quotes
const initialQuotes: Quote[] = [
  {
    id: 1,
    number: "COT-2025-001",
    client: "Tech Solutions S.A.",
    title: "Licencias Software Empresarial",
    amount: 45000,
    status: "Enviada",
    validUntil: "2025-07-15",
    createdDate: "2025-06-10"
  },
  {
    id: 2,
    number: "COT-2025-002",
    client: "Marketing Plus Ltda.",
    title: "Servicios de Consultoría",
    amount: 12500,
    status: "Aprobada",
    validUntil: "2025-06-25",
    createdDate: "2025-06-05"
  },
  {
    id: 3,
    number: "COT-2025-003",
    client: "Innovate Corp",
    title: "Implementación Sistema CRM",
    amount: 32000,
    status: "Borrador",
    validUntil: "2025-08-01",
    createdDate: "2025-06-12"
  },
  {
    id: 4,
    number: "COT-2025-004",
    client: "Global Industries",
    title: "Mantenimiento Anual",
    amount: 8500,
    status: "Vencida",
    validUntil: "2025-06-01",
    createdDate: "2025-05-15"
  }
];

const Quotes = () => {
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [deletingQuote, setDeletingQuote] = useState<Quote | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [activeTab, setActiveTab] = useState("lista");

  const handleAddQuote = (newQuoteData: Omit<Quote, 'id'>) => {
    const newQuote: Quote = {
      id: Math.max(...quotes.map(q => q.id), 0) + 1,
      ...newQuoteData,
    };
    setQuotes([...quotes, newQuote]);
  };

  const handleUpdateQuote = (updatedQuote: Quote) => {
    setQuotes(quotes.map(quote => 
      quote.id === updatedQuote.id ? updatedQuote : quote
    ));
    setEditingQuote(null);
  };

  const handleDeleteQuote = () => {
    if (deletingQuote) {
      setQuotes(quotes.filter(quote => quote.id !== deletingQuote.id));
      setDeletingQuote(null);
      toast({
        title: "Cotización eliminada",
        description: "La cotización se ha eliminado exitosamente.",
      });
    }
  };

  const handleRowClick = (quote: Quote) => {
    setSelectedQuote(quote);
    if (activeTab === "lista") {
      setActiveTab("ia-insights");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <QuotesHeader
            isAddDialogOpen={isAddDialogOpen}
            onAddDialogOpenChange={setIsAddDialogOpen}
            onAddQuote={handleAddQuote}
          />

          <div className="p-6 space-y-6">
            <QuotesStats quotes={quotes} />
            
            <QuotesTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              quotes={quotes}
              selectedQuote={selectedQuote}
              onRowClick={handleRowClick}
              onEditQuote={setEditingQuote}
              onDeleteQuote={setDeletingQuote}
            />
          </div>

          <EditQuoteDialog
            open={!!editingQuote}
            onOpenChange={() => setEditingQuote(null)}
            quote={editingQuote}
            onUpdate={handleUpdateQuote}
          />

          <DeleteConfirmDialog
            open={!!deletingQuote}
            onOpenChange={() => setDeletingQuote(null)}
            title="Eliminar Cotización"
            description={`¿Está seguro que desea eliminar la cotización "${deletingQuote?.number}"? Esta acción no se puede deshacer.`}
            onConfirm={handleDeleteQuote}
          />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Quotes;
