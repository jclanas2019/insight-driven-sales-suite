
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Mail, Phone, Building2, User, Edit, Trash2 } from "lucide-react";
import { AddContactDialog } from "@/components/AddContactDialog";

// Datos de ejemplo para contactos
const mockContacts = [
  {
    id: 1,
    name: "Ana García",
    email: "ana.garcia@empresa.com",
    phone: "+34 666 123 456",
    company: "TechCorp Solutions",
    position: "Gerente de Ventas",
    status: "activo",
    lastContact: "2024-01-15",
    avatar: ""
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@innovatech.es",
    phone: "+34 677 234 567",
    company: "InnovaTech",
    position: "Director de Marketing",
    status: "prospecto",
    lastContact: "2024-01-12",
    avatar: ""
  },
  {
    id: 3,
    name: "María López",
    email: "maria.lopez@globalcorp.com",
    phone: "+34 688 345 678",
    company: "GlobalCorp",
    position: "CEO",
    status: "cliente",
    lastContact: "2024-01-10",
    avatar: ""
  },
  {
    id: 4,
    name: "Juan Martínez",
    email: "juan.martinez@startup.io",
    phone: "+34 699 456 789",
    company: "StartupIO",
    position: "CTO",
    status: "inactivo",
    lastContact: "2024-01-08",
    avatar: ""
  }
];

const Contacts = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "activo":
        return "default";
      case "cliente":
        return "secondary";
      case "prospecto":
        return "outline";
      case "inactivo":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleAddContact = (newContact: any) => {
    const contact = {
      ...newContact,
      id: contacts.length + 1,
      lastContact: new Date().toISOString().split('T')[0],
      avatar: ""
    };
    setContacts([...contacts, contact]);
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
                <User className="w-6 h-6 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">Contactos</h1>
                  <p className="text-sm text-slate-500">Gestión de contactos y leads</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Contacto
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Contactos</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contacts.length}</div>
                  <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                  <Badge variant="default" className="h-4 w-4 rounded-full p-0" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {contacts.filter(c => c.status === "activo" || c.status === "cliente").length}
                  </div>
                  <p className="text-xs text-muted-foreground">+1 esta semana</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Prospectos</CardTitle>
                  <Badge variant="outline" className="h-4 w-4 rounded-full p-0" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {contacts.filter(c => c.status === "prospecto").length}
                  </div>
                  <p className="text-xs text-muted-foreground">En seguimiento</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa Conversión</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">75%</div>
                  <p className="text-xs text-muted-foreground">+5% este mes</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Contactos</CardTitle>
                <CardDescription>
                  Gestiona todos tus contactos y leads desde aquí
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar contactos por nombre, email o empresa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Contacts Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Contacto</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Contacto</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Último Contacto</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={contact.avatar} />
                                <AvatarFallback className="text-xs">
                                  {getInitials(contact.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-sm text-muted-foreground">{contact.position}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <span>{contact.company}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-sm">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                <span>{contact.email}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Phone className="w-3 h-3 text-muted-foreground" />
                                <span>{contact.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(contact.status)}>
                              {contact.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{contact.lastContact}</TableCell>
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

      <AddContactDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddContact={handleAddContact}
      />
    </SidebarProvider>
  );
};

export default Contacts;
