import React, { useState } from 'react';
import { realWorldExamples } from '../data/physicsData';
import { RealWorldExample } from '../types/physics';
import { soundFx } from '../utils/audio';
import { CheckCircle2, XCircle, RotateCw, HelpCircle, Activity } from 'lucide-react';

export const RealWorldExamples: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('bicycle');
  const [answers, setAnswers] = useState<Record<string, number | null>>({
    bicycle: null,
    fan: null,
    carousel: null,
    clock: null
  });
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({
    bicycle: false,
    fan: false,
    carousel: false,
    clock: false
  });

  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  const activeExample = realWorldExamples.find(e => e.id === activeTab) || realWorldExamples[0];

  const handleSelectAnswer = (exampleId: string, optionIdx: number) => {
    if (submitted[exampleId]) return;
    soundFx.playClick();
    setAnswers(prev => ({ ...prev, [exampleId]: optionIdx }));
  };

  const handleCheckAnswer = (exampleId: string) => {
    if (answers[exampleId] === null) return;
    setSubmitted(prev => ({ ...prev, [exampleId]: true }));
    const example = realWorldExamples.find(e => e.id === exampleId);
    if (example && answers[exampleId] === example.question.correct) {
      soundFx.playSuccess();
    } else {
      soundFx.playWrong();
    }
  };

  // Base rotation durations (in seconds)
  const bicycleDuration = 3.0 / speedMultiplier;
  const fanDuration = 1.0 / speedMultiplier;
  const carouselDuration = 7.0 / speedMultiplier;
  const clockDuration = 5.0 / speedMultiplier;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5" /> Hayotiy Amaliyot
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Real Hayotdagi Aylana Harakatlar
          </h2>
          <p className="text-sm text-slate-400">
            Aylana bo‘ylab harakat atrofimizda: transport, texnika, o‘yinchoqlar va vaqt hisobi.
          </p>
        </div>

        {/* Speed modifier */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
          <span className="text-xs text-slate-400">Namoyish tezligi:</span>
          <button
            onClick={() => setSpeedMultiplier(0.5)}
            className={`px-2 py-0.5 text-xs rounded transition-colors ${speedMultiplier === 0.5 ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            0.5x
          </button>
          <button
            onClick={() => setSpeedMultiplier(1)}
            className={`px-2 py-0.5 text-xs rounded transition-colors ${speedMultiplier === 1 ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            1x
          </button>
          <button
            onClick={() => setSpeedMultiplier(2)}
            className={`px-2 py-0.5 text-xs rounded transition-colors ${speedMultiplier === 2 ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'}`}
          >
            2x
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {realWorldExamples.map(example => {
          const isActive = example.id === activeTab;
          return (
            <button
              key={example.id}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(example.id);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-lg ring-1 ring-cyan-500'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-sm text-slate-100">{example.title}</div>
              <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{example.subtitle}</div>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950 border border-slate-800 rounded-2xl p-6">
        {/* Left: Original Procedural SVG Animation with exact mathematical pivot (120, 120) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
          {activeTab === 'bicycle' && (
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg width="240" height="240" viewBox="0 0 240 240" className="drop-shadow-lg">
                {/* Outer Tire */}
                <circle cx="120" cy="120" r="100" fill="none" stroke="#1e293b" strokeWidth="18" />
                <circle cx="120" cy="120" r="100" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
                {/* Metallic Rim */}
                <circle cx="120" cy="120" r="88" fill="none" stroke="#94a3b8" strokeWidth="6" />

                {/* Rotating Spokes & Valve Group strictly around center (120, 120) */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 120 120"
                    to="360 120 120"
                    dur={`${bicycleDuration}s`}
                    repeatCount="indefinite"
                  />
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                    <line
                      key={deg}
                      x1="120"
                      y1="120"
                      x2={120 + 88 * Math.cos((deg * Math.PI) / 180)}
                      y2={120 + 88 * Math.sin((deg * Math.PI) / 180)}
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                    />
                  ))}
                  {/* Outer Tire Valve */}
                  <circle cx="120" cy="32" r="4.5" fill="#f59e0b" />
                </g>

                {/* Stationary Tangent Velocity Vector at top point (r = 100m) */}
                <line x1="120" y1="20" x2="180" y2="20" stroke="#10b981" strokeWidth="3" />
                <polygon points="180,16 192,20 180,24" fill="#10b981" />

                {/* Center Hub */}
                <circle cx="120" cy="120" r="18" fill="#0f172a" stroke="#f59e0b" strokeWidth="4" />
                <circle cx="120" cy="120" r="6" fill="#38bdf8" />
              </svg>
              <div className="absolute bottom-2 text-center text-[11px] font-mono text-slate-400">
                <span className="text-emerald-400 font-bold">Yashil strelka</span> = Shina urinma tezligi v⃗
              </div>
            </div>
          )}

          {activeTab === 'fan' && (
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg width="240" height="240" viewBox="0 0 240 240">
                {/* Fan outer cage */}
                <circle cx="120" cy="120" r="105" fill="none" stroke="#334155" strokeWidth="3" strokeDasharray="10 6" />

                {/* Rotating 3 blades strictly around center (120, 120) */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 120 120"
                    to="360 120 120"
                    dur={`${fanDuration}s`}
                    repeatCount="indefinite"
                  />
                  {[0, 120, 240].map(deg => (
                    <path
                      key={deg}
                      d="M 120 120 C 130 90, 160 50, 175 45 C 160 80, 140 110, 120 120"
                      transform={`rotate(${deg} 120 120)`}
                      fill="url(#fanGrad)"
                      stroke="#0284c7"
                      strokeWidth="2"
                    />
                  ))}
                  <defs>
                    <linearGradient id="fanGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </g>

                {/* Motor Center Axis */}
                <circle cx="120" cy="120" r="22" fill="#0f172a" stroke="#0ea5e9" strokeWidth="4" />
                <circle cx="120" cy="120" r="8" fill="#ffffff" />
              </svg>
              <div className="absolute bottom-2 text-center text-[11px] font-mono text-cyan-400">
                f = 50 Hz (1 sekundda 50 to‘liq aylanish)
              </div>
            </div>
          )}

          {activeTab === 'carousel' && (
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg width="240" height="240" viewBox="0 0 240 240">
                {/* Carousel Platform Floor */}
                <circle cx="120" cy="120" r="100" fill="#090d16" stroke="#38bdf8" strokeWidth="3" />
                <circle cx="120" cy="120" r="60" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Rotating Carousel Horses strictly around center (120, 120) */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 120 120"
                    to="360 120 120"
                    dur={`${carouselDuration}s`}
                    repeatCount="indefinite"
                  />
                  {/* Outer horses (Radius R2 = 82) */}
                  {[0, 60, 120, 180, 240, 300].map(deg => (
                    <circle
                      key={`out-${deg}`}
                      cx={120 + 82 * Math.cos((deg * Math.PI) / 180)}
                      cy={120 + 82 * Math.sin((deg * Math.PI) / 180)}
                      r="9"
                      fill="#f43f5e"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  ))}

                  {/* Inner horses (Radius R1 = 52) */}
                  {[30, 90, 150, 210, 270, 330].map(deg => (
                    <circle
                      key={`in-${deg}`}
                      cx={120 + 52 * Math.cos((deg * Math.PI) / 180)}
                      cy={120 + 52 * Math.sin((deg * Math.PI) / 180)}
                      r="7"
                      fill="#38bdf8"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  ))}
                </g>

                {/* Center Platform Axis */}
                <circle cx="120" cy="120" r="16" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
              </svg>
              <div className="absolute bottom-2 text-center text-[11px] font-mono text-slate-300">
                <span className="text-rose-400 font-bold">Qizil: Tashqi (v katta)</span> |{' '}
                <span className="text-cyan-400 font-bold">Moviy: Ichki</span>
              </div>
            </div>
          )}

          {activeTab === 'clock' && (
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg width="240" height="240" viewBox="0 0 240 240">
                {/* Clock Rim */}
                <circle cx="120" cy="120" r="105" fill="#090d16" stroke="#94a3b8" strokeWidth="6" />

                {/* 12 Hour ticks */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                  <line
                    key={deg}
                    x1={120 + 94 * Math.cos((deg * Math.PI) / 180)}
                    y1={120 + 94 * Math.sin((deg * Math.PI) / 180)}
                    x2={120 + 82 * Math.cos((deg * Math.PI) / 180)}
                    y2={120 + 82 * Math.sin((deg * Math.PI) / 180)}
                    stroke="#e2e8f0"
                    strokeWidth={deg % 90 === 0 ? 3 : 1.5}
                  />
                ))}

                {/* Hour hand (stationary demo position) */}
                <line x1="120" y1="120" x2="120" y2="70" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
                {/* Minute hand (stationary demo position) */}
                <line x1="120" y1="120" x2="160" y2="120" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />

                {/* Second hand rotating strictly around center pin (120, 120) */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 120 120"
                    to="360 120 120"
                    dur={`${clockDuration}s`}
                    repeatCount="indefinite"
                  />
                  <line x1="120" y1="140" x2="120" y2="35" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="120" cy="35" r="4" fill="#ef4444" />
                </g>

                {/* Center cap */}
                <circle cx="120" cy="120" r="6" fill="#f59e0b" />
              </svg>
              <div className="absolute bottom-2 text-center text-[11px] font-mono text-rose-400">
                Sekund mili davri: T = 60 s
              </div>
            </div>
          )}
        </div>

        {/* Right: Explanation & Mini Quiz */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <h3 className="text-xl font-bold text-white">{activeExample.title}</h3>
            <p className="text-sm text-cyan-400 font-mono mt-0.5">{activeExample.subtitle}</p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {activeExample.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-medium block mb-1">Aylanuvchi qism:</span>
              <span className="text-slate-200">{activeExample.rotatingPart}</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-medium block mb-1">Fizik bog‘liqlik:</span>
              <span className="text-slate-200">{activeExample.physicsConnection}</span>
            </div>
          </div>

          {/* Mini Interactive Question */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <HelpCircle className="w-4 h-4" /> Savol: O‘ylab ko‘ring!
            </div>
            <p className="text-xs text-slate-200 font-medium">{activeExample.question.text}</p>

            <div className="space-y-1.5">
              {activeExample.question.options.map((opt, idx) => {
                const isSelected = answers[activeTab] === idx;
                const isChecked = submitted[activeTab];
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                if (isChecked) {
                  if (idx === activeExample.question.correct) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-cyan-950/70 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(activeTab, idx)}
                    disabled={isChecked}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isChecked && idx === activeExample.question.correct && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {isChecked && isSelected && idx !== activeExample.question.correct && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {!submitted[activeTab] ? (
              <button
                onClick={() => handleCheckAnswer(activeTab)}
                disabled={answers[activeTab] === null}
                className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                  answers[activeTab] !== null
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Javobni tekshirish
              </button>
            ) : (
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
                <strong className="text-emerald-400 block mb-1">Izoh:</strong>
                {activeExample.question.explanation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
