"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardCard } from "@/components/dashboard-card";
import { BookText, Users, BookOpen, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const datosBarra = [
  { nombre: "Ene", valor: 12 },
  { nombre: "Feb", valor: 19 },
  { nombre: "Mar", valor: 15 },
  { nombre: "Abr", valor: 27 },
  { nombre: "May", valor: 21 },
  { nombre: "Jun", valor: 32 },
];

const datosPastel = [
  { nombre: "Ficción", valor: 45 },
  { nombre: "No Ficción", valor: 30 },
  { nombre: "Ciencia", valor: 15 },
  { nombre: "Historia", valor: 10 },
];

const COLORES = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

// Componentes personalizados para los ejes del gráfico
const EjeXPersonalizado = (props) => <XAxis {...props} />;
const EjeYPersonalizado = (props) => <YAxis {...props} />;

export default function PanelAdministrativo() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Panel de Control</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <DashboardCard
          title="Total de Libros"
          value={124}
          icon={BookText}
          description="12 añadidos este mes"
        />
        <DashboardCard
          title="Usuarios Activos"
          value={1432}
          icon={Users}
          description="Aumento del 24% respecto al mes pasado"
        />
        <DashboardCard
          title="Libros Leídos"
          value={3287}
          icon={BookOpen}
          description="Aumento del 15% respecto al mes pasado"
        />
        <DashboardCard
          title="Ingresos Mensuales"
          value="$12,543"
          icon={TrendingUp}
          description="Aumento del 8% respecto al mes pasado"
        />
      </div>

      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="analitica">Analítica</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Publicaciones Mensuales de Libros</CardTitle>
                <CardDescription>
                  Número de libros publicados por mes
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={datosBarra} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <EjeXPersonalizado dataKey="nombre" />
                    <EjeYPersonalizado />
                    <Tooltip />
                    <Bar dataKey="valor" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Categorías de Libros</CardTitle>
                <CardDescription>
                  Distribución de libros por categoría
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={datosPastel}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                      label={({ nombre, percent }) => `${nombre} ${(percent * 100).toFixed(0)}%`}
                    >
                      {datosPastel.map((entrada, index) => (
                        <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analitica" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analítica Avanzada</CardTitle>
              <CardDescription>
                Aquí se mostrarán análisis detallados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analítica avanzada próximamente</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

