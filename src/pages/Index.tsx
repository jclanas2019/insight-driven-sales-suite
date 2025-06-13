
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-500">Bienvenido a</span>
              <span className="font-semibold text-slate-900">SalesHub CRM</span>
            </div>
          </div>
          <Dashboard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
