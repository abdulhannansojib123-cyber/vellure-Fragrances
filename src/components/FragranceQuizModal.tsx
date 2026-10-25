import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { formatBDT } from '../utils/translations';
import { resolveImage } from '../utils/resolveImage';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  ShoppingBag,
  Zap,
  CheckCircle2,
  Compass,
  Trees,
  Flower2,
  Crown,
  Flame,
  Sun,
  Moon,
  Briefcase,
  HeartHandshake,
  Layers,
  ChevronRight
} from 'lucide-react';

interface QuizSelection {
  scentNote: 'fresh' | 'woody' | 'floral' | 'oriental' | 'gourmand' | null;
  occasion: 'daily' | 'prayers' | 'romantic' | 'office' | null;
  intensity: 'heavy' | 'moderate' | 'soft' | null;
}

export const FragranceQuizModal: React.FC = () => {
  const {
    isScentQuizOpen,
    closeScentQuiz,
    products,
    language,
    addToCart,
    openQuickOrder,
    navigateTo
  } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSize, setSelectedSize] = useState<'3ml' | '6ml'>('6ml');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const [answers, setAnswers] = useState<QuizSelection>({
    scentNote: null,
    occasion: null,
    intensity: null
  });

  // Reset quiz to step 1
  const handleReset = () => {
    setAnswers({
      scentNote: null,
      occasion: null,
      intensity: null
    });
    setCurrentStep(1);
    setSelectedSize('6ml');
    setAddedSuccess(false);
  };

  // Safe close
  const handleClose = () => {
    closeScentQuiz();
  };

  // Recommendation Engine Algorithm
  const recommendations = useMemo(() => {
    if (!products || products.length === 0) return { best: null, runnerUps: [] };

    const scoredProducts = products.map((prod) => {
      let score = 50; // base score

      const prodName = (prod.name + ' ' + prod.nameBn + ' ' + prod.slug).toLowerCase();
      const type = (prod.fragranceType || '').toLowerCase();
      const desc = ((prod.description || '') + ' ' + (prod.shortDescription || '') + ' ' + (prod.descriptionBn || '')).toLowerCase();
      const bestForText = ((prod.bestFor || '') + ' ' + (prod.bestForBn || '')).toLowerCase();
      const allNotes = [
        ...(prod.notes?.top || []),
        ...(prod.notes?.heart || []),
        ...(prod.notes?.base || [])
      ].join(' ').toLowerCase();

      // Step 1: Note preferences matching
      if (answers.scentNote === 'fresh') {
        if (type.includes('fresh') || type.includes('aquatic')) score += 35;
        if (allNotes.includes('bergamot') || allNotes.includes('marine') || allNotes.includes('mint') || allNotes.includes('lemon') || allNotes.includes('grapefruit')) score += 20;
        if (prodName.includes('cool water') || prodName.includes('blue de chanel') || prodName.includes('acqua')) score += 25;
      } else if (answers.scentNote === 'woody') {
        if (type.includes('woody') || type.includes('sandalwood')) score += 35;
        if (allNotes.includes('sandalwood') || allNotes.includes('cedar') || allNotes.includes('vetiver') || allNotes.includes('chandan')) score += 20;
        if (prodName.includes('royal sandal') || prodName.includes('white chandan') || prodName.includes('dark knight')) score += 25;
      } else if (answers.scentNote === 'floral') {
        if (type.includes('floral')) score += 35;
        if (allNotes.includes('rose') || allNotes.includes('jasmine') || allNotes.includes('lily') || allNotes.includes('taif')) score += 20;
        if (prodName.includes('rose oud') || prodName.includes('taif') || prodName.includes('bombshell')) score += 25;
      } else if (answers.scentNote === 'oriental') {
        if (type.includes('oud') || type.includes('oriental') || type.includes('amber')) score += 35;
        if (allNotes.includes('agarwood') || allNotes.includes('oud') || allNotes.includes('saffron') || allNotes.includes('amber')) score += 20;
        if (prodName.includes('oud al khaleej') || prodName.includes('royal oud') || prodName.includes('amber oud')) score += 25;
      } else if (answers.scentNote === 'gourmand') {
        if (type.includes('amber') || type.includes('oriental')) score += 30;
        if (allNotes.includes('vanilla') || allNotes.includes('honey') || allNotes.includes('praline') || allNotes.includes('cinnamon') || allNotes.includes('apple')) score += 25;
        if (prodName.includes('desire red') || prodName.includes('vampire blood') || prodName.includes('baccarat')) score += 25;
      }

      // Step 2: Occasion matching
      if (answers.occasion === 'daily') {
        if (bestForText.includes('daily') || bestForText.includes('casual') || bestForText.includes('campus')) score += 30;
        if (type.includes('fresh') || type.includes('musk')) score += 15;
      } else if (answers.occasion === 'prayers') {
        if (bestForText.includes('jummah') || bestForText.includes('prayer') || bestForText.includes('religious') || desc.includes('জুমার')) score += 35;
        if (prodName.includes('musk safi') || prodName.includes('white chandan') || prodName.includes('royal sandal') || prodName.includes('white musk')) score += 25;
      } else if (answers.occasion === 'romantic') {
        if (bestForText.includes('romantic') || bestForText.includes('evening') || bestForText.includes('party') || bestForText.includes('date')) score += 35;
        if (prodName.includes('desire red') || prodName.includes('vampire blood') || prodName.includes('rose oud') || prodName.includes('amber oud') || prodName.includes('dark knight')) score += 25;
      } else if (answers.occasion === 'office') {
        if (bestForText.includes('office') || bestForText.includes('formal') || bestForText.includes('meeting') || bestForText.includes('business')) score += 35;
        if (prodName.includes('blue de chanel') || prodName.includes('gentleman') || prodName.includes('royal sandal') || prodName.includes('royal oud')) score += 25;
      }

      // Step 3: Intensity matching
      const longevity = (prod.longevity || '').toLowerCase();
      const sillage = (prod.sillage || '').toLowerCase();
      if (answers.intensity === 'heavy') {
        if (longevity.includes('14') || longevity.includes('16') || longevity.includes('24') || longevity.includes('48')) score += 25;
        if (sillage.includes('heavy') || sillage.includes('dominant') || sillage.includes('regal')) score += 20;
      } else if (answers.intensity === 'moderate') {
        if (longevity.includes('10') || longevity.includes('12') || longevity.includes('14')) score += 25;
        if (sillage.includes('moderate') || sillage.includes('sophisticated') || sillage.includes('magnetic')) score += 20;
      } else if (answers.intensity === 'soft') {
        if (sillage.includes('soft') || sillage.includes('close') || sillage.includes('intimate') || sillage.includes('gentle') || sillage.includes('velvety')) score += 30;
        if (type.includes('musk') || prodName.includes('white chandan') || prodName.includes('musk safi')) score += 20;
      }

      // Boost featured / bestsellers for superior initial trust
      if (prod.bestSeller) score += 8;
      if (prod.rating >= 4.9) score += 5;

      return {
        product: prod,
        score
      };
    });

    // Sort descending by score
    scoredProducts.sort((a, b) => b.score - a.score);

    const best = scoredProducts[0]?.product || products[0];
    const runnerUps = scoredProducts.slice(1, 4).map(sp => sp.product);

    return { best, runnerUps };
  }, [products, answers]);

  if (!isScentQuizOpen) return null;

  const currentMatchScore = 98; // High luxury match index

  const handleSelectNote = (note: QuizSelection['scentNote']) => {
    setAnswers(prev => ({ ...prev, scentNote: note }));
    setCurrentStep(2);
  };

  const handleSelectOccasion = (occ: QuizSelection['occasion']) => {
    setAnswers(prev => ({ ...prev, occasion: occ }));
    setCurrentStep(3);
  };

  const handleSelectIntensity = (intensity: QuizSelection['intensity']) => {
    setAnswers(prev => ({ ...prev, intensity }));
    setCurrentStep(4);
  };

  const handleAddToCart = (product: Product, size: '3ml' | '6ml') => {
    addToCart(product, size, 1);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleQuickOrder = (product: Product, size: '3ml' | '6ml') => {
    closeScentQuiz();
    openQuickOrder(product, size, 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Fragrance Quiz / Scent Finder"
    >
      {/* Dimmed backdrop with blur */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity animate-fade-in"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-[#0F0D17] border border-[#D4AF37]/35 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.18)] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] z-10 animate-scale-up">
        {/* Subtle royal ambiance glow in top corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7A3EB0]/15 blur-[90px] rounded-full pointer-events-none" />

        {/* Modal Header */}
        <div className="relative px-5 py-4 border-b border-[#25222E] bg-[#14121E]/80 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] flex items-center justify-center text-black shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37] block leading-none">
                VELLURE ATELIER
              </span>
              <h2 className="font-serif text-base sm:text-lg text-[#F3EFEA] font-medium leading-tight mt-0.5">
                {language === 'bn' ? 'সুবাস ফাইন্ডার কুইজ' : 'Fragrance Scent Finder'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset Quiz"
                className="p-2 rounded-xl text-[#8E8B83] hover:text-[#D4AF37] hover:bg-[#1E1C27] transition-colors cursor-pointer"
                aria-label="Reset Quiz"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-xl text-[#8E8B83] hover:text-white hover:bg-[#1E1C27] transition-colors cursor-pointer"
              aria-label="Close Quiz"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar (Steps 1 to 3) */}
        {currentStep <= 3 && (
          <div className="px-5 py-2.5 bg-[#12101B] border-b border-[#201D29] flex items-center justify-between gap-3 shrink-0">
            <div className="flex-1 flex gap-1.5">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                    step < currentStep
                      ? 'bg-[#D4AF37]'
                      : step === currentStep
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFE072] shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                      : 'bg-[#221F2D]'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-[#D4AF37] font-semibold whitespace-nowrap">
              {language === 'bn' ? `ধাপ ${currentStep} / ৩` : `Step ${currentStep} of 3`}
            </span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {/* STEP 1: Scent Note Preference */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  STEP 1 • OLFACTORY PROFILE
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F3EFEA] font-medium">
                  {language === 'bn'
                    ? 'কোন ধরণের সুবাসের নোট আপনার সবচেয়ে প্রিয়?'
                    : 'What fragrance notes speak to your soul?'}
                </h3>
                <p className="text-xs text-[#9D988F]">
                  {language === 'bn'
                    ? 'যে ধরণের সুবাসের ঘ্রাণ আপনাকে সবচেয়ে বেশি মুগ্ধ ও প্রাণবন্ত করে তোলে।'
                    : 'Select the olfactory character you naturally gravitate toward.'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {[
                  {
                    id: 'fresh' as const,
                    icon: Compass,
                    title: 'Fresh & Aquatic',
                    titleBn: 'সতেজ ও সামুদ্রিক (Fresh & Aquatic)',
                    desc: 'Crisp ocean breeze, chilled citrus, iced mint & revitalizing bergamot.',
                    descBn: 'সাগরের নির্মল বাতাস, সতেজ লেবু, মিন্ট ও প্রশান্তিদায়ক কুলিং সুবাস।',
                    highlight: 'Grapefruit • Marine • Mint'
                  },
                  {
                    id: 'woody' as const,
                    icon: Trees,
                    title: 'Woody & Sandalwood',
                    titleBn: 'কাষ্ঠল ও রাজকীয় চন্দন (Woody & Sandalwood)',
                    desc: 'Aged Mysore sandalwood, warm cedarwood & earthy soothing vetiver.',
                    descBn: 'শত বছরের প্রাচীন মহীশূর চন্দন, সিডারউড ও মাটির স্নিগ্ধ আভিজাত্য।',
                    highlight: 'Mysore Sandal • Cedar • Earthy Vetiver'
                  },
                  {
                    id: 'floral' as const,
                    icon: Flower2,
                    title: 'Floral & Romantic',
                    titleBn: 'মিষ্টি ও রোমান্টিক ফুল (Floral & Romantic)',
                    desc: 'Velvety mountain Ward Taifi roses, night jasmine & pure orange blossom.',
                    descBn: 'তাঈফি গোলাপের পাপড়ি, বুনো জুঁই ও মিষ্টি মোলায়েম ফুলের সুবাস।',
                    highlight: 'Taif Rose • Jasmine • White Lily'
                  },
                  {
                    id: 'oriental' as const,
                    icon: Crown,
                    title: 'Oriental & Royal Oud',
                    titleBn: 'প্রাচ্য ও রাজকীয় উদ (Oriental & Royal Oud)',
                    desc: 'Rare Cambodian agarwood, Persian saffron threads & rich dark amber.',
                    descBn: 'ক্যাম্বোডিয়ান খাঁটি আগরউড, জাফরানের রাজকীয় সুবাস ও ধোঁয়াটে অ্যাম্বার।',
                    highlight: 'Cambodian Oud • Saffron • Black Amber'
                  },
                  {
                    id: 'gourmand' as const,
                    icon: Flame,
                    title: 'Gourmand & Warm Sweet',
                    titleBn: 'মিষ্টি ভ্যানিলা ও অ্যাম্বার (Gourmand & Sweet)',
                    desc: 'Mouthwatering Madagascar vanilla, crisp red apple, caramelized honey & tonka.',
                    descBn: 'মধু, মাদাগাস্কার ভ্যানিলা বিন, রসালো আপেল ও মধুর মিষ্টি মাদকতা।',
                    highlight: 'Bourbon Vanilla • Honeyed Amber • Red Apple'
                  }
                ].map((item) => {
                  const isSelected = answers.scentNote === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectNote(item.id)}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex items-start gap-3.5 cursor-pointer relative group ${
                        isSelected
                          ? 'bg-[#1D1929] border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                          : 'bg-[#13111B] border-[#25222E] hover:border-[#D4AF37]/50 hover:bg-[#181522]'
                      }`}
                    >
                      <div className="p-2.5 rounded-xl bg-[#1C1826] border border-[#2B2738] group-hover:border-[#D4AF37]/40 text-[#D4AF37] shrink-0 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-serif text-sm sm:text-base font-semibold text-[#F3EFEA] group-hover:text-[#FFE072] transition-colors">
                            {language === 'bn' ? item.titleBn : item.title}
                          </h4>
                          <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/20 whitespace-nowrap hidden sm:inline">
                            {item.highlight}
                          </span>
                        </div>
                        <p className="text-xs text-[#9D988F] mt-1 leading-relaxed">
                          {language === 'bn' ? item.descBn : item.desc}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#7A766F] group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all self-center shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Occasion & Timing */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  STEP 2 • OCCASION & SETTING
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F3EFEA] font-medium">
                  {language === 'bn'
                    ? 'আতরটি মূলত কখন বা কোথায় ব্যবহার করতে চান?'
                    : 'Where do you plan to wear this fragrance?'}
                </h3>
                <p className="text-xs text-[#9D988F]">
                  {language === 'bn'
                    ? 'আপনার পরিবেশ ও উপস্থিতির সাথে একদম নিখুঁত মিল পেতে নির্বাচন করুন।'
                    : 'Match the perfect mood, aura, and setting for your signature scent.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    id: 'daily' as const,
                    icon: Sun,
                    title: 'Daily Casual & Campus',
                    titleBn: 'দৈনন্দিন ব্যবহার ও আড্ডা',
                    desc: 'Clean, effortless, vibrant & refreshing all day long.',
                    descBn: 'সারাদিন প্রাণবন্ত ও সতেজ থাকার মতো সহজ ও পরিপাটি সুবাস।'
                  },
                  {
                    id: 'prayers' as const,
                    icon: HeartHandshake,
                    title: 'Jumu\'ah, Mosque & Prayers',
                    titleBn: 'জুমার নামাজ ও ইবাদত',
                    desc: 'Sacred, peaceful, calming pure non-alcoholic spiritual presence.',
                    descBn: 'পবিত্র, শান্ত, অ্যালকোহলমুক্ত ও পরম আধ্যাত্মিক প্রশান্তিময় সুবাস।'
                  },
                  {
                    id: 'romantic' as const,
                    icon: Moon,
                    title: 'Romantic Evening & Parties',
                    titleBn: 'রোমান্টিক সন্ধ্যা ও পার্টি',
                    desc: 'Magnetic, passionate, seductive & intensely captivating aura.',
                    descBn: 'আকর্ষণীয়, সম্মোহনী ও ভিড়ের মাঝে নজর কাড়ার মতো আত্মবিশ্বাসী সুবাস।'
                  },
                  {
                    id: 'office' as const,
                    icon: Briefcase,
                    title: 'Executive Office & Meetings',
                    titleBn: 'অফিস ও বিজনেস মিটিং',
                    desc: 'Commanding, dignified, sharp & authoritative elegance.',
                    descBn: 'গম্ভীর, রুচিশীল ও মার্জিত ব্যক্তিত্ব প্রকাশের মতো প্রফেশনাল ভাইব।'
                  }
                ].map((item) => {
                  const isSelected = answers.occasion === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectOccasion(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-[#1D1929] border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                          : 'bg-[#13111B] border-[#25222E] hover:border-[#D4AF37]/50 hover:bg-[#181522]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="p-2.5 rounded-xl bg-[#1C1826] border border-[#2B2738] group-hover:border-[#D4AF37]/40 text-[#D4AF37] transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="w-5 h-5 rounded-full border border-[#3A3644] flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]">
                          <Check className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      </div>
                      <div>
                        <h4 className="font-serif text-sm sm:text-base font-semibold text-[#F3EFEA] group-hover:text-[#FFE072] transition-colors">
                          {language === 'bn' ? item.titleBn : item.title}
                        </h4>
                        <p className="text-xs text-[#9D988F] mt-1 leading-relaxed">
                          {language === 'bn' ? item.descBn : item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Actions */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl text-xs text-[#8E8B83] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'আগের ধাপ' : 'Previous Step'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Intensity & Sillage */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  STEP 3 • INTENSITY & PROJECTION
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F3EFEA] font-medium">
                  {language === 'bn'
                    ? 'সুবাসের তীব্রতা ও স্থায়িত্ব কেমন পছন্দ করেন?'
                    : 'What projection level do you desire?'}
                </h3>
                <p className="text-xs text-[#9D988F]">
                  {language === 'bn'
                    ? 'আপনার সুবাসের বিস্তার কত দূর পৌঁছাবে তা নির্ধারণ করুন।'
                    : 'Choose how bold or intimate you want your fragrance trail to be.'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {[
                  {
                    id: 'heavy' as const,
                    badge: '18-24+ Hours Longevity',
                    badgeBn: '১৮-২৪+ ঘণ্টা স্থায়ী',
                    title: 'Ultra-Longlasting & Dominant Projection',
                    titleBn: 'ভারী ও দীর্ঘস্থায়ী বিস্তার (Heavy & Dominant)',
                    desc: 'Regal sillage that commands presence, turns heads in any crowd, and lingers for multiple days on fabrics.',
                    descBn: 'তীব্র রাজকীয় সুবাস যা ভিড়ের মাঝেও আপনার স্পষ্ট উপস্থিতি জানান দেয় এবং পোশাকে কয়েকদিন টিকে থাকে।'
                  },
                  {
                    id: 'moderate' as const,
                    badge: '10-16 Hours Longevity',
                    badgeBn: '১০-১৬ ঘণ্টা স্থায়ী',
                    title: 'Moderate & Balanced Vitality',
                    titleBn: 'ব্যালেন্সড ও পরিমিত বিস্তার (Moderate & Fresh)',
                    desc: 'Sophisticated, pleasant projection within an arm’s length. Effortlessly refined and universally appreciated.',
                    descBn: 'মার্জিত ও চমৎকার বিস্তার যা আশেপাশের সবাইকে আনন্দিত করে কিন্তু কখনো অস্বস্তিকর বা কড়া লাগে না।'
                  },
                  {
                    id: 'soft' as const,
                    badge: '8-12 Hours Longevity',
                    badgeBn: '৮-১২ ঘণ্টা স্থায়ী',
                    title: 'Soft, Powdery & Intimate Presence',
                    titleBn: 'কোমল, পাউডারি ও শান্ত বিস্তার (Soft & Intimate)',
                    desc: 'Stays close to skin, creates a soothing cloud of clean white musk and gentle florals with zero sharp edges.',
                    descBn: 'শরীরের সাথে মিশে থাকা অত্যন্ত মোলায়েম ও শান্ত স্বর্গীয় স্নিগ্ধতা যা আপনাকে দেবে দিনভর মানসিক প্রশান্তি।'
                  }
                ].map((item) => {
                  const isSelected = answers.intensity === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectIntensity(item.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-[#1D1929] border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                          : 'bg-[#13111B] border-[#25222E] hover:border-[#D4AF37]/50 hover:bg-[#181522]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-sm sm:text-base font-semibold text-[#F3EFEA] group-hover:text-[#FFE072] transition-colors">
                            {language === 'bn' ? item.titleBn : item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#9D988F] leading-relaxed max-w-md">
                          {language === 'bn' ? item.descBn : item.desc}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#FFE072]">
                          {language === 'bn' ? item.badgeBn : item.badge}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#7A766F] group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Actions */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl text-xs text-[#8E8B83] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'আগের ধাপ' : 'Previous Step'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION RESULT */}
          {currentStep === 4 && recommendations.best && (
            <div className="space-y-6 animate-fade-in">
              {/* Celebration Banner */}
              <div className="text-center space-y-1.5 bg-gradient-to-r from-[#171324] via-[#211B34] to-[#171324] border border-[#D4AF37]/40 p-4 rounded-2xl relative overflow-hidden shadow-lg">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFE072] text-[11px] font-mono font-bold tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentMatchScore}% MATCH ACCORDING TO YOUR TASTE</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F3EFEA] font-medium pt-1">
                  {language === 'bn' ? 'আপনার জন্য নির্বাচিত সিগনেচার সুবাস' : 'Your Artisanal Signature Fragrance'}
                </h3>
                <p className="text-xs text-[#A8A49C] max-w-md mx-auto">
                  {language === 'bn'
                    ? 'আপনার পছন্দের নোট, পরিবেশ ও স্থায়িত্বের বৈশিষ্ট্যের সাথে এটি সবচেয়ে নিখুঁতভাবে মিলে গেছে।'
                    : 'Meticulously distilled and matched to your chosen notes, occasion, and projection.'}
                </p>
              </div>

              {/* Primary Recommended Card */}
              <div className="bg-[#14121E] border-2 border-[#D4AF37]/60 rounded-3xl p-4 sm:p-6 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] relative overflow-hidden group">
                {/* Gold Glow Aura */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4AF37]/15 blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {/* Flacon Showcase Image */}
                  <div className="sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-[#1A1826] border border-[#D4AF37]/40 p-1.5 shadow-inner">
                    <img
                      src={resolveImage(recommendations.best.images[0])}
                      alt={recommendations.best.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                    />
                    {recommendations.best.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-[#D4AF37] text-black font-bold text-[10px] uppercase font-mono px-2 py-0.5 rounded shadow">
                        {recommendations.best.discount}% OFF
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md text-[10px] text-[#FFE072] font-mono px-2 py-0.5 rounded border border-[#D4AF37]/30">
                      100% Pure Attar
                    </span>
                  </div>

                  {/* Product Details & Purchase Form */}
                  <div className="sm:col-span-7 space-y-3.5">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-[#D4AF37] font-semibold uppercase tracking-wider">
                        <span>{recommendations.best.categoryBn || recommendations.best.category}</span>
                        <span>•</span>
                        <span>{recommendations.best.fragranceType}</span>
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl text-[#F3EFEA] font-bold mt-0.5 group-hover:text-[#FFE072] transition-colors">
                        {language === 'bn' ? recommendations.best.nameBn : recommendations.best.name}
                      </h4>
                      <p className="text-xs text-[#A8A49C] line-clamp-2 mt-1 leading-relaxed">
                        {language === 'bn'
                          ? recommendations.best.shortDescriptionBn || recommendations.best.shortDescription
                          : recommendations.best.shortDescription}
                      </p>
                    </div>

                    {/* Bottle Size Selector */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-[#8E8B83] uppercase tracking-wider font-semibold block">
                        {language === 'bn' ? 'বোতলের সাইজ নির্বাচন করুন:' : 'Select Flacon Size:'}
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {(['3ml', '6ml'] as const).map((size) => {
                          const price = size === '3ml' ? recommendations.best.price3ml : recommendations.best.price6ml;
                          const origPrice = size === '3ml' ? recommendations.best.originalPrice3ml : recommendations.best.originalPrice6ml;
                          const isSel = selectedSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setSelectedSize(size)}
                              className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-[#211B2C] border-[#D4AF37] ring-1 ring-[#D4AF37] text-white shadow-sm'
                                  : 'bg-[#161420] border-[#2C2938] text-[#8E8B83] hover:text-white'
                              }`}
                            >
                              <span className="text-xs font-bold block">{size} Flacon</span>
                              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                                <span className="text-xs font-mono font-bold text-[#FFE072]">
                                  {formatBDT(price)}
                                </span>
                                {origPrice > price && (
                                  <span className="text-[10px] font-mono line-through text-[#66635D]">
                                    {formatBDT(origPrice)}
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Olfactory Pyramid Micro-Preview */}
                    <div className="p-2.5 rounded-xl bg-[#100E17] border border-[#23202E] text-[11px] text-[#A8A49C] space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#D4AF37] font-semibold text-[10px] uppercase">Notes:</span>
                        <span className="truncate">
                          {recommendations.best.notes.top.slice(0, 2).join(', ')} • {recommendations.best.notes.heart.slice(0, 2).join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-[#706D67] font-mono">
                        <span>⏳ {recommendations.best.longevityBn || recommendations.best.longevity}</span>
                      </div>
                    </div>

                    {/* Instant Direct Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {/* 1-Click Quick Order */}
                      <button
                        type="button"
                        onClick={() => handleQuickOrder(recommendations.best, selectedSize)}
                        className="w-full py-3 px-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.4)] active:scale-95"
                      >
                        <Zap className="w-4 h-4 fill-black" />
                        <span>{language === 'bn' ? '১-ক্লিকে দ্রুত অর্ডার' : '1-Click Quick Order'}</span>
                      </button>

                      {/* Add to Bag */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(recommendations.best, selectedSize)}
                        className="w-full py-3 px-4 bg-[#231F30] hover:bg-[#2C273C] border border-[#D4AF37]/40 text-[#F3EFEA] font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                        <span>
                          {addedSuccess
                            ? (language === 'bn' ? 'ব্যাগে যুক্ত হয়েছে!' : 'Added to Bag!')
                            : (language === 'bn' ? 'শপিং ব্যাগে যোগ' : 'Add to Bag')}
                        </span>
                      </button>
                    </div>

                    {/* Secondary Link to Product Story */}
                    <div className="pt-1 text-center sm:text-left">
                      <button
                        type="button"
                        onClick={() => {
                          closeScentQuiz();
                          navigateTo('product', { slug: recommendations.best.slug });
                        }}
                        className="text-[11px] text-[#C5A059] hover:text-[#FFE072] underline cursor-pointer inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{language === 'bn' ? 'আতরটির সম্পূর্ণ বর্ণনা ও রিভিউ দেখুন' : 'Explore full fragrance notes and customer reviews'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Runner-up / Alternative Recommendations */}
              {recommendations.runnerUps.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between border-t border-[#25222E] pt-4">
                    <span className="text-xs uppercase font-serif tracking-wider text-[#C5A059] font-medium flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{language === 'bn' ? 'বিকল্প দারুণ কিছু পছন্দ' : 'Other Close Matches You May Love'}</span>
                    </span>
                    <span className="text-[10px] text-[#78756F]">91%-95% Match</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {recommendations.runnerUps.map((altProd) => (
                      <div
                        key={altProd.id}
                        className="p-3 rounded-2xl bg-[#13111B] border border-[#25222E] hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group"
                      >
                        <div className="flex gap-2.5 items-center">
                          <img
                            src={resolveImage(altProd.images[0])}
                            alt={altProd.name}
                            className="w-12 h-12 rounded-xl object-cover bg-[#1A1826] border border-[#2D2A3A] shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h5 className="font-serif text-xs font-semibold text-[#F3EFEA] group-hover:text-[#FFE072] transition-colors truncate">
                              {language === 'bn' ? altProd.nameBn : altProd.name}
                            </h5>
                            <span className="text-[10px] text-[#8E8B83] block truncate">
                              {altProd.fragranceType} • {altProd.categoryBn || altProd.category}
                            </span>
                            <span className="text-xs font-mono font-bold text-[#D4AF37] block mt-0.5">
                              {formatBDT(altProd.price3ml)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 pt-2.5 mt-2 border-t border-[#201D29]">
                          <button
                            type="button"
                            onClick={() => handleQuickOrder(altProd, '3ml')}
                            className="py-1 px-1.5 bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#FFE072] hover:text-black rounded-lg text-[10px] font-bold transition-colors cursor-pointer text-center truncate"
                          >
                            Quick Order
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              closeScentQuiz();
                              navigateTo('product', { slug: altProd.slug });
                            }}
                            className="py-1 px-1.5 bg-[#1C1A26] hover:bg-[#282536] text-[#A8A49C] hover:text-white rounded-lg text-[10px] transition-colors cursor-pointer text-center truncate"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Retake Button */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl border border-[#2E2B3A] hover:border-[#D4AF37] text-xs text-[#A8A49C] hover:text-[#FFE072] transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কুইজ পুনরায় দিন' : 'Retake Scent Quiz'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
