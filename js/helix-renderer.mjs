/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 sephirot + 22 paths)
    3) Fibonacci curve (log spiral polyline)
    4) Double-helix lattice (two phase-shifted strands with rungs)

  No motion, no external dependencies. ASCII only.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawLattice(ctx, width, height, palette.layers[4], palette.layers[5], NUM);

  ctx.restore();
}

/* Layer 1: Vesica field */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin lines, low density grid
  const r = Math.min(w, h) / NUM.THREE;
  const step = r / NUM.SEVEN;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let y = r; y < h + r; y += step * NUM.NINE) {
    for (let x = r; x < w + r; x += step * NUM.NINE) {
      ctx.beginPath();
      ctx.arc(x - step, y, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + step, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

/* Layer 2: Tree-of-Life scaffold */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  // ND-safe: solid nodes, gentle connecting lines
  const nodes = [
    [0.5, 0.05], [0.2, 0.2], [0.8, 0.2],
    [0.2, 0.4], [0.8, 0.4], [0.5, 0.5],
    [0.2, 0.7], [0.8, 0.7], [0.5, 0.85], [0.5, 0.95]
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],[3,6],[4,7],[5,6],
    [5,7],[6,8],[7,8],[8,9],[1,4],[2,3],[1,5],[2,6],[3,8],[4,8],
    [5,9],[6,9]
  ]; // 22 paths

  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.forEach(([a,b])=>{
    ctx.beginPath();
    ctx.moveTo(nodes[a][0]*w, nodes[a][1]*h);
    ctx.lineTo(nodes[b][0]*w, nodes[b][1]*h);
    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  nodes.forEach(([x,y])=>{
    ctx.beginPath();
    ctx.arc(x*w, y*h, NUM.NINE / NUM.THREE, 0, Math.PI*2);
    ctx.fill();
  });
}

/* Layer 3: Fibonacci curve */
function drawFibonacci(ctx, w, h, color, NUM) {
  // ND-safe: static spiral, soft stroke
  const phi = (1 + Math.sqrt(5)) / 2;
  const turns = NUM.THREE;
  const segs = NUM.ONEFORTYFOUR;
  const scale = Math.min(w, h) / NUM.NINE;
  const cx = w / 2;
  const cy = h / 2;

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= segs; i++) {
    const t = (turns * 2 * Math.PI) * (i / segs);
    const r = Math.pow(phi, t / (2 * Math.PI));
    const x = cx + scale * r * Math.cos(t);
    const y = cy + scale * r * Math.sin(t);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

/* Layer 4: Double-helix lattice */
function drawLattice(ctx, w, h, colorA, colorB, NUM) {
  // ND-safe: static strands, readable contrast, 33 cross rungs
  const amp = h / NUM.NINE;
  const segs = NUM.ONEFORTYFOUR;
  const turns = NUM.ELEVEN;
  const centerY = h / 2;

  const strand = (phase, color) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= segs; i++) {
      const x = (w / segs) * i;
      const y = centerY + Math.sin((i / segs) * Math.PI * turns + phase) * amp;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };

  strand(0, colorA);
  strand(Math.PI, colorB);

  ctx.strokeStyle = colorB;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const x = (w / NUM.THIRTYTHREE) * i;
    const y1 = centerY + Math.sin((x / w) * Math.PI * turns) * amp;
    const y2 = centerY + Math.sin((x / w) * Math.PI * turns + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
}
