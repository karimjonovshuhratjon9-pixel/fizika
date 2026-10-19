import React, { useState } from 'react';
import { Target, CheckCircle2, BookOpen, Brain, Activity, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const ObjectivesSection: React.FC = () => {
  const [checkedOutcomes, setCheckedOutcomes] = useState<number[]>([0, 1]);

  const toggleOutcome = (index: number) => {
    soundFx.playClick();
    setCheckedOutcomes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const outcomes = [
    "Aylana bo‘ylab harakat, aylanish davri va chastotasini o‘z so‘zlari bilan ta’riflay oladi.",
    "T = t / N va f = 1 / T formulalari orqali davr va chastotani mustaqil hisoblay oladi.",
    "v = 2πr / T formulasi yordamida chiziqli tezlikni aniqlaydi va radius ta’sirini tushuntiradi.",
    "Tezlik vektorining har bir nuqtada aylanaga urinma yo‘nalishda ekanini chizmada ko‘rsata oladi.",
    "Real hayotdagi velosiped, ventilyator va soat mili misollarida fizik bog‘lanishlarni tahlil qiladi."
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5" /> Dars Strukturasi
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Darsning Asosiy Maqsadlari
          </h2>
          <p className="text-sm text-slate-400">
            Davlat ta’lim standarti (DTS) talablari bo‘yicha 3 ta asosiy yo‘nalish:
          </p>
        </div>
      </div>

      {/* 3 Main Branches */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Branch 1: Bilim */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-800 flex items-center justify-center text-cyan-400 shadow-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">1-yo‘nalish</span>
            <h3 className="text-lg font-bold text-white mt-1">Bilim (Nazariya)</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-2.5 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Aylana bo‘ylab harakat va uning egrichiziqli harakat turlaridan farqini o‘rganish.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Aylanish davri (T), chastota (f), radius (r) va chiziqli tezlik (v) fizik ma’nosini anglash.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Xalqaro SI birliklar sistemasidagi o‘lchov birliklarini (s, Hz, m/s) o‘zlashtirish.</span>
            </li>
          </ul>
        </div>

        {/* Branch 2: Ko'nikma */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-amber-500/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-800 flex items-center justify-center text-amber-400 shadow-lg">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">2-yo‘nalish</span>
            <h3 className="text-lg font-bold text-white mt-1">Ko‘nikma (Hisoblash)</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-2.5 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">•</span>
              <span>Fizik formulalar (T = t / N, f = N / t, v = 2πr / T) yordamida hisoblashlarni bajarish.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">•</span>
              <span>Tajriba parametrlarini o‘zgartirib, natijalar o‘zgarishini kuzatish va qayd qilish.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-0.5">•</span>
              <span>Matematik ifodalarda o‘lchov birliklarini to‘g‘ri aylantirish va yaxlitlash.</span>
            </li>
          </ul>
        </div>

        {/* Branch 3: Tahlil */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-emerald-500/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-800 flex items-center justify-center text-emerald-400 shadow-lg">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">3-yo‘nalish</span>
            <h3 className="text-lg font-bold text-white mt-1">Tahlil (Ilmiy tafakkur)</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-2.5 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">•</span>
              <span>Radius ortganda tezlik nima sababdan ortishini fizik model orqali isbotlash.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">•</span>
              <span>Tezlik moduli o‘zgarmas bo‘lsa ham, yo‘nalish o‘zgarishi sababli tezlanish borligini tushunish.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">•</span>
              <span>Kundalik turmushda uchraydigan aylanma harakatlarni mustaqil tahlil qilish.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Student Outcomes Checklist */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Dars oxirida o‘quvchi nimalarni bajara oladi?
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {checkedOutcomes.length} / {outcomes.length} ko‘nikma o‘zlashtirildi
          </span>
        </div>

        <div className="space-y-2.5">
          {outcomes.map((text, idx) => {
            const isChecked = checkedOutcomes.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => toggleOutcome(idx)}
                className={`p-3 rounded-xl border text-xs flex items-center gap-3 cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'border-slate-700 bg-slate-950'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="flex-1">{text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
