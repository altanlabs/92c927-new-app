import { useState } from 'react';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

interface Message {
  content: string;
  isBot: boolean;
}

export const ChatOverlay = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { content: "¡Hola! Soy SnipIT. ¿En qué puedo ayudarte?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { content: input, isBot: false }]);
      setInput("");
      // Here you would integrate with your AI backend
    }
  };

  return (
    <div className="relative z-20">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16"
        >
          Chat
        </Button>
      ) : (
        <Card className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-black/40 backdrop-blur-xl border-white/10">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-3 border-b border-white/10">
              <h3 className="font-semibold">Chat con SnipIT</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                ✕
              </Button>
            </div>
            
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-2 rounded-lg text-sm ${
                        message.isBot
                          ? 'bg-primary/20 text-primary-foreground'
                          : 'bg-secondary/20 text-secondary-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="bg-background/50"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} size="sm">
                  →
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};