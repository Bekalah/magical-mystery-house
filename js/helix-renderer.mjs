/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers (drawn in order):
    1) Vesica field - intersecting circles forming a calm grid
    2) Tree-of-Life scaffold - 10 sephirot nodes + 22 connecting paths
    3) Fibonacci curve - logarithmic spiral approximated by polyline
    4) Double-helix lattice - two phase-shifted strands with 33 cross rungs

  Design: no motion, no external deps, ASCII quotes only.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  // Prepare stage
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Layer order preserves depth without motion
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, {
    a: palette.layers[4],
    b: palette.layers[5],
    rung: palette.ink
  }, NUM);

  ctx.restore();
}

/* Layer 1: Vesica field */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin lines, generous spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const r = Math.min(w, h) / NUM.THREE;      // triadic radius
  const step = r / NUM.SEVEN;                // septenary spacing
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
  // ND-safe: static scaffold, no motion
  const nodes = [];
  const colX = [
    w / NUM.THREE,
    w / 2,
    w - w / NUM.THREE
  ];
  const rowY = [];
  for (let i = 1; i <= NUM.NINE; i++) {
    rowY.push((h / (NUM.NINE + 1)) * i);
  }
  // simplified 10 sephirot layout
  nodes.push({ x: colX[1], y: rowY[0] }); // Keter
  nodes.push({ x: colX[0], y: rowY[1] }); // Chokmah
  nodes.push({ x: colX[2], y: rowY[1] }); // Binah
  nodes.push({ x: colX[0], y: rowY[2] }); // Chesed
  nodes.push({ x: colX[2], y: rowY[2] }); // Geburah
  nodes.push({ x: colX[1], y: rowY[3] }); // Tiferet
  nodes.push({ x: colX[0], y: rowY[4] }); // Netzach
  nodes.push({ x: colX[2], y: rowY[4] }); // Hod
  nodes.push({ x: colX[1], y: rowY[5] }); // Yesod
  nodes.push({ x: colX[1], y: rowY[7] }); // Malkuth

  const paths = [
    [0,1],[0,2],[1,3],[1,5],[2,4],[2,5],
    [3,4],[3,5],[4,5],[3,6],[4,7],[6,7],
    [6,8],[7,8],[5,8],[8,9]
  ];
  ctx.save();
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 2;
  for (const [a,b] of paths) {
    const A = nodes[a], B = nodes[b];
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.stroke();
  }
  ctx.fillStyle = nodeColor;
  const r = Math.min(w, h) / NUM.NINETYNINE * NUM.THREE; // small node radius
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/* Layer 3: Fibonacci curve */
function drawFibonacci(ctx, w, h, color, NUM) {
  // ND-safe: static spiral with 144 samples
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const phi = (1 + Math.sqrt(5)) / 2;
  const center = { x: w / 2, y: h / 2 };
  const maxR = Math.min(w, h) / 2;
  const tMax = NUM.ONEFORTYFOUR / NUM.TWENTYTWO;
  const base = maxR / Math.pow(phi, tMax);
  ctx.beginPath();
  for (let i = 0; i <= NUM.ONEFORTYFOUR; i++) {
    const t = i / NUM.TWENTYTWO;
    const r = base * Math.pow(phi, t);
    const ang = t * 2 * Math.PI;
    const x = center.x + r * Math.cos(ang);
    const y = center.y + r * Math.sin(ang);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice */
function drawHelix(ctx, w, h, colors, NUM) {
  // ND-safe: static lattice of two strands with cross rungs
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;
  ctx.save();
  ctx.lineWidth = 2;

  // strand A
  ctx.strokeStyle = colors.a;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2*Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B (phase shifted by pi)
  ctx.strokeStyle = colors.b;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2*Math.PI + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // rungs
  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = t * w;
    const phase = t * waves * 2*Math.PI;
    const y1 = h/2 + Math.sin(phase) * amp;
    const y2 = h/2 + Math.sin(phase + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }

  ctx.restore();
}
