/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers drawn in order:
    1) Vesica field — intersecting circles forming a calm grid
    2) Tree-of-Life scaffold — 10 sephirot nodes + 22 paths
    3) Fibonacci curve — logarithmic spiral using 144 samples
    4) Double-helix lattice — two phase-shifted strands with 33 cross rungs

  All functions are pure and run once; no motion, no dependencies.
  Layers (drawn in order):
    1) Vesica field — intersecting circles forming a calm grid
    2) Tree-of-Life scaffold — 10 sephirot nodes + 22 paths
    3) Fibonacci curve — logarithmic spiral polyline
    4) Double-helix lattice — two phase-shifted strands with 33 rungs

  All functions are pure and run once; no motion, no dependencies.
  Layers  Layers (rendered in order):
    1) Vesica field — intersecting circles
    2) Tree-of-Life scaffold — 10 nodes with 22 paths
    3) Fibonacci curve — logarithmic spiral polyline
    4) Double-helix lattice — two phase-shifted strands with rungs
 are pure and run once; no motion, no dependencies.
>>>>>>> main
  Layers (rendered in order):
    1) Vesica field — intersecting circles
    2) Tree-of-Life scaffold — 10 nodes with 22 paths
    3) Fibonacci curve — logarithmic spiral polyline
    4) Double-helix lattice — two phase-shifted strands with rungs

  All functions are pure and run once; no motion, no dependencies.
  Layers (rendered in order):
    1) Vesica field — intersecting circles
    2) Tree-of-Life scaffold — 10 nodes with 22 paths
    3) Fibonacci curve — logarithmic spiral polyline
    4) Double-helix lattice — two phase-shifted strands with rungs

  All functions are pure and run once; no motion, no dependencies.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Layer order preserves depth without motion
  // layer order preserves depth without motion
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, {
    a: palette.layers[4],
    b: palette.layers[5],
    rung: palette.ink
  }, NUM);
  /  // Layer order preserves depth without motion
origin/codex/update-version-to-1.0.1-0d7tvt
>>>>>>> main
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, { a: palette.layers[4], b: palette.layers[5], rung: palette.ink }, NUM);
>>>>>>> main

  ctx.restore();
}

<<<<<<< main
/* Layer 1: Vesica field ---------------------------------------------------- */
/* Layer 1: Vesica field */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin lines, generous spacing
  const r = Math.min(w, h) / NUM.THREE;      // triadic radius
  const step = r / NUM.SEVEN;                // septenary spacing
/* /* Layer 1: Vesica field ---------------------------------------------------- */
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: calm outline grid built from overlapping circles.
     ND-safe: thin lines, generous spacing. */
  const r = Math.min(w, h) / NUM.THREE;      // base radius from sacred triad
  const step = r / NUM.SEVEN;                // spacing guided by 7

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
<<<<<<< main
/* Layer 1: Vesica field — calm grid of intersecting circles */
function drawVesica(ctx, w, h, color, NUM) {
  const r = Math.min(w, h) / NUM.THREE; // triadic radius
  const step = r / NUM.SEVEN;           // septenary spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
/* Layer 1: Vesica field — calm grid of intersecting circles */
function drawVesica(ctx, w, h, color, NUM) {
  const r = Math.min(w, h) / NUM.THREE; // triadic radius
  const step = r / NUM.SEVEN;           // septenary spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
      ctx.beginPath(); ctx.arc(x - step, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + step, y, r, 0, Math.PI * 2); ctx.stroke();
    }
  }
  ctx.restore();
}

/* Layer 2: Tree-of-Life scaffold ------------------------------------------ */
 1: Vesi/* Layer 1: Vesica field — calm grid of intersecting circles */
function drawVesica(ctx, w, h, color, NUM) {
  const r = Math.min(w, h) / NUM.THREE; // triadic radius
  const step = r / NUM.SEVEN;           // septenary spacing
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
>>>>>>> main
      ctx.beginPath(); ctx.arc(x - step, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + step, y, r, 0, Math.PI * 2); ctx.stroke();
>>>>>>>+origin/codex/up
store();
}

/* Layer 2: Tree-of-Life scaffold */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  // Simplified sephirot layout: 3 columns, 5 rows
  const xs = [w / 4, w / 2, (3 * w) / 4];
  const ys = [h / 12, h / 3, h / 2, (2 * h) / 3, (11 * h) / 12];
  const nodes = [
    [xs[1], ys[0]], // crown
    [xs[0], ys[1]], // wisdom
    [xs[2], ys[1]], // understanding
    [xs[0], ys[2]], // mercy
    [xs[2], ys[2]], // severity
    [xs[1], ys[2]], // beauty
    [xs[0], ys[3]], // victory
    [xs[2], ys[3]], // splendor
    [xs[1], ys[3]], // foundation
    [xs[1], ys[4]]  // kingdom
  ];

  const paths = [
    [0,1],[0,2],[1,2],
    [1,3],[1,5],[2,4],[2,5],
    [3,4],[3,5],[4,5],
    [3,6],[4,7],[5,6],[5,7],[6,7],
    [6,8],[7,8],[8,9],
    [3,8],[4,8],[1,4],[2,3]
  ]; // 22 paths

  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = pathColor;
  paths.forEach(([a, b]) => {
    const [x1, y1] = nodes[a];
    const [x2, y2] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, w / NUM.THIRTYTHREE, 0, Math.PI * 2);
    ctx.fill();
  });
<<<<<<< main
/* La/* Layer 2: Tree-of-Life scaffold ------------------------------------------ */
>>>>>>> main
function drawTree(ctx, w, h, edgeColor, nodeColor, NUM) {
  /* Tree-of-Life: ten nodes and twenty-two paths.
     ND-safe: static layout with soft strokes and filled nodes. */
  const nodes = [
    [0.5, 0.1], [0.7, 0.2], [0.3, 0.2],
    [0.75, 0.5], [0.25, 0.5], [0.5, 0.55],
    [0.8, 0.8], [0.2, 0.8], [0.5, 0.85], [0.5, 0.95]
  ];

  const edges = [
    [0,1],[0,2],[1,2],
    [1,3],[2,4],[3,4],
    [3,5],[4,5],[3,6],[4,7],[5,6],[5,7],[6,7],
    [6,8],[7,8],[8,9],
    [0,5],[1,5],[2,5],
    [3,8],[4,8],[1,4],[2,3]
  ];

/* Layer 2: Tree-of-Life scaffold — 10 nodes, 22 paths */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  const nodes = [
    [0.5, 0.05],
    [0.25, 0.15], [0.75, 0.15],
    [0.25, 0.3], [0.5, 0.35], [0.75, 0.3],
    [0.25, 0.5], [0.75, 0.5],
    [0.5, 0.6],
    [0.5, 0.8]
  ].map(([x, y]) => [x * w, y * h]);

  const paths = [
    [0,1],[0,2],
    [1,2],[1,3],[1,4],[2,4],[2,5],
    [3,4],[4,5],
    [3,6],[4,6],[4,7],[5,7],
    [6,8],[7,8],
    [6,9],[7,9],
    [8,9],
    [3,5],[1,5],[2,3],[6,7]
  ];

/* Layer 2: Tree-of-Life scaffold — 10 nodes, 22 paths */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  const nodes = [
    [0.5, 0.05],
    [0.25, 0.15], [0.75, 0.15],
    [0.25, 0.3], [0.5, 0.35], [0.75, 0.3],
    [0.25, 0.5], [0.75, 0.5],
    [0.5, 0.6],
    [0.5, 0.8]
  ].map(([x, y]) => [x * w, y * h]);

  const paths = [
    [0,1],[0,2],
    [1,2],[1,3],[1,4],[2,4],[2,5],
    [3,4],[4,5],
    [3,6],[4,6],[4,7],[5,7],
    [6,8],[7,8],
    [6,9],[7,9],
    [8,9],
    [3,5],[1,5],[2,3],[6,7]
  ];

  ctx.save();
  ctx.strokeStyle = edgeColor;
  ctx.lineWidth = 1;

  edges.forEach(([a, b]) => {
    const [ax, ay] = nodes[a];
    const [bx, by] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(ax * w, ay * h);
    ctx.lineTo(bx * w, by * h);
    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x * w, y * h, w / NUM.NINETYNINE * 2, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/* Layer 3: Fibonacci curve ------------------------------------------------- */
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci curve: logarithmic spiral sampling 144 points.
     ND-safe: static polyline, no highlight. */
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.ONEFORTYFOUR;
  const scale = Math.min(w, h) / NUM.TWENTYTWO;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();


  edges.forEach(([a, b]) => {
    const [ax, ay] = nodes[a];
    const [bx, by] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(ax * w, ay * h);
    ctx.lineTo(bx * w, by * h);
: Tree-o/* Layer 2: Tree-of-Life scaffold — 10 nodes, 22 paths */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  const nodes = [
    [0.5, 0.05],
    [0.25, 0.15], [0.75, 0.15],
    [0.25, 0.3], [0.5, 0.35], [0.75, 0.3],
    [0.25, 0.5], [0.75, 0.5],
    [0.5, 0.6],
    [0.5, 0.8]
  ].map(([x, y]) => [x * w, y * h]);

  const paths = [
    [0,1],[0,2],
    [1,2],[1,3],[1,4],[2,4],[2,5],
    [3,4],[4,5],
    [3,6],[4,6],[4,7],[5,7],
    [6,8],[7,8],
    [6,9],[7,9],
    [8,9],
    [3,5],[1,5],[2,3],[6,7]
  ];

  ctx.save();
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
>>>>>>>+origin/codex/up
});

  ctx.fillStyle = nodeColor;
  nodes  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x * w, y * h, w / NUM.NINETYNINE * 2, 0, Math.PI * 2);
>>>>>>>+main
Math.min  const r = Math.min(w, h) / NUM.TWENTYTWO;
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
>>>>>>>+origin/codex/up
;
>>>>>>> main
  ctx.restore();
}

<<<<<<< main
/* Laye/* Layer 3: Fibonacci curve ------------------------------------------------- */
function drawFibonacci(ctx, w, h, color, NUM) {
<<<<<<< codex/establish-full-stack-web-covenant
  const samples = NUM.ONEFORTYFOUR;          // 144 samples
  const phi = (1 + Math.sqrt(5)) / 2;
  const scale = Math.min(w, h) / NUM.THIRTYTHREE;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * NUM.ELEVEN;
    const r = scale * Math.pow(phi, t / NUM.THREE);
    const angle = t;
    const x = w / 2 + r * Math.cos(angle);
    const y = h / 2 + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.restore();
  /* Fibonacci curve: logarithmic spiral sampling 144 points.
     ND-safe: static polyline, no highlight. */
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.ONEFORTYFOUR;
  const scale = Math.min(w, h) / NUM.TWENTYTWO;

Fibonacc/* Layer 3: Fibonacci curve — static logarithmic spiral */
function drawFibonacci(ctx, w, h, color, NUM) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const samples = NUM.ONEFORTYFOUR;
  const scale = Math.min(w, h) / NUM.THIRTYTHREE;
  const cx = w / 2;
  const cy = h / 2;
>>>>>>>+origin/codex/up
rokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (l
>>>>>>> main
  for (let i = 0; i <= steps; i++) {
    const theta = i * (Math.PI / NUM.ELEVEN);
    const r = scale * Math.pow(phi, theta / (Math.PI * 2));
    const x = w / 2 + r * Math.cos(theta);
    const y = h / 2 + r * Math.sin(theta);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }

<<<<<<< codex/define-art-standards-in-codex-144-99-yj95r6
  ctx.stroke();
  ctx.restore();
}

 0; i <=  for (let i = 0; i <= samples; i++) {
    const theta = i * (Math.PI / NUM.ELEVEN);
    const r = scale * Math.pow(phi, theta / Math.PI);
    const x = cx + Math.cos(theta) * r;
    const y = cy - Math.sin(theta) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
>>>>>>>+origin/codex/up
restore();
>>>>>>> main
}

>>>>>>> main
/* Layer 4: Double-helix lattice ------------------------------------------- */
function drawHelix(ctx, w, h, colors, NUM) {
<<<<<<< codex/establish-full-stack-web-covenant
  /* Double-helix lattice: two static strands with cross rungs.
     ND-safe: even spacing, no motion. */
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;

<<<<<<< codex/define-art-standards-in-codex-144-99-yj95r6
/* Layer 4: Double-helix lattice — two static strands with rungs */
function drawHelix(ctx, w, h, colors, NUM) {
  const amp = h / NUM.NINE;       // gentle amplitude
  const waves = NUM.ELEVEN;       // helix turns
  const steps = NUM.NINETYNINE;   // sampling
  ctx.save();
  ctx.lineWidth = 2;

  // strand A
  ctx.strokeStyle = colors.a;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h / 2 + Math.sin(t * waves * 2 * Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B (phase shift π)
  ctx.strokeStyle = colors.b;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h / 2 + Math.sin(t * waves * 2 * Math.PI + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // cross rungs
  // rungs
  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = t * w;
    const phase = t * waves * 2 * Math.PI;
    const y1 = h / 2 + Math.sin(phase) * amp;
    const y2 = h / 2 + Math.sin(phase + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }

  ctx.restore();
}
/* La/* Layer 2: Tree-of-Life scaffold ------------------------------------------ */
>>>>>>> main
function drawTree(ctx, w, h, edgeColor, nodeColor, NUM) {
  /* Tree-of-Life: ten nodes and twenty-two paths.
     ND-safe: static layout with soft strokes and filled nodes. */
  const nodes = [
    [0.5, 0.1], [0.7, 0.2], [0.3, 0.2],
    [0.75, 0.5], [0.25, 0.5], [0.5, 0.55],
    [0.8, 0.8], [0.2, 0.8], [0.5, 0.85], [0.5, 0.95]
  ];

  const edges = [
    [0,1],[0,2],[1,2],
    [1,3],[2,4],[3,4],
    [3,5],[4,5],[3,6],[4,7],[5,6],[5,7],[6,7],
    [6,8],[7,8],[8,9],
    [0,5],[1,5],[2,5],
    [3,8],[4,8],[1,4],[2,3]
  ];

  ctx.save();
  ctx.strokeStyle = edgeColor;
  ctx.lineWidth = 1;
<<<<<<< codex/define-art-standards-in-codex-144-99-yj95r6

  edges.forEach(([a, b]) => {
    const [ax, ay] = nodes[a];
    const [bx, by] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(ax * w, ay * h);
    ctx.lineTo(bx * w, by * h);
    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x * w, y * h, w / NUM.NINETYNINE * 2, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/* Layer 3: Fibonacci curve ------------------------------------------------- */
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci curve: logarithmic spiral sampling 144 points.
     ND-safe: static polyline, no highlight. */
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.ONEFORTYFOUR;
  const scale = Math.min(w, h) / NUM.TWENTYTWO;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();


  edges.forEach(([a, b]) => {
    const [ax, ay] = nodes[a];
    const [bx, by] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(ax * w, ay * h);
    ctx.lineTo(bx * w, by * h);
: Tree-o/* Layer 2: Tree-of-Life scaffold — 10 nodes, 22 paths */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
  const nodes = [
    [0.5, 0.05],
    [0.25, 0.15], [0.75, 0.15],
    [0.25, 0.3], [0.5, 0.35], [0.75, 0.3],
    [0.25, 0.5], [0.75, 0.5],
    [0.5, 0.6],
    [0.5, 0.8]
  ].map(([x, y]) => [x * w, y * h]);

  const paths = [
    [0,1],[0,2],
    [1,2],[1,3],[1,4],[2,4],[2,5],
    [3,4],[4,5],
    [3,6],[4,6],[4,7],[5,7],
    [6,8],[7,8],
    [6,9],[7,9],
    [8,9],
    [3,5],[1,5],[2,3],[6,7]
  ];

  ctx.save();
  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
>>>>>>>+origin/codex/up
});

  ctx.fillStyle = nodeColor;
  nodes  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x * w, y * h, w / NUM.NINETYNINE * 2, 0, Math.PI * 2);
>>>>>>>+main
Math.min  const r = Math.min(w, h) / NUM.TWENTYTWO;
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
>>>>>>>+origin/codex/up
;
>>>>>>> main
  ctx.restore();
}

<<<<<<< main
/* Laye/* Layer 3: Fibonacci curve ------------------------------------------------- */
function drawFibonacci(ctx, w, h, color, NUM) {
<<<<<<< codex/establish-full-stack-web-covenant
  const samples = NUM.ONEFORTYFOUR;          // 144 samples
  const phi = (1 + Math.sqrt(5)) / 2;
  const scale = Math.min(w, h) / NUM.THIRTYTHREE;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * NUM.ELEVEN;
    const r = scale * Math.pow(phi, t / NUM.THREE);
    const angle = t;
    const x = w / 2 + r * Math.cos(angle);
    const y = h / 2 + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.restore();
  /* Fibonacci curve: logarithmic spiral sampling 144 points.
     ND-safe: static polyline, no highlight. */
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.ONEFORTYFOUR;
  const scale = Math.min(w, h) / NUM.TWENTYTWO;

Fibonacc/* Layer 3: Fibonacci curve — static logarithmic spiral */
    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  const r = Math.min(w, h) / NUM.TWENTYTWO;
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  const r = Math.min(w, h) / NUM.TWENTYTWO;
  nodes.forEach(([x,y]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/* Layer 3: Fibonacci curve — static logarithmic spiral */
function drawFibonacci(ctx, w, h, color, NUM) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const samples = NUM.ONEFORTYFOUR;
  const scale = Math.min(w, h) / NUM.THIRTYTHREE;
  const cx = w / 2;
  const cy = h / 2;
>>>>>>>+origin/codex/up
rokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (l
>>>>>>> main
  for (let i = 0; i <= steps; i++) {
    const theta = i * (Math.PI / NUM.ELEVEN);
    const r = scale * Math.pow(phi, theta / (Math.PI * 2));
    const x = w / 2 + r * Math.cos(theta);
    const y = h / 2 + r * Math.sin(theta);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }

<<<<<<< codex/define-art-standards-in-codex-144-99-yj95r6
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= samples; i++) {
    const theta = i * (Math.PI / NUM.ELEVEN);
    const r = scale * Math.pow(phi, theta / Math.PI);
    const x = cx + Math.cos(theta) * r;
    const y = cy - Math.sin(theta) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

 0; i <=  for (let i = 0; i <= samples; i++) {
    const theta = i * (Math.PI / NUM.ELEVEN);
    const r = scale * Math.pow(phi, theta / Math.PI);
    const x = cx + Math.cos(theta) * r;
    const y = cy - Math.sin(theta) * r;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
>>>>>>>+origin/codex/up
restore();
>>>>>>> main
}

>>>>>>> main
/* Layer 4: Double-helix lattice ------------------------------------------- */
function drawHelix(ctx, w, h, colors, NUM) {
<<<<<<< codex/establish-full-stack-web-covenant
  /* Double-helix lattice: two static strands with cross rungs.
     ND-safe: even spacing, no motion. */
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;

<<<<<<< codex/define-art-standards-in-codex-144-99-yj95r6
/* Layer 4: Double-helix lattice — two static strands with rungs */
function drawHelix(ctx, w, h, colors, NUM) {
  const amp = h / NUM.NINE;       // gentle amplitude
  const waves = NUM.ELEVEN;       // helix turns
  const steps = NUM.NINETYNINE;   // sampling
  ctx.save();
  ctx.lineWidth = 2;

  // strand A
  ctx.strokeStyle = colors.a;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h / 2 + Math.sin(t * waves * 2 * Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B (phase shift π)
  ctx.strokeStyle = colors.b;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h / 2 + Math.sin(t * waves * 2 * Math.PI + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // cross rungs
  // rungs
  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = t * w;
    const phase = t * waves * 2 * Math.PI;
    const y1 = h / 2 + Math.sin(phase) * amp;
    const y2 = h / 2 + Math.sin(phase + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }

  ctx.restore();
}
