import { useState, useEffect } from 'react';
import { VehiclePlan } from './types.ts';
import { VEHICLE_PLANS } from './data/vehicleData.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { VehiclePlans } from './components/VehiclePlans.tsx';
import { RequirementsSection } from './components/RequirementsSection.tsx';
import { DepositNotice } from './components/DepositNotice.tsx';
import { ApplicationForm } from './components/ApplicationForm.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { CtaSection } from './components/CtaSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ChatBox } from './components/ChatBox.tsx';
import { AdminSubmissionsModal } from './components/AdminSubmissionsModal.tsx';

export default function App() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehiclePlan>(
    VEHICLE_PLANS[0]
  );
  const [applicationStep, setApplicationStep] = useState<number>(1);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navHeight = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleApplyClick = () => {
    scrollToSection('application-form');
  };

  const handleViewVehiclesClick = () => {
    scrollToSection('vehicle-plans');
  };

  const handleSelectVehicleFromCard = (plan: VehiclePlan) => {
    setSelectedVehicle(plan);
    setApplicationStep(1);
    scrollToSection('application-form');
  };

  // Secret Admin Access Hotkey (Alt+A or Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.altKey && e.key.toLowerCase() === 'a') ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')
      ) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-white text-[#191919] min-h-screen w-full flex flex-col antialiased selection:bg-[#501087] selection:text-white">
      {/* 1. Fluid Full-Width Navigation Bar */}
      <Navbar onApplyClick={handleApplyClick} />

      {/* 2. Main Responsive Content Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section */}
        <HeroSection
          onApplyClick={handleApplyClick}
          onViewVehiclesClick={handleViewVehiclesClick}
        />

        {/* How the Program Works (4-Step Process) */}
        <HowItWorks onExploreFleetClick={handleViewVehiclesClick} />

        {/* Vehicle Plans / Available Vehicles (4 Cards) */}
        <VehiclePlans onSelectVehicle={handleSelectVehicleFromCard} />

        {/* Requirements Section (Information & Documents) */}
        <RequirementsSection />

        {/* Important Payment Information (Deposit Notice) */}
        <DepositNotice />

        {/* Interactive Multi-Step Application Form */}
        <ApplicationForm
          selectedVehicle={selectedVehicle}
          onVehicleChange={(plan) => setSelectedVehicle(plan)}
          currentStep={applicationStep}
          setCurrentStep={(step) => setApplicationStep(step)}
        />

        {/* FAQ Accordion Section */}
        <FaqSection />

        {/* Final CTA Section */}
        <CtaSection onApplyClick={handleApplyClick} />
      </main>

      {/* 3. Institutional Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Program AI Chatbox (Floating & Mobile-Optimized) */}
      <ChatBox />

      {/* Admin Submissions & CSV Export Portal */}
      <AdminSubmissionsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
