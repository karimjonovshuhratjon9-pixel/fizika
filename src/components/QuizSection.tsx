import React, { useState } from 'react';
import { quizQuestions } from '../data/physicsData';
import { Question } from '../types/physics';
import { soundFx } from '../utils/audio';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQuestion = quizQuestions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (submittedAnswers[currentIdx]) return;
    soundFx.playClick();
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleSubmitCurrent = () => {
    if (selectedAnswers[currentIdx] === undefined || submittedAnswers[currentIdx]) return;

    setSubmittedAnswers(prev => ({ ...prev, [currentIdx]: true }));
    const isCorrect = selectedAnswers[currentIdx] === currentQuestion.correctAnswer;

    if (isCorrect) {
      soundFx.playSuccess();
      setScore(prev => prev + 1);
    } else {
      soundFx.playWrong();
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedAnswers[currentIdx] === currentQuestion.correctAnswer ? 1 : 0);
      if (finalScore >= 8) {
        try {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        } catch {
          // safe
        }
      }
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setScore(0);
    setIsFinished(false);
  };

  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" /> Bilimni Sinash
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Yakuniy Viktorina Testi
          </h2>
          <p className="text-sm text-slate-400">
            14-mavzu bo‘yicha 10 ta muhim savolga javob bering va bilim darajangizni aniqlang.
          </p>
        </div>

        {!isFinished && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Savol:</span>
              <span className="text-base font-bold font-mono text-cyan-400">
                {currentIdx + 1} / {quizQuestions.length}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">To‘g‘ri javoblar:</span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {score} ta
              </span>
            </div>
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-cyan-500 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300">
                SAVOL #{currentIdx + 1}
              </span>
              <span className="text-xs text-slate-400 capitalize">
                Mavzu: {currentQuestion.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* 4 Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentIdx] === idx;
                const isSubmitted = submittedAnswers[currentIdx];

                let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                if (isSubmitted) {
                  if (idx === currentQuestion.correctAnswer) {
                    style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                  } else if (isSelected) {
                    style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  } else {
                    style = 'bg-slate-900/40 border-slate-900 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  style = 'bg-cyan-950/70 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-start gap-3.5 ${style}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 mt-0.5">{opt}</span>
                    {isSubmitted && idx === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isSelected && idx !== currentQuestion.correctAnswer && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            {!submittedAnswers[currentIdx] ? (
              <button
                onClick={handleSubmitCurrent}
                disabled={selectedAnswers[currentIdx] === undefined}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
                  selectedAnswers[currentIdx] !== undefined
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Javobni tasdiqlash
              </button>
            ) : (
              <div className="space-y-4 pt-2">
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    selectedAnswers[currentIdx] === currentQuestion.correctAnswer
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-800 text-rose-200'
                  }`}
                >
                  <strong className="block font-bold mb-1">
                    {selectedAnswers[currentIdx] === currentQuestion.correctAnswer
                      ? 'To‘g‘ri javob! Barakalla!'
                      : 'Noto‘g‘ri tanlandi.'}
                  </strong>
                  {currentQuestion.explanation}
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <span>{currentIdx < quizQuestions.length - 1 ? 'Keyingi savolga o‘tish' : 'Natijalarni ko‘rish'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary Screen */
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-950/60 border border-cyan-800 flex items-center justify-center text-cyan-400 shadow-xl">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">Viktorina Muvaffaqiyatli Yakunlandi!</h3>
            <p className="text-sm text-slate-400 mt-1">
              7-sinf fizika fanining «Aylana bo‘ylab harakat» mavzusi bo‘yicha sizning natijangiz:
            </p>
          </div>

          <div className="inline-flex items-center gap-8 bg-slate-900 border border-slate-800 px-8 py-5 rounded-2xl">
            <div>
              <span className="text-xs text-slate-400 block">To‘g‘ri javoblar</span>
              <span className="text-3xl font-bold font-mono text-emerald-400">
                {score} / {quizQuestions.length}
              </span>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div>
              <span className="text-xs text-slate-400 block">O‘zlashtirish</span>
              <span className="text-3xl font-bold font-mono text-cyan-400">{percentage}%</span>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div>
              <span className="text-xs text-slate-400 block">Baho</span>
              <span className="text-3xl font-bold text-amber-400">
                {percentage >= 85 ? "5 (A'lo)" : percentage >= 70 ? '4 (Yaxshi)' : percentage >= 50 ? '3 (Qoniqarli)' : "2 (Qayta o'rganing)"}
              </span>
            </div>
          </div>

          <div className="max-w-md mx-auto text-xs text-slate-300 bg-slate-900/60 border border-slate-800 p-4 rounded-xl leading-relaxed">
            {percentage >= 85 ? (
              <p>Siz mavzuni a'lo darajada o‘zlashtirdingiz! Aylanish davri, chastota va chiziqli tezlik orasidagi bog‘lanishlarni to‘liq tushungansiz.</p>
            ) : percentage >= 70 ? (
              <p>Yaxshi natija! Formulalarni qo‘llashda va o‘lchov birliklarida biroz diqqatli bo‘lish kifoya.</p>
            ) : (
              <p>Mavzu nazariyasi va tajriba panelini qayta ko‘rib chiqish, formulalarni takrorlash tavsiya etiladi.</p>
            )}
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Viktorinani yangidan boshlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
