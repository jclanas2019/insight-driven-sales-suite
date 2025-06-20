
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Clock, Video, Plus } from "lucide-react";
import { NewTeamMeetingDialog } from "@/components/dialogs/NewTeamMeetingDialog";
import { AddTeamDialog } from "@/components/dialogs/AddTeamDialog";

const TeamMeetings = () => {
  const handleMeetingCreated = () => {
    // Aquí se podría actualizar la lista de reuniones
    console.log("Nueva reunión de equipo creada");
  };

  const handleTeamAdded = () => {
    // Aquí se podría actualizar la lista de equipos
    console.log("Nuevo equipo agregado");
  };

  const handleJoinMeeting = (meetingTitle: string) => {
    // Aquí se implementaría la lógica para unirse a la reunión
    console.log(`Uniéndose a la reunión: ${meetingTitle}`);
  };

  const handleViewDetails = (meetingTitle: string) => {
    // Aquí se implementaría la lógica para ver detalles de la reunión
    console.log(`Viendo detalles de: ${meetingTitle}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Reuniones de mi equipo</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <AddTeamDialog onTeamAdded={handleTeamAdded} />
              <NewTeamMeetingDialog onMeetingCreated={handleMeetingCreated} />
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">Reuniones Hoy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">3</div>
                  <p className="text-sm text-slate-600">reuniones programadas</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">Esta Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">12</div>
                  <p className="text-sm text-slate-600">reuniones del equipo</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">Participación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">85%</div>
                  <p className="text-sm text-slate-600">promedio de asistencia</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle>Próximas Reuniones del Equipo</CardTitle>
                <CardDescription>
                  Reuniones programadas para tu equipo de ventas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      title: "Weekly Sales Review",
                      date: "Hoy, 14:00",
                      duration: "60 min",
                      attendees: 8,
                      status: "Confirmada",
                      type: "Presencial"
                    },
                    {
                      title: "Pipeline Planning",
                      date: "Mañana, 10:00",
                      duration: "45 min",
                      attendees: 6,
                      status: "Pendiente",
                      type: "Virtual"
                    },
                    {
                      title: "Training Session",
                      date: "Viernes, 16:00",
                      duration: "90 min",
                      attendees: 12,
                      status: "Confirmada",
                      type: "Híbrida"
                    }
                  ].map((meeting, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{meeting.title}</h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{meeting.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{meeting.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{meeting.attendees} participantes</span>
                            </div>
                            {meeting.type === "Virtual" && (
                              <div className="flex items-center space-x-1">
                                <Video className="w-4 h-4" />
                                <span>{meeting.type}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={meeting.status === "Confirmada" ? "default" : "secondary"}>
                            {meeting.status}
                          </Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(meeting.title)}
                          >
                            Ver Detalles
                          </Button>
                          {meeting.type === "Virtual" && (
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleJoinMeeting(meeting.title)}
                            >
                              Unirse
                            </Button>
                          )}
                        </div>
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

export default TeamMeetings;
