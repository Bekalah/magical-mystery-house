/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 nodes + 22 paths)
    3) Fibonacci curve (log spiral polyline)
    4) Double-helix lattice (two phase-shifted strands with rungs)

  All geometry is static: no motion, no external dependencies.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  // Prepare stage
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  // Tree uses two colors: nodes and paths
  drawTree(ctx, width, height, palette.layers[2], palette.layers[1], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, {
    a: palette.layers[4],
    b: palette.layers[5],
    rung: palette.ink
  }, NUM);

  ctx.restore();
}

// Layer 1 ---------------------------------------------------------------

function drawVesica(ctx, w, h, color, NUM) {
  // Vesica field: calm grid of intersecting circles.
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  const r = Math.min(w, h) / NUM.THREE;      // triadic radius
  const step = r / NUM.SEVEN;                // septenary spacing
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
      ctx.beginPath(); ctx.arc(x - step, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + step, y, r, 0, Math.PI * 2); ctx.stroke();
    }
  }
  ctx.restore();
}

// Layer 2 ---------------------------------------------------------------

function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  // Tree-of-Life scaffold: 10 nodes and 22 connective paths.
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
    [0,1],[0,2],[1,2],
    [1,3],[2,4],[3,5],[4,5],
    [3,6],[4,7],[5,6],[5,7],
    [6,8],[7,8],[8,9],
    [1,4],[2,3],[1,5],[2,6],
    [3,8],[4,8],[5,9],[6,9]
  ]; // 22 paths (NUM.TWENTYTWO)
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.slice(0, NUM.TWENTYTWO).forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0] * w, nodes[a][1] * h);
    ctx.lineTo(nodes[b][0] * w, nodes[b][1] * h);
    ctx.stroke();
  });
  ctx.fillStyle = nodeColor;
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x * w, y * h, NUM.THREE, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

// Layer 3 ---------------------------------------------------------------

function drawFibonacci(ctx, w, h, color, NUM) {
  // Fibonacci logarithmic spiral, static polyline.
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const center = { x: w / NUM.THREE, y: h / NUM.THREE };
  const phi = (1 + Math.sqrt(5)) / 2;
  const turns = NUM.THREE;           // three rotations
  const segs = NUM.ONEFORTYFOUR;     // 144 segments
  ctx.beginPath();
  for (let i = 0; i <= segs; i++) {
    const t = (turns * 2 * Math.PI) * (i / segs);
    const r = Math.pow(phi, t / (2 * Math.PI));
    const scale = Math.min(w, h) / NUM.SEVEN;
    const x = center.x + scale * r * Math.cos(t);
    const y = center.y + scale * r * Math.sin(t);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

// Layer 4 ---------------------------------------------------------------

function drawHelix(ctx, w, h, colors, NUM) {
  // Static double helix: two sine strands with 33 rungs.
  ctx.save();
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;
  // strand A
  ctx.strokeStyle = colors.a;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h / 2 + amp * Math.sin((i / steps) * waves * 2 * Math.PI);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // strand B phase shifted
  ctx.strokeStyle = colors.b;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h / 2 + amp * Math.sin((i / steps) * waves * 2 * Math.PI + Math.PI);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // rungs
  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const x = (w / NUM.THIRTYTHREE) * i;
    const phase = (x / w) * waves * 2 * Math.PI;
    const y1 = h / 2 + amp * Math.sin(phase);
    const y2 = h / 2 + amp * Math.sin(phase + Math.PI);
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
  ctx.restore();
}

