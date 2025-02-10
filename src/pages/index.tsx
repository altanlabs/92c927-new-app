import { MysticInterface } from "@/components/blocks/MysticInterface";
import { ChatOverlay } from "@/components/blocks/ChatOverlay";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.1),transparent_70%)]" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <MysticInterface />
        <ChatOverlay />
      </div>
    </div>
  );
}