
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Archive, Search, Calendar, File, MessageSquare, Video, Trash2, RotateCcw } from "lucide-react";

const Archived = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <Archive className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Archivados</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input 
                  placeholder="Buscar en archivados..." 
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Archivados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-600">145</div>
                  <p className="text-sm text-slate-600">elementos guardados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reuniones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">67</div>
                  <p className="text-sm text-slate-600">reuniones archivadas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mensajes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">52</div>
                  <p className="text-sm text-slate-600">conversaciones</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">26</div>
                  <p className="text-sm text-slate-600">archivos guardados</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Elementos Archivados</CardTitle>
                <CardDescription>
                  Reuniones, mensajes y documentos que has archivado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Reunión Q3 Review - TechCorp",
                      type: "meeting",
                      date: "Archivado hace 2 días",
                      originalDate: "15 Nov 2024",
                      description: "Revisión trimestral con el equipo de TechCorp",
                      tags: ["Q3", "Review", "Cliente"]
                    },
                    {
                      title: "Conversación: Propuesta Marketing Plus",
                      type: "message",
                      date: "Archivado hace 1 semana",
                      originalDate: "8 Nov 2024",
                      description: "Chat sobre la propuesta para Marketing Plus Inc.",
                      tags: ["Propuesta", "Chat", "Cliente"]
                    },
                    {
                      title: "Presentación Demo - StartupABC",
                      type: "document",
                      date: "Archivado hace 2 semanas",
                      originalDate: "1 Nov 2024",
                      description: "Slides de la demo presentada a StartupABC",
                      tags: ["Demo", "Presentación", "PDF"]
                    },
                    {
                      title: "Reunión de planning Q4",
                      type: "meeting",
                      date: "Archivado hace 3 semanas",
                      originalDate: "25 Oct 2024",
                      description: "Planificación de objetivos para Q4",
                      tags: ["Planning", "Q4", "Interno"]
                    },
                    {
                      title: "Feedback session - Global Enterprises",
                      type: "meeting",
                      date: "Archivado hace 1 mes",
                      originalDate: "15 Oct 2024",
                      description: "Sesión de feedback post-implementación",
                      tags: ["Feedback", "Post-venta", "Cliente"]
                    }
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {item.type === "meeting" && <Video className="w-5 h-5 text-blue-600" />}
                            {item.type === "message" && <MessageSquare className="w-5 h-5 text-green-600" />}
                            {item.type === "document" && <File className="w-5 h-5 text-purple-600" />}
                            <h3 className="font-semibold text-slate-900">{item.title}</h3>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{item.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{item.date}</span>
                            </div>
                            <span>• Original: {item.originalDate}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            {item.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Restaurar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Eliminar
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

export default Archived;
