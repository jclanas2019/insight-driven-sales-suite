
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { AddEventDialog } from "@/components/AddEventDialog";
import { EditEventDialog } from "@/components/EditEventDialog";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { CalendarStatistics } from "@/components/CalendarStatistics";
import { CalendarSidebar } from "@/components/CalendarSidebar";
import { EventsList } from "@/components/EventsList";

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
            <CalendarStatistics events={events} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CalendarSidebar 
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />

              <EventsList 
                events={events}
                onEditEvent={openEditDialog}
                onDeleteEvent={openDeleteDialog}
              />
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
