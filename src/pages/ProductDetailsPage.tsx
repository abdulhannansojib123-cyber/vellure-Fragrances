import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { formatBDT } from '../utils/translations';
import { trackViewContent } from '../utils/analytics';
import {
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Droplets,
  Clock,
  MapPin,
  Plus,
  Minus,
  Check,
  Briefcase,
  SunMedium,
  Crown,
  Gem,
  Flame,
  Layers,
  Shirt,
  CheckCircle2,
  Award
} from 'lucide-react';

interface ProductDetailsPageProps {
  slug: string;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ slug }) => {
  const { products, language, t, addToCart, navigateTo, isInWishlist, toggleWishlist, openQuickOrder } = useApp();

  const product = products.find((p) =>
    p.slug === slug ||
    (slug.includes('royal-sandal') && p.slug.includes('royal-sandal')) ||
    (slug.includes('white-chandan') && p.slug.includes('white-chandan'))
  ) || products[0];
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || '');
  const [selectedSize, setSelectedSize] = useState<'3ml' | '6ml'>('3ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const price = selectedSize === '3ml' ? product.price3ml : product.price6ml;
  const originalPrice = selectedSize === '3ml' ? product.originalPrice3ml : product.originalPrice6ml;
  const inWishlist = isInWishlist(product.id);
  const stockFor3ml = product.stock3ml !== undefined ? product.stock3ml : product.stock;
  const stockFor6ml = product.stock6ml !== undefined ? product.stock6ml : product.stock;
  const currentVariantStock = selectedSize === '3ml' ? stockFor3ml : stockFor6ml;
  const isOutOfStock = currentVariantStock <= 0;

  // Track ViewContent for Meta Pixel and GA4
  useEffect(() => {
    if (product) {
      trackViewContent(product, selectedSize);
    }
  }, [product?.id, selectedSize]);

  // Auto-switch image to match selected variant (3ml vs 6ml)
  useEffect(() => {
    if (!product?.images?.length) return;
    if (selectedSize === '6ml') {
      const img6ml = product.images.find((img) => img.toLowerCase().includes('6ml'));
      if (img6ml) {
        setSelectedImage(img6ml);
        return;
      }
    } else if (selectedSize === '3ml') {
      const img3ml =
        product.images.find((img) => img.toLowerCase().includes('3ml')) ||
        product.images.find((img) => !img.toLowerCase().includes('6ml'));
      if (img3ml) {
        setSelectedImage(img3ml);
        return;
      }
    }
    // Fallback to first image
    if (!product.images.includes(selectedImage)) {
      setSelectedImage(product.images[0]);
    }
  }, [selectedSize, product]);

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.fragranceType === product.fragranceType))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    openQuickOrder(product, selectedSize, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb unboxed */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8E8B83]">
        <button onClick={() => navigateTo('home')} className="hover:text-white">
          {t('home')}
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-white">
          {t('shop')}
        </button>
        <span>/</span>
        <span className="text-[#D4AF37] font-medium line-clamp-1">
          {language === 'bn' ? product.nameBn : product.name}
        </span>
      </nav>

      {/* Main Contiguous Purchase Module & Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Sticky Image Gallery (col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-square bg-[#151224]/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-[#D4AF37]/35 hover:border-[#FFE072] flex items-center justify-center flacon-shine-container shadow-[0_16px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,224,114,0.35)] transition-all duration-400 group cursor-zoom-in">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-active:scale-108 will-change-transform"
            />
            {isOutOfStock ? (
              <div className="absolute top-4 left-4 bg-rose-950/90 border border-rose-500/70 text-rose-200 text-xs font-bold px-3 py-1 rounded shadow-lg uppercase flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                <span>{language === 'bn' ? 'স্টক শেষ' : 'OUT OF STOCK'}</span>
              </div>
            ) : product.discount > 0 ? (
              <div className="absolute top-4 left-4 bg-[#0B0B0C]/85 border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-semibold px-2.5 py-1 rounded">
                -{product.discount}% OFF
              </div>
            ) : null}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#0B0B0C]/70 backdrop-blur-md text-[#F3EFEA] hover:text-[#D4AF37] border border-[#2B2932] transition-colors"
              aria-label="Toggle Wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
            </button>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border transition-all cursor-pointer shrink-0 ${
                    selectedImage === img
                      ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]'
                      : 'border-[#26242E] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Contiguous Purchase Module (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header metadata */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#C5A059] uppercase tracking-widest font-semibold">
              <span>{language === 'bn' ? product.categoryBn : product.category}</span>
              <span>·</span>
              <span>{product.fragranceType} Reserve</span>
              <span>·</span>
              <span className="text-[#8E8B83] font-mono">{product.sku}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F3EFEA] leading-tight">
              {language === 'bn' ? product.nameBn : product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm text-[#9E9B93] pt-1">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-[#47443F]'
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono tabular-nums text-white font-medium">{product.rating.toFixed(1)}</span>
              <span>({product.reviewsCount} {language === 'bn' ? 'রিভিউ' : 'verified reviews'})</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 py-3 border-y border-[#23222A]">
            <span className="font-mono tabular-nums text-3xl font-bold text-[#F3EFEA]">
              {formatBDT(price)}
            </span>
            {originalPrice > price && (
              <span className="font-mono tabular-nums text-base text-[#7A7771] line-through">
                {formatBDT(originalPrice)}
              </span>
            )}
            {isOutOfStock ? (
              <span className="text-xs text-rose-400 font-semibold flex items-center gap-1.5 bg-rose-950/50 border border-rose-800/50 px-2.5 py-1 rounded-md">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>{language === 'bn' ? 'স্টক শেষ (Out of Stock)' : 'Out of Stock · Restocking Soon'}</span>
              </span>
            ) : (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{language === 'bn' ? 'স্টকে রয়েছে (In Stock)' : 'In Stock'}</span>
              </span>
            )}
          </div>

          {/* Eye-Catching Luxury Sensory Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1922] border border-[#FFE072]/40 text-[#FFE072] text-[11px] font-medium shadow-sm">
              <Crown className="w-3.5 h-3.5 text-[#FFE072]" />
              <span>{language === 'bn' ? 'রাজকীয় আভিজাত্য' : 'Royal Presence'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1922] border border-emerald-500/40 text-emerald-300 text-[11px] font-medium shadow-sm">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'bn' ? '১০০% খাঁটি অ্যালকোহলমুক্ত' : '100% Pure Alcohol-Free'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1922] border border-amber-500/40 text-amber-300 text-[11px] font-medium shadow-sm">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'bn' ? '১৮+ ঘণ্টা দীর্ঘস্থায়ী' : '18+ Hours Sillage'}</span>
            </span>
          </div>

          {/* Eye-Catching Short Description Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#151224]/75 backdrop-blur-xl border border-[#D4AF37]/35 hover:border-[#FFE072] shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(255,224,114,0.25)] relative overflow-hidden group transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FFE072]/15 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start gap-3 relative z-10">
              <span className="text-2xl sm:text-3xl font-serif text-[#FFE072] leading-none select-none">“</span>
              <div className="space-y-1.5 flex-1">
                <p className="text-xs sm:text-sm text-[#F3EFEA] leading-relaxed font-sans font-medium">
                  {language === 'bn' ? product.shortDescriptionBn : product.shortDescription}
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-[#FFE072]">
                  <Sparkles className="w-3 h-3 text-[#FFE072]" />
                  <span>{language === 'bn' ? '১০০% খাঁটি অ্যালকোহলমুক্ত নির্যাস · ২৪+ ঘণ্টা স্থায়ী' : '100% Pure Alcohol-Free Extract · 24+ Hours Sillage'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider text-[#C5A059] font-medium block">
              {t('filterSize')}: <span className="text-white font-mono">{selectedSize}</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedSize('3ml')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                  selectedSize === '3ml'
                    ? 'border-[#D4AF37] bg-[#1F1E24] shadow-md'
                    : 'border-[#26242E] bg-[#121116] hover:border-[#3A3842]'
                } ${stockFor3ml <= 0 ? 'opacity-70' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#F3EFEA]">3ml Vial</span>
                  <span className="font-mono text-xs text-[#D4AF37] font-semibold">
                    {formatBDT(product.price3ml)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-[#7A7771]">Approx. 45-60 uses</span>
                  {stockFor3ml <= 0 ? (
                    <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider">{language === 'bn' ? 'স্টক শেষ' : 'Out of Stock'}</span>
                  ) : (
                    <span className="text-[9px] text-emerald-400/90 font-medium">{language === 'bn' ? 'স্টকে আছে' : 'In Stock'}</span>
                  )}
                </div>
              </button>

              <button
                onClick={() => setSelectedSize('6ml')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                  selectedSize === '6ml'
                    ? 'border-[#D4AF37] bg-[#1F1E24] shadow-md'
                    : 'border-[#26242E] bg-[#121116] hover:border-[#3A3842]'
                } ${stockFor6ml <= 0 ? 'opacity-70' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#F3EFEA]">6ml Flacon</span>
                  <span className="font-mono text-xs text-[#D4AF37] font-semibold">
                    {formatBDT(product.price6ml)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-[#7A7771]">Approx. 100-120 uses</span>
                  {stockFor6ml <= 0 ? (
                    <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider">{language === 'bn' ? 'স্টক শেষ' : 'Out of Stock'}</span>
                  ) : (
                    <span className="text-[9px] text-emerald-400/90 font-medium">{language === 'bn' ? 'স্টকে আছে' : 'In Stock'}</span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Quantity Controls & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-[#17161C] border border-[#2B2932] rounded-xl px-2 py-1">
                <button
                  disabled={isOutOfStock}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[#949088] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-mono tabular-nums text-sm text-white font-semibold">
                  {quantity}
                </span>
                <button
                  disabled={isOutOfStock}
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[#949088] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? 'bg-[#151419] border border-[#26242C] text-[#615E58] cursor-not-allowed opacity-50'
                    : 'bg-[#1C1B22] hover:bg-[#272630] border border-[#3A3842] hover:border-[#D4AF37] text-[#F3EFEA] cursor-pointer shadow-md'
                }`}
              >
                <ShoppingBag className={`w-4 h-4 ${isOutOfStock ? 'text-zinc-600' : 'text-[#D4AF37]'}`} />
                <span>
                  {isOutOfStock
                    ? (language === 'bn' ? 'স্টক শেষ' : 'Out of Stock')
                    : addedNotice
                    ? (language === 'bn' ? 'কার্টে যোগ হয়েছে ✓' : 'Added to Bag ✓')
                    : t('addToCart')}
                </span>
              </button>
            </div>

            {/* 1-Click Quick Order / Buy Now Direct Button */}
            <button
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              className={`w-full py-4 px-6 font-black text-xs uppercase tracking-[0.16em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(232,185,49,0.55)] active:scale-98 ${
                isOutOfStock
                  ? 'bg-[#18171C] border border-[#24232A] text-[#615E58] cursor-not-allowed opacity-40'
                  : 'bg-gradient-to-r from-[#FFE072] via-[#E8B931] to-[#D4A31C] text-black cursor-pointer ring-2 ring-[#FFF4B8]/80 hover:shadow-[0_6px_35px_rgba(255,224,114,0.75)] hover:scale-[1.01]'
              }`}
            >
              <Zap className={`w-4 h-4 ${isOutOfStock ? 'fill-zinc-600' : 'fill-black'}`} />
              <span>
                {isOutOfStock
                  ? (language === 'bn' ? 'পণ্যটি বর্তমানে স্টকে নেই' : 'Currently Out of Stock')
                  : `${language === 'bn' ? '১-ক্লিকে সরাসরি অর্ডার করুন' : '1-Click Quick Order'} (${language === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'})`}
              </span>
            </button>
          </div>

          {/* Delivery & Assurance Info Card */}
          <div className="bg-[#121116] border border-[#23222A] p-4 rounded-xl space-y-2.5 text-xs text-[#A8A49C]">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">
                  {language === 'bn' ? 'সারাদেশে দ্রুত ডেলিভারি' : 'Fast Nationwide Dispatch'}
                </span>
                <p className="text-[11px] text-[#7A7771]">
                  Dhaka: 24-48 Hours (৳70) · Outside Dhaka: 2-4 Days (৳130)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">
                  {language === 'bn' ? 'ক্যাশ অন ডেলিভারি সুবিধা' : 'Cash on Delivery Available'}
                </span>
                <p className="text-[11px] text-[#7A7771]">
                  Inspect packaging upon delivery before payment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Droplets className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">
                  {language === 'bn' ? '১০০% বিশুদ্ধ অ্যালকোহলমুক্ত' : '100% Pure Concentrated Oil'}
                </span>
                <p className="text-[11px] text-[#7A7771]">
                  Suitable for daily prayers and religious gatherings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fragrance Notes, Story & Eye-Catching Description Section */}
      <div className="pt-12 border-t border-[#23222A] space-y-10">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#23222A]">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFE072] font-bold flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFE072]" />
              <span>{language === 'bn' ? 'আর্টিসানাল সুবাসের গল্প' : 'ARTISANAL OLFACTORY STORY'}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F3EFEA] tracking-tight flex items-center gap-3">
              <span className="h-7 sm:h-9 w-1.5 rounded-full bg-gradient-to-b from-[#FFF6E5] via-[#FFE072] to-[#D4A31C]"></span>
              <span>{language === 'bn' ? 'সুবাসের নিখুঁত বর্ণনা ও রূপরেখা' : 'Olfactory Composition & Heritage'}</span>
            </h2>
          </div>
          <span className="text-xs text-[#8E8B83] font-mono">
            {language === 'bn' ? '১০০% খাঁটি অ্যালকোহলমুক্ত নির্যাস' : '100% Pure Alcohol-Free Oil'}
          </span>
        </div>

        {/* 4 Golden Pillars of VELLURE (Eye-Catching Feature Highlights) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-[#14131B] border border-[#2B2936] hover:border-[#FFE072]/50 transition-all duration-300 space-y-2 group shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#1F1E29] border border-[#373546] text-[#FFE072] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gem className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#FFE072] transition-colors">
              {language === 'bn' ? '১০০% খাঁটি ঘন তেল' : '100% Pure Viscous Oil'}
            </h4>
            <p className="text-[11px] text-[#A8A49C] leading-relaxed">
              {language === 'bn'
                ? 'কোনো অ্যালকোহল বা ক্ষতিকর স্পিরিট নেই। শতভাগ ঘন তেলের খাঁটি নির্যাস।'
                : 'Zero synthetic alcohol or fillers. High-viscosity pure oil extract.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#14131B] border border-[#2B2936] hover:border-[#FFE072]/50 transition-all duration-300 space-y-2 group shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#1F1E29] border border-[#373546] text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#FFE072] transition-colors">
              {language === 'bn' ? '১৮+ ঘণ্টা দীর্ঘস্থায়ী' : '18+ Hours Sillage'}
            </h4>
            <p className="text-[11px] text-[#A8A49C] leading-relaxed">
              {language === 'bn'
                ? 'কাপড়ে দিনভর স্নিগ্ধ সুবাস ছড়ায়। সাধারণ পারফিউমের চেয়ে ৫ গুণ বেশি স্থায়ী।'
                : 'Unrivaled projection that clings to skin and fine fabrics past 24 hours.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#14131B] border border-[#2B2936] hover:border-[#FFE072]/50 transition-all duration-300 space-y-2 group shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#1F1E29] border border-[#373546] text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#FFE072] transition-colors">
              {language === 'bn' ? 'ইবাদতে সম্পূর্ণ হালাল' : '100% Halal & Safe'}
            </h4>
            <p className="text-[11px] text-[#A8A49C] leading-relaxed">
              {language === 'bn'
                ? 'জুমার নামাজ, খুতবা ও সব ধরনের ইবাদতে ব্যবহারের জন্য শতভাগ নিরাপদ ও পবিত্র।'
                : 'Non-irritating, pure natural formulation approved for daily prayers.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#14131B] border border-[#2B2936] hover:border-[#FFE072]/50 transition-all duration-300 space-y-2 group shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#1F1E29] border border-[#373546] text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Crown className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#FFE072] transition-colors">
              {language === 'bn' ? 'ক্রিস্টাল উপহার প্যাকেজিং' : 'Regal Presentation Flacon'}
            </h4>
            <p className="text-[11px] text-[#A8A49C] leading-relaxed">
              {language === 'bn'
                ? 'কাট-গ্লাস প্রিমিয়াম ফ্লাকন এবং গোল্ড-ফয়েল স্ট্যাম্পযুক্ত অভিজাত গিফট বক্স।'
                : 'Custom cut-glass bottle with gold-foiled presentation box, ready for gifting.'}
            </p>
          </div>
        </div>

        {/* Narrative & Note Pyramid Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Detailed Story Narrative (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Story Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141022]/75 backdrop-blur-xl border-l-4 border-l-[#FFE072] border border-[#D4AF37]/35 hover:border-[#FFE072] shadow-2xl space-y-5 relative overflow-hidden transition-all duration-400 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,224,114,0.3)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FFE072]/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-[#FFE072]/10 text-[#FFE072]">
                    <Sparkles className="w-4 h-4 text-[#FFE072]" />
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-bold">
                    {language === 'bn' ? 'সুবাসের গভীর অনুভূতি ও রসায়ন' : 'The Fragrance Experience'}
                  </h3>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#FFE072] bg-[#221B35]/90 px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-sm">
                  {language === 'bn' ? 'আর্টিশানাল মাস্টারপিস' : 'Artisanal Reserve'}
                </span>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-sm sm:text-base text-[#E5DFD3] leading-relaxed font-sans font-normal tracking-wide">
                  {language === 'bn' ? product.descriptionBn : product.description}
                </p>
              </div>

              {/* Eye-Catching Compliments & Experience Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#1D1830]/80 border border-[#D4AF37]/25 hover:border-[#FFE072] transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#FFE072] shrink-0" />
                  <span className="text-xs text-[#E5DFD3] font-medium">
                    {language === 'bn' ? 'অতুলনীয় প্রজেকশন ও মানুষের নজরকাড়া প্রশংসা' : 'Guaranteed compliments & radiant sillage'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#1D1830]/80 border border-[#D4AF37]/25 hover:border-[#FFE072] transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-[#E5DFD3] font-medium">
                    {language === 'bn' ? '১০০% বিশুদ্ধ অ্যালকোহলমুক্ত ও নামাজের উপযোগী' : '100% Halal, prayer-safe & non-alcoholic'}
                  </span>
                </div>
              </div>

              {/* Wearing Vibe summary */}
              <div className="pt-3 border-t border-[#D4AF37]/20 flex flex-wrap items-center gap-2 text-xs text-[#FFE072]">
                <span className="font-bold uppercase tracking-wider text-[11px] text-[#A8A49C]">
                  {language === 'bn' ? 'মুড ও ভাইব:' : 'Mood & Aura:'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1D1830] border border-[#D4AF37]/30 text-[#F3EFEA]">
                  {product.fragranceType}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1D1830] border border-[#D4AF37]/30 text-[#FFE072]">
                  {language === 'bn' ? '১৮+ ঘণ্টা স্থায়িত্ব' : '18+ Hours Sillage'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1D1830] border border-[#D4AF37]/30 text-emerald-400">
                  {language === 'bn' ? '১০০% খাঁটি আতর' : 'Alcohol-Free Attar'}
                </span>
              </div>
            </div>

            {/* Best For & Best Weather Highlights */}
            {(product.bestFor || product.bestForBn || product.bestWeather || product.bestWeatherBn) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(product.bestFor || product.bestForBn) && (
                  <div className="bg-[#151224]/75 backdrop-blur-xl border border-[#D4AF37]/30 hover:border-[#FFE072] transition-all duration-300 p-5 rounded-2xl space-y-2 shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,224,114,0.25)]">
                    <div className="flex items-center gap-2 text-[#FFE072]">
                      <Briefcase className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {language === 'bn' ? 'কোথায় ব্যবহার করবেন (Best For)' : 'Best For / Occasions'}
                      </span>
                    </div>
                    <p className="text-xs text-[#D8D3C8] leading-relaxed">
                      {language === 'bn' ? (product.bestForBn || product.bestFor) : (product.bestFor || product.bestForBn)}
                    </p>
                  </div>
                )}

                {(product.bestWeather || product.bestWeatherBn) && (
                  <div className="bg-[#151224]/75 backdrop-blur-xl border border-[#D4AF37]/30 hover:border-[#FFE072] transition-all duration-300 p-5 rounded-2xl space-y-2 shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,224,114,0.25)]">
                    <div className="flex items-center gap-2 text-[#FFE072]">
                      <SunMedium className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {language === 'bn' ? 'কোন আবহাওয়ায় (Best Weather)' : 'Best Weather & Season'}
                      </span>
                    </div>
                    <p className="text-xs text-[#D8D3C8] leading-relaxed">
                      {language === 'bn' ? (product.bestWeatherBn || product.bestWeather) : (product.bestWeather || product.bestWeatherBn)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* The Royal Wearing Ritual */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#151224]/75 backdrop-blur-xl border border-[#D4AF37]/30 hover:border-[#FFE072] space-y-3.5 shadow-sm transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,224,114,0.25)]">
              <h3 className="font-serif text-lg text-white font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFE072]" />
                <span>{language === 'bn' ? 'সুবাস ব্যবহারের রাজকীয় নিয়মাবলী' : 'The VELLURE Wearing Ritual'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#B8B4AC]">
                <div className="p-3 rounded-xl bg-[#1D1830]/80 border border-[#D4AF37]/25 hover:border-[#FFE072] transition-colors space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#FFE072] text-black font-mono text-[10px] font-bold flex items-center justify-center">১</span>
                    <span>{language === 'bn' ? 'পালস পয়েন্ট' : 'Pulse Points'}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {language === 'bn' ? 'হাতের কব্জি ও কানের লতিতে আলতো ছোঁয়ান, জোরে ঘষবেন না।' : 'Dab gently on wrists and inner elbows. Do not rub.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#1D1830]/80 border border-[#D4AF37]/25 hover:border-[#FFE072] transition-colors space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#FFE072] text-black font-mono text-[10px] font-bold flex items-center justify-center">২</span>
                    <span>{language === 'bn' ? 'পোশাকের কলার' : 'Fabrics & Collar'}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {language === 'bn' ? 'পাঞ্জাবি, জুব্বা বা শার্টের কলারে দিলে ২৪+ ঘণ্টা সুবাস থাকবে।' : 'Apply lightly to collar and lapels for multi-day endurance.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#1D1830]/80 border border-[#D4AF37]/25 hover:border-[#FFE072] transition-colors space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#FFE072] text-black font-mono text-[10px] font-bold flex items-center justify-center">৩</span>
                    <span>{language === 'bn' ? 'ইবাদত ও মাহফিল' : 'Sacred Moments'}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {language === 'bn' ? 'শুক্রবার জুমার পূর্বে ও বিশেষ মুহূর্তে অপার্থিব পরিবেশের জন্য।' : 'Perfect before prayers, gatherings, and special occasions.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Note Architecture Pyramid Card (col-span-5) */}
          <div className="lg:col-span-5 bg-[#141022]/75 backdrop-blur-xl border border-[#D4AF37]/35 hover:border-[#FFE072] p-6 sm:p-7 rounded-3xl space-y-6 shadow-xl relative overflow-hidden transition-all duration-400 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(255,224,114,0.3)]">
            <div className="pb-4 border-b border-[#24232F] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-bold flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#FFE072]" />
                  <span>{language === 'bn' ? 'সুগন্ধির তিন স্তরীয় পিরামিড' : 'Olfactory Note Architecture'}</span>
                </h3>
                <p className="text-[11px] text-[#A8A49C] mt-0.5">
                  {language === 'bn' ? 'সময়ের সাথে সুবাসের মুগ্ধকর রূপান্তর' : 'The evolution from top spray to base drydown'}
                </p>
              </div>
            </div>

            {/* Top Notes */}
            <div className="p-4 rounded-2xl bg-[#181722] border border-[#2B2938] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#FFE072] font-black flex items-center gap-1.5">
                  <span>🌅</span>
                  <span>{language === 'bn' ? 'শীর্ষ নোট (Top Notes)' : 'Top Notes'}</span>
                </span>
                <span className="text-[10px] font-mono text-[#8E8B83] bg-[#22212F] px-2 py-0.5 rounded-full">
                  {language === 'bn' ? 'প্রথম ১৫ মিনিট' : 'First 15 mins'}
                </span>
              </div>
              <p className="text-[11px] text-[#8E8B83]">
                {language === 'bn' ? 'প্রথম ছোঁয়াতেই মন চাঙ্গা করা সতেজ ও প্রাণবন্ত স্ফুলিঙ্গ:' : 'The opening burst that awakens the senses:'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {(language === 'bn' && product.notes.topBn ? product.notes.topBn : product.notes.top).map((note, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#222030] border border-[#3A384A] rounded-lg text-xs font-medium text-white shadow-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Heart Notes */}
            <div className="p-4 rounded-2xl bg-[#181722] border border-[#2B2938] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#F5D77F] font-black flex items-center gap-1.5">
                  <span>💎</span>
                  <span>{language === 'bn' ? 'হৃদয় নোট (Heart Notes)' : 'Heart Notes'}</span>
                </span>
                <span className="text-[10px] font-mono text-[#8E8B83] bg-[#22212F] px-2 py-0.5 rounded-full">
                  {language === 'bn' ? '২ - ৬ ঘণ্টা' : '2 - 6 Hours'}
                </span>
              </div>
              <p className="text-[11px] text-[#8E8B83]">
                {language === 'bn' ? 'আতরটির আসল সিগনেচার রূপ ও রাজকীয় ব্যক্তিত্ব:' : 'The true signature soul of the fragrance:'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {(language === 'bn' && product.notes.heartBn ? product.notes.heartBn : product.notes.heart).map((note, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#222030] border border-[#3A384A] rounded-lg text-xs font-medium text-white shadow-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Base Notes */}
            <div className="p-4 rounded-2xl bg-[#181722] border border-[#2B2938] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-black flex items-center gap-1.5">
                  <span>🌲</span>
                  <span>{language === 'bn' ? 'ভিত্তি নোট (Base Notes)' : 'Base Notes'}</span>
                </span>
                <span className="text-[10px] font-mono text-[#8E8B83] bg-[#22212F] px-2 py-0.5 rounded-full">
                  {language === 'bn' ? '১২ - ২৪+ ঘণ্টা' : '12 - 24+ Hours'}
                </span>
              </div>
              <p className="text-[11px] text-[#8E8B83]">
                {language === 'bn' ? 'কাপড়ে ও ত্বকে লেগে থাকা দীর্ঘস্থায়ী গভীর বনেদি আভিজাত্য:' : 'The enduring rich drydown that lingers on fabrics:'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {(language === 'bn' && product.notes.baseBn ? product.notes.baseBn : product.notes.base).map((note, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#222030] border border-[#3A384A] rounded-lg text-xs font-medium text-white shadow-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Longevity & Sillage Summary Box */}
            <div className="pt-2 border-t border-[#252432] grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#15141E] border border-[#262432]">
                <span className="text-[#8E8B83] text-[10px] uppercase font-mono block">{t('longevity')}</span>
                <span className="text-white font-bold text-xs mt-0.5 block">
                  {language === 'bn' && product.longevityBn ? product.longevityBn : product.longevity}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#15141E] border border-[#262432]">
                <span className="text-[#8E8B83] text-[10px] uppercase font-mono block">{t('sillage')}</span>
                <span className="text-white font-bold text-xs mt-0.5 block">
                  {language === 'bn' && product.sillageBn ? product.sillageBn : product.sillage}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#23222A] space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F3EFEA]">
              {t('relatedFragrances')}
            </h3>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs uppercase tracking-wider text-[#D4AF37] hover:underline"
            >
              {language === 'bn' ? 'সব দেখুন' : 'Explore All'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Buy Bar */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-[#0F0E12]/95 backdrop-blur-md border-t border-[#232228] p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex flex-col">
          <span className="font-mono tabular-nums text-sm font-bold text-[#F3EFEA]">
            {formatBDT(price)}
          </span>
          <span className="text-[10px] text-[#D4AF37] font-mono">{selectedSize}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-3 bg-[#1C1B22] border border-[#3A3842] text-[#F3EFEA] text-xs font-semibold rounded-lg"
          >
            {addedNotice ? 'Added ✓' : 'Add'}
          </button>
          <button
            onClick={handleBuyNow}
            className="py-2.5 px-4 bg-[#D4AF37] text-[#0B0B0C] text-xs font-bold uppercase rounded-lg"
          >
            {t('buyNow')}
          </button>
        </div>
      </div>
    </div>
  );
};
