import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Droplets,
  Heart
} from 'lucide-react';

interface ScentFinderQuizProps {
  products?: Product[];
}

export const ScentFinderQuiz: React.FC<ScentFinderQuizProps> = () => {
  const { language, openScentQuiz } = useApp();

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-br from-[#161224] via-[#100D1A] to-[#1B152B] border-2 border-[#D4AF37]/45 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(212,175,55,0.18)] backdrop-blur-2xl overflow-hidden group">
        {/* Ambient Royal Lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/15 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#7A3EB0]/20 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left Text Content */}
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/45 text-[#FFE072] text-xs font-mono font-bold tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>
                {language === 'bn' ? 'পার্সোনালাইজড সুবাস ফাইন্ডার' : 'BESPOKE ARTISANAL SCENT FINDER'}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-medium text-[#F3EFEA] tracking-tight leading-tight">
              {language === 'bn' ? (
                <>
                  ৩টি সহজ ধাপে খুঁজে নিন আপনার <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#D4AF37] to-[#F5D77F]">সিগনেচার সুবাস</span>
                </>
              ) : (
                <>
                  Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#D4AF37] to-[#F5D77F]">Signature Scent</span> in 3 Steps
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm md:text-base text-[#C2BDB2] font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              {language === 'bn'
                ? 'কোন আতরটি আপনার ব্যক্তিত্ব ও ব্যবহারের সাথে মিলবে তা নিয়ে ভাবছেন? মাত্র ৩টি সহজ প্রশ্নের উত্তর দিয়ে পেয়ে যান আপনার জন্য বিশেষভাবে নির্বাচিত পারফেক্ট আতরের সুপারিশ ও ১-ক্লিক অর্ডার সুবিধা।'
                : 'Not sure which artisanal attar suits you best? Answer 3 sensory questions (Notes, Occasion, Projection) to uncover tailored attar recommendations calibrated to your personal style.'}
            </p>

            {/* Quick Feature Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#A8A49C]">
              <div className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{language === 'bn' ? '১০০% খাঁটি অ্যালকোহলমুক্ত' : '100% Pure Alcohol-Free'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{language === 'bn' ? '১৮+ ঘণ্টা স্থায়িত্ব' : '18+ Hours Sillage'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{language === 'bn' ? 'ব্যক্তিগত পছন্দ অনুযায়ী' : 'Tailored Recommendations'}</span>
              </div>
            </div>
          </div>

          {/* Right Action Button & Visual */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={openScentQuiz}
              className="group px-8 py-4 sm:py-5 bg-gradient-to-r from-[#D4AF37] via-[#F3DE97] to-[#D4AF37] hover:from-[#E5BE4A] hover:to-[#C5A059] text-black font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{language === 'bn' ? 'সেন্ট ফাইন্ডার কুইজ শুরু করুন' : 'Start Scent Finder Quiz'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
