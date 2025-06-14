
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Workflow, Play, Pause, Settings, Users, Mail, Phone, Calendar, Target } from "lucide-react";

// Mock data para flujos de trabajo
const mockWorkflows = [
  {
    id: 1,
    name: "Seguimiento de Leads",
    description: "Automatiza el seguimiento de nuevos leads con emails y recordatorios",
    status: "Activo",
    trigger: "Nuevo Lead",
    actions: ["Enviar email de bienvenida", "Crear tarea de seguimiento", "Asignar vendedor"],
    activations: 145,
    successRate: 89,
    lastModified: "2025-06-10"
  },
  {
    id: 2,
    name: "Onboarding Cliente",
    description: "Proceso automático de bienvenida para nuevos clientes",
    status: "Activo",
    trigger: "Oportunidad Cerrada",
    actions: ["Enviar documentos", "Programar llamada", "Crear proyecto"],
    activations: 23,
    successRate: 95,
    lastModified: "2025-06-08"
  },
  {
    id: 3,
    name: "Reactivación Inactivos",
    description: "Campaña para reactivar clientes que no han comprado recientemente",
    status: "Pausado",
    trigger: "90 días sin actividad",
    actions: ["Email personalizado", "Descuento especial", "Llamada comercial"],
    activations: 67,
    successRate: 34,
    lastModified: "2025-06-05"
  },
  {
    id: 4,
    name: "Escalación de Soporte",
    description: "Escala tickets de soporte no resueltos a supervisor",
    status: "Activo",
    trigger: "Ticket sin resolver 24h",
    actions: ["Notificar supervisor", "Cambiar prioridad", "Enviar email cliente"],
    activations: 8,
    successRate: 100,
    lastModified: "2025-06-12"
  }
];

const Workflows = () => {
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Pausado": return "bg-yellow-100 text-yellow-800";
      case "Inactivo": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTriggerIcon = (trigger: string) => {
    if (trigger.includes("Lead")) return <Users className="w-4 h-4" />;
    if (trigger.includes("Email") || trigger.includes("email")) return <Mail className="w-4 h-4" />;
    if (trigger.includes("Llamada") || trigger.includes("llamada")) return <Phone className="w-4 h-4" />;
    if (trigger.includes("Oportunidad")) return <Target className="w-4 h-4" />;
    return <Calendar className="w-4 h-4" />;
  };

  const filteredWorkflows = selectedStatus === "Todos" 
    ? mockWorkflows 
    : mockWorkflows.filter(workflow => workflow.status === selectedStatus);

  const activeWorkflows = mockWorkflows.filter(w => w.status === "Activo").length;
  const totalActivations = mockWorkflows.reduce((sum, w) => sum + w.activations, 0);
  const avgSuccessRate = Math.round(mockWorkflows.reduce((sum, w) => sum + w.successRate, 0) / mockWorkflows.length);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <Workflow className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Flujos de Trabajo</h1>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Flujo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Flujo de Trabajo</DialogTitle>
                  <DialogDescription>
                    Define un nuevo flujo automático para optimizar tus procesos.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-gray-600">Formulario de nuevo flujo aquí...</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="p-6 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Flujos Activos</CardTitle>
                  <Play className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeWorkflows}</div>
                  <p className="text-xs text-muted-foreground">
                    de {mockWorkflows.length} total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Activaciones</CardTitle>
                  <Workflow className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalActivations}</div>
                  <p className="text-xs text-muted-foreground">
                    este mes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgSuccessRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    promedio
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tiempo Ahorrado</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24h</div>
                  <p className="text-xs text-muted-foreground">
                    esta semana
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Workflow List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Lista de Flujos de Trabajo</CardTitle>
                    <CardDescription>
                      Gestiona y monitorea tus procesos automatizados
                    </CardDescription>
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Pausado">Pausado</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredWorkflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {getTriggerIcon(workflow.trigger)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {workflow.name}
                            </h3>
                            <Badge className={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{workflow.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span><strong>Trigger:</strong> {workflow.trigger}</span>
                            <span><strong>Activaciones:</strong> {workflow.activations}</span>
                            <span><strong>Éxito:</strong> {workflow.successRate}%</span>
                            <span><strong>Modificado:</strong> {workflow.lastModified}</span>
                          </div>
                          <div className="mt-2">
                            <div className="text-xs text-gray-600">
                              <strong>Acciones:</strong> {workflow.actions.join(" → ")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Switch 
                          checked={workflow.status === "Activo"} 
                          className="mr-2"
                        />
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Workflows;
