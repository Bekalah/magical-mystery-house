/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 sephirot nodes + 22 paths)
    3) Fibonacci curve (logarithmic spiral polyline)
    4) Double-helix lattice (two phase-shifted strands)

  All drawing routines are pure and run exactly once. No animation and no external dependencies.
*/

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Layer order preserves depth without motion (ND-safe rationale)
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, { path: palette.layers[1], node: palette.layers[2] }, NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, { strandA: palette.layers[4], strandB: palette.layers[5], rung: palette.ink }, NUM);

  ctx.restore();
}

/* Layer 1: Vesica field ---------------------------------------------------- */
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: calm outlines from overlapping circles.
     ND-safe: thin strokes, ample spacing, static grid. */
  const baseRadius = Math.min(w, h) / NUM.THREE; // sacred triad scaling
  const step = baseRadius / NUM.SEVEN;           // septenary spacing controls density

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  for (let y = baseRadius; y < h; y += step * NUM.NINE) {
    for (let x = baseRadius; x < w; x += step * NUM.NINE) {
      ctx.beginPath();
      ctx.arc(x - step, y, baseRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x + step, y, baseRadius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.restore();
}

/* Layer 2: Tree-of-Life scaffold ------------------------------------------- */
function drawTree(ctx, w, h, colors, NUM) {
  /* Tree-of-Life: 10 nodes with 22 connective paths.
     ND-safe: static composition, balanced spacing, gentle line weights. */
  const normalizedNodes = [
    [0.50, 0.05], // Keter
    [0.65, 0.18], // Chokmah
    [0.35, 0.18], // Binah
    [0.70, 0.35], // Chesed
    [0.30, 0.35], // Geburah
    [0.50, 0.48], // Tiphereth
    [0.70, 0.64], // Netzach
    [0.30, 0.64], // Hod
    [0.50, 0.78], // Yesod
    [0.50, 0.92]  // Malkuth
  ];

  const nodes = normalizedNodes.map(([x, y]) => [x * w, y * h]);

  const paths = [
    [0, 1], [0, 2], [0, 5],
    [1, 2], [1, 3], [1, 5],
    [2, 4], [2, 5],
    [3, 5], [3, 6], [3, 8],
    [4, 5], [4, 7], [4, 8],
    [5, 6], [5, 7], [5, 8],
    [6, 8], [6, 9],
    [7, 8], [7, 9],
    [8, 9]
  ];

  ctx.save();
  ctx.strokeStyle = colors.path;
  ctx.lineWidth = 1;

  paths.forEach(([a, b]) => {
    const [x1, y1] = nodes[a];
    const [x2, y2] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  ctx.fillStyle = colors.node;
  const nodeRadius = Math.min(w, h) / NUM.TWENTYTWO; // ties to 22 paths

  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/* Layer 3: Fibonacci curve ------------------------------------------------- */
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci spiral: static logarithmic spiral sampled at 144 points.
     ND-safe: single stroke, no motion or flashing. */
  const phi = (1 + Math.sqrt(5)) / 2;
  const samples = NUM.ONEFORTYFOUR;           // 144 lattice points
  const scale = Math.min(w, h) / NUM.THIRTYTHREE; // gentle amplitude referencing 33 spine
  const cx = w / 2;
  const cy = h / 2;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i <= samples; i++) {
    const theta = (i / samples) * NUM.ELEVEN * Math.PI; // 11 turns for balance
    const radius = scale * Math.pow(phi, theta / (2 * Math.PI));
    const x = cx + Math.cos(theta) * radius;
    const y = cy - Math.sin(theta) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
  ctx.restore();
}

/* Layer 4: Double-helix lattice ------------------------------------------- */
function drawHelix(ctx, w, h, colors, NUM) {
  /* Double-helix: paired sine waves with 33 static cross rungs.
     ND-safe: even spacing, no oscillation over time, readable contrast. */
  const amplitude = h / NUM.NINE;              // ternary harmony softened by ninefold division
  const waves = NUM.ELEVEN;                    // 11 helical turns across width
  const steps = NUM.NINETYNINE;                // 99 samples along each strand
  const centerY = h / 2;

  ctx.save();
  ctx.lineWidth = 2;

  // Strand A
  ctx.strokeStyle = colors.strandA;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = centerY + Math.sin(t * waves * Math.PI * 2) * amplitude;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Strand B (phase shifted by pi)
  ctx.strokeStyle = colors.strandB;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * w;
    const y = centerY + Math.sin(t * waves * Math.PI * 2 + Math.PI) * amplitude;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Cross rungs referencing 33 spine
  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  for (let i = 0; i <= NUM.THIRTYTHREE; i++) {
    const t = i / NUM.THIRTYTHREE;
    const x = t * w;
    const phase = t * waves * Math.PI * 2;
    const y1 = centerY + Math.sin(phase) * amplitude;
    const y2 = centerY + Math.sin(phase + Math.PI) * amplitude;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }

  ctx.restore();
}
