/**
 * Render the complete ND-safe layered composition onto the provided canvas.
 *
 * Clears the drawing surface to the palette background then draws four ordered
 * layers: a vesica field, the Tree-of-Life scaffold, a 144-sample Fibonacci
 * curve, and a double-helix lattice with two strands and cross-rungs.
 *
 * @param {Object} opts - Rendering options.
 * @param {number} opts.width - Canvas width in pixels.
 * @param {number} opts.height - Canvas height in pixels.
 * @param {Object} opts.palette - Color data; expected shape includes `bg`, `layers` (array of layer colors), and `ink`.
 * @param {Object} opts.NUM - Numeric constants/config used by the layer renderers.
 */

export function renderHelix(ctx, { width, height, palette, NUM }) {
  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, {
    path: palette.layers[1],
    node: palette.layers[2]
  }, NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, {
    strandA: palette.layers[4],
    strandB: palette.layers[5],
    rung: palette.ink
  }, NUM);

  ctx.restore();
}

/**
 * Render a calm vesica (overlapping-circle) lattice onto a canvas.
 *
 * Draws a grid of paired circles across the canvas using a thin, semi-transparent stroke
 * intended for low-distraction (ND-safe) visuals.
 *
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {string} color - CSS color used for circle strokes.
 * @param {Object} NUM - Numeric constants object (e.g., NUM.THREE, NUM.SEVEN, NUM.NINE) used to scale radius and spacing.
 */
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: calm lattice of overlapping circles.
     ND-safe: thin strokes and wide spacing prevent overstimulation. */
  const r = Math.min(w, h) / NUM.THREE;      // triadic radius anchor
  const step = r / NUM.SEVEN;                // septenary spacing factor

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.75;

  for (let y = r; y <= h - r / 2; y += step * NUM.NINE) {
    for (let x = r; x <= w - r / 2; x += step * NUM.NINE) {
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

/**
 * Render the Tree-of-Life scaffold: 10 positioned nodes connected by 22 edges onto the given canvas context.
 *
 * Draws a deterministic, centered layout of the ten sephirot (nodes) scaled to the provided width and height,
 * then strokes the fixed set of interconnecting edges. Node fill color and edge stroke color are taken from
 * the provided colors object.
 *
 * @param {Object} colors - Color roles used when drawing.
 * @param {string} colors.path - Stroke color for the connecting edges.
 * @param {string} colors.node - Fill color for the nodes.
 */
function drawTree(ctx, w, h, colors, NUM) {
  /* Tree-of-Life: 10 nodes linked by 22 connective paths.
     ND-safe: static placement, gentle strokes, high legibility. */
  const baseNodes = [
    [0.5, 0.05],  // Keter
    [0.7, 0.18],  // Chokmah
    [0.3, 0.18],  // Binah
    [0.75, 0.36], // Chesed
    [0.25, 0.36], // Geburah
    [0.5, 0.52],  // Tiphareth
    [0.7, 0.66],  // Netzach
    [0.3, 0.66],  // Hod
    [0.5, 0.8],   // Yesod
    [0.5, 0.93]   // Malkuth
  ];
  const nodes = baseNodes.map(([x, y]) => [x * w, y * h]);

  const edges = [
    [0, 1], [0, 2],
    [1, 2], [1, 3], [1, 5], [1, 6],
    [2, 4], [2, 5], [2, 7],
    [3, 4], [3, 5], [3, 6],
    [4, 5], [4, 7],
    [5, 6], [5, 7], [5, 8],
    [6, 7], [6, 8], [6, 9],
    [7, 8],
    [8, 9]
  ];

  ctx.save();
  ctx.strokeStyle = colors.path;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.9;

  edges.forEach(([a, b]) => {
    const [ax, ay] = nodes[a];
    const [bx, by] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  });

  ctx.fillStyle = colors.node;
  const nodeRadius = Math.min(w, h) / (NUM.NINETYNINE / 2);
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/**
 * Render a Fibonacci-style logarithmic spiral onto the provided canvas context.
 *
 * Generates `NUM.ONEFORTYFOUR` sample points around a center positioned at
 * roughly (w * 0.33, h * 0.72). Radius grows exponentially from a base set
 * by the canvas size and `NUM.TWENTYTWO`; angular step is derived from
 * `NUM.ELEVEN`. The computed polyline is stroked with the given color.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {string} color - Stroke color for the spiral.
 * @param {object} NUM - Numeric constants object (expects ONEFORTYFOUR, NINETYNINE, ELEVEN, TWENTYTWO).
 */
function drawFibonacci(ctx, w, h, color, NUM) {
  /* Fibonacci logarithmic spiral: 144 samples expressing gentle growth.
     ND-safe: single static stroke maintains calm focus. */
  const total = NUM.ONEFORTYFOUR;
  const center = [w * 0.33, h * 0.72];
  const baseRadius = Math.min(w, h) / NUM.TWENTYTWO;
  const growth = Math.log(NUM.NINETYNINE) / total; // smooth exponential scaling
  const angleStep = Math.PI / NUM.ELEVEN;

  const points = [];
  for (let i = 0; i < total; i += 1) {
    const theta = i * angleStep;
    const radius = baseRadius * Math.exp(growth * i);
    const x = center[0] + Math.cos(theta) * radius;
    const y = center[1] - Math.sin(theta) * radius;
    points.push([x, y]);
  }

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.85;
  drawPolyline(ctx, points);
  ctx.restore();
}

/**
 * Render a double-helix lattice: two sinusoidal strands plus evenly distributed cross-rungs.
 *
 * Draws two strands generated by buildStrand (phase-shifted by 0 and π) and then connects
 * corresponding sample points with a fixed number of rungs (NUM.THIRTYTHREE). The function
 * saves and restores the canvas state and mutates the provided 2D context's stroke styles,
 * lineWidth, and globalAlpha while drawing.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {{strandA: string, strandB: string, rung: string}} colors - Color values used for the two strands and the cross-rungs.
 * @param {object} NUM - Numerology/config constants object (expects at least NUM.THIRTYTHREE).
 */
function drawHelix(ctx, w, h, colors, NUM) {
  /* Double helix: two offset strands linked by 33 cross rungs.
     ND-safe: static geometry, balanced spacing via numerology constants. */
  const strandA = buildStrand(w, h, NUM, 0);
  const strandB = buildStrand(w, h, NUM, Math.PI);

  ctx.save();
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.9;

  ctx.strokeStyle = colors.strandA;
  drawPolyline(ctx, strandA);
  ctx.strokeStyle = colors.strandB;
  drawPolyline(ctx, strandB);

  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  const rungTotal = NUM.THIRTYTHREE;
  const step = (strandA.length - 1) / (rungTotal - 1);
  for (let i = 0; i < rungTotal; i += 1) {
    const idx = Math.round(i * step);
    const safeIdx = Math.min(idx, strandA.length - 1, strandB.length - 1);
    const [ax, ay] = strandA[safeIdx];
    const [bx, by] = strandB[safeIdx];
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Generate a vertically sampled strand path across the canvas with a sinusoidal horizontal offset.
 *
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {Object} NUM - Numeric constants object; must provide NINETYNINE (samples), TWENTYTWO (amplitude divisor), THIRTYTHREE and ELEVEN (frequency factors).
 * @param {number} phaseShift - Phase offset in radians applied to the sine wave.
 * @return {number[][]} Array of [x, y] points representing the strand, sampled from top to bottom.
 */
function buildStrand(w, h, NUM, phaseShift) {
  const samples = NUM.NINETYNINE;
  const top = h * 0.12;
  const span = h * 0.76;
  const mid = w * 0.5;
  const amplitude = w / NUM.TWENTYTWO;
  const frequency = (Math.PI * 2 * NUM.THIRTYTHREE) / NUM.ELEVEN;

  const points = [];
  for (let i = 0; i < samples; i += 1) {
    const t = i / (samples - 1);
    const y = top + t * span;
    const angle = t * frequency + phaseShift;
    const offset = Math.sin(angle) * amplitude;
    points.push([mid + offset, y]);
  }
  return points;
}

/**
 * Stroke a polyline through an ordered list of 2D points on the given canvas context.
 *
 * Draws a connected path from points[0] through each subsequent [x, y] pair and calls `stroke`.
 * If `points` is not an array or has fewer than two points the function returns without drawing.
 *
 * @param {Array<Array<number>>} points - Ordered list of `[x, y]` coordinate pairs.
 */
function drawPolyline(ctx, points) {
  if (!Array.isArray(points) || points.length < 2) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) {
    const [x, y] = points[i];
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}
