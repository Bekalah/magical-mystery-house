/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 sephirot + 22 paths)
    3) Fibonacci curve (log spiral polyline)
    4) Double-helix lattice (two phase-shifted strands)

  No motion, no external dependencies. ASCII only.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], NUM);
  drawFibonacci(ctx, width, height, palette.layers[2], NUM);
  drawHelix(ctx, width, height, palette.layers[3], NUM);
  ctx.restore();
}

// Layer 1 ---------------------------------------------------------------
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: calm outline grid built from overlapping circles.
     ND-safe: thin lines, low density. */
  const r = Math.min(w, h) / NUM.THREE; // base radius from sacred triad
  const step = r / NUM.SEVEN;           // spacing guided by 7
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
      ctx.beginPath(); ctx.arc(x - step, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + step, y, r, 0, Math.PI * 2); ctx.stroke();
    }
  }
}

// Layer 2 ---------------------------------------------------------------
function drawTree(ctx, w, h, color, NUM) {
  /* Tree-of-Life: 10 nodes + 22 paths in balanced layout. */
  const nodes = [
    [0.5, 0.05],[0.2,0.2],[0.8,0.2],
    [0.2,0.4],[0.8,0.4],[0.5,0.5],
    [0.2,0.7],[0.8,0.7],[0.5,0.85],[0.5,0.95]
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],
    [3,6],[4,7],[5,6],[5,7],
    [6,8],[7,8],[8,9],[1,4],[2,3],[1,5],[2,6],[3,8],[4,8],[5,9],[6,9]
  ];
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  paths.slice(0, NUM.TWENTYTWO).forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0]*w, nodes[a][1]*h);
    ctx.lineTo(nodes[b][0]*w, nodes[b][1]*h);
    ctx.stroke();
  });
  ctx.fillStyle = color;
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x*w, y*h, 6, 0, Math.PI*2);
    ctx.fill();
  });
}

// Layer 3 ---------------------------------------------------------------
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci logarithmic spiral approximated by polyline. */
  const center = { x: w/NUM.THREE, y: h/NUM.THREE };
  const phi = (1 + Math.sqrt(5)) / 2;
  const turns = NUM.THREE;
  const segs = NUM.ONEFORTYFOUR;
  const scale = Math.min(w, h) / NUM.SEVEN;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= segs; i++) {
    const t = (turns * 2 * Math.PI) * (i / segs);
    const r = Math.pow(phi, t / (2*Math.PI));
    const x = center.x + scale * r * Math.cos(t);
    const y = center.y + scale * r * Math.sin(t);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

// Layer 4 ---------------------------------------------------------------
function drawHelix(ctx, w, h, color, NUM) {
  /* Double-helix lattice: two static strands with cross rungs. */
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  // strand A
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2*Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2*Math.PI + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // rungs
  ctx.lineWidth = 1;
  for (let i = 0; i <= waves; i++) {
    const t = i / waves;
    const x = t * w;
    const y1 = h/2 + Math.sin(t * waves * 2*Math.PI) * amp;
    const y2 = h/2 + Math.sin(t * waves * 2*Math.PI + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
}

