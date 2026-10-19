import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { fortuneWheelQuestions } from '../data/physicsData';
import { Question } from '../types/physics';
import { soundFx } from '../utils/audio';
import { Trophy, HelpCircle, CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, AlertCircle, Sparkles, Check } from 'lucide-react';

interface FortuneWheelProps {
  onScoreEarned?: (points: number) => void;
}

export const FortuneWheel: React.FC<FortuneWheelProps> = ({ onScoreEarned }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const autoDismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Wheel state
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  // Wheel sectors
  const sectorCount = 8;
  const sectorColors = [
    '#0284c7', // cyan-600
    '#059669', // emerald-600
    '#7c3aed', // violet-600
    '#d97706', // amber-600
    '#2563eb', // blue-600
    '#0d9488', // teal-600
    '#9333ea', // purple-600
    '#e11d48'  // rose-600
  ];

  // Draw wheel on canvas
  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 16;
    const arc = (2 * Math.PI) / sectorCount;

    ctx.clearRect(0, 0, size, size);

    // Outer decorative metallic rim
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, radius + 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#38bdf8';
    ctx.stroke();

    // Wheel rotation
    ctx.translate(center, center);
    ctx.rotate(angle);

    for (let i = 0; i < sectorCount; i++) {
      const startAngle = i * arc;
      const endAngle = startAngle + arc;
      const questionId = i + 1;
      const isAlreadyAnswered = answeredQuestions.includes(questionId);

      // Sector slice
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);

      // If answered, dim and mark as finished
      if (isAlreadyAnswered) {
        ctx.fillStyle = '#1e293b';
      } else {
        ctx.fillStyle = sectorColors[i % sectorColors.length];
      }
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#090d16';
      ctx.stroke();

      // Sector text & number
      ctx.save();
      ctx.rotate(startAngle + arc / 2);
      ctx.textAlign = 'right';

      if (isAlreadyAnswered) {
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 13px "JetBrains Mono", monospace';
        ctx.fillText(`✓ YECHILDI`, radius - 24, 5);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px "JetBrains Mono", monospace';
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 4;
        ctx.fillText(`SAVOL #${questionId}`, radius - 24, 5);
      }

      // Mini sector pin
      ctx.beginPath();
      ctx.arc(radius - 6, 0, 3, 0, 2 * Math.PI);
      ctx.fillStyle = isAlreadyAnswered ? '#10b981' : '#f8fafc';
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();

    // Center hub button circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, 42, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ORBITA', center, center - 6);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText('LAB', center, center + 9);
    ctx.restore();

    // Fixed Pointer at the top (12 o'clock)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(center - 14, 2);
    ctx.lineTo(center + 14, 2);
    ctx.lineTo(center, 28);
    ctx.closePath();
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.restore();
  };

  useEffect(() => {
    drawWheel(currentRotation);
  }, [currentRotation, answeredQuestions]);

  // Clean up auto dismiss timer
  useEffect(() => {
    return () => {
      if (autoDismissTimerRef.current) {
        clearTimeout(autoDismissTimerRef.current);
      }
    };
  }, []);

  // Spin the wheel with realistic physics deceleration
  const spinWheel = () => {
    if (isSpinning) return;

    // Filter available un-answered questions
    const available = fortuneWheelQuestions.filter(q => !answeredQuestions.includes(q.id));
    if (available.length === 0) {
      setGameFinished(true);
      return;
    }

    soundFx.playSpinLaunch();

    const chosenQuestion = available[Math.floor(Math.random() * available.length)];
    const chosenIndex = chosenQuestion.id - 1; // 0 to 7

    const arc = (2 * Math.PI) / sectorCount;
    const targetSectorAngle = (3 * Math.PI) / 2 - (chosenIndex + 0.5) * arc;
    const extraRounds = 4 + Math.floor(Math.random() * 3);
    const totalRotation = currentRotation + extraRounds * 2 * Math.PI + (targetSectorAngle - (currentRotation % (2 * Math.PI)));

    setIsSpinning(true);
    setSelectedQuestion(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setWrongAttempts([]);

    const startTime = performance.now();
    const duration = 3600;
    const startRot = currentRotation;
    const deltaRot = totalRotation - startRot;

    let lastTickSector = -1;

    const animateSpin = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quartic ease out for realistic physics braking
      const ease = 1 - Math.pow(1 - progress, 4);
      const angle = startRot + deltaRot * ease;

      setCurrentRotation(angle);
      drawWheel(angle);

      // Sound tick when passing sectors
      const currentSector = Math.floor(((angle % (2 * Math.PI)) + 2 * Math.PI) / arc) % sectorCount;
      if (currentSector !== lastTickSector) {
        lastTickSector = currentSector;
        soundFx.playTick();
      }

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);
        setSelectedQuestion(chosenQuestion);
        soundFx.playSuccess();
      }
    };

    requestAnimationFrame(animateSpin);
  };

  // Select Option
  const handleSelectOption = (index: number) => {
    if (isCorrect === true) return;
    soundFx.playClick();
    setSelectedOption(index);
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (selectedOption === null || !selectedQuestion || isCorrect === true) return;

    if (selectedOption === selectedQuestion.correctAnswer) {
      // CORRECT!
      setIsCorrect(true);
      soundFx.playSuccess();
      setScore(prev => prev + 10);
      if (onScoreEarned) onScoreEarned(10);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // safe
      }

      const nextAnswered = [...answeredQuestions, selectedQuestion.id];
      setAnsweredQuestions(nextAnswered);
      if (nextAnswered.length >= fortuneWheelQuestions.length) {
        setGameFinished(true);
      }

      // Automatically dismiss the question after 1.5 seconds so it disappears as requested!
      if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
      autoDismissTimerRef.current = setTimeout(() => {
        handleExitToWheel();
      }, 1600);
    } else {
      // WRONG! Keep the question open until correct answer is found
      setIsCorrect(false);
      soundFx.playWrong();
      setWrongAttempts(prev => prev.includes(selectedOption) ? prev : [...prev, selectedOption]);
    }
  };

  // Dismiss question and return to wheel after correct answer
  const handleExitToWheel = () => {
    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
    }
    soundFx.playClick();
    setSelectedQuestion(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setWrongAttempts([]);
  };

  // Reset entire game
  const handleResetGame = () => {
    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
    }
    soundFx.playClick();
    setAnsweredQuestions([]);
    setSelectedQuestion(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setWrongAttempts([]);
    setScore(0);
    setGameFinished(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5" /> Interaktiv O‘yin
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            «Omad Chambaragi» — Savol Tanlash O‘yini
          </h2>
          <p className="text-sm text-slate-400">
            Chambaragini aylantiring, to‘g‘ri javob berilgach savol yechiladi va navbatdagisi uchun chambarak ochiladi!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
            <span className="text-[11px] text-slate-400 block">Jami Ball:</span>
            <span className="text-xl font-bold font-mono text-amber-400">{score} ball</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
            <span className="text-[11px] text-slate-400 block">Yechildi:</span>
            <span className="text-xl font-bold font-mono text-cyan-400">
              {answeredQuestions.length} / {fortuneWheelQuestions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Wheel & Question Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: The Wheel */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={360}
              height={360}
              className="max-w-full drop-shadow-2xl"
            />
          </div>

          <button
            onClick={spinWheel}
            disabled={isSpinning || (answeredQuestions.length >= fortuneWheelQuestions.length && !selectedQuestion)}
            className={`w-full max-w-xs py-3.5 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-95 ${
              isSpinning
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : answeredQuestions.length >= fortuneWheelQuestions.length
                ? 'bg-slate-800 text-slate-400'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {isSpinning ? (
              <>Chambarak aylanmoqda...</>
            ) : answeredQuestions.length >= fortuneWheelQuestions.length ? (
              <>Barcha savollar to‘liq yechildi!</>
            ) : (
              <>Chambarakni aylantirish</>
            )}
          </button>
        </div>

        {/* Right: Question and Answers Card */}
        <div className="lg:col-span-7">
          {selectedQuestion ? (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold rounded-lg">
                  SAVOL #{selectedQuestion.id}
                </span>
                <span className="text-xs text-amber-400 font-semibold font-mono">+10 ball</span>
              </div>

              <h3 className="text-lg font-bold text-slate-100 leading-snug">
                {selectedQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {selectedQuestion.options.map((option, idx) => {
                  const isThisWrong = wrongAttempts.includes(idx);
                  const isThisCorrect = isCorrect === true && idx === selectedQuestion.correctAnswer;
                  const isSelected = selectedOption === idx;

                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isThisCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50';
                  } else if (isThisWrong) {
                    btnStyle = 'bg-rose-950/40 border-rose-800 text-rose-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-cyan-950/70 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isCorrect === true}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isThisWrong && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Status Alert for Wrong Attempts */}
              {isCorrect === false && (
                <div className="p-3.5 bg-rose-950/40 border border-rose-800/80 rounded-xl text-xs text-rose-200 flex items-start gap-2.5 animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Noto‘g‘ri javob!</strong>
                    <span>To‘g‘risini topmaguningizcha savol faol turadi. Boshqa variantni tanlang va qayta tekshiring!</span>
                  </div>
                </div>
              )}

              {/* Correct Success Box & Auto-Dismiss Exit */}
              {isCorrect === true ? (
                <div className="space-y-4 pt-2 animate-fade-in">
                  <div className="p-4 rounded-xl border bg-emerald-950/50 border-emerald-500 text-emerald-200 text-xs leading-relaxed">
                    <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm mb-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Barakalla! To‘g‘ri javob topildi (+10 ball)!</span>
                    </div>
                    <p className="mb-2">{selectedQuestion.explanation}</p>
                    <div className="text-[11px] text-emerald-400/80 flex items-center gap-1 font-mono">
                      <span>✓ Savol yechildi va ro‘yxatdan chiqdi. Chambarakka qaytilmoqda...</span>
                    </div>
                  </div>

                  <button
                    onClick={handleExitToWheel}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                  >
                    <span>Darhol chambarakka qaytish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                    selectedOption !== null
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 active:scale-95'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {wrongAttempts.length > 0 ? 'Qaytadan tekshirish' : 'Javobni tekshirish'}
                </button>
              )}
            </div>
          ) : (
            <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-950/50 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <HelpCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-200">
                  {gameFinished ? 'Barcha 8 ta savol muvaffaqiyatli yakunlandi!' : 'Savol tanlash uchun chambarakni aylantiring'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  {gameFinished
                    ? `Siz barcha 8 ta savolni to‘g‘ri topib, jami ${score} ball to‘pladingiz!`
                    : 'Chambarakni aylantiring. To‘g‘ri javob berilgan savollar chambarakdan o‘chib (yechildi deb belgilanadi) chiqib ketadi!'}
                </p>
              </div>

              {gameFinished && (
                <button
                  onClick={handleResetGame}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" /> O‘yinni yangidan boshlash
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
