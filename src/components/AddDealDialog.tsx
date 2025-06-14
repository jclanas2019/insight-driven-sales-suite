
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddDealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddDealDialog = ({ open, onOpenChange }: AddDealDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Oportunidad
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nueva Oportunidad</DialogTitle>
          <DialogDescription>
            Crea una nueva oportunidad de venta en el pipeline.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600">Formulario de nueva oportunidad aquí...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
