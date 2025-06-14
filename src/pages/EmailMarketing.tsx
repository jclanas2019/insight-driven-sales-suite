
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Mail, Send, Eye, MousePointer, TrendingUp, Users, Edit, Trash2 } from "lucide-react";
import { AddCampaignDialog } from "@/components/AddCampaignDialog";
import { EditCampaignDialog } from "@/components/EditCampaignDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";

// Mock data para campañas de email
const initialCampaigns = [
  {
    id: 1,
    name: "Lanzamiento Producto Q2",
    subject: "Descubre nuestro nuevo producto",
    status: "Enviada",
    recipients: 1250,
    opens: 875,
    clicks: 125,
    sendDate: "2025-06-10",
    type: "Newsletter"
  },
  {
    id: 2,
    name: "Seguimiento Leads Calientes",
    subject: "¿Listo para dar el siguiente paso?",
    status: "Programada",
    recipients: 85,
    opens: 0,
    clicks: 0,
    sendDate: "2025-06-16",
    type: "Secuencia"
  },
  {
    id: 3,
    name: "Invitación Webinar",
    subject: "Te invitamos a nuestro webinar exclusivo",
    status: "Enviada",
    recipients: 450,
    opens: 320,
    clicks: 78,
    sendDate: "2025-06-08",
    type: "Promocional"
  },
  {
    id: 4,
    name: "Reactivación Clientes",
    subject: "Te echamos de menos",
    status: "Borrador",
    recipients: 0,
    opens: 0,
    clicks: 0,
    sendDate: "-",
    type: "Reactivación"
  }
];

const EmailMarketing = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Enviada": return "bg-green-100 text-green-800";
      case "Programada": return "bg-blue-100 text-blue-800";
      case "Borrador": return "bg-yellow-100 text-yellow-800";
      case "Pausada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddCampaign = (newCampaign: any) => {
    const campaign = {
      ...newCampaign,
      id: campaigns.length + 1,
      opens: 0,
      clicks: 0
    };
    setCampaigns([...campaigns, campaign]);
  };

  const handleUpdateCampaign = (updatedCampaign: any) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === updatedCampaign.id ? updatedCampaign : campaign
    ));
  };

  const handleDeleteCampaign = () => {
    if (selectedCampaign) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== selectedCampaign.id));
      setSelectedCampaign(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsDeleteDialogOpen(true);
  };

  const totalRecipients = filteredCampaigns.reduce((sum, campaign) => sum + campaign.recipients, 0);
  const totalOpens = filteredCampaigns.reduce((sum, campaign) => sum + campaign.opens, 0);
  const totalClicks = filteredCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const avgOpenRate = totalRecipients > 0 ? ((totalOpens / totalRecipients) * 100).toFixed(1) : "0";
  const avgClickRate = totalOpens > 0 ? ((totalClicks / totalOpens) * 100).toFixed(1) : "0";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <Mail className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Email Marketing</h1>
              </div>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Campaña
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Campañas Activas</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredCampaigns.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Enviados</CardTitle>
                  <Send className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRecipients.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Apertura</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgOpenRate}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Clicks</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgClickRate}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Campaigns Table */}
            <Card>
              <CardHeader>
                <CardTitle>Campañas de Email</CardTitle>
                <CardDescription>
                  Gestiona tus campañas de email marketing y secuencias automatizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar campañas..."
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
                      <TableHead>Asunto</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Destinatarios</TableHead>
                      <TableHead>Aperturas</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>Fecha Envío</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => {
                      const openRate = campaign.recipients > 0 ? ((campaign.opens / campaign.recipients) * 100).toFixed(1) : "0";
                      const clickRate = campaign.opens > 0 ? ((campaign.clicks / campaign.opens) * 100).toFixed(1) : "0";
                      
                      return (
                        <TableRow key={campaign.id}>
                          <TableCell className="font-medium">{campaign.name}</TableCell>
                          <TableCell>{campaign.subject}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{campaign.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2 text-gray-400" />
                              {campaign.recipients.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-2 text-gray-400" />
                              {campaign.opens} ({openRate}%)
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MousePointer className="w-4 h-4 mr-2 text-gray-400" />
                              {campaign.clicks}
                            </div>
                          </TableCell>
                          <TableCell>{campaign.sendDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <TrendingUp className="w-4 h-4 mr-2 text-gray-400" />
                              {clickRate}%
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => openEditDialog(campaign)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openDeleteDialog(campaign)}>
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
          </div>
        </main>
      </div>

      <AddCampaignDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddCampaign={handleAddCampaign}
      />

      <EditCampaignDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        campaign={selectedCampaign}
        onUpdateCampaign={handleUpdateCampaign}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Eliminar Campaña"
        description="¿Estás seguro de que quieres eliminar esta campaña? Esta acción no se puede deshacer."
        onConfirm={handleDeleteCampaign}
      />
    </SidebarProvider>
  );
};

export default EmailMarketing;
