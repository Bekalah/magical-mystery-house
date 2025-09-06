/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 sephirot + 22 paths; simplified layout)
    3) Fibonacci curve (log spiral polyline; static)
    4) Double-helix lattice (two phase-shifted sinusoids)
  All routines are pure and static; no motion, no external libs.
*/

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
