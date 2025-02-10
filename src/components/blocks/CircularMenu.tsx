import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: string;
  title: string;
  radius: number;
  angleOffset: number;
  connections: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 'bienestar',
    title: 'Bienestar',
    radius: 220,
    angleOffset: 0,
    connections: ['deporte', 'crecimiento', 'finanzas']
  },
  {
    id: 'deporte',
    title: 'Deporte',
    radius: 220,
    angleOffset: 0.8,
    connections: ['bienestar', 'crecimiento', 'educacion']
  },
  {
    id: 'finanzas',
    title: 'Finanzas',
    radius: 220,
    angleOffset: 1.6,
    connections: ['educacion', 'datos', 'bienestar']
  },
  {
    id: 'educacion',
    title: 'Educación Financiera',
    radius: 220,
    angleOffset: 2.4,
    connections: ['finanzas', 'deporte', 'recomendaciones']
  },
  {
    id: 'crecimiento',
    title: 'Crecimiento Personal',
    radius: 220,
    angleOffset: 3.2,
    connections: ['bienestar', 'deporte', 'recomendaciones']
  },
  {
    id: 'datos',
    title: 'Venta de Datos',
    radius: 220,
    angleOffset: 4.0,
    connections: ['finanzas', 'suscripciones']
  },
  {
    id: 'recomendaciones',
    title: 'Recomendaciones',
    radius: 220,
    angleOffset: 4.8,
    connections: ['crecimiento', 'educacion', 'expansion']
  },
  {
    id: 'suscripciones',
    title: 'Suscripciones',
    radius: 220,
    angleOffset: 5.6,
    connections: ['datos', 'expansion']
  },
  {
    id: 'expansion',
    title: 'Expansión',
    radius: 220,
    angleOffset: 6.4,
    connections: ['recomendaciones', 'suscripciones']
  }
];

export const CircularMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePositions = () => {
      const newPositions: Record<string, { x: number; y: number }> = {};
      
      menuItems.forEach((item) => {
        const angle = item.angleOffset * Math.PI / 3.6;
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

        const midX = (sourcePos.x + targetPos.x) / 2;
        const midY = (sourcePos.y + targetPos.y) / 2;
        const curveOffset = 20;

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
        {/* Círculo exterior */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute left-1/2 top-1/2 w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2
                     rounded-full border border-primary/20 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(180deg, rgba(var(--primary), 0.03) 0%, rgba(var(--primary), 0.01) 100%)',
            boxShadow: '0 0 40px rgba(var(--primary), 0.1) inset'
          }}
        />

        {/* Círculo exterior decorativo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute left-1/2 top-1/2 w-[670px] h-[670px] -translate-x-1/2 -translate-y-1/2
                     rounded-full border border-primary/10"
        />

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
            className="absolute left-1/2 top-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2
                       rounded-full flex items-center justify-center cursor-pointer z-40"
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
              <div className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-sm 
                            border border-white/10 group-hover:border-primary/50 
                            transition-colors duration-300" />
              
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20
                            bg-gradient-to-r from-primary to-primary-foreground
                            transition-opacity duration-300" />
              
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