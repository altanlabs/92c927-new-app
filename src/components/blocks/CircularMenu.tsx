import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: string;
  title: string;
  radius: number;
  angleOffset: number;
  connections: string[];
  group: 'personal' | 'financial' | 'services';
}

const menuItems: MenuItem[] = [
  // Grupo Personal (Superior)
  {
    id: 'bienestar',
    title: 'Bienestar',
    radius: 220,
    angleOffset: 0.2, // Arriba-izquierda
    connections: ['deporte', 'crecimiento'],
    group: 'personal'
  },
  {
    id: 'deporte',
    title: 'Deporte',
    radius: 220,
    angleOffset: 1, // Arriba-centro
    connections: ['bienestar', 'crecimiento'],
    group: 'personal'
  },
  {
    id: 'crecimiento',
    title: 'Crecimiento Personal',
    radius: 220,
    angleOffset: 1.8, // Arriba-derecha
    connections: ['bienestar', 'deporte', 'recomendaciones'],
    group: 'personal'
  },

  // Grupo Financiero (Derecha)
  {
    id: 'finanzas',
    title: 'Finanzas',
    radius: 220,
    angleOffset: 2.6, // Derecha-superior
    connections: ['educacion', 'datos'],
    group: 'financial'
  },
  {
    id: 'educacion',
    title: 'Educación Financiera',
    radius: 220,
    angleOffset: 3.4, // Derecha-inferior
    connections: ['finanzas', 'recomendaciones'],
    group: 'financial'
  },

  // Grupo Servicios (Inferior)
  {
    id: 'datos',
    title: 'Venta de Datos',
    radius: 220,
    angleOffset: 4.2, // Abajo-derecha
    connections: ['finanzas', 'suscripciones'],
    group: 'services'
  },
  {
    id: 'suscripciones',
    title: 'Suscripciones',
    radius: 220,
    angleOffset: 5, // Abajo-centro
    connections: ['datos', 'expansion'],
    group: 'services'
  },
  {
    id: 'recomendaciones',
    title: 'Recomendaciones',
    radius: 220,
    angleOffset: 5.8, // Izquierda-inferior
    connections: ['crecimiento', 'educacion'],
    group: 'services'
  },
  {
    id: 'expansion',
    title: 'Expansión',
    radius: 220,
    angleOffset: 6.6, // Izquierda-superior
    connections: ['recomendaciones', 'suscripciones'],
    group: 'services'
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

  const getGroupColor = (group: MenuItem['group']) => {
    switch (group) {
      case 'personal':
        return 'from-blue-200 to-purple-200';
      case 'financial':
        return 'from-green-200 to-emerald-200';
      case 'services':
        return 'from-orange-200 to-amber-200';
      default:
        return 'from-blue-200 to-blue-300';
    }
  };

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
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={`M ${sourcePos.x} ${sourcePos.y} 
                Q ${midX + curveOffset} ${midY + curveOffset} ${targetPos.x} ${targetPos.y}`}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="0.5"
            fill="none"
          />
        );
      })
    ));
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden" ref={containerRef}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,197,253,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
      </div>

      {/* Contenedor del diagrama cabalístico */}
      <div className="relative w-[800px] h-[800px] flex items-center justify-center">
        {/* Círculo exterior */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute w-[650px] h-[650px] rounded-full border border-blue-200/30 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(180deg, rgba(147,197,253,0.05) 0%, rgba(147,197,253,0.02) 100%)',
            boxShadow: '0 0 40px rgba(147,197,253,0.1) inset'
          }}
        />

        {/* Círculo exterior decorativo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute w-[670px] h-[670px] rounded-full border border-blue-200/20"
        />

        {/* Conexiones SVG */}
        <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translate(50%, 50%)' }}>
          <g className="opacity-30">{renderConnections()}</g>
        </svg>

        {/* Círculo central */}
        <motion.div
          className="absolute w-40 h-40 bg-white/10 rounded-full backdrop-blur-xl 
                     border border-blue-200/20 flex items-center justify-center 
                     cursor-pointer z-50"
          whileHover={{ scale: 1.05 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-700">
              SnipIT
            </h2>
            <p className="text-sm text-slate-500">AI Assistant</p>
          </div>
        </motion.div>

        {/* Círculos orbitales */}
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            className="absolute w-28 h-28 rounded-full flex items-center justify-center cursor-pointer z-40"
            style={{
              left: `calc(50% + ${positions[item.id]?.x ?? 0}px)`,
              top: `calc(50% + ${positions[item.id]?.y ?? 0}px)`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setActiveItem(item.id)}
          >
            <div className="w-full h-full relative group">
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm 
                            border border-blue-200/20 group-hover:border-blue-300/50 
                            transition-colors duration-300" />
              
              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20
                            bg-gradient-to-r ${getGroupColor(item.group)}
                            transition-opacity duration-300`} />
              
              <div className="relative h-full flex items-center justify-center p-2">
                <span className="text-sm font-medium text-center text-slate-600 group-hover:text-slate-800
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
                       w-96 h-96 bg-white/20 backdrop-blur-xl rounded-2xl border border-blue-200/20 p-6"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
              <h3 className="text-xl font-bold text-slate-700 mb-4">
                {menuItems.find(item => item.id === activeItem)?.title}
              </h3>
              <div className="text-slate-600">
                Contenido de {menuItems.find(item => item.id === activeItem)?.title}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};