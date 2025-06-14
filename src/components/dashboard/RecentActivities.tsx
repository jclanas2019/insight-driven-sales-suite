
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Calendar, Clock } from "lucide-react";
import { RecentActivity } from "@/types/dashboard";

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-green-600" />
          <span>Actividades Recientes</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
            <div className="flex-shrink-0">
              {activity.type === "call" && <Phone className="h-4 w-4 text-blue-600" />}
              {activity.type === "email" && <Mail className="h-4 w-4 text-green-600" />}
              {activity.type === "meeting" && <Calendar className="h-4 w-4 text-purple-600" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{activity.contact}</p>
              <p className="text-xs text-slate-500">{activity.company}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">{activity.time}</p>
              <Badge 
                variant={activity.status === "completed" ? "default" : "outline"}
                className="text-xs"
              >
                {activity.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
