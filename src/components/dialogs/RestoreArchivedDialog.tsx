
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RestoreArchivedDialogProps {
  itemTitle: string;
  itemType: string;
  onRestore?: () => void;
}

export function RestoreArchivedDialog({ itemTitle, itemType, onRestore }: RestoreArchivedDialogProps) {
  const { toast } = useToast();

  const handleRestore = () => {
    toast({
      title: "Elemento restaurado",
      description: `"${itemTitle}" ha sido restaurado exitosamente`,
    });
    onRestore?.();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-1" />
          Restaurar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Restaurar elemento</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas restaurar "{itemTitle}"? 
            Este {itemType} volverá a estar disponible en su ubicación original.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleRestore} className="bg-blue-600 hover:bg-blue-700">
            Restaurar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
