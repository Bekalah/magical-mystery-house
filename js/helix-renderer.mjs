/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers (drawn in order):
    1) Vesica field – intersecting circles forming a calm grid
    2) Tree-of-Life scaffold – 10 sephirot nodes with 22 paths
    3) Fibonacci curve – logarithmic spiral using 144 samples
    4) Double-helix lattice – two phase-shifted strands with rungs

  Design: no motion, no external deps, ASCII quotes only.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, {
    a: palette.layers[4],
    b: palette.layers[5],
    rung: palette.ink
  }, NUM);

  ctx.restore();
}

/* Layer 1: Vesica field */
function drawVesica(ctx, w, h, color, NUM) {
  // Vesica field: calm outline grid; ND-safe thin strokes
  const r = Math.min(w, h) / NUM.THREE;      // triadic radius
  const step = r / NUM.SEVEN;                // septenary spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
      ctx.beginPath(); ctx.arc(x - step, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + step, y, r, 0, Math.PI * 2); ctx.stroke();
    }
  }
  ctx.restore();
}

/* Layer 2: Tree-of-Life scaffold */
function drawTree(ctx, w, h, pathColor, nodeColor, NUM) {
  // Simplified 10-node tree with 22 connective paths
  ctx.save();
  const r = Math.min(w, h) / NUM.THIRTYTHREE; // node radius guided by 33
  const nodes = [
    { x:0.5, y:0.05 },
    { x:0.5, y:0.18 },
    { x:0.35, y:0.26 },
    { x:0.65, y:0.26 },
    { x:0.35, y:0.40 },
    { x:0.65, y:0.40 },
    { x:0.5, y:0.48 },
    { x:0.35, y:0.64 },
    { x:0.65, y:0.64 },
    { x:0.5, y:0.82 }
  ];
  const paths = [
    [0,1],[1,2],[1,3],[2,4],[3,5],[4,6],[5,6],[4,7],[5,8],
    [7,8],[7,9],[8,9],[2,3],[0,2],[0,3],[6,7],[6,8],[1,6],
    [6,9],[4,5],[2,5],[3,4]
  ];
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  for (const [a,b] of paths) {
    const A = nodes[a], B = nodes[b];
    ctx.beginPath();
    ctx.moveTo(A.x * w, A.y * h);
    ctx.lineTo(B.x * w, B.y * h);
    ctx.stroke();
  }
  ctx.fillStyle = nodeColor;
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x * w, n.y * h, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/* Layer 3: Fibonacci curve */
function drawFibonacci(ctx, w, h, color, NUM) {
  // Static logarithmic spiral with 144 samples (12^2)
  const cx = w / 2, cy = h / 2;
  const phi = (1 + Math.sqrt(5)) / 2;         // golden ratio (approx)
  const scale = Math.min(w, h) / NUM.THREE;   // fit to canvas using triad
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < NUM.ONEFORTYFOUR; i++) {
    const t = (i / NUM.ONEFORTYFOUR) * NUM.TWENTYTWO * Math.PI / NUM.SEVEN; // gentle sweep
    const r = scale * Math.pow(phi, t / (Math.PI * 2));
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice */
function drawHelix(ctx, w, h, colors, NUM) {
  /* Double-helix lattice: two static strands with cross rungs.
     ND-safe: no motion, even spacing. */
  const amp = h / NUM.NINE;       // vertical amplitude
  const waves = NUM.ELEVEN;       // number of waves across canvas
  const steps = NUM.NINETYNINE;   // sampling for smoothness
  ctx.save();

  // strand A
  ctx.strokeStyle = colors.a;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2 * Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B (phase shifted)
  ctx.strokeStyle = colors.b;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2 * Math.PI + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // cross rungs
  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = t * w;
    const phase = t * waves * 2 * Math.PI;
    const y1 = h/2 + Math.sin(phase) * amp;
    const y2 = h/2 + Math.sin(phase + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }

  ctx.restore();
}
