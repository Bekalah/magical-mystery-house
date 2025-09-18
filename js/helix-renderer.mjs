/**
 * Render a static, layered sacred-geometry composition onto a Canvas 2D context.
 *
 * Draws four non-animated layers in fixed depth order: Vesica field (circles), Tree-of-Life scaffold (edges and filled nodes),
 * a Fibonacci/logarithmic spiral, and a double-helix lattice with cross-rungs. If `ctx` is falsy the function returns without drawing.
 * Missing palette layer entries are filled from the ink fallback before rendering; the final layer-to-color mapping is:
 *  - layers[0] → Vesica field
 *  - layers[1] → Tree-of-Life edges
 *  - layers[2] → Tree-of-Life nodes
 *  - layers[3] → Fibonacci spiral
 *  - layers[4] → Helix strand A
 *  - layers[5] → Helix strand B
 *  Helix rungs use the palette ink color as a fallback.
 *
 * @param {Object} options - Rendering options.
 * @param {number} options.width - Canvas width in pixels.
 * @param {number} options.height - Canvas height in pixels.
 * @param {Object} options.palette - Palette with at least `bg`, `ink`, and an optional `layers` array of colors.
 * @param {Object} options.NUM - Numeric constants object used for deterministic layout/scaling.
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
 * Ensure an array of six layer values by filling any missing entries with a fallback.
 *
 * Returns a new 6-element array where each index contains layerList[i] when truthy,
 * otherwise the provided fallback.
 *
 * @param {Array} layerList - Source array of layer values (may be shorter than six).
 * @param {*} fallback - Value to use for any missing or falsy entries.
 * @return {Array} A 6-element array of resolved layer values.
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
 * Render a grid of overlapping vesica-style circles across the canvas.
 *
 * Draws two-offset circles at a regular lattice to form a Vesica Piscis field.
 * Circle radius, horizontal offset, and grid stride are derived from the canvas
 * size and numeric constants in `NUM` so spacing scales with the surface.
 *
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {string} color - Stroke color (any valid CSS color).
 * @param {object} NUM - Numeric constants object (uses NUM.THREE, NUM.SEVEN, NUM.NINE).
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
 * Draws and strokes a circular outline on a 2D canvas context.
 *
 * Begins a new path, creates a full-circle arc at (cx, cy) with radius r, and strokes the path.
 *
 * @param {number} cx - X coordinate of the circle center in pixels.
 * @param {number} cy - Y coordinate of the circle center in pixels.
 * @param {number} r - Radius of the circle in pixels.
 */
function drawCircle(ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
}

/**
 * Render a static "Tree of Life" scaffold: 10 filled nodes connected by 22 edges.
 *
 * Draws a fixed network of ten nodes positioned relative to the canvas size and
 * renders semi-transparent stroked edges beneath slightly more opaque filled
 * node circles. Intended as a non-animated, depth-layered scaffold for
 * compositional artwork.
 *
 * @param {number} w - Canvas width used to scale node positions.
 * @param {number} h - Canvas height used to scale node positions.
 * @param {string} edgeColor - Stroke color for the scaffold edges.
 * @param {string} nodeColor - Fill color for the node anchors.
 * @param {object} NUM - Numeric constants object; used here to derive node radius (NUM.TWENTYTWO).
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
 * Render a static logarithmic "Fibonacci" spiral centered on the canvas.
 *
 * Draws a deterministic, non-animated logarithmic spiral (Fibonacci-like growth using the golden ratio)
 * sampled at 145 points and stroked with the provided color. The spiral is centered at (w/2, h/2),
 * with radial growth scaled to the smaller canvas dimension. The routine is ND-safe (no time-based
 * or random variation) and leaves canvas state restored after drawing.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {string} color - Stroke color used for the spiral.
 * @param {object} NUM - Numeric constants object used for sampling and scale factors.
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
 * Draws a static double-helix lattice: two sinusoidal strands with regularly spaced cross-rungs.
 *
 * Renders two non-animated helix strands across the canvas width and draws vertical rungs connecting
 * them at fixed intervals. Drawing is depth-ordered and uses canvas state (save/restore); the function
 * has no return value and draws directly into the provided 2D context.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context to draw into.
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {{a:string,b:string,rung:string}} colors - Stroke colors for strand A (`a`), strand B (`b`), and the rungs (`rung`).
 * @param {Object} NUM - Numeric constants object used to derive layout (e.g., NUM.NINE, NUM.THREE, NUM.ONEFORTYFOUR, NUM.THIRTYTHREE, NUM.ELEVEN).
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
 * Compute the vertical coordinate of a sine-based helix at a given horizontal position.
 * @param {number} x - Horizontal position (or parametric input).
 * @param {number} freq - Angular frequency applied to `x` (controls wavelength).
 * @param {number} amplitude - Peak vertical displacement before scaling.
 * @param {number} offsetY - Vertical center offset added to the sine value.
 * @param {number} phase - Phase shift in radians applied inside the sine.
 * @param {number} scale - Multiplier applied to the sine result (additional amplitude scaling).
 * @return {number} The computed y-coordinate.
 */
function helixY(x, freq, amplitude, offsetY, phase, scale) {
  return offsetY + Math.sin(freq * x + phase) * amplitude * scale;
}
