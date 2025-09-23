/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers rendered in depth order:
    1) Vesica field - intersecting circles forming a calm grid
    2) Tree-of-Life scaffold - 10 sephirot nodes with 22 connective paths
    3) Fibonacci curve - logarithmic spiral sampled at 144 points
    4) Double-helix lattice - two phase-shifted strands with 33 cross rungs

  Each helper is a small pure function invoked once; no motion, no dependencies.
  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 sephirot + 22 paths)
    3) Fibonacci curve (log spiral polyline)
    4) Double-helix lattice (two phase-shifted strands)

  All functions are pure and run once; no motion, no dependencies.
  Layers drawn in order:
    1) Vesica field — intersecting circles forming a calm grid
    2) Tree-of-Life scaffold — 10 sephirot nodes + 22 paths
    3) Fibonacci curve — logarithmic spiral using 144 sampled points
    4) Double-helix lattice — two phase-shifted strands with 33 cross rungs

  All functions are pure and run once; no motion, no dependencies.
  Functions are pure and run once; no motion, no dependencies.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  if (!ctx) {
    return;
  }

  const layers = ensureLayers(palette.layers, palette.ink);

  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Layer order preserves visual depth without animation.
  drawVesica(ctx, width, height, layers[0], NUM);
  drawTree(ctx, width, height, layers[1], layers[2], NUM);
  drawFibonacci(ctx, width, height, layers[3], NUM);
  drawHelix(ctx, width, height, { a: layers[4], b: layers[5], rung: palette.ink }, NUM);
  // Layer order preserves depth without motion
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, {
    a: palette.layers[4],
    b: palette.layers[5],
    rung: palette.ink
  }, NUM);
  drawHelix(ctx, width, height, { a: palette.layers[4], b: palette.layers[5], rung: palette.ink }, NUM);

  ctx.restore();
}

function ensureLayers(layerList = [], fallback) {
  const required = 6;
  const resolved = [];
  for (let i = 0; i < required; i++) {
    resolved[i] = layerList[i] || fallback;
  }
  return resolved;
}

/* Layer 1: Vesica field ---------------------------------------------------- */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin strokes, gentle overlap grid referencing triadic and septenary steps.
  const radius = Math.min(w, h) / NUM.THREE;
  const offset = radius / NUM.SEVEN;
  const stride = offset * NUM.NINE;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.45;

  for (let y = radius; y <= h + radius; y += stride) {
    for (let x = radius; x <= w + radius; x += stride) {
      drawCircle(ctx, x - offset, y, radius);
      drawCircle(ctx, x + offset, y, radius);
    }
  }

  ctx.restore();
}

function drawCircle(ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
}

/* Layer 2: Tree-of-Life scaffold ------------------------------------------- */
function drawTree(ctx, w, h, edgeColor, nodeColor, NUM) {
  /* Tree-of-Life: static 10 node scaffold with 22 connective paths.
     ND-safe: soft strokes, filled nodes for focus anchors. */
  const nodes = [
    [0.5, 0.08],
    [0.35, 0.2],
    [0.65, 0.2],
    [0.25, 0.38],
    [0.75, 0.38],
    [0.5, 0.46],
    [0.32, 0.64],
    [0.68, 0.64],
    [0.5, 0.72],
    [0.5, 0.9]
  ].map(([nx, ny]) => [nx * w, ny * h]);

  const edges = [
    [0, 1], [0, 2], [1, 2],
    [1, 3], [1, 5], [2, 4], [2, 5],
    [3, 4], [3, 5], [4, 5],
    [3, 6], [5, 6], [4, 7], [5, 7], [6, 7],
    [6, 8], [7, 8], [8, 9],
    [3, 8], [4, 8], [1, 4], [2, 3]
  ]; // 22 paths honoring tarot majors.

  ctx.save();
  ctx.strokeStyle = edgeColor;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.6;
  edges.forEach(([a, b]) => {
    const [x1, y1] = nodes[a];
    const [x2, y2] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  ctx.globalAlpha = 0.85;
  const radius = Math.min(w, h) / (NUM.TWENTYTWO * 2);
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/* Layer 3: Fibonacci curve -------------------------------------------------- */
function drawFibonacci(ctx, w, h, color, NUM) {
  // ND-safe: static spiral with consistent stroke weight and no motion.
  const cx = w / 2;
  const cy = h / 2;
  const base = Math.min(w, h) / NUM.NINETYNINE;
  const phi = (1 + Math.sqrt(5)) / 2;
/* Layer 1: Vesica field — calm grid of intersecting circles */
/* Layer 1: Vesica field ---------------------------------------------------- */
/* Layer 1: Vesica field -- calm grid of intersecting circles */
function drawVesica(ctx, w, h, color, NUM) {
  const r = Math.min(w, h) / NUM.THREE; // triadic radius
  const step = r / NUM.SEVEN;           // septenary spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
      ctx.beginPath();
      ctx.arc(x - step, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + step, y, r, 0, Math.PI * 2);
      ctx.stroke();
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: calm outline grid built from overlapping circles.
     ND-safe: thin lines, generous spacing. */
  const r = Math.min(w, h) / NUM.THREE;      // base radius from sacred triad
  const step = r / NUM.SEVEN;                // spacing guided by 7
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

/* Layer 2: Tree-of-Life scaffold — nodes and connective paths */
function drawTree(ctx, w, h, pathColor, nodeColor, NUM) {
  const nodes = [
    [0.5, 0.1], [0.65, 0.2], [0.35, 0.2],
    [0.7, 0.4], [0.3, 0.4], [0.5, 0.5],
    [0.75, 0.7], [0.25, 0.7], [0.5, 0.8],
  ctx.restore();
}

/* Layer 2: Tree-of-Life scaffold ------------------------------------------- */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  /* Tree-of-Life: 10 sephirot nodes linked by 22 paths.
     ND-safe: static layout, thin lines. */

  const nodes = [
    [0.5, 0.05], [0.75, 0.18], [0.25, 0.18],
    [0.25, 0.38], [0.75, 0.38], [0.5, 0.52],
    [0.25, 0.66], [0.75, 0.66], [0.5, 0.8], [0.5, 0.93]
  ].map(([x, y]) => [x * w, y * h]);

  const paths = [
    [0,1],[0,2],[0,5],
    [1,2],[1,5],[1,4],
    [2,3],[2,5],[2,4],
    [3,5],[3,6],
    [4,5],[4,7],
    [5,6],[5,7],[5,8],
    [6,7],[6,8],[6,9],
    [7,8],[7,9],
    [8,9]
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

/* Layer 2: Tree-of-Life scaffold ------------------------------------------ */
function drawTree(ctx, w, h, pathColor, nodeColor, NUM) {
  /* Tree-of-Life: 10 nodes with 22 connective paths.
     ND-safe: static layout, readable contrast. */
  const nodes = [
    [0.5, 0.05], [0.75, 0.15], [0.25, 0.15],
    [0.75, 0.35], [0.25, 0.35], [0.5, 0.45],
    [0.75, 0.65], [0.25, 0.65], [0.5, 0.75], [0.5, 0.90]
  ];
  const edges = [
    [0,1],[0,2],
    [1,3],[1,4],[1,5],
    [2,3],[2,4],[2,5],
    [3,5],[3,6],[3,7],
    [4,5],[4,6],[4,7],
    [5,6],[5,7],[5,8],
    [6,8],[6,9],
    [7,8],[7,9],
    [8,9]
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

/* Layer 2: Tree-of-Life scaffold -- nodes and paths */
function drawTree(ctx, w, h, pathColor, nodeColor, NUM) {
  const pts = [
    [0.5, 0.1],
    [0.25, 0.2],
    [0.75, 0.2],
    [0.25, 0.4],
    [0.75, 0.4],
    [0.5, 0.5],
    [0.25, 0.7],
    [0.75, 0.7],
    [0.5, 0.8],
    [0.5, 0.9]
  ].map(([x, y]) => [x * w, y * h]);

  const edges = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,4],[3,5],[4,5],
    [3,6],[4,7],[6,7],[6,8],[7,8],[8,9],[5,6],[5,7],
    [5,8],[2,5],[1,5],[2,3],[1,4],[0,5]
    [0,1],[0,2],[1,2],[1,3],[1,5],[2,4],[2,5],[3,4],[3,5],[3,6],
    [4,5],[4,7],[5,6],[5,7],[5,8],[6,8],[6,9],[7,8],[7,9],[8,9],
    [1,7],[2,8]
  ctx.restore();
}

/* Layer 2: Tree-of-Life scaffold ------------------------------------------- */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  /* Tree-of-Life: 10 sephirot nodes linked by 22 paths.
     ND-safe: static layout, thin lines. */

  const nodes = [
    [0.5, 0.05], [0.75, 0.18], [0.25, 0.18],
    [0.25, 0.38], [0.75, 0.38], [0.5, 0.52],
    [0.25, 0.66], [0.75, 0.66], [0.5, 0.8], [0.5, 0.93]
  ].map(([x, y]) => [x * w, y * h]);

  const paths = [
    [0,1],[0,2],[0,5],
    [1,2],[1,5],[1,4],
    [2,3],[2,5],[2,4],
    [3,5],[3,6],
    [4,5],[4,7],
    [5,6],[5,7],[5,8],
    [6,7],[6,8],[6,9],
    [7,8],[7,9],
    [8,9]
  ];

  ctx.save();
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.forEach(([a, b]) => {
    const [x1, y1] = nodes[a];
    const [x2, y2] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

  edges.forEach(([a,b]) => {
    const ax = nodes[a][0] * w, ay = nodes[a][1] * h;
    const bx = nodes[b][0] * w, by = nodes[b][1] * h;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  const r = Math.min(w, h) / NUM.TWENTYTWO;
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/* Layer 3: Fibonacci curve ------------------------------------------------- */
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci spiral: static logarithmic curve.
     ND-safe: single stroke, no motion. */
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x * w, y * h, r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/* Layer 3: Fibonacci curve ------------------------------------------------- */
  ctx.lineWidth = 1.5;
  edges.forEach(([a, b]) => {
    ctx.beginPath();
  ctx.lineWidth = 1.5;
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(pts[a][0], pts[a][1]);
    ctx.lineTo(pts[b][0], pts[b][1]);
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
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);

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
  nodes.forEach(([x, y]) => {
  pts.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/* Layer 3: Fibonacci curve -- static logarithmic spiral */
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Logarithmic spiral with fixed samples.
     ND-safe: static polyline, no motion. */

  ctx.restore();
}

/* Layer 3: Fibonacci curve ------------------------------------------------- */
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci spiral: static logarithmic curve.
     ND-safe: single stroke, no motion. */
  const phi = (1 + Math.sqrt(5)) / 2;
  const samples = NUM.ONEFORTYFOUR;               // 144 points
  const scale = Math.min(w, h) / NUM.THIRTYTHREE; // gentle size
  const cx = w / 2;
  const cy = h / 2;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.75;
  ctx.beginPath();

  for (let i = 0; i <= NUM.ONEFORTYFOUR; i++) {
    const angle = (i / NUM.ELEVEN) * Math.PI;
    const radius = base * Math.pow(phi, i / NUM.TWENTYTWO);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice -------------------------------------------- */
function drawHelix(ctx, w, h, colors, NUM) {
  /* Double helix: two static strands with 33 rungs.
     ND-safe: no motion; amplitude trimmed for calm breathing space. */
  const cycles = NUM.NINE; // nine rhythm waves across width
  const freq = (Math.PI * 2 * cycles) / w;
  const amplitude = h / NUM.THREE;
  const offsetY = h / 2;
  const phase = Math.PI / NUM.ELEVEN;
  const strandCount = NUM.ONEFORTYFOUR;
  const stepX = w / strandCount;
/* Layer 4: Double-helix lattice — two static strands with rungs */
/* Layer 4: Double-helix lattice ------------------------------------------- */
function drawHelix(ctx, w, h, colors, NUM) {
  /* Double-helix lattice: two static strands with cross rungs.
     ND-safe: even spacing, no motion. */
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;
/* Layer 4: Double-helix lattice -- two static strands with rungs */
function drawHelix(ctx, w, h, colors, NUM) {
  const amp = h / NUM.NINE;       // gentle amplitude
  const waves = NUM.ELEVEN;       // helix turns
  const steps = NUM.NINETYNINE;   // sampling
/* Layer 4: Double-helix lattice — two static strands with rungs */
function drawHelix(ctx, w, h, colors, NUM) {
  // ND-safe: even spacing, no motion
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;

  ctx.save();
  ctx.lineWidth = 2;

  // Strand A
  ctx.strokeStyle = colors.a;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  for (let i = 0; i <= strandCount; i++) {
    const x = i * stepX;
    const y = helixY(x, freq, amplitude, offsetY, 0, 1);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Strand B with slight amplitude trim for layered depth
  ctx.strokeStyle = colors.b;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  for (let i = 0; i <= strandCount; i++) {
    const x = i * stepX;
    const y = helixY(x, freq, amplitude, offsetY, phase, 0.85);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Cross rungs unify strands at 33 points.
  // cross rungs
  ctx.strokeStyle = colors.rung;
  ctx.globalAlpha = 0.35;
  const rungCount = NUM.THIRTYTHREE;
  for (let i = 0; i <= rungCount; i++) {
    const x = (i / rungCount) * w;
    const y1 = helixY(x, freq, amplitude, offsetY, 0, 1);
    const y2 = helixY(x, freq, amplitude, offsetY, phase, 0.85);
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }

  ctx.restore();
}

function helixY(x, freq, amplitude, offsetY, phase, scale) {
  return offsetY + Math.sin(freq * x + phase) * amplitude * scale;
}
