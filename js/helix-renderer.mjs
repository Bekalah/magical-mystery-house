/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers (drawn in order):
    1) Vesica field – intersecting circles forming a calm grid
    2) Tree-of-Life scaffold – 10 sephirot nodes + 22 connecting paths
    3) Fibonacci curve – logarithmic spiral approximated by polyline
    4) Double-helix lattice – two sine strands with 33 cross rungs

  Design: no motion, no external deps, ASCII quotes only.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  // wipe canvas
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, palette.layers[4], NUM);
}

/* Layer 1: Vesica field */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin lines, sparse pattern
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

/* Layer 2: Tree-of-Life scaffold */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  ctx.save();
  const nodes = [
    [0.5, 0.05],[0.2,0.2],[0.8,0.2],[0.2,0.4],[0.8,0.4],
    [0.5,0.5],[0.2,0.7],[0.8,0.7],[0.5,0.85],[0.5,0.95]
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],[3,6],[4,7],[5,6],[5,7],
    [6,8],[7,8],[8,9],[1,4],[2,3],[1,5],[2,6],[3,8],[4,8],[5,9],[6,9]
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
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x*w, y*h, 6, 0, Math.PI*2);
    ctx.fill();
  });
  ctx.restore();
}

/* Layer 3: Fibonacci curve */
function drawFibonacci(ctx, w, h, color, NUM) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  const phi = (1 + Math.sqrt(5)) / 2;
  const cx = w/NUM.THREE;
  const cy = h/NUM.THREE;
  const turns = NUM.THREE;
  const segs = NUM.ONEFORTYFOUR;
  const scale = Math.min(w,h) / NUM.SEVEN;

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

/* Layer 4: Double-helix lattice */
function drawHelix(ctx, w, h, color, NUM) {
  ctx.save();
  const amp = h / NUM.NINE;
  const turns = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;

  // strand A
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h/2 + amp * Math.sin((i/steps) * turns * 2 * Math.PI);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B (phase π)
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h/2 + amp * Math.sin((i/steps) * turns * 2 * Math.PI + Math.PI);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // cross rungs
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const x = (w / NUM.THIRTYTHREE) * i;
    const phase = (x / w) * turns * 2 * Math.PI;
    const y1 = h/2 + amp * Math.sin(phase);
    const y2 = h/2 + amp * Math.sin(phase + Math.PI);
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }

  ctx.restore();
}
