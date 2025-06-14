
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface IntegrationStatusCardProps {
  icon: LucideIcon;
  name: string;
  isConnected: boolean;
  iconColor: string;
}

export const IntegrationStatusCard = ({ 
  icon: Icon, 
  name, 
  isConnected, 
  iconColor 
}: IntegrationStatusCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <div>
          <p className="text-sm font-medium">{name}</p>
          <Badge variant={isConnected ? "default" : "outline"}>
            {isConnected ? "Conectado" : "Desconectado"}
          </Badge>
        </div>
      </div>
    </Card>
  );
};
