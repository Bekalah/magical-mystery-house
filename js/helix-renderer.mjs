/**
 * Render a static, non-animated multi-layer sacred-geometry composition onto a canvas.
 *
 * Clears the canvas to palette.bg then draws four layers in this fixed order:
 * 1) Vesica field (intersecting circle outlines),
 * 2) Tree-of-Life scaffold (10 nodes + 22 paths),
 * 3) Fibonacci logarithmic spiral,
 * 4) Double-helix lattice (two phase-shifted strands with cross rungs).
 *
 * The function is deterministic and side-effect-limited to drawing on the provided canvas context.
 *
 * @param {object} palette - Color palette used for rendering. Expected shape: { bg: string, layers: string[], ink: string } where `layers` supplies layer stroke colors in the order consumed by the renderer.
 * @param {object} NUM - Numeric constants used for sizing and spacing (e.g., scaling and sample counts).
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

/**
 * Draws a calm, non-animated field of overlapping vesica-style circle outlines.
 *
 * Renders a static grid of paired circles across the canvas using a thin stroke.
 * Circle size and spacing are derived from the provided numeric constants to keep
 * composition proportional to the canvas dimensions.
 *
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {string|CanvasGradient|CanvasPattern} color - Stroke style used for the circle outlines.
 * @param {Object} NUM - Scaling constants object. Expected numeric properties:
 *   - THREE: divisor used to compute the base circle radius (Math.min(w,h) / THREE)
 *   - SEVEN: divisor used to compute the finer step (baseRadius / SEVEN)
 *   - NINE: multiplier used to space grid rows/columns (step * NINE)
 */
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

/**
 * Render a static Tree-of-Life scaffold: 10 nodes connected by 22 paths.
 *
 * Draws a fixed, non-animated arrangement of nodes and connecting lines onto the provided canvas
 * context. Coordinates are computed from a normalized layout scaled to the given width/height.
 * The canvas state is saved and restored; drawing mutates only the provided context.
 *
 * @param {Object} colors - Color map used for rendering. Required properties:
 *   - {string} node - fill color for each node.
 *   - {string} path - stroke color for connecting paths.
 * @param {Object} NUM - Numeric constants used for sizing. This function uses NUM.TWENTYTWO
 *   to compute the node radius (nodeRadius = Math.min(w, h) / NUM.TWENTYTWO).
 */
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

/**
 * Draws a static Fibonacci (logarithmic) spiral centered on the canvas.
 *
 * Renders a single stroked polyline approximating a logarithmic spiral sampled at 144 points
 * (11 turns). The spiral is centered at (w/2, h/2) and scaled from Math.min(w, h).
 * Non-animated — produces a single deterministic stroke.
 *
 * @param {object} NUM - Numeric constants used by the routine. Required fields:
 *   ONEFORTYFOUR (number): sample count (144),
 *   ELEVEN (number): number of half-π multiples used to produce ~11 turns,
 *   THIRTYTHREE (number): divisor used to compute the spiral scale.
 */
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

/**
 * Draws a static double-helix lattice: two phase-shifted sine-wave strands with evenly spaced cross rungs.
 *
 * Renders two stroked polylines (strandA and strandB) that form an 11-turn helix across the canvas width and
 * a set of vertical rungs connecting the strands at 33 evenly spaced positions. The helix is centered
 * vertically and scaled by the provided NUM constants so the result is deterministic and non-animated.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {{strandA: string, strandB: string, rung: string}} colors - Stroke colors for the two strands and the rungs.
 * @param {{NINE: number, ELEVEN: number, NINETYNINE: number, THIRTYTHREE: number}} NUM - Numeric constants used for sizing:
 *   - NINE: divisor used to compute vertical amplitude (amplitude = h / NINE).
 *   - ELEVEN: number of helical turns across the width.
 *   - NINETYNINE: number of sample steps per strand.
 *   - THIRTYTHREE: number of cross-rungs (evenly spaced; 33 used).
 */
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
