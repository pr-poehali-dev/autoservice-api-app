import { HomeTab } from "@/components/tabs/HomeTab";
import { ServicesBookingTab } from "@/components/tabs/ServicesBookingTab";
import { HistoryMastersTab } from "@/components/tabs/HistoryMastersTab";
import { ProfileTab } from "@/components/tabs/ProfileTab";

interface Service {
  id: number;
  name: string;
  price: string;
  time: string;
  icon: string;
  category: string;
}

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

interface TabsContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  services: Service[];
  serviceHistory: ServiceHistoryItem[];
  masters: Master[];
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
}

export const TabsContent = ({
  activeTab,
  setActiveTab,
  services,
  serviceHistory,
  masters,
  date,
  setDate,
  selectedService,
  setSelectedService,
}: TabsContentProps) => {
  return (
    <>
      {activeTab === "home" && (
        <HomeTab setActiveTab={setActiveTab} masters={masters} />
      )}

      {(activeTab === "services" || activeTab === "booking") && (
        <ServicesBookingTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          services={services}
          date={date}
          setDate={setDate}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      )}

      {(activeTab === "history" || activeTab === "masters") && (
        <HistoryMastersTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          serviceHistory={serviceHistory}
          masters={masters}
        />
      )}

      {activeTab === "profile" && (
        <ProfileTab
          setActiveTab={setActiveTab}
          serviceHistoryLength={serviceHistory.length}
        />
      )}
    </>
  );
};
