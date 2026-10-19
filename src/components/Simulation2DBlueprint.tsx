import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Simulation2DBlueprintProps {
  radius: number;
  period: number;
  onRadiusChange: (r: number) => void;
  onPeriodChange: (T: number) => void;
}

export const Simulation2DBlueprint: React.FC<Simulation2DBlueprintProps> = ({
  radius,
  period,
  onRadiusChange,
  onPeriodChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showTangent, setShowTangent] = useState<boolean>(true);
  const [showRadiusLine, setShowRadiusLine] = useState<boolean>(true);
  const [showAngleArc, setShowAngleArc] = useState<boolean>(true);

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const linearVelocity = (2 * Math.PI * radius) / period;

  // Lightweight 60fps loop with IntersectionObserver (zero unnecessary React re-renders)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let currentAngle = 0;
    let isVisible = true;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pause when off-screen to save 100% CPU on Core i3/i5
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    const render = (time: number) => {
      animId = requestAnimationFrame(render);

      if (!isVisible || document.hidden) {
        lastTime = time;
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (isPlayingRef.current && period > 0) {
        const omega = (2 * Math.PI) / period;
        currentAngle = (currentAngle + omega * dt) % (2 * Math.PI);
      }

      // Draw 2D Vector Blueprint
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Clear with dark navy
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      // Coordinate axes
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('+X (m)', w - 45, cy - 8);
      ctx.fillText('+Y (m)', cx + 8, 20);

      // Orbit circle
      const scale = 110;
      const pxRadius = radius * scale;

      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, pxRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);

      // Current puck position on circle
      const posX = cx + pxRadius * Math.cos(currentAngle);
      const posY = cy - pxRadius * Math.sin(currentAngle);

      // Angle arc (from 0 to currentAngle)
      if (showAngleArc) {
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
        ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, 38, 0, -currentAngle, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        const deg = Math.round((currentAngle * 180) / Math.PI);
        ctx.fillText(`φ=${deg}°`, cx + 45 * Math.cos(-currentAngle / 2), cy + 45 * Math.sin(-currentAngle / 2));
      }

      // Radius line
      if (showRadiusLine) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(posX, posY);
        ctx.stroke();

        // Label on radius line
        const midX = (cx + posX) / 2;
        const midY = (cy + posY) / 2;
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        ctx.fillText(`r = ${radius.toFixed(2)} m`, midX - 25, midY - 10);
      }

      // Center point
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('Markaz (O)', cx - 35, cy + 18);

      // Tangent velocity vector arrow
      if (showTangent) {
        const vLength = Math.max(linearVelocity * 28, 40);
        const vdx = -Math.sin(currentAngle);
        const vdy = -Math.cos(currentAngle);

        const vEndX = posX + vdx * vLength;
        const vEndY = posY + vdy * vLength;

        // Line
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(posX, posY);
        ctx.lineTo(vEndX, vEndY);
        ctx.stroke();

        // Arrow head
        const arrowAngle = Math.atan2(vEndY - posY, vEndX - posX);
        const headLen = 12;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.moveTo(vEndX, vEndY);
        ctx.lineTo(
          vEndX - headLen * Math.cos(arrowAngle - Math.PI / 6),
          vEndY - headLen * Math.sin(arrowAngle - Math.PI / 6)
        );
        ctx.lineTo(
          vEndX - headLen * Math.cos(arrowAngle + Math.PI / 6),
          vEndY - headLen * Math.sin(arrowAngle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();

        // Tangent label
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 13px "JetBrains Mono", monospace';
        ctx.fillText(`v⃗ = ${linearVelocity.toFixed(2)} m/s (urinma)`, vEndX + 8, vEndY);

        // Right angle symbol between radius and tangent
        const normSize = 12;
        const rDirX = Math.cos(currentAngle);
        const rDirY = -Math.sin(currentAngle);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(posX - rDirX * normSize, posY - rDirY * normSize);
        ctx.lineTo(posX - rDirX * normSize + vdx * normSize, posY - rDirY * normSize + vdy * normSize);
        ctx.lineTo(posX + vdx * normSize, posY + vdy * normSize);
        ctx.stroke();
      }

      // Moving body
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(posX, posY, 9, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Body label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText('Jism', posX + 12, posY - 8);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [radius, period, showTangent, showRadiusLine, showAngleArc, linearVelocity]);

  return (
    <div ref={containerRef} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            2D Sxematik Koordinata Modeli (Radar Blueprint)
          </h3>
          <p className="text-xs text-slate-400">
            Darslikdagi chizma bilan 100% mos: urinma tezlik vektori <span className="text-emerald-400 font-mono">v⃗</span> va radius <span className="text-amber-400 font-mono">r</span> orasidagi 90° burchak
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setIsPlaying(!isPlaying);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              isPlaying ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isPlaying ? 'Pauza' : 'Davom ettirish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Canvas Display */}
        <div className="lg:col-span-2 flex justify-center bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={540}
            height={360}
            className="w-full max-w-[540px] h-[340px] block"
          />
        </div>

        {/* Explanatory side panel */}
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4" /> Muhim fizik qonuniyat
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jism aylana bo‘ylab bir tekis aylanganda uning tezlik moduli o‘zgarmas bo‘lishi mumkin:
              <br />
              <strong className="text-emerald-400 font-mono block mt-1">|v| = const</strong>
              Ammo tezlikning <strong>yo‘nalishi har bir oniy lahzada o‘zgarib</strong> boradi. Urinma vektor doimo radiusga perpendikulyar bo‘lib aylanadi.
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showTangent}
                onChange={e => setShowTangent(e.target.checked)}
                className="accent-emerald-500 rounded"
              />
              <span>Urinma tezlik vektori <strong className="text-emerald-400">(v⃗)</strong></span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showRadiusLine}
                onChange={e => setShowRadiusLine(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              <span>Radius vektori <strong className="text-amber-400">(r)</strong></span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showAngleArc}
                onChange={e => setShowAngleArc(e.target.checked)}
                className="accent-purple-500 rounded"
              />
              <span>Burchak ko‘rsatkichi <strong className="text-purple-400">(φ)</strong></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
