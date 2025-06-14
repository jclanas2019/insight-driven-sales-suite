
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, User, Phone, Video, MapPin, Edit, Trash2 } from "lucide-react";

interface Event {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  attendees: string[];
  status: string;
}

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

export const EventCard = ({ event, onEdit, onDelete }: EventCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmada": return "bg-green-100 text-green-800";
      case "Programada": return "bg-blue-100 text-blue-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Cancelada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Llamada": return <Phone className="w-4 h-4" />;
      case "Videollamada": return <Video className="w-4 h-4" />;
      case "Reunión": return <User className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-start space-x-4 p-4 border rounded-lg bg-white">
      <div className="flex-shrink-0 mt-1">
        {getTypeIcon(event.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {event.title}
          </h3>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
            <Button variant="ghost" size="sm" onClick={() => onEdit(event)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(event)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {event.date}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {event.time} ({event.duration})
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {event.location}
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {event.attendees.join(", ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
