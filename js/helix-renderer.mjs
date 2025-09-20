/**
 * Render a static, ND-safe layered sacred-geometry composition onto a canvas.
 *
 * Clears the canvas to palette.bg and draws four depth-ordered layers:
 * 1) Vesica field (intersecting circles)
 * 2) Tree-of-Life scaffold (nodes and connecting paths)
 * 3) Fibonacci spiral (sampled polyline)
 * 4) Double-helix lattice (two strands with cross rungs)
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {Object} options - Rendering options.
 * @param {number} options.width - Canvas width in pixels.
 * @param {number} options.height - Canvas height in pixels.
 * @param {Object} options.palette - Color palette with `bg`, `ink`, and `layers` array used per layer.
 * @param {Object} options.NUM - Numeric constants object used to size and sample elements.
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
 * Draws a calm vesica field of overlapping stroked circles across the canvas.
 *
 * Renders two horizontally offset circles at each grid point to form a gentle, repeating vesica pattern.
 * Uses thin strokes and reduced global alpha so the field remains visually soft and non-distracting.
 *
 * @param {string} color - Stroke color (any canvas-compatible CSS color).
 * @param {object} NUM - Numeric constants used for layout (expects numeric properties such as THREE, SEVEN, NINE).
 */
function drawVesica(ctx, width, height, color, NUM) {
  /* Vesica field: calm outline grid built from overlapping circles.
     ND-safe: thin lines and wide spacing keep the field gentle. */
  const radius = Math.min(width, height) / NUM.THREE;
  const spacing = radius / NUM.SEVEN;
  const step = spacing * NUM.NINE;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.35;

  for (let y = radius; y < height + radius; y += step) {
    for (let x = radius; x < width + radius; x += step) {
      ctx.beginPath();
      ctx.arc(x - spacing, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x + spacing, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.restore();
}

/**
 * Draws a static "Tree of Life" scaffold: a fixed set of connected nodes and paths centered in the canvas.
 *
 * Renders a non-animated layout of nodes (filled circles) and connecting paths (stroked lines). Node positions are defined as normalized coordinates then scaled to the provided width and height. Node radius is derived from canvas size and NUM.TWENTYTWO.
 *
 * @param {Object} colors - Color roles used when drawing. Must include `path` (stroke color for connections) and `node` (fill color for nodes).
 */
function drawTree(ctx, width, height, colors, NUM) {
  /* Tree-of-Life: static layout to respect sacred order without motion. */
  const nodeRadius = Math.min(width, height) / NUM.TWENTYTWO;

  const baseNodes = [
    [0.5, 0.05],
    [0.35, 0.18],
    [0.65, 0.18],
    [0.25, 0.35],
    [0.75, 0.35],
    [0.5, 0.48],
    [0.35, 0.65],
    [0.65, 0.65],
    [0.5, 0.78],
    [0.5, 0.9]
  ];

  const nodes = baseNodes.map(([nx, ny]) => ({
    x: nx * width,
    y: ny * height
  }));

  const paths = [
    [0, 1], [0, 2], [1, 2],
    [1, 3], [1, 5], [1, 4],
    [2, 4], [2, 5], [2, 3],
    [3, 4], [3, 5], [4, 5],
    [3, 6], [4, 7],
    [5, 6], [5, 7], [5, 8],
    [6, 7], [6, 8], [7, 8],
    [6, 9], [7, 9]
  ];

  ctx.save();
  ctx.strokeStyle = colors.path;
  ctx.lineWidth = 1;

  paths.forEach(([a, b]) => {
    const nodeA = nodes[a];
    const nodeB = nodes[b];
    ctx.beginPath();
    ctx.moveTo(nodeA.x, nodeA.y);
    ctx.lineTo(nodeB.x, nodeB.y);
    ctx.stroke();
  });

  ctx.fillStyle = colors.node;
  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/**
 * Draws a static Fibonacci-style spiral as a stroked polyline on the given canvas context.
 *
 * Generates a sequence of points along a logarithmic spiral centered near (width*0.32, height*0.68)
 * and strokes a smooth polyline through them using the provided color. The function saves and
 * restores the canvas context state; it does not animate the spiral.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {number} width - Canvas width in pixels (used to position and scale the spiral).
 * @param {number} height - Canvas height in pixels (used to position and scale the spiral).
 * @param {string} color - Stroke color used for the spiral (any valid CSS color string).
 * @param {object} NUM - Numeric constants object (provides counts and divisors used for sizing and steps).
 */
function drawFibonacci(ctx, width, height, color, NUM) {
  /* Fibonacci spiral: static polyline for gentle motionless flow. */
  const count = NUM.ONEFORTYFOUR;
  const centerX = width * 0.32;
  const centerY = height * 0.68;
  const baseRadius = Math.min(width, height) / NUM.ELEVEN;
  const growth = 1 + 1 / NUM.TWENTYTWO;
  const angleStep = Math.PI / NUM.ELEVEN;

  const points = createSpiralPoints({
    count,
    centerX,
    centerY,
    radius: baseRadius,
    growth,
    angleStep
  });

  if (points.length < 2) {
    return;
  }

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.8;
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  ctx.restore();
}

/**
 * Generate a sequence of (x,y) coordinates lying along a logarithmic spiral.
 *
 * Produces `count` points starting at polar radius `radius` around (centerX, centerY).
 * Each step multiplies the radius by `growth` and advances the polar angle by `angleStep` (radians).
 *
 * @param {Object} params
 * @param {number} params.count - Number of points to generate (non-negative integer).
 * @param {number} params.centerX - X coordinate of the spiral center.
 * @param {number} params.centerY - Y coordinate of the spiral center.
 * @param {number} params.radius - Initial radial distance from the center for the first point.
 * @param {number} params.growth - Multiplicative growth factor applied to the radius each step (use >0).
 * @param {number} params.angleStep - Angle increment per step, in radians.
 * @return {Array<{x:number,y:number}>} Array of point objects in canvas coordinates.
 */
function createSpiralPoints({ count, centerX, centerY, radius, growth, angleStep }) {
  const pts = [];
  let currentRadius = radius;
  let angle = 0;

  for (let i = 0; i < count; i += 1) {
    pts.push({
      x: centerX + Math.cos(angle) * currentRadius,
      y: centerY + Math.sin(angle) * currentRadius
    });
    currentRadius *= growth;
    angle += angleStep;
  }

  return pts;
}

/**
 * Draws a static double-helix lattice (two strands plus cross rungs) onto the provided canvas context.
 *
 * Generates two opposing helical strands and renders them as polylines, then draws a fixed number
 * of short cross-rungs connecting corresponding points on the two strands. The drawing uses
 * colors provided in the `colors` object and mutates the given canvas context (no return value).
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {number} width - Canvas width in pixels (used to position and scale the helix).
 * @param {number} height - Canvas height in pixels (used to position and scale the helix).
 * @param {Object} colors - Required color assignments:
 *   - {string} colors.strandA - stroke color for strand A.
 *   - {string} colors.strandB - stroke color for strand B.
 *   - {string} colors.rung - stroke color for the cross-rungs between strands.
 * @param {Object} NUM - Numeric constants object used to control counts and spacing (expects members
 *   like NINETYNINE, TWENTYTW0, THREE, THIRTYTHREE — values used: NINETYNINE, TWENTYTWO, THREE, THIRTYTHREE).
 */
function drawHelix(ctx, width, height, colors, NUM) {
  /* Double helix: two strands plus 33 cross rungs, all static. */
  const count = NUM.NINETYNINE;
  const top = height * 0.12;
  const bottom = height * 0.92;
  const centerX = width * 0.68;
  const amplitude = width / NUM.TWENTYTWO;
  const twists = NUM.THREE;

  const strandA = createHelixStrand({
    count,
    top,
    bottom,
    centerX,
    amplitude,
    phase: 0,
    twists
  });
  const strandB = createHelixStrand({
    count,
    top,
    bottom,
    centerX,
    amplitude,
    phase: Math.PI,
    twists
  });

  ctx.save();
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";

  ctx.strokeStyle = colors.strandA;
  drawPolyline(ctx, strandA);

  ctx.strokeStyle = colors.strandB;
  drawPolyline(ctx, strandB);

  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  const rungCount = NUM.THIRTYTHREE;
  for (let i = 0; i < rungCount; i += 1) {
    const t = rungCount === 1 ? 0 : i / (rungCount - 1);
    const index = Math.min(strandA.length - 1, Math.round(t * (strandA.length - 1)));
    const pointA = strandA[index];
    const pointB = strandB[index];
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Generate a single vertical helix strand as an array of points.
 *
 * Produces `count` points evenly spaced in y from `top` to `bottom`. Each point's x coordinate is
 * computed as `centerX + sin(phase + t * PI * twists) * amplitude`, where t ranges [0,1] along the strand.
 *
 * @param {Object} params
 * @param {number} params.count - Number of points to generate (>= 1).
 * @param {number} params.top - Y coordinate at the top of the strand.
 * @param {number} params.bottom - Y coordinate at the bottom of the strand.
 * @param {number} params.centerX - Central x position about which the strand oscillates.
 * @param {number} params.amplitude - Maximum horizontal displacement of the strand.
 * @param {number} params.phase - Angular offset (radians) applied to the sine.
 * @param {number} params.twists - Controls how many oscillations; the total angle added across the strand is `PI * twists`.
 * @return {Array<{x: number, y: number}>} Array of points composing the helix strand.
 */
function createHelixStrand({ count, top, bottom, centerX, amplitude, phase, twists }) {
  const pts = [];
  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0 : i / (count - 1);
    const y = top + (bottom - top) * t;
    const angle = phase + t * Math.PI * twists;
    const offset = Math.sin(angle) * amplitude;
    pts.push({ x: centerX + offset, y });
  }
  return pts;
}

/**
 * Stroke a continuous polyline through an array of points using the current canvas stroke style.
 *
 * If the point array is empty the function does nothing. The path is left open (not closed or filled),
 * and the canvas' current stroke-related state (strokeStyle, lineWidth, lineJoin, etc.) is used.
 *
 * @param {Array<{x: number, y: number}>} pts - Ordered array of 2D points to connect with straight segments.
 */
function drawPolyline(ctx, pts) {
  if (pts.length === 0) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i += 1) {
    ctx.lineTo(pts[i].x, pts[i].y);
  }
  ctx.stroke();
}
