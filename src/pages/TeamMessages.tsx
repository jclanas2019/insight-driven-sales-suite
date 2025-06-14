
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Users, Clock, Plus } from "lucide-react";
import { NewTeamMessageDialog } from "@/components/dialogs/NewTeamMessageDialog";
import { AddTeamDialog } from "@/components/dialogs/AddTeamDialog";

const TeamMessages = () => {
  const handleMessageSent = () => {
    // Aquí se podría actualizar la lista de mensajes
    console.log("Nuevo mensaje de equipo enviado");
  };

  const handleTeamAdded = () => {
    // Aquí se podría actualizar la lista de equipos
    console.log("Nuevo equipo agregado");
  };

  const handleOpenMessage = (subject: string) => {
    // Aquí se implementaría la lógica para abrir el mensaje
    console.log(`Abriendo mensaje: ${subject}`);
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
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Mensajes de mi equipo</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <AddTeamDialog onTeamAdded={handleTeamAdded} />
              <NewTeamMessageDialog onMessageSent={handleMessageSent} />
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">No Leídos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">5</div>
                  <p className="text-sm text-slate-600">mensajes nuevos</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">Hoy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">23</div>
                  <p className="text-sm text-slate-600">mensajes del equipo</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">Esta Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">147</div>
                  <p className="text-sm text-slate-600">mensajes intercambiados</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg">Respuesta Promedio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">15min</div>
                  <p className="text-sm text-slate-600">tiempo de respuesta</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle>Conversaciones del Equipo</CardTitle>
                <CardDescription>
                  Mensajes y comunicaciones del equipo de ventas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      subject: "Actualización del Pipeline Q4",
                      sender: "María González",
                      time: "Hace 15 min",
                      unread: true,
                      participants: 6,
                      preview: "He actualizado las proyecciones para el último trimestre..."
                    },
                    {
                      subject: "Nuevo proceso de onboarding",
                      sender: "Carlos Mendoza",
                      time: "Hace 1 hora",
                      unread: true,
                      participants: 8,
                      preview: "Propongo algunos cambios para mejorar la experiencia..."
                    },
                    {
                      subject: "Celebración meta mensual",
                      sender: "Ana García",
                      time: "Hace 2 horas",
                      unread: false,
                      participants: 12,
                      preview: "¡Hemos superado la meta del mes! Propongo celebrar..."
                    },
                    {
                      subject: "Feedback del cliente TechCorp",
                      sender: "Roberto Silva",
                      time: "Ayer, 16:30",
                      unread: false,
                      participants: 4,
                      preview: "Comparto el feedback recibido del cliente principal..."
                    }
                  ].map((message, index) => (
                    <div key={index} className={`border border-slate-200 rounded-lg p-4 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-semibold ${message.unread ? 'text-blue-900' : 'text-slate-900'}`}>
                              {message.subject}
                            </h3>
                            {message.unread && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                Nuevo
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Send className="w-4 h-4" />
                              <span>{message.sender}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{message.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{message.participants} participantes</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600">{message.preview}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleOpenMessage(message.subject)}
                          >
                            Abrir
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

export default TeamMessages;
