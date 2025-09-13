/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers (rendered in order):
    1) Vesica field — intersecting circles
    2) Tree-of-Life scaffold — 10 nodes with 22 paths
    3) Fibonacci curve — logarithmic spiral polyline
    4) Double-helix lattice — two phase-shifted strands with rungs

  All functions are pure and run once; no motion, no dependencies.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, { a: palette.layers[4], b: palette.layers[5], rung: palette.ink }, NUM);

  ctx.restore();
}

/* Layer 1: Vesica field — calm grid of intersecting circles */
function drawVesica(ctx, w, h, color, NUM) {
  const r = Math.min(w, h) / NUM.THREE; // triadic radius
  const step = r / NUM.SEVEN;           // septenary spacing
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

/* Layer 2: Tree-of-Life scaffold — 10 nodes, 22 paths */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  const nodes = [
    [0.5, 0.05],
    [0.25, 0.15], [0.75, 0.15],
    [0.25, 0.3], [0.5, 0.35], [0.75, 0.3],
    [0.25, 0.5], [0.75, 0.5],
    [0.5, 0.6],
    [0.5, 0.8]
  ].map(([x, y]) => [x * w, y * h]);

  const paths = [
    [0,1],[0,2],
    [1,2],[1,3],[1,4],[2,4],[2,5],
    [3,4],[4,5],
    [3,6],[4,6],[4,7],[5,7],
    [6,8],[7,8],
    [6,9],[7,9],
    [8,9],
    [3,5],[1,5],[2,3],[6,7]
  ];

  ctx.save();
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
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
    const y = cy - Math.sin(theta) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice — two static strands with rungs */
function drawHelix(ctx, w, h, colors, NUM) {
  const amp = h / NUM.NINE;       // gentle amplitude
  const waves = NUM.ELEVEN;       // helix turns
  const steps = NUM.NINETYNINE;   // sampling
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
