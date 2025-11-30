import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { NotificationCard } from "@/components/NotificationCard";

interface Master {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  specialty: string;
  avatar: string;
}

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
  masters: Master[];
}

export const HomeTab = ({ setActiveTab, masters }: HomeTabProps) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "ready" as const,
      title: "Ваш автомобиль готов!",
      message: "Замена масла и фильтров завершена. Автомобиль готов к выдаче.",
      time: "10 минут назад",
      carModel: "Toyota Camry"
    },
    {
      id: 2,
      type: "in_progress" as const,
      title: "Работы в процессе",
      message: "Диагностика двигателя в работе. Ожидаемое время готовности: 2 часа.",
      time: "1 час назад",
      carModel: "Honda Accord"
    }
  ]);

  const handleCloseNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
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
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-heading font-bold mb-2">АвтоМастер</h1>
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

        <Card className="border-2 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading flex items-center gap-2">
              <Icon name="Star" className="text-primary" size={20} />
              Наши мастера
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {masters.slice(0, 2).map((master) => (
                <div key={master.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src={master.avatar} />
                    <AvatarFallback className="bg-primary text-white font-medium">
                      {master.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{master.name}</h4>
                    <p className="text-xs text-muted-foreground">{master.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={12} />
                      <span className="text-xs font-medium">{master.rating}</span>
                      <span className="text-xs text-muted-foreground">({master.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="link"
              className="w-full mt-2 text-primary"
              onClick={() => setActiveTab("masters")}
            >
              Все мастера →
            </Button>
          </CardContent>
        </Card>

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