
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeleteArchivedDialogProps {
  itemTitle: string;
  itemType: string;
  onDelete?: () => void;
}

export function DeleteArchivedDialog({ itemTitle, itemType, onDelete }: DeleteArchivedDialogProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    toast({
      title: "Elemento eliminado",
      description: `"${itemTitle}" ha sido eliminado permanentemente`,
      variant: "destructive"
    });
    onDelete?.();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
          <Trash2 className="w-4 h-4 mr-1" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar permanentemente</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar permanentemente "{itemTitle}"? 
            Esta acción no se puede deshacer y el {itemType} se perderá para siempre.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Eliminar permanentemente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
