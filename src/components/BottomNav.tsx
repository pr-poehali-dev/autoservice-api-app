import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsChatOpen: (open: boolean) => void;
}

export const BottomNav = ({ activeTab, setActiveTab, setIsChatOpen }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t shadow-lg">
      <div className="flex items-center justify-around p-2">
        <Button
          variant={activeTab === "home" ? "default" : "ghost"}
          size="sm"
          className="flex-1 flex flex-col gap-1 h-auto py-2"
          onClick={() => setActiveTab("home")}
        >
          <Icon name="Home" size={20} />
          <span className="text-xs">Главная</span>
        </Button>
        <Button
          variant={activeTab === "services" ? "default" : "ghost"}
          size="sm"
          className="flex-1 flex flex-col gap-1 h-auto py-2"
          onClick={() => setActiveTab("services")}
        >
          <Icon name="Wrench" size={20} />
          <span className="text-xs">Услуги</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 flex flex-col gap-1 h-auto py-2 relative"
          onClick={() => setIsChatOpen(true)}
        >
          <div className="relative">
            <Icon name="MessageCircle" size={20} />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          </div>
          <span className="text-xs">Чат</span>
        </Button>
        <Button
          variant={activeTab === "history" ? "default" : "ghost"}
          size="sm"
          className="flex-1 flex flex-col gap-1 h-auto py-2"
          onClick={() => setActiveTab("history")}
        >
          <Icon name="History" size={20} />
          <span className="text-xs">История</span>
        </Button>
        <Button
          variant={activeTab === "profile" ? "default" : "ghost"}
          size="sm"
          className="flex-1 flex flex-col gap-1 h-auto py-2"
          onClick={() => setActiveTab("profile")}
        >
          <Icon name="User" size={20} />
          <span className="text-xs">Профиль</span>
        </Button>
      </div>
    </div>
  );
};
