/**
 * colorScience
 *
 * @package @cathedral/brain
 */
export declare class ColorScience {
    constructor();
    wavelengthToRGB(wavelength: number): {
        r: number;
        g: number;
        b: number;
    };
    expandToTetrachromat(rgb: {
        r: number;
        g: number;
        b: number;
    }): {
        uv: number;
        r: number;
        g: number;
        b: number;
    };
    harmonicColors(baseWavelength: number): {
        fundamental: number;
        octave: number;
        fifth: number;
        fourth: number;
        majorThird: number;
    };
    generateVisionaryColorPalette(theme: string, count?: number): Promise<string[]>;
    private algorithmicColorPalette;
    private fallbackColorPalette;
}
//# sourceMappingURL=colorScience.d.ts.map