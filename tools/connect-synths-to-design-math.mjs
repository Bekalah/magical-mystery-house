#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Connect Synths to Design Mathematics Tool
 * 
 * Integrates sound synthesis with design mathematics
 * Uses same sacred geometry principles (golden ratio, Fibonacci, 144:99) for both
 * Ensures frequencies, harmonics, and sound parameters align with design proportions
 * 
 * @license CC0-1.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = new EnhancedLogger();

class SynthDesignMathConnector
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    // Sacred Mathematics Constants
    this.SACRED_MATH = {
      // Cathedral 144:99 ratio
      CATHEDRAL_RATIO: 144 / 99, // 1.454545...
      CATHEDRAL_INVERSE: 99 / 144, // 0.6875
      
      // Golden ratio (phi)
      PHI: (1 + Math.sqrt(5)) / 2, // 1.618033988749...
      PHI_INVERSE: (Math.sqrt(5) - 1) / 2, // ~0.618
      PHI_SQUARED: Math.pow((1 + Math.sqrt(5)) / 2, 2), // ~2.618
      
      // Sacred square roots
      SQRT_2: Math.sqrt(2), // ~1.414
      SQRT_3: Math.sqrt(3), // ~1.732
      SQRT_5: Math.sqrt(5), // ~2.236
      
      // Fibonacci sequence
      FIBONACCI: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987],
      
      // Solfeggio frequencies
      SOLFEGGIO: {
        UT: 396,    // Liberation from fear
        RE: 417,    // Undoing situations
        MI: 528,    // Transformation/DNA repair
        FA: 639,    // Connecting/relationships
        SOL: 741,   // Awakening intuition
        LA: 852,    // Returning to spiritual order
        SI: 963     // Divine consciousness
      }
    };

    this.connections = {
      frequencyToProportion: {},
      proportionToFrequency: {},
      harmonicToGeometry: {},
      geometryToHarmonic: {}
    };
  }

  async connect() {
    logger.info('🔗 Connecting sound synthesis to design mathematics...');

    // Create frequency-to-proportion mappings
    this.createFrequencyToProportionMappings();
    
    // Create proportion-to-frequency mappings
    this.createProportionToFrequencyMappings();
    
    // Create harmonic-to-geometry mappings
    this.createHarmonicToGeometryMappings();
    
    // Create geometry-to-harmonic mappings
    this.createGeometryToHarmonicMappings();
    
    // Create unified synthesis parameters
    this.createUnifiedSynthesisParameters();
    
    // Generate integration code
    this.generateIntegrationCode();

    return this.connections;
  }

  createFrequencyToProportionMappings() {
    // Map frequencies to design proportions using golden ratio
    const baseFrequencies = Object.values(this.SACRED_MATH.SOLFEGGIO);
    
    baseFrequencies.forEach(freq => {
      // Calculate proportion using golden ratio
      const proportion = freq / 440; // A4 reference
      const goldenProportion = proportion * this.SACRED_MATH.PHI_INVERSE;
      
      this.connections.frequencyToProportion[freq] = {
        frequency: freq,
        proportion: goldenProportion,
        goldenRatio: this.SACRED_MATH.PHI,
        designScale: this.calculateDesignScale(freq),
        layoutRatio: this.calculateLayoutRatio(freq)
      };
    });

    logger.info(`✨ Created ${Object.keys(this.connections.frequencyToProportion).length} frequency-to-proportion mappings`);
  }

  createProportionToFrequencyMappings() {
    // Map design proportions to frequencies
    const proportions = [
      this.SACRED_MATH.PHI_INVERSE, // 0.618 (golden section)
      this.SACRED_MATH.PHI, // 1.618 (golden ratio)
      this.SACRED_MATH.SQRT_2, // 1.414
      this.SACRED_MATH.SQRT_3, // 1.732
      this.SACRED_MATH.CATHEDRAL_RATIO, // 1.4545
      1.0, // Unity
      2.0, // Octave
      1.5, // Perfect fifth
      1.333, // Perfect fourth
    ];

    proportions.forEach(prop => {
      // Calculate frequency from proportion
      const baseFreq = 440; // A4
      const freq = baseFreq * prop;
      
      this.connections.proportionToFrequency[prop] = {
        proportion: prop,
        frequency: freq,
        nearestSolfeggio: this.findNearestSolfeggio(freq),
        harmonicRatio: this.calculateHarmonicRatio(freq),
        designApplication: this.getDesignApplication(prop)
      };
    });

    logger.info(`✨ Created ${Object.keys(this.connections.proportionToFrequency).length} proportion-to-frequency mappings`);
  }

  createHarmonicToGeometryMappings() {
    // Map harmonic intervals to geometric shapes
    const harmonicIntervals = {
      unison: 1.0,
      octave: 2.0,
      perfectFifth: 1.5,
      perfectFourth: 1.333,
      majorThird: 1.25,
      minorThird: 1.2,
      goldenRatio: this.SACRED_MATH.PHI
    };

    Object.entries(harmonicIntervals).forEach(([name, ratio]) => {
      this.connections.harmonicToGeometry[name] = {
        harmonicRatio: ratio,
        geometricShape: this.getGeometricShape(ratio),
        sacredGeometry: this.getSacredGeometry(ratio),
        designProportion: ratio,
        soundFrequency: 440 * ratio
      };
    });

    logger.info(`✨ Created ${Object.keys(this.connections.harmonicToGeometry).length} harmonic-to-geometry mappings`);
  }

  createGeometryToHarmonicMappings() {
    // Map geometric shapes to harmonic intervals
    const geometries = {
      circle: { ratio: 1.0, description: 'Unity, completeness' },
      square: { ratio: this.SACRED_MATH.SQRT_2, description: 'Dynamic symmetry' },
      triangle: { ratio: this.SACRED_MATH.SQRT_3, description: 'Trinity, stability' },
      pentagon: { ratio: this.SACRED_MATH.PHI, description: 'Golden ratio, life force' },
      hexagon: { ratio: 1.732, description: 'Harmony, balance' },
      octagon: { ratio: this.SACRED_MATH.CATHEDRAL_RATIO, description: 'Cathedral ratio' }
    };

    Object.entries(geometries).forEach(([shape, data]) => {
      this.connections.geometryToHarmonic[shape] = {
        shape: shape,
        ratio: data.ratio,
        description: data.description,
        harmonicInterval: this.getHarmonicInterval(data.ratio),
        frequency: 440 * data.ratio,
        solfeggioMapping: this.findNearestSolfeggio(440 * data.ratio)
      };
    });

    logger.info(`✨ Created ${Object.keys(this.connections.geometryToHarmonic).length} geometry-to-harmonic mappings`);
  }

  createUnifiedSynthesisParameters() {
    // Create unified parameters that work for both sound and design
    this.unifiedParameters = {
      // Golden ratio based
      goldenRatio: {
        sound: {
          frequency: 440 * this.SACRED_MATH.PHI,
          harmonic: this.SACRED_MATH.PHI,
          interval: 'golden ratio interval'
        },
        design: {
          proportion: this.SACRED_MATH.PHI,
          layout: 'golden rectangle',
          spacing: this.SACRED_MATH.PHI_INVERSE
        }
      },
      
      // Cathedral ratio based
      cathedralRatio: {
        sound: {
          frequency: 440 * this.SACRED_MATH.CATHEDRAL_RATIO,
          harmonic: this.SACRED_MATH.CATHEDRAL_RATIO,
          interval: 'cathedral ratio interval'
        },
        design: {
          proportion: this.SACRED_MATH.CATHEDRAL_RATIO,
          layout: 'cathedral proportion',
          spacing: this.SACRED_MATH.CATHEDRAL_INVERSE
        }
      },
      
      // Fibonacci based
      fibonacci: {
        sound: {
          frequencies: this.SACRED_MATH.FIBONACCI.slice(0, 8).map(f => 440 * (f / 144)),
          harmonics: this.SACRED_MATH.FIBONACCI.slice(0, 8).map(f => f / 144),
          intervals: 'fibonacci intervals'
        },
        design: {
          sizes: this.SACRED_MATH.FIBONACCI.slice(0, 8),
          spacing: this.SACRED_MATH.FIBONACCI.slice(0, 8).map((f, i) => 
            i > 0 ? f / this.SACRED_MATH.FIBONACCI[i - 1] : 1
          ),
          proportions: 'fibonacci proportions'
        }
      },
      
      // Solfeggio based
      solfeggio: {
        sound: {
          frequencies: Object.values(this.SACRED_MATH.SOLFEGGIO),
          harmonics: Object.values(this.SACRED_MATH.SOLFEGGIO).map(f => f / 440),
          intervals: 'solfeggio frequencies'
        },
        design: {
          proportions: Object.values(this.SACRED_MATH.SOLFEGGIO).map(f => f / 440),
          colors: this.mapFrequenciesToColors(Object.values(this.SACRED_MATH.SOLFEGGIO)),
          layouts: 'solfeggio-based layouts'
        }
      }
    };

    logger.info('✨ Created unified synthesis parameters');
  }

  calculateDesignScale(frequency) {
    // Convert frequency to design scale (0-1)
    const minFreq = 396; // UT
    const maxFreq = 963; // SI
    return (frequency - minFreq) / (maxFreq - minFreq);
  }

  calculateLayoutRatio(frequency) {
    // Calculate layout ratio from frequency using golden ratio
    const baseRatio = frequency / 440;
    return baseRatio * this.SACRED_MATH.PHI_INVERSE;
  }

  findNearestSolfeggio(frequency) {
    const solfeggioFreqs = Object.values(this.SACRED_MATH.SOLFEGGIO);
    const solfeggioNames = Object.keys(this.SACRED_MATH.SOLFEGGIO);
    
    let nearest = solfeggioFreqs[0];
    let nearestName = solfeggioNames[0];
    let minDiff = Math.abs(frequency - nearest);
    
    solfeggioFreqs.forEach((freq, i) => {
      const diff = Math.abs(frequency - freq);
      if (diff < minDiff) {
        minDiff = diff;
        nearest = freq;
        nearestName = solfeggioNames[i];
      }
    });
    
    return { name: nearestName, frequency: nearest, difference: minDiff };
  }

  calculateHarmonicRatio(frequency) {
    // Calculate harmonic ratio relative to A4 (440Hz)
    return frequency / 440;
  }

  getDesignApplication(proportion) {
    if (proportion === this.SACRED_MATH.PHI_INVERSE) {
      return 'Golden section layout';
    } else if (proportion === this.SACRED_MATH.PHI) {
      return 'Golden rectangle';
    } else if (proportion === this.SACRED_MATH.SQRT_2) {
      return 'Dynamic symmetry';
    } else if (proportion === this.SACRED_MATH.CATHEDRAL_RATIO) {
      return 'Cathedral proportion';
    }
    return 'General proportion';
  }

  getGeometricShape(ratio) {
    if (Math.abs(ratio - 1.0) < 0.01) return 'circle';
    if (Math.abs(ratio - this.SACRED_MATH.SQRT_2) < 0.01) return 'square';
    if (Math.abs(ratio - this.SACRED_MATH.SQRT_3) < 0.01) return 'triangle';
    if (Math.abs(ratio - this.SACRED_MATH.PHI) < 0.01) return 'pentagon';
    if (Math.abs(ratio - 1.732) < 0.01) return 'hexagon';
    return 'custom';
  }

  getSacredGeometry(ratio) {
    if (Math.abs(ratio - this.SACRED_MATH.PHI) < 0.01) {
      return 'Golden ratio spiral';
    } else if (Math.abs(ratio - this.SACRED_MATH.SQRT_2) < 0.01) {
      return 'Vesica piscis';
    } else if (Math.abs(ratio - this.SACRED_MATH.SQRT_3) < 0.01) {
      return 'Flower of life';
    }
    return 'Sacred geometry pattern';
  }

  getHarmonicInterval(ratio) {
    if (Math.abs(ratio - 1.0) < 0.01) return 'unison';
    if (Math.abs(ratio - 2.0) < 0.01) return 'octave';
    if (Math.abs(ratio - 1.5) < 0.01) return 'perfect fifth';
    if (Math.abs(ratio - 1.333) < 0.01) return 'perfect fourth';
    if (Math.abs(ratio - this.SACRED_MATH.PHI) < 0.01) return 'golden ratio interval';
    return 'custom interval';
  }

  mapFrequenciesToColors(frequencies) {
    // Map frequencies to colors using chakra/planetary correspondences
    const colorMap = {
      396: '#8B0000', // Deep red (root chakra)
      417: '#FF4500', // Orange-red (sacral chakra)
      528: '#FFD700', // Gold (solar plexus)
      639: '#32CD32', // Lime green (heart chakra)
      741: '#4169E1', // Royal blue (throat chakra)
      852: '#9370DB', // Medium purple (third eye)
      963: '#FF1493'  // Deep pink (crown chakra)
    };
    
    return frequencies.map(freq => {
      const nearest = this.findNearestSolfeggio(freq);
      return {
        frequency: freq,
        color: colorMap[freq] || '#FFFFFF',
        chakra: this.getChakraForFrequency(freq)
      };
    });
  }

  getChakraForFrequency(freq) {
    const chakraMap = {
      396: 'Root',
      417: 'Sacral',
      528: 'Solar Plexus',
      639: 'Heart',
      741: 'Throat',
      852: 'Third Eye',
      963: 'Crown'
    };
    return chakraMap[freq] || 'Unknown';
  }

  generateIntegrationCode() {
    // Generate TypeScript/JavaScript code for integration
    this.integrationCode = {
      typescript: this.generateTypeScriptCode(),
      javascript: this.generateJavaScriptCode(),
      examples: this.generateExamples()
    };
  }

  generateTypeScriptCode() {
    return `// Synth-Design Math Integration
// Generated by connect-synths-to-design-math.mjs

export const SYNTH_DESIGN_MATH = {
  // Sacred Mathematics Constants
  CATHEDRAL_RATIO: ${this.SACRED_MATH.CATHEDRAL_RATIO},
  PHI: ${this.SACRED_MATH.PHI},
  PHI_INVERSE: ${this.SACRED_MATH.PHI_INVERSE},
  
  // Frequency to Proportion
  frequencyToProportion: (freq: number) => {
    const proportion = freq / 440;
    return proportion * ${this.SACRED_MATH.PHI_INVERSE};
  },
  
  // Proportion to Frequency
  proportionToFrequency: (proportion: number) => {
    return 440 * proportion;
  },
  
  // Harmonic to Geometry
  harmonicToGeometry: (harmonic: number) => {
    // Returns geometric shape based on harmonic ratio
    if (Math.abs(harmonic - ${this.SACRED_MATH.PHI}) < 0.01) return 'pentagon';
    if (Math.abs(harmonic - ${this.SACRED_MATH.SQRT_2}) < 0.01) return 'square';
    if (Math.abs(harmonic - ${this.SACRED_MATH.SQRT_3}) < 0.01) return 'triangle';
    return 'circle';
  },
  
  // Geometry to Harmonic
  geometryToHarmonic: (shape: string) => {
    const map = {
      'circle': 1.0,
      'square': ${this.SACRED_MATH.SQRT_2},
      'triangle': ${this.SACRED_MATH.SQRT_3},
      'pentagon': ${this.SACRED_MATH.PHI}
    };
    return map[shape] || 1.0;
  }
};`;
  }

  generateJavaScriptCode() {
    return `// Synth-Design Math Integration
// Generated by connect-synths-to-design-math.mjs

export const synthDesignMath = {
  // Frequency to Design Proportion
  frequencyToProportion(freq) {
    const proportion = freq / 440;
    return proportion * ${this.SACRED_MATH.PHI_INVERSE};
  },
  
  // Design Proportion to Frequency
  proportionToFrequency(proportion) {
    return 440 * proportion;
  },
  
  // Get Unified Parameters
  getUnifiedParameters(type) {
    return this.unifiedParameters[type];
  }
};`;
  }

  generateExamples() {
    return {
      frequencyToLayout: {
        description: 'Convert frequency to layout proportion',
        code: `const freq = 528; // MI - Transformation
const layoutProportion = synthDesignMath.frequencyToProportion(freq);
// Use layoutProportion for golden ratio layout`
      },
      proportionToFrequency: {
        description: 'Convert design proportion to frequency',
        code: `const proportion = 1.618; // Golden ratio
const frequency = synthDesignMath.proportionToFrequency(proportion);
// Use frequency for sound synthesis`
      },
      unifiedSynthesis: {
        description: 'Use unified parameters for both sound and design',
        code: `const params = synthDesignMath.getUnifiedParameters('goldenRatio');
// params.sound.frequency - for synthesis
// params.design.proportion - for layout`
      }
    };
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        frequencyToProportionMappings: Object.keys(this.connections.frequencyToProportion).length,
        proportionToFrequencyMappings: Object.keys(this.connections.proportionToFrequency).length,
        harmonicToGeometryMappings: Object.keys(this.connections.harmonicToGeometry).length,
        geometryToHarmonicMappings: Object.keys(this.connections.geometryToHarmonic).length,
        unifiedParameters: Object.keys(this.unifiedParameters).length
      },
      connections: this.connections,
      unifiedParameters: this.unifiedParameters,
      integrationCode: this.integrationCode,
      usageExamples: {
        frequencyToDesign: 'Use frequencies to calculate design proportions',
        designToFrequency: 'Use design proportions to calculate frequencies',
        unifiedSynthesis: 'Use unified parameters for both sound and visual design'
      }
    };

    return report;
  }
}

// Main execution
async function main() {
  const connector = new SynthDesignMathConnector();
  await connector.connect();
  const report = connector.generateReport();

  logger.info(`✨ Connected ${report.summary.frequencyToProportionMappings} frequencies to proportions`);
  logger.info(`✨ Connected ${report.summary.proportionToFrequencyMappings} proportions to frequencies`);

  // Save to file
  const fs = await import('fs');
  const reportPath = join(__dirname, '..', 'docs', 'SYNTH_DESIGN_MATH_CONNECTION.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  // Save integration code
  const codePath = join(__dirname, '..', 'packages', 'synth-design-math-core', 'src', 'index.ts');
  const codeDir = join(__dirname, '..', 'packages', 'synth-design-math-core', 'src');
  fs.mkdirSync(codeDir, { recursive: true });
  fs.writeFileSync(codePath, report.integrationCode.typescript);

  logger.success(`📄 Report saved to ${reportPath}`);
  logger.success(`📄 Integration code saved to ${codePath}`);

  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    logger.error(`Connection failed: ${error.message}`);
    process.exit(1);
  });
}

export { SynthDesignMathConnector };

