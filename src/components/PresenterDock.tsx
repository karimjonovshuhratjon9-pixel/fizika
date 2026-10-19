import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Monitor, ChevronDown, ChevronUp, ZoomIn, ZoomOut, Keyboard, Maximize2, Minimize2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface PresenterDockProps {
  isProjectorMode: boolean;
  onToggleProjectorMode: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isLargeFont: boolean;
  onToggleLargeFont: () => void;
}

export const PresenterDock: React.FC<PresenterDockProps> = ({
  isProjectorMode,
  onToggleProjectorMode,
  isFullscreen,
  onToggleFullscreen,
  isLargeFont,
  onToggleLargeFont
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [lessonTime, setLessonTime] = useState<number>(0); // in seconds
  const [timerRunning, setTimerRunning] = useState<boolean>(true);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState<boolean>(false);

  // Lesson stopwatch timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setLessonTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    soundFx.playClick();
    setLessonTime(0);
  };

  const sections = [
    { num: '1', id: 'hero', label: 'Bosh' },
    { num: '2', id: 'objectives', label: 'Maqsad' },
    { num: '3', id: 'theory', label: 'Nazariya' },
    { num: '4', id: 'experiment', label: 'Tajriba' },
    { num: '5', id: 'examples', label: 'Misollar' },
    { num: '6', id: 'formulas', label: 'Formula' },
    { num: '7', id: 'wheel', label: 'Chambarak' },
    { num: '8', id: 'problems', label: 'Masalalar' },
    { num: '9', id: 'quiz', label: 'Viktorina' },
    { num: '10', id: 'summary', label: 'Yakun' }
  ];

  if (!isProjectorMode) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-5xl no-print">
      {/* Collapse Handle */}
      <div className="flex justify-center -mb-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1 rounded-t-xl text-xs font-bold flex items-center gap-1 shadow-lg transition-colors"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" /> O‘qituvchi boshqaruv panelini ko‘rsatish
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" /> Panelni yig‘ish
            </>
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="bg-slate-950/95 border-2 border-amber-500/80 rounded-2xl p-3 shadow-2xl backdrop-blur-none space-y-3">
          {/* Top Bar: Timer + Shortcuts + Font Size + Keyboard */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-2">
            {/* Left: Stopwatch */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400">Dars vaqti (45 min):</span>
              <span className="font-mono font-bold text-white text-sm">{formatTime(lessonTime)}</span>

              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-1 text-slate-300 hover:text-white rounded"
                title={timerRunning ? "Vaqtni to'xtatish" : "Vaqtni davom ettirish"}
              >
                {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleResetTimer}
                className="p-1 text-slate-400 hover:text-white rounded"
                title="Vaqtni qayta o'rnatish"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Middle: Text Enlargement & Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleLargeFont}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
                  isLargeFont
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title="Proyektor uchun yirik matn shrifti"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{isLargeFont ? 'Yirik Shrift (Faol)' : 'Yirik Shrift'}</span>
              </button>

              <button
                onClick={onToggleFullscreen}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{isFullscreen ? 'Kichik ekran' : 'To‘liq ekran'}</span>
              </button>

              <button
                onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Klaviatura tugmalari"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Tugmalar</span>
              </button>
            </div>

            {/* Right: Exit Projector mode */}
            <button
              onClick={() => {
                soundFx.playClick();
                onToggleProjectorMode();
              }}
              className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition-all"
            >
              Rejimdan chiqish
            </button>
          </div>

          {/* Quick Jump Buttons (10 slide sections) */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider mr-1 shrink-0">
              Bo‘limga o‘tish:
            </span>
            {sections.map(sec => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors shrink-0 flex items-center gap-1"
              >
                <span className="text-cyan-400 font-mono font-bold text-[10px]">{sec.num}.</span>
                <span>{sec.label}</span>
              </a>
            ))}
          </div>

          {/* Keyboard Shortcuts Overlay Modal / Bar */}
          {showKeyboardHelp && (
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono">
              <div>
                <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-400">Space</kbd>{' '}
                <span className="text-slate-400 text-[11px]">Pauza/Play</span>
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-400">R</kbd>{' '}
                <span className="text-slate-400 text-[11px]">Qayta boshlash</span>
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-400">F</kbd>{' '}
                <span className="text-slate-400 text-[11px]">To‘liq ekran</span>
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-400">P</kbd>{' '}
                <span className="text-slate-400 text-[11px]">Proyektor</span>
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-400">M</kbd>{' '}
                <span className="text-slate-400 text-[11px]">Ovozni o‘chirish</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
