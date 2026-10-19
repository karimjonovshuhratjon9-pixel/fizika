import React, { useState } from 'react';
import { Calculator, Check, RotateCcw, AlertTriangle, ArrowRight, Lightbulb, BookOpen } from 'lucide-react';
import { soundFx } from '../utils/audio';

type Mode = 'period' | 'freq' | 'reciprocal' | 'vel_period' | 'vel_freq';

export const FormulaLab: React.FC = () => {
  const [mode, setMode] = useState<Mode>('vel_period');

  // Input states
  const [tInput, setTInput] = useState<string>('10');
  const [nInput, setNInput] = useState<string>('20');
  const [periodInput, setPeriodInput] = useState<string>('2');
  const [freqInput, setFreqInput] = useState<string>('0.5');
  const [radiusInput, setRadiusInput] = useState<string>('0.5');

  // Error message
  const [error, setError] = useState<string | null>(null);

  // Preset example loader
  const loadPreset = (presetName: string) => {
    soundFx.playClick();
    setError(null);
    if (presetName === 'clock_sec') {
      setMode('vel_period');
      setRadiusInput('0.15');
      setPeriodInput('60');
    } else if (presetName === 'bicycle') {
      setMode('vel_freq');
      setRadiusInput('0.35');
      setFreqInput('4');
    } else if (presetName === 'fan') {
      setMode('freq');
      setNInput('3000');
      setTInput('60');
    } else if (presetName === 'carousel') {
      setMode('vel_period');
      setRadiusInput('3');
      setPeriodInput('12');
    }
  };

  const handleClear = () => {
    soundFx.playClick();
    setTInput('');
    setNInput('');
    setPeriodInput('');
    setFreqInput('');
    setRadiusInput('');
    setError(null);
  };

  // Perform calculation and generate step-by-step working
  const calculate = () => {
    const PI = 3.14159;

    if (mode === 'period') {
      const t = parseFloat(tInput);
      const N = parseFloat(nInput);
      if (isNaN(t) || isNaN(N) || t <= 0 || N <= 0) {
        return { valid: false, error: "Vaqt t va aylanishlar soni N musbat son bo‘lishi kerak." };
      }
      const T = t / N;
      return {
        valid: true,
        formula: 'T = t / N',
        steps: [
          `Berilgan: t = ${t} s, N = ${N}`,
          `Formula: T = t / N`,
          `Hisoblash: T = ${t} s / ${N} = ${T.toFixed(4)} s`
        ],
        result: `${T.toFixed(3)} s`,
        meaning: `Jism 1 marta to‘liq aylanishi uchun ${T.toFixed(3)} sekund vaqt sarflaydi.`
      };
    }

    if (mode === 'freq') {
      const t = parseFloat(tInput);
      const N = parseFloat(nInput);
      if (isNaN(t) || isNaN(N) || t <= 0 || N <= 0) {
        return { valid: false, error: "Vaqt t va aylanishlar soni N musbat son bo‘lishi kerak." };
      }
      const f = N / t;
      return {
        valid: true,
        formula: 'f = N / t',
        steps: [
          `Berilgan: N = ${N}, t = ${t} s`,
          `Formula: f = N / t`,
          `Hisoblash: f = ${N} / ${t} s = ${f.toFixed(3)} Hz`
        ],
        result: `${f.toFixed(3)} Hz`,
        meaning: `Jism har bir sekundda ${f.toFixed(2)} marta to‘liq aylanadi.`
      };
    }

    if (mode === 'reciprocal') {
      const T = parseFloat(periodInput);
      if (isNaN(T) || T <= 0) {
        return { valid: false, error: "Aylanish davri T musbat va noldan katta bo‘lishi shart." };
      }
      const f = 1 / T;
      return {
        valid: true,
        formula: 'f = 1 / T  va  T = 1 / f',
        steps: [
          `Berilgan: T = ${T} s`,
          `Formula: f = 1 / T`,
          `Hisoblash: f = 1 / ${T} = ${f.toFixed(4)} Hz`
        ],
        result: `f = ${f.toFixed(3)} Hz (T = ${T} s)`,
        meaning: `Davr va chastota o‘zaro teskari kattaliklardir. Davr qanchalik qisqa bo‘lsa, chastota shunchalik katta bo‘ladi.`
      };
    }

    if (mode === 'vel_period') {
      const r = parseFloat(radiusInput);
      const T = parseFloat(periodInput);
      if (isNaN(r) || isNaN(T) || r <= 0 || T <= 0) {
        return { valid: false, error: "Radius r va davr T musbat sonlar bo‘lishi kerak." };
      }
      const v = (2 * PI * r) / T;
      return {
        valid: true,
        formula: 'v = 2πr / T',
        steps: [
          `Berilgan: r = ${r} m, T = ${T} s, π ≈ 3,1416`,
          `Formula: v = 2πr / T`,
          `Aylana uzunligi: L = 2 × 3,1416 × ${r} = ${(2 * PI * r).toFixed(3)} m`,
          `Hisoblash: v = ${(2 * PI * r).toFixed(3)} m / ${T} s = ${v.toFixed(3)} m/s`
        ],
        result: `${v.toFixed(2)} m/s`,
        meaning: `Aylana gardishidagi nuqta sekundiga ${v.toFixed(2)} metr yo‘l bosadi (taxminan ${(v * 3.6).toFixed(1)} km/soat).`
      };
    }

    if (mode === 'vel_freq') {
      const r = parseFloat(radiusInput);
      const f = parseFloat(freqInput);
      if (isNaN(r) || isNaN(f) || r <= 0 || f <= 0) {
        return { valid: false, error: "Radius r va chastota f musbat sonlar bo‘lishi kerak." };
      }
      const v = 2 * PI * r * f;
      return {
        valid: true,
        formula: 'v = 2πrf',
        steps: [
          `Berilgan: r = ${r} m, f = ${f} Hz, π ≈ 3,1416`,
          `Formula: v = 2πrf`,
          `Hisoblash: v = 2 × 3,1416 × ${r} × ${f} = ${v.toFixed(3)} m/s`
        ],
        result: `${v.toFixed(2)} m/s`,
        meaning: `Chastota orqali hisoblangan chiziqli tezlik sekundiga ${v.toFixed(2)} metrni tashkil qiladi.`
      };
    }

    return { valid: false, error: "Rejim tanlanmadi." };
  };

  const output = calculate();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" /> Interaktiv Kalkulyator
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Formula Laboratoriyasi
          </h2>
          <p className="text-sm text-slate-400">
            Fizik kattaliklarni kiriting, bosqichma-bosqich hisoblash jarayonini va SI birliklaridagi natijani kuzating.
          </p>
        </div>

        {/* Real life preset selector buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Tayyor misollar:</span>
          <button
            onClick={() => loadPreset('clock_sec')}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
          >
            Soat mili
          </button>
          <button
            onClick={() => loadPreset('bicycle')}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
          >
            Velosiped
          </button>
          <button
            onClick={() => loadPreset('fan')}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
          >
            Ventilyator
          </button>
          <button
            onClick={() => loadPreset('carousel')}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
          >
            Karusel
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <button
          onClick={() => {
            soundFx.playClick();
            setMode('period');
          }}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'period'
              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[11px] font-semibold uppercase tracking-wider block">1-rejim</div>
          <div className="font-mono font-bold text-sm mt-0.5">T = t / N</div>
          <div className="text-[11px] opacity-80 mt-1">Davrni topish</div>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            setMode('freq');
          }}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'freq'
              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[11px] font-semibold uppercase tracking-wider block">2-rejim</div>
          <div className="font-mono font-bold text-sm mt-0.5">f = N / t</div>
          <div className="text-[11px] opacity-80 mt-1">Chastotani topish</div>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            setMode('reciprocal');
          }}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'reciprocal'
              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[11px] font-semibold uppercase tracking-wider block">3-rejim</div>
          <div className="font-mono font-bold text-sm mt-0.5">f = 1 / T</div>
          <div className="text-[11px] opacity-80 mt-1">Davrdan chastota</div>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            setMode('vel_period');
          }}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'vel_period'
              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[11px] font-semibold uppercase tracking-wider block">4-rejim</div>
          <div className="font-mono font-bold text-sm mt-0.5">v = 2πr / T</div>
          <div className="text-[11px] opacity-80 mt-1">Radius va davrdan</div>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            setMode('vel_freq');
          }}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'vel_freq'
              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="text-[11px] font-semibold uppercase tracking-wider block">5-rejim</div>
          <div className="font-mono font-bold text-sm mt-0.5">v = 2πrf</div>
          <div className="text-[11px] opacity-80 mt-1">Radius va chastotadan</div>
        </button>
      </div>

      {/* Inputs & Calculation Output Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters Box */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
            <span>Kiritish Maydoni</span>
            <button
              onClick={handleClear}
              className="text-xs font-normal text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Tozalash
            </button>
          </h3>

          {/* Dynamic input fields based on selected mode */}
          {(mode === 'period' || mode === 'freq') && (
            <>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Kuzatish vaqti <strong className="text-cyan-400">t</strong> (sekundlarda, s):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={tInput}
                    onChange={e => setTInput(e.target.value)}
                    placeholder="masalan, 10"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-mono text-slate-500">sekund (s)</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  To‘liq aylanishlar soni <strong className="text-amber-400">N</strong>:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={nInput}
                    onChange={e => setNInput(e.target.value)}
                    placeholder="masalan, 20"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-mono text-slate-500">marta</span>
                </div>
              </div>
            </>
          )}

          {mode === 'reciprocal' && (
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                Aylanish davri <strong className="text-amber-400">T</strong> (sekundlarda, s):
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={periodInput}
                  onChange={e => setPeriodInput(e.target.value)}
                  placeholder="masalan, 2"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                />
                <span className="absolute right-3.5 top-2.5 text-xs font-mono text-slate-500">sekund (s)</span>
              </div>
            </div>
          )}

          {mode === 'vel_period' && (
            <>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Aylana radiusi <strong className="text-amber-400">r</strong> (metrlarda, m):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.05"
                    min="0.01"
                    value={radiusInput}
                    onChange={e => setRadiusInput(e.target.value)}
                    placeholder="masalan, 0.5"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-mono text-slate-500">metr (m)</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Aylanish davri <strong className="text-cyan-400">T</strong> (sekundlarda, s):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.05"
                    value={periodInput}
                    onChange={e => setPeriodInput(e.target.value)}
                    placeholder="masalan, 2"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-mono text-slate-500">sekund (s)</span>
                </div>
              </div>
            </>
          )}

          {mode === 'vel_freq' && (
            <>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Aylana radiusi <strong className="text-amber-400">r</strong> (metrlarda, m):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.05"
                    min="0.01"
                    value={radiusInput}
                    onChange={e => setRadiusInput(e.target.value)}
                    placeholder="masalan, 0.35"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-mono text-slate-500">metr (m)</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Aylanish chastotasi <strong className="text-cyan-400">f</strong> (gerslarda, Hz):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.01"
                    value={freqInput}
                    onChange={e => setFreqInput(e.target.value)}
                    placeholder="masalan, 4"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-mono text-slate-500">Gers (Hz)</span>
                </div>
              </div>
            </>
          )}

          <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Natijalar har bir son o‘zgarganda bir zumda avtomatik hisoblanadi.</span>
          </div>
        </div>

        {/* Step-by-Step Solver Output Box */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Bosqichma-bosqich hisoblash
              </span>
              {output.valid && (
                <span className="text-xs font-mono bg-emerald-950/60 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-800">
                  {output.formula}
                </span>
              )}
            </div>

            {output.valid ? (
              <div className="space-y-3">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  {output.steps?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400">›</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                {/* Final Result Card */}
                <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Yakuniy natija:</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400">{output.result}</span>
                  </div>
                  <div className="text-right max-w-xs text-xs text-slate-300">
                    {output.meaning}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-rose-950/30 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
                <div>
                  <strong className="block font-bold">Xatolik aniqlandi</strong>
                  <span>{output.error}</span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-800/80 pt-3 mt-4 text-[11px] text-slate-500 flex justify-between">
            <span>Standart birliklar: Radius [m], Davr [s], Chastota [Hz], Tezlik [m/s]</span>
            <span className="font-mono">π ≈ 3.14159</span>
          </div>
        </div>
      </div>
    </div>
  );
};
