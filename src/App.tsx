import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ObjectivesSection } from './components/ObjectivesSection';
import { TheorySection } from './components/TheorySection';
import { Simulation3D } from './components/Simulation3D';
import { Simulation2DBlueprint } from './components/Simulation2DBlueprint';
import { RealWorldExamples } from './components/RealWorldExamples';
import { FormulaLab } from './components/FormulaLab';
import { FortuneWheel } from './components/FortuneWheel';
import { IndependentProblems } from './components/IndependentProblems';
import { QuizSection } from './components/QuizSection';
import { LessonSummary } from './components/LessonSummary';
import { PresenterDock } from './components/PresenterDock';
import { FormulaSheetModal } from './components/FormulaSheetModal';
import { soundFx } from './utils/audio';
import { Compass, Sparkles, Layers, Award, HelpCircle } from 'lucide-react';

export default function App() {
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLargeFont, setIsLargeFont] = useState<boolean>(false);
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState<boolean>(false);
  const [experimentView, setExperimentView] = useState<'3d' | '2d' | 'both'>('3d');

  // Shared parameters for 2D/3D synchronized view
  const [simRadius, setSimRadius] = useState<number>(1.2);
  const [simPeriod, setSimPeriod] = useState<number>(2.0);

  // Fullscreen API toggle
  const toggleFullscreen = useCallback(() => {
    soundFx.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        // Fallback for browsers blocking fullscreen in iframe
        setIsFullscreen(!isFullscreen);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {
          setIsFullscreen(false);
        });
      }
    }
  }, [isFullscreen]);

  // Sync fullscreen change event
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsProjectorMode(prev => !prev);
        soundFx.playClick();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        soundFx.setMuted(!soundFx.getMuted());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFullscreen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 ${
        isProjectorMode ? 'projector-mode ring-4 ring-amber-500/40' : ''
      } ${isLargeFont ? 'projector-enlarge' : ''}`}
    >
      {/* Top Header Navigation */}
      <Header
        isProjectorMode={isProjectorMode}
        onToggleProjectorMode={() => setIsProjectorMode(!isProjectorMode)}
        onOpenFormulaSheet={() => setIsFormulaSheetOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
        {/* Section A: Hero Screen */}
        <HeroSection
          onStartLesson={() => scrollToSection('objectives')}
          onOpenExperiment={() => scrollToSection('experiment')}
          onToggleProjector={() => setIsProjectorMode(!isProjectorMode)}
        />

        {/* Section B: Lesson Objectives (Dars Maqsadlari) */}
        <section id="objectives" className="scroll-mt-20">
          <ObjectivesSection />
        </section>

        {/* Section C: Theory Laboratory (Nazariy Laboratoriya) */}
        <section id="theory" className="scroll-mt-20">
          <TheorySection />
        </section>

        {/* Section D: Flagship Interactive Experiment (3D & 2D) */}
        <section id="experiment" className="scroll-mt-20 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Asosiy Funksiya
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Interaktiv Laboratoriya Simulyatsiyasi
              </h2>
              <p className="text-sm text-slate-400">
                Aylana trayektoriyasi, urinma tezlik vektori <span className="text-emerald-400 font-mono">v⃗</span>, radius <span className="text-amber-400 font-mono">r</span> va real vaqtdagi hisob-kitoblar.
              </p>
            </div>

            {/* View Mode Switcher: 3D vs 2D Radar */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setExperimentView('3d');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  experimentView === '3d'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                3D Laboratoriya
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setExperimentView('2d');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  experimentView === '2d'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                2D Sxematik Blueprint
              </button>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setExperimentView('both');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  experimentView === 'both'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Ikkala ko‘rinish
              </button>
            </div>
          </div>

          {/* 3D Scene */}
          {(experimentView === '3d' || experimentView === 'both') && (
            <div className="w-full">
              <Simulation3D isProjectorMode={isProjectorMode} />
            </div>
          )}

          {/* 2D Vector Blueprint Canvas */}
          {(experimentView === '2d' || experimentView === 'both') && (
            <div className="w-full">
              <Simulation2DBlueprint
                radius={simRadius}
                period={simPeriod}
                onRadiusChange={setSimRadius}
                onPeriodChange={setSimPeriod}
              />
            </div>
          )}
        </section>

        {/* Section E: Real World Examples (Hayotiy Misollar) */}
        <section id="examples" className="scroll-mt-20">
          <RealWorldExamples />
        </section>

        {/* Section F: Formula Laboratory (Formula Kalkulyatori) */}
        <section id="formulas" className="scroll-mt-20">
          <FormulaLab />
        </section>

        {/* Section G: Fortune Wheel Question Game (Omad Chambaragi) */}
        <section id="wheel" className="scroll-mt-20">
          <FortuneWheel />
        </section>

        {/* Section I: Independent Problems (Mustaqil Masalalar) */}
        <section id="problems" className="scroll-mt-20">
          <IndependentProblems />
        </section>

        {/* Section H: Knowledge Quiz (Viktorina) */}
        <section id="quiz" className="scroll-mt-20">
          <QuizSection />
        </section>

        {/* Section J: Lesson Summary (Dars Yakuni) */}
        <section id="summary" className="scroll-mt-20">
          <LessonSummary />
        </section>
      </main>

      {/* Floating Presenter Dock (Teacher Projector Control) */}
      <PresenterDock
        isProjectorMode={isProjectorMode}
        onToggleProjectorMode={() => setIsProjectorMode(!isProjectorMode)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        isLargeFont={isLargeFont}
        onToggleLargeFont={() => setIsLargeFont(!isLargeFont)}
      />

      {/* Formula Sheet Quick Reference Modal */}
      <FormulaSheetModal
        isOpen={isFormulaSheetOpen}
        onClose={() => setIsFormulaSheetOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-900 bg-slate-950 py-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-mono font-bold text-[10px]">
              OL
            </div>
            <span>ORBITA LAB © {new Date().getFullYear()} — O‘zbekiston maktablari uchun 7-sinf fizika laboratoriyasi</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>14-mavzu: Aylana bo‘ylab harakat</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">DTS Standart</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
