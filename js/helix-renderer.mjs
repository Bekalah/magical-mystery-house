/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field
    2) Tree-of-Life scaffold
    3) Fibonacci curve
    4) Double-helix lattice

  Each layer draws once; no motion, no external deps.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, palette.layers[4], palette.layers[5], NUM);

  ctx.restore();
}

// Layer 1 ---------------------------------------------------------------
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: overlapping circles form a calm grid.
     ND-safe: thin strokes, low density. */
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const r = Math.min(w, h) / NUM.THREE; // base radius
  const step = r / NUM.NINE;            // grid spacing
  for (let y = r; y < h; y += step * NUM.SEVEN) {
    for (let x = r; x < w; x += step * NUM.SEVEN) {
      ctx.beginPath();
      ctx.arc(x - step / 2, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + step / 2, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

// Layer 2 ---------------------------------------------------------------
function drawTree(ctx, w, h, pathColor, nodeColor, NUM) {
  /* Tree-of-Life: 10 sephirot nodes and 22 connective paths.
     ND-safe: solid nodes, gentle lines. */
  ctx.save();
  const nodes = [
    [0.5, 0.05], [0.75, 0.15], [0.25, 0.15],
    [0.75, 0.35], [0.25, 0.35], [0.5, 0.5],
    [0.75, 0.65], [0.25, 0.65], [0.5, 0.8], [0.5, 0.95]
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,4],[3,5],[4,5],[3,6],[4,7],
    [5,6],[5,7],[6,8],[7,8],[8,9],[1,4],[2,3],[1,5],[2,5],[6,9],[7,9],[5,8]
  ]; // 22 paths guided by NUM.TWENTYTWO
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0]*w, nodes[a][1]*h);
    ctx.lineTo(nodes[b][0]*w, nodes[b][1]*h);
    ctx.stroke();
  });
  ctx.fillStyle = nodeColor;
  const r = NUM.ELEVEN / 2; // node radius derived from 11
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x*w, y*h, r, 0, Math.PI*2);
    ctx.fill();
  });
  ctx.restore();
}

// Layer 3 ---------------------------------------------------------------
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci logarithmic spiral approximated by polyline.
     ND-safe: static, soft stroke. */
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const cx = w / 2;
  const cy = h / 2;
  const phi = (1 + Math.sqrt(5)) / 2;
  const turns = NUM.THREE;               // three rotations
  const segs = NUM.ONEFORTYFOUR;         // sampled points
  const scale = Math.min(w, h) / NUM.NINE;
  ctx.beginPath();
  for (let i = 0; i <= segs; i++) {
    const t = (turns * 2 * Math.PI) * (i / segs);
    const r = Math.pow(phi, t / (2 * Math.PI));
    const x = cx + scale * r * Math.cos(t);
    const y = cy + scale * r * Math.sin(t);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

// Layer 4 ---------------------------------------------------------------
function drawHelix(ctx, w, h, strandColor, rungColor, NUM) {
  /* Double-helix lattice: two sine strands with 33 cross rungs.
     ND-safe: static strands, readable contrast. */
  ctx.save();
  const amp = h / NUM.SEVEN;
  const step = w / NUM.ONEFORTYFOUR;
  const turns = NUM.NINE; // helix waves
  ctx.strokeStyle = strandColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= w; x += step) {
    const y = h/2 + amp * Math.sin((x/w) * Math.PI * turns);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.beginPath();
  for (let x = 0; x <= w; x += step) {
    const y = h/2 + amp * Math.sin((x/w) * Math.PI * turns + Math.PI);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.strokeStyle = rungColor;
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const x = (w / NUM.THIRTYTHREE) * i;
    const phase = (x / w) * Math.PI * turns;
    const y1 = h/2 + amp * Math.sin(phase);
    const y2 = h/2 + amp * Math.sin(phase + Math.PI);
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
  ctx.restore();
}

