/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers drawn in order:
    1) Vesica field — intersecting circles forming a calm grid
    2) Tree-of-Life scaffold — 10 sephirot nodes with 22 paths
    3) Fibonacci curve — logarithmic spiral using 144 samples
    4) Double-helix lattice — two phase-shifted strands with 33 rungs

  All functions are pure (no shared state) and execute once to honor the
  no-motion requirement.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, {
    path: palette.layers[1],
    node: palette.layers[2]
  }, NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, {
    strandA: palette.layers[4],
    strandB: palette.layers[5],
    rung: palette.ink
  }, NUM);

  ctx.restore();
}

/* Layer 1: Vesica field ---------------------------------------------------- */
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: calm lattice of overlapping circles.
     ND-safe: thin strokes and wide spacing prevent overstimulation. */
  const r = Math.min(w, h) / NUM.THREE;      // triadic radius anchor
  const step = r / NUM.SEVEN;                // septenary spacing factor

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.75;

  for (let y = r; y <= h - r / 2; y += step * NUM.NINE) {
    for (let x = r; x <= w - r / 2; x += step * NUM.NINE) {
      ctx.beginPath();
      ctx.arc(x - step, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + step, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.restore();
}

/* Layer 2: Tree-of-Life scaffold ------------------------------------------- */
function drawTree(ctx, w, h, colors, NUM) {
  /* Tree-of-Life: 10 nodes linked by 22 connective paths.
     ND-safe: static placement, gentle strokes, high legibility. */
  const baseNodes = [
    [0.5, 0.05],  // Keter
    [0.7, 0.18],  // Chokmah
    [0.3, 0.18],  // Binah
    [0.75, 0.36], // Chesed
    [0.25, 0.36], // Geburah
    [0.5, 0.52],  // Tiphareth
    [0.7, 0.66],  // Netzach
    [0.3, 0.66],  // Hod
    [0.5, 0.8],   // Yesod
    [0.5, 0.93]   // Malkuth
  ];
  const nodes = baseNodes.map(([x, y]) => [x * w, y * h]);

  const edges = [
    [0, 1], [0, 2],
    [1, 2], [1, 3], [1, 5], [1, 6],
    [2, 4], [2, 5], [2, 7],
    [3, 4], [3, 5], [3, 6],
    [4, 5], [4, 7],
    [5, 6], [5, 7], [5, 8],
    [6, 7], [6, 8], [6, 9],
    [7, 8],
    [8, 9]
  ];

  ctx.save();
  ctx.strokeStyle = colors.path;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.9;

  edges.forEach(([a, b]) => {
    const [ax, ay] = nodes[a];
    const [bx, by] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  });

  ctx.fillStyle = colors.node;
  const nodeRadius = Math.min(w, h) / (NUM.NINETYNINE / 2);
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/* Layer 3: Fibonacci curve -------------------------------------------------- */
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci logarithmic spiral: 144 samples expressing gentle growth.
     ND-safe: single static stroke maintains calm focus. */
  const total = NUM.ONEFORTYFOUR;
  const center = [w * 0.33, h * 0.72];
  const baseRadius = Math.min(w, h) / NUM.TWENTYTWO;
  const growth = Math.log(NUM.NINETYNINE) / total; // smooth exponential scaling
  const angleStep = Math.PI / NUM.ELEVEN;

  const points = [];
  for (let i = 0; i < total; i += 1) {
    const theta = i * angleStep;
    const radius = baseRadius * Math.exp(growth * i);
    const x = center[0] + Math.cos(theta) * radius;
    const y = center[1] - Math.sin(theta) * radius;
    points.push([x, y]);
  }

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.85;
  drawPolyline(ctx, points);
  ctx.restore();
}

/* Layer 4: Double-helix lattice -------------------------------------------- */
function drawHelix(ctx, w, h, colors, NUM) {
  /* Double helix: two offset strands linked by 33 cross rungs.
     ND-safe: static geometry, balanced spacing via numerology constants. */
  const strandA = buildStrand(w, h, NUM, 0);
  const strandB = buildStrand(w, h, NUM, Math.PI);

  ctx.save();
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.9;

  ctx.strokeStyle = colors.strandA;
  drawPolyline(ctx, strandA);
  ctx.strokeStyle = colors.strandB;
  drawPolyline(ctx, strandB);

  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  const rungTotal = NUM.THIRTYTHREE;
  const step = (strandA.length - 1) / (rungTotal - 1);
  for (let i = 0; i < rungTotal; i += 1) {
    const idx = Math.round(i * step);
    const safeIdx = Math.min(idx, strandA.length - 1, strandB.length - 1);
    const [ax, ay] = strandA[safeIdx];
    const [bx, by] = strandB[safeIdx];
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  }

  ctx.restore();
}

function buildStrand(w, h, NUM, phaseShift) {
  const samples = NUM.NINETYNINE;
  const top = h * 0.12;
  const span = h * 0.76;
  const mid = w * 0.5;
  const amplitude = w / NUM.TWENTYTWO;
  const frequency = (Math.PI * 2 * NUM.THIRTYTHREE) / NUM.ELEVEN;

  const points = [];
  for (let i = 0; i < samples; i += 1) {
    const t = i / (samples - 1);
    const y = top + t * span;
    const angle = t * frequency + phaseShift;
    const offset = Math.sin(angle) * amplitude;
    points.push([mid + offset, y]);
  }
  return points;
}

/* Shared helper ------------------------------------------------------------- */
function drawPolyline(ctx, points) {
  if (!Array.isArray(points) || points.length < 2) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) {
    const [x, y] = points[i];
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}
