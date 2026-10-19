import React, { useState } from 'react';
import { BookOpen, Compass, ArrowUpRight, Check, Sparkles, Layers } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const TheorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basics' | 'formulas' | 'vectors'>('basics');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-8">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" /> Nazariy Laboratoriya
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Aylana Bo‘ylab Harakat Qonuniyatlari
          </h2>
          <p className="text-sm text-slate-400">
            7-sinf fizika darsligi asosida sodda, ilmiy va vizual tushuntirishlar.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('basics');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'basics'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Asosiy Tushunchalar
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('formulas');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'formulas'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Fizik Formulalar
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('vectors');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'vectors'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Urinma Tezlik Vektori
          </button>
        </div>
      </div>

      {/* Tab 1: Basics */}
      {activeTab === 'basics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-800 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-100">Aylana bo‘ylab harakat nima?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jismning trayektoriyasi <strong>aylanadan iborat</strong> bo‘lgan egrichiziqli harakatdir. Bunday harakatda jism aylananing markazidan doimo bir xil masofada (radius masofasida) bo‘ladi.
            </p>
            <div className="pt-2 text-[11px] text-cyan-400 font-mono">Misol: soat millari, charxpalak, yer sun'iy yo‘ldoshi</div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-9 h-9 rounded-xl bg-amber-950/60 border border-amber-800 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-100">Aylanish davri (T)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jismning aylana bo‘ylab <strong>bir marta to‘liq aylanishi</strong> uchun ketgan vaqtga aylanish davri deyiladi.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 text-center">
              T = t / N  [sekund, s]
            </div>
            <div className="text-[11px] text-slate-400">t — umumiy vaqt, N — to‘liq aylanishlar soni.</div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-800 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-100">Aylanish chastotasi (f)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vaqt birligi (1 sekund) ichida bajarilgan <strong>to‘liq aylanishlar soni</strong>ga aylanish chastotasi deyiladi.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 text-center">
              f = N / t = 1 / T  [Gers, Hz]
            </div>
            <div className="text-[11px] text-slate-400">1 Hz = 1 / s (sekundiga 1 to‘liq aylanish).</div>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-800 flex items-center justify-center text-blue-400 font-mono font-bold text-sm">
              04
            </div>
            <h3 className="text-base font-bold text-slate-100">Aylana radiusi (r) va uzunligi (L)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Markazdan aylanayotgan jismgacha bo‘lgan masofa <strong>radius (r)</strong> deyiladi. 1 to‘liq aylanishda jism bosib o‘tgan masofa aylana uzunligiga teng:
            </p>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-blue-300 text-center">
              L = 2πr  (π ≈ 3,14)
            </div>
            <div className="text-[11px] text-slate-400">SI o‘lchov birligi: metr (m).</div>
          </div>

          {/* Card 5 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-9 h-9 rounded-xl bg-violet-950/60 border border-violet-800 flex items-center justify-center text-violet-400 font-mono font-bold text-sm">
              05
            </div>
            <h3 className="text-base font-bold text-slate-100">Chiziqli tezlik (v)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jismning aylana yoyi bo‘ylab bosib o‘tgan yo‘lining shu yo‘lni bosib o‘tish uchun ketgan vaqtga nisbatiga teng:
            </p>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-violet-300 text-center">
              v = 2πr / T = 2πrf  [m/s]
            </div>
            <div className="text-[11px] text-slate-400">Radius ortsa, xuddi shu davrda tezlik ortadi!</div>
          </div>

          {/* Card 6 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-9 h-9 rounded-xl bg-rose-950/60 border border-rose-800 flex items-center justify-center text-rose-400 font-mono font-bold text-sm">
              06
            </div>
            <h3 className="text-base font-bold text-slate-100">Burchak tezligi (ω)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Radius-vektorning vaqt birligi ichida burilish burchagiga teng kattalik. Bir tekis aylanishda barcha nuqtalar uchun bir xil bo‘ladi:
            </p>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-rose-300 text-center">
              ω = 2π / T = 2πf  [rad/s]
            </div>
            <div className="text-[11px] text-slate-400">Burchak tezligi bilan chiziqli tezlik: v = ω · r</div>
          </div>
        </div>
      )}

      {/* Tab 2: Formulas Table */}
      {activeTab === 'formulas' && (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
                  <th className="py-3 px-4">Kattalik nomi</th>
                  <th className="py-3 px-4">Belgilanishi</th>
                  <th className="py-3 px-4">Asosiy Formula</th>
                  <th className="py-3 px-4">SI Birligi</th>
                  <th className="py-3 px-4">Fizik ma’nosi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono">
                <tr className="hover:bg-slate-950/60 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-200">Aylanish davri</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">T</td>
                  <td className="py-3.5 px-4 text-cyan-300 font-bold">T = t / N = 1 / f</td>
                  <td className="py-3.5 px-4 text-slate-300">sekund (s)</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">1 ta to‘liq aylanish vaqti</td>
                </tr>
                <tr className="hover:bg-slate-950/60 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-200">Aylanish chastotasi</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">f</td>
                  <td className="py-3.5 px-4 text-cyan-300 font-bold">f = N / t = 1 / T</td>
                  <td className="py-3.5 px-4 text-slate-300">Gers (Hz) yoki s⁻¹</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">1 sekunddagi aylanishlar soni</td>
                </tr>
                <tr className="hover:bg-slate-950/60 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-200">Chiziqli tezlik</td>
                  <td className="py-3.5 px-4 text-cyan-400 font-bold">v</td>
                  <td className="py-3.5 px-4 text-cyan-300 font-bold">v = 2πr / T = 2πrf</td>
                  <td className="py-3.5 px-4 text-slate-300">metr/sekund (m/s)</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">Aylana bo‘ylab tezlik kattaligi</td>
                </tr>
                <tr className="hover:bg-slate-950/60 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-200">Burchak tezligi</td>
                  <td className="py-3.5 px-4 text-violet-400 font-bold">ω (omega)</td>
                  <td className="py-3.5 px-4 text-cyan-300 font-bold">ω = 2π / T = 2πf</td>
                  <td className="py-3.5 px-4 text-slate-300">radian/sekund (rad/s)</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">Radius burilish burchagi tezligi</td>
                </tr>
                <tr className="hover:bg-slate-950/60 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-200">Markazga intilma tezlanish</td>
                  <td className="py-3.5 px-4 text-rose-400 font-bold">a</td>
                  <td className="py-3.5 px-4 text-cyan-300 font-bold">a = v² / r = ω²r</td>
                  <td className="py-3.5 px-4 text-slate-300">m/s²</td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">Tezlik yo‘nalishi o‘zgarishi jadalligi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Tangent Velocity & Acceleration Vector */}
      {activeTab === 'vectors' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              Nima uchun tezlik vektori doimo trayektoriyaga URINMA bo‘ladi?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Faraz qiling, bolakay ipga bog‘langan toshni aylanada aylantirmoqda. Agar ip to‘satdan uzilib ketsa, tosh qayerga uchadi?
              <br /><br />
              U inersiya qonuni bo‘yicha <strong>aynan ip uzilgan nuqtadagi urinma chiziq bo‘ylab</strong> to‘g‘ri uchib ketadi!
              Chunki jismning o‘sha lahzadagi tezligi aynan shu urinma yo‘nalishga qaratilgan edi.
            </p>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="text-emerald-400 font-bold">Eng muhim xulosa:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Bir tekis aylana harakatda <strong>tezlik moduli |v⃗| = const</strong> bo‘lishi mumkin.</li>
                <li>Lekin <strong>tezlik yo‘nalishi har soniyada o‘zgarib</strong> boradi.</li>
                <li>Tezlik vektor kattalik bo‘lgani uchun, yo‘nalish o‘zgarishi natijasida harakat <strong>tezlanishli</strong> bo‘ladi.</li>
                <li>Bu tezlanish aylananing markaziga qarab yo‘nalgan va <strong>markazga intilma tezlanish</strong> deyiladi.</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center w-full max-w-sm">
              <svg width="220" height="220" viewBox="0 0 220 220" className="mx-auto">
                <circle cx="110" cy="110" r="75" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="5 3" />
                {/* Center */}
                <circle cx="110" cy="110" r="4" fill="#38bdf8" />
                <text x="110" y="125" fill="#94a3b8" fontSize="10" textAnchor="middle">O (markaz)</text>

                {/* Radius line */}
                <line x1="110" y1="110" x2="185" y2="110" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="145" y="105" fill="#f59e0b" fontSize="11" fontWeight="bold">r</text>

                {/* Moving point */}
                <circle cx="185" cy="110" r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />

                {/* Tangent velocity vector arrow */}
                <line x1="185" y1="110" x2="185" y2="35" stroke="#10b981" strokeWidth="3" />
                <polygon points="181,42 185,28 189,42" fill="#10b981" />
                <text x="195" y="45" fill="#34d399" fontSize="12" fontWeight="bold">v⃗ (urinma)</text>

                {/* Centripetal acceleration arrow */}
                <line x1="185" y1="110" x2="140" y2="110" stroke="#f43f5e" strokeWidth="2.5" />
                <polygon points="146,106 132,110 146,114" fill="#f43f5e" />
                <text x="145" y="126" fill="#fb7185" fontSize="11" fontWeight="bold">a⃗ (intilma)</text>

                {/* Perpendicular angle symbol */}
                <path d="M 175 110 L 175 100 L 185 100" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
              <div className="text-[11px] font-mono text-slate-400 mt-2">
                Radius <span className="text-amber-400">r</span> va Urinma tezlik <span className="text-emerald-400">v⃗</span> orasidagi burchak har doim <strong className="text-white">90°</strong> ga teng!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
