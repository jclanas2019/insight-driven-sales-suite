
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Clock, Users, Plus } from "lucide-react";

const MyMeetings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <Video className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Mis reuniones</h1>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Programar Reunión
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hoy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">4</div>
                  <p className="text-sm text-slate-600">reuniones programadas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Esta Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">18</div>
                  <p className="text-sm text-slate-600">reuniones totales</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Completadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">156</div>
                  <p className="text-sm text-slate-600">este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tiempo Promedio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">45min</div>
                  <p className="text-sm text-slate-600">duración reuniones</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mis Próximas Reuniones</CardTitle>
                <CardDescription>
                  Reuniones personales y citas con clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Demo - TechSolutions Inc.",
                      client: "María López",
                      date: "Hoy, 11:00",
                      duration: "45 min",
                      type: "Demo de producto",
                      status: "Confirmada",
                      platform: "Zoom"
                    },
                    {
                      title: "Follow-up - Global Corp",
                      client: "Juan Pérez",
                      date: "Hoy, 15:30",
                      duration: "30 min",
                      type: "Seguimiento",
                      status: "Pendiente",
                      platform: "Teams"
                    },
                    {
                      title: "Presentación propuesta - StartupXYZ",
                      client: "Ana Martín",
                      date: "Mañana, 10:00",
                      duration: "60 min",
                      type: "Presentación",
                      status: "Confirmada",
                      platform: "Presencial"
                    },
                    {
                      title: "Negociación contrato - Enterprise Ltd",
                      client: "Carlos Rodriguez",
                      date: "Mañana, 14:00",
                      duration: "90 min",
                      type: "Negociación",
                      status: "Confirmada",
                      platform: "Google Meet"
                    }
                  ].map((meeting, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{meeting.title}</h3>
                          <p className="text-sm text-slate-600 mb-2">Cliente: {meeting.client}</p>
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{meeting.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{meeting.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Video className="w-4 h-4" />
                              <span>{meeting.platform}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {meeting.type}
                          </Badge>
                          <Badge variant={meeting.status === "Confirmada" ? "default" : "secondary"}>
                            {meeting.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Unirse
                          </Button>
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

export default MyMeetings;
