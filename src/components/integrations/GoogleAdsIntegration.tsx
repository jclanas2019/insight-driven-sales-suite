
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const GoogleAdsIntegration = () => {
  const { toast } = useToast();

  const handleGoogleAdsSync = () => {
    console.log("Sincronizando con Google Ads para remarketing");
    
    toast({
      title: "Google Ads Sincronizado",
      description: "Audiencias actualizadas para remarketing",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Ads</CardTitle>
        <CardDescription>
          Sincroniza datos para remarketing y optimización de campañas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Audiencias Disponibles</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Clientes con cotizaciones pendientes</li>
              <li>• Clientes que no respondieron en 7 días</li>
              <li>• Clientes con cotizaciones de alto valor</li>
            </ul>
          </div>
          
          <Button onClick={handleGoogleAdsSync} className="w-full">
            <Zap className="w-4 h-4 mr-2" />
            Sincronizar Audiencias
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
