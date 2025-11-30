/**
 * soundScience
 *
 * @package @cathedral/brain
 */
export declare class SoundScience {
    harmonicSeries(fundamental: number, numHarmonics?: number): {
        frequency: number;
        amplitude: number;
        phase: number;
    }[];
    binauralBeat(carrierFreq: number, beatFreq: number): {
        left: number;
        right: number;
    };
    pythagoreanIntervals(): {
        unison: number;
        minorSecond: number;
        majorSecond: number;
        minorThird: number;
        majorThird: number;
        perfectFourth: number;
        tritone: number;
        perfectFifth: number;
        minorSixth: number;
        majorSixth: number;
        minorSeventh: number;
        majorSeventh: number;
        octave: number;
    };
}
//# sourceMappingURL=soundScience.d.ts.map