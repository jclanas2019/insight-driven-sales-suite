
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, DollarSign, Calendar, Download, Edit, Trash2, Brain, MessageSquare } from "lucide-react";
import { AddQuoteDialog } from "@/components/AddQuoteDialog";
import { EditQuoteDialog } from "@/components/EditQuoteDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { QuoteAIInsights } from "@/components/QuoteAIInsights";
import { QuoteIntegrations } from "@/components/QuoteIntegrations";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [deletingQuote, setDeletingQuote] = useState<Quote | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [activeTab, setActiveTab] = useState("lista");

  const filteredQuotes = quotes.filter(quote =>
    quote.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const totalAmount = filteredQuotes.reduce((sum, quote) => sum + quote.amount, 0);
  const approvedQuotes = filteredQuotes.filter(quote => quote.status === "Aprobada").length;
  const pendingQuotes = filteredQuotes.filter(quote => quote.status === "Enviada").length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Cotizaciones Inteligentes</h1>
              </div>
            </div>
            <AddQuoteDialog 
              open={isAddDialogOpen} 
              onOpenChange={setIsAddDialogOpen}
              onAdd={handleAddQuote}
            />
          </div>

          <div className="p-6 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cotizaciones</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredQuotes.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{approvedQuotes}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingQuotes}</div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs para diferentes vistas */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lista">Lista de Cotizaciones</TabsTrigger>
                <TabsTrigger value="ia-insights">IA & Predicciones</TabsTrigger>
                <TabsTrigger value="integraciones">Integraciones</TabsTrigger>
              </TabsList>

              <TabsContent value="lista" className="space-y-4">
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
                            onClick={() => handleRowClick(quote)}
                          >
                            <TableCell className="font-medium">{quote.number}</TableCell>
                            <TableCell>{quote.client}</TableCell>
                            <TableCell>{quote.title}</TableCell>
                            <TableCell>${quote.amount.toLocaleString()}</TableCell>
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
                                  onClick={() => setEditingQuote(quote)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setDeletingQuote(quote)}
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
              </TabsContent>

              <TabsContent value="ia-insights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <span>Inteligencia Artificial para Ventas</span>
                    </CardTitle>
                    <CardDescription>
                      Predicciones, análisis de riesgo y recomendaciones basadas en IA
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <QuoteAIInsights quotes={quotes} selectedQuote={selectedQuote} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integraciones" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <span>Integraciones Nativas</span>
                    </CardTitle>
                    <CardDescription>
                      WhatsApp Business, SII, Google Ads y plataformas chilenas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <QuoteIntegrations selectedQuote={selectedQuote} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Edit Quote Dialog */}
          <EditQuoteDialog
            open={!!editingQuote}
            onOpenChange={() => setEditingQuote(null)}
            quote={editingQuote}
            onUpdate={handleUpdateQuote}
          />

          {/* Delete Confirmation Dialog */}
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
