import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface TabData {
  title: string;
  content: string;
}

const InsightsCard = ({ title, description }: { title: string; description: string }) => (
  <Card className="p-4 hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

export const TabsContainer = () => {
  const tabsData: Record<string, TabData[]> = {
    bienestar: [
      { title: "Estado de Ánimo", content: "Análisis de patrones emocionales" },
      { title: "Hábitos Saludables", content: "Recomendaciones personalizadas" },
    ],
    deporte: [
      { title: "Rendimiento", content: "Estadísticas de actividad física" },
      { title: "Objetivos", content: "Seguimiento de metas deportivas" },
    ],
    finanzas: [
      { title: "Gastos", content: "Análisis de patrones de gasto" },
      { title: "Inversiones", content: "Recomendaciones de inversión" },
    ],
    crecimiento: [
      { title: "Objetivos", content: "Seguimiento de metas personales" },
      { title: "Habilidades", content: "Desarrollo de competencias" },
    ],
    recomendaciones: [
      { title: "Personalizadas", content: "Sugerencias basadas en tus datos" },
      { title: "Tendencias", content: "Análisis de comportamiento" },
    ],
    monetizacion: [
      { title: "Oportunidades", content: "Monetización de datos" },
      { title: "Privacidad", content: "Control de datos compartidos" },
    ],
  };

  return (
    <Tabs defaultValue="bienestar" className="w-full">
      <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto">
        <TabsTrigger value="bienestar">Bienestar</TabsTrigger>
        <TabsTrigger value="deporte">Deporte</TabsTrigger>
        <TabsTrigger value="finanzas">Finanzas</TabsTrigger>
        <TabsTrigger value="crecimiento">Crecimiento</TabsTrigger>
        <TabsTrigger value="recomendaciones">Recomendaciones</TabsTrigger>
        <TabsTrigger value="monetizacion">Monetización</TabsTrigger>
      </TabsList>

      {Object.entries(tabsData).map(([key, data]) => (
        <TabsContent key={key} value={key} className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {data.map((item, index) => (
              <InsightsCard 
                key={index} 
                title={item.title} 
                description={item.content} 
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};