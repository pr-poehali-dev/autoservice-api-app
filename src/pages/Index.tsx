import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [date, setDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const services = [
    { id: 1, name: "Замена масла", price: "от 2500₽", time: "30 мин", icon: "Droplet", category: "Техобслуживание" },
    { id: 2, name: "Диагностика двигателя", price: "от 1500₽", time: "45 мин", icon: "Search", category: "Диагностика" },
    { id: 3, name: "Замена тормозных колодок", price: "от 3500₽", time: "1 час", icon: "Disc", category: "Тормозная система" },
    { id: 4, name: "Развал-схождение", price: "от 2000₽", time: "1 час", icon: "Circle", category: "Ходовая часть" },
    { id: 5, name: "Замена шин", price: "от 1000₽", time: "30 мин", icon: "CircleDot", category: "Шиномонтаж" },
    { id: 6, name: "Кондиционер", price: "от 4000₽", time: "1.5 часа", icon: "Wind", category: "Климат" },
  ];

  const serviceHistory = [
    { id: 1, date: "15.11.2025", service: "Замена масла", master: "Иван Петров", rating: 5, cost: "2500₽" },
    { id: 2, date: "03.10.2025", service: "Диагностика", master: "Сергей Иванов", rating: 5, cost: "1500₽" },
    { id: 3, date: "20.09.2025", service: "Тормозные колодки", master: "Иван Петров", rating: 4, cost: "3800₽" },
  ];

  const masters = [
    { id: 1, name: "Иван Петров", rating: 4.9, reviews: 127, specialty: "Двигатель, трансмиссия", avatar: "https://cdn.poehali.dev/projects/667c058c-722f-4dbe-8e61-c0c9112f07e1/files/d102fd7a-857b-4bef-9b4e-e0b4326bf113.jpg" },
    { id: 2, name: "Сергей Иванов", rating: 4.8, reviews: 98, specialty: "Электрика, диагностика", avatar: "" },
    { id: 3, name: "Алексей Смирнов", rating: 5.0, reviews: 156, specialty: "Ходовая часть, тормоза", avatar: "" },
  ];

  const chatMessages = [
    { id: 1, sender: "master", text: "Здравствуйте! Чем могу помочь?", time: "14:30" },
    { id: 2, sender: "user", text: "Здравствуйте, когда можно записаться на замену масла?", time: "14:32" },
    { id: 3, sender: "master", text: "У нас есть свободные окна завтра в 10:00 и 15:00. Что вам удобнее?", time: "14:33" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {activeTab === "home" && (
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
        )}

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

        {activeTab === "profile" && (
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
                          <p className="text-xs text-muted-foreground">{serviceHistory.length} записей</p>
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
        )}

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
      </div>
    </div>
  );
};

export default Index;
