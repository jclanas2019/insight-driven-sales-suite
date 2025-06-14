
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Plus, Calendar as CalendarIcon, Clock, User, Phone, Video, MapPin, Edit, Trash2 } from "lucide-react";
import { AddEventDialog } from "@/components/AddEventDialog";
import { EditEventDialog } from "@/components/EditEventDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";

// Mock data para eventos del calendario
const initialEvents = [
  {
    id: 1,
    title: "Reunión con Tech Solutions",
    type: "Reunión",
    date: "2025-06-14",
    time: "10:00",
    duration: "60 min",
    location: "Oficina Central",
    attendees: ["María González", "Juan Pérez"],
    status: "Confirmada"
  },
  {
    id: 2,
    title: "Llamada de seguimiento",
    type: "Llamada",
    date: "2025-06-14",
    time: "15:30",
    duration: "30 min",
    location: "Remoto",
    attendees: ["Carlos Mendoza"],
    status: "Programada"
  },
  {
    id: 3,
    title: "Demo de producto",
    type: "Videollamada",
    date: "2025-06-15",
    time: "11:00",
    duration: "45 min",
    location: "Zoom",
    attendees: ["Laura Pérez", "Roberto Silva"],
    status: "Confirmada"
  },
  {
    id: 4,
    title: "Presentación propuesta",
    type: "Reunión",
    date: "2025-06-16",
    time: "14:00",
    duration: "90 min",
    location: "Cliente - Downtown",
    attendees: ["Ana García", "Equipo Marketing Plus"],
    status: "Pendiente"
  }
];

const Calendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmada": return "bg-green-100 text-green-800";
      case "Programada": return "bg-blue-100 text-blue-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Cancelada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Llamada": return <Phone className="w-4 h-4" />;
      case "Videollamada": return <Video className="w-4 h-4" />;
      case "Reunión": return <User className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const handleAddEvent = (newEvent: any) => {
    const event = {
      ...newEvent,
      id: events.length + 1
    };
    setEvents([...events, event]);
  };

  const handleUpdateEvent = (updatedEvent: any) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setSelectedEvent(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (event: any) => {
    setSelectedEvent(event);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (event: any) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const todayEvents = events.filter(event => event.date === "2025-06-14");
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date("2025-06-14"));

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Calendario</h1>
              </div>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Evento
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Eventos Hoy</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayEvents.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{events.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {events.filter(event => event.status === "Confirmada").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar Component */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Calendario</CardTitle>
                  <CardDescription>
                    Selecciona una fecha para ver los eventos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Events List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Próximos Eventos</CardTitle>
                  <CardDescription>
                    Lista de reuniones y actividades programadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex items-start space-x-4 p-4 border rounded-lg bg-white">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {event.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                              <Button variant="ghost" size="sm" onClick={() => openEditDialog(event)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openDeleteDialog(event)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {event.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.time} ({event.duration})
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {event.location}
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {event.attendees.join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <AddEventDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddEvent={handleAddEvent}
      />

      <EditEventDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        event={selectedEvent}
        onUpdateEvent={handleUpdateEvent}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Eliminar Evento"
        description="¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer."
        onConfirm={handleDeleteEvent}
      />
    </SidebarProvider>
  );
};

export default Calendar;
