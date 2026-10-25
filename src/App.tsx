import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { StickyAddToCartBar } from './components/StickyAddToCartBar';
import { QuickOrderModal } from './components/QuickOrderModal';
import { FragranceQuizModal } from './components/FragranceQuizModal';
import { GoldenSparkTrail } from './components/GoldenSparkTrail';
import { RecentPurchaseToast } from './components/RecentPurchaseToast';
import { LuxuryPreloader } from './components/LuxuryPreloader';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentRoute, routeParams } = useApp();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailsPage slug={routeParams.slug || ''} />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmed':
        return <OrderConfirmationPage orderId={routeParams.orderId || ''} />;
      case 'track-order':
        return <OrderTrackingPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-royal-velvet texture-groove text-[#F3EFEA] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-white relative">
      {/* Fixed Ambient Royal Velvet & Warm Gold Flacon Lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#7A3EB0]/15 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#D4AF37]/8 blur-[130px] rounded-full" />
        <div className="absolute top-2/3 -left-20 w-[600px] h-[550px] bg-[#912666]/8 blur-[140px] rounded-full" />
      </div>

      {/* Luxury Initial Entrance Preloader */}
      <LuxuryPreloader />

      {/* Subtle Interactive Golden Sparkle Particle Trail */}
      <GoldenSparkTrail />

      {/* Top Header */}
      <Header />

      {/* Main Content View */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden pb-28 md:pb-0 relative z-0">
        {renderCurrentView()}
      </main>

      {/* Live Social Proof Recent Purchases Toast (Bottom-Left) */}
      <RecentPurchaseToast />

      {/* Floating Concierge WhatsApp */}
      <FloatingWhatsApp />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* 1-Click Quick Order Modal */}
      <QuickOrderModal />

      {/* Interactive Fragrance Quiz / Scent Finder Modal */}
      <FragranceQuizModal />

      {/* Quick Search Modal */}
      <SearchModal />

      {/* Mobile Sticky Add to Cart Bar */}
      <StickyAddToCartBar />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}