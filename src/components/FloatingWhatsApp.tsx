import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X, Send, Sparkles, Phone, MessageSquare, ExternalLink, Flame, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const { settings, language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  // Curated Fragrance Recommendation Presets
  const recommendationTopics = [
    {
      id: 'oud',
      icon: '👑',
      labelBn: 'রাজকীয় উড ও আম্বার ঘ্রাণ',
      labelEn: 'Royal Oud & Amber',
      queryBn: 'আসসালামু আলাইকুম! আমি তীব্র ও রাজকীয় উড/আম্বার আতরের রেকমেন্ডেশন চাই। আপনাদের বেস্ট কালেকশন কোনটা?',
      queryEn: 'Hello! I am looking for rich and royal Oud & Amber attars. What are your top recommendations?'
    },
    {
      id: 'floral',
      icon: '🌸',
      labelBn: 'মিষ্টি, সফট ও স্নিগ্ধ ফুলেল সুবাস',
      labelEn: 'Sweet & Soft Floral',
      queryBn: 'আসসালামু আলাইকুম! আমি মিষ্টি, সফট ও প্রশান্তিদায়ক সুবাস পছন্দ করি। আমার জন্য কোন আতরটি পারফেক্ট হবে?',
      queryEn: 'Hello! I prefer soft, sweet, and soothing floral aromas. Which attar would you recommend for me?'
    },
    {
      id: 'formal',
      icon: '👔',
      labelBn: 'অফিস ও লং-লাস্টিং ফরমাল আতর',
      labelEn: 'Office & Formal Wear',
      queryBn: 'আসসালামু আলাইকুম! অফিস ও প্রতিদিনের ব্যবহারের জন্য ১৮+ ঘণ্টা স্থায়ী ফ্রেশ আতর নিতে চাই। সাজেস্ট করবেন?',
      queryEn: 'Hello! I need a long-lasting, sophisticated attar for daily office wear. Please suggest the best one.'
    },
    {
      id: 'gift',
      icon: '🎁',
      labelBn: 'উপহারের সেরা কম্বো গিফট সেট',
      labelEn: 'Best Gift Combo Pack',
      queryBn: 'আসসালামু আলাইকুম! কাউকে উপহার দেওয়ার জন্য লাক্সারি কম্বো প্যাক বা গিফট বক্সের ব্যাপারে জানতে চাই।',
      queryEn: 'Hello! I would like to inquire about your exclusive luxury combo packs and gift sets for gifting.'
    },
    {
      id: 'tracking',
      icon: '📦',
      labelBn: 'অর্ডার ও ডেলিভারি তথ্য',
      labelEn: 'Track Order & Support',
      queryBn: 'আসসালামু আলাইকুম! আমি আমার অর্ডার এবং ডেলিভারি সম্পর্কে জানতে চাই।',
      queryEn: 'Hello! I would like to inquire about my order and delivery status.'
    }
  ];

  const handleOpenWhatsApp = (messageText: string) => {
    trackEvent('whatsapp_click', {
      source: 'floating_concierge',
      language,
      messageSnippet: messageText.slice(0, 30),
      targetNumber: cleanNumber,
    });

    const encoded = encodeURIComponent(messageText);
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenMessenger = () => {
    trackEvent('messenger_click', {
      source: 'floating_concierge',
      language,
    });

    // Messenger link: uses Facebook handle or m.me/vellure
    const fbUser = settings.facebook ? settings.facebook.replace(/.*facebook\.com\//, '').replace(/\/$/, '') : 'vellure.bd';
    const messengerUrl = `https://m.me/${fbUser || 'vellure'}`;
    window.open(messengerUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    handleOpenWhatsApp(customMessage.trim());
    setCustomMessage('');
  };

  const defaultGreeting = language === 'bn'
    ? 'আসসালামু আলাইকুম ভ্যালুর! আমি আপনাদের আতর ও পারফিউমের বিষয়ে জানতে চাই।'
    : 'Hello VELLURE! I would like to inquire about your luxury attars and fragrances.';

  return (
    <>
      {/* Interactive Concierge Chat Box Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Fragrance Concierge Chat"
          className="fixed bottom-[84px] md:bottom-24 right-3 sm:right-6 md:right-8 z-50 w-[calc(100vw-24px)] sm:w-[380px] max-w-[400px] bg-[#121118] border border-[#D4AF37]/50 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col animate-scale-up"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#191823] via-[#1F1E2C] to-[#15141C] p-4 border-b border-[#2C2A3A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5E096] p-0.5 shadow-md">
                  <div className="w-full h-full rounded-full bg-[#0E0D12] flex items-center justify-center text-xs font-serif font-black text-[#FFE072]">
                    V
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#121118]" />
              </div>

              <div>
                <h4 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                  <span>VELLURE Concierge</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#FFE072]" />
                </h4>
                <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{language === 'bn' ? 'অনলাইন আছেন (১ মিনিটে রিপ্লাই)' : 'Active Now • Fast Response'}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-[#201F2B] hover:bg-[#2C2B3C] text-[#8E8B83] hover:text-white transition-colors cursor-pointer"
              aria-label="Close Concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto bg-[#0E0D12]">
            {/* Atelier Concierge Welcome Bubble */}
            <div className="flex gap-2.5 items-start">
              <div className="w-7 h-7 rounded-full bg-[#21202B] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[10px] text-[#FFE072] font-serif">
                V
              </div>
              <div className="bg-[#181722] border border-[#2B2938] rounded-2xl rounded-tl-none p-3.5 text-xs text-[#E8E4DA] leading-relaxed shadow-sm space-y-1.5">
                <p className="font-semibold text-white">
                  {language === 'bn' ? 'আসসালামু আলাইকুম! ভ্যালুরে স্বাগতম।' : 'Greetings & Welcome to VELLURE.'}
                </p>
                <p className="text-[#A8A49C]">
                  {language === 'bn'
                    ? 'আপনার পছন্দের নোট বা পার্সোনাল রেকমেন্ডেশন পেতে নিচের যে কোনো বিষয়ে ক্লিক করুন অথবা সরাসরি চ্যাট করুন:'
                    : 'Looking for a bespoke recommendation or notes guide? Select a topic below or chat directly:'}
                </p>
              </div>
            </div>

            {/* Quick Fragrance Recommendation Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#A88B46] font-bold block px-1">
                {language === 'bn' ? '⚡ দ্রুত পরামর্শের জন্য সিলেক্ট করুন:' : '⚡ Select a topic for instant advice:'}
              </span>

              <div className="grid grid-cols-1 gap-1.5">
                {recommendationTopics.map((topic) => {
                  const label = language === 'bn' ? topic.labelBn : topic.labelEn;
                  const query = language === 'bn' ? topic.queryBn : topic.queryEn;

                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleOpenWhatsApp(query)}
                      className="w-full p-2.5 rounded-xl bg-[#171620] hover:bg-[#22202E] border border-[#2A2838] hover:border-[#D4AF37]/60 text-left transition-all duration-200 flex items-center justify-between text-xs text-[#F3EFEA] hover:text-[#FFE072] group/topic cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{topic.icon}</span>
                        <span className="font-medium group-hover/topic:translate-x-0.5 transition-transform">
                          {label}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#7E7A72] group-hover/topic:text-[#FFE072] shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Direct WhatsApp & Messenger */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={() => handleOpenWhatsApp(defaultGreeting)}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </button>

              {/* Messenger Button */}
              <button
                type="button"
                onClick={handleOpenMessenger}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Messenger</span>
              </button>
            </div>

            {/* Direct Phone Call option */}
            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="block text-center py-2 rounded-xl bg-[#17161F] hover:bg-[#22212B] border border-[#2A2834] text-[11px] font-medium text-[#C7C2B8] hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 inline-block mr-1 text-[#FFE072]" />
                <span>{language === 'bn' ? `সরাসরি কল দিন: ${settings.phone}` : `Call Concierge: ${settings.phone}`}</span>
              </a>
            )}
          </div>

          {/* Custom Message Input Footer */}
          <form onSubmit={handleSubmitCustom} className="p-3 bg-[#15141D] border-t border-[#262432] flex items-center gap-2">
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder={language === 'bn' ? 'আপনার প্রশ্নটি লিখুন...' : 'Type your question...'}
              className="flex-1 bg-[#1F1E29] border border-[#302E3D] focus:border-[#D4AF37] text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none placeholder-[#706C64]"
            />
            <button
              type="submit"
              disabled={!customMessage.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#FFE072] to-[#D4A31C] text-black font-bold disabled:opacity-40 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button on bottom-right */}
      <aside
        aria-label="Support & Fragrance Concierge"
        className="fixed bottom-[74px] md:bottom-8 right-3 sm:right-6 md:right-8 z-40 flex items-center gap-2"
      >
        {/* Tooltip / Prompt bubble on desktop (visible when closed) */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#15141E]/95 border border-[#D4AF37]/50 text-xs font-semibold text-[#FFE072] shadow-xl hover:border-[#D4AF37] transition-all cursor-pointer hover:scale-105 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFE072] animate-pulse" />
            <span>{language === 'bn' ? 'সুবাস পরামর্শ ও লাইভ চ্যাট' : 'Scent Advice & Chat'}</span>
          </button>
        )}

        {/* Floating Bubble Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(16,185,129,0.35)] cursor-pointer hover:scale-110 active:scale-95 ${
            isOpen
              ? 'bg-[#2A2938] text-white border-2 border-[#D4AF37]'
              : 'bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white border-2 border-[#FFE072]/80 hover:shadow-[0_0_25px_rgba(255,224,114,0.6)]'
          }`}
          aria-label={isOpen ? 'Close chat' : 'Open WhatsApp Fragrance Concierge'}
        >
          {/* Subtle Ambient Pulse Ring */}
          {!isOpen && (
            <>
              <span className="absolute -inset-1 rounded-full bg-emerald-500/25 blur-sm animate-pulse pointer-events-none" />
              <span className="absolute inset-0 rounded-full border border-emerald-400/50 animate-[ping_3.5s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
            </>
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-[#FFE072]" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
              {/* Unread consultation ping badge */}
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FFE072] ring-2 ring-[#0B0B0C] animate-pulse" />
            </div>
          )}
        </button>
      </aside>
    </>
  );
};
