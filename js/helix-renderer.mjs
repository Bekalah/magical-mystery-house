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

  Layers (drawn in depth order):
    1) Vesica field (intersecting circles with luminous grid)
    2) Tree-of-Life scaffold (10 nodes, 22 paths)
    3) Fibonacci curve (logarithmic spiral with 144 samples)
    4) Double-helix lattice (two strands, 33 cross rungs)

  All functions below are pure and execute once to preserve stillness.
*/

export function renderHelix(ctx, { width, height, palette, NUM, notice }) {
  ctx.save();

  // Layer order preserves visual depth without animation.
  drawVesica(ctx, width, height, layers[0], NUM);
  drawTree(ctx, width, height, layers[1], layers[2], NUM);
  drawFibonacci(ctx, width, height, layers[3], NUM);
  drawHelix(ctx, width, height, { a: layers[4], b: layers[5], rung: palette.ink }, NUM);
  // Layer order preserves depth without motion
  fillBackground(ctx, width, height, palette, NUM);
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(
    ctx,
    width,
    height,
    {
      path: palette.layers[1],
      node: palette.layers[2],
      halo: palette.layers[5]
    },
    NUM
  );
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(
    ctx,
    width,
    height,
    {
      strandA: palette.layers[4],
      strandB: palette.layers[5],
      rung: palette.ink
    },
    NUM
  );

  if (typeof notice === "string" && notice.trim().length > 0) {
    drawNotice(ctx, width, height, palette.ink, notice.trim());
  }

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
/* Layer 0: Gradient background -------------------------------------------- */
function fillBackground(ctx, width, height, palette, NUM) {
  /* ND-safe: slow gradients echo the provided art without motion. */
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const outerRadius = Math.max(width, height);
  const focusRadius = outerRadius / NUM.NINE;
  const celestial = ctx.createRadialGradient(
    width / 2,
    height * 0.18,
    focusRadius,
    width / 2,
    height / 2,
    outerRadius
  );
  celestial.addColorStop(0, withAlpha(palette.layers[0], 0.35));
  celestial.addColorStop(0.4, withAlpha(palette.layers[5], 0.12));
  celestial.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = celestial;
  ctx.fillRect(0, 0, width, height);

  const grounding = ctx.createLinearGradient(0, 0, 0, height);
  grounding.addColorStop(0, withAlpha(palette.layers[1], 0.08));
  grounding.addColorStop(1, withAlpha(palette.bg, 0));

  ctx.fillStyle = grounding;
  ctx.fillRect(0, 0, width, height);
}

/* Layer 1: Vesica field --------------------------------------------------- */
function drawVesica(ctx, width, height, color, NUM) {
  /* Vesica field: luminous outline grid built from overlapping circles. */
  const radius = Math.min(width, height) / NUM.THREE;
  const spacing = radius / NUM.SEVEN;
  const step = spacing * NUM.NINE;

  ctx.save();
  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalCompositeOperation = "lighter";

  for (let y = radius; y < height + radius; y += step) {
    for (let x = radius; x < width + radius; x += step) {
      ctx.beginPath();
      ctx.arc(x - spacing, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x + spacing, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.restore();
}

/* Layer 2: Tree-of-Life scaffold ------------------------------------------ */
function drawTree(ctx, width, height, colors, NUM) {
  /* Tree-of-Life: static layout to respect sacred order without motion. */
  const nodeRadius = Math.min(width, height) / NUM.TWENTYTWO;

  const baseNodes = [
    [0.5, 0.05],
    [0.35, 0.18],
    [0.65, 0.18],
    [0.25, 0.35],
    [0.75, 0.35],
    [0.5, 0.48],
    [0.35, 0.65],
    [0.65, 0.65],
    [0.5, 0.78],
    [0.5, 0.9]
  ];

  const nodes = baseNodes.map(([nx, ny]) => ({
    x: nx * width,
    y: ny * height
  }));

  const paths = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [1, 5],
    [1, 4],
    [2, 4],
    [2, 5],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 5],
    [3, 6],
    [4, 7],
    [5, 6],
    [5, 7],
    [5, 8],
    [6, 7],
    [6, 8],
    [7, 8],
    [6, 9],
    [7, 9]
  ];

  ctx.save();
  ctx.strokeStyle = colors.path;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.85;

  paths.forEach(([a, b]) => {
    const nodeA = nodes[a];
    const nodeB = nodes[b];
    ctx.beginPath();
    ctx.moveTo(nodeA.x, nodeA.y);
    ctx.lineTo(nodeB.x, nodeB.y);
    ctx.stroke();
  });

  ctx.fillStyle = colors.node;
  ctx.shadowColor = withAlpha(colors.halo, 0.35);
  ctx.shadowBlur = nodeRadius * 2.2;

  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/* Layer 3: Fibonacci curve ------------------------------------------------- */
function drawFibonacci(ctx, width, height, color, NUM) {
  /* Fibonacci spiral: static polyline for gentle, motionless flow. */
  const count = NUM.ONEFORTYFOUR;
  const centerX = width * 0.32;
  const centerY = height * 0.68;
  const baseRadius = Math.min(width, height) / NUM.ELEVEN;
  const growth = 1 + 1 / NUM.TWENTYTWO;
  const angleStep = Math.PI / NUM.ELEVEN;

  const points = createSpiralPoints({
    count,
    centerX,
    centerY,
    radius: baseRadius,
    growth,
    angleStep
  });

  if (points.length < 2) {
    return;
  }

  ctx.save();
  const gradient = ctx.createLinearGradient(centerX, centerY - baseRadius, centerX, centerY + baseRadius * growth);
  gradient.addColorStop(0, withAlpha(color, 0));
  gradient.addColorStop(0.25, withAlpha(color, 0.65));
  gradient.addColorStop(1, withAlpha(color, 0.9));

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.9;
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  ctx.restore();
}

function createSpiralPoints({ count, centerX, centerY, radius, growth, angleStep }) {
  const pts = [];
  let currentRadius = radius;
  let angle = 0;

  for (let i = 0; i < count; i += 1) {
    pts.push({
      x: centerX + Math.cos(angle) * currentRadius,
      y: centerY + Math.sin(angle) * currentRadius
    });
    currentRadius *= growth;
    angle += angleStep;
  }

  return pts;
}

/* Layer 4: Double-helix lattice ------------------------------------------- */
function drawHelix(ctx, width, height, colors, NUM) {
  /* Double helix: two strands plus 33 cross rungs, all static. */
  const count = NUM.NINETYNINE;
  const top = height * 0.12;
  const bottom = height * 0.92;
  const centerX = width * 0.68;
  const amplitude = width / NUM.TWENTYTWO;
  const twists = NUM.THREE;

  const strandA = createHelixStrand({
    count,
    top,
    bottom,
    centerX,
    amplitude,
    phase: 0,
    twists
  });
  const strandB = createHelixStrand({
    count,
    top,
    bottom,
    centerX,
    amplitude,
    phase: Math.PI,
    twists
  });

  ctx.save();
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
  ctx.lineJoin = "round";

  const helixGlow = ctx.createLinearGradient(centerX - amplitude, top, centerX + amplitude, bottom);
  helixGlow.addColorStop(0, withAlpha(colors.strandA, 0.6));
  helixGlow.addColorStop(1, withAlpha(colors.strandB, 0.6));

  ctx.strokeStyle = helixGlow;
  ctx.shadowColor = withAlpha(colors.rung, 0.25);
  ctx.shadowBlur = amplitude * 0.35;
  drawPolyline(ctx, strandA);

  ctx.strokeStyle = helixGlow;
  drawPolyline(ctx, strandB);

  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  ctx.shadowBlur = amplitude * 0.25;
  const rungCount = NUM.THIRTYTHREE;
  for (let i = 0; i < rungCount; i += 1) {
    const t = rungCount === 1 ? 0 : i / (rungCount - 1);
    const index = Math.min(strandA.length - 1, Math.round(t * (strandA.length - 1)));
    const pointA = strandA[index];
    const pointB = strandB[index];
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.stroke();
  }

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
function createHelixStrand({ count, top, bottom, centerX, amplitude, phase, twists }) {
  const pts = [];
  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0 : i / (count - 1);
    const y = top + (bottom - top) * t;
    const angle = phase + t * Math.PI * twists;
    const offset = Math.sin(angle) * amplitude;
    pts.push({ x: centerX + offset, y });
  }
  return pts;
}

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
function drawPolyline(ctx, pts) {
  if (pts.length === 0) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i += 1) {
    ctx.lineTo(pts[i].x, pts[i].y);
  }
  ctx.stroke();
}

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
/* Layer 5: Inline notice --------------------------------------------------- */
function drawNotice(ctx, width, height, inkHex, message) {
  /* Inline fallback notice keeps the reader informed without alerts. */
  ctx.save();
  ctx.fillStyle = withAlpha(inkHex, 0.75);
  ctx.font = "14px 'Segoe UI', system-ui, sans-serif";
  ctx.textBaseline = "middle";
  ctx.shadowColor = withAlpha(inkHex, 0.18);
  ctx.shadowBlur = 6;
  const padding = 18;
  ctx.fillText(message, padding, height - padding);
  ctx.restore();
}

/* Utilities ---------------------------------------------------------------- */
function withAlpha(hex, alpha) {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return `rgba(255, 255, 255, ${alpha})`;
  }
  const { r, g, b } = rgb;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToRgb(hex) {
  if (typeof hex !== "string") {
    return null;
  }
  const normalized = hex.replace(/^#/, "");
  if (normalized.length !== 6) {
    return null;
  }
  const int = Number.parseInt(normalized, 16);
  if (Number.isNaN(int)) {
    return null;
  }
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
}

function helixY(x, freq, amplitude, offsetY, phase, scale) {
  return offsetY + Math.sin(freq * x + phase) * amplitude * scale;
}
