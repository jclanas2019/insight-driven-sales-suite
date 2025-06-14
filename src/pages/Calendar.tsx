
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar as CalendarIcon, Clock, User, Phone, Video, MapPin } from "lucide-react";

// Mock data para eventos del calendario
const mockEvents = [
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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

  const todayEvents = mockEvents.filter(event => event.date === "2025-06-14");
  const upcomingEvents = mockEvents.filter(event => new Date(event.date) > new Date("2025-06-14"));

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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Evento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Programar Nuevo Evento</DialogTitle>
                  <DialogDescription>
                    Agenda una nueva reunión, llamada o actividad.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-gray-600">Formulario de nuevo evento aquí...</p>
                </div>
              </DialogContent>
            </Dialog>
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
                  <div className="text-2xl font-bold">{mockEvents.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockEvents.filter(event => event.status === "Confirmada").length}
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
                    {mockEvents.map((event) => (
                      <div key={event.id} className="flex items-start space-x-4 p-4 border rounded-lg bg-white">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {event.title}
                            </h3>
                            <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
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
    </SidebarProvider>
  );
};

export default Calendar;
