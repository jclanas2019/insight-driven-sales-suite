
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Users,
  Building2,
  Target,
  Phone,
  Mail,
  Workflow,
  BarChart3,
  ShoppingCart,
  Brain,
  Smartphone,
  Shield,
  Home,
  Calendar,
  FileText,
  Settings,
  MessageSquare,
  Video,
  Archive,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    description: "Panel principal"
  }
];

const crmSections = [
  {
    title: "Gestión de Clientes",
    items: [
      {
        title: "Contactos",
        url: "/contacts",
        icon: Users,
        description: "Gestión de contactos y leads"
      },
      {
        title: "Empresas",
        url: "/companies",
        icon: Building2,
        description: "Cuentas y organizaciones"
      }
    ]
  },
  {
    title: "Ventas",
    items: [
      {
        title: "Oportunidades",
        url: "/deals",
        icon: Target,
        description: "Pipeline y negocios"
      },
      {
        title: "Cotizaciones",
        url: "/quotes",
        icon: FileText,
        description: "Propuestas y cotizaciones"
      },
      {
        title: "Productos",
        url: "/products",
        icon: ShoppingCart,
        description: "Catálogo de productos"
      }
    ]
  },
  {
    title: "Comunicación",
    items: [
      {
        title: "Actividades",
        url: "/activities",
        icon: Phone,
        description: "Llamadas y reuniones"
      },
      {
        title: "Email Marketing",
        url: "/emails",
        icon: Mail,
        description: "Campañas y secuencias"
      },
      {
        title: "Calendario",
        url: "/calendar",
        icon: Calendar,
        description: "Agenda y programación"
      }
    ]
  },
  {
    title: "Colaboración",
    items: [
      {
        title: "Reuniones de mi equipo",
        url: "/team-meetings",
        icon: Users,
        description: "Reuniones del equipo"
      },
      {
        title: "Mensajes de mi equipo",
        url: "/team-messages",
        icon: MessageSquare,
        description: "Comunicación del equipo"
      },
      {
        title: "Mis reuniones",
        url: "/my-meetings",
        icon: Video,
        description: "Mis reuniones personales"
      },
      {
        title: "Mis mensajes",
        url: "/my-messages",
        icon: MessageSquare,
        description: "Mis mensajes personales"
      },
      {
        title: "Archivados",
        url: "/archived",
        icon: Archive,
        description: "Elementos archivados"
      }
    ]
  },
  {
    title: "Automatización",
    items: [
      {
        title: "Flujos de Trabajo",
        url: "/workflows",
        icon: Workflow,
        description: "Automatización de procesos"
      },
      {
        title: "IA & Insights",
        url: "/ai-insights",
        icon: Brain,
        description: "Inteligencia artificial"
      }
    ]
  },
  {
    title: "Análisis",
    items: [
      {
        title: "Reportes",
        url: "/reports",
        icon: BarChart3,
        description: "Informes y métricas"
      }
    ]
  },
  {
    title: "Configuración",
    items: [
      {
        title: "Aplicación Móvil",
        url: "/mobile",
        icon: Smartphone,
        description: "Acceso móvil"
      },
      {
        title: "Permisos",
        url: "/permissions",
        icon: Shield,
        description: "Roles y seguridad"
      },
      {
        title: "Configuración",
        url: "/settings",
        icon: Settings,
        description: "Configuración general"
      }
    ]
  }
];

export function CRMSidebar() {
  const [activeItem, setActiveItem] = useState("/");

  return (
    <Sidebar className="border-r border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <SidebarHeader className="border-b border-slate-100 px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg text-slate-800 truncate">SalesHub CRM</h2>
            <p className="text-xs text-slate-500 truncate">Professional Edition</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        {/* Dashboard principal */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeItem === item.url}
                    className="w-full justify-start"
                    onClick={() => setActiveItem(item.url)}
                  >
                    <a href={item.url} className="flex items-center gap-3 p-3 rounded-lg">
                      <item.icon className="w-5 h-5 shrink-0" />
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-medium text-sm text-slate-900 truncate">{item.title}</div>
                        <div className="text-xs text-slate-500 truncate">{item.description}</div>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secciones del CRM */}
        {crmSections.map((section) => (
          <SidebarGroup key={section.title} className="mt-4">
            <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wide px-3 mb-2">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={activeItem === item.url}
                      className="w-full justify-start"
                      onClick={() => setActiveItem(item.url)}
                    >
                      <a href={item.url} className="flex items-center gap-3 p-3 rounded-lg">
                        <item.icon className="w-4 h-4 shrink-0" />
                        <div className="flex-1 text-left min-w-0">
                          <div className="font-medium text-sm text-slate-900 truncate">{item.title}</div>
                          <div className="text-xs text-slate-500 truncate">{item.description}</div>
                        </div>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-100 px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">John Doe</p>
            <p className="text-xs text-slate-500 truncate">Gerente de Ventas</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
