
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Package, DollarSign, TrendingUp, ShoppingCart } from "lucide-react";

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "CRM Professional",
    category: "Software",
    sku: "CRM-PRO-001",
    price: 299,
    cost: 150,
    stock: 0, // Digital product
    status: "Activo",
    description: "Sistema CRM completo para empresas medianas"
  },
  {
    id: 2,
    name: "Consultoría por Hora",
    category: "Servicios",
    sku: "CONS-HR-001",
    price: 85,
    cost: 40,
    stock: 0, // Service
    status: "Activo",
    description: "Consultoría especializada en transformación digital"
  },
  {
    id: 3,
    name: "Licencia Analytics",
    category: "Software",
    sku: "ANA-LIC-001",
    price: 450,
    cost: 200,
    stock: 0, // Digital product
    status: "Activo",
    description: "Herramientas avanzadas de análisis de datos"
  },
  {
    id: 4,
    name: "Soporte Premium",
    category: "Servicios",
    sku: "SUP-PREM-001",
    price: 150,
    cost: 60,
    stock: 0, // Service
    status: "Activo",
    description: "Soporte técnico 24/7 con respuesta prioritaria"
  },
  {
    id: 5,
    name: "Training Workshop",
    category: "Capacitación",
    sku: "TRN-WS-001",
    price: 750,
    cost: 300,
    stock: 12,
    status: "Activo",
    description: "Taller presencial de capacitación en CRM"
  }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Inactivo": return "bg-red-100 text-red-800";
      case "Agotado": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Software": return "bg-blue-100 text-blue-800";
      case "Servicios": return "bg-purple-100 text-purple-800";
      case "Capacitación": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalProducts = filteredProducts.length;
  const activeProducts = filteredProducts.filter(product => product.status === "Activo").length;
  const avgPrice = filteredProducts.reduce((sum, product) => sum + product.price, 0) / filteredProducts.length;
  const totalRevenue = filteredProducts.reduce((sum, product) => sum + (product.price - product.cost), 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <Package className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Productos</h1>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Producto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                  <DialogDescription>
                    Crea un nuevo producto o servicio en tu catálogo.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <p className="text-sm text-gray-600">Formulario de nuevo producto aquí...</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="p-6 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalProducts}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeProducts}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Precio Promedio</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${avgPrice.toFixed(0)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Margen Total</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Products Table */}
            <Card>
              <CardHeader>
                <CardTitle>Catálogo de Productos</CardTitle>
                <CardDescription>
                  Gestiona tu catálogo completo de productos y servicios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar productos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Costo</TableHead>
                      <TableHead>Margen</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.description}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(product.category)}>{product.category}</Badge>
                        </TableCell>
                        <TableCell>${product.price.toLocaleString()}</TableCell>
                        <TableCell>${product.cost.toLocaleString()}</TableCell>
                        <TableCell className="font-medium text-green-600">
                          ${(product.price - product.cost).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {product.stock === 0 ? "N/A" : product.stock.toString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Products;
