
import { CRMSidebar } from "@/components/CRMSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Users, Eye, Edit, Trash2, Plus, Settings } from "lucide-react";

const Permissions = () => {
  const roles = [
    {
      name: "Administrador",
      users: 2,
      permissions: {
        contacts: { view: true, edit: true, delete: true, create: true },
        deals: { view: true, edit: true, delete: true, create: true },
        reports: { view: true, edit: true, delete: true, create: true },
        settings: { view: true, edit: true, delete: true, create: true }
      }
    },
    {
      name: "Gerente de Ventas",
      users: 5,
      permissions: {
        contacts: { view: true, edit: true, delete: false, create: true },
        deals: { view: true, edit: true, delete: false, create: true },
        reports: { view: true, edit: false, delete: false, create: false },
        settings: { view: false, edit: false, delete: false, create: false }
      }
    },
    {
      name: "Representante",
      users: 12,
      permissions: {
        contacts: { view: true, edit: true, delete: false, create: true },
        deals: { view: true, edit: true, delete: false, create: true },
        reports: { view: true, edit: false, delete: false, create: false },
        settings: { view: false, edit: false, delete: false, create: false }
      }
    }
  ];

  const modules = [
    { name: "Contactos", key: "contacts" },
    { name: "Oportunidades", key: "deals" },
    { name: "Reportes", key: "reports" },
    { name: "Configuración", key: "settings" }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CRMSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center gap-2 mb-6">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Permisos y Roles</h1>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header Actions */}
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Gestiona los roles y permisos de tu equipo para controlar el acceso a las funcionalidades
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Rol
              </Button>
            </div>

            {/* Roles Overview */}
            <div className="grid lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <Card key={role.name}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Users className="w-4 h-4" />
                          {role.users} usuarios
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {modules.map((module) => {
                        const perms = role.permissions[module.key as keyof typeof role.permissions];
                        const activePerms = Object.values(perms).filter(Boolean).length;
                        return (
                          <div key={module.key} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{module.name}</span>
                            <Badge variant={activePerms > 0 ? "default" : "secondary"}>
                              {activePerms}/4
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Permissions Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>Matriz de Permisos</CardTitle>
                <CardDescription>
                  Vista detallada de todos los permisos por rol y módulo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Módulo / Rol</th>
                        {roles.map((role) => (
                          <th key={role.name} className="text-center py-3 px-4 min-w-[120px]">
                            {role.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {modules.map((module) => (
                        <tr key={module.key} className="border-b">
                          <td className="py-4 px-4 font-medium">{module.name}</td>
                          {roles.map((role) => {
                            const perms = role.permissions[module.key as keyof typeof role.permissions];
                            return (
                              <td key={`${role.name}-${module.key}`} className="py-4 px-4">
                                <div className="flex justify-center gap-2">
                                  <div className="flex flex-col items-center gap-1">
                                    <Eye className={`w-4 h-4 ${perms.view ? 'text-green-600' : 'text-gray-300'}`} />
                                    <span className="text-xs">Ver</span>
                                  </div>
                                  <div className="flex flex-col items-center gap-1">
                                    <Edit className={`w-4 h-4 ${perms.edit ? 'text-blue-600' : 'text-gray-300'}`} />
                                    <span className="text-xs">Editar</span>
                                  </div>
                                  <div className="flex flex-col items-center gap-1">
                                    <Plus className={`w-4 h-4 ${perms.create ? 'text-purple-600' : 'text-gray-300'}`} />
                                    <span className="text-xs">Crear</span>
                                  </div>
                                  <div className="flex flex-col items-center gap-1">
                                    <Trash2 className={`w-4 h-4 ${perms.delete ? 'text-red-600' : 'text-gray-300'}`} />
                                    <span className="text-xs">Eliminar</span>
                                  </div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configuración de Seguridad
                </CardTitle>
                <CardDescription>
                  Configuraciones globales de seguridad y acceso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Autenticación de dos factores</p>
                      <p className="text-sm text-gray-600">Requerir 2FA para todos los usuarios</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Sesiones simultáneas</p>
                      <p className="text-sm text-gray-600">Permitir múltiples sesiones por usuario</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Tiempo de sesión</p>
                      <p className="text-sm text-gray-600">Cerrar sesión automáticamente después de inactividad</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Registro de auditoría</p>
                      <p className="text-sm text-gray-600">Registrar todas las acciones de los usuarios</p>
                    </div>
                    <Switch defaultChecked />
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

export default Permissions;
