import React, { useState, useRef, useEffect } from 'react';

function renderFractal(ctx, width, height, iterations, hueShift) {
  const img = ctx.createImageData(width, height);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = (x - width / 2) / (width / 4);
      let b = (y - height / 2) / (height / 4);
      let ca = a;
      let cb = b;
      let n = 0;
      const max = iterations;
      while (n < max) {
        const aa = a * a - b * b;
        const bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) break;
        n++;
      }
      const p = (x + y * width) * 4;
      const smooth = n === max ? 0 : (n / max);
      const hue = (smooth * 240 + hueShift) % 360;
      const sat = 60 + smooth * 40;
      const light = 10 + smooth * 50;
      const color = hslToRgb(hue / 360, sat / 100, light / 100);
      img.data[p] = color[0];
      img.data[p + 1] = color[1];
      img.data[p + 2] = color[2];
      img.data[p + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

function hslToRgb(h, s, l) {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1/3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1/3);
  return [r * 255, g * 255, b * 255];
}

export default function FractalLab() {
  const canvasRef = useRef(null);
  const [iterations, setIterations] = useState(80);
  const [hueShift, setHueShift] = useState(0);
  const [gentle, setGentle] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    renderFractal(ctx, canvas.width, canvas.height, iterations, hueShift);
  }, [iterations, hueShift]);

  // Gentle animation of hue if enabled
  useEffect(() => {
    if (!gentle) return;
    let raf; let h = hueShift;
    const step = () => {
      h = (h + 0.2) % 360;
      setHueShift(h);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [gentle]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-[#EDEBE6]/70 max-w-prose">Fractal Atelier: soothing parameter space exploration. Gentle hue drift avoids harsh strobing.</p>
      <div className="flex flex-wrap gap-3 items-center text-xs">
        <label className="flex items-center gap-1">Iterations
          <input type="range" min={30} max={200} value={iterations} onChange={e => setIterations(+e.target.value)} />
        </label>
        <label className="flex items-center gap-1">Hue
          <input type="range" min={0} max={360} value={hueShift} onChange={e => setHueShift(+e.target.value)} />
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={gentle} onChange={e => setGentle(e.target.checked)} /> Gentle Drift
        </label>
      </div>
      <canvas ref={canvasRef} width={400} height={400} className="rounded border border-[#FFD700]/30 shadow bg-black" />
    </div>
  );
}
