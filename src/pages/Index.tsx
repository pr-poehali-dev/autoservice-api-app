import { useState } from "react";
import { TabsContent } from "@/components/TabsContent";
import { ChatSheet } from "@/components/ChatSheet";
import { BottomNav } from "@/components/BottomNav";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        <TabsContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          services={services}
          serviceHistory={serviceHistory}
          masters={masters}
          date={date}
          setDate={setDate}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />

        <ChatSheet
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
          chatMessages={chatMessages}
        />

        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsChatOpen={setIsChatOpen}
        />
      </div>
    </div>
  );
};

export default Index;