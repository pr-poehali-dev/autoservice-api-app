import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Icon from "@/components/ui/icon";
import { NotificationCard } from "@/components/NotificationCard";
import { notificationsApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
}

export const HomeTab = ({ setActiveTab }: HomeTabProps) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await notificationsApi.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить уведомления",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseNotification = async (id: number) => {
    try {
      await notificationsApi.deleteNotification(id);
      setNotifications(notifications.filter(n => n.id !== id));
      toast({
        title: "Успешно",
        description: "Уведомление удалено"
      });
    } catch (error) {
      console.error('Failed to delete notification:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить уведомление",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://cdn.poehali.dev/projects/667c058c-722f-4dbe-8e61-c0c9112f07e1/files/b4efff43-eeff-4b42-8b35-23cf763738ae.jpg"
          alt="Автосервис"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
          <img
            src="https://cdn.poehali.dev/files/6366661c-f712-4802-9b11-27e5626aca36.png"
            alt="HEVSR"
            className="h-10 w-auto"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-heading font-bold mb-2">HEVSR</h1>
          <p className="text-sm opacity-90">Профессиональный уход за вашим автомобилем</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {notifications.length > 0 && (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClose={handleCloseNotification}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setActiveTab("services")}
            className="h-24 flex flex-col gap-2 bg-primary hover:bg-primary/90 text-white"
          >
            <Icon name="Wrench" size={24} />
            <span className="font-medium">Услуги</span>
          </Button>
          <Button
            onClick={() => setActiveTab("booking")}
            className="h-24 flex flex-col gap-2 bg-secondary hover:bg-secondary/90 text-white"
          >
            <Icon name="Calendar" size={24} />
            <span className="font-medium">Записаться</span>
          </Button>
          <Button
            onClick={() => setActiveTab("history")}
            variant="outline"
            className="h-24 flex flex-col gap-2 border-2"
          >
            <Icon name="History" size={24} />
            <span className="font-medium">История</span>
          </Button>
          <Button
            onClick={() => setActiveTab("profile")}
            variant="outline"
            className="h-24 flex flex-col gap-2 border-2"
          >
            <Icon name="User" size={24} />
            <span className="font-medium">Профиль</span>
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-heading flex items-center gap-2">
              <Icon name="MapPin" className="text-secondary" size={20} />
              Контакты
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Icon name="Phone" className="text-primary mt-0.5" size={18} />
              <div>
                <p className="font-medium">+7 (999) 123-45-67</p>
                <p className="text-muted-foreground text-xs">Ежедневно 9:00 - 21:00</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="MapPin" className="text-primary mt-0.5" size={18} />
              <div>
                <p className="font-medium">ул. Автомобильная, 15</p>
                <p className="text-muted-foreground text-xs">Москва, Россия</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};