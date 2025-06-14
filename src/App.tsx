
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contacts from "./pages/Contacts";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import Quotes from "./pages/Quotes";
import Products from "./pages/Products";
import Activities from "./pages/Activities";
import EmailMarketing from "./pages/EmailMarketing";
import Calendar from "./pages/Calendar";
import Workflows from "./pages/Workflows";
import AIInsights from "./pages/AIInsights";
import Reports from "./pages/Reports";
import Mobile from "./pages/Mobile";
import Permissions from "./pages/Permissions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/products" element={<Products />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/emails" element={<EmailMarketing />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/settings" element={<Settings />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
