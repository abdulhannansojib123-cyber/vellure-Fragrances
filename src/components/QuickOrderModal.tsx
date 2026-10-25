import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { formatBDT } from '../utils/translations';
import { trackPurchase } from '../utils/analytics';
import { notifyTelegramNewOrder } from '../utils/telegram';
import {
  X,
  ShoppingBag,
  Zap,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Phone,
  MapPin,
  User,
  Plus,
  Minus,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { BkashLogo, NagadLogo, CodLogo } from './PaymentLogos';

export const QuickOrderModal: React.FC = () => {
  const {
    quickOrderState,
    closeQuickOrder,
    language,
    settings,
    navigateTo,
    clearCart
  } = useApp();

  const { isOpen, product, size: initialSize, quantity: initialQuantity } = quickOrderState;

  const [selectedSize, setSelectedSize] = useState<'3ml' | '6ml'>('3ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryRegion, setDeliveryRegion] = useState<'dhaka' | 'outside'>('dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen && product) {
      setSelectedSize(initialSize || '3ml');
      setQuantity(initialQuantity || 1);
      setErrorMsg('');
      setConfirmedOrder(null);

      // Pre-fill remembered customer info from localStorage
      try {
        const savedName = localStorage.getItem('vellure_customer_name') || '';
        const savedPhone = localStorage.getItem('vellure_customer_phone') || '';
        const savedAddress = localStorage.getItem('vellure_customer_address') || '';
        const savedRegion = (localStorage.getItem('vellure_customer_region') as 'dhaka' | 'outside') || 'dhaka';
        if (savedName) setCustomerName(savedName);
        if (savedPhone) setPhone(savedPhone);
        if (savedAddress) setAddress(savedAddress);
        if (savedRegion) setDeliveryRegion(savedRegion);
      } catch {}
    }
  }, [isOpen, product, initialSize, initialQuantity]);

  if (!isOpen || !product) {
    return null;
  }

  const unitPrice = selectedSize === '3ml' ? product.price3ml : product.price6ml;
  const originalUnitPrice = selectedSize === '3ml' ? product.originalPrice3ml : product.originalPrice6ml;
  const subtotal = unitPrice * quantity;

  // Free delivery calculation
  const deliveryCharge =
    subtotal >= settings.freeDeliveryThreshold
      ? 0
      : deliveryRegion === 'dhaka'
      ? settings.deliveryFeeDhaka
      : settings.deliveryFeeOutside;

  const totalAmount = subtotal + deliveryCharge;

  // Get matching image for variant
  const currentImage = (() => {
    if (selectedSize === '6ml') {
      const img6ml = product.images.find((img) => img.toLowerCase().includes('6ml'));
      if (img6ml) return img6ml;
    } else if (selectedSize === '3ml') {
      const img3ml =
        product.images.find((img) => img.toLowerCase().includes('3ml')) ||
        product.images.find((img) => !img.toLowerCase().includes('6ml'));
      if (img3ml) return img3ml;
    }
    return product.images[0];
  })();

  const handlePlaceQuickOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Bangladesh phone number validation (11 digits e.g. 017...)
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 11 || !cleanPhone.startsWith('01')) {
      setErrorMsg(
        language === 'bn'
          ? 'অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)'
          : 'Please enter a valid 11-digit mobile number (e.g. 017XXXXXXXX)'
      );
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg(
        language === 'bn'
          ? 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।'
          : 'Please enter your full name.'
      );
      return;
    }

    if (!address.trim() || address.trim().length < 6) {
      setErrorMsg(
        language === 'bn'
          ? 'অনুগ্রহ করে বিস্তারিত ডেলিভারি ঠিকানা লিখুন (বাসা/রোড/এলাকা/জেলা)।'
          : 'Please provide full street delivery address (House/Road/Area/City).'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Save info for returning customer convenience
      try {
        localStorage.setItem('vellure_customer_name', customerName.trim());
        localStorage.setItem('vellure_customer_phone', cleanPhone);
        localStorage.setItem('vellure_customer_address', address.trim());
        localStorage.setItem('vellure_customer_region', deliveryRegion);
      } catch {}

      const cityName = deliveryRegion === 'dhaka' ? 'Dhaka' : 'Outside Dhaka';

      const payload = {
        customerName: customerName.trim(),
        phone: cleanPhone,
        email: '',
        address: address.trim(),
        city: cityName,
        area: cityName,
        deliveryNote: deliveryNote.trim() ? `[Quick Order] ${deliveryNote.trim()}` : '[Quick Order]',
        items: [
          {
            productId: product.id,
            name: product.name,
            nameBn: product.nameBn,
            image: currentImage,
            size: selectedSize,
            price: unitPrice,
            quantity: quantity
          }
        ],
        subtotal,
        deliveryCharge,
        discount: 0,
        couponCode: null,
        totalAmount,
        paymentMethod
      };

      let orderSuccess = false;
      let finalOrder: any = null;

      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.order) {
            orderSuccess = true;
            finalOrder = data.order;
            trackPurchase(data.order);
          }
        }
      } catch (err) {
        console.warn('Backend unavailable for Quick Order, falling back to local dispatch:', err);
      }

      // If backend was offline or static host (GitHub Pages / Vercel static), fulfill order locally & dispatch Telegram alert
      if (!orderSuccess) {
        const fallbackId = `VLR-Q-${Date.now().toString().slice(-6)}`;
        finalOrder = {
          ...payload,
          id: fallbackId,
          paymentStatus: paymentMethod === 'bkash' || paymentMethod === 'nagad' ? 'paid' : 'pending',
          status: 'Order Received',
          createdAt: new Date().toISOString()
        };

        try {
          const existing = JSON.parse(localStorage.getItem('vellure_local_orders') || '[]');
          existing.unshift(finalOrder);
          localStorage.setItem('vellure_local_orders', JSON.stringify(existing));
        } catch {}

        // Send Telegram notification directly from browser
        await notifyTelegramNewOrder(finalOrder).catch((err) => {
          console.warn('Quick Order Telegram dispatch error:', err);
        });

        trackPurchase(finalOrder);
        orderSuccess = true;
      }

      if (orderSuccess && finalOrder) {
        setConfirmedOrder(finalOrder);
      } else {
        setErrorMsg('অর্ডার সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch {
      setErrorMsg('নেটওয়ার্ক সমস্যা। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppConfirmationUrl = (order: any) => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = language === 'bn'
      ? `আসসালামু আলাইকুম ভ্যালুর! আমি ১-ক্লিকে দ্রুত অর্ডার করেছি।\n\n📌 অর্ডার আইডি: #${order.id}\n👤 নাম: ${order.customerName}\n📱 মোবাইল: ${order.phone}\n📦 প্রডাক্ট: ${order.items[0]?.name} (${order.items[0]?.size}) x ${order.items[0]?.quantity}\n💵 সর্বমোট: ৳${order.totalAmount} (${order.paymentMethod.toUpperCase()})\n📍 ঠিকানা: ${order.address}\n\nদয়া করে অর্ডারটি দ্রুত প্রসেস করুন। ধন্যবাদ!`
      : `Hello VELLURE! I placed a 1-Click Quick Order.\n\nOrder ID: #${order.id}\nName: ${order.customerName}\nPhone: ${order.phone}\nProduct: ${order.items[0]?.name} (${order.items[0]?.size}) x ${order.items[0]?.quantity}\nTotal: ৳${order.totalAmount}\nAddress: ${order.address}\n\nPlease confirm my order. Thank you!`;

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={closeQuickOrder}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-xl max-h-[92vh] sm:max-h-[90vh] bg-[#100F14] border border-[#D4AF37]/40 rounded-t-3xl sm:rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-slide-up"
      >
        {/* Mobile Pull Indicator */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#23222A] flex items-center justify-between bg-[#15141B]">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-gradient-to-r from-[#FFE072] to-[#D4A31C] text-black shadow-md">
              <Zap className="w-4 h-4 fill-black" />
            </span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#F3EFEA] flex items-center gap-2">
                <span>{language === 'bn' ? '১-ক্লিকে দ্রুত অর্ডার' : '1-Click Quick Order'}</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {language === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
                </span>
              </h3>
              <p className="text-[11px] text-[#A8A49C]">
                {language === 'bn' ? 'ঝামেলা ছাড়া মুহূর্তেই সরাসরি অর্ডার সম্পন্ন করুন' : 'Instant streamlined ordering with nationwide delivery'}
              </p>
            </div>
          </div>

          <button
            onClick={closeQuickOrder}
            className="p-2 rounded-full bg-[#1F1E26] hover:bg-[#2A2935] text-[#8E8B83] hover:text-white transition-colors cursor-pointer"
            aria-label="Close Quick Order"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Either Form or Confirmation Screen */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1">
          {confirmedOrder ? (
            /* Order Success View */
            <div className="text-center py-6 sm:py-8 space-y-5 animate-scale-up">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-900/40 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)]">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                  {language === 'bn' ? 'অর্ডার সফল হয়েছে!' : 'ORDER CONFIRMED!'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                  {language === 'bn' ? 'ধন্যবাদ, আপনার অর্ডারটি গ্রহণ করা হয়েছে' : 'Thank You For Your Order'}
                </h2>
                <p className="text-xs sm:text-sm text-[#A8A49C] max-w-md mx-auto">
                  {language === 'bn'
                    ? 'আমাদের কাস্টমার কেয়ার প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।'
                    : 'Our team is preparing your luxury flacon. Delivery timeline: 24-48 hrs in Dhaka, 2-3 days outside.'}
                </p>
              </div>

              {/* Order ID & Summary Card */}
              <div className="bg-[#181720] border border-[#2A2834] rounded-2xl p-4 text-left space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between items-center pb-2 border-b border-[#24232C] text-xs">
                  <span className="text-[#8E8B83] font-mono">{language === 'bn' ? 'অর্ডার নম্বর:' : 'Order ID:'}</span>
                  <span className="font-mono font-bold text-[#FFE072] text-sm">#{confirmedOrder.id}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8E8B83]">{language === 'bn' ? 'প্রডাক্ট:' : 'Product:'}</span>
                  <span className="text-white font-medium">{confirmedOrder.items[0]?.name} ({confirmedOrder.items[0]?.size}) x{confirmedOrder.items[0]?.quantity}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8E8B83]">{language === 'bn' ? 'প্রদেয় মূল্য:' : 'Total Payable:'}</span>
                  <span className="font-mono font-bold text-white text-sm">{formatBDT(confirmedOrder.totalAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8E8B83]">{language === 'bn' ? 'পেমেন্ট পদ্ধতি:' : 'Payment:'}</span>
                  <span className="text-emerald-400 font-semibold">{confirmedOrder.paymentMethod.toUpperCase()} (ক্যাশ অন ডেলিভারি)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <a
                  href={getWhatsAppConfirmationUrl(confirmedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'bn' ? 'WhatsApp এ আপডেট পান' : 'WhatsApp Support'}</span>
                </a>

                <button
                  type="button"
                  onClick={closeQuickOrder}
                  className="py-3 px-5 rounded-xl bg-[#21202A] hover:bg-[#2C2A38] text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'কেনাকাটা চালিয়ে যান' : 'Continue Shopping'}
                </button>
              </div>
            </div>
          ) : (
            /* 1-Click Checkout Form */
            <form onSubmit={handlePlaceQuickOrder} className="space-y-4">
              {/* Product Preview Card */}
              <div className="p-3 sm:p-4 rounded-2xl bg-[#17161E] border border-[#2A2834] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#181426]/60 backdrop-blur-md border border-[#D4AF37]/40 shrink-0 flacon-shine-container group/thumb">
                    <img
                      src={currentImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/thumb:scale-115 will-change-transform"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-white line-clamp-1">
                      {language === 'bn' ? (product.nameBn || product.name) : product.name}
                    </h4>
                    <p className="text-[11px] text-[#A8A49C] line-clamp-1">
                      {product.fragranceType} • {language === 'bn' ? '১০০% খাঁটি আতর' : 'Alcohol-Free Attar'}
                    </p>

                    {/* Size Selector */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {(['3ml', '6ml'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-gradient-to-r from-[#FFE072] to-[#D4A31C] text-black shadow-sm'
                              : 'bg-[#201F29] text-[#A8A49C] hover:text-white'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quantity and Price */}
                <div className="text-right flex flex-col items-end gap-1.5 shrink-0">
                  <div className="font-mono text-base sm:text-lg font-bold text-[#FFE072]">
                    {formatBDT(unitPrice * quantity)}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-[#201F29] border border-[#32303E] rounded-lg">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="p-1 sm:p-1.5 text-[#A8A49C] hover:text-white disabled:opacity-30 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs font-bold text-white px-2">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1 sm:p-1.5 text-[#A8A49C] hover:text-white cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Message if any */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Customer Inputs */}
              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-[#C7C2B8] mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#FFE072]" />
                    <span>{language === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: মোহাম্মদ তামিম রহমান' : 'e.g. Mohammad Tamim Rahman'}
                    className="w-full bg-[#181720] border border-[#2F2D3A] focus:border-[#D4AF37] text-sm text-white px-3.5 py-2.5 rounded-xl focus:outline-none transition-colors"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-medium text-[#C7C2B8] mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#FFE072]" />
                    <span>{language === 'bn' ? 'মোবাইল নম্বর (১১ ডিজিট) *' : 'Phone Number (11-digit) *'}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-[#181720] border border-[#2F2D3A] focus:border-[#D4AF37] text-sm text-white font-mono px-3.5 py-2.5 rounded-xl focus:outline-none transition-colors"
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-medium text-[#C7C2B8] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FFE072]" />
                    <span>{language === 'bn' ? 'পূর্ণ ডেলিভারি ঠিকানা *' : 'Full Delivery Address *'}</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={language === 'bn' ? 'বাসা নং, রোড নং/নাম, এলাকা/থানা, জেলা' : 'House no, Road name, Area/Thana, District'}
                    className="w-full bg-[#181720] border border-[#2F2D3A] focus:border-[#D4AF37] text-sm text-white px-3.5 py-2 rounded-xl focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Delivery Area Segment */}
                <div>
                  <label className="block text-xs font-medium text-[#C7C2B8] mb-1 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#FFE072]" />
                    <span>{language === 'bn' ? 'ডেলিভারি এরিয়া বেছে নিন' : 'Select Delivery Area'}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryRegion('dhaka')}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all cursor-pointer ${
                        deliveryRegion === 'dhaka'
                          ? 'bg-[#25231F] border-[#D4AF37] text-white shadow-sm'
                          : 'bg-[#181720] border-[#2A2834] text-[#8E8B83] hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{language === 'bn' ? 'ঢাকার ভিতরে' : 'Inside Dhaka'}</div>
                        <div className="text-[10px] text-[#A8A49C]">{language === 'bn' ? '২৪-৪৮ ঘণ্টার মধ্যে' : '24-48 Hours'}</div>
                      </div>
                      <span className="font-mono font-bold text-[#FFE072]">
                        {subtotal >= settings.freeDeliveryThreshold ? (language === 'bn' ? 'ফ্রি' : 'FREE') : formatBDT(settings.deliveryFeeDhaka)}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryRegion('outside')}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all cursor-pointer ${
                        deliveryRegion === 'outside'
                          ? 'bg-[#25231F] border-[#D4AF37] text-white shadow-sm'
                          : 'bg-[#181720] border-[#2A2834] text-[#8E8B83] hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{language === 'bn' ? 'ঢাকার বাইরে' : 'Outside Dhaka'}</div>
                        <div className="text-[10px] text-[#A8A49C]">{language === 'bn' ? '২-৩ দিনের মধ্যে' : '2-3 Days'}</div>
                      </div>
                      <span className="font-mono font-bold text-[#FFE072]">
                        {subtotal >= settings.freeDeliveryThreshold ? (language === 'bn' ? 'ফ্রি' : 'FREE') : formatBDT(settings.deliveryFeeOutside)}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Payment Option */}
                <div className="pt-1">
                  <div className="p-3 rounded-xl bg-[#15141C] border border-[#272633] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-white">
                        {language === 'bn' ? 'ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা দিন)' : 'Cash on Delivery (Pay upon delivery)'}
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Order Cost Breakdown */}
              <div className="pt-2 border-t border-[#23222B] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#A8A49C]">
                  <span>{language === 'bn' ? 'পণ্য মূল্য:' : 'Subtotal:'}</span>
                  <span className="font-mono text-white">{formatBDT(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#A8A49C]">
                  <span>{language === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                  <span className="font-mono text-white">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-400 font-bold">{language === 'bn' ? 'ফ্রি ডেলিভারি' : 'FREE'}</span>
                    ) : (
                      formatBDT(deliveryCharge)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-1 border-t border-[#23222B]">
                  <span>{language === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Total Payable:'}</span>
                  <span className="font-mono text-[#FFE072] text-lg font-black">{formatBDT(totalAmount)}</span>
                </div>
              </div>

              {/* HIGH-CONTRAST POP-OUT 1-CLICK ORDER BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FFE072] via-[#E8B931] to-[#D4A31C] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(232,185,49,0.55)] hover:shadow-[0_6px_35px_rgba(255,224,114,0.75)] hover:scale-[1.01] active:scale-95 transition-all cursor-pointer ring-2 ring-[#FFF4B8]/70 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>
                  {isSubmitting
                    ? (language === 'bn' ? 'অর্ডার প্রসেস হচ্ছে...' : 'Processing...')
                    : (language === 'bn' ? `অর্ডার নিশ্চিত করুন • ${formatBDT(totalAmount)}` : `Confirm Order • ${formatBDT(totalAmount)}`)}
                </span>
              </button>

              <p className="text-[10px] text-center text-[#7E7A72]">
                {language === 'bn'
                  ? '🔒 আপনার তথ্য ১০০% নিরাপদ ও সুরক্ষিত। কোনো হিডেন চার্জ নেই।'
                  : '🔒 100% Secure & Confidential. No advance fee required for COD.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
