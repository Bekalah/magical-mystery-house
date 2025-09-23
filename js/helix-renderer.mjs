/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layers rendered in depth order:
    1) Vesica field - intersecting circles forming a calm grid
    2) Tree-of-Life scaffold - 10 sephirot nodes with 22 connective paths
    3) Fibonacci curve - logarithmic spiral sampled at 144 points
    4) Double-helix lattice - two phase-shifted strands with 33 cross rungs

  Each helper is a small pure function invoked once; no motion, no dependencies.
  Layers:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (10 sephirot + 22 paths)
    3) Fibonacci curve (log spiral polyline)
    4) Double-helix lattice (two phase-shifted strands)

  All functions are pure and run once; no motion, no dependencies.
  Layers drawn in order:
    1) Vesica field — intersecting circles forming a calm grid
    2) Tree-of-Life scaffold — 10 sephirot nodes + 22 paths
    3) Fibonacci curve — logarithmic spiral using 144 sampled points
    4) Double-helix lattice — two phase-shifted strands with 33 cross rungs

  All functions are pure and run once; no motion, no dependencies.
  Functions are pure and run once; no motion, no dependencies.
*/
/**
 * Render a deterministic, non-animated multi-layer sacred-geometry composition onto a canvas.
 *
 * Clears the canvas to palette.bg then draws, in fixed order: a vesica field (overlapping circle outlines), 
 * a Tree-of-Life scaffold (10 nodes + 22 paths), a Fibonacci (logarithmic) spiral, and a double-helix lattice 
 * (two phase-shifted strands with cross rungs). All drawing is performed directly on the provided canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D rendering context to draw into.
 * @param {object} options
 * @param {number} options.width - Width of the drawing area in pixels.
 * @param {number} options.height - Height of the drawing area in pixels.
 * @param {object} options.palette - Color palette: { bg: string, layers: string[], ink: string }.
 *   - bg: background fill color.
 *   - layers: array of stroke colors consumed in layer order (vesica, tree.path, tree.node, spiral, helix.strandA, helix.strandB).
 *   - ink: color used for helix rungs.
 * @param {object} options.NUM - Numeric constants used for sizing and sampling (controls radii, steps, sample counts, etc.).
/**
 * Render the full four-layer sacred-geometry composition into a 2D canvas context.
 *
 * Draws, in back-to-front order: a vesica-field of overlapping circles, a Tree-of-Life scaffold
 * (paths + nodes), a logarithmic Fibonacci spiral, and a double-helix lattice (two sine strands
 * with vertical rungs). The function fills the canvas background with palette.bg and restores
 * the canvas state before returning.
 *
 * @param {CanvasRenderingContext2D} ctx - 2D drawing context for the target canvas.
 * @param {Object} cfg - Rendering configuration.
 * @param {number} cfg.width - Canvas width in pixels.
 * @param {number} cfg.height - Canvas height in pixels.
 * @param {Object} cfg.palette - Palette with `bg`, `ink`, and `layers` array. Expected layer mapping:
 *   layers[0] – vesica stroke, layers[1] – tree path, layers[2] – tree node,
 *   layers[3] – Fibonacci spiral, layers[4] – helix strand A, layers[5] – helix strand B.
 *   `ink` is used for helix rungs.
 * @param {Object} cfg.NUM - Numeric constants used to scale geometric elements.
 */

export function renderHelix(ctx, { width, height, palette, NUM }) {
  if (!ctx) {
    return;
  }

  const layers = ensureLayers(palette.layers, palette.ink);

  Layers (drawn in depth order):
    1) Vesica field (intersecting circles with luminous grid)
    2) Tree-of-Life scaffold (10 nodes, 22 paths)
    3) Fibonacci curve (logarithmic spiral with 144 samples)
    4) Double-helix lattice (two strands, 33 cross rungs)

  All functions below are pure and execute once to preserve stillness.
*/
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

  // Layer order preserves visual depth without animation.
  drawVesica(ctx, width, height, layers[0], NUM);
  drawTree(ctx, width, height, layers[1], layers[2], NUM);
  drawFibonacci(ctx, width, height, layers[3], NUM);
  drawHelix(ctx, width, height, { a: layers[4], b: layers[5], rung: palette.ink }, NUM);
  // Layer order preserves depth without motion
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

function ensureLayers(layerList = [], fallback) {
  const required = 6;
  const resolved = [];
  for (let i = 0; i < required; i++) {
    resolved[i] = layerList[i] || fallback;
  }
  return resolved;
}

/* Layer 1: Vesica field ---------------------------------------------------- */
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
  // Layer order preserves depth without motion (ND-safe rationale)
  drawVesica(ctx, width, height, palette.layers[0], NUM);
  drawTree(ctx, width, height, { path: palette.layers[1], node: palette.layers[2] }, NUM);
  drawFibonacci(ctx, width, height, palette.layers[3], NUM);
  drawHelix(ctx, width, height, { strandA: palette.layers[4], strandB: palette.layers[5], rung: palette.ink }, NUM);

  ctx.restore();
}

function drawCircle(ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
}

/* Layer 2: Tree-of-Life scaffold ------------------------------------------- */
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

/* Layer 3: Fibonacci curve -------------------------------------------------- */
function drawFibonacci(ctx, w, h, color, NUM) {
  // ND-safe: static spiral with consistent stroke weight and no motion.
  const cx = w / 2;
  const cy = h / 2;
  const base = Math.min(w, h) / NUM.NINETYNINE;
  const phi = (1 + Math.sqrt(5)) / 2;
/* Layer 1: Vesica field — calm grid of intersecting circles */
/* Layer 1: Vesica field ---------------------------------------------------- */
/* Layer 1: Vesica field -- calm grid of intersecting circles */
function drawVesica(ctx, w, h, color, NUM) {
  const r = Math.min(w, h) / NUM.THREE; // triadic radius
  const step = r / NUM.SEVEN;           // septenary spacing
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
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: calm outline grid built from overlapping circles.
     ND-safe: thin lines, generous spacing. */
  const r = Math.min(w, h) / NUM.THREE;      // base radius from sacred triad
  const step = r / NUM.SEVEN;                // spacing guided by 7
/* Layer 1: Vesica field — calm grid of intersecting circles */
function drawVesica(ctx, w, h, color, NUM) {
  // ND-safe: thin lines, generous spacing
  const r = Math.min(w, h) / NUM.THREE;       // triadic radius
  const step = r / NUM.SEVEN;                 // septenary spacing
/* Layer 0: Gradient background -------------------------------------------- */
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
/**
 * Draws a static field of overlapping vesica-style circle outlines on the canvas.
 *
 * The grid of paired circles scales with canvas size: baseRadius = Math.min(w, h) / NUM.THREE,
 * step = baseRadius / NUM.SEVEN, and cells are spaced by step * NUM.NINE. Circles are stroked
 * with a 1px line using the provided color. The function is deterministic and only mutates
 * the supplied canvas context.
 *
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {string|CanvasGradient|CanvasPattern} color - Stroke style for the circle outlines.
 * @param {Object} NUM - Numeric scaling constants; must include THREE, SEVEN, and NINE.
 */
function drawVesica(ctx, w, h, color, NUM) {
/**
 * Draws a static "vesica" field: a grid of paired overlapping circle outlines.
 *
 * Renders thin, evenly spaced stroked circles arranged on a rectangular grid. Each grid cell
 * draws two circles offset horizontally by a small step to produce repeated vesica (almond)
 * shapes. Intended to be visually subtle and ND-safe (thin strokes, ample spacing).
 *
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {string|CanvasStyle} color - Stroke color used for the circle outlines.
 * @param {Object} NUM - Numeric constants object used for scaling (expects properties THREE, SEVEN, NINE).
 *   THREE controls base radius scaling, SEVEN controls the finer spacing step, and NINE controls grid spacing.
 */
function drawVesica(ctx, w, h, color, NUM) {
  /* Vesica field: calm outlines from overlapping circles.
     ND-safe: thin strokes, ample spacing, static grid. */
  const baseRadius = Math.min(w, h) / NUM.THREE; // sacred triad scaling
  const step = baseRadius / NUM.SEVEN;           // septenary spacing controls density

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
/**
 * Draws a static Tree-of-Life scaffold: 10 filled nodes connected by 22 stroked paths.
 *
 * Nodes are defined as normalized (0..1) positions and scaled to the given width/height.
 * The canvas state is saved and restored; drawing only mutates the provided 2D context.
 *
 * @param {number} w - Canvas width used to scale normalized node X coordinates.
 * @param {number} h - Canvas height used to scale normalized node Y coordinates.
 * @param {Object} colors - Color map for rendering. Required properties:
 *   - {string} node - fill color for each node.
 *   - {string} path - stroke color for connecting paths.
 * @param {Object} NUM - Numeric constants. Uses NUM.TWENTYTWO to compute node radius:
 *   nodeRadius = Math.min(w, h) / NUM.TWENTYTWO.
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
 * Draws a static "Tree of Life" scaffold: 10 nodes connected by 22 edges.
 *
 * Positions a fixed set of normalized nodes scaled to the provided canvas size,
 * strokes the 22 predefined connections using colors.path, then fills each node
 * as a small circle whose radius is derived from NUM.TWENTYTWO.
 *
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {Object} colors - Color roles for the layer.
 * @param {string} colors.path - Stroke color used for connecting edges.
 * @param {string} colors.node - Fill color used for node circles.
 * @param {Object} NUM - Numeric constants; NUM.TWENTYTWO is used to compute node radius.
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
  ctx.globalAlpha = 0.85;

  paths.forEach(([a, b]) => {
    const nodeA = nodes[a];
    const nodeB = nodes[b];
    ctx.beginPath();
    ctx.moveTo(nodeA.x, nodeA.y);
    ctx.lineTo(nodeB.x, nodeB.y);

  paths.forEach(([a, b]) => {
    const [x1, y1] = nodes[a];
    const [x2, y2] = nodes[b];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
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
  const nodeRadius = Math.min(w, h) / NUM.TWENTYTWO; // ties to 22 paths

  const nodeRadius = Math.min(w, h) / NUM.TWENTYTWO; // ties to 22 paths

  nodes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  });

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
  ctx.restore();
}

/**
 * Draws a centered, static logarithmic (Fibonacci) spiral as a single stroked polyline.
 *
 * Constructs a 144-sample spiral using the golden ratio; the spiral is centered at (w/2, h/2),
 * scaled relative to the smaller canvas dimension, and stroked once with lineWidth 2.
 *
 * @param {number} w - Canvas width in pixels.
 * @param {number} h - Canvas height in pixels.
 * @param {string|CanvasPattern|CanvasGradient} color - Stroke style used for the spiral.
 * @param {object} NUM - Numeric constants object; must provide ONEFORTYFOUR (samples),
 *   THIRTYTHREE (scale divisor) and ELEVEN (turns) as numeric properties.
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
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.75;
  ctx.beginPath();

  for (let i = 0; i <= NUM.ONEFORTYFOUR; i++) {
    const angle = (i / NUM.ELEVEN) * Math.PI;
    const radius = base * Math.pow(phi, i / NUM.TWENTYTWO);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
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

/* Layer 4: Double-helix lattice -------------------------------------------- */
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
/* Layer 4: Double-helix lattice — two static strands with rungs */
/* Layer 4: Double-helix lattice ------------------------------------------- */
function drawHelix(ctx, w, h, colors, NUM) {
  /* Double-helix lattice: two static strands with cross rungs.
     ND-safe: even spacing, no motion. */
  const amp = h / NUM.NINE;
  const waves = NUM.ELEVEN;
  const steps = NUM.NINETYNINE;
/* Layer 4: Double-helix lattice -- two static strands with rungs */
function drawHelix(ctx, w, h, colors, NUM) {
  const amp = h / NUM.NINE;       // gentle amplitude
  const waves = NUM.ELEVEN;       // helix turns
  const steps = NUM.NINETYNINE;   // sampling
/* Layer 4: Double-helix lattice — two static strands with rungs */
/**
 * Draws a static double-helix lattice: two phase-shifted sine-wave strands with evenly spaced cross rungs.
 *
 * Renders two stroked polylines (strandA and strandB) that form an 11-turn helix across the canvas width and
 * a set of vertical rungs connecting the strands at 33 evenly spaced positions. The helix is centered
 * vertically and scaled by the provided NUM constants so the result is deterministic and non-animated.
/**
 * Render a static double-helix lattice: two phase-shifted sine-wave strands with vertical cross-rungs.
 *
 * Draws two stroked sine-wave strands (phase offset by π) across the canvas and a set of evenly spaced
 * vertical rungs connecting the strands. Uses NUM constants to derive amplitude, wave count, sampling
 * resolution, and rung count; preserves and restores the canvas context.
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
 * @param {{ strandA: string, strandB: string, rung: string }} colors - Stroke colors for strand A, strand B, and rungs.
 * @param {Object} NUM - Numeric constants object (expects NUM.NINE, NUM.ELEVEN, NUM.NINETYNINE, NUM.THIRTYTHREE).
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
  ctx.strokeStyle = colors.a;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  for (let i = 0; i <= strandCount; i++) {
    const x = i * stepX;
    const y = helixY(x, freq, amplitude, offsetY, 0, 1);
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
}

  // Cross rungs unify strands at 33 points.
  // cross rungs
  // Cross rungs referencing 33 spine
  ctx.strokeStyle = colors.rung;
  ctx.globalAlpha = 0.35;
  const rungCount = NUM.THIRTYTHREE;
  for (let i = 0; i <= rungCount; i++) {
    const x = (i / rungCount) * w;
    const y1 = helixY(x, freq, amplitude, offsetY, 0, 1);
    const y2 = helixY(x, freq, amplitude, offsetY, phase, 0.85);
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
/* Layer 5: Inline notice --------------------------------------------------- */
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

function helixY(x, freq, amplitude, offsetY, phase, scale) {
  return offsetY + Math.sin(freq * x + phase) * amplitude * scale;
}
