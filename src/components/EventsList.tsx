
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EventCard } from "@/components/EventCard";

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

interface EventsListProps {
  events: Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (event: Event) => void;
}

export const EventsList = ({ events, onEditEvent, onDeleteEvent }: EventsListProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Próximos Eventos</CardTitle>
        <CardDescription>
          Lista de reuniones y actividades programadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={onEditEvent}
              onDelete={onDeleteEvent}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
