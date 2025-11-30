import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Icon from "@/components/ui/icon";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface Service {
  id: number;
  name: string;
  price: string;
  time: string;
  icon: string;
  category: string;
}

interface ServicesBookingTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  services: Service[];
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
}

export const ServicesBookingTab = ({
  activeTab,
  setActiveTab,
  services,
  date,
  setDate,
  selectedService,
  setSelectedService,
}: ServicesBookingTabProps) => {
  return (
    <>
      {activeTab === "services" && (
        <div className="animate-fade-in">
          <div className="sticky top-0 bg-white border-b z-10 px-6 py-4 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("home")}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h2 className="text-xl font-heading font-bold">Услуги</h2>
          </div>

          <div className="p-6 space-y-4">
            {services.map((service) => (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] border-2 hover:border-primary/50"
                onClick={() => {
                  setSelectedService(service.name);
                  setActiveTab("booking");
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon as any} className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-base mb-1">{service.name}</h3>
                      <Badge variant="secondary" className="text-xs mb-2">{service.category}</Badge>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="Clock" size={14} />
                          <span>{service.time}</span>
                        </div>
                        <span className="font-bold text-primary">{service.price}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "booking" && (
        <div className="animate-fade-in">
          <div className="sticky top-0 bg-white border-b z-10 px-6 py-4 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("services")}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h2 className="text-xl font-heading font-bold">Запись на обслуживание</h2>
          </div>

          <div className="p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Детали записи</CardTitle>
                <CardDescription>Заполните форму для записи</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Услуга</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name} - {service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Дата</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Icon name="Calendar" className="mr-2" size={16} />
                        {date ? format(date, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={ru}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Время</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="12:00">12:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="car">Марка и модель автомобиля</Label>
                  <Input id="car" placeholder="Например: Toyota Camry" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Комментарий</Label>
                  <Textarea id="notes" placeholder="Опишите проблему или пожелания" rows={3} />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-medium">
                  Записаться
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};
