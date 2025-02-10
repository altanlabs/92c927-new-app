import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: string;
  title: string;
  size: 'large' | 'medium' | 'small';
  connections: string[];
  radius: number;
  angleOffset: number;
}

const menuItems: MenuItem[] = [
  {
    id: 'bienestar',
    title: 'Bienestar',
    size: 'large',
    connections: ['deporte', 'crecimiento', 'finanzas'],
    radius: 200,
    angleOffset: 0
  },
  {
    id: 'deporte',
    title: 'Deporte',
    size: 'medium',
    connections: ['bienestar', 'crecimiento', 'educacion'],
    radius: 280,
    angleOffset: 0.5
  },
  {
    id: 'finanzas',
    title: 'Finanzas',
    size: 'large',
    connections: ['educacion', 'datos', 'bienestar'],
    radius: 200,
    angleOffset: 2
  },
  {
    id: 'educacion',
    title: 'Educación Financiera',
    size: 'medium',
    connections: ['finanzas', 'deporte', 'recomendaciones'],
    radius: 280,
    angleOffset: 2.5
  },
  {
    id: 'crecimiento',
    title: 'Crecimiento Personal',
    size: 'large',
    connections: ['bienestar', 'deporte', 'recomendaciones'],
    radius: 200,
    angleOffset: 4
  },
  {
    id: 'datos',
    title: 'Venta de Datos',
    size: 'small',
    connections: ['finanzas', 'suscripciones'],
    radius: 320,
    angleOffset: 3
  },
  {
    id: 'recomendaciones',
    title: 'Recomendaciones',
    size: 'medium',
    connections: ['crecimiento', 'educacion', 'expansion'],
    radius: 280,
    angleOffset: 4.5
  },
  {
    id: 'suscripciones',
    title: 'Suscripciones',
    size: 'small',
    connections: ['datos', 'expansion'],
    radius: 320,
    angleOffset: 5
  },
  {
    id: 'expansion',
    title: 'Expansión',
    size: 'small',
    connections: ['recomendaciones', 'suscripciones'],
    radius: 320,
    angleOffset: 5.5
  }
];

const getCircleSize = (size: MenuItem['size']) => {
  switch (size) {
    case 'large': return 'w-32 h-32';
    case 'medium': return 'w-24 h-24';
    case 'small': return 'w-20 h-20';
  }
};

export const CircularMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePositions = () => {
      const newPositions: Record<string, { x: number; y: number }> = {};
      
      menuItems.forEach((item) => {
        const angle = item.angleOffset * Math.PI;
        newPositions[item.id] = {
          x: Math.cos(angle) * item.radius,
          y: Math.sin(angle) * item.radius
        };
      });
      
      setPositions(newPositions);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  const renderConnections = () => {
    return menuItems.map((item) => (
      item.connections.map((targetId) => {
        const sourcePos = positions[item.id];
        const targetPos = positions[targetId];
        if (!sourcePos || !targetPos) return null;

        // Calcular el punto medio para la curva
        const midX = (sourcePos.x + targetPos.x) / 2;
        const midY = (sourcePos.y + targetPos.y) / 2;
        // Añadir un desplazamiento para crear una curva
        const curveOffset = 30;

        return (
          <motion.path
            key={`${item.id}-${targetId}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.15 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={`M ${sourcePos.x} ${sourcePos.y} 
                Q ${midX + curveOffset} ${midY + curveOffset} ${targetPos.x} ${targetPos.y}`}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-primary"
          />
        );
      })
    ));
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black overflow-hidden" ref={containerRef}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8),transparent_100%)]" />
      </div>

      {/* Contenedor del diagrama cabalístico */}
      <div className="relative w-[800px] h-[800px]">
        {/* Conexiones SVG */}
        <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translate(50%, 50%)' }}>
          <g className="opacity-20">{renderConnections()}</g>
        </svg>

        {/* Círculo central */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 
                     bg-black/40 rounded-full backdrop-blur-xl border border-white/10 
                     flex items-center justify-center cursor-pointer z-50"
          whileHover={{ scale: 1.05 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              SnipIT
            </h2>
            <p className="text-sm text-white/60">AI Assistant</p>
          </div>
        </motion.div>

        {/* Círculos orbitales */}
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            className={`absolute left-1/2 top-1/2 ${getCircleSize(item.size)} -translate-x-1/2 -translate-y-1/2
                       rounded-full flex items-center justify-center cursor-pointer z-40`}
            initial={{ scale: 0, x: positions[item.id]?.x ?? 0, y: positions[item.id]?.y ?? 0 }}
            animate={{
              scale: 1,
              x: positions[item.id]?.x ?? 0,
              y: positions[item.id]?.y ?? 0,
            }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setActiveItem(item.id)}
          >
            <div className="w-full h-full relative group">
              {/* Círculo de fondo con efecto de cristal */}
              <div className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-sm 
                            border border-white/10 group-hover:border-primary/50 
                            transition-colors duration-300" />
              
              {/* Brillo interior */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20
                            bg-gradient-to-r from-primary to-primary-foreground
                            transition-opacity duration-300" />
              
              {/* Contenido del círculo */}
              <div className="relative h-full flex items-center justify-center p-2">
                <span className="text-sm font-medium text-center text-white/90 group-hover:text-white
                               transition-colors duration-300">
                  {item.title}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Panel de contenido */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       w-96 h-96 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">
                {menuItems.find(item => item.id === activeItem)?.title}
              </h3>
              <div className="text-white/60">
                Contenido de {menuItems.find(item => item.id === activeItem)?.title}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};