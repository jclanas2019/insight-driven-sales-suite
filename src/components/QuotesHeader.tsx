
import { SidebarTrigger } from "@/components/ui/sidebar";
import { FileText } from "lucide-react";
import { AddQuoteDialog } from "@/components/AddQuoteDialog";

interface QuotesHeaderProps {
  isAddDialogOpen: boolean;
  onAddDialogOpenChange: (open: boolean) => void;
  onAddQuote: (newQuoteData: any) => void;
}

export const QuotesHeader = ({ isAddDialogOpen, onAddDialogOpenChange, onAddQuote }: QuotesHeaderProps) => {
  return (
    <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="mr-4" />
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-slate-900">Cotizaciones Inteligentes</h1>
        </div>
      </div>
      <AddQuoteDialog 
        open={isAddDialogOpen} 
        onOpenChange={onAddDialogOpenChange}
        onAdd={onAddQuote}
      />
    </div>
  );
};
