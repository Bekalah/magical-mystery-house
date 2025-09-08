/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 nodes, 22 paths)
    3) Fibonacci curve (log spiral polyline)
    4) Double-helix lattice (two phase-shifted strands)

  All routines are pure, draw once, and avoid motion or external dependencies.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Layer order preserves readable depth
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, palette.layers[4], palette.layers[5], NUM);

  ctx.restore();
}

// Layer 1 ---------------------------------------------------------------
function drawVesica(ctx, w, h, color, NUM) {
  // Vesica field: calm intersecting circles
  ctx.save();
  const r = Math.min(w, h) / NUM.THREE;       // base radius via sacred triad
  const step = r / NUM.SEVEN;                 // spacing guided by 7
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

// Layer 2 ---------------------------------------------------------------
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  // Tree-of-Life: 10 sephirot nodes and 22 connecting paths
  ctx.save();
  const nodes = [
    [0.5, 0.05], [0.2, 0.2], [0.8, 0.2],
    [0.2, 0.4], [0.8, 0.4], [0.5, 0.5],
    [0.2, 0.7], [0.8, 0.7], [0.5, 0.85], [0.5, 0.95]
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],
    [3,6],[4,7],[5,6],[5,7],
    [6,8],[7,8],[8,9],[1,4],[2,3],[1,5],[2,6],[3,8],[4,8],[5,9],[6,9]
  ];

  // paths
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.slice(0, NUM.TWENTYTWO).forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0] * w, nodes[a][1] * h);
    ctx.lineTo(nodes[b][0] * w, nodes[b][1] * h);
    ctx.stroke();
  });

  // nodes
  ctx.fillStyle = nodeColor;
  const r = Math.min(w, h) / NUM.THIRTYTHREE;
  nodes.forEach(([nx, ny]) => {
    ctx.beginPath();
    ctx.arc(nx * w, ny * h, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

// Layer 3 ---------------------------------------------------------------
function drawFibonacci(ctx, w, h, color, NUM) {
  // Fibonacci logarithmic spiral sampled at 144 points
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const cx = w * 0.75;
  const cy = h * 0.5;
  const scale = Math.min(w, h) / NUM.THIRTYTHREE;
  const pts = NUM.ONEFORTYFOUR;

  ctx.beginPath();
  for (let i = 0; i <= pts; i++) {
    const theta = (i / pts) * Math.PI * 4;           // four turns
    const r = scale * Math.exp(theta / NUM.ELEVEN);  // growth rate uses 11
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

// Layer 4 ---------------------------------------------------------------
function drawHelix(ctx, w, h, strandColor, rungColor, NUM) {
  // Double-helix lattice: two phase-shifted sine strands with cross rungs
  ctx.save();
  const amp = h / NUM.NINE;
  const steps = NUM.NINETYNINE;
  const turns = NUM.ELEVEN;

  // strands
  ctx.lineWidth = 2;
  ctx.strokeStyle = strandColor;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h / 2 + Math.sin((i / steps) * Math.PI * turns) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h / 2 + Math.sin((i / steps) * Math.PI * turns + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // rungs
  ctx.strokeStyle = rungColor;
  ctx.lineWidth = 1;
  const rungs = NUM.THIRTYTHREE;
  for (let i = 0; i <= rungs; i++) {
    const x = (w / rungs) * i;
    const phase = (i / rungs) * Math.PI * turns;
    const y1 = h / 2 + Math.sin(phase) * amp;
    const y2 = h / 2 + Math.sin(phase + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
  ctx.restore();
}
