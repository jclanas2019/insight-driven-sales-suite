
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
      <SidebarHeader className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-800">SalesHub CRM</h2>
            <p className="text-xs text-slate-500">Professional Edition</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        {/* Dashboard principal */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                      activeItem === item.url ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600' : ''
                    }`}
                    onClick={() => setActiveItem(item.url)}
                  >
                    <a href={item.url} className="flex items-center space-x-3 px-3 py-2">
                      <item.icon className="w-5 h-5" />
                      <div>
                        <span className="font-medium">{item.title}</span>
                        <p className="text-xs text-slate-500">{item.description}</p>
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
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wide px-3 py-2">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      className={`hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                        activeItem === item.url ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600' : ''
                      }`}
                      onClick={() => setActiveItem(item.url)}
                    >
                      <a href={item.url} className="flex items-center space-x-3 px-3 py-2">
                        <item.icon className="w-4 h-4" />
                        <div>
                          <span className="text-sm font-medium">{item.title}</span>
                          <p className="text-xs text-slate-500">{item.description}</p>
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

      <SidebarFooter className="px-6 py-4 border-t border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">John Doe</p>
            <p className="text-xs text-slate-500">Gerente de Ventas</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
