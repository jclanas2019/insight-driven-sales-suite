
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { BarChart3, TrendingUp, Users, Target, DollarSign, Calendar, Download, Filter, FileText } from "lucide-react";

// Mock data para reportes
const salesData = [
  { month: "Ene", ventas: 45000, oportunidades: 23, leads: 156 },
  { month: "Feb", ventas: 52000, oportunidades: 28, leads: 189 },
  { month: "Mar", ventas: 48000, oportunidades: 25, leads: 167 },
  { month: "Abr", ventas: 61000, oportunidades: 32, leads: 203 },
  { month: "May", ventas: 58000, oportunidades: 29, leads: 178 },
  { month: "Jun", ventas: 67000, oportunidades: 35, leads: 221 }
];

const pipelineData = [
  { name: "Prospecto", value: 35, color: "#8884d8" },
  { name: "Calificado", value: 28, color: "#82ca9d" },
  { name: "Propuesta", value: 22, color: "#ffc658" },
  { name: "Negociación", value: 15, color: "#ff7c7c" }
];

const performanceData = [
  { vendedor: "Carlos Ruiz", ventas: 125000, oportunidades: 23, conversion: 78, meta: 120000 },
  { vendedor: "Ana López", ventas: 98000, oportunidades: 19, conversion: 82, meta: 100000 },
  { vendedor: "Miguel Torres", ventas: 87000, oportunidades: 16, conversion: 75, meta: 90000 },
  { vendedor: "Laura García", ventas: 76000, oportunidades: 14, conversion: 68, meta: 80000 },
  { vendedor: "José Morales", ventas: 92000, oportunidades: 18, conversion: 71, meta: 85000 }
];

const leadSourceData = [
  { fuente: "Website", leads: 145, conversion: 12, color: "#0088FE" },
  { fuente: "Redes Sociales", leads: 89, conversion: 8, color: "#00C49F" },
  { fuente: "Email Marketing", leads: 67, conversion: 15, color: "#FFBB28" },
  { fuente: "Referencias", leads: 34, conversion: 28, color: "#FF8042" },
  { fuente: "Eventos", leads: 23, conversion: 22, color: "#8884D8" }
];

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6 meses");
  const [selectedReport, setSelectedReport] = useState("ventas");

  const totalSales = salesData.reduce((sum, item) => sum + item.ventas, 0);
  const totalOpportunities = salesData.reduce((sum, item) => sum + item.oportunidades, 0);
  const totalLeads = salesData.reduce((sum, item) => sum + item.leads, 0);
  const avgConversion = Math.round(performanceData.reduce((sum, item) => sum + item.conversion, 0) / performanceData.length);

  const chartConfig = {
    ventas: {
      label: "Ventas",
      color: "#2563eb",
    },
    oportunidades: {
      label: "Oportunidades",
      color: "#dc2626",
    },
    leads: {
      label: "Leads",
      color: "#16a34a",
    },
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <CRMSidebar />
        <main className="flex-1">
          <div className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-slate-900">Reportes</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 mes">Último mes</SelectItem>
                  <SelectItem value="3 meses">3 meses</SelectItem>
                  <SelectItem value="6 meses">6 meses</SelectItem>
                  <SelectItem value="1 año">1 año</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12% </span>vs período anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOpportunities}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8% </span>vs período anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leads Generados</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalLeads}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15% </span>vs período anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgConversion}%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+3% </span>vs período anterior
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Ventas</CardTitle>
                  <CardDescription>Evolución mensual de ventas y oportunidades</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="ventas" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="oportunidades" stackId="2" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Pipeline Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución del Pipeline</CardTitle>
                  <CardDescription>Oportunidades por etapa del proceso</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pipelineData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pipelineData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {pipelineData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Vendedor</CardTitle>
                <CardDescription>Métricas de desempeño del equipo de ventas</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendedor</TableHead>
                      <TableHead>Ventas</TableHead>
                      <TableHead>Oportunidades</TableHead>
                      <TableHead>Conversión</TableHead>
                      <TableHead>Meta</TableHead>
                      <TableHead>Cumplimiento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceData.map((seller) => {
                      const cumplimiento = Math.round((seller.ventas / seller.meta) * 100);
                      return (
                        <TableRow key={seller.vendedor}>
                          <TableCell className="font-medium">{seller.vendedor}</TableCell>
                          <TableCell>${seller.ventas.toLocaleString()}</TableCell>
                          <TableCell>{seller.oportunidades}</TableCell>
                          <TableCell>{seller.conversion}%</TableCell>
                          <TableCell>${seller.meta.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={cumplimiento >= 100 ? "bg-green-100 text-green-800" : cumplimiento >= 80 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}>
                              {cumplimiento}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Lead Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Fuentes de Leads</CardTitle>
                <CardDescription>Análisis de generación de leads por canal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadSourceData.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: source.color }}
                        />
                        <div>
                          <p className="font-medium">{source.fuente}</p>
                          <p className="text-sm text-gray-600">{source.leads} leads generados</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{source.conversion}%</p>
                        <p className="text-sm text-gray-600">conversión</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Reports;
