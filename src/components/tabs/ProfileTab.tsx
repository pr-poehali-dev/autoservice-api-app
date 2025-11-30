import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { notificationsApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ProfileTabProps {
  setActiveTab: (tab: string) => void;
  serviceHistoryLength: number;
}

export const ProfileTab = ({ setActiveTab, serviceHistoryLength }: ProfileTabProps) => {
  const [showNotificationsSettings, setShowNotificationsSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    readyNotifications: true,
    progressNotifications: true,
    reminderNotifications: false,
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: true
  });
  const { toast } = useToast();

  const handleSettingsChange = async (key: string, value: boolean) => {
    const updatedSettings = { ...notificationSettings, [key]: value };
    setNotificationSettings(updatedSettings);

    try {
      await notificationsApi.updateSettings(updatedSettings);
      toast({
        title: "Успешно",
        description: "Настройки уведомлений обновлены"
      });
    } catch (error) {
      console.error('Failed to update settings:', error);
      setNotificationSettings(notificationSettings);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="sticky top-0 bg-white border-b z-10 px-6 py-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActiveTab("home")}
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <h2 className="text-xl font-heading font-bold">Личный кабинет</h2>
      </div>

      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20 ring-4 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-2xl">
                  АП
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-heading font-bold text-xl">Александр Петров</h3>
                <p className="text-muted-foreground">alex@example.com</p>
                <Badge className="mt-2 bg-gradient-to-r from-primary to-secondary text-white">
                  VIP клиент
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icon name="Car" className="text-primary" />
                  <div>
                    <p className="font-medium text-sm">Мои автомобили</p>
                    <p className="text-xs text-muted-foreground">2 автомобиля</p>
                  </div>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icon name="History" className="text-primary" />
                  <div>
                    <p className="font-medium text-sm">История</p>
                    <p className="text-xs text-muted-foreground">{serviceHistoryLength} записей</p>
                  </div>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
              </div>

              <div 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                onClick={() => setShowNotificationsSettings(!showNotificationsSettings)}
              >
                <div className="flex items-center gap-3">
                  <Icon name="Bell" className="text-primary" />
                  <div>
                    <p className="font-medium text-sm">Уведомления о готовности</p>
                    <p className="text-xs text-muted-foreground">
                      {notificationSettings.readyNotifications ? "Включено" : "Выключено"}
                    </p>
                  </div>
                </div>
                <Icon 
                  name={showNotificationsSettings ? "ChevronDown" : "ChevronRight"} 
                  className="text-muted-foreground" 
                  size={20} 
                />
              </div>

              {showNotificationsSettings && (
                <Card className="border-2 border-primary/20 animate-accordion-down">
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label htmlFor="ready" className="font-medium">Авто готов к выдаче</Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Получать уведомления когда автомобиль готов
                          </p>
                        </div>
                        <Switch 
                          id="ready"
                          checked={notificationSettings.readyNotifications}
                          onCheckedChange={(checked) => handleSettingsChange('readyNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label htmlFor="progress" className="font-medium">Статус работ</Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Обновления о ходе выполнения работ
                          </p>
                        </div>
                        <Switch 
                          id="progress"
                          checked={notificationSettings.progressNotifications}
                          onCheckedChange={(checked) => handleSettingsChange('progressNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label htmlFor="reminder" className="font-medium">Напоминания</Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Напоминания о плановом ТО
                          </p>
                        </div>
                        <Switch 
                          id="reminder"
                          checked={notificationSettings.reminderNotifications}
                          onCheckedChange={(checked) => handleSettingsChange('reminderNotifications', checked)}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <p className="text-sm font-medium">Каналы доставки</p>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push" className="font-normal">
                          <Icon name="Smartphone" size={16} className="inline mr-2" />
                          Push-уведомления
                        </Label>
                        <Switch 
                          id="push"
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) => handleSettingsChange('pushNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms" className="font-normal">
                          <Icon name="MessageSquare" size={16} className="inline mr-2" />
                          SMS-уведомления
                        </Label>
                        <Switch 
                          id="sms"
                          checked={notificationSettings.smsNotifications}
                          onCheckedChange={(checked) => handleSettingsChange('smsNotifications', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="email" className="font-normal">
                          <Icon name="Mail" size={16} className="inline mr-2" />
                          Email-уведомления
                        </Label>
                        <Switch 
                          id="email"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => handleSettingsChange('emailNotifications', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icon name="Settings" className="text-primary" />
                  <div>
                    <p className="font-medium text-sm">Настройки</p>
                    <p className="text-xs text-muted-foreground">Персонализация</p>
                  </div>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2">
              <Icon name="Gift" className="text-primary" size={20} />
              Бонусная программа
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-4xl font-bold font-heading text-primary mb-2">350</div>
              <p className="text-sm text-muted-foreground">бонусных баллов</p>
              <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Использовать бонусы
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};