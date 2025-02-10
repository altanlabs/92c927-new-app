import { ChatInterface } from "@/components/blocks/ChatInterface";
import { CircularMenu } from "@/components/blocks/CircularMenu";

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen relative py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">SnipIT</h1>
        <p className="text-muted-foreground">
          Tu asistente personal inteligente para análisis y recomendaciones personalizadas
        </p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Circular Menu alrededor del chat */}
        <CircularMenu />
        
        {/* Chat Interface en el centro */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] z-10">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}