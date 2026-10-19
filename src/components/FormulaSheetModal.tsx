import React from 'react';
import { X, FileSpreadsheet, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 lg:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-800 flex items-center justify-center text-cyan-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Formulalar Ma’lumotnomasi</h3>
              <p className="text-xs text-slate-400">7-sinf fizika | 14-mavzu: Aylana bo‘ylab harakat</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="text-amber-400 font-bold font-mono text-sm">1. Aylanish davri (T)</div>
              <div className="text-xl font-mono font-bold text-white">T = t / N</div>
              <p className="text-slate-300">
                1 ta to‘liq aylanish uchun sarflangan vaqt.
                <br />
                <span className="text-slate-400 font-mono">Birligi: sekund [s]</span>
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="text-emerald-400 font-bold font-mono text-sm">2. Aylanish chastotasi (f)</div>
              <div className="text-xl font-mono font-bold text-white">f = N / t = 1 / T</div>
              <p className="text-slate-300">
                1 sekund ichidagi to‘liq aylanishlar soni.
                <br />
                <span className="text-slate-400 font-mono">Birligi: Gers [Hz] yoki s⁻¹</span>
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="text-cyan-400 font-bold font-mono text-sm">3. Chiziqli tezlik (v)</div>
              <div className="text-xl font-mono font-bold text-white">v = 2πr / T = 2πrf</div>
              <p className="text-slate-300">
                Aylana trayektoriyasiga urinma yo‘nalishdagi tezlik moduli.
                <br />
                <span className="text-slate-400 font-mono">Birligi: metr / sekund [m/s]</span>
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="text-violet-400 font-bold font-mono text-sm">4. Burchak tezligi (ω)</div>
              <div className="text-xl font-mono font-bold text-white">ω = 2π / T = 2πf</div>
              <p className="text-slate-300">
                Radius-vektorning burilish burchagi tezligi (v = ω · r).
                <br />
                <span className="text-slate-400 font-mono">Birligi: radian / sekund [rad/s]</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="text-rose-400 font-bold font-mono text-sm">5. Markazga intilma tezlanish (a)</div>
            <div className="text-xl font-mono font-bold text-white">a = v² / r = ω²r</div>
            <p className="text-slate-300">
              Aylanma harakatda tezlik yo‘nalishi uzluksiz o‘zgargani uchun doimo markazga yo‘nalgan tezlanish mavjud bo‘ladi.
              <br />
              <span className="text-slate-400 font-mono">Birligi: m/s²</span>
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md"
          >
            Tushundim (Yopish)
          </button>
        </div>
      </div>
    </div>
  );
};
