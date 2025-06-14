
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Phone, Clock, Plus } from "lucide-react";
import { NewPersonalMessageDialog } from "@/components/dialogs/NewPersonalMessageDialog";

const MyMessages = () => {
  const handleMessageSent = () => {
    // Aquí se podría actualizar la lista de mensajes
    console.log("Nuevo mensaje personal enviado");
  };

  const handleReplyMessage = (sender: string, subject: string) => {
    // Aquí se implementaría la lógica para responder al mensaje
    console.log(`Respondiendo a ${sender} sobre: ${subject}`);
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
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Mis mensajes</h1>
              </div>
            </div>
            <NewPersonalMessageDialog onMessageSent={handleMessageSent} />
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">No Leídos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">8</div>
                  <p className="text-sm text-slate-600">mensajes pendientes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Enviados Hoy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">15</div>
                  <p className="text-sm text-slate-600">mensajes enviados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Respuestas Pendientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">6</div>
                  <p className="text-sm text-slate-600">esperando respuesta</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tiempo de Respuesta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">2.5h</div>
                  <p className="text-sm text-slate-600">promedio de respuesta</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Bandeja de Entrada</CardTitle>
                <CardDescription>
                  Tus mensajes personales y comunicaciones con clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      from: "María López",
                      company: "TechSolutions Inc.",
                      subject: "Consulta sobre pricing",
                      time: "Hace 10 min",
                      unread: true,
                      type: "email",
                      priority: "alta",
                      preview: "Hola Juan, me gustaría conocer más detalles sobre los precios..."
                    },
                    {
                      from: "Carlos Rodriguez",
                      company: "Enterprise Ltd",
                      subject: "Propuesta recibida",
                      time: "Hace 1 hora",
                      unread: true,
                      type: "email",
                      priority: "media",
                      preview: "Gracias por enviar la propuesta. Tengo algunas preguntas..."
                    },
                    {
                      from: "Ana Martín",
                      company: "StartupXYZ",
                      subject: "¿Podemos reagendar?",
                      time: "Hace 2 horas",
                      unread: false,
                      type: "whatsapp",
                      priority: "alta",
                      preview: "Hola! Me surgió un imprevisto, ¿podríamos reagendar para mañana?"
                    },
                    {
                      from: "Roberto Silva",
                      company: "Global Corp",
                      subject: "Feedback de la demo",
                      time: "Ayer, 16:45",
                      unread: false,
                      type: "email",
                      priority: "baja",
                      preview: "Excelente presentación! El equipo quedó muy impresionado..."
                    },
                    {
                      from: "Laura Pérez",
                      company: "InnovateTech",
                      subject: "Información adicional",
                      time: "Ayer, 14:20",
                      unread: false,
                      type: "linkedin",
                      priority: "media",
                      preview: "Hola Juan, vi tu perfil y me interesa saber más sobre..."
                    }
                  ].map((message, index) => (
                    <div key={index} className={`border rounded-lg p-4 hover:bg-slate-50 transition-colors ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
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
                            <Badge variant="outline" className={`text-xs ${
                              message.priority === 'alta' ? 'border-red-200 text-red-700' :
                              message.priority === 'media' ? 'border-yellow-200 text-yellow-700' :
                              'border-green-200 text-green-700'
                            }`}>
                              {message.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                            <span className="font-medium">{message.from}</span>
                            <span>• {message.company}</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{message.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {message.type === "email" && <Mail className="w-4 h-4" />}
                              {message.type === "whatsapp" && <Phone className="w-4 h-4" />}
                              {message.type === "linkedin" && <MessageSquare className="w-4 h-4" />}
                              <span className="capitalize">{message.type}</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600">{message.preview}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReplyMessage(message.from, message.subject)}
                          >
                            Responder
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

export default MyMessages;
