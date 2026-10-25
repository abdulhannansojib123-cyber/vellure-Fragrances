import { Product, SiteSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "prod-armani-blue",
    "slug": "armani-blue",
    "name": "Vellure Armani Blue",
    "nameBn": "ভ্যালুর আরমানি ব্লু",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Aquatic",
    "shortDescription": "An electrifying plunge into azure ocean waves, crowned with crisp Italian bergamot and magnetic Mediterranean woods that command silent admiration.",
    "shortDescriptionBn": "নীল সমুদ্রের উত্তাল সতেজতা ও অভিজাত ইতালীয় বার্গামটের এক সম্মোহনী মেলবন্ধন। যার প্রথম ছোঁয়াতেই মন চাঙ্গা হয়ে ওঠে এবং দিনভর পুরুষোচিত রাজকীয় ব্যক্তিত্ব প্রকাশ পায়।",
    "description": "Armani Blue is crafted for the modern man who exudes calm authority and magnetic charisma. The fragrance opens with an invigorating burst of sparkling Mediterranean bergamot, chilled sea salt spray, and sun-ripened mandarin that instantly awakens the senses. As it settles into the skin and fabric, aromatic lavender, crushed rosemary, and maritime minerals create an unmistakable aura of crisp luxury. The dry-down is intoxicatingly smooth—cedarwood, velvety ambergris, and warm tonka bean that linger on your attire for over 18 hours. Whether in high-stakes corporate meetings, casual summer getaways, or intimate evenings, Armani Blue guarantees unforgettable compliments.",
    "descriptionBn": "ভ্যালুর আরমানি ব্লু হলো মুক্ত আকাশের স্নিগ্ধতা আর গভীর সমুদ্রের রোমাঞ্চকর সতেজতার এক অনন্য মাস্টারপিস। এটি ব্যবহারের সাথে সাথেই সতেজ বার্গামট, পাকা ম্যান্ডারিন ও সমুদ্রের শীতল বাতাসের এক তীব্র বিস্ফোরণ আপনাকে সতেজ ও প্রাণবন্ত করে তুলবে। ধীরে ধীরে এটি ফরাসি ল্যাভেন্ডার ও সুগন্ধি রোজমেরির এক মার্জিত ও আভিজাত্যপূর্ণ সুরভি ছড়ায়। আর সারাদিনের শেষে খাঁটি সিডারউড, অ্যাম্বারগ্রিস ও টংকা বিনের উষ্ণ মায়াবী ছোঁয়া কাপড়ে ১৮+ ঘণ্টা ধরে এক অমলিন রাজকীয় ছাপ রেখে যায়। অফিসে মিটিং থেকে শুরু করে বন্ধুবান্ধবদের সাথে আড্ডা—সব পরিবেশে আপনাকে অন্যদের চেয়ে আলাদা ও আকর্ষণীয় করে তুলতে আরমানি ব্লুর জুড়ি নেই।",
    "price3ml": 220,
    "price6ml": 400,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 50,
    "stock3ml": 25,
    "stock6ml": 25,
    "sku": "VLR-ATT-ARM01",
    "featured": true,
    "bestSeller": true,
    "newArrival": true,
    "rating": 4.9,
    "reviewsCount": 48,
    "images": [
      "/src/assets/images/product_vellure_armani_blue_1.jpg",
      "/src/assets/images/product_vellure_armani_blue_6ml.jpg",
      "/src/assets/images/product_vellure_armani_blue_3.jpg"
    ],
    "notes": {
      "top": [
        "Bergamot",
        "Mandarin"
      ],
      "topBn": [
        "বার্গামট",
        "ম্যান্ডারিন"
      ],
      "heart": [
        "Rosemary",
        "Lavender"
      ],
      "heartBn": [
        "রোজমেরি",
        "ল্যাভেন্ডার"
      ],
      "base": [
        "Tonka Bean",
        "Cedarwood"
      ],
      "baseBn": [
        "টংকা বিন",
        "সিডারউড"
      ]
    },
    "longevity": "12-16 Hours",
    "longevityBn": "১২-১৬ ঘণ্টা পর্যন্ত স্থায়ী",
    "sillage": "Luminous & Clean Projection",
    "sillageBn": "উজ্জ্বল ও স্নিগ্ধ সুবাস",
    "origin": "VELLURE Artisanal Reserve",
    "originBn": "ভেল্যুর আর্টিশানাল রিজার্ভ ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Daily casual wear, university & hangout",
    "bestForBn": "ডেইলি ক্যাজুয়াল ওয়্যার, বন্ধুদের সাথে আড্ডা বা ইউনিভার্সিটিতে যাওয়ার সময়।",
    "bestWeather": "Summer & Humid/Monsoon",
    "bestWeatherBn": "গরমের দিন এবং আর্দ্র (Humid/Monsoon) আবহাওয়ায় এটি সারাদিন সতেজ রাখবে।",
    "seasons": [
      "Summer",
      "Monsoon"
    ]
  },
  {
    "id": "prod-blue-de-chanel",
    "slug": "blue-de-chanel",
    "name": "Vellure Blue De Chanel",
    "nameBn": "ভ্যালুর ব্লু ডি চ্যানেল",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Fresh",
    "shortDescription": "The undisputed signature of masculine power. Icy grapefruit and crushed mint collided with sacred frankincense and smoldering cedar.",
    "shortDescriptionBn": "আধুনিক পুরুষের কর্তৃত্ব, গাম্ভীর্য ও আভিজাত্যের চূড়ান্ত প্রতীক। বরফশীতল গ্রেপফ্রুটের সতেজতা এবং স্মোকি লোবান ও চন্দনের অনবদ্য মাদকতাময় সুরভি।",
    "description": "Blue De Chanel is the olfactory armor of the ambitious, confident gentleman who commands respect without uttering a single word. It strikes immediately with a zesty surge of chilled pink grapefruit, lemon zest, and crisp mint, delivering an instant rush of sharp freshness. The heart reveals a sophisticated alchemy of warm ginger, nutmeg, and delicate jasmine, balancing vigor with timeless elegance. Its majestic base is where true luxury unfolds: aged Mysore sandalwood, dark cedarwood, and smoldering incense create an unforgettable, mysterious sillage that clings tenaciously to skin and fabrics for 24+ hours. Unmatched for formal suits, signature daily presence, and memorable impressions.",
    "descriptionBn": "ভ্যালুর ব্লু ডি চ্যানেল আধুনিক পুরুষের আত্মবিশ্বাস, মার্জিত রুচি ও রাজকীয় কর্তৃত্বের পরাকাষ্ঠা। আতরটি স্পর্শ করার সাথে সাথে ফ্রেশ পিঙ্ক গ্রেপফ্রুট, কাঁচা লেবুর খোসা আর হিমশীতল পুদিনার এক ঝলক তীব্র সতেজতা মন কাড়ে। হৃদয় নোটে যোগ হয় আদা, উষ্ণ জয়ফল ও জুঁই ফুলের চমৎকার ভারসাম্যপূর্ণ মাদকতা। আর শেষ নোটে রাজকীয় স্মোকি লোবান, খাঁটি চন্দন ও গাঢ় সিডারউডের রহস্যময় আভিজাত্য তৈরি করে এমন এক সম্মোহনী অরা, যা যেকোনো ভিড়ে আপনাকে অপ্রতিদ্বন্দ্বী ও নজরকাড়া করে রাখবে। পাঞ্জাবি বা স্যুট—যেকোনো পোশাকে এটি ছড়াবে ২৪+ ঘণ্টারও বেশি সময় ধরে এক দুর্নিবার আকর্ষণ।",
    "price3ml": 220,
    "price6ml": 400,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 50,
    "stock3ml": 25,
    "stock6ml": 25,
    "sku": "VLR-ATT-BDC01",
    "featured": true,
    "bestSeller": true,
    "newArrival": true,
    "rating": 4.9,
    "reviewsCount": 68,
    "images": [
      "/src/assets/images/product_vellure_blue_de_chanel_1.png",
      "/src/assets/images/product_vellure_blue_de_chanel_6ml.png",
      "/src/assets/images/product_vellure_blue_de_chanel_3.png"
    ],
    "notes": {
      "top": [
        "Grapefruit",
        "Lemon",
        "Mint"
      ],
      "topBn": [
        "গ্রেপফ্রুট",
        "লেবু",
        "পুদিনা"
      ],
      "heart": [
        "Ginger",
        "Jasmine",
        "Nutmeg"
      ],
      "heartBn": [
        "আদা",
        "জুঁই",
        "জয়ফল"
      ],
      "base": [
        "Incense",
        "Cedar",
        "Sandalwood"
      ],
      "baseBn": [
        "লোবান",
        "সিডারউড",
        "চন্দন"
      ]
    },
    "longevity": "12-16 Hours",
    "longevityBn": "১২-১৬ ঘণ্টা পর্যন্ত স্থায়ী",
    "sillage": "Magnetic & Sophisticated",
    "sillageBn": "আকর্ষণীয় ও আভিজাত্যপূর্ণ",
    "origin": "VELLURE Artisanal Reserve",
    "originBn": "ভেল্যুর আর্টিশানাল রিজার্ভ ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Office, corporate meetings & professional wear",
    "bestForBn": "অফিস, কর্পোরেট মিটিং, প্রেজেন্টেশন এবং প্রফেশনাল জায়গা। এটি আপনাকে খুব কনফিডেন্ট একটি ভাইব দেবে।",
    "bestWeather": "All-season (Spring/Summer preferred)",
    "bestWeatherBn": "সব আবহাওয়াতেই (All-season) দারুণ, তবে স্প্রিং এবং গরমের দিনগুলোতে সবচেয়ে বেশি মানানসই।",
    "seasons": [
      "All-Season",
      "Spring",
      "Summer"
    ]
  },
  {
    "id": "prod-royal-sandal",
    "slug": "royal-sandal",
    "name": "Vellure Royal Sandal",
    "nameBn": "ভ্যালুর রয়েল চন্দন",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Sandalwood",
    "shortDescription": "A royal sanctuary of aged Mysore sandalwood, golden amber resin, and sacred temple woods radiating spiritual peace and vintage luxury.",
    "shortDescriptionBn": "শত বছরের প্রাচীন মহীশূর চন্দন, সোনালী অ্যাম্বার ও রাজকীয় উডের এক স্বর্গীয় সমাহার। যা মন ও আত্মাকে দেয় গভীর আধ্যাত্মিক প্রশান্তি ও অমলিন আভিজাত্য।",
    "description": "Royal Sandal is an authentic tribute to ancient royal dynasties and spiritual tranquility. Distilled from slow-matured Mysore sandalwood, this pure non-alcoholic attar opens with a soothing, creamy warmth enriched by delicate hints of saffron and white rose petals. As the hours evolve, the sandalwood deepens, harmonizing with warm amber, sweet balsam, and soft vanilla to create an enveloping cocoon of pure serenity. Renowned across generations for sacred moments, Jummah prayers, and formal dignitary gatherings, Royal Sandal leaves a remarkably peaceful yet regal trail that lasts on garments for several days.",
    "descriptionBn": "ভ্যালুর রয়েল চন্দন প্রাচীন রাজদরবার ও আধ্যাত্মিক পবিত্রতার এক অনুপম স্মারক। খাঁটি মহীশূর চন্দনের নির্ভেজাল নির্যাস থেকে প্রস্তুত এই আতরটি শরীরে ছোঁয়ামাত্রই ছড়িয়ে পড়ে এক স্বর্গীয়, ক্রিমি ও শীতল চন্দনের সুবাস, সাথে হালকা জাফরান ও সাদা গোলাপের স্নিগ্ধ ছোঁয়া। সময়ের পরিক্রমায় এটি উষ্ণ অ্যাম্বার ও মধুর মতো ভ্যানিলার সাথে মিশে তৈরি করে পরম প্রশান্তিময় এক রাজকীয় আবহ। জুমার নামাজ, ধর্মীয় ইবাদত কিংবা পারিবারিক গুরুত্বপূর্ণ অনুষ্ঠানে ব্যবহারের জন্য এটি সেরা পছন্দ। কাপড়ে কয়েকদিন পর্যন্ত এর শান্ত ও পবিত্র সুবাস অক্ষুণ্ণ থাকে।",
    "price3ml": 220,
    "price6ml": 400,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 45,
    "stock3ml": 25,
    "stock6ml": 20,
    "sku": "VLR-ATT-RS11",
    "featured": true,
    "bestSeller": true,
    "newArrival": true,
    "rating": 4.8,
    "reviewsCount": 82,
    "images": [
      "/src/assets/images/product_vellure_royal_sandal_official.jpg",
      "/src/assets/images/product_vellure_royal_sandal_6ml_official.jpg",
      "/src/assets/images/product_vellure_royal_sandal_portrait.png"
    ],
    "notes": {
      "top": [
        "Subtle Citrus"
      ],
      "topBn": [
        "হালকা সিট্রাস"
      ],
      "heart": [
        "Creamy Sandalwood"
      ],
      "heartBn": [
        "ক্রিমি চন্দন"
      ],
      "base": [
        "Amber",
        "Earthy Woody Notes"
      ],
      "baseBn": [
        "অ্যাম্বার",
        "মাটির স্নিগ্ধতা"
      ]
    },
    "longevity": "12-16 Hours",
    "longevityBn": "১২-১৬ ঘণ্টা",
    "sillage": "Velvety & Soothing",
    "sillageBn": "কোমল ও প্রশান্তিদায়ক",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Weddings, family gatherings & formal meetings with elders",
    "bestWeather": "Winter & Monsoon",
    "seasons": [
      "Winter",
      "Monsoon"
    ]
  },
  {
    "id": "prod-white-chandan",
    "slug": "white-chandan",
    "name": "Vellure White Chandan",
    "nameBn": "ভ্যালুর শ্বেত চন্দন",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Sandalwood",
    "shortDescription": "Silky, cooling white sandalwood touched by velvety white blossoms. Pure, calming, and deeply soothing for body and mind.",
    "shortDescriptionBn": "সিল্কি ও শীতল শ্বেত চন্দনের সাথে বরফ-সাদা ফুলের এক স্বর্গীয় মেলবন্ধন। যা প্রচণ্ড গরমেও শরীর ও মনে এনে দেয় অপার্থিব স্নিগ্ধতা ও অনাবিল স্বস্তি।",
    "description": "White Chandan is pure sensory bliss in a crystal bottle. Unlike heavy incense scents, this rare formulation celebrates the light, cooling, and velvety facet of sacred white sandalwood. It opens with an airy breeze of morning dew, crushed green leaves, and soft white lilies, effortlessly calming restless minds. The core unfolds creamy white sandalwood smoothed by cashmere musk and sheer amber. Exceptionally gentle, zero alcohol, non-overpowering, and immensely comforting in hot and humid weather. A timeless masterpiece for daily devotion, office sophistication, and peaceful evenings at home.",
    "descriptionBn": "ভ্যালুর শ্বেত চন্দন হলো স্নিগ্ধতা ও পবিত্রতার এক অপরূপ প্রতিচ্ছবি। তীব্র ঝাঁঝালো নয়, বরং অত্যন্ত মসৃণ, শীতল ও মোলায়েম শ্বেত চন্দনের এই বিরল আতরটি মনকে নিমেষেই শান্ত ও দুশ্চিন্তামুক্ত করে তোলে। শুরুতে ভোরের শিশিরভেজা সবুজ পাতা ও সাদা লিলি ফুলের স্নিগ্ধ পরশ এবং পরবর্তীতে কাশ্মীরি মাস্ক ও সিল্কি চন্দনের চমৎকার মিশ্রণ এক অপার্থিব অনুভূতি তৈরি করে। গরমের দিনে কিংবা অফিসে যারা হালকা, পরিচ্ছন্ন ও আভিজাত্যপূর্ণ সুবাস পছন্দ করেন, তাদের জন্য এটি শতভাগ উপযুক্ত। কাপড়ে দাগ ফেলে না এবং দিনভর থাকে এর মিষ্টি রেশ।",
    "price3ml": 200,
    "price6ml": 380,
    "originalPrice3ml": 260,
    "originalPrice6ml": 494,
    "discount": 23,
    "stock": 25,
    "stock3ml": 5,
    "stock6ml": 20,
    "sku": "VLR-ATT-WC14",
    "featured": true,
    "bestSeller": true,
    "newArrival": true,
    "rating": 4.9,
    "reviewsCount": 124,
    "images": [
      "/src/assets/images/product_vellure_white_chandan_official.jpg",
      "/src/assets/images/product_vellure_white_chandan_6ml_official.jpg",
      "/src/assets/images/product_vellure_white_chandan_portrait.png"
    ],
    "notes": {
      "top": [
        "Floral hints"
      ],
      "topBn": [
        "হালকা ফ্লোরাল"
      ],
      "heart": [
        "White Sandalwood"
      ],
      "heartBn": [
        "শ্বেত চন্দন"
      ],
      "base": [
        "White Musk",
        "Powdery Woods"
      ],
      "baseBn": [
        "হোয়াইট মাস্ক",
        "পাউডারি উডস"
      ]
    },
    "longevity": "12-15 Hours",
    "longevityBn": "১২-১৫ ঘণ্টা স্থায়ী",
    "sillage": "Serene & Gentle",
    "sillageBn": "শান্ত ও স্নিগ্ধ",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Prayer, meditation & relaxing at home",
    "bestWeather": "All weather (Cooling feel in Summer)",
    "seasons": [
      "All-Season",
      "Summer"
    ]
  },
  {
    "id": "prod-acqua-digio",
    "slug": "acqua-digio",
    "name": "Vellure Acqua Digio",
    "nameBn": "ভ্যালুর অ্যাকোয়া ডি জিও",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Fresh",
    "shortDescription": "Mediterranean sunshine bottled with sparkling green mandarin, crushed sea kelp, and driftwood kissed by coastal breezes.",
    "shortDescriptionBn": "ভূমধ্যসাগরের উষ্ণ রোদ, সতেজ গ্রিন ম্যান্ডারিন ও নোনতা সমুদ্রের বাতাসের এক রোমাঞ্চকর অভিজ্ঞতা। যা আপনাকে সারাদিন রাখবে দারুণ সতেজ ও প্রাণবন্ত।",
    "description": "Acqua Digio encapsulates the purest essence of freedom and endless ocean horizons. Opening with an intoxicating burst of sun-drenched calabrian bergamot, neroli, and crisp green tangerine, it mimics the splash of crystal waves on warm skin. A transparent marine heart weaves together wild cyclamen, jasmine, and sea salt, before grounding in sheer Indonesian patchouli, clean musk, and sun-bleached cedarwood. It is energetic, utterly refreshing, and completely captivating in hot, humid climates. The ultimate daily-driver attar that turns heads on campus, in the gym, and across city streets.",
    "descriptionBn": "ভ্যালুর অ্যাকোয়া ডি জিও হলো নীল সাগরের উত্তাল ঢেউ আর মুক্ত বাতাসের এক জীবন্ত প্রতিচ্ছবি। স্প্যানিশ বার্গামট, সতেজ নিরোলি এবং কাঁচা কমলার এক মোহময় বিস্ফোরণে শুরু হওয়া এই আতরটি যে কাউকেই নিমেষেই চনমনে করে তোলে। মাঝের নোটে যুক্ত হয় সামুদ্রিক খনিজ লবণ, বুনো জুঁই ও পদ্মফুলের মিষ্টি শীতল ছোঁয়া, আর শেষ নোটে সাদা সিডারউড ও পরিচ্ছন্ন মাস্ক দিনভর ধরে রাখে এক অসাধারণ ফ্রেশনেস। গ্রীষ্ম ও বর্ষার আর্দ্র আবহাওয়ায় ঘামের দুর্গন্ধ দূর করে সারাদিন নিজের মধ্যে এক দারুণ এনার্জি বজায় রাখতে এই আতরটি অতুলনীয়।",
    "price3ml": 200,
    "price6ml": 380,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 45,
    "stock3ml": 25,
    "stock6ml": 20,
    "sku": "VLR-ATT-ADG02",
    "featured": true,
    "bestSeller": true,
    "newArrival": true,
    "rating": 5,
    "reviewsCount": 54,
    "images": [
      "/src/assets/images/product_vellure_acqua_digio_1.jpg",
      "/src/assets/images/product_vellure_acqua_digio_6ml.jpg",
      "/src/assets/images/product_vellure_acqua_digio_3.jpg"
    ],
    "notes": {
      "top": [
        "Calabrian Bergamot",
        "Green Tangerine",
        "Marine Ozone"
      ],
      "topBn": [
        "ক্যালাব্রিয়ান বারগামট",
        "সবুজ ট্যানজারিন",
        "সামুদ্রিক ওজোন"
      ],
      "heart": [
        "Rosemary",
        "Jasmine",
        "Neroli"
      ],
      "heartBn": [
        "রোজমেরি",
        "জুঁই ফুল",
        "নেরোলি"
      ],
      "base": [
        "Patchouli",
        "White Cedarwood",
        "Mineral Amber"
      ],
      "baseBn": [
        "প্যাচৌলি",
        "সাদা সিডারউড",
        "অ্যাম্বার"
      ]
    },
    "longevity": "10-14 Hours on Skin, 24 Hours on Garments",
    "longevityBn": "ত্বকে ১০-১৪ ঘণ্টা, পোশাকে ২৪ ঘণ্টা পর্যন্ত",
    "sillage": "Regal & Captivating",
    "sillageBn": "তীব্র ও চিত্তাকর্ষক",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Day-outs, tours, beach vacations, relaxed travel, and casual gatherings.",
    "bestForBn": "ডে-আউট, ট্যুর, বিচ হলিডে বা যেকোনো হালকা আয়োজনে।",
    "bestWeather": "Severe summer heat and monsoon weather in Bangladesh, keeping the mind calm and serene.",
    "bestWeatherBn": "বাংলাদেশের তীব্র গরম এবং বর্ষাকালে (Summer & Monsoon) এর অ্যাকোয়াটিক ঘ্রাণ মনকে শান্ত রাখে।",
    "seasons": [
      "Summer",
      "Monsoon"
    ],
    "seasonsBn": [
      "গ্রীষ্মকাল",
      "বর্ষাকাল"
    ]
  },
  {
    "id": "prod-vampire-blood",
    "slug": "vampire-blood",
    "name": "Vellure Vampire Blood",
    "nameBn": "ভ্যালুর ভ্যাম্পায়ার ব্লাড",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Oriental",
    "shortDescription": "A dangerously seductive elixir of blood-red berries, midnight plum, and smoky gothic amber that leaves an irresistible trail.",
    "shortDescriptionBn": "টকটকে লাল বেরি, ডার্ক প্লাম ও মোহময় স্মোকি অ্যাম্বারের এক তীব্র আকর্ষণীয় ও রহস্যময় সুবাস। যা যেকোনো আড্ডায় সবার নজর কাড়তে বাধ্য।",
    "description": "Vampire Blood is an unapologetically bold, seductive, and magnetic masterpiece designed for unforgettable nights. It tantalizes from the first second with a dark, luscious rush of wild blood berries, black cherries, and velvety damson plum. Beneath the fruity temptress lies an opulent heart of candied crimson rose and night-blooming jasmine, laced with spicy cinnamon bark. As darkness falls, the base locks in: smoky Bourbon vanilla, dark patchouli, and sensual liquid amber that projects an irresistible gothic sillage. Wear it when you want to make an unforgettable entrance and leave everyone wondering what intoxicating scent you wear.",
    "descriptionBn": "ভ্যালুর ভ্যাম্পায়ার ব্লাড হলো এক রহস্যময়, আকর্ষণীয় ও তীব্র মোহময় সুবাসের জাদু। প্রথম ছোঁয়াতেই রক্তিম বুনো বেরি, ব্ল্যাক চেরি ও মিষ্টি ডার্ক প্লামের রসালো বিস্ফোরণ ইন্দ্রিয়কে সম্মোহিত করে ফেলে। এরপর প্রস্ফুটিত হয় রক্তগোলাপ, দারুচিনি ও জুঁইয়ের এক গভীর বিলাসবহুল পরত। আর রাতের গভীরতার সাথে সাথে স্মোকি বোর্বন ভ্যানিলা ও গাঢ় লিকুইড অ্যাম্বারের মাদকতাময় উপস্থিতি চারপাশের বাতাসকে করে তোলে মায়াবী। পার্টি, রোমান্টিক ডিনার কিংবা যেকোনো স্পেশাল অনুষ্ঠানে যারা সবচেয়ে আলাদা ও নজরকাড়া হতে চান, তাদের জন্য ভ্যাম্পায়ার ব্লাড এক অবধারিত অস্ত্র।",
    "price3ml": 200,
    "price6ml": 380,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 25,
    "stock3ml": 5,
    "stock6ml": 20,
    "sku": "VLR-ATT-VB13",
    "featured": true,
    "bestSeller": true,
    "newArrival": false,
    "rating": 4.8,
    "reviewsCount": 92,
    "images": [
      "/src/assets/images/product_vellure_vampire_blood_1.jpg",
      "/src/assets/images/product_vellure_vampire_blood_2.jpg",
      "/src/assets/images/product_vellure_vampire_blood_3.jpg"
    ],
    "notes": {
      "top": [
        "Blood Plum",
        "Strawberry"
      ],
      "topBn": [
        "প্লাম",
        "স্ট্রবেরি"
      ],
      "heart": [
        "Red Jasmine",
        "Sweet Floral"
      ],
      "heartBn": [
        "লাল জুঁই",
        "মিষ্টি ফুল"
      ],
      "base": [
        "Dark Sandalwood",
        "Musk"
      ],
      "baseBn": [
        "গাঢ় চন্দন",
        "মাস্ক"
      ]
    },
    "longevity": "12-16 Hours",
    "longevityBn": "১২-১৬ ঘণ্টা",
    "sillage": "Intense & Seductive",
    "sillageBn": "তীব্র ও সম্মোহনী",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Evening parties, night-outs & special date nights",
    "bestWeather": "Winter & Cool Nights",
    "seasons": [
      "Winter"
    ]
  },
  {
    "id": "prod-saffron-rose",
    "slug": "saffron-rose",
    "name": "Vellure Saffron Rose",
    "nameBn": "ভ্যালুর জাফরান রোজ",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Floral",
    "shortDescription": "Pure Persian saffron threads intertwined with blooming Taif rose petals and warm agarwood smoke. Opulence in its purest form.",
    "shortDescriptionBn": "ইরানি লাল জাফরান ও রাজকীয় তায়েফ গোলাপের এক অমলিন বিলাসিতা। যার সাথে গাঢ় উদ ও উষ্ণ অ্যাম্বার যোগ করে এক অভিজাত বাদশাহী অনুভূতি।",
    "description": "Saffron Rose is the crown jewel of Middle Eastern luxury perfumery. Hand-distilled from premium Persian red saffron threads and freshly harvested morning Taif rose petals, it reveals a golden, spicy-floral splendour that feels immediately royal. As the crimson roses warm on skin, whispers of cardamom, pink pepper, and amber resin emerge, evolving into a regal dry-down of smoky oud and cashmere woods. It radiates sheer luxury, making it the premier choice for weddings, Eid festivities, and high-profile celebrations. A single dab commands respect and creates a rich, unforgettable trail that lasts past 24 hours.",
    "descriptionBn": "ভ্যালুর জাফরান রোজ হলো খাঁটি বাদশাহী ঐতিহ্যের সবচেয়ে মূল্যবান উপহার। বিশ্বখ্যাত পার্সিয়ান লাল জাফরানের সোনালী রেণু এবং তায়েফের ভোরের তাজা রক্তগোলাপের নির্যাসে তৈরি এই সুবাস প্রথম স্পর্শেই এক রাজকীয় আবহ তৈরি করে। গোলাপের মিষ্টি সুরভিত সুবাসের সাথে জাফরানের উষ্ণ ঝাঁঝ এবং শেষে খাঁটি উদ ও কাশ্মীরি অ্যাম্বারের সমন্বয় সৃষ্টি করে এক অভূতপূর্ব অভিজাত ব্যক্তিত্ব। বিয়েবাড়ি, ঈদের দিন কিংবা যেকোনো সামাজিক জমায়েতে পাঞ্জাবির সাথে এই আতরটি ব্যবহার করলে আপনার চারপাশের মানুষ এর মুগ্ধ প্রশংসা করতে বাধ্য হবে।",
    "price3ml": 250,
    "price6ml": 450,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 45,
    "stock3ml": 25,
    "stock6ml": 20,
    "sku": "VLR-ATT-SR12",
    "featured": true,
    "bestSeller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewsCount": 112,
    "images": [
      "/src/assets/images/product_vellure_saffron_rose_1.jpg",
      "/src/assets/images/product_vellure_saffron_rose_2.jpg",
      "/src/assets/images/product_vellure_saffron_rose_3.jpg"
    ],
    "notes": {
      "top": [
        "Saffron",
        "Bergamot"
      ],
      "topBn": [
        "জাফরান",
        "বার্গামট"
      ],
      "heart": [
        "Damask Rose",
        "Geranium"
      ],
      "heartBn": [
        "দামাস্ক রোজ",
        "জেরানিয়াম"
      ],
      "base": [
        "Patchouli",
        "Amber",
        "Sandalwood"
      ],
      "baseBn": [
        "প্যাচৌলি",
        "অ্যাম্বার",
        "চন্দন"
      ]
    },
    "longevity": "14-18 Hours",
    "longevityBn": "১৪-১৮ ঘণ্টা পর্যন্ত",
    "sillage": "Warm Oriental Radiance",
    "sillageBn": "উষ্ণ প্রাচ্য সুবাস",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Eid, Holud, Mehendi & traditional grand events",
    "bestWeather": "Winter & Cool Climates",
    "seasons": [
      "Winter"
    ]
  },
  {
    "id": "prod-royal-oud",
    "slug": "royal-oud",
    "name": "Vellure Royal Oud",
    "nameBn": "ভ্যালুর রয়েল উদ",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Oud",
    "shortDescription": "Majestic, deep, and supremely authoritative. Aged vintage agarwood, warm leather, and golden spices made for true connoisseurs.",
    "shortDescriptionBn": "গম্ভীর, প্রভাবশালী ও রাজকীয় ব্যক্তিত্বের পরিচায়ক। বহু বছরের পুরাতন খাঁটি আগরউড, লেদার ও রাজকীয় মশলার মিশ্রণে তৈরি ভিআইপি সুবাস।",
    "description": "Royal Oud is the ultimate embodiment of status, heritage, and uncompromising prestige. Extracted from ancient Assam and Cambodian agarwood trees, this pure attar reveals deep balsamic richness devoid of harsh barnyard notes. It opens with aristocratic bergamot, pink peppercorns, and angelica root, before sinking into dense, resinous oud heartwood accented by cedar and green galbanum. The dry-down is magnificent: smoky incense, aged leather, and pure amber that wrap the wearer in an aura of supreme power and quiet luxury. A signature fragrance for corporate leaders, business titans, and discerning fragrance lovers.",
    "descriptionBn": "ভ্যালুর রয়েল উদ কোনো সাধারণ আতর নয়, এটি ক্ষমতা, মর্যাদা ও শতবর্ষী আভিজাত্যের নিখুঁত প্রতীক। আসাম ও কম্বোডিয়ার গভীর বনের প্রাচীন আগরউড গাছ থেকে সংগৃহীত এই খাঁটি আতরে কোনো বাজে গন্ধ নেই, বরং আছে অত্যন্ত গভীর, স্মোকি ও রাজকীয় এক মিষ্টি কাঠের পরত। হালকা বার্গামট ও এঞ্জেলিকা রুটের স্পর্শে শুরু হয়ে এটি রূপ নেয় ঘন আগরউড, দেবদারু ও খাঁটি লেদারের এক গাম্ভীর্যপূর্ণ আবহে। যারা ভিআইপি মিটিং, কর্পোরেট ডিল কিংবা জুমার নামাজে নিজের ব্যক্তিত্বের সবচেয়ে ওজনদার উপস্থিতি নিশ্চিত করতে চান, তাদের কালেকশনে রয়্যাল উদ থাকা বাধ্যতামূলক।",
    "price3ml": 330,
    "price6ml": 600,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 45,
    "stock3ml": 25,
    "stock6ml": 20,
    "sku": "VLR-ATT-RO10",
    "featured": true,
    "bestSeller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewsCount": 135,
    "images": [
      "/src/assets/images/product_vellure_royal_oud_1.jpg",
      "/src/assets/images/product_vellure_royal_oud_2.png",
      "/src/assets/images/product_vellure_royal_oud_3.jpg"
    ],
    "notes": {
      "top": [
        "Lemon",
        "Pink Pepper"
      ],
      "topBn": [
        "লেবু",
        "পিংক পেপার"
      ],
      "heart": [
        "Angelica",
        "Cedar"
      ],
      "heartBn": [
        "অ্যাঞ্জেলিকা",
        "সিডার"
      ],
      "base": [
        "Rich Agarwood",
        "Musk",
        "Sandalwood"
      ],
      "baseBn": [
        "আগরউড",
        "মাস্ক",
        "চন্দন"
      ]
    },
    "longevity": "14-20 Hours",
    "longevityBn": "১৪-২০ ঘণ্টা পর্যন্ত কার্যকর",
    "sillage": "Commanding & Majestic",
    "sillageBn": "প্রভাবশালী ও রাজকীয়",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "VIP meetings, executive events & boardrooms",
    "bestWeather": "Winter & AC Environments",
    "seasons": [
      "Winter"
    ]
  },
  {
    "id": "prod-rose-gold",
    "slug": "rose-gold",
    "name": "Vellure Rose Gold",
    "nameBn": "ভ্যালুর রোজ গোল্ড",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Floral",
    "shortDescription": "Liquid sunshine and velvet rose petals blended with spun sugar, golden amber, and soft musk. Romantic, radiant, and endlessly charming.",
    "shortDescriptionBn": "বোতলে বন্দি তরল সোনা আর তাজা গোলাপের মায়াবী সুবাস! মিষ্টি ক্যান্ডি, সোনালী অ্যাম্বার ও হোয়াইট মাস্কের অনবদ্য রোমান্টিক কম্বিনেশন।",
    "description": "Rose Gold captures the effervescent glow of champagne flutes reflecting in a chandelier-lit ballroom. It bursts forth with dew-kissed Turkish rose petals and sparkling mandarin, kissed by a hint of pink praline. As it caresses the skin, a heart of candied peony, white jasmine, and creamy vanilla milk unfolds, evoking pure femininity and modern opulence. The dry-down is an irresistible cloud of golden amber, warm cedar, and sheer silk musk that envelopes you in an intoxicating sweetness. Irresistible for parties, romantic dinner dates, weddings, and celebratory moments.",
    "descriptionBn": "ভ্যালুর রোজ গোল্ড হলো আভিজাত্য, রোমান্স আর মিষ্টি ভালোবাসার এক অপরূপ মেলবন্ধন। শিশিরভেজা তুর্কি গোলাপের কোমল পাপড়ি এবং মিষ্টি ক্যান্ডি ভ্যানিলার ছোঁয়ায় তৈরি এই সুবাস আপনাকে করে তুলবে সবচেয়ে লাবণ্যময় ও মনকাড়া। ধীরে ধীরে এটি জুঁই ফুল ও সোনালী অ্যাম্বারের এক চমৎকার ক্রিমি আবহে রূপ নেয়, যা সারাদিন এক জাদুকরী ও মায়াবী মিষ্টি সুবাস ছড়ায়। যেকোনো উৎসব, বিয়েবাড়ি কিংবা প্রিয়জনের সাথে কাটানো সুন্দর মুহূর্তগুলোতে নিজেকে অনন্যভাবে ফুটিয়ে তুলতে রোজ গোল্ডের কোনো বিকল্প নেই।",
    "price3ml": 250,
    "price6ml": 450,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 45,
    "stock3ml": 25,
    "stock6ml": 20,
    "sku": "VLR-ATT-RG09",
    "featured": false,
    "bestSeller": false,
    "newArrival": false,
    "rating": 4.8,
    "reviewsCount": 78,
    "images": [
      "/src/assets/images/product_vellure_rose_gold_1.jpg",
      "/src/assets/images/product_vellure_rose_gold_2.jpg",
      "/src/assets/images/product_vellure_rose_gold_3.jpg"
    ],
    "notes": {
      "top": [
        "Fruity Citrus",
        "Pear"
      ],
      "topBn": [
        "ফলের সিট্রাস",
        "নাশপাতি"
      ],
      "heart": [
        "Rose",
        "Jasmine",
        "Peony"
      ],
      "heartBn": [
        "গোলাপ",
        "জুঁই",
        "পিওনি"
      ],
      "base": [
        "White Musk",
        "Warm Amber"
      ],
      "baseBn": [
        "হোয়াইট মাস্ক",
        "উষ্ণ অ্যাম্বার"
      ]
    },
    "longevity": "12-15 Hours",
    "longevityBn": "১২-১৫ ঘণ্টা",
    "sillage": "Regal Floral Glow",
    "sillageBn": "রাজকীয় ফুলের মোহনীয় বিস্তার",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Exclusive parties, bridal showers & luxury gatherings",
    "bestWeather": "All-season (Spring & Early Winter best)",
    "seasons": [
      "All-Season",
      "Spring",
      "Winter"
    ]
  },
  {
    "id": "prod-musk-safi",
    "slug": "musk-safi",
    "name": "Vellure Musk Safi",
    "nameBn": "ভ্যালুর মাস্ক সাফি",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Musk",
    "shortDescription": "The gold standard of pure white musk. Silky, powdery, and heavenly clean like fresh morning linen draped in golden sunlight.",
    "shortDescriptionBn": "১০০% খাঁটি হোয়াইট মাস্কের রাজকীয় স্নিগ্ধতা। দুধ-সাদা ফুলের কোমলতা ও ভেলভেটি আবহে তৈরি এক চিরন্তন স্বর্গীয় প্রশান্তির সুবাস।",
    "description": "Musk Safi is widely celebrated as the cleanest, most divine attar ever conceived. Opening with an exquisite whisper of white lily, morning iris, and clean cotton blossom, it evokes the serenity of pristine white marble under dawn sunlight. Unlike pungent animalic musks, Musk Safi is velvety, creamy, and sublimely refined, blending seamlessly with your body's natural heat to produce an angelic, powdery aura. It is 100% alcohol-free, non-staining, and offers a gentle 24-hour endurance that never offends. The ultimate signature scent for daily office wear, intimate family warmth, and peaceful religious worship.",
    "descriptionBn": "ভ্যালুর মাস্ক সাফি হলো আতর জগতের সবচেয়ে জনপ্রিয়, পরিচ্ছন্ন ও প্রশান্তিদায়ক এক মাস্টারপিস। খাঁটি হোয়াইট মাস্কের এই আতরটি লাগানোর সাথে সাথে মনে হয় ভোরের স্নিগ্ধ বাতাসে সাদা পদ্ম আর জুঁইয়ের কোমল বাগান দিয়ে হেঁটে যাচ্ছেন। এতে কোনো কড়া ঝাঁঝ নেই; বরং এটি শরীরে ও পোশাকে তৈরি করে অত্যন্ত মোলায়েম, পাউডারি ও দুধ-সাদা এক স্বর্গীয় স্নিগ্ধতা। যারা কড়া গন্ধ সহ্য করতে পারেন না কিন্তু সারাদিন পরিপাটি ও সুন্দর গন্ধ পেতে চান, তাদের জন্য মাস্ক সাফি সেরা। এটি দীর্ঘ ২৪ ঘণ্টা পর্যন্ত কাপড়ে থাকে এবং নামাজের জন্য অত্যন্ত প্রিয়।",
    "price3ml": 330,
    "price6ml": 600,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 45,
    "stock3ml": 25,
    "stock6ml": 20,
    "sku": "VLR-ATT-MS08",
    "featured": false,
    "bestSeller": false,
    "newArrival": false,
    "rating": 4.9,
    "reviewsCount": 160,
    "images": [
      "/src/assets/images/product_vellure_musk_safi_1.jpg",
      "/src/assets/images/product_vellure_musk_safi_2.jpg",
      "/src/assets/images/product_vellure_musk_safi_3.jpg"
    ],
    "notes": {
      "top": [
        "White Flowers"
      ],
      "topBn": [
        "সাদা ফুল"
      ],
      "heart": [
        "Pure White Musk"
      ],
      "heartBn": [
        "খাঁটি হোয়াইট মাস্ক"
      ],
      "base": [
        "Powdery notes",
        "Vanilla"
      ],
      "baseBn": [
        "পাউডারি নোটস",
        "ভ্যানিলা"
      ]
    },
    "longevity": "12-16 Hours",
    "longevityBn": "১২-১৬ ঘণ্টা স্থায়ী",
    "sillage": "Peaceful & Intimate",
    "sillageBn": "শান্ত ও পবিত্র স্নিগ্ধতা",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Jummah prayers, religious events, after-bath & daily freshness",
    "bestWeather": "All-year round",
    "seasons": [
      "All-Season"
    ]
  },
  {
    "id": "prod-desire-red",
    "slug": "desire-red",
    "name": "Vellure Desire Red",
    "nameBn": "ভ্যালুর ডিজায়ার রেড",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Oriental",
    "shortDescription": "A fiery explosion of crisp red apple, sparkling neroli, and passionate vanilla-amber that ignites attention in any room.",
    "shortDescriptionBn": "খাস্তা লাল আপেল, সতেজ নিরোলি ও উষ্ণ ভ্যানিলা-অ্যাম্বারের এক অগ্নিস্ফুলিঙ্গ! তারুণ্যের তেজ, আকর্ষণ ও আত্মবিশ্বাসের অনন্য প্রতিচ্ছবি।",
    "description": "Desire Red is designed for the bold, passionate man who lives on his own terms and leaves an unforgettable impression wherever he steps. It ignites the senses with a mouthwatering burst of tart red apple, zesty Italian lemon, and sunlit neroli blossom. The heart throbs with teakwood, deep patchouli, and Moroccan rose, adding masculine substance and mystery. In the base, rich bourbon vanilla, warm labdanum, and crystalline amber combine to create a deeply magnetic, spicy warmth that radiates energy for up to 20 hours. Perfect for evening dates, casual hangouts, and whenever you want to project vibrant confidence.",
    "descriptionBn": "ভ্যালুর ডিজায়ার রেড হলো তারুণ্যের উচ্ছ্বাস, দুরন্ত সাহস আর তীব্র রোমাঞ্চের এক বিস্ফোরণ। খাস্তা লাল আপেল, ফ্রেশ লেবু ও কমলালেবুর ফুলের ঝংকারে শুরু হওয়া এই সুবাস মুহূর্তেই রক্তে জাগায় এক নতুন উত্তেজনা। মধ্যম নোটে সেগুন কাঠ, প্যাচৌলি ও গোলাপের রাজকীয় মেলবন্ধন এতে যোগ করে এক গম্ভীর পৌরুষদীপ্ত ভাব। আর শেষ নোটে উষ্ণ ভ্যানিলা ও সোনালী অ্যাম্বারের মিষ্টি মাদকতা আপনাকে সবার থেকে আলাদা করে রাখবে ২০+ ঘণ্টা ধরে। বন্ধুদের সাথে সান্ধ্যকালীন আড্ডা কিংবা স্পেশাল কারো সাথে সাক্ষাতের সময় এই আতরটি আপনাকে এনে দেবে এক অপ্রতিরোধ্য আকর্ষণ।",
    "price3ml": 250,
    "price6ml": 450,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 45,
    "stock3ml": 25,
    "stock6ml": 20,
    "sku": "VLR-ATT-DR06",
    "featured": false,
    "bestSeller": false,
    "newArrival": true,
    "rating": 4.8,
    "reviewsCount": 95,
    "images": [
      "/src/assets/images/product_vellure_desire_red_1.jpg",
      "/src/assets/images/product_vellure_desire_red_2.jpg",
      "/src/assets/images/product_vellure_desire_red_3.jpg"
    ],
    "notes": {
      "top": [
        "Apple",
        "Lemon",
        "Neroli"
      ],
      "topBn": [
        "আপেল",
        "লেবু",
        "নেরোলি"
      ],
      "heart": [
        "Rose",
        "Teak Wood",
        "Patchouli"
      ],
      "heartBn": [
        "গোলাপ",
        "সেগুন কাঠ",
        "প্যাচৌলি"
      ],
      "base": [
        "Vanilla",
        "Musk"
      ],
      "baseBn": [
        "ভ্যানিলা",
        "মাস্ক"
      ]
    },
    "longevity": "12-16 Hours",
    "longevityBn": "১২-১৬ ঘণ্টা",
    "sillage": "Magnetic & Warm",
    "sillageBn": "উষ্ণ ও মনোমুগ্ধকর",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Romantic dates, dinner parties & intimate moments",
    "bestWeather": "Winter & Rainy Season",
    "seasons": [
      "Winter",
      "Monsoon"
    ]
  },
  {
    "id": "prod-crimson",
    "slug": "crimson",
    "name": "Vellure Crismon",
    "nameBn": "ভ্যালুর ক্রিমসন",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Woody",
    "shortDescription": "A smoldering crimson blaze of rich saffron, dark woods, and intoxicating black amber. Mysterious, potent, and impossible to forget.",
    "shortDescriptionBn": "রক্তিম জাফরান, গাঢ় দেবদারু ও কালো অ্যাম্বারের এক উত্তাল মাদকতাময় বিস্তার। যা আপনার উপস্থিতিকে যেকোনো ভিড়ে করে তুলবে রাজকীয় ও অবিস্মরণীয়।",
    "description": "Crimson is the olfactory expression of intense passion and mysterious nobility. It opens with an explosive, hypnotic wave of crimson saffron, crushed cardamom pods, and bitter orange rind that demands immediate fascination. As the fragrance blooms on warm fabric, a heart of caramelized woods, dark tobacco leaf, and rare night-blooming spices takes center stage. The foundation is intensely seductive: rich black amber, smoky tonka bean, and roasted oud resin that anchor the scent for over 24 hours. Crimson is not for the faint of heart—it is for the person who commands every room they walk into.",
    "descriptionBn": "ভ্যালুর ক্রিমসন হলো গভীর রহস্য, অপ্রতিরোধ্য আভিজাত্য আর আগুনের মতো তীব্র আবেগের এক সুবাস। রক্তিম জাফরানের মাদকতা আর এলাচের উষ্ণ ঝাঁঝে শুরু হয়ে এই সুবাস চারপাশের বাতাসকে এক অনন্য সম্মোহনে ভরিয়ে তোলে। এরপর উন্মোচিত হয় মূল্যবান ক্যারামেলাইজড উড ও ডার্ক মসলার এক রাজকীয় রসায়ন। শেষপর্যন্ত খাঁটি ব্ল্যাক অ্যাম্বার ও স্মোকি টংকা বিনের উপস্থিতি কাপড়ে এমন এক গভীর আভিজাত্যের ছাপ ফেলে যা সহজে মুছে যায় না। বিশেষ কোনো রাতে বা জমকালো অনুষ্ঠানে নিজের আভিজাত্য দৃঢ়ভাবে প্রকাশ করতে ক্রিমসন এক অনন্য সৃষ্টি।",
    "price3ml": 220,
    "price6ml": 400,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 45,
    "stock3ml": 25,
    "stock6ml": 20,
    "sku": "VLR-ATT-CR05",
    "featured": false,
    "bestSeller": false,
    "newArrival": true,
    "rating": 4.8,
    "reviewsCount": 103,
    "images": [
      "/src/assets/images/product_vellure_crismon_1.jpg",
      "/src/assets/images/product_vellure_crismon_2.jpg",
      "/src/assets/images/product_vellure_crismon_3.jpg"
    ],
    "notes": {
      "top": [
        "Saffron",
        "Pink Pepper"
      ],
      "topBn": [
        "জাফরান",
        "পিংক পেপার"
      ],
      "heart": [
        "Rose",
        "Oud"
      ],
      "heartBn": [
        "গোলাপ",
        "উদ"
      ],
      "base": [
        "Amber",
        "Dark Patchouli",
        "Leather"
      ],
      "baseBn": [
        "অ্যাম্বার",
        "প্যাচৌলি",
        "লেদার"
      ]
    },
    "longevity": "10-14 Hours on Skin, 24 Hours on Garments",
    "longevityBn": "ত্বকে ১০-১৪ ঘণ্টা, পোশাকে ২৪ ঘণ্টা পর্যন্ত",
    "sillage": "Regal & Captivating",
    "sillageBn": "তীব্র ও চিত্তাকর্ষক",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Weddings, premium parties & exclusive formal events",
    "bestWeather": "Fall & Winter Evenings",
    "seasons": [
      "Winter",
      "Autumn"
    ]
  },
  {
    "id": "prod-cool-water",
    "slug": "cool-water",
    "name": "Vellure Cool Water",
    "nameBn": "ভ্যালুর কুল ওয়াটার",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Fresh",
    "shortDescription": "A crystalline wave of crisp ocean foam, crushed wild peppermint, and sun-drenched coastal cedar. The immortal icon of pure freshness.",
    "shortDescriptionBn": "সাগরের উত্তাল নীল ঢেউ, বরফশীতল তাজা পুদিনা আর সিডারউডের এক চিরসবুজ ক্লাসিক সুবাস। যা প্রচণ্ড গরমেও শরীরকে রাখে একশ ভাগ চনমনে ও সতেজ।",
    "description": "Cool Water is the undisputed king of fresh aquatic fragrances, loved across decades and remastered in pure, concentrated non-alcoholic oil. It unleashes a giant wave of icy marine notes, crisp peppermint, and freshly clipped lavender that feels like diving headfirst into an alpine ocean surf. The heart reveals spicy coriander, geranium, and delicate jasmine, before settling into an invigorating base of salty ambergris, cedarwood, oakmoss, and clean musk. It fights off summer heat and perspiration effortlessly, maintaining a crisp, breezy aura that lasts through the longest workdays. Ideal for daily commute, office hours, and sporty lifestyles.",
    "descriptionBn": "ভ্যালুর কুল ওয়াটার হলো সতেজতার জগতে এক চিরন্তন রাজা। অ্যালকোহলমুক্ত ১০০% ঘন তেলের এই স্পেশাল ভার্সনটি আপনাকে দেবে বরফশীতল সাগরের ঢেউ আর তাজা পুদিনা পাতার এক অপূর্ব শীতল পরশ। তীব্র গরমে যখন ক্লান্তি আপনাকে ঘিরে ধরে, তখন এই আতরের এক ছোঁয়া মন ও শরীরকে মুহূর্তেই চাঙ্গা করে তোলে। এতে থাকা ল্যাভেন্ডার, ওকমস এবং সাগরের খনিজ লবণ ঘামের দুর্গন্ধ সম্পূর্ণ দূর করে দিনভর একটি পরিচ্ছন্ন, ঝকঝকে ও স্মার্ট অনুভূতি ধরে রাখে। অফিস, ভার্সিটি কিংবা প্রতিদিনের দৌড়ঝাঁপে ব্যবহারের জন্য এটি প্রতিটি পুরুষের প্রথম পছন্দ।",
    "price3ml": 330,
    "price6ml": 600,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 45,
    "stock3ml": 25,
    "stock6ml": 20,
    "sku": "VLR-ATT-CW01",
    "featured": true,
    "bestSeller": true,
    "newArrival": true,
    "rating": 4.9,
    "reviewsCount": 142,
    "images": [
      "/src/assets/images/product_vellure_cool_water_1.jpg",
      "/src/assets/images/product_vellure_cool_water_6ml.jpg",
      "/src/assets/images/product_vellure_cool_water_3.jpg"
    ],
    "notes": {
      "top": [
        "Seawater",
        "Lavender",
        "Mint"
      ],
      "topBn": [
        "সামুদ্রিক জল",
        "ল্যাভেন্ডার",
        "পুদিনা"
      ],
      "heart": [
        "Sandalwood",
        "Jasmine"
      ],
      "heartBn": [
        "চন্দন",
        "জুঁই"
      ],
      "base": [
        "Musk",
        "Oakmoss",
        "Cedar"
      ],
      "baseBn": [
        "মাস্ক",
        "ওকমস",
        "সিডার"
      ]
    },
    "longevity": "10-14 Hours on Skin, 24 Hours on Garments",
    "longevityBn": "ত্বকে ১০-১৪ ঘণ্টা, পোশাকে ২৪ ঘণ্টা",
    "sillage": "Fresh & Clean Projection",
    "sillageBn": "সতেজ ও দীর্ঘস্থায়ী সুবাস",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Gym, sports & outdoor sun exposure",
    "bestForBn": "জিম (Gym), খেলাধুলা, বা রোদে বাইরে বের হওয়ার সময়। এটি ঘামের দুর্গন্ধ দূর করে রিফ্রেশিং অনুভূতি দেয়।",
    "bestWeather": "High Summer & Sunny days",
    "bestWeatherBn": "প্রচণ্ড গরম (High Summer) এবং রোদ ঝলমলে দিনে এটি সবচেয়ে পারফেক্ট।",
    "seasons": [
      "Summer",
      "Monsoon"
    ],
    "seasonsBn": [
      "গ্রীষ্মকাল",
      "বর্ষাকাল"
    ]
  },
  {
    "id": "prod-signature-trio-pack",
    "slug": "signature-trio-pack",
    "name": "Signature Trio Pack (Gift Set)",
    "nameBn": "সিগনেচার ট্রায়ো প্যাক (গিফট সেট)",
    "category": "gift_set",
    "categoryBn": "গিফট সেট",
    "fragranceType": "Oriental",
    "shortDescription": "The ultimate royal trifecta: Royal Oud, Musk Safi, and Saffron Rose in gold-trimmed flacons. 3 timeless masterpieces for every mood and occasion.",
    "shortDescriptionBn": "আভিজাত্যের ত্রিবেণী সঙ্গম: রয়্যাল উদ, মাস্ক সাফি ও জাফরান রোজের ৩-ইন-১ লাক্সারি গিফট সেট। প্রতিদিনের অফিস, নামাজ ও রাজকীয় উৎসবের নিখুঁত সমাধান।",
    "description": "The Signature Trio Pack brings together VELLURE's top three most coveted artisanal attars in an exquisite presentation coffret. Experience Royal Oud for authoritative presence and corporate milestones, Musk Safi for heavenly powdery calmness during daily devotion and office hours, and Saffron Rose for dazzling wedding festivities and evening romance. Each fragrance is 100% pure undiluted oil, offering 18 to 24 hours of projection without a drop of alcohol. Packaged in custom gold-foiled luxury flacons, this trio is the ultimate present for yourself or a distinguished loved one.",
    "descriptionBn": "সিগনেচার ট্রায়ো প্যাক হলো ভ্যালুরের সবচেয়ে জনপ্রিয় ও প্রশংসিত ৩টি রাজকীয় আতরের এক অপূর্ব মাস্টারপিস সংকলন। এতে রয়েছে গভীর ও গম্ভীর ব্যক্তিত্বের জন্য 'রয়েল উদ', ইবাদত ও প্রাত্যহিক স্নিগ্ধতার জন্য স্বর্গীয় 'মাস্ক সাফি', এবং জমকালো উৎসব ও বিয়েবাড়ির জন্য সুবাসিত 'জাফরান রোজ'। প্রতিটি শিশিতে রয়েছে ১০০% খাঁটি, অ্যালকোহলমুক্ত ও দীর্ঘস্থায়ী নির্যাস। সোনার জলে খোদাই করা লাক্সারি গিফট বক্সে সাজানো এই সেটটি নিজের কালেকশনে রাখার মতো কিংবা প্রিয়জনকে বিশেষ উপহার দেওয়ার জন্য এক অনবদ্য সৃষ্টি।",
    "price3ml": 850,
    "price6ml": 1550,
    "originalPrice3ml": 1105,
    "originalPrice6ml": 1105,
    "discount": 23,
    "stock": 25,
    "stock3ml": 15,
    "stock6ml": 10,
    "sku": "VLR-SET-STP16",
    "featured": false,
    "bestSeller": true,
    "newArrival": true,
    "rating": 5,
    "reviewsCount": 117,
    "images": [
      "/src/assets/images/combo_signature_trio_1.jpg",
      "/src/assets/images/combo_signature_trio_2.jpg",
      "/src/assets/images/combo_signature_trio_3.jpg"
    ],
    "notes": {
      "top": [
        "Bergamot",
        "Saffron"
      ],
      "topBn": [
        "বারগামট",
        "জাফরান"
      ],
      "heart": [
        "Amber",
        "Rose Petals"
      ],
      "heartBn": [
        "অ্যাম্বার",
        "গোলাপ"
      ],
      "base": [
        "Sandalwood",
        "White Musk"
      ],
      "baseBn": [
        "চন্দন",
        "শুভ্র কস্তুরী"
      ]
    },
    "longevity": "10-14 Hours on Skin, 24 Hours on Garments",
    "longevityBn": "ত্বকে ১০-১৪ ঘণ্টা, পোশাকে ২৪ ঘণ্টা পর্যন্ত",
    "sillage": "Regal & Captivating",
    "sillageBn": "তীব্র ও চিত্তাকর্ষক",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "packaging": "Golden-flacon 3-in-1 luxury box",
    "packagingBn": "গোল্ডেন ফ্লাকন ৩-ইন-১ লাক্সারি বক্স",
    "includedItems": [
      "Royal Oud",
      "Musk Safi",
      "Saffron Rose"
    ]
  },
  {
    "id": "prod-gentleman-s-edit-pack",
    "slug": "gentleman-s-edit-pack",
    "name": "Gentleman's Edit Pack (Gift Set)",
    "nameBn": "জেন্টলম্যানস এডিট প্যাক (গিফট সেট)",
    "category": "gift_set",
    "categoryBn": "গিফট সেট",
    "fragranceType": "Woody",
    "shortDescription": "Curated specifically for the discerning modern man: Cool Water for daytime vitality, Crimson for magnetic evenings, and Royal Sandal for calm authority.",
    "shortDescriptionBn": "আত্মবিশ্বাসী পুরুষের জন্য বিশেষভাবে নির্বাচিত ট্রায়ো: দিনের বেলার চনমনে ফ্রেশনেসের জন্য কুল ওয়াটার, রাতের রহস্যময় আকর্ষণে ক্রিমসন, আর আভিজাত্যে রয়্যাল চন্দন।",
    "description": "The Gentleman's Edit Pack is an indispensable olfactory wardrobe engineered for the multifaceted man. Start your morning with the invigorating ocean rush of Cool Water to power through demanding meetings and workouts. Transition into the sacred warmth of Royal Sandal for dignified consultations and peaceful reflection. Then ignite the evening with the intoxicating, smoldering spice of Crimson. Three potent, long-lasting 100% pure attars that ensure you command every room from dawn until midnight.",
    "descriptionBn": "জেন্টলম্যানস এডিট প্যাক আধুনিক সফল পুরুষের প্রতিটি মুহূর্তকে মর্যাদাপূর্ণ করে তোলার এক অনবদ্য কালেকশন। কর্মব্যস্ত সকাল ও দুপুরে সতেজ প্রাণবন্ততার জন্য রয়েছে 'কুল ওয়াটার', ধর্মীয় ও আনুষ্ঠানিক আভিজাত্যের জন্য খাঁটি 'রয়েল চন্দন', আর রাতের যেকোনো আসরে সবার নজর কাড়তে রয়েছে স্মোকি ও হট 'ক্রিমসন'। ১০০% খাঁটি ঘন তেল হওয়ার কারণে প্রতিটি সুবাস পোশাকে দিনভর টিকে থাকে। যেকোনো স্টাইলিশ পুরুষের ব্যক্তিত্বে এটি এনে দেবে এক অতুলনীয় গাম্ভীর্য ও আকর্ষণ।",
    "price3ml": 750,
    "price6ml": 1350,
    "originalPrice3ml": 975,
    "originalPrice6ml": 975,
    "discount": 23,
    "stock": 25,
    "stock3ml": 15,
    "stock6ml": 10,
    "sku": "VLR-SET-GEP17",
    "featured": false,
    "bestSeller": true,
    "newArrival": true,
    "rating": 4.8,
    "reviewsCount": 124,
    "images": [
      "/src/assets/images/combo_gentlemans_edit_1.jpg",
      "/src/assets/images/combo_gentlemans_edit_2.jpg",
      "/src/assets/images/combo_gentlemans_edit_3.jpg"
    ],
    "notes": {
      "top": [
        "Bergamot",
        "Saffron"
      ],
      "topBn": [
        "বারগামট",
        "জাফরান"
      ],
      "heart": [
        "Amber",
        "Rose Petals"
      ],
      "heartBn": [
        "অ্যাম্বার",
        "গোলাপ"
      ],
      "base": [
        "Sandalwood",
        "White Musk"
      ],
      "baseBn": [
        "চন্দন",
        "শুভ্র কস্তুরী"
      ]
    },
    "longevity": "10-14 Hours on Skin, 24 Hours on Garments",
    "longevityBn": "ত্বকে ১০-১৪ ঘণ্টা, পোশাকে ২৪ ঘণ্টা পর্যন্ত",
    "sillage": "Regal & Captivating",
    "sillageBn": "তীব্র ও চিত্তাকর্ষক",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "packaging": "Masculine triple combo packaging",
    "packagingBn": "মাসকুলিন ট্রিপল কম্বো প্যাকেজিং",
    "includedItems": [
      "Cool Water",
      "Crimson",
      "Royal Sandal"
    ]
  },
  {
    "id": "prod-elegant-aura-pack",
    "slug": "elegant-aura-pack",
    "name": "Elegant Aura Pack (Gift Set)",
    "nameBn": "এলিগ্যান্ট অরা প্যাক (গিফট সেট)",
    "category": "gift_set",
    "categoryBn": "গিফট সেট",
    "fragranceType": "Floral",
    "shortDescription": "A radiant symphony of soft florals, silky white sandalwood, and sunlit ocean breezes. The pinnacle of refined grace and peaceful charm.",
    "shortDescriptionBn": "গোলাপের রোমান্টিক সুবাস, শ্বেত চন্দনের শীতল স্নিগ্ধতা আর সাগরের নির্মল বাতাসের এক অনন্য ট্রায়ো কালেকশন। যা দেবে সারাদিন শান্ত ও মনোরম অনুভূতি।",
    "description": "The Elegant Aura Pack is crafted for souls who appreciate sheer refinement, gentle sophistication, and uplifting peace. Featuring the sweet, golden romance of Rose Gold, the silky, meditative tranquility of White Chandan, and the crisp Mediterranean freshness of Acqua Digio. Free from harsh chemicals and artificial spirits, these pure attars drape the wearer in a cloud of luminous grace suitable for warm weather, polite social gatherings, and sacred moments of tranquility.",
    "descriptionBn": "এলিগ্যান্ট অরা প্যাক হলো মন জুড়ানো স্নিগ্ধতা, কোমলতা ও আভিজাত্যের এক স্বর্গীয় মেলবন্ধন। মিষ্টি গোলাপ আর ভ্যানিলার রোমান্সে ভরা 'রোজ গোল্ড', মনকে শান্ত করা পরম শীতল 'শ্বেত চন্দন', এবং সাগরের সতেজতায় ভরপুর 'অ্যাকোয়া ডি জিও'—এই তিনটি আতরের চমৎকার সংমিশ্রণ। যারা খুব কড়া বা ঝাঁঝালো গন্ধ পছন্দ করেন না, বরং মিষ্টি, পরিচ্ছন্ন ও দীর্ঘস্থায়ী স্নিগ্ধ সুবাস ভালোবাসেন, তাদের জন্য এই কম্বোটি এক আশীর্বাদস্বরূপ।",
    "price3ml": 780,
    "price6ml": 1400,
    "originalPrice3ml": 1014,
    "originalPrice6ml": 1014,
    "discount": 23,
    "stock": 25,
    "stock3ml": 15,
    "stock6ml": 10,
    "sku": "VLR-SET-EAP18",
    "featured": false,
    "bestSeller": true,
    "newArrival": true,
    "rating": 4.8,
    "reviewsCount": 131,
    "images": [
      "/src/assets/images/combo_elegant_aura_1.jpg",
      "/src/assets/images/combo_elegant_aura_2.jpg",
      "/src/assets/images/combo_elegant_aura_3.jpg"
    ],
    "notes": {
      "top": [
        "Bergamot",
        "Saffron"
      ],
      "topBn": [
        "বারগামট",
        "জাফরান"
      ],
      "heart": [
        "Amber",
        "Rose Petals"
      ],
      "heartBn": [
        "অ্যাম্বার",
        "গোলাপ"
      ],
      "base": [
        "Sandalwood",
        "White Musk"
      ],
      "baseBn": [
        "চন্দন",
        "শুভ্র কস্তুরী"
      ]
    },
    "longevity": "10-14 Hours on Skin, 24 Hours on Garments",
    "longevityBn": "ত্বকে ১০-১৪ ঘণ্টা, পোশাকে ২৪ ঘণ্টা পর্যন্ত",
    "sillage": "Regal & Captivating",
    "sillageBn": "তীব্র ও চিত্তাকর্ষক",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "packaging": "Velvet cased soft collection",
    "packagingBn": "ভেলভেট কেসড সফট কালেকশন",
    "includedItems": [
      "Rose Gold",
      "White Chandan",
      "Acqua Digio"
    ]
  },
  {
    "id": "prod-discovery-box",
    "slug": "discovery-box",
    "name": "Discovery Box (Custom 6-Piece Master Coffret)",
    "nameBn": "ডিসকভারি বক্স (কাস্টম ৬-পিস মাস্টার কফ্রেট)",
    "category": "gift_set",
    "categoryBn": "গিফট সেট",
    "fragranceType": "Oriental",
    "shortDescription": "The ultimate 6-in-1 master coffret featuring VELLURE's 6 legendary bestsellers in gold-embossed crystal flacons. The pinnacle fragrance tasting journey.",
    "shortDescriptionBn": "ভ্যালুরের সেরা ৬টি মেগাহিট আতরের রাজকীয় কম্বো বক্স — ভ্যাম্পায়ার ব্লাড, বমশেল, কুল ওয়াটার, ব্লু ডি চ্যানেল, মাস্ক সাফি ও বাকারাত রুজের মাস্টার কালেকশন।",
    "description": "The VELLURE Discovery Box is our most prestigious artisanal collection, bringing together six world-class legendary fragrance profiles in one royal master box. Inside, discover Vampire Blood for dangerously seductive evenings, Bombshell for sparkling glamour, Cool Water for ocean-crisp vitality, Blue De Chanel for commanding masculine authority, Musk Safi for pure white powdery serenity, and Baccarat Rouge for opulent crystalline luxury. Every flacon contains 100% pure concentrated perfume oil, ensuring you have the perfect scent for every season, outfit, prayer, and milestone celebration. The ultimate gift of distinction.",
    "descriptionBn": "ভ্যালুর ডিসকভারি বক্স হলো আমাদের সবচেয়ে অভিজাত ও সমাদৃত ৬-পিসের রাজকীয় মাস্টার কালেকশন। এই একটি বক্সে আপনি পাচ্ছেন আমাদের ৬টি বেস্টসেলার আতর—রহস্যময় 'ভ্যাম্পায়ার ব্লাড', মিষ্টি গ্ল্যামারাস 'বমশেল', মহাসাগরের মতো সতেজ 'কুল ওয়াটার', কর্তৃত্বশীল পৌরুষের প্রতীক 'ব্লু ডি চ্যানেল', দুধ-সাদা স্নিগ্ধতার 'মাস্ক সাফি', এবং কোটি টাকার লাক্সারি সুবাস 'বাকারাত রুজ'। প্রতিটি আতরই ১০০% খাঁটি, অ্যালকোহলমুক্ত এবং ২৪+ ঘণ্টা দীর্ঘস্থায়ী। গোল্ডেন ফয়েল প্রিন্টেড রাজকীয় বক্সে সাজানো এই সেটটি পারফিউমপ্রেমীদের জন্য স্বপ্নের মতো এক উপহার।",
    "price3ml": 1250,
    "price6ml": 2200,
    "originalPrice3ml": 1625,
    "originalPrice6ml": 1625,
    "discount": 23,
    "stock": 18,
    "stock3ml": 10,
    "stock6ml": 8,
    "sku": "VLR-SET-DBX19",
    "featured": false,
    "bestSeller": true,
    "newArrival": true,
    "rating": 5,
    "reviewsCount": 138,
    "images": [
      "/src/assets/images/combo_discovery_box_1.jpg",
      "/src/assets/images/combo_discovery_box_2.jpg",
      "/src/assets/images/combo_discovery_box_3.jpg"
    ],
    "notes": {
      "top": [
        "Bergamot",
        "Saffron"
      ],
      "topBn": [
        "বারগামট",
        "জাফরান"
      ],
      "heart": [
        "Amber",
        "Rose Petals"
      ],
      "heartBn": [
        "অ্যাম্বার",
        "গোলাপ"
      ],
      "base": [
        "Sandalwood",
        "White Musk"
      ],
      "baseBn": [
        "চন্দন",
        "শুভ্র কস্তুরী"
      ]
    },
    "longevity": "10-14 Hours on Skin, 24 Hours on Garments",
    "longevityBn": "ত্বকে ১০-১৪ ঘণ্টা, পোশাকে ২৪ ঘণ্টা পর্যন্ত",
    "sillage": "Regal & Captivating",
    "sillageBn": "তীব্র ও চিত্তাকর্ষক",
    "origin": "VELLURE Artisanal Atelier",
    "originBn": "ভেল্যুর আর্টিশানাল আতর ব্লেন্ড",
    "alcoholFree": true,
    "packaging": "Premium velvet presentation case",
    "packagingBn": "লাক্সারি ভেলভেট প্রেজেন্টেশন কেস",
    "includedItems": [
      "Vellure Vampire Blood",
      "Vellure Bombshell",
      "Vellure Cool Water",
      "Vellure Blue De Chanel",
      "Vellure Musk Safi",
      "Vellure Baccarat Rouge"
    ]
  },
  {
    "id": "prod-bombshell",
    "slug": "bombshell",
    "name": "Vellure Bombshell",
    "nameBn": "ভ্যালুর বমশেল",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Floral",
    "shortDescription": "An intoxicating burst of Brazilian purple passionfruit, Shangri-la yellow peony, and sun-kissed vanilla orchid. Playful, glamorous, and unforgettable.",
    "shortDescriptionBn": "ব্রাজিলিয়ান পার্পল প্যাশনফ্রুট, হলুদ পিয়নি ফুল ও ভ্যানিলার এক স্পার্কলিং গ্ল্যামারাস বিস্ফোরণ। যা আপনাকে সবার মাঝে করে তুলবে সবচেয়ে প্রানবন্ত ও লাস্যময়ী।",
    "description": "Bombshell is sheer joy, glamour, and magnetic confidence bottled in an artisanal concentrated oil. It bursts open with a dazzling cocktail of sparkling purple passionfruit, sun-drenched Tuscan grapefruit, and sweet Italian berries. The heart blossoms into lush Shangri-la yellow peonies, night-blooming jasmine, and vanilla orchid that spread an irresistible floral sweetness. As it settles, warm blonde woods, velvety musk, and oakmoss leave a teasing, radiant trail that stays on clothing all day long. The quintessential fragrance for parties, celebratory get-togethers, and confident modern lifestyles.",
    "descriptionBn": "ভ্যালুর বমশেল হলো আনন্দ, গ্ল্যামার আর মোহময় আত্মবিশ্বাসের এক ঝলমলে উদযাপন। প্রথম স্পর্শেই রসালো ব্রাজিলিয়ান প্যাশনফ্রুট, মিষ্টি গ্রেপফ্রুট ও লাল চেরির এক স্পার্কলিং সুবাস আপনাকে আনন্দে মাতিয়ে তুলবে। এরপর ধীরে ধীরে ফুটে ওঠে মিষ্টি হলুদ পিয়নি আর ভ্যানিলা অর্কিডের এক অপূর্ব ফ্লোরাল জাদু। কাপড়ে এটি ছড়ায় মিষ্টি ও লাস্যময়ী সুবাস যা সারাদিন সতেজ থাকে। যেকোনো পার্টি, পারিবারিক উৎসব কিংবা বন্ধুদের আড্ডায় যারা নিজের প্রাণবন্ত রূপ তুলে ধরতে চান, তাদের জন্য বমশেল এক অনবদ্য আকর্ষণ।",
    "price3ml": 220,
    "price6ml": 400,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 50,
    "stock3ml": 25,
    "stock6ml": 25,
    "sku": "VLR-ATT-BS01",
    "featured": true,
    "bestSeller": true,
    "newArrival": true,
    "rating": 4.9,
    "reviewsCount": 74,
    "images": [
      "/src/assets/images/product_vellure_bombshell_1.png",
      "/src/assets/images/product_vellure_bombshell_2.png",
      "/src/assets/images/product_vellure_bombshell_3.png"
    ],
    "notes": {
      "top": [
        "Passionfruit",
        "Grapefruit",
        "Pineapple"
      ],
      "topBn": [
        "প্যাশনফ্রুট",
        "গ্রেপফ্রুট",
        "আনারস"
      ],
      "heart": [
        "Peony",
        "Vanilla Orchid"
      ],
      "heartBn": [
        "পিওনি ফুল",
        "ভ্যানিলা অর্কিড"
      ],
      "base": [
        "Musk",
        "Woody notes"
      ],
      "baseBn": [
        "মাস্ক",
        "উডি নোটস"
      ]
    },
    "longevity": "12-16 Hours",
    "longevityBn": "১২-১৬ ঘণ্টা পর্যন্ত স্থায়ী",
    "sillage": "Radiant & Glamorous",
    "sillageBn": "উজ্জ্বল ও মোহময় সুবাস",
    "origin": "VELLURE Artisanal Reserve",
    "originBn": "ভেল্যুর আর্টিশানাল রিজার্ভ ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Parties, shopping, girls' get-togethers & date nights",
    "bestWeather": "Spring & Early Summer",
    "seasons": [
      "Spring",
      "Summer"
    ]
  },
  {
    "id": "prod-baccarat-rouge",
    "slug": "baccarat-rouge",
    "name": "Vellure Baccarat Rouge",
    "nameBn": "ভ্যালুর বাকারাত রুজ",
    "category": "attar",
    "categoryBn": "খাঁটি আতর",
    "fragranceType": "Oriental",
    "shortDescription": "The world's most luxurious olfactory obsession. Crystalline saffron threads, golden roasted caramel, and oceanic ambergris that creates a hypnotic breeze.",
    "shortDescriptionBn": "বিশ্বের সবচেয়ে মূল্যবান ও অভিজাত পারফিউমের সুরভি। সোনালী জাফরান, মিষ্টি ক্যারামেল আর রাজকীয় অ্যাম্বারগ্রিসের এক সম্মোহনী ও জাদুকরী সুবাস।",
    "description": "Baccarat Rouge is an intoxicating alchemy of light, heat, and crystalline mineral perfection. The fragrance enters like a gilded whisper of hand-plucked saffron and delicate jasmine petals that immediately catches the breath. Soon after, radiant amberwood and rare oceanic ambergris weave a translucent, warm sillage that smells like spun golden sugar floating above smoky cedar forests. Highly unique, ultra-luxurious, and universally mesmerizing—people will stop you on the street to ask what miraculous scent you are wearing. A single dab provides projection that endures past 24 hours on skin and days on clothing.",
    "descriptionBn": "ভ্যালুর বাকারাত রুজ হলো বিলাসবহুল পারফিউমের জগতের সবচেয়ে আলোচিত ও অমূল্য এক রত্ন। এর সুবাস কোনো সাধারণ সুবাসের মতো নয়; এতে রয়েছে রক্তিম জাফরানের মিষ্টি রূপালি স্ফুলিঙ্গ, জুঁই ফুলের নির্যাস এবং ক্যারামেলাইজড চিনির মতো এক অবিশ্বাস্য মিষ্টি ও উষ্ণ পরত। এর সাথে খাঁটি অ্যাম্বারগ্রিস ও সিডারউড যুক্ত হয়ে সৃষ্টি করে এমন এক স্বর্গীয় বাতাস, যা আপনি হেঁটে যাওয়ার পরও ঘরে কয়েক ঘণ্টা ধরে ভাসমান থাকে। যে কেউ এই ঘ্রাণ পেলে ফিরে তাকাতে বাধ্য হবে। বিয়েবাড়ি কিংবা ভিআইপি কোনো অনুষ্ঠানে রাজকীয় আভিজাত্য ফুটিয়ে তুলতে বাকারাত রুজের কোনো বিকল্প নেই।",
    "price3ml": 220,
    "price6ml": 400,
    "originalPrice3ml": 286,
    "originalPrice6ml": 520,
    "discount": 23,
    "stock": 50,
    "stock3ml": 25,
    "stock6ml": 25,
    "sku": "VLR-ATT-BCR01",
    "featured": true,
    "bestSeller": true,
    "newArrival": true,
    "rating": 5,
    "reviewsCount": 96,
    "images": [
      "/src/assets/images/product_vellure_baccarat_rouge_1.png",
      "/src/assets/images/product_vellure_baccarat_rouge_2.png",
      "/src/assets/images/product_vellure_baccarat_rouge_3.png"
    ],
    "notes": {
      "top": [
        "Saffron",
        "Jasmine"
      ],
      "topBn": [
        "জাফরান",
        "জুঁই"
      ],
      "heart": [
        "Amberwood",
        "Ambergris"
      ],
      "heartBn": [
        "অ্যাম্বারউড",
        "অ্যাম্বারগ্রিস"
      ],
      "base": [
        "Fir Resin",
        "Cedar"
      ],
      "baseBn": [
        "ফার রেজিন",
        "সিডারউড"
      ]
    },
    "longevity": "14-18 Hours",
    "longevityBn": "১৪-১৮ ঘণ্টা পর্যন্ত স্থায়ী",
    "sillage": "Magnetic & Prestigious",
    "sillageBn": "অসম্ভব আকর্ষণীয় ও আভিজাত্যপূর্ণ",
    "origin": "VELLURE Artisanal Reserve",
    "originBn": "ভেল্যুর আর্টিশানাল রিজার্ভ ব্লেন্ড",
    "alcoholFree": true,
    "bestFor": "Signature wear, high-end parties & special celebrations",
    "bestWeather": "Fall, Winter & Spring",
    "seasons": [
      "Autumn",
      "Winter",
      "Spring"
    ]
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  whatsappNumber: "+880 1820-032330",
  phone: "+880 1820-032330",
  email: "concierge@vellurebd.com",
  address: "Level 4, House 54, Road 11, Block D, Banani, Dhaka-1213, Bangladesh",
  addressBn: "লেভেল ৪, হাউস ৫৪, রোড ১১, ব্লক ডি, বনানী, ঢাকা-১২১৩, বাংলাদেশ",
  facebook: "https://www.facebook.com/vellurefragrance/",
  instagram: "https://www.instagram.com/vellure.fragrances/",
  deliveryFeeDhaka: 70,
  deliveryFeeOutside: 130,
  freeDeliveryThreshold: 2000,
  announcementTextEn: "Free Delivery on any combo",
  announcementTextBn: "যে কোনো কম্বোতে ফ্রি ডেলিভারি!",
  announcementBg: "emerald",
  announcementSpeed: "relaxed",
  telegramBotToken: "",
  telegramChatId: "",
  telegramNotifyAddToCart: true,
  telegramNotifyNewOrder: true,
  googleSheetId: "1C7BUzrO8G65qZKLrMgQfH6Okinv57gXdbCov2PjTaIA",
  googleSheetName: "Vellure Fragrances - Inventory",
  googleSheetEmail: "info.vellurefragrances@gmail.com",
  googleSheetWebhookUrl: "https://script.google.com/macros/s/AKfycbyi2tSRCnHp2SV1XTMorD9miR0rV3CN1HPvVgCQeWOxNwDG11IxqnZdIdgEO2oawXe9sQ/exec",
  googleSheetRange: "Vellure Fragrances - Inventory!A2:E",
  googleSheetLastSync: "2026-10-18T08:46:12.119Z",
  googleSheetSyncStatus: "connected",
  googleSheetSyncMessage: "Live synchronized with Google Sheet (\"Vellure Fragrances - Inventory\"). 15 items active.",
  metaPixelId: "1372601165072634",
  ga4MeasurementId: "G-PK2GKM4D1N",
  enableAnalytics: true
};
