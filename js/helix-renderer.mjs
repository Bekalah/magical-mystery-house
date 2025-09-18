/**
 * Render a static, layered sacred-geometry composition into a Canvas 2D context.
 *
 * Draws four depth-ordered layers onto the provided canvas context: a vesica-field
 * of overlapping circles, a Tree-of-Life scaffold (edges then nodes), a
 * Fibonacci spiral, and a double-helix lattice (two strands with cross-rungs).
 * The function saves and restores the canvas state and fills the background
 * with palette.bg before drawing.
 *
 * If `ctx` is falsy the function returns immediately and performs no drawing.
 *
 * @param {CanvasRenderingContext2D} ctx - Destination 2D drawing context.
 * @param {Object} opts - Rendering options.
 * @param {number} opts.width - Canvas width in pixels.
 * @param {number} opts.height - Canvas height in pixels.
 * @param {Object} opts.palette - Color palette; expected to contain `bg`, `ink`,
 *   and an optional `layers` array. Missing entries in `palette.layers` are
 *   filled with `palette.ink` before use.
 * @param {Object} opts.NUM - Numeric constants used to parameterize geometry.
 */

export function renderHelix(ctx, { width, height, palette, NUM }) {
  if (!ctx) {
    return;
  }

  const layers = ensureLayers(palette.layers, palette.ink);

  ctx.save();
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Layer order preserves visual depth without animation.
  drawVesica(ctx, width, height, layers[0], NUM);
  drawTree(ctx, width, height, layers[1], layers[2], NUM);
  drawFibonacci(ctx, width, height, layers[3], NUM);
  drawHelix(ctx, width, height, { a: layers[4], b: layers[5], rung: palette.ink }, NUM);

  ctx.restore();
}

/**
 * Produce a normalized 6-element color layer array, filling any missing entries with a fallback.
 *
 * Given an optional array of layer values, returns a new array of length 6 where each index
 * contains layerList[i] if truthy, otherwise the provided fallback. Does not mutate the input.
 *
 * @param {Array<any>} [layerList=[]] - Source list of layer values (may be shorter than 6).
 * @param {any} fallback - Value to use for any missing or falsy layer entries.
 * @return {Array<any>} A new 6-element array of resolved layer values.
 */
function ensureLayers(layerList = [], fallback) {
  const required = 6;
  const resolved = [];
  for (let i = 0; i < required; i++) {
    resolved[i] = layerList[i] || fallback;
  }
  return resolved;
}

/**
 * Render a Vesica-style field: a grid of overlapping stroked circles.
 *
 * Draws pairs of thin, semi-transparent circle outlines across the canvas area,
 * producing a repeated vesica pattern. Circle radius is computed from the
 * smaller canvas dimension (min(width, height) / NUM.THREE); horizontal
 * offset and vertical/horizontal stride are derived from NUM.SEVEN and NUM.NINE.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {string} color - Stroke color used for the circle outlines.
 * @param {object} NUM - Numeric constants object (expects at least THREE, SEVEN, NINE).
 */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin strokes, gentle overlap grid referencing triadic and septenary steps.
  const radius = Math.min(w, h) / NUM.THREE;
  const offset = radius / NUM.SEVEN;
  const stride = offset * NUM.NINE;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.45;

  for (let y = radius; y <= h + radius; y += stride) {
    for (let x = radius; x <= w + radius; x += stride) {
      drawCircle(ctx, x - offset, y, radius);
      drawCircle(ctx, x + offset, y, radius);
    }
  }

  ctx.restore();
}

/**
 * Draw a stroked circle outline at the given center and radius using the canvas' current stroke style.
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context.
 * @param {number} cx - X coordinate of the circle center in canvas pixels.
 * @param {number} cy - Y coordinate of the circle center in canvas pixels.
 * @param {number} r - Radius of the circle in canvas pixels.
 */
function drawCircle(ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
}

/**
 * Render a static Tree-of-Life scaffold: 10 filled nodes and 22 connecting edges.
 *
 * Draws a non-animated network of soft-stroked edges and filled circular nodes
 * positioned proportionally to the provided width and height. Edge color is used
 * for the connective lines; node color fills the circular anchors. Node radius
 * is derived from NUM.TWENTYTWO. Canvas state is saved and restored by this function.
 *
 * @param {string} edgeColor - Stroke color used for the edges.
 * @param {string} nodeColor - Fill color used for the nodes.
 * @param {object} NUM - Numeric constants object; must include TWENTYTWO (used to size node radius).
 */
function drawTree(ctx, w, h, edgeColor, nodeColor, NUM) {
  /* Tree-of-Life: static 10 node scaffold with 22 connective paths.
     ND-safe: soft strokes, filled nodes for focus anchors. */
  const nodes = [
    [0.5, 0.08],
    [0.35, 0.2],
    [0.65, 0.2],
    [0.25, 0.38],
    [0.75, 0.38],
    [0.5, 0.46],
    [0.32, 0.64],
    [0.68, 0.64],
    [0.5, 0.72],
    [0.5, 0.9]
  ].map(([nx, ny]) => [nx * w, ny * h]);

  const edges = [
    [0, 1], [0, 2], [1, 2],
    [1, 3], [1, 5], [2, 4], [2, 5],
    [3, 4], [3, 5], [4, 5],
    [3, 6], [5, 6], [4, 7], [5, 7], [6, 7],
    [6, 8], [7, 8], [8, 9],
    [3, 8], [4, 8], [1, 4], [2, 3]
  ]; // 22 paths honoring tarot majors.

  ctx.save();
  ctx.strokeStyle = edgeColor;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.6;
  edges.forEach(([a, b]) => {
    const [x1, y1] = nodes[a];
    const [x2, y2] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  ctx.fillStyle = nodeColor;
  ctx.globalAlpha = 0.85;
  const radius = Math.min(w, h) / (NUM.TWENTYTWO * 2);
  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/**
 * Draws a static Fibonacci (golden-ratio) spiral centered in the canvas.
 *
 * The function samples NUM.ONEFORTYFOUR+1 points along an expanding spiral whose
 * radius grows by powers of the golden ratio (phi) and traces a continuous stroked path.
 *
 * @param {CanvasRenderingContext2D} ctx - 2D canvas rendering context to draw into.
 * @param {number} w - Canvas width in pixels; used to compute the spiral center.
 * @param {number} h - Canvas height in pixels; used to compute the spiral center.
 * @param {string|CanvasGradient|CanvasPattern} color - Stroke style for the spiral.
 * @param {Object} NUM - Numeric constants object. Required properties used: NINETYNINE, ELEVEN, TWENTYTWO, ONEFORTYFOUR.
 */
function drawFibonacci(ctx, w, h, color, NUM) {
  // ND-safe: static spiral with consistent stroke weight and no motion.
  const cx = w / 2;
  const cy = h / 2;
  const base = Math.min(w, h) / NUM.NINETYNINE;
  const phi = (1 + Math.sqrt(5)) / 2;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.75;
  ctx.beginPath();

  for (let i = 0; i <= NUM.ONEFORTYFOUR; i++) {
    const angle = (i / NUM.ELEVEN) * Math.PI;
    const radius = base * Math.pow(phi, i / NUM.TWENTYTWO);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
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
 * Draws a static double-helix lattice (two sinusoidal strands with cross rungs) onto a 2D canvas.
 *
 * Renders two entwined strand paths and a set of vertical cross-rungs between them. Strand geometry is
 * deterministic and parameterized by the supplied NUM constants so the result is static (no animation).
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {{a: string, b: string, rung: string}} colors - Colors used for the helix: `a` for strand A, `b` for strand B, and `rung` for cross-connections.
 * @param {Object} NUM - Numeric constants object used to control cycles, sampling and counts (e.g., NUM.NINE, NUM.THREE, NUM.ONEFORTYFOUR, NUM.THIRTYTHREE).
 */
function drawHelix(ctx, w, h, colors, NUM) {
  /* Double helix: two static strands with 33 rungs.
     ND-safe: no motion; amplitude trimmed for calm breathing space. */
  const cycles = NUM.NINE; // nine rhythm waves across width
  const freq = (Math.PI * 2 * cycles) / w;
  const amplitude = h / NUM.THREE;
  const offsetY = h / 2;
  const phase = Math.PI / NUM.ELEVEN;
  const strandCount = NUM.ONEFORTYFOUR;
  const stepX = w / strandCount;

  ctx.save();
  ctx.lineWidth = 2;

  // Strand A
  ctx.strokeStyle = colors.a;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  for (let i = 0; i <= strandCount; i++) {
    const x = i * stepX;
    const y = helixY(x, freq, amplitude, offsetY, 0, 1);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Strand B with slight amplitude trim for layered depth
  ctx.strokeStyle = colors.b;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  for (let i = 0; i <= strandCount; i++) {
    const x = i * stepX;
    const y = helixY(x, freq, amplitude, offsetY, phase, 0.85);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Cross rungs unify strands at 33 points.
  ctx.strokeStyle = colors.rung;
  ctx.globalAlpha = 0.35;
  const rungCount = NUM.THIRTYTHREE;
  for (let i = 0; i <= rungCount; i++) {
    const x = (i / rungCount) * w;
    const y1 = helixY(x, freq, amplitude, offsetY, 0, 1);
    const y2 = helixY(x, freq, amplitude, offsetY, phase, 0.85);
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Compute the vertical (y) coordinate for a point on a sinusoidal helix.
 *
 * @param {number} x - Horizontal coordinate or sample position.
 * @param {number} freq - Angular frequency (controls horizontal wavelength).
 * @param {number} amplitude - Peak displacement of the sine wave.
 * @param {number} offsetY - Vertical offset added to the sine result.
 * @param {number} phase - Phase shift in radians.
 * @param {number} scale - Multiplicative scale applied to the sine term.
 * @return {number} The computed y coordinate.
 */
function helixY(x, freq, amplitude, offsetY, phase, scale) {
  return offsetY + Math.sin(freq * x + phase) * amplitude * scale;
}
