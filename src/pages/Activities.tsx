
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Phone, Mail, Calendar, Clock, User, Building2, Edit, Trash2 } from "lucide-react";
import { EditActivityDialog } from "@/components/EditActivityDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";

// Mock data para actividades
const mockActivitiesData = [
  {
    id: 1,
    type: "Llamada",
    subject: "Seguimiento propuesta ABC",
    contact: "María González",
    company: "Tech Solutions S.A.",
    date: "2025-06-14",
    time: "14:30",
    status: "Completada",
    duration: "25 min",
    owner: "Ana García"
  },
  {
    id: 2,
    type: "Reunión",
    subject: "Presentación de producto",
    contact: "Carlos Mendoza",
    company: "Marketing Plus Ltda.",
    date: "2025-06-15",
    time: "10:00",
    status: "Programada",
    duration: "60 min",
    owner: "Carlos López"
  },
  {
    id: 3,
    type: "Email",
    subject: "Envío de cotización",
    contact: "Laura Pérez",
    company: "Innovate Corp",
    date: "2025-06-13",
    time: "16:45",
    status: "Enviado",
    duration: "-",
    owner: "María Rodríguez"
  },
  {
    id: 4,
    type: "Llamada",
    subject: "Primera llamada de prospección",
    contact: "Roberto Silva",
    company: "Digital Systems",
    date: "2025-06-16",
    time: "09:15",
    status: "Programada",
    duration: "30 min",
    owner: "Ana García"
  }
];

const Activities = () => {
  const [activities, setActivities] = useState(mockActivitiesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingActivity, setDeletingActivity] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredActivities = activities.filter(activity =>
    activity.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setIsEditDialogOpen(true);
  };

  const handleUpdateActivity = (updatedActivity) => {
    setActivities(prevActivities => 
      prevActivities.map(activity => 
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
    toast({
      title: "Actividad actualizada",
      description: "Los datos se han actualizado correctamente.",
    });
  };

  const handleDeleteActivity = (activity) => {
    setDeletingActivity(activity);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteActivity = () => {
    if (deletingActivity) {
      setActivities(prevActivities => prevActivities.filter(activity => activity.id !== deletingActivity.id));
      toast({
        title: "Actividad eliminada",
        description: "La actividad ha sido eliminada correctamente.",
      });
      setIsDeleteDialogOpen(false);
      setDeletingActivity(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completada": return "bg-green-100 text-green-800";
      case "Programada": return "bg-blue-100 text-blue-800";
      case "Enviado": return "bg-purple-100 text-purple-800";
      case "Perdida": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Llamada": return <Phone className="w-4 h-4" />;
      case "Email": return <Mail className="w-4 h-4" />;
      case "Reunión": return <Calendar className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const completedActivities = filteredActivities.filter(activity => activity.status === "Completada").length;
  const scheduledActivities = filteredActivities.filter(activity => activity.status === "Programada").length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <Phone className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Actividades</h1>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Actividad
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Actividad</DialogTitle>
                  <DialogDescription>
                    Programa una nueva actividad en tu agenda comercial.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-gray-600">Formulario de nueva actividad aquí...</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="p-6 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Actividades</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredActivities.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completadas</CardTitle>
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedActivities}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Programadas</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{scheduledActivities}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {filteredActivities.length > 0 ? Math.round((completedActivities / filteredActivities.length) * 100) : 0}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activities Table */}
            <Card>
              <CardHeader>
                <CardTitle>Registro de Actividades</CardTitle>
                <CardDescription>
                  Gestiona llamadas, reuniones y comunicaciones con tus clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar actividades..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Asunto</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Duración</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div className="flex items-center">
                            {getTypeIcon(activity.type)}
                            <span className="ml-2">{activity.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{activity.subject}</TableCell>
                        <TableCell>{activity.contact}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                            {activity.company}
                          </div>
                        </TableCell>
                        <TableCell>{activity.date}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                        </TableCell>
                        <TableCell>{activity.duration}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            {activity.owner}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditActivity(activity)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteActivity(activity)}
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

      <EditActivityDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        activity={editingActivity}
        onUpdateActivity={handleUpdateActivity}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Eliminar Actividad"
        description={`¿Estás seguro de que deseas eliminar "${deletingActivity?.subject}"? Esta acción no se puede deshacer.`}
        onConfirm={confirmDeleteActivity}
      />
    </SidebarProvider>
  );
};

export default Activities;
