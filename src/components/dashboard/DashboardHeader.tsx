
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard de Ventas</h1>
        <p className="text-slate-600 mt-1">Resumen completo de tu actividad comercial</p>
      </div>
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        En tiempo real
      </Badge>
    </div>
  );
}
