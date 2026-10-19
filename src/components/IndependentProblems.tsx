import React, { useState } from 'react';
import { independentProblems } from '../data/physicsData';
import { Problem } from '../types/physics';
import { soundFx } from '../utils/audio';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, FileText, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const IndependentProblems: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [checkedStatus, setCheckedStatus] = useState<Record<number, boolean>>({});
  const [isCorrectStatus, setIsCorrectStatus] = useState<Record<number, boolean>>({});
  const [expandedSolutions, setExpandedSolutions] = useState<Record<number, boolean>>({});

  const handleInputChange = (id: number, val: string) => {
    setUserAnswers(prev => ({ ...prev, [id]: val }));
    // Reset check status when modified
    if (checkedStatus[id]) {
      setCheckedStatus(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleCheck = (problem: Problem) => {
    const rawVal = userAnswers[problem.id];
    if (!rawVal || rawVal.trim() === '') return;

    // Support comma or dot decimals
    const parsed = parseFloat(rawVal.replace(',', '.'));
    if (isNaN(parsed)) return;

    const lowerBound = problem.correctAnswer * (1 - problem.tolerance);
    const upperBound = problem.correctAnswer * (1 + problem.tolerance);
    const correct = parsed >= lowerBound && parsed <= upperBound;

    setCheckedStatus(prev => ({ ...prev, [problem.id]: true }));
    setIsCorrectStatus(prev => ({ ...prev, [problem.id]: correct }));

    if (correct) {
      soundFx.playSuccess();
      try {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.7 }
        });
      } catch {
        // safe
      }
    } else {
      soundFx.playWrong();
    }
  };

  const toggleSolution = (id: number) => {
    soundFx.playClick();
    setExpandedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Completed count
  const solvedCount = Object.values(isCorrectStatus).filter(Boolean).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" /> Amaliy Mashg‘ulot
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Mustaqil Yechish Uchun Masalalar
          </h2>
          <p className="text-sm text-slate-400">
            Nazariyani mustahkamlang: 7-sinf darsligidagi tipik va hayotiy masalalarni mustaqil hisoblang.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
          <span className="text-[11px] text-slate-400 block">Yechilgan masalalar:</span>
          <span className="text-xl font-bold font-mono text-emerald-400">
            {solvedCount} / {independentProblems.length}
          </span>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-5">
        {independentProblems.map((problem, index) => {
          const isChecked = checkedStatus[problem.id];
          const isCorrect = isCorrectStatus[problem.id];
          const isExpanded = expandedSolutions[problem.id];

          return (
            <div
              key={problem.id}
              className={`bg-slate-950 border rounded-2xl p-5 lg:p-6 transition-all ${
                isCorrect
                  ? 'border-emerald-800/80 bg-emerald-950/10'
                  : isChecked && !isCorrect
                  ? 'border-rose-800/80 bg-rose-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-slate-100 text-base">{problem.title}</h3>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    problem.difficulty === 'Oson'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : problem.difficulty === 'O‘rta'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>

              {/* Statement */}
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {problem.statement}
              </p>

              {/* Given & Target parameters grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Berilgan:</span>
                  <div className="space-y-0.5">
                    {problem.given.map((g, idx) => (
                      <div key={idx} className="font-mono text-slate-200">
                        {g.label} = <strong className="text-cyan-400">{g.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Topish kerak:</span>
                  <div className="font-mono font-bold text-amber-400 text-sm mt-0.5">
                    {problem.toFind} = ?
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Qo‘llaniladigan formula:</span>
                  <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
                    {problem.formula}
                  </div>
                </div>
              </div>

              {/* User Answer Input & Validation Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex-1 min-w-[200px] relative">
                  <input
                    type="text"
                    value={userAnswers[problem.id] || ''}
                    onChange={e => handleInputChange(problem.id, e.target.value)}
                    placeholder="Masalan, 0.05"
                    className={`w-full bg-slate-900 border rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none transition-colors ${
                      isCorrect
                        ? 'border-emerald-500 focus:border-emerald-400'
                        : isChecked && !isCorrect
                        ? 'border-rose-500 focus:border-rose-400'
                        : 'border-slate-700 focus:border-cyan-500'
                    }`}
                  />
                  <span className="absolute right-4 top-2.5 text-xs font-mono text-slate-400">
                    {problem.unit}
                  </span>
                </div>

                <button
                  onClick={() => handleCheck(problem)}
                  disabled={!userAnswers[problem.id]}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                    userAnswers[problem.id]
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Tekshirish
                </button>

                <button
                  onClick={() => toggleSolution(problem.id)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>{isExpanded ? 'Yechimni yashirish' : 'To‘liq yechimni ko‘rish'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Instant feedback badge */}
              {isChecked && (
                <div className="mt-3">
                  {isCorrect ? (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>To‘g‘ri! Siz masalani to‘g‘ri hisobladingiz (Javob: {problem.correctAnswer} {problem.unit}).</span>
                    </div>
                  ) : (
                    <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Xato, hisoblashda adashdingiz. Formulani qayta tekshirib, qayta urinib ko‘ring.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Expandable Step-by-Step Solution */}
              {isExpanded && (
                <div className="mt-4 p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-2 animate-fade-in font-mono">
                  <div className="text-cyan-400 font-bold mb-2">To‘liq yechim bosqichlari:</div>
                  {problem.solutionSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400">›</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
