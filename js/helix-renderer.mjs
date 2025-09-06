/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field
    2) Tree-of-Life scaffold
    3) Fibonacci curve
    4) Double-helix lattice

  No motion, no external dependencies. ASCII only.
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

/* Each helper draws one layer; ND-safe: static, calm contrast. */

// Layer 1 ---------------------------------------------------------------
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: overlapping circles forming a gentle grid. */
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const r = Math.min(w, h) / NUM.THREE;
  const step = r / NUM.SEVEN;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
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

// Layer 2 ---------------------------------------------------------------
function drawTree(ctx, w, h, pathColor, nodeColor, NUM) {
  /* Tree-of-Life: 10 nodes and 22 connective paths. */
  ctx.save();
  const nodes = [
    [0.5, 0.05], [0.2, 0.2], [0.8, 0.2],
    [0.2, 0.4], [0.8, 0.4], [0.5, 0.5],
    [0.2, 0.7], [0.8, 0.7], [0.5, 0.85],
    [0.5, 0.95]
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],
    [3,6],[4,7],[5,6],[5,7],[6,8],[7,8],[8,9],
    [1,4],[2,3],[1,5],[2,6],[3,8],[4,8],[5,9],[6,9]
  ]; // 22 paths guided by NUM.TWENTYTWO
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.slice(0, NUM.TWENTYTWO).forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0]*w, nodes[a][1]*h);
    ctx.lineTo(nodes[b][0]*w, nodes[b][1]*h);
    ctx.stroke();
  });
  ctx.fillStyle = nodeColor;
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x*w, y*h, NUM.THREE, 0, Math.PI*2);
    ctx.fill();
  });
  ctx.restore();
}

// Layer 3 ---------------------------------------------------------------
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci logarithmic spiral approximated by polyline. */
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const center = { x: w/NUM.THREE, y: h/NUM.THREE };
  const phi = (1 + Math.sqrt(5)) / 2;
  const segs = NUM.ONEFORTYFOUR;
  const turns = NUM.THREE;
  ctx.beginPath();
  for (let i = 0; i <= segs; i++) {
    const t = (turns * 2 * Math.PI) * (i / segs);
    const r = Math.pow(phi, t / (2 * Math.PI));
    const scale = Math.min(w,h) / NUM.SEVEN;
    const x = center.x + scale * r * Math.cos(t);
    const y = center.y + scale * r * Math.sin(t);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

// Layer 4 ---------------------------------------------------------------
function drawHelix(ctx, w, h, strandColor, rungColor, NUM) {
  /* Double-helix lattice: two static strands with cross rungs. */
  ctx.save();
  const amp = h / NUM.NINE;
  const steps = NUM.NINETYNINE;
  const turns = NUM.ELEVEN;

  ctx.strokeStyle = strandColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h/2 + Math.sin((i/steps) * Math.PI * turns) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h/2 + Math.sin((i/steps) * Math.PI * turns + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.strokeStyle = rungColor;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = w * t;
    const y1 = h/2 + Math.sin(t * Math.PI * turns) * amp;
    const y2 = h/2 + Math.sin(t * Math.PI * turns + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
  ctx.restore();
}
