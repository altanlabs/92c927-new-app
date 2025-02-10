import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Dumbbell,
  PiggyBank,
  Target,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  description: string;
}

export const CircularMenu = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const menuItems: MenuItem[] = [
    { icon: <Brain className="h-6 w-6" />, label: "Bienestar", description: "Análisis de estado de ánimo y hábitos" },
    { icon: <Dumbbell className="h-6 w-6" />, label: "Deporte", description: "Seguimiento de actividad física" },
    { icon: <PiggyBank className="h-6 w-6" />, label: "Finanzas", description: "Gestión de gastos e inversiones" },
    { icon: <Target className="h-6 w-6" />, label: "Crecimiento", description: "Objetivos y desarrollo personal" },
    { icon: <TrendingUp className="h-6 w-6" />, label: "Recomendaciones", description: "Sugerencias personalizadas" },
    { icon: <DollarSign className="h-6 w-6" />, label: "Monetización", description: "Oportunidades y privacidad" },
  ];

  return (
    <div className="relative w-[800px] h-[800px]">
      {menuItems.map((item, index) => {
        const angle = (index * 60 * Math.PI) / 180; // 60 grados entre cada ítem
        const radius = 300; // Radio del círculo
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              zIndex: activeIndex === index ? 20 : 1,
            }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <Card
              className={`p-4 cursor-pointer transition-all duration-300 hover:scale-110 ${
                activeIndex === index ? 'shadow-lg scale-110' : ''
              }`}
            >
              <Button
                variant="ghost"
                className="w-full h-full flex flex-col items-center gap-2 min-w-40"
                onClick={() => console.log(item.label)}
              >
                {item.icon}
                <span className="font-semibold">{item.label}</span>
                {activeIndex === index && (
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </Button>
            </Card>
          </div>
        );
      })}
      
      {/* Círculo decorativo central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border-4 border-dashed border-muted rounded-full -z-10" />
    </div>
  );
};