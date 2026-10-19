import React from 'react';
import { Award, BookOpen, CheckCircle, FileSpreadsheet, Sparkles, Printer } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const LessonSummary: React.FC = () => {
  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const keyQuestions = [
    {
      q: "1. Aylanish davri nima?",
      a: "Jismning aylana bo‘ylab bitta to‘liq aylanishi uchun sarflangan vaqtdir. Formulalari: T = t / N va T = 1 / f. Birligi — sekund (s)."
    },
    {
      q: "2. Chastota nimani bildiradi?",
      a: "Vaqt birligi (1 sekund) ichida bajarilgan to‘liq aylanishlar sonini bildiradi. Formulalari: f = N / t va f = 1 / T. Birligi — Gers (Hz)."
    },
    {
      q: "3. Radius ortganda chiziqli tezlik qanday o‘zgaradi?",
      a: "Agar aylanish davri o‘zgarmas bo‘lsa, radius ortishi bilan chiziqli tezlik to‘g‘ri proporsional ortadi (v = 2πr / T). Masalan, karuselning tashqi halqasidagi o‘rindiq tezroq aylanadi."
    },
    {
      q: "4. Davr ortganda, radius o‘zgarmasa, chiziqli tezlik qanday o‘zgaradi?",
      a: "Davr ortsa (ya'ni jism sekinroq aylansa), chiziqli tezlik kamayadi. Chunki tezlik davrga teskari proporsionaldir."
    },
    {
      q: "5. Tezlik vektori qaysi yo‘nalishda bo‘ladi?",
      a: "Aylana trayektoriyasining har bir nuqtasida tezlik vektori v⃗ aylanaga urinma va radiusga qat'iy perpendikulyar (90°) yo‘nalishda bo‘ladi."
    }
  ];

  return (
    <div id="summary" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <CheckCircle className="w-3.5 h-3.5" /> Dars Xulosasi
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            14-Mavzu Bo‘yicha Asosiy Xulosalar
          </h2>
          <p className="text-sm text-slate-400">
            Darsda o‘rganilgan qonuniyatlar, formulalar eslatmasi va ochiq dars yakuni.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all no-print"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Dars Xulosasini Chop Etish (Print)</span>
        </button>
      </div>

      {/* 5 Core Conceptual Answers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keyQuestions.map((item, idx) => (
          <div
            key={idx}
            className={`bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2 ${
              idx === 4 ? 'md:col-span-2 bg-gradient-to-r from-slate-950 to-cyan-950/20 border-cyan-800/60' : ''
            }`}
          >
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              {item.q}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>

      {/* Formula Cheat-sheet */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-amber-400" />
          Eslab Qolish Shart Bo‘lgan Formulalar
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium block">Davr va Chastota:</span>
            <div className="text-base font-mono font-bold text-amber-400">T = t / N</div>
            <div className="text-base font-mono font-bold text-cyan-400">f = 1 / T</div>
            <span className="text-[10px] text-slate-500 font-mono block mt-1">[T] = s, [f] = Hz</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium block">Chiziqli Tezlik:</span>
            <div className="text-base font-mono font-bold text-emerald-400">v = 2πr / T</div>
            <div className="text-base font-mono font-bold text-emerald-300">v = 2πrf</div>
            <span className="text-[10px] text-slate-500 font-mono block mt-1">[v] = m/s, [r] = m</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-medium block">Burchak Tezligi & Tezlanish:</span>
            <div className="text-base font-mono font-bold text-violet-400">ω = 2π / T</div>
            <div className="text-base font-mono font-bold text-rose-400">a = v² / r</div>
            <span className="text-[10px] text-slate-500 font-mono block mt-1">[ω] = rad/s, [a] = m/s²</span>
          </div>
        </div>
      </div>

      {/* Teacher's Open Lesson Checklist & Final Note */}
      <div className="bg-gradient-to-r from-cyan-950/30 via-slate-950 to-slate-900 border border-cyan-800/60 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
          <Sparkles className="w-4 h-4" /> O‘qituvchi Uchun Yakuniy Xulosa va Metodik Tavsiya
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Mazkur dars vositasi orqali 7-sinf o‘quvchilarida egrichiziqli harakat haqida to‘liq tasavvur shakllantirildi.
          Tajriba simulyatsiyasida radius va davr parametrlarini o‘zgartirish orqali o‘quvchilar nazariy bilimlarni
          o‘z ko‘zlari bilan tasdiqlashdi. Omad chambaragi va masalalar orqali o‘quvchilar darsga 100% jalb qilindi.
        </p>
        <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex flex-wrap justify-between">
          <span>ORBITA LAB — Zamonaviy O‘zbekiston Fizika Ta’limi Tizimi</span>
          <span className="font-mono text-cyan-400">7-sinf | 14-mavzu</span>
        </div>
      </div>
    </div>
  );
};
