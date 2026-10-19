import React from 'react';
import { Play, Sparkles, ArrowDown, Monitor, Compass, ShieldCheck, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeroSectionProps {
  onStartLesson: () => void;
  onOpenExperiment: () => void;
  onToggleProjector: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLesson,
  onOpenExperiment,
  onToggleProjector
}) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background radial scientific glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>7-SINF FIZIKA LABORATORIYASI</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">14-MAVZU</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Aylana Bo‘ylab <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                Harakat Laboratoriyasi
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              O‘zbekiston maktablarida ochiq dars o‘tkazish, fizik tushunchalarni 3D va 2D interaktiv
              simulyatsiyalar yordamida tushuntirish, tajribalar o‘tkazish va o‘quvchilar bilimini
              mustahkamlash uchun mo‘ljallangan professional ta’lim tizimi.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenExperiment();
                }}
                className="px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Tajribani ochish (3D)</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onStartLesson();
                }}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-bold text-sm flex items-center gap-2 transition-all hover:border-slate-600 active:scale-95"
              >
                <span>Darsni boshlash</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onToggleProjector();
                }}
                className="px-5 py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-semibold flex items-center gap-2 transition-all"
                title="Proyektor va ochiq dars ekrani"
              >
                <Monitor className="w-4 h-4" />
                <span>Namoyish rejimi</span>
              </button>
            </div>

            {/* Quick Metrics Indicators */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto lg:mx-0">
              <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
                <span className="text-[10px] text-slate-400 font-mono block">Aylanish Davri:</span>
                <span className="font-mono font-bold text-amber-400 text-sm">T = t / N</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
                <span className="text-[10px] text-slate-400 font-mono block">Chastota:</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">f = 1 / T</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
                <span className="text-[10px] text-slate-400 font-mono block">Chiziqli Tezlik:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">v = 2πr / T</span>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-left">
                <span className="text-[10px] text-slate-400 font-mono block">Tezlik Vektori:</span>
                <span className="font-bold text-slate-200 text-xs">Urinma</span>
              </div>
            </div>
          </div>

          {/* Right: Original Orbital Physics Animated Teaser */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 sm:w-80 h-72 sm:h-80 flex items-center justify-center">
              {/* Outer orbit circle */}
              <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-[spin_24s_linear_infinite]" />
              {/* Middle coordinate circle */}
              <div className="absolute inset-8 rounded-full border border-slate-700/60" />
              {/* Inner glowing circle */}
              <div className="absolute inset-16 rounded-full border border-cyan-500/40 bg-cyan-950/20" />

              {/* Center atomic nucleus / pivot */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-cyan-300 font-mono font-bold text-xs">
                  O
                </div>
              </div>

              {/* Orbiting Satellite Particle 1 */}
              <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-md shadow-emerald-500/50 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                {/* Tangent vector indicator */}
                <div className="absolute top-0 left-1/2 w-12 h-0.5 bg-emerald-400 -translate-y-1/2 origin-left">
                  <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-emerald-400 rotate-45" />
                </div>
              </div>

              {/* Orbiting Particle 2 (Inner circle) */}
              <div className="absolute inset-8 animate-[spin_2.5s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 shadow-md shadow-amber-500/50" />
              </div>

              {/* Visual Annotations */}
              <div className="absolute -bottom-4 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-[10px] font-mono text-slate-300 shadow">
                Urinma tezlik: <span className="text-emerald-400 font-bold">v⃗ ⟂ r⃗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
