/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers (drawn in depth order):
    1) Vesica field (intersecting circles with luminous grid)
    2) Tree-of-Life scaffold (10 nodes, 22 paths)
    3) Fibonacci curve (logarithmic spiral with 144 samples)
    4) Double-helix lattice (two strands, 33 cross rungs)

  All functions below are pure and execute once to preserve stillness.
*/

export function renderHelix(ctx, { width, height, palette, NUM, notice }) {
  ctx.save();

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
