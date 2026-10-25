import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const LuxuryPreloader: React.FC = () => {
  const { language } = useApp();
  const [shouldRender, setShouldRender] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Only show on initial session entrance
    const alreadyShown = sessionStorage.getItem('vellure_preloader_seen');
    if (alreadyShown) {
      setShouldRender(false);
      return;
    }

    // Begin fade-out sequence after 1200ms
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1200);

    // Unmount from DOM after transition completes (1200ms + 700ms)
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      try {
        sessionStorage.setItem('vellure_preloader_seen', 'true');
      } catch {}
    }, 1900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0C0A13] transition-opacity duration-700 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      aria-hidden="true"
    >
      {/* Background radial ambiance */}
      <div className="absolute inset-0 bg-radial from-[#7A3EB0]/20 via-[#14101E] to-[#0C0A13] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[120px] pointer-events-none animate-pulse" />

      {/* Central insignia container */}
      <div className="relative flex flex-col items-center text-center px-6">
        {/* Animated Royal Insignia Monogram */}
        <div className="relative mb-6">
          {/* Subtle spinning golden halo ring */}
          <div className="w-20 h-20 rounded-full border border-[#D4AF37]/30 border-t-[#FFE072] animate-spin [animation-duration:3s]" />

          {/* Golden Diamond Emblem in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border border-[#D4AF37] rotate-45 flex items-center justify-center bg-[#151221]/80 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <span className="-rotate-45 font-serif text-lg font-bold text-[#FFE072] tracking-normal">
                V
              </span>
            </div>
          </div>
        </div>

        {/* Brand Name with regal serif typography */}
        <h1 className="font-serif text-3xl sm:text-4xl text-[#F3EFEA] tracking-[0.3em] font-light uppercase">
          VELLURE
        </h1>

        {/* Thin Gold Hairline divider with glowing shimmer */}
        <div className="relative w-36 h-px my-3.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>

        {/* Subtitle */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#C5A059] font-medium">
          {language === 'bn' ? 'হাউতে পারফিউমারি • খাঁটি আতর' : 'HAUTE PARFUMERIE • PURE ATTAR'}
        </p>

        {/* Micro loading progress indicator */}
        <div className="w-24 h-0.5 bg-[#1C182A] rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#C5A059] to-[#FFE072] rounded-full animate-[progress_1.2s_ease-in-out_forwards]" />
        </div>
      </div>
    </div>
  );
};
