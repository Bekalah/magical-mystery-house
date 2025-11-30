/**
 * colorScience
 *
 * @package @cathedral/brain
 */
export class ColorScience {
    constructor() {
        // console.log('ColorScience initialized with pure algorithmic color generation.');
    }
    wavelengthToRGB(wavelength) {
        let R = 0, G = 0, B = 0;
        if (wavelength >= 380 && wavelength < 440) {
            R = -(wavelength - 440) / (440 - 380);
            G = 0.0;
            B = 1.0;
        }
        else if (wavelength >= 440 && wavelength < 490) {
            R = 0.0;
            G = (wavelength - 440) / (490 - 440);
            B = 1.0;
        }
        else if (wavelength >= 490 && wavelength < 510) {
            R = 0.0;
            G = 1.0;
            B = -(wavelength - 510) / (510 - 490);
        }
        // ...continue for full spectrum
        const gamma = 0.80;
        R = Math.pow(R, gamma);
        G = Math.pow(G, gamma);
        B = Math.pow(B, gamma);
        return { r: R * 255, g: G * 255, b: B * 255 };
    }
    expandToTetrachromat(rgb) {
        const uv = (rgb.b * 0.5 + rgb.r * 0.3) * 0.8;
        return { ...rgb, uv };
    }
    harmonicColors(baseWavelength) {
        return {
            fundamental: baseWavelength,
            octave: baseWavelength * 2,
            fifth: baseWavelength * 1.5,
            fourth: baseWavelength * 1.333,
            majorThird: baseWavelength * 1.25
        };
    }
    async generateVisionaryColorPalette(theme, count = 5) {
        // Pure algorithmic color generation based on theme hash and harmonic colors
        // console.log('Using pure algorithmic color palette generation for theme:', theme);
        return this.algorithmicColorPalette(theme, count);
    }
    algorithmicColorPalette(theme, count) {
        // Generate colors based on theme string hash and harmonic relationships
        const hash = theme.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = (hash + i * 137.5) % 360; // Golden angle for harmonic distribution
            const saturation = 70 + (i * 10) % 30;
            const lightness = 50 + (i * 15) % 30;
            colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        return colors;
    }
    fallbackColorPalette(count) {
        const fallbackColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        return fallbackColors.slice(0, count);
    }
}
//# sourceMappingURL=colorScience.js.map