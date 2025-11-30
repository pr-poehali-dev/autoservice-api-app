import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

interface ServiceHistoryItem {
  id: number;
  date: string;
  service: string;
  master: string;
  rating: number;
  cost: string;
}

interface Master {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  specialty: string;
  avatar: string;
}

interface HistoryMastersTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  serviceHistory: ServiceHistoryItem[];
  masters: Master[];
}

export const HistoryMastersTab = ({
  activeTab,
  setActiveTab,
  serviceHistory,
  masters,
}: HistoryMastersTabProps) => {
  return (
    <>
      {activeTab === "history" && (
        <div className="animate-fade-in">
          <div className="sticky top-0 bg-white border-b z-10 px-6 py-4 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("home")}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h2 className="text-xl font-heading font-bold">История обслуживаний</h2>
          </div>

          <div className="p-6 space-y-4">
            {serviceHistory.map((record) => (
              <Card key={record.id} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-base">{record.service}</h3>
                      <p className="text-sm text-muted-foreground">{record.date}</p>
                    </div>
                    <Badge className="bg-green-500 text-white">Выполнено</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span>{record.master}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < record.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-primary">{record.cost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "masters" && (
        <div className="animate-fade-in">
          <div className="sticky top-0 bg-white border-b z-10 px-6 py-4 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("home")}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h2 className="text-xl font-heading font-bold">Наши мастера</h2>
          </div>

          <div className="p-6 space-y-4">
            {masters.map((master) => (
              <Card key={master.id} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                      <AvatarImage src={master.avatar} />
                      <AvatarFallback className="bg-primary text-white font-medium text-lg">
                        {master.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg mb-1">{master.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{master.specialty}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" className="text-yellow-500 fill-yellow-500" size={16} />
                          <span className="font-bold">{master.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({master.reviews} отзывов)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Icon name="Calendar" size={14} className="mr-1" />
                          Записаться
                        </Button>
                        <Button size="sm" variant="outline">
                          <Icon name="Star" size={14} className="mr-1" />
                          Отзывы
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
