import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Notification {
  id: number;
  type: "ready" | "in_progress" | "reminder";
  title: string;
  message: string;
  time: string;
  carModel?: string;
}

interface NotificationCardProps {
  notification: Notification;
  onClose: (id: number) => void;
}

export const NotificationCard = ({ notification, onClose }: NotificationCardProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case "ready":
        return <Icon name="CheckCircle2" className="text-green-500" size={24} />;
      case "in_progress":
        return <Icon name="Wrench" className="text-primary" size={24} />;
      case "reminder":
        return <Icon name="Clock" className="text-secondary" size={24} />;
    }
  };

  const getBadgeColor = () => {
    switch (notification.type) {
      case "ready":
        return "bg-green-500 text-white";
      case "in_progress":
        return "bg-primary text-white";
      case "reminder":
        return "bg-secondary text-white";
    }
  };

  const getBadgeText = () => {
    switch (notification.type) {
      case "ready":
        return "Готов к выдаче";
      case "in_progress":
        return "В работе";
      case "reminder":
        return "Напоминание";
    }
  };

  return (
    <Card className="border-2 hover:border-primary/50 transition-all animate-scale-in">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h4 className="font-heading font-semibold text-base mb-1">{notification.title}</h4>
                <Badge className={getBadgeColor()}>{getBadgeText()}</Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 -mt-1 -mr-1"
                onClick={() => onClose(notification.id)}
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
            {notification.carModel && (
              <p className="text-sm text-muted-foreground mb-2">
                <Icon name="Car" size={14} className="inline mr-1" />
                {notification.carModel}
              </p>
            )}
            <p className="text-sm mb-2">{notification.message}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{notification.time}</span>
              {notification.type === "ready" && (
                <Button size="sm" className="h-7 text-xs bg-green-500 hover:bg-green-600">
                  Подробнее
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
