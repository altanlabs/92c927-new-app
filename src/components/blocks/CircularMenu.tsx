import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: string;
  title: string;
  icon?: string;
}

const menuItems: MenuItem[] = [
  { id: 'bienestar', title: 'Bienestar' },
  { id: 'deporte', title: 'Deporte' },
  { id: 'finanzas', title: 'Finanzas' },
  { id: 'educacion', title: 'Educación Financiera' },
  { id: 'crecimiento', title: 'Crecimiento Personal' },
  { id: 'datos', title: 'Venta de Datos' },
  { id: 'recomendaciones', title: 'Recomendaciones' },
  { id: 'suscripciones', title: 'Suscripciones' },
  { id: 'expansion', title: 'Expansión' },
];

export const CircularMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const totalItems = menuItems.length;
  const radius = 250; // Radio del círculo

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Efecto de brillo central */}
      <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      
      {/* Círculo central */}
      <motion.div
        className="relative z-20 w-48 h-48 bg-black/40 rounded-full backdrop-blur-xl border border-white/10 flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <div className="text-center">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            SnipIT
          </h2>
          <p className="text-sm text-white/60">AI Assistant</p>
        </div>
      </motion.div>

      {/* Círculos orbitales */}
      {menuItems.map((item, index) => {
        const angle = (index * 2 * Math.PI) / totalItems;
        const x = Math.cos(angle - Math.PI / 2) * radius;
        const y = Math.sin(angle - Math.PI / 2) * radius;

        return (
          <motion.div
            key={item.id}
            className="absolute z-10 w-24 h-24 rounded-full flex items-center justify-center cursor-pointer"
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: 1,
              x,
              y,
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setActiveItem(item.id)}
          >
            <div className="w-full h-full relative">
              {/* Círculo de fondo con efecto de cristal */}
              <div className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-sm border border-white/10" />
              
              {/* Contenido del círculo */}
              <div className="relative h-full flex items-center justify-center p-2">
                <span className="text-sm font-medium text-center text-white/90">
                  {item.title}
                </span>
              </div>

              {/* Línea conectora */}
              <div
                className="absolute left-1/2 top-1/2 w-px h-px"
                style={{
                  background: `linear-gradient(to center, transparent, rgba(var(--primary), 0.5))`,
                  transform: `rotate(${angle}rad)`,
                  transformOrigin: '0 0',
                  width: `${radius}px`,
                  height: '1px',
                  opacity: 0.2,
                }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Panel de contenido */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
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
  );
};