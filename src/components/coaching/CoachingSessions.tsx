
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar } from "lucide-react";
import type { CoachingSession } from "@/types/coaching";

interface CoachingSessionsProps {
  sessions: CoachingSession[];
}

export const CoachingSessions = ({ sessions }: CoachingSessionsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Sesiones de Coaching</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">{session.title}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <span>{session.duration}</span>
                    <span>Coach: {session.coach}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {session.score && (
                    <Badge className="bg-blue-100 text-blue-800">
                      {session.score}/10
                    </Badge>
                  )}
                  <Badge className={getStatusColor(session.status)}>
                    {session.status === "completed" && "Completada"}
                    {session.status === "scheduled" && "Programada"}
                    {session.status === "cancelled" && "Cancelada"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
