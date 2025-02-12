import type { FC } from 'react';
import { useState } from 'react';
import { Card } from "../ui/card";
import { cn } from "../../lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

interface CircleProps {
  title: string;
  icon?: string;
  position: string;
  onClick: () => void;
  isActive: boolean;
}

const Circle: FC<CircleProps> = ({ title, position, onClick, isActive }) => (
  <Sheet>
    <SheetTrigger asChild>
      <button
        onClick={onClick}
        className={cn(
          "absolute w-24 h-24 rounded-full flex items-center justify-center",
          "transition-all duration-500 cursor-pointer",
          "bg-black/20 backdrop-blur-sm border border-white/10",
          "hover:scale-110 hover:bg-black/40 hover:border-white/20",
          "text-sm font-medium text-center p-2",
          isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background",
          position
        )}
      >
        {title}
      </button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
      </SheetHeader>
      <div className="mt-4">
        <p className="text-muted-foreground">Contenido relacionado con {title}</p>
      </div>
    </SheetContent>
  </Sheet>
);

export const MysticInterface = () => {
  const [activeCircle, setActiveCircle] = useState<string | null>(null);

  const circles = [
    { title: "Bienestar", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-32" },
    { title: "Deporte", position: "top-12 right-12 translate-x-8" },
    { title: "Finanzas", position: "top-48 right-0 translate-x-16" },
    { title: "Educación Financiera", position: "bottom-48 right-0 translate-x-16" },
    { title: "Crecimiento Personal", position: "bottom-12 right-12 translate-x-8" },
    { title: "Venta de Datos", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-32" },
    { title: "Recomendaciones", position: "bottom-12 left-12 -translate-x-8" },
    { title: "Suscripciones", position: "bottom-48 left-0 -translate-x-16" },
    { title: "Expansión", position: "top-48 left-0 -translate-x-16" },
  ];

  return (
    <div className="relative w-full h-[800px] flex items-center justify-center bg-gradient-to-b from-background to-background/50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.05),transparent_50%)]" />
      </div>

      {/* Connection lines */}
      <svg className="absolute w-full h-full pointer-events-none">
        <g className="opacity-20">
          {circles.map((_, index) => (
            <line
              key={index}
              x1="50%"
              y1="50%"
              x2={`${50 + Math.cos(index * (2 * Math.PI / 9)) * 40}%`}
              y2={`${50 + Math.sin(index * (2 * Math.PI / 9)) * 40}%`}
              stroke="currentColor"
              strokeWidth="1"
              className="animate-pulse"
            />
          ))}
        </g>
      </svg>

      {/* Central chat circle */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="relative z-10 w-96 h-96 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-xl border-white/10 cursor-pointer hover:scale-105 transition-transform">
            <div className="text-center p-8">
              <h2 className="text-xl font-semibold mb-4">SnipIT</h2>
              <p className="text-sm text-muted-foreground">
                Tu asistente personal inteligente
              </p>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chat con SnipIT</DialogTitle>
          </DialogHeader>
          <div className="h-[400px] overflow-y-auto p-4 border rounded-lg">
            {/* Aquí irá el contenido del chat */}
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                ¡Hola! Soy SnipIT, tu asistente personal. ¿En qué puedo ayudarte hoy?
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="flex-1 p-2 rounded-md border"
            />
            <Button>Enviar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Surrounding circles */}
      {circles.map((circle, index) => (
        <Circle
          key={index}
          title={circle.title}
          position={circle.position}
          onClick={() => setActiveCircle(circle.title)}
          isActive={activeCircle === circle.title}
        />
      ))}

      {/* Animated glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)] animate-pulse" />
      </div>
    </div>
  );
};