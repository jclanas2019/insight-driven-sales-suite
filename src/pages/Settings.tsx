
import { CRMSidebar } from "@/components/CRMSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Building2, Mail, Bell, Palette, Globe, Database, Shield } from "lucide-react";

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CRMSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center gap-2 mb-6">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="company">Empresa</TabsTrigger>
                <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="appearance">Apariencia</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Configuración General
                    </CardTitle>
                    <CardDescription>
                      Configuraciones básicas de la aplicación
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Zona Horaria</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar zona horaria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="america/mexico">América/México (GMT-6)</SelectItem>
                            <SelectItem value="america/bogota">América/Bogotá (GMT-5)</SelectItem>
                            <SelectItem value="america/argentina">América/Argentina (GMT-3)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">Inglés</SelectItem>
                            <SelectItem value="pt">Portugués</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Moneda</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mxn">Peso Mexicano (MXN)</SelectItem>
                            <SelectItem value="usd">Dólar Americano (USD)</SelectItem>
                            <SelectItem value="eur">Euro (EUR)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Formato de Fecha</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar formato" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="company" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Información de la Empresa
                    </CardTitle>
                    <CardDescription>
                      Datos principales de tu organización
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Nombre de la Empresa</Label>
                        <Input id="company-name" placeholder="Mi Empresa S.A." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industria</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar industria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Tecnología</SelectItem>
                            <SelectItem value="finance">Finanzas</SelectItem>
                            <SelectItem value="healthcare">Salud</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input id="address" placeholder="Calle Principal 123, Ciudad, País" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" placeholder="+52 55 1234 5678" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Sitio Web</Label>
                        <Input id="website" placeholder="https://miempresa.com" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Preferencias de Notificaciones
                    </CardTitle>
                    <CardDescription>
                      Controla qué notificaciones deseas recibir
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Nuevos contactos</p>
                          <p className="text-sm text-gray-600">Recibir notificación cuando se agreguen nuevos contactos</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Oportunidades actualizadas</p>
                          <p className="text-sm text-gray-600">Notificar cambios en el estado de las oportunidades</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Recordatorios de tareas</p>
                          <p className="text-sm text-gray-600">Recordatorios de tareas pendientes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Reportes semanales</p>
                          <p className="text-sm text-gray-600">Resumen semanal de actividades</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="email" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Configuración de Email
                    </CardTitle>
                    <CardDescription>
                      Configurar servidor SMTP y plantillas de email
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-server">Servidor SMTP</Label>
                        <Input id="smtp-server" placeholder="smtp.gmail.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtp-port">Puerto</Label>
                        <Input id="smtp-port" placeholder="587" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-from">Email remitente</Label>
                        <Input id="email-from" placeholder="noreply@miempresa.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-name">Nombre remitente</Label>
                        <Input id="email-name" placeholder="Mi Empresa CRM" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Habilitar SSL/TLS</p>
                        <p className="text-sm text-gray-600">Usar conexión segura para el envío de emails</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Apariencia
                    </CardTitle>
                    <CardDescription>
                      Personaliza la apariencia de tu CRM
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tema</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tema" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Claro</SelectItem>
                          <SelectItem value="dark">Oscuro</SelectItem>
                          <SelectItem value="system">Sistema</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Color principal</Label>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded cursor-pointer border-2 border-blue-600"></div>
                        <div className="w-8 h-8 bg-purple-600 rounded cursor-pointer"></div>
                        <div className="w-8 h-8 bg-green-600 rounded cursor-pointer"></div>
                        <div className="w-8 h-8 bg-red-600 rounded cursor-pointer"></div>
                        <div className="w-8 h-8 bg-orange-600 rounded cursor-pointer"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Sidebar compacta</p>
                        <p className="text-sm text-gray-600">Mostrar sidebar en modo compacto</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Seguridad
                    </CardTitle>
                    <CardDescription>
                      Configuraciones de seguridad y respaldo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Respaldo automático</p>
                          <p className="text-sm text-gray-600">Crear respaldos automáticos de los datos</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label>Frecuencia de respaldo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar frecuencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diario</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="monthly">Mensual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <Button variant="destructive">
                        <Database className="w-4 h-4 mr-2" />
                        Exportar todos los datos
                      </Button>
                      <p className="text-sm text-gray-600 mt-2">
                        Descarga una copia completa de todos tus datos en formato JSON
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-6">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
