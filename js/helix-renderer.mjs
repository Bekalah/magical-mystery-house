/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers drawn in order:
    1) Vesica field — intersecting circles forming a calm grid
    2) Tree-of-Life scaffold — 10 sephirot nodes + 22 paths
    3) Fibonacci curve — logarithmic spiral using 144 sampled points
    4) Double-helix lattice — two phase-shifted strands with 33 cross rungs

  All functions are pure and run once; no motion, no dependencies.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Layer order preserves depth without motion
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, { a: palette.layers[4], b: palette.layers[5], rung: palette.ink }, NUM);

  ctx.restore();
}

/* Layer 1: Vesica field — calm grid of intersecting circles */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin lines, generous spacing
  const r = Math.min(w, h) / NUM.THREE;       // triadic radius
  const step = r / NUM.SEVEN;                 // septenary spacing

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

/* Layer 2: Tree-of-Life scaffold — nodes and paths */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  // Layout approximates the sefirot; static and evenly spaced
  const cx = w / 2;
  const top = h / NUM.NINE;
  const bottom = h - top;
  const middle = (top + bottom) / 2;
  const quarter = (top + middle) / 2;
  const threeQuarter = (middle + bottom) / 2;

  const nodes = [
    [cx, top],
    [cx - w / NUM.SEVEN, quarter],
    [cx + w / NUM.SEVEN, quarter],
    [cx - w / NUM.NINE, middle],
    [cx + w / NUM.NINE, middle],
    [cx, middle + h / NUM.TWENTYTWO],
    [cx - w / NUM.NINE, threeQuarter],
    [cx + w / NUM.NINE, threeQuarter],
    [cx, bottom - h / NUM.ELEVEN],
    [cx, bottom]
  ];

  const paths = [
    [0,1],[0,2],[1,3],[2,4],[3,4],[3,5],[4,5],[3,6],[4,7],[6,7],[6,8],[7,8],[5,8],[8,9]
  ];

  ctx.save();
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;

  paths.forEach(([a,b]) => {
    const [x1,y1] = nodes[a];
    const [x2,y2] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  const r = Math.min(w, h) / NUM.TWENTYTWO;
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/* Layer 3: Fibonacci curve — static logarithmic spiral */
function drawFibonacci(ctx, w, h, color, NUM) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const samples = NUM.ONEFORTYFOUR;
  const scale = Math.min(w, h) / NUM.THIRTYTHREE;
  const cx = w / 2;
  const cy = h / 2;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i <= samples; i++) {
    const theta = i * (Math.PI / NUM.ELEVEN);
    const r = scale * Math.pow(phi, theta / Math.PI);
    const x = cx + Math.cos(theta) * r;
    const y = cy + Math.sin(theta) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice — two static strands with rungs */
function drawHelix(ctx, w, h, colors, NUM) {
  // ND-safe: even spacing, no motion
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;

  ctx.save();
  ctx.lineWidth = 2;

  // strand A
  ctx.strokeStyle = colors.a;
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

  // cross rungs
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
