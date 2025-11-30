import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";

interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
}

interface ChatSheetProps {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
}

export const ChatSheet = ({ isChatOpen, setIsChatOpen, chatMessages }: ChatSheetProps) => {
  return (
    <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
      <SheetContent side="bottom" className="h-[80vh] p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle className="font-heading">Чат с мастером</SheetTitle>
          <SheetDescription>Иван Петров - Специалист по двигателям</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100%-5rem)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4 flex gap-2">
            <Input placeholder="Введите сообщение..." className="flex-1" />
            <Button size="icon" className="bg-primary hover:bg-primary/90">
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
