import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import CostEstimator from './components/CostEstimator';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import OrderTrackerModal from './components/OrderTrackerModal';

export default function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(1);
  const [trackerModalOpen, setTrackerModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleOpenBooking = (serviceId = 1) => {
    setSelectedServiceId(serviceId);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      {/* Navigation Header */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        openBookingModal={handleOpenBooking}
        openTrackerModal={() => setTrackerModalOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        <HeroSection
          openBookingModal={handleOpenBooking}
          openTrackerModal={() => setTrackerModalOpen(true)}
        />

        <ServicesSection
          openBookingModal={handleOpenBooking}
        />

        <CostEstimator
          openBookingModal={handleOpenBooking}
        />

        <AboutSection />

        <TestimonialsSection />

        <FaqSection />

        <ContactSection />
      </main>

      {/* Floating Action Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer
        openBookingModal={handleOpenBooking}
        openTrackerModal={() => setTrackerModalOpen(true)}
      />

      {/* Booking Form Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialServiceId={selectedServiceId}
      />

      {/* Order Status Tracker Modal */}
      <OrderTrackerModal
        isOpen={trackerModalOpen}
        onClose={() => setTrackerModalOpen(false)}
      />
    </div>
  );
}
