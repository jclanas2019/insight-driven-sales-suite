
import { CRMSidebar } from "@/components/CRMSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Download, QrCode, Apple, Play, Star } from "lucide-react";

const Mobile = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CRMSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center gap-2 mb-6">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Aplicación Móvil</h1>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Hero Section */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">SalesHub CRM Mobile</CardTitle>
                <CardDescription className="text-blue-100">
                  Gestiona tu CRM desde cualquier lugar con nuestra aplicación móvil nativa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    <Apple className="w-4 h-4 mr-2" />
                    Descargar para iOS
                  </Button>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    <Play className="w-4 h-4 mr-2" />
                    Descargar para Android
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-blue-600" />
                    Acceso Rápido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Escanea el código QR para descargar directamente la aplicación
                  </p>
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Funcionalidades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">✓</Badge>
                      Gestión de contactos offline
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">✓</Badge>
                      Sincronización automática
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">✓</Badge>
                      Notificaciones push
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary">✓</Badge>
                      Llamadas integradas
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">4.8</div>
                  <p className="text-sm text-gray-600">Rating en App Store</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-600">50K+</div>
                  <p className="text-sm text-gray-600">Descargas</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-purple-600">99.9%</div>
                  <p className="text-sm text-gray-600">Uptime</p>
                </CardContent>
              </Card>
            </div>

            {/* System Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requisitos del Sistema</CardTitle>
                <CardDescription>
                  Asegúrate de que tu dispositivo cumple con los requisitos mínimos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Apple className="w-4 h-4" />
                      iOS
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• iOS 13.0 o superior</li>
                      <li>• iPhone 7 o posterior</li>
                      <li>• 100 MB de espacio libre</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Android
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Android 7.0 (API level 24)</li>
                      <li>• 2GB RAM mínimo</li>
                      <li>• 150 MB de espacio libre</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Mobile;
