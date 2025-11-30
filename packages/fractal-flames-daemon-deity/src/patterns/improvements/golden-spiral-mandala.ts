/**
 * Golden Spiral Mandala
 * 
 * Created from doubt: "The fractals need more beauty and sacred geometry integration"
 * Improvement: Create fractal patterns based on golden ratio and sacred geometry
 * 
 * This is how visionary art is created - from doubt comes infinite beauty.
 * 
 * @package @cathedral/fractal-flames-daemon-deity
 */

export interface GoldenSpiralMandala {
  id: string;
  name: string;
  type: 'mandala' | 'spiral' | 'flower' | 'lattice';
  parameters: {
    goldenRatio: number; // 1.618...
    iterations: number;
    layers: number;
    rotation: number;
    scale: number;
  };
  colors: string[];
  geometry: 'flower-of-life' | 'vesica-piscis' | 'metatron-cube' | 'merkaba' | 'custom';
}

/**
 * Generate Golden Spiral Mandala
 * 
 * Creates beautiful fractal patterns based on golden ratio
 */
export class GoldenSpiralMandalaGenerator {
  private goldenRatio = 1.618033988749895;

  /**
   * Generate mandala pattern
   */
  generateMandala(
    type: GoldenSpiralMandala['type'],
    layers: number = 8,
    geometry: GoldenSpiralMandala['geometry'] = 'flower-of-life'
  ): GoldenSpiralMandala {
    const mandala: GoldenSpiralMandala = {
      id: `mandala-${Date.now()}`,
      name: `${type}-${geometry}`,
      type,
      parameters: {
        goldenRatio: this.goldenRatio,
        iterations: layers * 10,
        layers,
        rotation: 0,
        scale: 1.0
      },
      colors: this.generateColorPalette(type),
      geometry
    };

    return mandala;
  }

  /**
   * Generate color palette based on type
   */
  private generateColorPalette(type: GoldenSpiralMandala['type']): string[] {
    const palettes: { [key in GoldenSpiralMandala['type']]: string[] } = {
      mandala: ['#8B4513', '#DAA520', '#FFD700', '#FFA500', '#FF6347'],
      spiral: ['#4B0082', '#8B008B', '#9370DB', '#BA55D3', '#DA70D6'],
      flower: ['#FF69B4', '#FF1493', '#DC143C', '#C71585', '#8B008B'],
      lattice: ['#2F4F4F', '#708090', '#778899', '#B0C4DE', '#D3D3D3']
    };

    return palettes[type];
  }

  /**
   * Generate spiral points using golden ratio
   */
  generateSpiralPoints(
    centerX: number,
    centerY: number,
    points: number,
    radius: number = 100
  ): Array<{ x: number; y: number; angle: number; distance: number }> {
    const spiralPoints: Array<{ x: number; y: number; angle: number; distance: number }> = [];

    for (let i = 0; i < points; i++) {
      const angle = i * this.goldenRatio * Math.PI * 2;
      const distance = radius * Math.sqrt(i) * this.goldenRatio;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      spiralPoints.push({ x, y, angle, distance });
    }

    return spiralPoints;
  }

  /**
   * Generate flower of life pattern
   */
  generateFlowerOfLife(
    centerX: number,
    centerY: number,
    layers: number = 7,
    radius: number = 50
  ): Array<{ x: number; y: number; radius: number }> {
    const circles: Array<{ x: number; y: number; radius: number }> = [];

    // Center circle
    circles.push({ x: centerX, y: centerY, radius });

    // Generate layers
    for (let layer = 1; layer <= layers; layer++) {
      const layerRadius = radius * layer;
      const circlesInLayer = 6 * layer;
      const angleStep = (Math.PI * 2) / circlesInLayer;

      for (let i = 0; i < circlesInLayer; i++) {
        const angle = i * angleStep;
        const x = centerX + Math.cos(angle) * layerRadius;
        const y = centerY + Math.sin(angle) * layerRadius;

        circles.push({ x, y, radius });
      }
    }

    return circles;
  }

  /**
   * Generate vesica piscis pattern
   */
  generateVesicaPiscis(
    centerX: number,
    centerY: number,
    radius: number = 100
  ): Array<{ x: number; y: number; radius: number; rotation: number }> {
    const vesicas: Array<{ x: number; y: number; radius: number; rotation: number }> = [];

    // Main vesica
    vesicas.push({ x: centerX, y: centerY, radius, rotation: 0 });

    // Surrounding vesicas
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const distance = radius * this.goldenRatio;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      vesicas.push({ x, y, radius, rotation: angle });
    }

    return vesicas;
  }

  /**
   * Render mandala to canvas
   */
  renderToCanvas(
    canvas: HTMLCanvasElement,
    mandala: GoldenSpiralMandala,
    width: number = 1920,
    height: number = 1080
  ): void {
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = width / 2;
    const centerY = height / 2;

    // Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Draw based on geometry
    switch (mandala.geometry) {
      case 'flower-of-life':
        const flowerCircles = this.generateFlowerOfLife(
          centerX,
          centerY,
          mandala.parameters.layers,
          50
        );
        flowerCircles.forEach((circle, i) => {
          ctx.strokeStyle = mandala.colors[i % mandala.colors.length];
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
          ctx.stroke();
        });
        break;

      case 'vesica-piscis':
        const vesicas = this.generateVesicaPiscis(centerX, centerY, 100);
        vesicas.forEach((vesica, i) => {
          ctx.strokeStyle = mandala.colors[i % mandala.colors.length];
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(vesica.x, vesica.y, vesica.radius, vesica.radius * 0.5, vesica.rotation, 0, Math.PI * 2);
          ctx.stroke();
        });
        break;

      case 'spiral':
        const spiralPoints = this.generateSpiralPoints(centerX, centerY, mandala.parameters.iterations, 100);
        ctx.strokeStyle = mandala.colors[0];
        ctx.lineWidth = 2;
        ctx.beginPath();
        spiralPoints.forEach((point, i) => {
          if (i === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
        break;
    }
  }
}

// Export singleton
export const goldenSpiralMandalaGenerator = new GoldenSpiralMandalaGenerator();

// Export for easy use
export default goldenSpiralMandalaGenerator;

