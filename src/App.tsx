import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import ProductFinder from "./pages/ProductFinder";
import About from "./pages/About";
import Support from "./pages/Support";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import { useCartSync } from "@/hooks/useCartSync";

const queryClient = new QueryClient();

function AppInner() {
  useCartSync();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/collection/:category" element={<Collection />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="/product-finder" element={<ProductFinder />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
