
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Building2, Users, Globe, MapPin, Edit, Trash2, Phone, Mail } from "lucide-react";
import { AddCompanyDialog } from "@/components/AddCompanyDialog";

// Datos de ejemplo para empresas
const mockCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Tecnología",
    size: "Grande",
    employees: 500,
    revenue: "€2.5M",
    location: "Madrid, España",
    website: "www.techcorp.com",
    phone: "+34 91 123 4567",
    email: "info@techcorp.com",
    status: "cliente",
    contacts: 3,
    deals: 2,
    lastActivity: "2024-01-15",
    logo: ""
  },
  {
    id: 2,
    name: "InnovaTech",
    industry: "Software",
    size: "Mediana",
    employees: 150,
    revenue: "€850K",
    location: "Barcelona, España",
    website: "www.innovatech.es",
    phone: "+34 93 234 5678",
    email: "contacto@innovatech.es",
    status: "prospecto",
    contacts: 2,
    deals: 1,
    lastActivity: "2024-01-12",
    logo: ""
  },
  {
    id: 3,
    name: "GlobalCorp",
    industry: "Consultoría",
    size: "Grande",
    employees: 1200,
    revenue: "€5.2M",
    location: "Valencia, España",
    website: "www.globalcorp.com",
    phone: "+34 96 345 6789",
    email: "info@globalcorp.com",
    status: "cliente",
    contacts: 5,
    deals: 4,
    lastActivity: "2024-01-10",
    logo: ""
  },
  {
    id: 4,
    name: "StartupIO",
    industry: "Fintech",
    size: "Pequeña",
    employees: 25,
    revenue: "€120K",
    location: "Sevilla, España",
    website: "www.startup.io",
    phone: "+34 95 456 7890",
    email: "hello@startup.io",
    status: "lead",
    contacts: 1,
    deals: 0,
    lastActivity: "2024-01-08",
    logo: ""
  }
];

const Companies = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "cliente":
        return "default";
      case "prospecto":
        return "secondary";
      case "lead":
        return "outline";
      case "inactivo":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getSizeBadgeVariant = (size: string) => {
    switch (size) {
      case "Grande":
        return "default";
      case "Mediana":
        return "secondary";
      case "Pequeña":
        return "outline";
      default:
        return "outline";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleAddCompany = (newCompany: any) => {
    const company = {
      ...newCompany,
      id: companies.length + 1,
      contacts: 0,
      deals: 0,
      lastActivity: new Date().toISOString().split('T')[0],
      logo: ""
    };
    setCompanies([...companies, company]);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          {/* Header */}
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-2" />
              <div className="flex items-center space-x-2">
                <Building2 className="w-6 h-6 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">Empresas</h1>
                  <p className="text-sm text-slate-500">Cuentas y organizaciones</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nueva Empresa
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Empresas</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{companies.length}</div>
                  <p className="text-xs text-muted-foreground">+1 este mes</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                  <Badge variant="default" className="h-4 w-4 rounded-full p-0" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {companies.filter(c => c.status === "cliente").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Empresas cliente</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue Total</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€8.67M</div>
                  <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Deals activos</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Empresas</CardTitle>
                <CardDescription>
                  Gestiona todas las empresas y organizaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar empresas por nombre, industria o ubicación..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Companies Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Industria</TableHead>
                        <TableHead>Tamaño</TableHead>
                        <TableHead>Contacto</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Actividad</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCompanies.map((company) => (
                        <TableRow key={company.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={company.logo} />
                                <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                                  {getInitials(company.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{company.name}</div>
                                <div className="text-sm text-muted-foreground flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {company.location}
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center mt-1">
                                  <Globe className="w-3 h-3 mr-1" />
                                  {company.website}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{company.industry}</div>
                              <div className="text-sm text-muted-foreground">
                                {company.employees} empleados
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getSizeBadgeVariant(company.size)}>
                              {company.size}
                            </Badge>
                            <div className="text-sm text-muted-foreground mt-1">
                              {company.revenue}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-sm">
                                <Phone className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs">{company.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs">{company.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(company.status)}>
                              {company.status}
                            </Badge>
                            <div className="text-sm text-muted-foreground mt-1">
                              {company.contacts} contactos
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {company.lastActivity}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {company.deals} deals
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <AddCompanyDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddCompany={handleAddCompany}
      />
    </SidebarProvider>
  );
};

export default Companies;
