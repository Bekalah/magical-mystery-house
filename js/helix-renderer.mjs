/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers (drawn in order):
    1) Vesica field — intersecting circles forming a calm grid
    2) Tree-of-Life scaffold — 10 sephirot nodes + 22 connecting paths
    3) Fibonacci curve — logarithmic spiral approximated by polyline
    4) Double-helix lattice — two phase-shifted strands with 33 cross rungs

  Design: no motion, no external deps, ASCII quotes only.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  // wipe canvas
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Layer order preserves depth without motion
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, { a: palette.layers[4], b: palette.layers[5], rung: palette.ink }, NUM);

  ctx.restore();
}

/* Layer 1: Vesica field */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin lines, generous spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const r = Math.min(w, h) / NUM.THREE;
  const step = r / NUM.SEVEN;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
      ctx.beginPath(); ctx.arc(x - step, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + step, y, r, 0, Math.PI * 2); ctx.stroke();
    }
  }
  ctx.restore();
}

/* Layer 2: Tree-of-Life scaffold */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  ctx.save();
  const nodes = [
    [w/2, h*0.09],            // 0 Kether
    [w*0.35, h*0.2], [w*0.65, h*0.2], // 1 Chokmah, 2 Binah
    [w*0.35, h*0.35], [w*0.65, h*0.35], // 3 Chesed, 4 Geburah
    [w/2, h*0.47],            // 5 Tiphereth
    [w*0.35, h*0.6], [w*0.65, h*0.6], // 6 Netzach, 7 Hod
    [w/2, h*0.75],            // 8 Yesod
    [w/2, h*0.9]              // 9 Malkuth
  ];
  const paths = [
    [0,1],[0,2],[0,5],
    [1,2],[1,3],[1,5],[2,4],[2,5],
    [3,4],[3,5],[3,6],[4,5],[4,7],
    [5,6],[5,7],[5,8],
    [6,7],[6,8],[6,9],
    [7,8],[7,9],
    [8,9]
  ];
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
    ctx.stroke();
  });
  const r = h / NUM.THIRTYTHREE; // gentle node radius
  ctx.fillStyle = nodeColor;
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/* Layer 3: Fibonacci curve */
function drawFibonacci(ctx, w, h, color, NUM) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const points = NUM.ONEFORTYFOUR;
  const phi = (1 + Math.sqrt(5)) / 2;
  const scale = Math.min(w, h) / NUM.TWENTYTWO;
  ctx.beginPath();
  for (let i = 0; i < points; i++) {
    const t = i / points * NUM.TWENTYTWO;
    const r = scale * Math.pow(phi, t / NUM.ELEVEN);
    const ang = t * Math.PI / NUM.ELEVEN;
    const x = w/2 + r * Math.cos(ang);
    const y = h/2 + r * Math.sin(ang);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice */
function drawHelix(ctx, w, h, colors, NUM) {
  ctx.save();
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;

  ctx.lineWidth = 2;
  ctx.strokeStyle = colors.a;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2 * Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.strokeStyle = colors.b;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2 * Math.PI + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = t * w;
    const y1 = h/2 + Math.sin(t * waves * 2 * Math.PI) * amp;
    const y2 = h/2 + Math.sin(t * waves * 2 * Math.PI + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
  ctx.restore();
}
