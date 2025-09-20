// first-paint-octagram.js
/**
 * Render a static octagram gradient into a canvas element as a fallback hero image.
 *
 * Draws a centered radial gradient and eight translucent radial spokes onto the
 * canvas identified by `id`. If the canvas element or its 2D context is not
 * available, the function returns without side effects.
 *
 * @param {string} [id='opus'] - The DOM id of the <canvas> element to draw into.
 * @param {number} [width=1200] - Canvas width in CSS pixels; also sets the element's drawing buffer width.
 * @param {number} [height=675] - Canvas height in CSS pixels; also sets the element's drawing buffer height.
 */
export function paintOctagram(id = 'opus', width = 1200, height = 675) {
  const canvas = document.getElementById(id);
  if (!canvas) return;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    width / 9,
    width / 2,
    height / 2,
    Math.hypot(width, height) / 2
  );

  const palette = ['#0f0b1e', '#1d1d20', '#3b2e5a', '#bfa66b', '#dfe8ff'];
  palette.forEach((color, index) => {
    gradient.addColorStop(index / (palette.length - 1), color);
  });

  ctx.globalAlpha = 1;
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.25;
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#dfe8ff';

  const radius = Math.min(width, height) * 0.32;
  const centerX = width / 2;
  const centerY = height / 2;

  for (let k = 0; k < 8; k += 1) {
    const angle = (Math.PI / 4) * k;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
    ctx.stroke();
  }
}
