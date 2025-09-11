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
  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 sephirot + 22 paths)
    3) Fibonacci curve (log spiral polyline)
    4) Double-helix lattice (two phase-shifted strands with rungs)

>>>>>>>+main
>>>>>>> origin/codex/implement-daimon-registry-and-bind-spiral-stages
>>>>>>>+main
  All fu  All functions are pure and render once; no motion or external deps.
*/
>>>>>>>+origin/codex/cr
function renderHelix(ctx, { width, height, palette, NUM }) {
  // Prepare stage
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Layer order preserves depth without motion
  drawVesica(ctx, width, height, palette.layers[0], NUM);
<<<<<<< main
  drawTr  drawTree(ctx, width, height, palette.layers[1], palette.layers[2], NUM);
bonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, palette.layers[4], NUM);
  drawTree(ctx, width, height, palette.layers[1], NUM);
  drawFibonacci(ctx, width, height, palette.layers[2], NUM);
  drawHelix(ctx, width, height,
    palette.layers[3], palette.layers[4], palette.layers[5], NUM);
  // Tre  // Tree uses two colors: nodes and paths
>>>>>>>+main
  // Tre  // Tree uses two colors: nodes and paths
>>>>>>>+origin/codex/cr
ee(ctx, width, height, palette.layers[2], palette.layers[1], NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);

  drawHelix(ctx, width, height, {
    a: palette.layers[4],
    b: palette.layers[5],
    rung: palette.ink
  }, NUM);


  drawHelix(ctx, width, height, palette.layers[4], palette.layers[5], NUM);
<<<<<<< main
>>>>>>>+origin/codex/im
estore();
}

<<<<<<< /* Layer 1: Vesica field */

  ctx.restore();
}

/* Layer 1: Vesica field */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin lines, sparse pattern
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  const r = Math.min(w, h) / NUM.THREE;
  const step = r / NUM.SEVEN;
>>>>>>>+main
// Layer// Layer 1 ---------------------------------------------------------------
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

>>>>>>>+origin/codex/im
ica field: calm outline grid of intersecting circles.
  /* Vesica field: calm outline grid of intersecting circles.
     ND-safe: thin strokes, generous spacing. */
  const r = Math.min(w, h) / NUM.THREE;
  const step = r / NUM.SEVEN;
  ctx.save();
  /* Vesica field: calm outline grid built from overlapping circles.
     ND-safe: thin lines, generous spacing. */
  const r = Math.min(w, h) / NUM.THREE; // base radius from sacred triad
  const step = r / NUM.SEVEN;           // spacing guided by 7
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let y = r; y < h; y += step * NUM.NINE) {
    for (let x = r; x < w; x += step * NUM.NINE) {
<<<<<<< main
      ctx.beginPath(); ctx.arc(x - step, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + step, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x - offset, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x + offset, y, r, 0, Math.PI * 2); ctx.stroke();

    }
  }
  ctx.restore();
}

/* Layer 2: Tree-of-Life scaffold */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
// Layer 2 ---------------------------------------------------------------

function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {

  // Tree-of-Life scaffold: 10 nodes and 22 connective paths.

  /* Tree-of-Life: 10 nodes + 22 paths.
     ND-safe: solid nodes, gentle lines. */

  ctx.save();
  const nodes = [
    [0.5, 0.05],[0.2,0.2],[0.8,0.2],[0.2,0.4],[0.8,0.4],
    [0.5,0.5],[0.2,0.7],[0.8,0.7],[0.5,0.85],[0.5,0.95]
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],[3,6],[4,7],[5,6],[5,7],
    [6,8],[7,8],[8,9],[1,4],[2,3],[1,5],[2,6],[3,8],[4,8],[5,9],[6,9]
  ]; // 22 paths guided by NUM.TWENTYTWO

  const paths = [
    [0,1],[0,2],[1,2],
    [1,3],[2,4],[3,5],[4,5],
    [3,6],[4,7],[5,6],[5,7],
    [6,8],[7,8],[8,9],
    [1,4],[2,3],[1,5],[2,6],
    [3,8],[4,8],[5,9],[6,9]
  ]; // 22 paths (NUM.TWENTYTWO)

  const e = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],[3,6],[4,7],[5,6],[5,7],
    [6,8],[7,8],[8,9],[1,4],[2,3],[1,5],[2,6],[3,8],[4,8],[5,9],[6,9]
  ];

  ctx.strokeStyle = pathColor;
  ctx.lineWidth = 1;
  paths.forEach(([a,b]) => {
// Layer 2 ---------------------------------------------------------------
function drawTree(ctx, w, h, color, NUM) {
  /* Tree-of-Life: 10 nodes with 22 connecting paths.
     ND-safe: solid nodes, gentle lines. */
  const nodes = [
    [0.5,0.05],[0.2,0.2],[0.8,0.2],
    [0.2,0.4],[0.8,0.4],[0.5,0.5],
    [0.2,0.7],[0.8,0.7],[0.5,0.85],[0.5,0.95]
  ];
  const paths = [
    [0,1],[0,2],[1,2],[1,3],[2,4],[3,5],[4,5],
    [3,6],[4,7],[5,6],[5,7],
    [6,8],[7,8],[8,9],[1,4],[2,3],[1,5],[2,6],[3,8],[4,8],[5,9],[6,9]
  ];
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  paths.forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0]*w, nodes[a][1]*h);
    ctx.lineTo(nodes[b][0]*w, nodes[b][1]*h);

    ctx.moveTo(nodes[a][0] * w, nodes[a][1] * h);
    ctx.lineTo(nodes[b][0] * w, nodes[b][1] * h);

    ctx.moveTo(n[a][0]*w, n[a][1]*h);
    ctx.lineTo(n[b][0]*w, n[b][1]*h);

    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  nodes.forEach(([x,y]) => {
  const r = w / NUM.NINETYNINE;
  nodes.forEach(([nx, ny]) => {
  ctx.fillStyle = color;
  const r = w / NUM.NINETYNINE; // small node radius from 99 gates
  nodes.forEach(([nx,ny]) => {
    ctx.beginPath();
    ctx.arc(nx*w, ny*h, r, 0, Math.PI*2);

    ctx.arc(x * w, y * h, NUM.THREE, 0, Math.PI * 2);

    ctx.arc(x*w, y*h, NUM.ELEVEN/NUM.TWENTYTWO*6, 0, Math.PI*2); // gentle radius

    ctx.fill();
  });
  ctx.restore();
}

/* Layer 3: Fibonacci curve */
function drawFibonacci(ctx, w, h, color, NUM) {
<<<<<<< main
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

  /* Fibonacci spiral: static polyline using 144 samples.
     ND-safe: single stroke. */
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
  /* Fibonacci spiral: static logarithmic curve.
     ND-safe: single line, no animation. */
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const phi = (1 + Math.sqrt(5)) / 2;
  const pts = [];
  const scale = Math.min(w, h) / NUM.ONEFORTYFOUR;
  for (let i = 0; i <= NUM.ONEFORTYFOUR; i++) {
    const angle = i * Math.PI / NUM.NINE;
    const radius = scale * Math.pow(phi, angle / Math.PI);
    const x = w / 2 + radius * Math.cos(angle);
    const y = h / 2 + radius * Math.sin(angle);
    pts.push([x, y]);
  }
  ctx.beginPath();
  pts.forEach(([x, y], i) => {
  /* Fibonacci logarithmic spiral approximated by polyline. */
  /* Fibonacci logarithmic spiral approximated by polyline.
     ND-safe: single stroke, no animation. */
  const center = { x: w/NUM.THREE, y: h/NUM.THREE };
  const phi = (1 + Math.sqrt(5)) / 2;
  const turns = NUM.THREE;             // three turns of the spiral
  const segs = NUM.ONEFORTYFOUR;       // 144 sample points
  const scale = Math.min(w, h) / NUM.SEVEN;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= segs; i++) {
    const t = (turns * 2 * Math.PI) * (i / segs);
    const r = Math.pow(phi, t / (2 * Math.PI));
    const x = center.x + scale * r * Math.cos(t);
    const y = center.y + scale * r * Math.sin(t);
    const t = (i / NUM.ONEFORTYFOUR) * NUM.THREE * 2 * Math.PI;
    const r = Math.pow(phi, t / (2*Math.PI));
    const s = Math.min(w,h) / NUM.SEVEN;
    const x = center.x + s * r * Math.cos(t);
    const y = center.y + s * r * Math.sin(t);

    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice */
function drawHelix(ctx, w, h, color, NUM) {
// Layer 4 ---------------------------------------------------------------

function drawHelix(ctx, w, h, colors, NUM) {
  // Static double helix: two sine strands with 33 rungs.
  ctx.save();
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;
  // strand A
  ctx.strokeStyle = colors.a;
=======
function drawHelix(ctx, w, h, strandColor, rungColor, NUM) {
  /* Double-helix lattice: two phase-shifted sine strands with rungs.
     ND-safe: static lines, no flashing. */
  ctx.save();
  const amp = h / NUM.NINE;
  const turns = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;

  // strand A
  ctx.strokeStyle = color;
// Layer 4 ---------------------------------------------------------------
function drawHelix(ctx, w, h, colorA, colorB, rungColor, NUM) {
  /* Double-helix lattice: two static strands with cross rungs.
     ND-safe: no motion, even spacing. */
  const amp = h / NUM.NINE;       // vertical amplitude
  const waves = NUM.ELEVEN;       // number of waves across canvas
  const steps = NUM.NINETYNINE;   // sampling for smoothness
  ctx.save();
  const amp = h / NUM.NINE;
  const steps = NUM.NINETYNINE;
  const turns = NUM.ELEVEN;

  ctx.lineWidth = 2;
  ctx.strokeStyle = strandColor;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h/2 + amp * Math.sin((i/steps) * turns * 2 * Math.PI);
    const y = h / 2 + Math.sin((i / steps) * turns * Math.PI * 2) * amp;
function drawHelix(ctx, w, h, color, NUM) {
  /* Double-helix lattice: two static strands with cross rungs. */
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  // strand A
  ctx.strokeStyle = colorA;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2*Math.PI) * amp;

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
=======
    const y = h/2 + amp * Math.sin((i/steps) * turns * Math.PI * 2);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B (phase π)
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h/2 + amp * Math.sin((i/steps) * turns * 2 * Math.PI + Math.PI);
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h / 2 + Math.sin((i / steps) * turns * Math.PI * 2 + Math.PI) * amp;
  // strand B
  // strand B (phase-shifted)
  ctx.strokeStyle = colorB;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2*Math.PI + Math.PI) * amp;
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
  // rungs
  ctx.strokeStyle = rungColor;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = t * w;
    const y1 = h/2 + Math.sin(t * waves * 2*Math.PI) * amp;
    const y2 = h/2 + Math.sin(t * waves * 2*Math.PI + Math.PI) * amp;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke();

  }

  ctx.restore();
}


