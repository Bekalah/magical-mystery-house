/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers drawn in order:
    1) Vesica field — intersecting circles forming a calm grid
    2) Tree-of-Life scaffold — 10 sephirot nodes + 22 paths
    3) Fibonacci curve — logarithmic spiral using 144 samples
    4) Double-helix lattice — two phase-shifted strands with 33 cross rungs

  All functions are pure and run once; no motion, no dependencies.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // layer order preserves depth without motion
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
  // ND-safe: thin lines, generous spacing
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
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  // Simplified sephirot layout: 3 columns, 5 rows
  const xs = [w / 4, w / 2, (3 * w) / 4];
  const ys = [h / 12, h / 3, h / 2, (2 * h) / 3, (11 * h) / 12];
  const nodes = [
    [xs[1], ys[0]], // crown
    [xs[0], ys[1]], // wisdom
    [xs[2], ys[1]], // understanding
    [xs[0], ys[2]], // mercy
    [xs[2], ys[2]], // severity
    [xs[1], ys[2]], // beauty
    [xs[0], ys[3]], // victory
    [xs[2], ys[3]], // splendor
    [xs[1], ys[3]], // foundation
    [xs[1], ys[4]]  // kingdom
  ];

  const paths = [
    [0,1],[0,2],[1,2],
    [1,3],[1,5],[2,4],[2,5],
    [3,4],[3,5],[4,5],
    [3,6],[4,7],[5,6],[5,7],[6,7],
    [6,8],[7,8],[8,9],
    [3,8],[4,8],[1,4],[2,3]
  ]; // 22 paths

  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = pathColor;
  paths.forEach(([a, b]) => {
    const [x1, y1] = nodes[a];
    const [x2, y2] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, w / NUM.THIRTYTHREE, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/* Layer 3: Fibonacci curve */
function drawFibonacci(ctx, w, h, color, NUM) {
  const samples = NUM.ONEFORTYFOUR;          // 144 samples
  const phi = (1 + Math.sqrt(5)) / 2;
  const scale = Math.min(w, h) / NUM.THIRTYTHREE;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * NUM.ELEVEN;
    const r = scale * Math.pow(phi, t / NUM.THREE);
    const angle = t;
    const x = w / 2 + r * Math.cos(angle);
    const y = h / 2 + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice */
function drawHelix(ctx, w, h, colors, NUM) {
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
