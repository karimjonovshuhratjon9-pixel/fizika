import React, { useState } from 'react';
import { Compass, Maximize2, Minimize2, Volume2, VolumeX, Monitor, FileSpreadsheet, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  isProjectorMode: boolean;
  onToggleProjectorMode: () => void;
  onOpenFormulaSheet: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isProjectorMode,
  onToggleProjectorMode,
  onOpenFormulaSheet,
  isFullscreen,
  onToggleFullscreen
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMute = () => {
    const next = !isMuted;
    soundFx.setMuted(next);
    setIsMuted(next);
    if (!next) {
      soundFx.playClick();
    }
  };

  const navLinks = [
    { label: 'Bosh ekran', href: '#hero' },
    { label: 'Maqsadlar', href: '#objectives' },
    { label: 'Nazariya', href: '#theory' },
    { label: 'Tajriba (3D)', href: '#experiment' },
    { label: 'Hayotiy misollar', href: '#examples' },
    { label: 'Formulalar', href: '#formulas' },
    { label: 'Omad chambaragi', href: '#wheel' },
    { label: 'Masalalar', href: '#problems' },
    { label: 'Viktorina', href: '#quiz' },
    { label: 'Yakun', href: '#summary' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Lesson Tag */}
        <div className="flex items-center gap-3">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-400 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-cyan-400 group-hover:rotate-45 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-white font-mono text-base">
                <span>ORBITA</span>
                <span className="text-cyan-400">LAB</span>
              </div>
              <div className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
                7-sinf fizika • 14-mavzu
              </div>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-300">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/80 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Tools & Teacher Actions */}
        <div className="flex items-center gap-2">
          {/* Formula Sheet Quick Reference Modal Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenFormulaSheet();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
            title="Formulalar eslatmasi"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            <span>Formulalar</span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleMute}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isMuted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all"
            title={isFullscreen ? 'To‘liq ekrandan chiqish' : 'To‘liq ekran (Fullscreen)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Projector / Presenter Mode Toggle Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onToggleProjectorMode();
            }}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
              isProjectorMode
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-cyan-400 shadow-cyan-500/20'
            }`}
            title="Ochiq dars va proyektor rejimi"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{isProjectorMode ? 'Proyektor Faol' : 'Namoyish Rejimi'}</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 xl:hidden"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              onOpenFormulaSheet();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2 bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 rounded-lg"
          >
            Formulalar ma’lumotnomasi
          </button>
        </div>
      )}
    </header>
  );
};
