import { Question, Problem, RealWorldExample } from '../types/physics';

// 8 Questions for "Omad Chambaragi"
export const fortuneWheelQuestions: Question[] = [
  {
    id: 1,
    question: "Jism aylana bo‘ylab bir marta to‘liq aylanishi uchun ketgan vaqt nima deb ataladi?",
    options: [
      "Aylanish davri (T)",
      "Aylanish chastotasi (f)",
      "Chiziqli tezlik (v)",
      "Burchak tezligi (ω)"
    ],
    correctAnswer: 0,
    explanation: "Bir marta to‘liq aylanish uchun sarflangan vaqt aylanish davri (T) deyiladi va sekundlarda (s) o‘lchanadi.",
    category: "davr"
  },
  {
    id: 2,
    question: "Aylana bo‘ylab harakatda chiziqli tezlik vektori qaysi yo‘nalishga yo‘nalgan bo‘ladi?",
    options: [
      "Aylana markaziga qarab",
      "Trayektoriyaga urinma yo‘nalishda",
      "Radius bo‘ylab tashqariga",
      "Harakat tekisligiga perpendikulyar"
    ],
    correctAnswer: 1,
    explanation: "Aylana bo‘ylab harakatlanayotgan jismning har bir nuqtadagi chiziqli tezlik vektori trayektoriyaga urinma va radiusga perpendikulyar bo‘ladi.",
    category: "tezlik"
  },
  {
    id: 3,
    question: "1 sekund ichida sodir bo‘lgan to‘liq aylanishlar soni qanday fizik kattalik?",
    options: [
      "Davr",
      "Chastota (f)",
      "Radius",
      "Bosib o‘tilgan yo‘l"
    ],
    correctAnswer: 1,
    explanation: "Vaqt birligi (1 sekund) ichida bajarilgan to‘liq aylanishlar soni aylanish chastotasi (f = N / t) deb ataladi.",
    category: "chastota"
  },
  {
    id: 4,
    question: "Xalqaro birliklar sistemasida (SI) chastotaning o‘lchov birligi nima?",
    options: [
      "Sekund (s)",
      "Metr / sekund (m/s)",
      "Gers (Hz)",
      "Radian (rad)"
    ],
    correctAnswer: 2,
    explanation: "Chastota birligi nemis fizigi Genrix Gers sharafiga Gers (Hz) yoki 1/s (s⁻¹) deb qabul qilingan.",
    category: "chastota"
  },
  {
    id: 5,
    question: "Aylanish davri T = 0,2 s bo‘lsa, uning aylanish chastotasi f nimaga teng?",
    options: [
      "2 Hz",
      "5 Hz",
      "0,5 Hz",
      "10 Hz"
    ],
    correctAnswer: 1,
    explanation: "f = 1 / T formulaga ko‘ra: f = 1 / 0,2 = 5 Hz. Ya'ni jism bir sekundda 5 marta to‘liq aylanadi.",
    category: "chastota"
  },
  {
    id: 6,
    question: "Aylanish davri o‘zgarmagan holda radius 2 marta orttirilsa, chiziqli tezlik qanday o‘zgaradi?",
    options: [
      "2 marta kamayadi",
      "O‘zgarmaydi",
      "2 marta ortadi",
      "4 marta ortadi"
    ],
    correctAnswer: 2,
    explanation: "v = 2πr / T formulasidan ko‘rinib turibdiki, tezlik v radius r ga to‘g‘ri proporsional. Radius 2 marta ortsa, tezlik ham 2 marta ortadi.",
    category: "tezlik"
  },
  {
    id: 7,
    question: "Soatning sekund mili bir marta to‘liq aylanib chiqishi uchun qancha vaqt ketadi (davri T)?",
    options: [
      "1 sekund",
      "12 soat",
      "60 sekund (1 minut)",
      "3600 sekund (1 soat)"
    ],
    correctAnswer: 2,
    explanation: "Sekund mili siferblat bo‘ylab to‘liq 1 marta aylanib chiqishi uchun roppa-rosa 60 sekund (1 minut) sarflaydi. Demak, T = 60 s.",
    category: "amaliyot"
  },
  {
    id: 8,
    question: "Nima sababli aylana bo‘ylab bir tekis harakatda tezlik moduli o‘zgarmas bo‘lsa ham, tezlanish mavjud bo‘ladi?",
    options: [
      "Chunki tezlik yo‘nalishi uzluksiz o‘zgarib turadi",
      "Chunki radiusi doim o‘zgarib turadi",
      "Chunki davr ortib boradi",
      "Bu harakatda tezlanish umuman mavjud emas"
    ],
    correctAnswer: 0,
    explanation: "Tezlik vektor kattalik. Uning son qiymati (moduli) o‘zgarmasa ham, aylanma harakatda yo‘nalishi uzluksiz o‘zgaradi, shuning uchun markazga intilma tezlanish yuzaga keladi.",
    category: "tezlik"
  }
];

// 10 Detailed Questions for Knowledge Quiz (Viktorina)
export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Quyidagi harakatlardan qaysi biri aylana bo‘ylab harakatga yorqin misol bo‘ladi?",
    options: [
      "Poezdning to‘g‘ri temir yo‘l bo‘ylab harakati",
      "Karusel o‘rindig‘ining harakati",
      "Daraxtdan yerga tushayotgan olma",
      "Stol ustida to‘g‘ri sirpanayotgan chizg‘ich"
    ],
    correctAnswer: 1,
    explanation: "Karusel aylana markazidagi o‘q atrofida aylanadi, uning har bir o‘rindig‘i aylana shaklidagi trayektoriya chizadi.",
    category: "amaliyot"
  },
  {
    id: 2,
    question: "Aylanish davri (T) va chastota (f) orasidagi to‘g‘ri bog‘liqlik qaysi formulada ifodalangan?",
    options: [
      "T = f",
      "T · f = 1  (ya'ni f = 1/T)",
      "T = 2π / f",
      "T · f = 2π"
    ],
    correctAnswer: 1,
    explanation: "Davr va chastota o‘zaro teskari kattaliklardir: f = 1 / T yoki T · f = 1.",
    category: "davr"
  },
  {
    id: 3,
    question: "Jism t = 20 s ichida N = 40 marta to‘liq aylandi. Aylanish davri T qancha?",
    options: [
      "2 s",
      "0,5 s",
      "800 s",
      "20 s"
    ],
    correctAnswer: 1,
    explanation: "Davr formulasi: T = t / N = 20 s / 40 = 0,5 s.",
    category: "davr"
  },
  {
    id: 4,
    question: "Aylana radiusi r = 0,5 m bo‘lsa, jismning 1 marta to‘liq aylanishda bosib o‘tgan yo‘li (aylana uzunligi L) qancha bo‘ladi? (π ≈ 3,14)",
    options: [
      "1,57 m",
      "3,14 m",
      "6,28 m",
      "0,5 m"
    ],
    correctAnswer: 1,
    explanation: "Aylana uzunligi: L = 2πr = 2 · 3,14 · 0,5 m = 3,14 m.",
    category: "radius"
  },
  {
    id: 5,
    question: "Radiusi r = 1 m bo‘lgan g‘ildirak aylanish davri T = 3,14 s bo‘lsa, gardishidagi nuqtaning chiziqli tezligi v qancha bo‘ladi?",
    options: [
      "1 m/s",
      "2 m/s",
      "3,14 m/s",
      "6,28 m/s"
    ],
    correctAnswer: 1,
    explanation: "v = 2πr / T = (2 · 3,14 · 1) / 3,14 = 2 m/s.",
    category: "tezlik"
  },
  {
    id: 6,
    question: "Ventilyator parragining aylanish chastotasi f = 50 Hz bo‘lsa, u 1 minutda (60 s) necha marta aylanadi?",
    options: [
      "50 marta",
      "300 marta",
      "3 000 marta",
      "1 200 marta"
    ],
    correctAnswer: 2,
    explanation: "f = N / t  bo‘lgani uchun: N = f · t = 50 Hz · 60 s = 3 000 marta.",
    category: "chastota"
  },
  {
    id: 7,
    question: "Bir xil burchak tezlikda aylanayotgan plastinkada markazdan 10 cm va 20 cm masofadagi nuqtalar olingan. 20 cm masofadagi nuqtaning chiziqli tezligi qanday?",
    options: [
      "10 cm masofadagidan 2 marta katta",
      "10 cm masofadagidan 2 marta kichik",
      "Ikkalasida ham chiziqli tezlik mutlaqo teng",
      "4 marta katta"
    ],
    correctAnswer: 0,
    explanation: "v = ω · r bo‘lib, bir qattiq jismning barcha nuqtalari uchun davr va burchak tezlik bir xil. Radius 2 marta katta bo‘lsa, chiziqli tezlik ham 2 marta katta bo‘ladi.",
    category: "tezlik"
  },
  {
    id: 8,
    question: "Agar jismning aylana bo‘ylab harakatida ip to‘satdan uzilib ketsa, jism qaysi yo‘nalishda uchib ketadi?",
    options: [
      "To‘g‘ri aylananing markazi tomon",
      "Ip uzilgan nuqtadagi aylanaga urinma (tezlik vektori) yo‘nalishida",
      "Markazdan to‘g‘ri teskari yo‘nalishda",
      "Harakatini aylanada davom ettiradi"
    ],
    correctAnswer: 1,
    explanation: "Inersiya qonuniga ko‘ra, jism o‘sha oniy paytdagi tezlik vektori bo‘ylab, ya'ni urinma yo‘nalishda to‘g‘ri chiziqli harakat qilib uchadi.",
    category: "tezlik"
  },
  {
    id: 9,
    question: "Soatning minut mili to‘liq 1 marta aylanishi uchun sarflanadigan vaqt (davri T) qancha?",
    options: [
      "60 sekund",
      "60 minut (3600 sekund)",
      "12 soat",
      "24 soat"
    ],
    correctAnswer: 1,
    explanation: "Minut mili 1 to‘liq aylanishni 1 soatda, ya'ni 60 minut = 3600 sekundda amalga oshiradi. Demak T = 3600 s.",
    category: "amaliyot"
  },
  {
    id: 10,
    question: "Radius o‘zgarmagan holda aylanish chastotasi 3 marta oshirilsa, chiziqli tezlik qanday o‘zgaradi?",
    options: [
      "3 marta kamayadi",
      "O‘zgarmaydi",
      "3 marta ortadi",
      "9 marta ortadi"
    ],
    correctAnswer: 2,
    explanation: "v = 2πr · f formulaga ko‘ra, chiziqli tezlik v chastota f ga to‘g‘ri proporsional. Chastota 3 marta oshsa, tezlik ham 3 marta oshadi.",
    category: "tezlik"
  }
];

// 5 Independent Physics Problems (Mustaqil masalalar)
export const independentProblems: Problem[] = [
  {
    id: 1,
    title: "1-masala: Baraban aylanish davri",
    difficulty: "Oson",
    statement: "Kir yuvish mashinasining barabani t = 10 sekund ichida N = 200 marta to‘liq aylandi. Barabanning aylanish davri (T) ni toping.",
    given: [
      { label: "Vaqt (t)", value: "10 s" },
      { label: "Aylanishlar soni (N)", value: "200" }
    ],
    toFind: "Aylanish davri (T)",
    formula: "T = t / N",
    correctAnswer: 0.05,
    unit: "s",
    tolerance: 0.05,
    solutionSteps: [
      "1. Berilganlarni yozamiz: t = 10 s, N = 200.",
      "2. Aylanish davri formulasini qo‘llaymiz: T = t / N.",
      "3. Qiymatlarni qo‘yamiz: T = 10 s / 200 = 0,05 s.",
      "Javob: Barabanning aylanish davri T = 0,05 sekund (yoki 50 millisekund)."
    ]
  },
  {
    id: 2,
    title: "2-masala: Parrakning aylanish chastotasi",
    difficulty: "Oson",
    statement: "Vertolyot vinti 1 minut (t = 60 s) ichida N = 1800 marta aylanadi. Vintning aylanish chastotasi (f) ni gerslarda hisoblang.",
    given: [
      { label: "Vaqt (t)", value: "60 s" },
      { label: "Aylanishlar soni (N)", value: "1800" }
    ],
    toFind: "Aylanish chastotasi (f)",
    formula: "f = N / t",
    correctAnswer: 30,
    unit: "Hz",
    tolerance: 0.02,
    solutionSteps: [
      "1. Berilganlarni yozamiz: t = 60 s, N = 1800.",
      "2. Aylanish chastotasi formulasi: f = N / t.",
      "3. Qiymatlarni qo‘yamiz: f = 1800 / 60 s = 30 Hz.",
      "Javob: Vertolyot vintining aylanish chastotasi f = 30 Hz."
    ]
  },
  {
    id: 3,
    title: "3-masala: Karusel o‘rindig‘ining chiziqli tezligi",
    difficulty: "O‘rta",
    statement: "Bolalar karuseli aylanayotganda, aylanish markazidan r = 4 metr masofadagi o‘rindiq T = 8 sekund davr bilan aylanadi. O‘rindiqning chiziqli tezligi v ni toping. (π = 3,14 deb oling)",
    given: [
      { label: "Radius (r)", value: "4 m" },
      { label: "Aylanish davri (T)", value: "8 s" },
      { label: "Doimiy son (π)", value: "3,14" }
    ],
    toFind: "Chiziqli tezlik (v)",
    formula: "v = 2πr / T",
    correctAnswer: 3.14,
    unit: "m/s",
    tolerance: 0.03,
    solutionSteps: [
      "1. Berilgan: r = 4 m, T = 8 s, π = 3,14.",
      "2. Chiziqli tezlik formulasi: v = 2πr / T.",
      "3. Qiymatlarni qo‘yamiz: v = (2 · 3,14 · 4) / 8 = 25,12 / 8 = 3,14 m/s.",
      "Javob: Karusel o‘rindig‘ining chiziqli tezligi v = 3,14 m/s (taxminan 11,3 km/soat)."
    ]
  },
  {
    id: 4,
    title: "4-masala: Davrdan chastotani va tezlikni topish",
    difficulty: "O‘rta",
    statement: "Radiusi r = 0,25 m bo‘lgan avtomobil g‘ildiragi f = 20 Hz chastota bilan aylanmoqda. G‘ildirak gardishining chiziqli tezligi v ni toping. (π = 3,14 deb oling)",
    given: [
      { label: "Radius (r)", value: "0,25 m" },
      { label: "Chastota (f)", value: "20 Hz" },
      { label: "Doimiy son (π)", value: "3,14" }
    ],
    toFind: "Chiziqli tezlik (v)",
    formula: "v = 2πrf",
    correctAnswer: 31.4,
    unit: "m/s",
    tolerance: 0.03,
    solutionSteps: [
      "1. Berilgan: r = 0,25 m, f = 20 Hz, π = 3,14.",
      "2. Chiziqli tezlik formulasi: v = 2π · r · f.",
      "3. Qiymatlarni qo‘yamiz: v = 2 · 3,14 · 0,25 · 20 = 31,4 m/s.",
      "Javob: Chiziqli tezlik v = 31,4 m/s (bu taxminan 113 km/soat tezlikka to‘g‘ri keladi)."
    ]
  },
  {
    id: 5,
    title: "5-masala: Hayotiy vaziyat — Sekund milining uchi",
    difficulty: "Murakkab / Hayotiy",
    statement: "Devor soatining sekund mili uzunligi r = 15 cm (0,15 m) ga teng. Sekund milining uchki qismi qanday chiziqli tezlik v bilan harakatlanishini mm/s (millimetr / sekund) da hisoblang. (π = 3,14 deb oling)",
    given: [
      { label: "Mil uzunligi (r)", value: "0,15 m = 150 mm" },
      { label: "Sekund mili davri (T)", value: "60 s" },
      { label: "Doimiy son (π)", value: "3,14" }
    ],
    toFind: "Mil uchining tezligi (v)",
    formula: "v = 2πr / T",
    correctAnswer: 15.7,
    unit: "mm/s",
    tolerance: 0.05,
    solutionSteps: [
      "1. Sekund milining to‘liq aylanish davri ma'lum: T = 60 s.",
      "2. Radius millimetrda: r = 150 mm.",
      "3. Chiziqli tezlik: v = 2 · 3,14 · 150 mm / 60 s = 942 / 60 = 15,7 mm/s.",
      "4. Metrlarda ifodalansa: v ≈ 0,0157 m/s.",
      "Javob: Sekund mili uchi 1 sekundda 15,7 millimetr yo‘l bosadi (v = 15,7 mm/s)."
    ]
  }
];

// 4 Real World Examples
export const realWorldExamples: RealWorldExample[] = [
  {
    id: "bicycle",
    title: "1. Velosiped g‘ildiragi",
    subtitle: "Gardish va o‘q tezliklari farqi",
    description: "Velosiped ketayotganda g‘ildirak o‘z o‘qi atrofida aylanadi. G‘ildirak markazi (vtulka) va tashqi shina bir xil davrda aylanadi, lekin ularning chiziqli tezliklari keskin farq qiladi.",
    rotatingPart: "Shina gardishi, simlar (spitsalar) va tishli yulduzcha.",
    physicsConnection: "Aylanish davri T hamma nuqtada bir xil. Lekin tashqi shina radiusi r katta bo‘lgani sababli, v = 2πr / T formulasiga ko‘ra uning chiziqli tezligi ancha katta bo‘ladi.",
    question: {
      text: "G‘ildirak markaziga yaqin nuqta va shina ustidagi nuqtaning qaysi birida chiziqli tezlik kattaroq?",
      options: [
        "Markazga yaqin nuqtada",
        "Shina ustidagi tashqi nuqtada",
        "Ikkalasida ham chiziqli tezlik mutlaqo bir xil",
        "Velosiped qaysi tomonga burilishiga bog‘liq"
      ],
      correct: 1,
      explanation: "To‘g‘ri! Shina ustidagi nuqta aylananing eng katta radiusida joylashgan, shuning uchun v = 2πr/T bo‘yicha uning chiziqli tezligi eng katta bo‘ladi."
    }
  },
  {
    id: "fan",
    title: "2. Ventilyator parraklari",
    subtitle: "Chastota va havo oqimi hosil qilish",
    description: "Xona ventilyatori motori parraklarni yuqori chastota (masalan f = 20–50 Hz) bilan aylantiradi. Parrak uchlari havoni surib, kuchli oqim hosil qiladi.",
    rotatingPart: "Ventilyatorning 3 yoki 4 ta egri parraklari.",
    physicsConnection: "Parrak uchi juda katta chiziqli tezlikka ega. Agar motor chastotasi f oshirilsa, v = 2πrf formulaga ko‘ra uchki tezlik ham to‘g‘ri proporsional ortadi.",
    question: {
      text: "Agar ventilyator chastotasi 20 Hz dan 40 Hz ga oshirilsa, parrak uchining chiziqli tezligi qanday o‘zgaradi?",
      options: [
        "2 marta kamayadi",
        "O‘zgarmaydi",
        "2 marta ortadi",
        "4 marta ortadi"
      ],
      correct: 2,
      explanation: "To‘g‘ri! v = 2πrf formulada tezlik chastotaga to‘g‘ri proporsional. Chastota 2 barobar oshsa, tezlik ham 2 barobar ortadi."
    }
  },
  {
    id: "carousel",
    title: "3. Istirohat bog‘idagi karusel",
    subtitle: "Ichki va tashqi o‘rindiqlar siri",
    description: "Karusel aylanganda barcha o‘rindiqlar bir xil davrda to‘liq aylanadi. Biroq markazdan uzoqroqdagi otchalar o‘tirgan bolalarga tezlik kuchliroq seziladi.",
    rotatingPart: "Karusel platformasi va barcha o‘rindiqlar.",
    physicsConnection: "Burchak tezligi barcha uchun bir xil (ω = 2π/T). Lekin tashqi halqadagi o‘rindiqlar radiusi katta bo‘lgani uchun v = 2πr/T tezligi ancha katta bo‘lib, markazga intilma tezlanish a = v²/r ham sezilarli bo‘ladi.",
    question: {
      text: "Karuselning tashqi qatorida o‘tirgan bola nima sababli ichki qatordagiga nisbatan tezroq harakatlanadi?",
      options: [
        "Chunki uning aylanish davri kamroq",
        "Chunki uning aylanish radiusi kattaroq (v = 2πr/T)",
        "Chunki tashqi o‘rindiqning massasi yengilroq",
        "Chunki uning aylanish chastotasi boshqacha"
      ],
      correct: 1,
      explanation: "To‘g‘ri! Davr barcha o‘rindiqlar uchun bir xil, lekin tashqi qator radiusi r kattaroq bo‘lgani sababli chiziqli tezlik ham yuqori bo‘ladi."
    }
  },
  {
    id: "clock",
    title: "4. Soatning sekund mili",
    subtitle: "Barqaror davr va aniq hisob",
    description: "Mexanik yoki kvars soatning sekund mili siferblat markazidagi o‘qqa mahkamlangan. U bir tekis to‘xtovsiz aylanib, aniq vaqt o‘lchovini ta'minlaydi.",
    rotatingPart: "Sekund mili sterjeni va uning uchki ko‘rsatkichi.",
    physicsConnection: "Sekund milining davri tabiatda doim T = 60 sekund. Chastotasi esa f = 1/60 Hz ≈ 0,0167 Hz ga teng. Uning uchining chiziqli tezligi v = 2πr / 60 formula bilan hisoblanadi.",
    question: {
      text: "Soatning sekund mili chastotasi f qanchaga teng?",
      options: [
        "1 Hz",
        "60 Hz",
        "1/60 Hz (taxminan 0,0167 Hz)",
        "3600 Hz"
      ],
      correct: 2,
      explanation: "To‘g‘ri! f = 1 / T. Sekund milining davri T = 60 s bo‘lgani uchun, uning chastotasi f = 1 / 60 Hz ga teng."
    }
  }
];
