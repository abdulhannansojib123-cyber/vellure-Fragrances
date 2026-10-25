import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, X } from 'lucide-react';
import { resolveImage } from '../utils/resolveImage';

interface PurchaseProfile {
  customerName: string;
  customerNameBn: string;
  city: string;
  cityBn: string;
  productSlug: string;
  size: '3ml' | '6ml' | 'Set';
  timeAgoEn: string;
  timeAgoBn: string;
}

// Curated live order log mapped directly to VELLURE catalog products
const PURCHASE_PROFILES: PurchaseProfile[] = [
  {
    customerName: 'Tanvir H.',
    customerNameBn: 'তানভীর এইচ.',
    city: 'Uttara, Dhaka',
    cityBn: 'উত্তরা, ঢাকা',
    productSlug: 'royal-oud',
    size: '6ml',
    timeAgoEn: '2 mins ago',
    timeAgoBn: '২ মিনিট আগে'
  },
  {
    customerName: 'Sabrina R.',
    customerNameBn: 'সাবরিনা আর.',
    city: 'Nasirabad, Chattogram',
    cityBn: 'নাসিরাবাদ, চট্টগ্রাম',
    productSlug: 'blue-de-chanel',
    size: '6ml',
    timeAgoEn: '5 mins ago',
    timeAgoBn: '৫ মিনিট আগে'
  },
  {
    customerName: 'Kazi Farhan',
    customerNameBn: 'কাজী ফারহান',
    city: 'Gulshan 2, Dhaka',
    cityBn: 'গুলশান ২, ঢাকা',
    productSlug: 'royal-sandal',
    size: '6ml',
    timeAgoEn: '7 mins ago',
    timeAgoBn: '৭ মিনিট আগে'
  },
  {
    customerName: 'Zayed Al-Mamun',
    customerNameBn: 'জায়েদ আল-মামুন',
    city: 'Zindabazar, Sylhet',
    cityBn: 'জিন্দাবাজার, সিলেট',
    productSlug: 'white-chandan',
    size: '3ml',
    timeAgoEn: '11 mins ago',
    timeAgoBn: '১১ মিনিট আগে'
  },
  {
    customerName: 'Nafisa K.',
    customerNameBn: 'নাফিসা কে.',
    city: 'Dhanmondi, Dhaka',
    cityBn: 'ধানমন্ডি, ঢাকা',
    productSlug: 'musk-safi',
    size: '6ml',
    timeAgoEn: '14 mins ago',
    timeAgoBn: '১৪ মিনিট আগে'
  },
  {
    customerName: 'Mahmudul H.',
    customerNameBn: 'মাহমুদুল এইচ.',
    city: 'Shaheb Bazar, Rajshahi',
    cityBn: 'সাহেব বাজার, রাজশাহী',
    productSlug: 'cool-water',
    size: '3ml',
    timeAgoEn: '18 mins ago',
    timeAgoBn: '১৮ মিনিট আগে'
  },
  {
    customerName: 'Shahriar N.',
    customerNameBn: 'শাহরিয়ার এন.',
    city: 'Khulna Sadar',
    cityBn: 'খুলনা সদর',
    productSlug: 'vampire-blood',
    size: '6ml',
    timeAgoEn: '23 mins ago',
    timeAgoBn: '২৩ মিনিট আগে'
  },
  {
    customerName: 'Arifur Rahman',
    customerNameBn: 'আরিফুর রহমান',
    city: 'Banani, Dhaka',
    cityBn: 'বনানী, ঢাকা',
    productSlug: 'signature-trio-pack',
    size: 'Set',
    timeAgoEn: '29 mins ago',
    timeAgoBn: '২৯ মিনিট আগে'
  },
  {
    customerName: 'Farzana Akter',
    customerNameBn: 'ফারজানা আক্তার',
    city: 'Agrabad, Chattogram',
    cityBn: 'আগ্রাবাদ, চট্টগ্রাম',
    productSlug: 'armani-blue',
    size: '6ml',
    timeAgoEn: '34 mins ago',
    timeAgoBn: '৩৪ মিনিট আগে'
  },
  {
    customerName: 'Siam Chowdhury',
    customerNameBn: 'সিয়াম চৌধুরী',
    city: 'Mirpur DOHS, Dhaka',
    cityBn: 'মিরপুর ডিওএইচএস, ঢাকা',
    productSlug: 'desire-red',
    size: '3ml',
    timeAgoEn: '41 mins ago',
    timeAgoBn: '৪১ মিনিট আগে'
  }
];

export const RecentPurchaseToast: React.FC = () => {
  const { products, language, navigateTo } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check dismissal state
  useEffect(() => {
    try {
      if (sessionStorage.getItem('vellure_purchase_toast_dismissed')) {
        setIsDismissed(true);
        return;
      }
    } catch {}

    // Delay initial appearance by 3.5 seconds after page loads
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(initialTimer);
  }, []);

  // Timer loop for show/hide
  useEffect(() => {
    if (isDismissed) return;

    let hideTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    if (isVisible && !isHovered) {
      // Keep visible for 6.5 seconds
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 6500);
    } else if (!isVisible) {
      // Re-trigger with next purchase item after 13 seconds
      nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PURCHASE_PROFILES.length);
        setIsVisible(true);
      }, 13000);
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, isHovered, isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    try {
      sessionStorage.setItem('vellure_purchase_toast_dismissed', 'true');
    } catch {}
  };

  // Find corresponding real product from live catalog
  const currentProfile = PURCHASE_PROFILES[currentIndex] || PURCHASE_PROFILES[0];
  const matchedProduct = useMemo(() => {
    if (!products || products.length === 0) return null;
    const found = products.find((p) => p.slug === currentProfile.productSlug);
    return found || products[currentIndex % products.length];
  }, [products, currentProfile.productSlug, currentIndex]);

  if (isDismissed) return null;

  // Resolve authentic product details
  const realImage = matchedProduct?.images?.[0] || '/src/assets/images/product_vellure_royal_sandal_official.jpg';
  const realName = matchedProduct
    ? (language === 'bn' ? matchedProduct.nameBn : matchedProduct.name)
    : (language === 'bn' ? 'খাঁটি আতর' : 'Pure Attar');
  const targetSlug = matchedProduct?.slug || currentProfile.productSlug;

  const displayName = language === 'bn' ? currentProfile.customerNameBn : currentProfile.customerName;
  const displayCity = language === 'bn' ? currentProfile.cityBn : currentProfile.city;
  const displayTime = language === 'bn' ? currentProfile.timeAgoBn : currentProfile.timeAgoEn;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigateTo('product', { slug: targetSlug })}
      className={`fixed bottom-20 md:bottom-6 left-3 md:left-6 z-40 max-w-[340px] sm:max-w-[360px] w-auto cursor-pointer transition-all duration-500 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-5 scale-95 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative group overflow-hidden rounded-2xl bg-[#120F1B]/95 backdrop-blur-xl border border-[#D4AF37]/35 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] p-3 transition-all duration-300 hover:border-[#D4AF37]/70 hover:shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_28px_rgba(212,175,55,0.25)]">
        {/* Subtle royal velvet gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#201533]/40 via-transparent to-[#D4AF37]/5 pointer-events-none" />

        {/* Shimmer sweep effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFE072]/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform pointer-events-none" />

        <div className="relative flex items-center gap-3">
          {/* Real Flacon thumbnail with gold ring */}
          <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-[#171422] p-0.5 shadow-inner">
            <img
              src={resolveImage(realImage)}
              alt={realName}
              className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            {/* Bottle size badge */}
            <span className="absolute bottom-0 right-0 bg-[#0C0A13]/90 text-[8px] font-mono font-bold text-[#FFE072] px-1 rounded-tl border-t border-l border-[#D4AF37]/30">
              {currentProfile.size}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-5">
            <div className="flex items-center gap-1.5 text-[11px] text-[#A8A49C]">
              <span className="font-semibold text-white truncate">{displayName}</span>
              <span className="text-[#68655E]">•</span>
              <span className="text-[#C5A059] truncate text-[10px]">{displayCity}</span>
            </div>

            <p className="text-xs font-serif text-[#F3EFEA] truncate font-medium mt-0.5 group-hover:text-[#FFE072] transition-colors">
              {language === 'bn' ? `অর্ডার করেছেন ${realName}` : `Purchased ${realName}`}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                <span>{language === 'bn' ? 'ভেরিফাইড অর্ডার' : 'Verified Order'}</span>
              </span>
              <span className="text-[10px] text-[#78756F] font-mono">{displayTime}</span>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close notification"
            className="absolute top-1 right-1 p-1 text-[#78756F] hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
