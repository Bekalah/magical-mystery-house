/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 sephirot + 22 paths; simplified layout)
    3) Fibonacci curve (log spiral polyline; static)

    4) Double-helix lattice (two phase-shifted strands with rungs)

  No motion, no external dependencies. ASCII only.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  // Clear and set background
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[2], palette.layers[1], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, palette, NUM);
  ctx.restore();
}

// Layer 1 ---------------------------------------------------------------
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: calm outline grid built from overlapping circles.
     ND-safe: thin lines, low density. */
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const r = Math.min(w, h) / NUM.THREE; // base radius from sacred triad
  const step = r / NUM.SEVEN;           // spacing guided by 7
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
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  /* Tree-of-Life: simplified sephirot layout, 10 nodes + 22 paths.
     ND-safe: solid nodes, gentle lines. */
  ctx.save();
  const nodes = [
    [0.5, 0.05], // Kether
    [0.2, 0.2],  // Chokmah
    [0.8, 0.2],  // Binah
    [0.2, 0.4],  // Chesed
    [0.8, 0.4],  // Geburah
    [0.5, 0.5],  // Tiphereth
    [0.2, 0.7],  // Netzach
    [0.8, 0.7],  // Hod
    [0.5, 0.85], // Yesod
    [0.5, 0.95]  // Malkuth
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],[3,6],[4,7],[5,6],[5,7],
    [6,8],[7,8],[8,9],[1,4],[2,3],[1,5],[2,6],[3,8],[4,8],[5,9],[6,9]
  ]; // 22 connections guided by NUM.TWENTYTWO
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
    ctx.arc(x*w, y*h, 6, 0, Math.PI*2);
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
  const center = { x: w/NUM.THREE, y: h/NUM.THREE };
  const phi = (1 + Math.sqrt(5)) / 2;
  const turns = NUM.THREE; // three rotations
  const segs = NUM.ONEFORTYFOUR; // smoothness
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
function drawHelix(ctx, w, h, palette, NUM) {
  /* Double-helix lattice: two sine-wave strands with cross rungs.
     ND-safe: static strands, no flashing, readable contrast. */
  ctx.save();
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;             // helix turns
  const steps = NUM.NINETYNINE;         // sampling points
  // strand A
  ctx.strokeStyle = palette.layers[4];
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h/2 + amp * Math.sin((i/steps) * waves * 2 * Math.PI);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // strand B phase-shifted
  ctx.strokeStyle = palette.layers[5];
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h/2 + amp * Math.sin((i/steps) * waves * 2 * Math.PI + Math.PI);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // rungs
  ctx.strokeStyle = palette.ink;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const x = (w / NUM.THIRTYTHREE) * i;
    const phase = (x / w) * waves * 2 * Math.PI;
    const y1 = h/2 + amp * Math.sin(phase);
    const y2 = h/2 + amp * Math.sin(phase + Math.PI);
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
  ctx.restore();

export function renderHelix(ctx, opts) {
  const { width, height, palette, NUM } = opts;
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const [vesicaColor, treeColor, fibColor, helixColor] = palette.layers;
  drawVesica(ctx, width, height, vesicaColor, NUM);
  drawTree(ctx, width, height, treeColor, NUM);
  drawFibonacci(ctx, width, height, fibColor, NUM);
  drawHelix(ctx, width, height, helixColor, NUM);
}

/* ND-safe: no motion; each layer is drawn once in calm contrast. */
function drawVesica(ctx, w, h, color, NUM) {
  const r = h / NUM.THREE;
  const offset = r / NUM.THIRTYTHREE;
  const cx1 = w / 2 - r / 2;
  const cx2 = w / 2 + r / 2;
  const cy = h / 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = NUM.THREE / NUM.THREE;
  ctx.beginPath(); ctx.arc(cx1, cy, r - offset, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx2, cy, r - offset, 0, Math.PI * 2); ctx.stroke();
}

function drawTree(ctx, w, h, color, NUM) {
  const r = NUM.ELEVEN; // node radius
  const nodes = [
    {x:w/2,       y:h/NUM.NINE},
    {x:w*0.65,    y:h*0.2},
    {x:w*0.35,    y:h*0.2},
    {x:w*0.75,    y:h*0.4},
    {x:w*0.25,    y:h*0.4},
    {x:w/2,       y:h*0.5},
    {x:w*0.75,    y:h*0.6},
    {x:w*0.25,    y:h*0.6},
    {x:w/2,       y:h*0.7},
    {x:w/2,       y:h*0.9}
  ];
  const edges = [
    [0,1],[0,2],[1,2],
    [1,3],[2,4],[3,4],
    [3,5],[4,5],
    [3,6],[4,7],
    [5,6],[5,7],
    [6,8],[7,8],
    [6,9],[7,9],
    [8,9],
    [1,4],[2,3],
    [2,5],[1,5],
    [5,8]
  ]; // 22 paths
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  edges.forEach(([a,b])=>{
    const pa = nodes[a], pb = nodes[b];
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.stroke();
  });
  ctx.fillStyle = color;
  nodes.forEach(n=>{
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI*2);
    ctx.fill();
  });
}

function drawFibonacci(ctx, w, h, color, NUM) {
  const cx = w / 2;
  const cy = h / 2;
  const phi = (1 + Math.sqrt(5)) / 2;
  const a = Math.min(w, h) / NUM.NINETYNINE;
  const pts = [];
  for (let i = 0; i < NUM.TWENTYTWO; i++) {
    const angle = i / NUM.SEVEN * Math.PI;
    const radius = a * Math.pow(phi, angle);
    pts.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  pts.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p[0], p[1]);
    else ctx.lineTo(p[0], p[1]);
  });
  ctx.stroke();
}

function drawHelix(ctx, w, h, color, NUM) {
  const amp = h / NUM.SEVEN;
  const step = w / NUM.ONEFORTYFOUR;
  const turns = NUM.NINE;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  ctx.beginPath();
  for (let x = 0; x <= w; x += step) {
    const y = h/2 + Math.sin((x/w) * Math.PI * turns) * amp;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.beginPath();
  for (let x = 0; x <= w; x += step) {
    const y = h/2 + Math.sin((x/w) * Math.PI * turns + Math.PI) * amp;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
  ctx.stroke();

  ctx.lineWidth = 0.5;
  for (let i = 0; i <= NUM.ELEVEN; i++) {
    const x = (w / NUM.ELEVEN) * i;
    ctx.beginPath();
    ctx.moveTo(x, h/3);
    ctx.lineTo(x, h*2/3);
    ctx.stroke();
  }
}
