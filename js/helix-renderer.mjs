/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 nodes + 22 paths)
    3) Fibonacci curve (log spiral polyline)
    4) Double-helix lattice (two phase-shifted strands with rungs)

  No motion, no external deps. ASCII only, small pure functions.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[2], palette.layers[1], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, palette.layers[4], palette.layers[5], NUM);
  ctx.restore();
}

// Layer 1 ---------------------------------------------------------------
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: calm outline grid of intersecting circles.
     ND-safe: thin strokes, generous spacing. */
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const r = Math.min(w, h) / NUM.THREE;
  const step = r / NUM.NINE;
  const offset = r / NUM.SEVEN;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
      ctx.beginPath(); ctx.arc(x - offset, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + offset, y, r, 0, Math.PI * 2); ctx.stroke();
    }
  }
  ctx.restore();
}

// Layer 2 ---------------------------------------------------------------
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  /* Tree-of-Life: 10 nodes + 22 paths.
     ND-safe: solid nodes, gentle lines. */
  ctx.save();
  const n = [
    [0.5,0.05], [0.2,0.2], [0.8,0.2], [0.2,0.4], [0.8,0.4],
    [0.5,0.5], [0.2,0.7], [0.8,0.7], [0.5,0.85], [0.5,0.95]
  ];
  const e = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],[3,6],[4,7],[5,6],[5,7],
    [6,8],[7,8],[8,9],[1,4],[2,3],[1,5],[2,6],[3,8],[4,8],[5,9],[6,9]
  ];
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  e.slice(0, NUM.TWENTYTWO).forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(n[a][0]*w, n[a][1]*h);
    ctx.lineTo(n[b][0]*w, n[b][1]*h);
    ctx.stroke();
  });
  ctx.fillStyle = nodeColor;
  n.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x*w, y*h, NUM.ELEVEN/NUM.TWENTYTWO*6, 0, Math.PI*2); // gentle radius
    ctx.fill();
  });
  ctx.restore();
}

// Layer 3 ---------------------------------------------------------------
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci spiral: static polyline using 144 samples.
     ND-safe: single stroke. */
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const phi = (1 + Math.sqrt(5)) / 2;
  const center = { x: w/NUM.THREE, y: h/NUM.THREE };
  ctx.beginPath();
  for (let i = 0; i <= NUM.ONEFORTYFOUR; i++) {
    const t = (i / NUM.ONEFORTYFOUR) * NUM.THREE * 2 * Math.PI;
    const r = Math.pow(phi, t / (2*Math.PI));
    const s = Math.min(w,h) / NUM.SEVEN;
    const x = center.x + s * r * Math.cos(t);
    const y = center.y + s * r * Math.sin(t);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

// Layer 4 ---------------------------------------------------------------
function drawHelix(ctx, w, h, strandColor, rungColor, NUM) {
  /* Double-helix lattice: two phase-shifted sine strands with rungs.
     ND-safe: static lines, no flashing. */
  ctx.save();
  const amp = h / NUM.NINE;
  const turns = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;
  ctx.lineWidth = 2;
  ctx.strokeStyle = strandColor;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h/2 + amp * Math.sin((i/steps) * turns * Math.PI * 2);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h/2 + amp * Math.sin((i/steps) * turns * Math.PI * 2 + Math.PI);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.strokeStyle = rungColor;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const x = (w / NUM.THIRTYTHREE) * i;
    const phase = (x / w) * turns * Math.PI * 2;
    const y1 = h/2 + amp * Math.sin(phase);
    const y2 = h/2 + amp * Math.sin(phase + Math.PI);
    ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();
  }
  ctx.restore();
}

/* ND-safe: all layers are drawn once, no motion or async tasks. */
