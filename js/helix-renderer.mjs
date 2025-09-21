/**
 * Render a complete, ND-safe static composition of layered sacred geometry onto a canvas.
 *
 * Draws, in back-to-front order: layered background, Vesica field, Tree-of-Life scaffold,
 * Fibonacci spiral, and a double-helix lattice. Optionally renders a small inline notice.
 * The function saves and restores the canvas context state and performs no external side effects.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {Object} opts - Rendering options.
 * @param {number} opts.width - Canvas width in pixels.
 * @param {number} opts.height - Canvas height in pixels.
 * @param {Object} opts.palette - Color palette object with expected keys (bg, ink, layers[]).
 * @param {Object} opts.NUM - Numeric constants/config used to scale and sample geometry.
 * @param {string} [opts.notice] - Optional short message; when a non-empty string is provided it is
 *   drawn unobtrusively near the bottom-left of the canvas.
 */

export function renderHelix(ctx, { width, height, palette, NUM, notice }) {
  ctx.save();

  fillBackground(ctx, width, height, palette, NUM);
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(
    ctx,
    width,
    height,
    {
      path: palette.layers[1],
      node: palette.layers[2],
      halo: palette.layers[5]
    },
    NUM
  );
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(
    ctx,
    width,
    height,
    {
      strandA: palette.layers[4],
      strandB: palette.layers[5],
      rung: palette.ink
    },
    NUM
  );

  if (typeof notice === "string" && notice.trim().length > 0) {
    drawNotice(ctx, width, height, palette.ink, notice.trim());
  }

  ctx.restore();
}

/**
 * Paints the layered background for the composition: base fill, a celestial radial glow, and a subtle vertical grounding gradient.
 *
 * The routine is ND-safe (static) and relies on palette color stops to build two gradient overlays over the solid background.
 *
 * @param {Object} palette - Color palette: must include `bg` (base background color) and `layers` (array of colors used as gradient stops).
 * @param {Object} NUM - Numeric constants used for scale; this function uses `NUM.NINE` to compute the radial focus radius.
 */
function fillBackground(ctx, width, height, palette, NUM) {
  /* ND-safe: slow gradients echo the provided art without motion. */
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const outerRadius = Math.max(width, height);
  const focusRadius = outerRadius / NUM.NINE;
  const celestial = ctx.createRadialGradient(
    width / 2,
    height * 0.18,
    focusRadius,
    width / 2,
    height / 2,
    outerRadius
  );
  celestial.addColorStop(0, withAlpha(palette.layers[0], 0.35));
  celestial.addColorStop(0.4, withAlpha(palette.layers[5], 0.12));
  celestial.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = celestial;
  ctx.fillRect(0, 0, width, height);

  const grounding = ctx.createLinearGradient(0, 0, 0, height);
  grounding.addColorStop(0, withAlpha(palette.layers[1], 0.08));
  grounding.addColorStop(1, withAlpha(palette.bg, 0));

  ctx.fillStyle = grounding;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Draws a luminous Vesica field: a repeating grid of overlapping circular outlines.
 *
 * Renders two offset circles at each grid point using translucent, additive strokes
 * to produce a glowing outline effect. The canvas context state is saved and
 * restored; no value is returned.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw on.
 * @param {number} width - Canvas drawing width in pixels.
 * @param {number} height - Canvas drawing height in pixels.
 * @param {string} color - Stroke color (any CSS color string) used for the circle outlines.
 * @param {object} NUM - Scaling constants object (e.g., { THREE, SEVEN, NINE }) used to compute radius and spacing.
 */
function drawVesica(ctx, width, height, color, NUM) {
  /* Vesica field: luminous outline grid built from overlapping circles. */
  const radius = Math.min(width, height) / NUM.THREE;
  const spacing = radius / NUM.SEVEN;
  const step = spacing * NUM.NINE;

  ctx.save();
  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalCompositeOperation = "lighter";

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
 * Draws a static "Tree of Life" scaffold (connected nodes with haloed nodes) onto the canvas.
 *
 * Renders a fixed, non-animated layout of normalized node positions scaled to the provided
 * width/height. Draws connecting paths (strokes) between predefined node pairs and filled
 * circular nodes with a soft halo glow.
 *
 * @param {Object} colors - Color roles used by the layer. Required keys:
 *   - {string} path: stroke color for connecting lines.
 *   - {string} node: fill color for node disks.
 *   - {string} halo: color used for the node glow (converted to a translucent shadow).
 * @param {Object} NUM - Numerical constants used for sizing (expects NUM.TWENTYTWO to compute node radius).
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
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [1, 5],
    [1, 4],
    [2, 4],
    [2, 5],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 5],
    [3, 6],
    [4, 7],
    [5, 6],
    [5, 7],
    [5, 8],
    [6, 7],
    [6, 8],
    [7, 8],
    [6, 9],
    [7, 9]
  ];

  ctx.save();
  ctx.strokeStyle = colors.path;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.85;

  paths.forEach(([a, b]) => {
    const nodeA = nodes[a];
    const nodeB = nodes[b];
    ctx.beginPath();
    ctx.moveTo(nodeA.x, nodeA.y);
    ctx.lineTo(nodeB.x, nodeB.y);
    ctx.stroke();
  });

  ctx.fillStyle = colors.node;
  ctx.shadowColor = withAlpha(colors.halo, 0.35);
  ctx.shadowBlur = nodeRadius * 2.2;

  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

/**
 * Draws a static Fibonacci (logarithmic) spiral as a stroked polyline with a vertical color gradient.
 *
 * The spiral is sampled from a fixed center (≈32% width, 68% height) using NUM-derived counts and steps;
 * stroke styling uses a vertical gradient built from the provided base color and soft alpha stops.
 * If fewer than two spiral points are generated, the function returns without drawing.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context.
 * @param {number} width - Canvas width in pixels.
 * @param {number} height - Canvas height in pixels.
 * @param {string} color - Base hex color used to construct the gradient stroke.
 * @param {object} NUM - Numeric constants object (expects keys like ONEFORTYFOUR, ELEVEN, TWENTYTWO).
 */
function drawFibonacci(ctx, width, height, color, NUM) {
  /* Fibonacci spiral: static polyline for gentle, motionless flow. */
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
  const gradient = ctx.createLinearGradient(centerX, centerY - baseRadius, centerX, centerY + baseRadius * growth);
  gradient.addColorStop(0, withAlpha(color, 0));
  gradient.addColorStop(0.25, withAlpha(color, 0.65));
  gradient.addColorStop(1, withAlpha(color, 0.9));

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.9;
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  ctx.restore();
}

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
 * Render a static double-helix lattice (two strands plus cross rungs) onto a canvas.
 *
 * Draws two sinusoidal strands as stroked polylines with a shared glow gradient and
 * then renders a fixed number of cross rungs connecting corresponding points on the strands.
 * Visual parameters (sampling density, vertical span, amplitude, twists, and rung count)
 * are derived from the provided NUM constants.
 *
 * @param {CanvasRenderingContext2D} ctx - 2D canvas drawing context to render into.
 * @param {number} width - Canvas width in pixels.
 * @param {number} height - Canvas height in pixels.
 * @param {{ strandA: string, strandB: string, rung: string }} colors - Hex color strings used for the two strand endpoints (blended into a gradient) and the rung stroke.
 * @param {object} NUM - Numeric constants object used for sampling and layout (expects fields like NINETYNINE, THIRTYTHREE, TWENTYTWO, THREE).
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

  const helixGlow = ctx.createLinearGradient(centerX - amplitude, top, centerX + amplitude, bottom);
  helixGlow.addColorStop(0, withAlpha(colors.strandA, 0.6));
  helixGlow.addColorStop(1, withAlpha(colors.strandB, 0.6));

  ctx.strokeStyle = helixGlow;
  ctx.shadowColor = withAlpha(colors.rung, 0.25);
  ctx.shadowBlur = amplitude * 0.35;
  drawPolyline(ctx, strandA);

  ctx.strokeStyle = helixGlow;
  drawPolyline(ctx, strandB);

  ctx.strokeStyle = colors.rung;
  ctx.lineWidth = 1;
  ctx.shadowBlur = amplitude * 0.25;
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
 * Stroke a connected polyline through an ordered list of points on the given canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - 2D rendering context to draw into.
 * @param {Array<{x: number, y: number}>} pts - Ordered array of points; if empty the function returns without drawing.
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

/**
 * Draws a small, non-intrusive inline notice at the bottom-left of the canvas.
 *
 * Renders `message` using `inkHex` (with applied alpha) and a soft shadow, positioned
 * with consistent padding from the canvas edges. The canvas state is saved and restored.
 *
 * @param {CanvasRenderingContext2D} ctx - The 2D canvas rendering context.
 * @param {number} width - Canvas width in pixels.
 * @param {number} height - Canvas height in pixels.
 * @param {string} inkHex - Hex color string used for the text and shadow (e.g. "#RRGGBB").
 * @param {string} message - The notice text to draw.
 */
function drawNotice(ctx, width, height, inkHex, message) {
  /* Inline fallback notice keeps the reader informed without alerts. */
  ctx.save();
  ctx.fillStyle = withAlpha(inkHex, 0.75);
  ctx.font = "14px 'Segoe UI', system-ui, sans-serif";
  ctx.textBaseline = "middle";
  ctx.shadowColor = withAlpha(inkHex, 0.18);
  ctx.shadowBlur = 6;
  const padding = 18;
  ctx.fillText(message, padding, height - padding);
  ctx.restore();
}

/**
 * Convert a hex color to an RGBA CSS string with the specified alpha.
 *
 * Accepts a 6-digit hex string (with or without a leading '#'). If the input
 * cannot be parsed, returns opaque-white with the requested alpha.
 *
 * @param {string} hex - Hex color string (e.g. "#RRGGBB" or "RRGGBB").
 * @param {number} alpha - Opacity in [0, 1].
 * @return {string} CSS `rgba(r, g, b, a)` string suitable for canvas or CSS.
function withAlpha(hex, alpha) {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return `rgba(255, 255, 255, ${alpha})`;
  }
  const { r, g, b } = rgb;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Convert a 6-digit hexadecimal color string to an RGB object.
 *
 * Accepts a hex string with or without a leading '#' (e.g. "#ff00aa" or "ff00aa").
 * Returns an object with numeric r, g, b components in the 0–255 range, or `null`
 * if the input is not a valid 6-digit hex string.
 *
 * @param {string} hex - 6-digit hex color string, optionally prefixed with '#'.
 * @return {{r: number, g: number, b: number} | null} RGB components or null on invalid input.
 */
function hexToRgb(hex) {
  if (typeof hex !== "string") {
    return null;
  }
  const normalized = hex.replace(/^#/, "");
  if (normalized.length !== 6) {
    return null;
  }
  const int = Number.parseInt(normalized, 16);
  if (Number.isNaN(int)) {
    return null;
  }
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
}
