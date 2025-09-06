/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 sephirot + 22 paths; simplified layout)
    3) Fibonacci curve (log spiral polyline; static)
    4) Double-helix lattice (two phase-shifted sine waves with cross links)
*/

// Small helper: draw a line between two points
function line(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Layer 1: Vesica field using a 3x3 grid of overlapping circles
function drawVesicaField(ctx, w, h, color, NUM) {
  ctx.save();
  ctx.strokeStyle = color;
  const r = Math.min(w, h) / NUM.THREE;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      ctx.beginPath();
      ctx.arc(w / 2 + (i * r) / 2, h / 2 + (j * r) / 2, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

// Layer 2: Tree-of-Life nodes and paths
function drawTreeOfLife(ctx, w, h, nodeColor, pathColor, NUM) {
  ctx.save();
  const nodes = [
    { x: 0.5, y: 0.05 },
    { x: 0.35, y: 0.18 },
    { x: 0.65, y: 0.18 },
    { x: 0.2, y: 0.35 },
    { x: 0.5, y: 0.35 },
    { x: 0.8, y: 0.35 },
    { x: 0.35, y: 0.52 },
    { x: 0.65, y: 0.52 },
    { x: 0.5, y: 0.68 },
    { x: 0.5, y: 0.88 }
  ];
  const edges = [
    [0,1],[0,2],
    [1,2],[1,3],[1,4],[2,4],[2,5],
    [3,4],[4,5],[3,6],[4,6],[4,7],[5,7],
    [6,7],[6,8],[7,8],[8,9],
    [3,8],[5,8]
  ];
  ctx.strokeStyle = pathColor;
  edges.forEach(e => {
    const a = nodes[e[0]];
    const b = nodes[e[1]];
    line(ctx, a.x * w, a.y * h, b.x * w, b.y * h);
  });
  ctx.fillStyle = nodeColor;
  const r = Math.min(w, h) / NUM.THIRTYTHREE;
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x * w, n.y * h, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

// Layer 3: Fibonacci log spiral as polyline
function drawFibonacciCurve(ctx, w, h, color, NUM) {
  ctx.save();
  ctx.strokeStyle = color;
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.NINETYNINE;
  const scale = Math.min(w, h) / NUM.ELEVEN;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * NUM.ELEVEN * Math.PI;
    const r = scale * Math.pow(phi, angle / (2 * Math.PI));
    const x = w / 2 + r * Math.cos(angle);
    const y = h / 2 + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

// Layer 4: static double-helix lattice
function drawHelixLattice(ctx, w, h, colorA, colorB, NUM) {
  ctx.save();
  const amp = h / NUM.THREE;
  const freq = NUM.ELEVEN;
  ctx.strokeStyle = colorA;
  ctx.beginPath();
  for (let x = 0; x <= w; x++) {
    const y = h / 2 + amp * Math.sin((freq * x * 2 * Math.PI) / w);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.beginPath();
  for (let x = 0; x <= w; x++) {
    const y = h / 2 + amp * Math.sin((freq * x * 2 * Math.PI) / w + Math.PI);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.strokeStyle = colorB;
  const step = w / NUM.TWENTYTWO;
  for (let x = 0; x <= w; x += step) {
    const y1 = h / 2 + amp * Math.sin((freq * x * 2 * Math.PI) / w);
    const y2 = h / 2 + amp * Math.sin((freq * x * 2 * Math.PI) / w + Math.PI);
    line(ctx, x, y1, x, y2);
  }
  ctx.restore();
}

// Main export: render all layers in order
export function renderHelix(ctx, opts) {
  const { width: w, height: h, palette, NUM } = opts;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, w, h);
  drawVesicaField(ctx, w, h, palette.layers[0], NUM);
  drawTreeOfLife(ctx, w, h, palette.layers[1], palette.layers[2], NUM);
  drawFibonacciCurve(ctx, w, h, palette.layers[3], NUM);
  drawHelixLattice(ctx, w, h, palette.layers[4], palette.layers[5], NUM);
}
