/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers (drawn in depth order):
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 nodes, 22 paths)
    3) Fibonacci curve (logarithmic spiral with 144 samples)
    4) Double-helix lattice (two strands, 33 rungs)

  All functions below are pure and execute once to avoid motion triggers.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();

  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // ND-safe layering: draw gentle background first, then structural guides, then focal glyphs.
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

/* Layer 1: Vesica field --------------------------------------------------- */
function drawVesica(ctx, width, height, color, NUM) {
  /* Vesica field: calm outline grid built from overlapping circles.
     ND-safe: thin lines and wide spacing keep the field gentle. */
  const radius = Math.min(width, height) / NUM.THREE;
  const spacing = radius / NUM.SEVEN;
  const step = spacing * NUM.NINE;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.35;

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
    [0, 1], [0, 2], [1, 2],
    [1, 3], [1, 5], [1, 4],
    [2, 4], [2, 5], [2, 3],
    [3, 4], [3, 5], [4, 5],
    [3, 6], [4, 7],
    [5, 6], [5, 7], [5, 8],
    [6, 7], [6, 8], [7, 8],
    [6, 9], [7, 9]
  ];

  ctx.save();
  ctx.strokeStyle = colors.path;
  ctx.lineWidth = 1;

  paths.forEach(([a, b]) => {
    const nodeA = nodes[a];
    const nodeB = nodes[b];
    ctx.beginPath();
    ctx.moveTo(nodeA.x, nodeA.y);
    ctx.lineTo(nodeB.x, nodeB.y);
    ctx.stroke();
  });

  ctx.fillStyle = colors.node;
  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/* Layer 3: Fibonacci curve ------------------------------------------------- */
function drawFibonacci(ctx, width, height, color, NUM) {
  /* Fibonacci spiral: static polyline for gentle motionless flow. */
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
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.8;
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

  ctx.strokeStyle = colors.strandA;
  drawPolyline(ctx, strandA);

  ctx.strokeStyle = colors.strandB;
  drawPolyline(ctx, strandB);

  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
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
