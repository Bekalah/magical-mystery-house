/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers (drawn in order):
    1) Vesica field - intersecting circles forming a calm grid (R001)
    2) Tree-of-Life scaffold - 10 nodes & 22 paths (R002)
    3) Fibonacci curve - logarithmic spiral sampled (R003)
    4) Double-helix lattice - two static strands with cross rungs (R004)

  No animation, no external dependencies.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

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

/* Layer 1: Vesica field (C144N-001..144) */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin lines, generous spacing, no motion
  const r = Math.min(w, h) / NUM.THREE;      // triadic radius
  const step = r / NUM.SEVEN;                // septenary spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
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

/* Layer 2: Tree-of-Life scaffold (C144N-001..010, 22 paths) */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  const nodes = [
    [0.5, 0.05],  // 1 Keter
    [0.75, 0.18], // 2 Chokmah
    [0.25, 0.18], // 3 Binah
    [0.75, 0.38], // 4 Chesed
    [0.25, 0.38], // 5 Geburah
    [0.5, 0.50],  // 6 Tiphareth
    [0.75, 0.62], // 7 Netzach
    [0.25, 0.62], // 8 Hod
    [0.5, 0.74],  // 9 Yesod
    [0.5, 0.88]   //10 Malkuth
  ];
  const edges = [
    [0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[5,6],[3,6],[4,6],
    [3,7],[4,8],[7,8],[7,9],[8,9],[6,7],[6,8],[6,9],[7,10],
    [8,10],[9,10],[5,9],[5,7]
  ];

  ctx.save();
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  for (const [a, b] of edges) {
    const [x1, y1] = nodes[a];
    const [x2, y2] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(x1 * w, y1 * h);
    ctx.lineTo(x2 * w, y2 * h);
    ctx.stroke();
  }

  ctx.fillStyle = nodeColor;
  const r = Math.min(w, h) / NUM.TWENTYTWO;
  for (const [x, y] of nodes) {
    ctx.beginPath();
    ctx.arc(x * w, y * h, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/* Layer 3: Fibonacci curve (R003) */
function drawFibonacci(ctx, w, h, color, NUM) {
  // Log spiral using golden ratio, 144 samples
  const phi = (1 + Math.sqrt(5)) / 2;
  const points = [];
  const scale = Math.min(w, h) / NUM.TWENTYTWO;
  for (let i = 0; i < NUM.ONEFORTYFOUR; i++) {
    const angle = i * (Math.PI / NUM.NINE);
    const radius = scale * Math.pow(phi, i / NUM.TWENTYTWO);
    const x = w/2 + radius * Math.cos(angle);
    const y = h/2 + radius * Math.sin(angle);
    points.push([x, y]);
  }
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  points.forEach(([x, y], idx) => {
    if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice (R004) */
function drawHelix(ctx, w, h, colors, NUM) {
  const amp = h / NUM.NINE;        // gentle amplitude
  const waves = NUM.ELEVEN;        // helix turns
  const steps = NUM.NINETYNINE;    // sampling
  ctx.save();

  // strand A
  ctx.strokeStyle = colors.a;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2 * Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B (phase shifted)
  ctx.strokeStyle = colors.b;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2 * Math.PI + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // rungs
  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = t * w;
    const phase = t * waves * 2 * Math.PI;
    const y1 = h/2 + Math.sin(phase) * amp;
    const y2 = h/2 + Math.sin(phase + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }

  ctx.restore();
}
