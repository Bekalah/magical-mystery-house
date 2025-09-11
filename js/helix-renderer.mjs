/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field – intersecting circles forming a calm grid
    2) Tree-of-Life scaffold – 10 sephirot nodes + 22 paths
    3) Fibonacci curve – logarithmic spiral approximated by polyline
    4) Double-helix lattice – two static strands with 33 cross rungs

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
  /* Vesica field: calm outline grid built from overlapping circles.
     ND-safe: thin lines, generous spacing. */
  const r = Math.min(w, h) / NUM.THREE; // base radius from sacred triad
  const step = r / NUM.SEVEN;           // spacing guided by 7
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

/* Layer 2: Tree-of-Life scaffold */
function drawTree(ctx, w, h, nodeColor, pathColor, NUM) {
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
  ctx.restore();
}

/* Layer 3: Fibonacci curve */
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci spiral: 144 sample points with golden ratio growth.
     ND-safe: soft stroke, no animation. */
  const cx = w * 0.2;  // start near left for spacious curve
  const cy = h * 0.8;
  const points = NUM.ONEFORTYFOUR;
  const phi = (1 + Math.sqrt(5)) / 2; // golden ratio
  const scale = Math.min(w, h) / NUM.THIRTYTHREE;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < points; i++) {
    const angle = i / NUM.TWENTYTWO * Math.PI * 2;
    const radius = scale * Math.pow(phi, i / NUM.TWENTYTWO);
    const x = cx + Math.cos(angle) * radius;
    const y = cy - Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice */
function drawHelix(ctx, w, h, colors, NUM) {
  /* Double helix: two static sine strands with 33 rungs.
     ND-safe: even spacing, no motion. */
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;
  ctx.save();

  // strand A
  ctx.strokeStyle = colors.a;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2*Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // strand B phase shifted
  ctx.strokeStyle = colors.b;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = h/2 + Math.sin(t * waves * 2*Math.PI + Math.PI) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // cross rungs
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
