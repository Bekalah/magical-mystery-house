/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers (drawn in order):
    1) Vesica field – intersecting circles forming a calm grid
    2) Tree-of-Life scaffold – 10 sephirot nodes + 22 paths
    3) Fibonacci curve – logarithmic spiral polyline
    4) Double-helix lattice – two phase-shifted strands with 33 rungs

  Design: no motion, no external deps, ASCII quotes only.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  // wipe canvas
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // layer order preserves depth without motion
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, { a: palette.layers[4], b: palette.layers[5], rung: palette.ink }, NUM);

  ctx.restore();
}

/* Layer 1: Vesica field */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin strokes, generous spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const r = Math.min(w, h) / NUM.THREE;
  const step = r / NUM.SEVEN;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
      ctx.beginPath(); ctx.arc(x - step, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + step, y, r, 0, Math.PI * 2); ctx.stroke();
    }
  }
  ctx.restore();
}

/* Layer 2: Tree-of-Life scaffold */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  // ND-safe: static nodes and paths, no glow
  ctx.save();
  const layout = [
    { x: 0.5, y: 0.05 }, // Kether
    { x: 0.75, y: 0.18 }, // Chokmah
    { x: 0.25, y: 0.18 }, // Binah
    { x: 0.75, y: 0.35 }, // Chesed
    { x: 0.25, y: 0.35 }, // Geburah
    { x: 0.5, y: 0.5 },   // Tiphereth
    { x: 0.75, y: 0.65 }, // Netzach
    { x: 0.25, y: 0.65 }, // Hod
    { x: 0.5, y: 0.78 },  // Yesod
    { x: 0.5, y: 0.95 }   // Malkuth
  ].map(n => ({ x: n.x * w, y: n.y * h }));

  const edges = [
    [0,1],[0,2],[0,5],
    [1,2],[1,3],[1,4],
    [2,3],[2,4],[3,4],
    [3,5],[3,6],[4,5],[4,7],
    [5,6],[5,7],[5,8],
    [6,7],[6,8],[6,9],
    [7,8],[7,9],[8,9]
  ];

  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  for (const [a,b] of edges) {
    ctx.beginPath();
    ctx.moveTo(layout[a].x, layout[a].y);
    ctx.lineTo(layout[b].x, layout[b].y);
    ctx.stroke();
  }

  ctx.fillStyle = nodeColor;
  const r = h / NUM.TWENTYTWO;
  for (const n of layout) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/* Layer 3: Fibonacci curve */
function drawFibonacci(ctx, w, h, color, NUM) {
  // ND-safe: static spiral, 144 samples
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const cx = w * 0.3;
  const cy = h * 0.6;
  const pts = NUM.ONEFORTYFOUR;
  const phi = (1 + Math.sqrt(5)) / 2;
  ctx.beginPath();
  for (let i = 0; i < pts; i++) {
    const theta = 0.1 * i;
    const rad = Math.pow(phi, theta / Math.PI);
    const x = cx + rad * Math.cos(theta) * 20;
    const y = cy + rad * Math.sin(theta) * 20;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice */
function drawHelix(ctx, w, h, colors, NUM) {
  // ND-safe: static strands with 33 rungs
  ctx.save();
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;

  // strand A
  ctx.strokeStyle = colors.a;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h / 2 + Math.sin(t * waves * 2 * Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B (phase shift π)
  ctx.strokeStyle = colors.b;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h / 2 + Math.sin(t * waves * 2 * Math.PI + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // rungs
  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = t * w;
    const phase = t * waves * 2 * Math.PI;
    const y1 = h / 2 + Math.sin(phase) * amp;
    const y2 = h / 2 + Math.sin(phase + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
  ctx.restore();
}
