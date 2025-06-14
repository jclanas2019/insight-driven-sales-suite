
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";

export const PreviredIntegration = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Previred</CardTitle>
        <CardDescription>
          Integración para gestión de recursos humanos y nóminas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h4 className="font-medium text-orange-800 mb-2">Funcionalidades Disponibles</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Validación de RUT de clientes</li>
            <li>• Verificación de datos empresariales</li>
            <li>• Sincronización de comisiones de ventas</li>
          </ul>
        </div>
        
        <Button variant="outline" className="w-full">
          <Building className="w-4 h-4 mr-2" />
          Configurar Integración
        </Button>
      </CardContent>
    </Card>
  );
};
