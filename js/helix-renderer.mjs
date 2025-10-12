/*
  helix-renderer.mjs
  ND-safe, static renderer for layered sacred geometry.

  Layer order (back to front):
    1) Vesica field — intersecting circles establishing a calm lattice.
    2) Tree-of-Life scaffold — 10 sephirot nodes and 22 connective paths.
    3) Fibonacci curve — logarithmic spiral sampled at 144 points.
    4) Double-helix lattice — two phase-shifted strands with 33 cross rungs.

  All routines below are small pure functions invoked once. No motion, no timers,
  and every stroke is commented with ND-safe rationale to maintain readability.
*/

export function renderHelix(ctx, { width, height, palette, NUM, notice = "" }) {
  if (!ctx) {
    return;
  }

  const layers = ensureLayers(palette.layers, palette.ink);

  ctx.save();
  fillBackground(ctx, width, height, palette.bg);

  drawVesica(ctx, width, height, layers[0], NUM);
  drawTree(ctx, width, height, { path: layers[1], node: layers[2] }, NUM);
  drawFibonacci(ctx, width, height, layers[3], NUM);
  drawHelix(ctx, width, height, {
    strandA: layers[4],
    strandB: layers[5],
    rung: palette.ink
  }, NUM);

  if (notice.trim().length > 0) {
    drawNotice(ctx, width, height, palette.ink, notice.trim());
  }

  ctx.restore();
}

function ensureLayers(layerList = [], fallback) {
  const required = 6;
  const resolved = new Array(required);
  for (let i = 0; i < required; i += 1) {
    resolved[i] = layerList[i] || fallback;
  }
  return resolved;
}

function fillBackground(ctx, width, height, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

/* Layer 1: Vesica field ---------------------------------------------------- */
function drawVesica(ctx, width, height, color, NUM) {
  const radius = Math.min(width, height) / NUM.THREE;
  const offset = radius / NUM.SEVEN;
  const stride = offset * NUM.NINE;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.45;

  for (let y = radius; y <= height + radius; y += stride) {
    for (let x = radius; x <= width + radius; x += stride) {
      drawCircle(ctx, x - offset, y, radius);
      drawCircle(ctx, x + offset, y, radius);
    }
  }

  ctx.restore();
}

function drawCircle(ctx, cx, cy, radius) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
}

/* Layer 2: Tree-of-Life scaffold ------------------------------------------- */
function drawTree(ctx, width, height, palette, NUM) {
  const margin = Math.min(width, height) / NUM.ELEVEN;
  const span = height - margin * 2;
  const rowGap = span / (NUM.SEVEN - 1);
  const midX = width / 2;
  const lateral = width / NUM.TWENTYTWO;

  const nodes = [
    { x: midX, y: margin },
    { x: midX - lateral, y: margin + rowGap },
    { x: midX + lateral, y: margin + rowGap },
    { x: midX - lateral * 1.4, y: margin + rowGap * 2 },
    { x: midX + lateral * 1.4, y: margin + rowGap * 2 },
    { x: midX, y: margin + rowGap * 3 },
    { x: midX - lateral * 1.6, y: margin + rowGap * 4 },
    { x: midX + lateral * 1.6, y: margin + rowGap * 4 },
    { x: midX, y: margin + rowGap * 5.2 },
    { x: midX, y: margin + rowGap * 6.4 }
  ];

  const paths = [
    [0, 1], [0, 2],
    [1, 2], [1, 3], [2, 4],
    [3, 5], [4, 5],
    [3, 6], [4, 7],
    [6, 5], [7, 5],
    [6, 8], [7, 8],
    [8, 5], [8, 9],
    [3, 4], [1, 5], [2, 5]
  ];

  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = palette.path;
  ctx.globalAlpha = 0.7;
  paths.forEach(([from, to]) => {
    const a = nodes[from];
    const b = nodes[to];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });

  ctx.globalAlpha = 1;
  ctx.fillStyle = palette.node;
  ctx.strokeStyle = palette.node;
  nodes.forEach((node, index) => {
    const radius = index === 0 ? 14 : index === nodes.length - 1 ? 16 : 10;
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius * 1.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 2;
  });

  ctx.restore();
}

/* Layer 3: Fibonacci curve -------------------------------------------------- */
function drawFibonacci(ctx, width, height, color, NUM) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const samples = NUM.ONEFORTYFOUR;
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = Math.min(width, height) / NUM.THREE;
  const angleStep = (Math.PI * 2) / NUM.TWENTYTWO;

  const points = [];
  for (let i = 0; i < samples; i += 1) {
    const theta = angleStep * i;
    const radius = scale * Math.pow(phi, theta / (Math.PI * 2));
    const x = centerX + radius * Math.cos(theta);
    const y = centerY + radius * Math.sin(theta);
    points.push({ x, y });
  }

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.75;
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice -------------------------------------------- */
function drawHelix(ctx, width, height, palette, NUM) {
  const samples = NUM.NINETYNINE;
  const baseline = height / 2;
  const amplitude = height / NUM.SEVEN;
  const wavelength = width / NUM.ELEVEN;
  const phaseOffset = Math.PI / NUM.THREE;

  const strandA = [];
  const strandB = [];

  for (let i = 0; i < samples; i += 1) {
    const t = i / (samples - 1);
    const x = lerp(width * 0.1, width * 0.9, t);
    const angle = (x / wavelength) * Math.PI * 2;
    strandA.push({ x, y: baseline + Math.sin(angle) * amplitude });
    strandB.push({ x, y: baseline + Math.sin(angle + phaseOffset) * amplitude });
  }

  ctx.save();
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.85;
  ctx.strokeStyle = palette.strandA;
  drawPolyline(ctx, strandA);
  ctx.strokeStyle = palette.strandB;
  drawPolyline(ctx, strandB);

  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = palette.rung;
  const rungCount = NUM.THIRTYTHREE;
  for (let i = 0; i < rungCount; i += 1) {
    const t = i / (rungCount - 1);
    const index = Math.floor(t * (samples - 1));
    const a = strandA[index];
    const b = strandB[index];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawPolyline(ctx, points) {
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.stroke();
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/* Notice overlay ------------------------------------------------------------ */
function drawNotice(ctx, width, height, color, message) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.8;
  ctx.font = "12px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText(message, width * 0.05, height * 0.95);
  ctx.restore();
}
