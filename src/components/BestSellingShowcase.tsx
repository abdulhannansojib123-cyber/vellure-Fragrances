import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { formatBDT } from '../utils/translations';
import {
  Star,
  Flame,
  ShoppingBag,
  Eye,
  ArrowRight,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface BestSellingShowcaseProps {
  products: Product[];
}

export const BestSellingShowcase: React.FC<BestSellingShowcaseProps> = ({ products }) => {
  const { language, addToCart, navigateTo, openQuickOrder, setIsCartOpen } = useApp();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, '3ml' | '6ml'>>({});
  const [addedAnimation, setAddedAnimation] = useState<string | null>(null);

  // Slider container reference and scroll state
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Best selling products - provide all bestsellers so customer can slide through all
  const allBestSellers = products.filter((p) => p.bestSeller);
  // Fallback to top products if bestSeller flag is sparse
  const displayProducts = allBestSellers.length >= 3 ? allBestSellers : products.slice(0, 8);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

      // Estimate current active card index based on scroll position
      const cardWidth = 310;
      const idx = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.max(0, Math.min(displayProducts.length - 1, idx)));
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [displayProducts.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const cardWidth = 320;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToIndex = (idx: number) => {
    if (sliderRef.current) {
      const cardWidth = 320;
      sliderRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    }
  };

  const handleSizeChange = (e: React.MouseEvent, productId: string, size: '3ml' | '6ml') => {
    e.stopPropagation();
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const size = selectedSizes[product.id] || '3ml';
    addToCart(product, size, 1);
    setAddedAnimation(product.id);
    setTimeout(() => setAddedAnimation(null), 2000);
    setIsCartOpen(true);
  };

  const handleQuickOrder = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const size = selectedSizes[product.id] || '3ml';
    openQuickOrder(product, size, 1);
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return {
          label: language === 'bn' ? '👑 #১ শীর্ষ বিক্রিত' : '👑 #1 TOP SELLER',
          bg: 'bg-gradient-to-r from-amber-500 via-[#D4AF37] to-amber-600 text-black font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.6)]'
        };
      case 1:
        return {
          label: language === 'bn' ? '✨ #২ সর্বাধিক প্রশংসিত' : '✨ #2 MOST LOVED',
          bg: 'bg-gradient-to-r from-[#F5D77F] to-[#C5A059] text-black font-bold shadow-md'
        };
      case 2:
        return {
          label: language === 'bn' ? '🔥 #৩ গ্রাহক পছন্দ' : '🔥 #3 PATRON CHOICE',
          bg: 'bg-[#2A2832] border border-[#D4AF37]/60 text-[#F5D77F] font-bold shadow-sm'
        };
      default:
        return {
          label: language === 'bn' ? `⭐️ #${index + 1} বেস্টসেলার` : `⭐️ #${index + 1} BESTSELLER`,
          bg: 'bg-[#1C1B22] border border-[#3A3844] text-[#E0DCD3] font-medium'
        };
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Frosted Glass Section Container with Thin Golden Border */}
      <div className="relative rounded-3xl p-4 sm:p-7 md:p-8 bg-[#130F20]/60 backdrop-blur-xl border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden">
        {/* Ambient Golden Halo Glow inside Glass Container */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        {/* Header Section with Prominent Slider Navigation Icons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 pb-5 border-b border-[#D4AF37]/20 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F5D77F] text-[11px] font-mono font-bold tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{language === 'bn' ? 'হাজারো ক্রেতার পছন্দের শীর্ষে' : 'TOP RATED & MOST PURCHASED'}</span>
            </span>
            <span className="hidden sm:inline-block text-xs text-[#8E8B83]">
              {language === 'bn' ? '• ১৮+ ঘণ্টা স্থায়ী নিখুঁত সুবাস' : '• 18+ Hours Sillage'}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F3EFEA] tracking-tight flex items-center gap-3">
            <span className="h-7 sm:h-9 w-1.5 rounded-full bg-gradient-to-b from-[#FFF6E5] via-[#D4AF37] to-[#996515]"></span>
            <span>{language === 'bn' ? 'বেস্ট সেলিং (Best Selling)' : 'Best Selling'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A49C] mt-2 max-w-xl">
            {language === 'bn'
              ? 'আমাদের সর্বাধিক বিক্রিত এবং গ্রাহকদের মুখে মুখে ছড়িয়ে পড়া সিগনেচার মাস্টারপিস আতরসমূহ।'
              : 'Our highest-demanded artisanal formulas, proven across thousands of connoisseurs.'}
          </p>
        </div>

        {/* Action Controls & Slider Navigation Arrows */}
        <div className="flex items-center gap-3">
          {/* Prominent Slider Arrow Buttons in Header */}
          <div className="flex items-center gap-2 bg-[#171424] px-2.5 py-1.5 rounded-2xl border border-[#D4AF37]/50 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <span className="text-[11px] font-bold text-[#FFE072] uppercase tracking-wider flex items-center gap-1 pl-1">
              <span>{language === 'bn' ? 'স্লাইড করুন' : 'Slide'}</span>
            </span>
            <div className="flex items-center gap-1 border-l border-[#3D3750] pl-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label={language === 'bn' ? 'আগের প্রডাক্ট' : 'Previous product'}
                className="p-2 sm:p-2.5 rounded-xl bg-[#221C34] border border-[#483F65] hover:border-[#FFE072] text-[#FFE072] hover:text-black hover:bg-[#FFE072] disabled:opacity-25 disabled:pointer-events-none transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                title={language === 'bn' ? 'বামে স্লাইড করুন' : 'Slide Left'}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label={language === 'bn' ? 'পরের প্রডাক্ট' : 'Next product'}
                className="p-2 sm:p-2.5 rounded-xl bg-[#221C34] border border-[#483F65] hover:border-[#FFE072] text-[#FFE072] hover:text-black hover:bg-[#FFE072] disabled:opacity-25 disabled:pointer-events-none transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                title={language === 'bn' ? 'ডানে স্লাইড করুন' : 'Slide Right'}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs uppercase tracking-wider text-[#C5A059] hover:text-[#F3EFEA] flex items-center gap-1.5 transition-colors cursor-pointer py-2 pl-2"
          >
            <span>{language === 'bn' ? 'সব ক্যাটালগ' : 'Explore All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Swipe / Slider Instruction Banner */}
      <div className="sm:hidden flex items-center justify-between px-2 pb-2.5 text-[11px] text-[#E0DCD3]">
        <div className="flex items-center gap-1.5 text-[#FFE072] font-medium bg-[#171424]/90 px-3 py-1 rounded-full border border-[#D4AF37]/35 shadow-sm">
          <ChevronLeft className="w-3.5 h-3.5 animate-pulse text-[#FFE072]" />
          <span>{language === 'bn' ? 'অন্য প্রোডাক্ট দেখতে স্লাইড বা আইকনে চাপুন' : 'Slide or tap icons to explore'}</span>
          <ChevronRight className="w-3.5 h-3.5 animate-pulse text-[#FFE072]" />
        </div>
        <span className="text-[10px] font-mono text-[#D4AF37] bg-[#171424] px-2 py-0.5 rounded-md border border-[#302B40]">
          {currentIndex + 1} / {displayProducts.length}
        </span>
      </div>

      {/* Slider Carousel Wrapper with Floating Navigation Arrows */}
      <div className="relative group/slider">
        {/* Floating Left Arrow (Mobile & Desktop Visible) */}
        <button
          type="button"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label={language === 'bn' ? 'আগের সুবাস দেখুন' : 'Slide Left'}
          title={language === 'bn' ? 'বামে স্লাইড করুন' : 'Slide Left'}
          className={`flex absolute left-1 sm:-left-3 md:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full items-center justify-center transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.95),0_0_15px_rgba(255,224,114,0.35)] ${
            canScrollLeft
              ? 'bg-[#181526]/95 backdrop-blur-md border-2 border-[#FFE072] text-[#FFE072] hover:text-black hover:bg-[#FFE072] cursor-pointer hover:scale-110 active:scale-90'
              : 'bg-[#12101C]/80 border border-[#2E2A3E] text-zinc-600 cursor-not-allowed opacity-30 pointer-events-none'
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Floating Right Arrow (Mobile & Desktop Visible) */}
        <button
          type="button"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label={language === 'bn' ? 'পরের সুবাস দেখুন' : 'Slide Right'}
          title={language === 'bn' ? 'ডানে স্লাইড করুন' : 'Slide Right'}
          className={`flex absolute right-1 sm:-right-3 md:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full items-center justify-center transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.95),0_0_15px_rgba(255,224,114,0.35)] ${
            canScrollRight
              ? 'bg-[#181526]/95 backdrop-blur-md border-2 border-[#FFE072] text-[#FFE072] hover:text-black hover:bg-[#FFE072] cursor-pointer hover:scale-110 active:scale-90 animate-pulse'
              : 'bg-[#12101C]/80 border border-[#2E2A3E] text-zinc-600 cursor-not-allowed opacity-30 pointer-events-none'
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Horizontal Scrollable Carousel Container */}
        <div
          ref={sliderRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-3 px-1 no-scrollbar touch-pan-x"
        >
          {displayProducts.map((product, index) => {
            const currentSize = selectedSizes[product.id] || '3ml';
            const currentImage = currentSize === '6ml'
              ? (product.images.find((img) => img.toLowerCase().includes('6ml')) || product.images[0])
              : (product.images.find((img) => !img.toLowerCase().includes('6ml')) || product.images[0]);
            const price = currentSize === '3ml' ? product.price3ml : product.price6ml;
            const originalPrice = currentSize === '3ml' ? product.originalPrice3ml : product.originalPrice6ml;
            const badge = getRankBadge(index);
            const isTopOne = index === 0;
            const variantStock = currentSize === '3ml'
              ? (product.stock3ml !== undefined ? product.stock3ml : product.stock)
              : (product.stock6ml !== undefined ? product.stock6ml : product.stock);
            const isOutOfStock = variantStock <= 0;

            return (
              <div
                key={product.id}
                onClick={() => navigateTo('product', { slug: product.slug })}
                className={`w-[80vw] xs:w-[275px] sm:w-[300px] md:w-[320px] lg:w-[295px] shrink-0 snap-start group relative rounded-2xl overflow-hidden bg-[#161226]/75 backdrop-blur-xl border transition-all duration-400 hover:-translate-y-2 cursor-pointer flex flex-col justify-between ${
                  isTopOne
                    ? 'border-[#FFE072] shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(255,224,114,0.35)] ring-1 ring-[#FFE072]/60 hover:shadow-[0_18px_45px_rgba(0,0,0,0.95),0_0_35px_rgba(255,224,114,0.6)] hover:border-[#FFF0A0]'
                    : 'border-[#D4AF37]/35 hover:border-[#FFE072] shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(255,224,114,0.35)] hover:bg-[#1C172E]/85 ring-0 hover:ring-1 hover:ring-[#FFE072]/50'
                }`}
              >
                {/* Top Banner Ribbon / Rank Badge */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider inline-flex items-center gap-1 ${badge.bg}`}>
                    {badge.label}
                  </span>

                  {isOutOfStock && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-950/90 border border-rose-500/70 text-rose-300 uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                      <span>{language === 'bn' ? 'স্টক শেষ' : 'OUT OF STOCK'}</span>
                    </span>
                  )}
                </div>

                {/* Fragrance Type on Top Right */}
                {product.fragranceType && (
                  <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/75 border border-[#D4AF37]/30 backdrop-blur-md">
                    <span className="text-[10px] font-mono text-[#D4AF37]">
                      {language === 'bn' ? (
                        product.fragranceType === 'Aquatic' ? 'অ্যাকোয়াটিক' :
                        product.fragranceType === 'Oud' ? 'উদ' :
                        product.fragranceType === 'Floral' ? 'ফ্লোরাল' :
                        product.fragranceType === 'Woody' ? 'উডি' :
                        product.fragranceType === 'Musk' ? 'মাস্ক' :
                        product.fragranceType
                      ) : product.fragranceType}
                    </span>
                  </div>
                )}

                {/* High-Resolution Flacon Showcase Image Frame with Shine Sweep */}
                <div className="relative aspect-[4/3] sm:aspect-square bg-[#181426]/60 backdrop-blur-md overflow-hidden flex items-center justify-center flacon-shine-container">
                  <img
                    src={currentImage}
                    alt={language === 'bn' ? (product.nameBn || product.name) : product.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-112 group-active:scale-108 filter brightness-[0.98] group-hover:brightness-105 will-change-transform"
                  />

                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161226]/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Quick Buy hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
                    </span>
                  </div>
                </div>

                {/* Information Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  <div className="space-y-1">
                    {/* Rating & Authenticity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold">{typeof product.rating === 'number' ? product.rating.toFixed(1) : (product.rating || '5.0')}</span>
                        <span className="text-[#7A7771]">({product.reviewsCount || 450}+)</span>
                      </div>

                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#A88B46]">
                        {language === 'bn' ? '১০০% খাঁটি আতর' : '100% PURE'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F3EFEA] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                      {language === 'bn' ? (product.nameBn || product.name) : product.name}
                    </h3>

                    {/* Description / Notes snippet */}
                    <p className="text-[11px] text-[#8E8B83] line-clamp-1 leading-relaxed">
                      {language === 'bn' && product.shortDescriptionBn
                        ? product.shortDescriptionBn
                        : product.shortDescription}
                    </p>
                  </div>

                  {/* Sizing & Pricing Box */}
                  <div className="pt-2 border-t border-[#23222A] flex items-center justify-between">
                    {/* Size buttons */}
                    <div className="flex items-center gap-1 bg-[#18171E] p-1 rounded-xl border border-[#2B2934]">
                      {(['3ml', '6ml'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={(e) => handleSizeChange(e, product.id, sz)}
                          className={`py-1 px-2.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            currentSize === sz
                              ? 'bg-[#D4AF37] text-black shadow-sm'
                              : 'text-[#A8A49C] hover:text-white'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-mono text-base font-bold text-white tracking-tight">
                        {formatBDT(price)}
                      </div>
                      {originalPrice && originalPrice > price && (
                        <div className="font-mono text-[10px] text-[#7A7771] line-through">
                          {formatBDT(originalPrice)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action CTA Buttons: Add to Bag & 1-Click Quick Order */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={(e) => {
                        if (isOutOfStock) return;
                        handleAddToCart(e, product);
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md ${
                        isOutOfStock
                          ? 'bg-[#18171D] border border-[#272630] text-[#615E58] cursor-not-allowed opacity-50'
                          : addedAnimation === product.id
                          ? 'bg-emerald-600 text-white shadow-emerald-900/50 scale-[0.98] cursor-pointer'
                          : 'bg-[#1A1920] hover:bg-[#25242F] border border-[#3A3848] hover:border-[#FFE072]/60 text-[#F3EFEA] hover:text-[#FFE072] active:scale-95 cursor-pointer'
                      }`}
                    >
                      <ShoppingBag className={`w-3.5 h-3.5 ${isOutOfStock ? 'text-zinc-600' : addedAnimation === product.id ? 'text-white' : 'text-[#FFE072]'}`} />
                      <span>
                        {isOutOfStock
                          ? (language === 'bn' ? 'স্টক শেষ' : 'Out of Stock')
                          : addedAnimation === product.id
                          ? (language === 'bn' ? 'যুক্ত হয়েছে!' : 'Added!')
                          : (language === 'bn' ? 'কার্টে যোগ' : 'Add to Bag')}
                      </span>
                    </button>

                    {/* HIGH-CONTRAST 1-CLICK QUICK ORDER BUTTON */}
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={(e) => {
                        if (isOutOfStock) return;
                        handleQuickOrder(e, product);
                      }}
                      title={isOutOfStock ? (language === 'bn' ? 'স্টক শেষ' : 'Out of Stock') : (language === 'bn' ? '১-ক্লিকে দ্রুত অর্ডার' : '1-Click Quick Order')}
                      className={`py-2.5 px-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-[0_2px_15px_rgba(232,185,49,0.45)] hover:shadow-[0_4px_22px_rgba(255,224,114,0.7)] hover:scale-[1.02] active:scale-95 ${
                        isOutOfStock
                          ? 'bg-[#151419] border-[#222128] text-zinc-600 cursor-not-allowed opacity-40'
                          : 'bg-gradient-to-r from-[#FFE072] via-[#E8B931] to-[#D4A31C] text-black cursor-pointer ring-1 ring-[#FFF4B8]/80'
                      }`}
                    >
                      <Zap className={`w-3.5 h-3.5 ${isOutOfStock ? 'fill-zinc-600' : 'fill-black'}`} />
                      <span>{language === 'bn' ? 'দ্রুত অর্ডার' : 'Quick Order'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slider Pagination Dots & Mobile Swipe Hint */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-[#23222A]/80 mt-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#8E8B83]">
            {language === 'bn'
              ? `প্রোডাক্ট ${currentIndex + 1} / ${displayProducts.length}`
              : `Product ${currentIndex + 1} of ${displayProducts.length}`}
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            {displayProducts.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToIndex(dotIdx)}
                aria-label={`Go to product ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === currentIndex
                    ? 'w-7 bg-gradient-to-r from-[#FFE072] to-[#D4A31C] shadow-[0_0_10px_rgba(255,224,114,0.6)]'
                    : 'w-2 bg-[#2D2A38] hover:bg-[#474354]'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#A8A49C] flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>{language === 'bn' ? 'আইকন ক্লিক করে বা স্লাইড করে দেখুন' : 'Click arrows or swipe to explore'}</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-1.5 rounded-lg bg-[#181720] border border-[#2D2A38] text-[#E0DCD3] hover:text-[#FFE072] disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-1.5 rounded-lg bg-[#181720] border border-[#2D2A38] text-[#E0DCD3] hover:text-[#FFE072] disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};
