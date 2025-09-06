/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 sephirot + 22 paths; simplified layout)
    3) Fibonacci curve (log spiral polyline; static)
    4) Double-helix lattice (two phase-shifted sine waves with connectors)

  All geometry avoids motion/animation; palette chosen for soft contrast.
*/

export function renderHelix(ctx, opts) {
  const { width, height, palette, NUM } = opts;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesicaField(ctx, width, height, palette.layers[0], NUM);
  drawTreeOfLife(ctx, width, height, palette.layers[1], palette.ink, NUM);
  drawFibonacciCurve(ctx, width, height, palette.layers[2], NUM);
  drawHelixLattice(ctx, width, height, palette.layers[3], NUM);
}

/* Vesica field: calm grid of overlapping circles using 3x7 pattern */
function drawVesicaField(ctx, w, h, color, NUM) {
  ctx.save();
  ctx.strokeStyle = color;
  const cols = NUM.THREE;
  const rows = NUM.SEVEN;
  const r = Math.min(w / (cols * 2), h / (rows * 2));
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = r + col * r * 2 + (row % 2 === 0 ? 0 : r);
      const cy = r + row * r;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + r, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

/* Tree-of-Life: nodes (ink) and 22 connecting paths */
function drawTreeOfLife(ctx, w, h, pathColor, nodeColor, NUM) {
  ctx.save();
  const xs = [w / 4, w / 2, (w * 3) / 4]; // left, center, right columns
  const ys = [
    h / NUM.ELEVEN,
    h / NUM.NINE,
    (h * 3) / NUM.ELEVEN,
    (h * 5) / NUM.ELEVEN,
    (h * 7) / NUM.ELEVEN,
    (h * 9) / NUM.ELEVEN
  ];
  // Ten nodes arranged top to bottom
  const nodes = [
    [xs[1], ys[0]], // 0 Keter
    [xs[0], ys[1]], // 1 Chokmah
    [xs[2], ys[1]], // 2 Binah
    [xs[0], ys[2]], // 3 Chesed
    [xs[2], ys[2]], // 4 Geburah
    [xs[1], ys[3]], // 5 Tiferet
    [xs[0], ys[4]], // 6 Netzach
    [xs[2], ys[4]], // 7 Hod
    [xs[1], ys[5]], // 8 Yesod
    [xs[1], h - ys[0]] // 9 Malkuth
  ];
  const edges = [
    [0,1],[0,2],[1,2],[1,3],[1,5],[2,4],[2,5],
    [3,4],[3,5],[4,5],[3,6],[3,8],[4,7],[4,8],
    [5,6],[5,7],[5,8],[6,7],[6,8],[7,8],[6,9],[7,9]
  ]; // 22 paths
  ctx.strokeStyle = pathColor;
  edges.forEach(([a,b])=>{
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
    ctx.stroke();
  });
  ctx.fillStyle = nodeColor;
  const r = 6;
  nodes.forEach(([x,y])=>{
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();
  });
  ctx.restore();
}

/* Fibonacci curve: static polyline using 11 segments */
function drawFibonacciCurve(ctx, w, h, color, NUM) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  let a = 1, b = 1;
  const scale = Math.min(w, h) / NUM.THIRTYTHREE;
  let x = w / 2;
  let y = h / 2;
  ctx.moveTo(x, y);
  let angle = 0;
  for (let i = 0; i < NUM.ELEVEN; i++) {
    const len = b * scale;
    x += len * Math.cos(angle);
    y += len * Math.sin(angle);
    ctx.lineTo(x, y);
    [a, b] = [b, a + b];
    angle += Math.PI / 2;
  }
  ctx.stroke();
  ctx.restore();
}

/* Double-helix lattice: two sinusoids with 99 vertical connectors */
function drawHelixLattice(ctx, w, h, color, NUM) {
  ctx.save();
  ctx.strokeStyle = color;
  const amp = h / 4;
  const cycles = NUM.THREE;
  // first strand
  ctx.beginPath();
  for (let x = 0; x <= w; x++) {
    const y = h / 2 + amp * Math.sin((cycles * 2 * Math.PI * x) / w);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // second strand phase-shifted by PI
  ctx.beginPath();
  for (let x = 0; x <= w; x++) {
    const y = h / 2 + amp * Math.sin((cycles * 2 * Math.PI * x) / w + Math.PI);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // vertical connectors
  for (let i = 0; i <= NUM.NINETYNINE; i++) {
    const x = (w / NUM.NINETYNINE) * i;
    const y1 = h / 2 + amp * Math.sin((cycles * 2 * Math.PI * x) / w);
    const y2 = h / 2 + amp * Math.sin((cycles * 2 * Math.PI * x) / w + Math.PI);
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
  ctx.restore();
}
