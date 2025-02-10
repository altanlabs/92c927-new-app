import { ChatInterface } from "@/components/blocks/ChatInterface";
import { TabsContainer } from "@/components/blocks/TabsContainer";

export default function Home() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">SnipIT</h1>
        <p className="text-muted-foreground">
          Tu asistente personal inteligente para análisis y recomendaciones personalizadas
        </p>
      </div>

      <div className="grid gap-8">
        <section>
          <ChatInterface />
        </section>

        <section>
          <TabsContainer />
        </section>
      </div>
    </div>
  );
}