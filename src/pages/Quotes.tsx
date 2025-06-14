import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { EditQuoteDialog } from "@/components/EditQuoteDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { QuotesHeader } from "@/components/QuotesHeader";
import { QuotesStats } from "@/components/QuotesStats";
import { QuotesTabs } from "@/components/QuotesTabs";
import { MeetingRecorder } from "@/components/MeetingRecorder";
import { ConversationAnalysis } from "@/components/ConversationAnalysis";
import { SalesCoaching } from "@/components/SalesCoaching";
import { SalesFeedback } from "@/components/SalesFeedback";
import { GenerateSaleDialog } from "@/components/sales/GenerateSaleDialog";
import { GenerateInvoiceDialog } from "@/components/invoicing/GenerateInvoiceDialog";
import { SalesTable } from "@/components/sales/SalesTable";
import { InvoicesTable } from "@/components/invoicing/InvoicesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sale, Invoice } from "@/types/sales";

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

// Mock data for quotes with Chilean peso amounts
const initialQuotes: Quote[] = [
  {
    id: 1,
    number: "COT-2025-001",
    client: "Tech Solutions S.A.",
    title: "Licencias Software Empresarial",
    amount: 25500000,
    status: "Enviada",
    validUntil: "2025-07-15",
    createdDate: "2025-06-10"
  },
  {
    id: 2,
    number: "COT-2025-002",
    client: "Marketing Plus Ltda.",
    title: "Servicios de Consultoría",
    amount: 8750000,
    status: "Aprobada",
    validUntil: "2025-06-25",
    createdDate: "2025-06-05"
  },
  {
    id: 3,
    number: "COT-2025-003",
    client: "Innovate Corp",
    title: "Implementación Sistema CRM",
    amount: 18200000,
    status: "Borrador",
    validUntil: "2025-08-01",
    createdDate: "2025-06-12"
  },
  {
    id: 4,
    number: "COT-2025-004",
    client: "Global Industries",
    title: "Mantenimiento Anual",
    amount: 4850000,
    status: "Vencida",
    validUntil: "2025-06-01",
    createdDate: "2025-05-15"
  }
];

const Quotes = () => {
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [sales, setSales] = useState<Sale[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [deletingQuote, setDeletingQuote] = useState<Quote | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [activeTab, setActiveTab] = useState("lista");
  const [isGenerateSaleDialogOpen, setIsGenerateSaleDialogOpen] = useState(false);
  const [isGenerateInvoiceDialogOpen, setIsGenerateInvoiceDialogOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

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

  const handleGenerateSale = (quote: Quote) => {
    setSelectedQuote(quote);
    setIsGenerateSaleDialogOpen(true);
  };

  const handleSaleGenerated = (sale: Sale) => {
    setSales([...sales, sale]);
  };

  const handleGenerateInvoice = (sale: Sale) => {
    setSelectedSale(sale);
    setIsGenerateInvoiceDialogOpen(true);
  };

  const handleInvoiceGenerated = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
    
    // Update sale status
    setSales(sales.map(sale => 
      sale.id === invoice.saleId 
        ? { ...sale, status: "Facturada" as const, invoiceId: invoice.id }
        : sale
    ));
  };

  const handleUpdatePaymentStatus = (invoiceId: number, status: "Pendiente" | "Pagado" | "Vencido") => {
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId 
        ? { ...invoice, paymentStatus: status }
        : invoice
    ));

    // Update sale status if paid
    if (status === "Pagado") {
      const invoice = invoices.find(inv => inv.id === invoiceId);
      if (invoice) {
        setSales(sales.map(sale => 
          sale.id === invoice.saleId 
            ? { ...sale, status: "Completada" as const }
            : sale
        ));
      }
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
            
            <Tabs defaultValue="cotizaciones" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="cotizaciones">Cotizaciones</TabsTrigger>
                <TabsTrigger value="ventas">Ventas</TabsTrigger>
                <TabsTrigger value="facturas">Facturas</TabsTrigger>
                <TabsTrigger value="reuniones">Grabación</TabsTrigger>
                <TabsTrigger value="analisis">Análisis</TabsTrigger>
                <TabsTrigger value="coaching">Coaching</TabsTrigger>
                <TabsTrigger value="feedback">Retroalimentación</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cotizaciones" className="mt-6">
                <QuotesTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  quotes={quotes}
                  selectedQuote={selectedQuote}
                  onRowClick={handleRowClick}
                  onEditQuote={setEditingQuote}
                  onDeleteQuote={setDeletingQuote}
                  onGenerateSale={handleGenerateSale}
                />
              </TabsContent>

              <TabsContent value="ventas" className="mt-6">
                <SalesTable 
                  sales={sales}
                  onGenerateInvoice={handleGenerateInvoice}
                />
              </TabsContent>

              <TabsContent value="facturas" className="mt-6">
                <InvoicesTable 
                  invoices={invoices}
                  onUpdatePaymentStatus={handleUpdatePaymentStatus}
                />
              </TabsContent>
              
              <TabsContent value="reuniones" className="mt-6">
                <MeetingRecorder />
              </TabsContent>
              
              <TabsContent value="analisis" className="mt-6">
                <ConversationAnalysis />
              </TabsContent>
              
              <TabsContent value="coaching" className="mt-6">
                <SalesCoaching />
              </TabsContent>
              
              <TabsContent value="feedback" className="mt-6">
                <SalesFeedback />
              </TabsContent>
            </Tabs>
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

          <GenerateSaleDialog
            open={isGenerateSaleDialogOpen}
            onOpenChange={setIsGenerateSaleDialogOpen}
            quote={selectedQuote}
            onSaleGenerated={handleSaleGenerated}
          />

          <GenerateInvoiceDialog
            open={isGenerateInvoiceDialogOpen}
            onOpenChange={setIsGenerateInvoiceDialogOpen}
            sale={selectedSale}
            onInvoiceGenerated={handleInvoiceGenerated}
          />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Quotes;
