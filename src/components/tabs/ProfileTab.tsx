import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

interface ProfileTabProps {
  setActiveTab: (tab: string) => void;
  serviceHistoryLength: number;
}

export const ProfileTab = ({ setActiveTab, serviceHistoryLength }: ProfileTabProps) => {
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

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icon name="Bell" className="text-primary" />
                  <div>
                    <p className="font-medium text-sm">Уведомления</p>
                    <p className="text-xs text-muted-foreground">Настроить</p>
                  </div>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
              </div>

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
