/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field – intersecting circles forming a calm grid
    2) Tree-of-Life scaffold – 10 sephirot nodes + 22 paths
    3) Fibonacci curve – logarithmic spiral polyline
    4) Double-helix lattice – two phase-shifted strands with 33 rungs
    3) Fibonacci curve – logarithmic spiral approximated by polyline
    4) Double-helix lattice – two static strands with 33 cross rungs
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 nodes + 22 paths)
    3) Fibonacci curve (log spiral polyline)
    4) Double-helix lattice (two phase-shifted strands with rungs)
  Layers (drawn in order):
    1) Vesica field — intersecting circles forming a calm grid
    2) Tree-of-Life scaffold — 10 sephirot nodes + 22 connecting paths
    3) Fibonacci curve — logarithmic spiral approximated by polyline
    4) Double-helix lattice — two phase-shifted strands with 33 cross rungs

  Design: no motion, no external deps, ASCII quotes only.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  // Prepare stage
  // wipe canvas
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

  // layer order preserves depth without motion
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, {
    a: palette.layers[4],
    b: palette.layers[5],
    rung: palette.ink
  }, NUM);
  drawHelix(ctx, width, height, { a: palette.layers[4], b: palette.layers[5], rung: palette.ink }, NUM);

  ctx.restore();
}

/* Layer 1: Vesica field (C144N-001..144) */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin strokes, generous spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  /* Vesica field: calm outline grid built from overlapping circles.
     ND-safe: thin lines, generous spacing. */
  const r = Math.min(w, h) / NUM.THREE; // base radius from sacred triad
  const step = r / NUM.SEVEN;           // spacing guided by 7
  // ND-safe: thin lines, generous spacing, no motion
  const r = Math.min(w, h) / NUM.THREE;      // triadic radius
  const step = r / NUM.SEVEN;                // septenary spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
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
  // ND-safe: static nodes and paths, no glow
  ctx.save();
  const layout = [
    { x: 0.5, y: 0.05 }, // Kether
    { x: 0.75, y: 0.18 }, // Chokmah
    { x: 0.25, y: 0.18 }, // Binah
    { x: 0.75, y: 0.35 }, // Chesed
    { x: 0.25, y: 0.35 }, // Geburah
    { x: 0.5, y: 0.5 },   // Tiphereth
    { x: 0.75, y: 0.65 }, // Netzach
    { x: 0.25, y: 0.65 }, // Hod
    { x: 0.5, y: 0.78 },  // Yesod
    { x: 0.5, y: 0.95 }   // Malkuth
  ].map(n => ({ x: n.x * w, y: n.y * h }));

  const edges = [
    [0,1],[0,2],[0,5],
    [1,2],[1,3],[1,4],
    [2,3],[2,4],[3,4],
    [3,5],[3,6],[4,5],[4,7],
    [5,6],[5,7],[5,8],
    [6,7],[6,8],[6,9],
    [7,8],[7,9],[8,9]
  /* Tree: 10 nodes with 22 connecting paths.
     ND-safe: static points and lines, no flicker. */
  const nodes = [
    { x:0.5, y:0.05 }, { x:0.75, y:0.15 }, { x:0.25, y:0.15 },
    { x:0.75, y:0.35 }, { x:0.25, y:0.35 }, { x:0.5, y:0.45 },
    { x:0.75, y:0.65 }, { x:0.25, y:0.65 }, { x:0.5, y:0.75 },
    { x:0.5, y:0.9 }
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[1,5],[2,4],[2,5],[3,4],[3,5],[3,6],
    [4,5],[4,7],[5,6],[5,7],[5,8],[6,7],[6,8],[7,8],[6,9],[7,9],[8,9],[0,5]
  ];
  const r = Math.min(w, h) / NUM.ELEVEN;
  ctx.save();
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  for (const [a,b] of edges) {
    ctx.beginPath();
    ctx.moveTo(layout[a].x, layout[a].y);
    ctx.lineTo(layout[b].x, layout[b].y);
    ctx.stroke();
  }

  ctx.fillStyle = nodeColor;
  const r = h / NUM.TWENTYTWO;
  for (const n of layout) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
  for (const [a,b] of paths) {
    const p1 = nodes[a], p2 = nodes[b];
    ctx.beginPath();
    ctx.moveTo(p1.x * w, p1.y * h);
    ctx.lineTo(p2.x * w, p2.y * h);
    ctx.stroke();
  }
  ctx.fillStyle = nodeColor;
  for (const p of nodes) {
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2);
    ctx.fill();
  }
    [0.5, 0.05],[0.2,0.2],[0.8,0.2],[0.2,0.4],[0.8,0.4],
    [0.5,0.5],[0.2,0.7],[0.8,0.7],[0.5,0.85],[0.5,0.95]
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],
    [3,6],[4,7],[5,6],[5,7],[6,8],[7,8],[8,9],
    [1,4],[2,3],[1,5],[2,6],[3,8],[4,8],[5,9],[6,9]
  ].slice(0, NUM.TWENTYTWO);
  ctx.save();
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  for (const [a,b] of paths) {
    const p1 = nodes[a], p2 = nodes[b];
    ctx.beginPath();
    ctx.moveTo(nodes[a][0]*w, nodes[a][1]*h);
    ctx.lineTo(nodes[b][0]*w, nodes[b][1]*h);
    ctx.stroke();
  });
  ctx.fillStyle = color;
  const r = w / NUM.NINETYNINE;
  nodes.forEach(([nx, ny]) => {
    ctx.beginPath();
    ctx.arc(nx*w, ny*h, r, 0, Math.PI*2);
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
    ctx.moveTo(p1.x * w, p1.y * h);
    ctx.lineTo(p2.x * w, p2.y * h);
    ctx.stroke();
  }
  ctx.fillStyle = nodeColor;
  for (const p of nodes) {
    ctx.beginPath();
    ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2);
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

/* Layer 3: Fibonacci curve */
function drawFibonacci(ctx, w, h, color, NUM) {
  // ND-safe: static spiral, 144 samples
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const cx = w * 0.3;
  const cy = h * 0.6;
  const pts = NUM.ONEFORTYFOUR;
  const phi = (1 + Math.sqrt(5)) / 2;
  ctx.beginPath();
  for (let i = 0; i < pts; i++) {
    const theta = 0.1 * i;
    const rad = Math.pow(phi, theta / Math.PI);
    const x = cx + rad * Math.cos(theta) * 20;
    const y = cy + rad * Math.sin(theta) * 20;
  /* Fibonacci spiral: 144 sample points with golden ratio growth.
     ND-safe: soft stroke, no animation. */
  const cx = w * 0.2;  // start near left for spacious curve
  const cy = h * 0.8;
  const points = NUM.ONEFORTYFOUR;
  const phi = (1 + Math.sqrt(5)) / 2; // golden ratio
  const scale = Math.min(w, h) / NUM.THIRTYTHREE;
  /* Fibonacci spiral: static logarithmic curve.
     ND-safe: single line, no animation. */
  const center = { x: w/NUM.THREE, y: h/NUM.THREE };
  const phi = (1 + Math.sqrt(5)) / 2;
  const turns = NUM.THREE;
  const segs = NUM.ONEFORTYFOUR;
  const scale = Math.min(w, h) / NUM.SEVEN;
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
  for (let i = 0; i < points; i++) {
    const angle = i / NUM.TWENTYTWO * Math.PI * 2;
    const radius = scale * Math.pow(phi, i / NUM.TWENTYTWO);
    const x = cx + Math.cos(angle) * radius;
    const y = cy - Math.sin(angle) * radius;
  for (let i = 0; i <= segs; i++) {
    const t = (turns * 2 * Math.PI) * (i / segs);
    const r = Math.pow(phi, t / (2 * Math.PI));
    const x = center.x + scale * r * Math.cos(t);
    const y = center.y + scale * r * Math.sin(t);
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
  points.forEach(([x, y], idx) => {
    if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice */
function drawHelix(ctx, w, h, colors, NUM) {
  // ND-safe: static strands with 33 rungs
  /* Double helix: two static sine strands with 33 rungs.
     ND-safe: even spacing, no motion. */
// Layer 4 ---------------------------------------------------------------
function drawHelix(ctx, w, h, strandColor, rungColor, NUM) {
  /* Double-helix lattice: two static strands with cross rungs.
     ND-safe: fixed lines, no flashing. */
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = strandColor;

  // strand A
  ctx.strokeStyle = colors.a;
  ctx.save();
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;

/* Layer 4: Double-helix lattice (R004) */
function drawHelix(ctx, w, h, colors, NUM) {
  const amp = h / NUM.NINE;        // gentle amplitude
  const waves = NUM.ELEVEN;        // helix turns
  const steps = NUM.NINETYNINE;    // sampling
  ctx.save();

  // strand A
  ctx.strokeStyle = colors.a;
  ctx.lineWidth = 2;
  ctx.strokeStyle = colors.a;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h / 2 + Math.sin(t * waves * 2 * Math.PI) * amp;
    const y = h/2 + Math.sin(t * waves * 2*Math.PI) * amp;
    const y = h/2 + Math.sin(t * waves * 2 * Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B (phase shift π)
  // strand B phase shifted
  ctx.strokeStyle = colors.b;
  // strand B
  // strand B (phase shifted)
  ctx.strokeStyle = colors.b;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h / 2 + Math.sin(t * waves * 2 * Math.PI + Math.PI) * amp;
    const y = h/2 + Math.sin(t * waves * 2 * Math.PI + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // rungs
  // cross rungs
  ctx.strokeStyle = colors.rung;
  // rungs
  ctx.strokeStyle = rungColor;
  // rungs
  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = t * w;
    const phase = t * waves * 2 * Math.PI;
    const y1 = h / 2 + Math.sin(phase) * amp;
    const y2 = h / 2 + Math.sin(phase + Math.PI) * amp;
    const phase = t * waves * 2*Math.PI;
    const y1 = h/2 + Math.sin(phase) * amp;
    const y2 = h/2 + Math.sin(phase + Math.PI) * amp;
    const y1 = h/2 + Math.sin(t * waves * 2 * Math.PI) * amp;
    const y2 = h/2 + Math.sin(t * waves * 2 * Math.PI + Math.PI) * amp;
    const y1 = h/2 + Math.sin(phase) * amp;
    const y2 = h/2 + Math.sin(phase + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }
  ctx.restore();
}
