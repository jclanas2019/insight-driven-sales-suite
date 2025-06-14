
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface CalendarSidebarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

export const CalendarSidebar = ({ selectedDate, onSelectDate }: CalendarSidebarProps) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Calendario</CardTitle>
        <CardDescription>
          Selecciona una fecha para ver los eventos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};
