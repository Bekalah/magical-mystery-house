/**
 * Cathedral Design Library
 * Figma-style design system integrating sacred mathematics, psychology, and ancient wisdom
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

import {
  DesignComponent,
  DesignLibrary,
  DesignStudio,
  DesignCanvas,
  SacredGrid,
  DesignTools,
  DesignWorkflows,
  DesignProperties,
  DesignStyles,
  DesignBehaviors,
  PhilosophicalAspects,
  PsychologicalAspects,
  AnthropologicalAspects,
  ScientificAspects,
  DesignFusion,
  DesignEvolution
} from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CathedralDesignLibrary {
  private library: DesignLibrary;
  private studio: DesignStudio;
  private sacredSystems: any;

  constructor() {
    this.library = {
      components: new Map(),
      categories: new Map(),
      systems: new Map(),
      integrations: new Map(),
      evolutions: new Map()
    };

    this.studio = {
      library: this.library,
      activeComponents: new Map(),
      canvas: this.createCanvas(),
      tools: this.createTools(),
      workflows: this.createWorkflows()
    };

    this.initializeLibrary();
  }

  private createCanvas(): DesignCanvas {
    return {
      width: 1920,
      height: 1080,
      components: [],
      connections: [],
      layers: [],
      sacredGrid: this.createSacredGrid()
    };
  }

  private createSacredGrid(): SacredGrid {
    return {
      type: 'golden',
      ratio: 1.618033988749,
      divisions: 144,
      harmonics: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
      sacredPoints: []
    };
  }

  private createTools(): DesignTools {
    return {
      selection: {
        mode: 'sacred',
        filters: ['sacred', 'psychological', 'philosophical'],
        criteria: ['resonance', 'harmony', 'integration'],
        sacred: true,
        psychological: true
      },
      transformation: {
        type: 'sacred',
        operations: ['rotate', 'scale', 'mirror', 'fuse'],
        constraints: ['sacred-ratio', 'harmony', 'resonance'],
        validations: ['mathematical', 'psychological', 'spiritual']
      },
      fusion: {
        types: ['elemental', 'archetypal', 'sacred', 'psychological'],
        intensities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        safety: true,
        consent: true,
        transformation: true
      },
      analysis: {
        depth: 'integral',
        aspects: ['philosophical', 'psychological', 'anthropological', 'scientific'],
        integrations: ['sacred', 'profane', 'personal', 'collective'],
        insights: ['platonic', 'jungian', 'ifs', 'levy']
      },
      generation: {
        method: 'sacred',
        sources: ['codex-144-99', 'liber-arcanae', 'fusion-kink'],
        constraints: ['sacred-mathematics', 'psychological-safety', 'cultural-respect'],
        validations: ['mathematical', 'psychological', 'anthropological', 'scientific']
      },
      integration: {
        systems: ['codex-144-99', 'liber-arcanae', 'fusion-kink', 'ifs', 'integral'],
        relationships: ['resonance', 'harmony', 'synergy', 'evolution'],
        synergies: ['platonic-jungian', 'sacred-profane', 'individual-collective'],
        harmonies: ['mathematical', 'psychological', 'spiritual', 'cultural']
      }
    };
  }

  private createWorkflows(): DesignWorkflows {
    return {
      creation: {
        stages: ['inspiration', 'foundation', 'development', 'refinement', 'completion'],
        requirements: ['sacred-intent', 'psychological-awareness', 'cultural-respect'],
        validations: ['mathematical', 'psychological', 'anthropological'],
        transformations: ['alchemical', 'psychological', 'spiritual']
      },
      fusion: {
        preparation: ['consent', 'safety', 'grounding', 'intention'],
        fusion: ['connection', 'merging', 'transformation', 'integration'],
        integration: ['embodiment', 'expression', 'sharing', 'evolution'],
        manifestation: ['creation', 'refinement', 'completion', 'celebration']
      },
      evolution: {
        assessment: ['reflection', 'analysis', 'insight', 'direction'],
        transformation: ['preparation', 'process', 'integration', 'manifestation'],
        integration: ['personal', 'interpersonal', 'transpersonal', 'cosmic'],
        manifestation: ['expression', 'communication', 'impact', 'continuity']
      },
      integration: {
        analysis: ['systems', 'relationships', 'dynamics', 'potentials'],
        connection: ['resonance', 'harmony', 'synergy', 'unity'],
        synergy: ['amplification', 'enhancement', 'transformation', 'evolution'],
        harmony: ['balance', 'integration', 'wholeness', 'perfection']
      },
      manifestation: {
        preparation: ['grounding', 'centering', 'intention', 'invocation'],
        creation: ['inspiration', 'expression', 'formation', 'refinement'],
        enhancement: ['amplification', 'beautification', 'sanctification', 'celebration'],
        completion: ['integration', 'sharing', 'documentation', 'continuation']
      }
    };
  }

  private initializeLibrary(): void {
    this.loadSacredComponents();
    this.loadPsychologicalComponents();
    this.loadPhilosophicalComponents();
    this.loadAnthropologicalComponents();
    this.loadScientificComponents();
    this.setupSacredGrid();
    this.initializeWorkflows();
  }

  private loadSacredComponents(): void {
    // Load components based on Codex 144:99 nodes
    const sacredComponents = this.generateSacredComponents();
    sacredComponents.forEach(component => {
      this.library.components.set(component.id, component);
      this.addToCategory('sacred', component);
    });
  }

  private loadPsychologicalComponents(): void {
    // Load components based on psychological frameworks
    const psychComponents = this.generatePsychologicalComponents();
    psychComponents.forEach(component => {
      this.library.components.set(component.id, component);
      this.addToCategory('psychological', component);
    });
  }

  private loadPhilosophicalComponents(): void {
    // Load components based on philosophical traditions
    const philComponents = this.generatePhilosophicalComponents();
    philComponents.forEach(component => {
      this.library.components.set(component.id, component);
      this.addToCategory('philosophical', component);
    });
  }

  private loadAnthropologicalComponents(): void {
    // Load components based on cultural traditions
    const anthroComponents = this.generateAnthropologicalComponents();
    anthroComponents.forEach(component => {
      this.library.components.set(component.id, component);
      this.addToCategory('anthropological', component);
    });
  }

  private loadScientificComponents(): void {
    // Load components based on scientific principles
    const scienceComponents = this.generateScientificComponents();
    scienceComponents.forEach(component => {
      this.library.components.set(component.id, component);
      this.addToCategory('scientific', component);
    });
  }

  private generateSacredComponents(): DesignComponent[] {
    const components: DesignComponent[] = [];

    // Generate components for each Codex node
    for (let i = 1; i <= 12; i++) {
      const node = this.getCodexNode(i);
      if (node) {
        const component = this.createSacredComponent(node);
        components.push(component);
      }
    }

    return components;
  }

  private generatePsychologicalComponents(): DesignComponent[] {
    const components: DesignComponent[] = [];

    // Jungian archetypes
    const jungian = this.createJungianComponents();
    components.push(...jungian);

    // IFS parts
    const ifs = this.createIFSComponents();
    components.push(...ifs);

    // Paul Levy wetiko
    const levy = this.createLevyComponents();
    components.push(...levy);

    // Integral psychology
    const integral = this.createIntegralComponents();
    components.push(...integral);

    return components;
  }

  private generatePhilosophicalComponents(): DesignComponent[] {
    const components: DesignComponent[] = [];

    // Platonic forms
    const platonic = this.createPlatonicComponents();
    components.push(...platonic);

    // Hermetic principles
    const hermetic = this.createHermeticComponents();
    components.push(...hermetic);

    // Alchemical stages
    const alchemical = this.createAlchemicalComponents();
    components.push(...alchemical);

    return components;
  }

  private generateAnthropologicalComponents(): DesignComponent[] {
    const components: DesignComponent[] = [];

    // Cultural traditions
    const cultural = this.createCulturalComponents();
    components.push(...cultural);

    // Sociological patterns
    const sociological = this.createSociologicalComponents();
    components.push(...sociological);

    // Traditional crafts
    const traditional = this.createTraditionalComponents();
    components.push(...traditional);

    return components;
  }

  private generateScientificComponents(): DesignComponent[] {
    const components: DesignComponent[] = [];

    // Sacred mathematics
    const math = this.createMathematicalComponents();
    components.push(...math);

    // Quantum consciousness
    const quantum = this.createQuantumComponents();
    components.push(...quantum);

    // Biological systems
    const biological = this.createBiologicalComponents();
    components.push(...biological);

    return components;
  }

  private createSacredComponent(node: any): DesignComponent {
    return {
      id: `sacred_${node.id}`,
      name: `${node.name} Design Component`,
      type: 'pattern',
      category: 'sacred',

      codexNode: node.id,
      properties: this.createSacredProperties(node),
      styles: this.createSacredStyles(node),
      behaviors: this.createSacredBehaviors(node),

      philosophy: this.createPlatonicAspects(node),
      psychology: this.createJungianAspects(node),
      anthropology: this.createCulturalAspects(node),
      science: this.createMathematicalAspects(node),

      fusion: this.createSacredFusion(node),
      evolution: this.createSacredEvolution(node)
    };
  }

  private createJungianComponents(): DesignComponent[] {
    const archetypes = [
      'self', 'persona', 'shadow', 'anima', 'animus',
      'hero', 'maiden', 'wise-old-man', 'great-mother',
      'trickster', 'child', 'sage', 'creator', 'destroyer'
    ];

    return archetypes.map(archetype => ({
      id: `jungian_${archetype}`,
      name: `${archetype.charAt(0).toUpperCase() + archetype.slice(1)} Archetype`,
      type: 'symbol',
      category: 'psychological',

      properties: {
        dimensions: { width: 200, height: 200 },
        position: { x: 0, y: 0 },
        rotation: 0,
        scale: 1,
        sacredRatio: 1.618,
        fibonacciSequence: [1, 1, 2, 3, 5, 8, 13, 21],
        goldenAngle: 137.5,
        harmonicRatios: [1, 2, 3, 5, 8]
      },

      psychology: {
        jungian: {
          archetypes: [archetype],
          complexes: [],
          persona: [],
          shadow: [],
          animaAnimus: [],
          self: []
        },
        integral: {
          levels: ['surface', 'psychological', 'spiritual'],
          lines: ['cognitive', 'emotional', 'spiritual'],
          states: ['waking', 'dreaming', 'deep-sleep'],
          types: ['personality-types'],
          altitudes: ['egocentric', 'ethnocentric', 'worldcentric']
        },
        ifs: {
          parts: ['exiles', 'managers', 'firefighters'],
          self: ['compassionate-witness'],
          exiles: ['vulnerable-parts'],
          managers: ['protective-parts'],
          firefighters: ['reactive-parts']
        },
        levy: {
          wetiko: ['collective-shadow'],
          awakening: ['consciousness-expansion'],
          collective: ['group-mind'],
          individual: ['personal-growth'],
          transformation: ['paradigm-shift']
        },
        depth: {
          unconscious: ['personal', 'collective'],
          dreams: ['lucid', 'archetypal'],
          symbols: ['universal', 'personal'],
          myths: ['hero-journey', 'transformation'],
          healing: ['integration', 'wholeness']
        }
      },

      fusion: {
        kink: {
          type: 'archetypal-integration',
          intensity: 7,
          mechanics: ['shadow-integration', 'anima-animus-union'],
          safety: ['trauma-informed', 'grounding'],
          consent: ['self-consent', 'part-consent'],
          transformation: ['wholeness', 'integration']
        },
        transformation: {
          physical: ['embodiment'],
          emotional: ['integration'],
          spiritual: ['transcendence'],
          energetic: ['alignment'],
          consciousness: ['expansion']
        },
        integration: {
          personal: ['self-integration'],
          interpersonal: ['relationship-harmony'],
          transpersonal: ['collective-unity'],
          cosmic: ['universal-connection'],
          divine: ['sacred-union']
        },
        evolution: {
          stages: ['awareness', 'acceptance', 'integration', 'transcendence'],
          processes: ['analysis', 'synthesis', 'transformation'],
          outcomes: ['wholeness', 'wisdom', 'compassion'],
          continuations: ['ongoing-growth', 'deeper-understanding'],
          completions: ['self-realization', 'universal-love']
        },
        manifestation: {
          forms: ['symbolic-expression'],
          expressions: ['creative-works'],
          communications: ['deep-sharing'],
          impacts: ['healing', 'transformation'],
          eternities: ['timeless-wisdom']
        }
      },

      evolution: {
        current: {} as DesignComponent,
        history: [],
        potential: [],
        evolution: [],
        integration: []
      }
    }));
  }

  private createIFSComponents(): DesignComponent[] {
    const ifsParts = [
      'exiles', 'managers', 'firefighters', 'self'
    ];

    return ifsParts.map(part => ({
      id: `ifs_${part}`,
      name: `${part.charAt(0).toUpperCase() + part.slice(1)} Part`,
      type: 'interface',
      category: 'psychological',

      psychology: {
        ifs: {
          parts: [part],
          self: ['compassionate-witness'],
          exiles: part === 'exiles' ? ['vulnerable-emotions'] : [],
          managers: part === 'managers' ? ['protective-strategies'] : [],
          firefighters: part === 'firefighters' ? ['reactive-behaviors'] : []
        }
      }
    }));
  }

  private createLevyComponents(): DesignComponent[] {
    const wetikoAspects = [
      'collective-shadow', 'mind-virus', 'awakening', 'transformation'
    ];

    return wetikoAspects.map(aspect => ({
      id: `levy_${aspect}`,
      name: `${aspect.charAt(0).toUpperCase() + aspect.slice(1)} Aspect`,
      type: 'pattern',
      category: 'psychological',

      psychology: {
        levy: {
          wetiko: aspect.includes('shadow') ? ['mind-parasite'] : [],
          awakening: aspect.includes('awakening') ? ['consciousness-expansion'] : [],
          collective: ['group-dynamics'],
          individual: ['personal-growth'],
          transformation: ['paradigm-shift']
        }
      }
    }));
  }

  private createPlatonicComponents(): DesignComponent[] {
    const platonicForms = [
      'good', 'beautiful', 'true', 'just', 'perfect', 'eternal'
    ];

    return platonicForms.map(form => ({
      id: `platonic_${form}`,
      name: `${form.charAt(0).toUpperCase() + form.slice(1)} Form`,
      type: 'layout',
      category: 'philosophical',

      philosophy: {
        platonic: {
          form: 'ideal',
          solids: ['tetrahedron', 'cube', 'octahedron', 'icosahedron', 'dodecahedron'],
          proportions: [1, 1.414, 1.618, 2, 2.718, 3.14159],
          harmony: ['mathematical', 'musical', 'cosmic'],
          truth: ['eternal', 'universal', 'absolute']
        }
      }
    }));
  }

  private createHermeticComponents(): DesignComponent[] {
    const hermeticPrinciples = [
      'mentalism', 'correspondence', 'vibration', 'polarity', 'rhythm', 'cause-effect', 'gender'
    ];

    return hermeticPrinciples.map(principle => ({
      id: `hermetic_${principle}`,
      name: `${principle.charAt(0).toUpperCase() + principle.slice(1)} Principle`,
      type: 'symbol',
      category: 'philosophical',

      philosophy: {
        hermetic: {
          principles: [principle],
          correspondences: ['as-above-so-below', 'as-below-so-above'],
          transformations: ['mental', 'spiritual', 'physical'],
          wisdom: ['ancient', 'eternal', 'universal'],
          unity: ['all-is-one', 'one-is-all']
        }
      }
    }));
  }

  private createAlchemicalComponents(): DesignComponent[] {
    const alchemicalStages = [
      'nigredo', 'albedo', 'citrinitas', 'rubedo'
    ];

    return alchemicalStages.map(stage => ({
      id: `alchemical_${stage}`,
      name: `${stage.charAt(0).toUpperCase() + stage.slice(1)} Stage`,
      type: 'color',
      category: 'philosophical',

      philosophy: {
        alchemical: {
          stage: stage as any,
          elements: ['sulfur', 'mercury', 'salt'],
          operations: ['dissolve', 'coagulate', 'separate', 'unite'],
          symbols: ['🜍', '🜞', '🜔', '🜂'],
          goals: ['purification', 'illumination', 'union', 'perfection']
        }
      }
    }));
  }

  private createCulturalComponents(): DesignComponent[] {
    const cultures = [
      'egyptian', 'greek', 'roman', 'celtic', 'nordic',
      'hindu', 'buddhist', 'chinese', 'japanese', 'indigenous'
    ];

    return cultures.map(culture => ({
      id: `cultural_${culture}`,
      name: `${culture.charAt(0).toUpperCase() + culture.slice(1)} Tradition`,
      type: 'pattern',
      category: 'anthropological',

      anthropology: {
        cultural: {
          traditions: [culture],
          rituals: ['ceremonial', 'seasonal', 'life-cycle'],
          symbols: ['archetypal', 'cultural', 'universal'],
          values: ['spiritual', 'communal', 'ecological'],
          practices: ['artistic', 'musical', 'dance']
        }
      }
    }));
  }

  private createMathematicalComponents(): DesignComponent[] {
    const mathConcepts = [
      'fibonacci', 'golden-ratio', 'sacred-geometry', 'fractals', 'topology'
    ];

    return mathConcepts.map(concept => ({
      id: `mathematical_${concept}`,
      name: `${concept.charAt(0).toUpperCase() + concept.slice(1)} System`,
      type: 'layout',
      category: 'scientific',

      science: {
        mathematics: {
          sacred: [concept],
          platonic: ['ideal-forms'],
          fibonacci: concept === 'fibonacci' ? ['spiral', 'sequence', 'growth'] : [],
          fractal: concept === 'fractals' ? ['self-similar', 'infinite', 'recursive'] : [],
          topological: concept === 'topology' ? ['connectedness', 'continuity', 'boundaries'] : []
        }
      }
    }));
  }

  private createQuantumComponents(): DesignComponent[] {
    const quantumConcepts = [
      'entanglement', 'superposition', 'wave-function', 'observer-effect'
    ];

    return quantumConcepts.map(concept => ({
      id: `quantum_${concept}`,
      name: `${concept.charAt(0).toUpperCase() + concept.slice(1)} Principle`,
      type: 'interface',
      category: 'scientific',

      science: {
        physics: {
          quantum: [concept],
          relativity: ['spacetime', 'gravity', 'light'],
          field: ['electromagnetic', 'quantum', 'consciousness'],
          energy: ['vibration', 'frequency', 'resonance'],
          matter: ['wave', 'particle', 'consciousness']
        }
      }
    }));
  }

  private createSacredProperties(node: any): DesignProperties {
    return {
      dimensions: { width: 200, height: 200 },
      position: { x: 0, y: 0 },
      rotation: 0,
      scale: 1,
      sacredRatio: 1.618033988749,
      fibonacciSequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
      goldenAngle: 137.507764,
      harmonicRatios: [1, 2, 3, 5, 8, 13, 21]
    };
  }

  private createSacredStyles(node: any): DesignStyles {
    return {
      colorPalette: {
        primary: [node.color],
        secondary: this.generateHarmonicColors(node.color),
        accent: this.generateAccentColors(node.color),
        harmony: this.generateHarmonyColors(node.color),
        dissonance: this.generateDissonantColors(node.color),
        sacred: this.generateSacredColors(node.element)
      },
      harmony: {
        type: 'sacred',
        ratios: [1, 1.618, 2.618, 4.236],
        chakras: [node.chakra],
        elements: [node.element],
        planets: [node.planet]
      },
      psychology: {
        emotional: ['inspiring', 'grounding', 'transformative'],
        cultural: ['universal', 'timeless', 'archetypal'],
        archetypal: [node.narrative.archetype],
        therapeutic: ['healing', 'balancing', 'harmonizing'],
        symbolic: [node.symbolism.primarySymbol]
      }
    };
  }

  private createSacredBehaviors(node: any): DesignBehaviors {
    return {
      hover: [{
        trigger: 'hover',
        action: 'illuminate',
        result: 'sacred-glow',
        duration: 1000,
        intensity: 0.7,
        sacred: ['divine-light', 'wisdom-revelation']
      }],
      click: [{
        trigger: 'click',
        action: 'activate',
        result: 'sacred-resonance',
        duration: 2000,
        intensity: 0.9,
        sacred: ['node-activation', 'consciousness-expansion']
      }],
      drag: [{
        trigger: 'drag',
        action: 'transform',
        result: 'sacred-movement',
        duration: 500,
        intensity: 0.6,
        sacred: ['energy-flow', 'consciousness-streaming']
      }],
      transform: [{
        trigger: 'transform',
        action: 'evolve',
        result: 'sacred-evolution',
        duration: 3000,
        intensity: 1.0,
        sacred: ['alchemical-transformation', 'spiritual-evolution']
      }],
      breakpoints: {},
      adaptive: true,
      contextual: true,
      ritual: [{
        name: 'sacred-activation',
        purpose: 'awaken-node-consciousness',
        steps: ['center', 'breathe', 'invoke', 'activate', 'integrate'],
        duration: 300,
        participants: ['self'],
        materials: ['sacred-space', 'intention'],
        outcomes: ['consciousness-expansion', 'wisdom-integration']
      }],
      meditative: [{
        focus: 'sacred-resonance',
        technique: 'contemplative-absorption',
        duration: 600,
        depth: ['awareness', 'concentration', 'absorption', 'unity'],
        insights: ['node-wisdom', 'universal-truth', 'personal-integration'],
        integrations: ['daily-practice', 'creative-work', 'spiritual-path']
      }],
      transformative: [{
        catalyst: 'sacred-intention',
        process: 'alchemical-transformation',
        alchemy: ['nigredo', 'albedo', 'citrinitas', 'rubedo'],
        psychology: ['shadow-integration', 'anima-animus-union', 'self-realization'],
        spirituality: ['divine-connection', 'universal-love', 'cosmic-consciousness']
      }]
    };
  }

  private createPlatonicAspects(node: any): PhilosophicalAspects {
    return {
      platonic: {
        form: 'ideal',
        solids: ['tetrahedron', 'cube', 'octahedron', 'dodecahedron', 'icosahedron'],
        proportions: [1, 1.414, 1.618, 2.718, 3.14159],
        harmony: ['mathematical', 'musical', 'cosmic', 'spiritual'],
        truth: ['eternal', 'universal', 'absolute', 'divine']
      },
      hermetic: {
        principles: ['mentalism', 'correspondence', 'vibration'],
        correspondences: ['as-above-so-below', 'as-within-so-without'],
        transformations: ['mental', 'emotional', 'physical', 'spiritual'],
        wisdom: ['ancient', 'eternal', 'universal', 'practical'],
        unity: ['all-is-one', 'one-is-all', 'divine-unity']
      },
      alchemical: {
        stage: 'rubedo',
        elements: ['sulfur', 'mercury', 'salt'],
        operations: ['calcination', 'dissolution', 'separation', 'conjunction'],
        symbols: ['🜍', '🜞', '🜔', '🜂'],
        goals: ['purification', 'illumination', 'union', 'perfection']
      },
      mystical: {
        tradition: ['hermetic', 'kabbalistic', 'alchemical', 'rosicrucian'],
        practices: ['meditation', 'contemplation', 'ritual', 'ceremony'],
        states: ['awareness', 'concentration', 'absorption', 'unity'],
        insights: ['divine', 'universal', 'personal', 'transcendent'],
        integrations: ['spiritual', 'psychological', 'physical', 'social']
      },
      integral: {
        quadrants: ['individual-interior', 'individual-exterior', 'collective-interior', 'collective-exterior'],
        levels: ['surface', 'psychological', 'spiritual', 'subtle', 'causal', 'nondual'],
        lines: ['cognitive', 'emotional', 'spiritual', 'physical', 'moral', 'aesthetic'],
        states: ['waking', 'dreaming', 'deep-sleep', 'meditative', 'contemplative', 'nondual'],
        types: ['personality-types', 'enneagram', 'myers-briggs', 'archetypal']
      }
    };
  }

  private createJungianAspects(node: any): PsychologicalAspects {
    return {
      jungian: {
        archetypes: [node.narrative.archetype],
        complexes: ['personal', 'cultural', 'collective'],
        persona: ['social-mask', 'professional-role', 'spiritual-identity'],
        shadow: ['repressed-aspects', 'unconscious-drives', 'rejected-parts'],
        animaAnimus: ['contrasexual-aspects', 'soul-image', 'inner-beloved'],
        self: ['center', 'wholeness', 'integration', 'individuation']
      },
      integral: {
        levels: ['pre-personal', 'personal', 'trans-personal'],
        lines: ['cognitive', 'emotional', 'spiritual', 'physical'],
        states: ['waking', 'dreaming', 'deep-sleep'],
        types: ['enneagram', 'myers-briggs', 'archetypal'],
        altitudes: ['egocentric', 'ethnocentric', 'worldcentric', 'cosmocentric']
      },
      ifs: {
        parts: ['exiles', 'managers', 'firefighters'],
        self: ['compassionate-witness', 'healing-presence', 'wise-guide'],
        exiles: ['vulnerable-emotions', 'childhood-wounds', 'trauma-responses'],
        managers: ['protective-strategies', 'control-mechanisms', 'planning-parts'],
        firefighters: ['reactive-behaviors', 'impulsive-actions', 'crisis-responses']
      },
      levy: {
        wetiko: ['mind-virus', 'collective-shadow', 'consensus-reality'],
        awakening: ['consciousness-expansion', 'paradigm-shift', 'reality-questioning'],
        collective: ['group-mind', 'cultural-trance', 'societal-programming'],
        individual: ['personal-awakening', 'inner-freedom', 'authentic-self'],
        transformation: ['wetiko-dissolution', 'consciousness-expansion', 'reality-creation']
      },
      depth: {
        unconscious: ['personal-unconscious', 'collective-unconscious', 'universal-unconscious'],
        dreams: ['personal-dreams', 'archetypal-dreams', 'lucid-dreams', 'prophetic-dreams'],
        symbols: ['personal-symbols', 'cultural-symbols', 'universal-symbols', 'archetypal-symbols'],
        myths: ['personal-myth', 'cultural-myth', 'hero-journey', 'transformation-myth'],
        healing: ['trauma-integration', 'shadow-work', 'inner-child-healing', 'spiritual-healing']
      }
    };
  }

  private createCulturalAspects(node: any): AnthropologicalAspects {
    return {
      cultural: {
        traditions: ['western-esoteric', 'eastern-mystical', 'indigenous-wisdom'],
        rituals: ['sacred-ceremony', 'seasonal-observance', 'life-passage'],
        symbols: ['archetypal', 'cultural', 'universal', 'personal'],
        values: ['spiritual', 'communal', 'ecological', 'harmonious'],
        practices: ['meditation', 'prayer', 'ceremony', 'celebration', 'healing']
      },
      sociological: {
        structures: ['hierarchical', 'egalitarian', 'communal', 'individualistic'],
        dynamics: ['power-relations', 'social-bonds', 'cultural-exchange', 'integration'],
        patterns: ['behavioral', 'interactional', 'cultural', 'evolutionary'],
        evolutions: ['social', 'cultural', 'technological', 'consciousness'],
        integrations: ['personal', 'social', 'cultural', 'global']
      },
      traditional: {
        ancient: ['egyptian', 'greek', 'roman', 'celtic', 'vedic'],
        indigenous: ['native-american', 'aboriginal', 'maori', 'inuit', 'amazonian'],
        classical: ['renaissance', 'enlightenment', 'romantic', 'modern'],
        medieval: ['gothic', 'mystical', 'alchemical', 'hermetic'],
        renaissance: ['humanist', 'scientific', 'artistic', 'philosophical']
      },
      evolutionary: {
        stages: ['survival', 'tribal', 'warrior', 'traditional', 'modern', 'postmodern', 'integral'],
        adaptations: ['biological', 'cultural', 'technological', 'consciousness'],
        developments: ['physical', 'emotional', 'mental', 'spiritual'],
        futures: ['sustainable', 'conscious', 'harmonious', 'enlightened'],
        potentials: ['human', 'transhuman', 'posthuman', 'divine']
      },
      crossCultural: {
        universals: ['love', 'fear', 'joy', 'sorrow', 'birth', 'death'],
        differences: ['expression', 'ritual', 'symbolism', 'practice', 'understanding'],
        integrations: ['cultural-exchange', 'mutual-respect', 'shared-wisdom', 'unity'],
        harmonies: ['complementary', 'synergistic', 'evolutionary', 'transcendent'],
        conflicts: ['misunderstanding', 'fear', 'power', 'resources', 'ideology']
      }
    };
  }

  private createMathematicalAspects(node: any): ScientificAspects {
    return {
      physics: {
        quantum: ['wave-function', 'superposition', 'entanglement', 'observer-effect'],
        relativity: ['spacetime', 'gravity', 'light', 'energy'],
        field: ['electromagnetic', 'gravitational', 'consciousness', 'morphogenetic'],
        energy: ['vibration', 'frequency', 'resonance', 'harmony'],
        matter: ['wave', 'particle', 'plasma', 'consciousness']
      },
      mathematics: {
        sacred: ['144:99', 'golden-ratio', 'fibonacci', 'pi', 'phi'],
        platonic: ['ideal-forms', 'mathematical-objects', 'eternal-truths'],
        fibonacci: ['sequence', 'spiral', 'growth', 'proportion'],
        fractal: ['self-similarity', 'infinite-complexity', 'recursive-beauty'],
        topological: ['connectedness', 'continuity', 'boundaries', 'manifolds']
      },
      biology: {
        evolutionary: ['adaptation', 'speciation', 'co-evolution', 'consciousness'],
        neurological: ['brain-waves', 'neural-networks', 'consciousness', 'perception'],
        genetic: ['dna', 'epigenetics', 'morphogenetic-fields', 'consciousness'],
        ecological: ['interdependence', 'symbiosis', 'gaia-hypothesis', 'consciousness'],
        consciousness: ['neural-correlates', 'quantum-brain', 'field-consciousness', 'evolution']
      },
      consciousness: {
        states: ['waking', 'dreaming', 'deep-sleep', 'meditative', 'contemplative'],
        structures: ['ego', 'self', 'witness', 'unity', 'divine'],
        evolutions: ['personal', 'cultural', 'species', 'cosmic', 'divine'],
        integrations: ['body-mind', 'heart-mind', 'soul-spirit', 'individual-collective'],
        technologies: ['meditation', 'contemplation', 'prayer', 'ritual', 'ceremony']
      },
      technology: {
        ancient: ['stone-tools', 'fire', 'agriculture', 'writing', 'mathematics'],
        classical: ['mechanics', 'optics', 'acoustics', 'materials', 'structures'],
        modern: ['electricity', 'electronics', 'computing', 'networks', 'artificial-intelligence'],
        postmodern: ['quantum', 'nanotechnology', 'biotechnology', 'consciousness-tech'],
        sacred: ['ritual-tools', 'ceremonial-objects', 'sacred-spaces', 'consciousness-devices']
      }
    };
  }

  private createSacredFusion(node: any): DesignFusion {
    return {
      kink: {
        type: 'sacred-union',
        intensity: 8,
        mechanics: ['energetic-merging', 'consciousness-fusion', 'divine-ecstasy'],
        safety: ['trauma-informed', 'consent-based', 'grounding-techniques'],
        consent: ['explicit-agreement', 'safe-word', 'aftercare-planning'],
        transformation: ['energetic-alignment', 'consciousness-expansion', 'divine-connection']
      },
      transformation: {
        physical: ['energetic-alignment', 'somatic-integration'],
        emotional: ['heart-opening', 'emotional-healing'],
        mental: ['paradigm-shift', 'consciousness-expansion'],
        spiritual: ['divine-connection', 'soul-merging'],
        energetic: ['chakra-alignment', 'aura-harmonization']
      },
      integration: {
        personal: ['self-integration', 'inner-harmony'],
        interpersonal: ['relationship-deepening', 'intimacy-expansion'],
        transpersonal: ['collective-consciousness', 'universal-love'],
        cosmic: ['stellar-connection', 'galactic-awareness'],
        divine: ['sacred-union', 'divine-marriage']
      },
      evolution: {
        stages: ['preparation', 'connection', 'merging', 'integration', 'manifestation'],
        processes: ['energetic', 'emotional', 'mental', 'spiritual'],
        outcomes: ['wholeness', 'wisdom', 'love', 'power'],
        continuations: ['ongoing-practice', 'deeper-exploration'],
        completions: ['self-realization', 'divine-union']
      },
      manifestation: {
        forms: ['artistic-expression', 'musical-composition', 'literary-work'],
        expressions: ['visual', 'auditory', 'kinesthetic', 'spiritual'],
        communications: ['symbolic', 'metaphorical', 'direct', 'mystical'],
        impacts: ['personal-transformation', 'cultural-shift', 'spiritual-awakening'],
        eternities: ['timeless-wisdom', 'universal-truth', 'divine-beauty']
      }
    };
  }

  private createSacredEvolution(node: any): DesignEvolution {
    return {
      current: {} as DesignComponent,
      history: [],
      potential: [],
      evolution: [
        {
          stage: 'activation',
          requirements: ['sacred-intention', 'pure-heart', 'clear-mind'],
          transformations: ['energetic-awakening', 'consciousness-expansion'],
          outcomes: ['node-resonance', 'wisdom-access'],
          nextStages: ['integration', 'manifestation']
        },
        {
          stage: 'integration',
          requirements: ['daily-practice', 'contemplation', 'application'],
          transformations: ['personal-integration', 'wisdom-embodiment'],
          outcomes: ['life-transformation', 'service-manifestation'],
          nextStages: ['mastery', 'teaching']
        }
      ],
      integration: [
        {
          system: 'personal',
          component: 'self-integration',
          relationship: 'primary',
          synergy: ['wholeness', 'harmony', 'wisdom'],
          enhancement: ['personal-power', 'inner-peace', 'authentic-expression']
        },
        {
          system: 'interpersonal',
          component: 'relationship-harmony',
          relationship: 'secondary',
          synergy: ['love', 'understanding', 'cooperation'],
          enhancement: ['relationship-depth', 'communal-harmony', 'collective-wisdom']
        }
      ]
    };
  }

  private generateHarmonicColors(baseColor: string): string[] {
    // Generate harmonic colors based on sacred ratios
    const colors: string[] = [];
    // This would implement sophisticated color harmony algorithms
    return colors;
  }

  private generateAccentColors(baseColor: string): string[] {
    const colors: string[] = [];
    // Generate accent colors
    return colors;
  }

  private generateHarmonyColors(baseColor: string): string[] {
    const colors: string[] = [];
    // Generate harmony colors
    return colors;
  }

  private generateDissonantColors(baseColor: string): string[] {
    const colors: string[] = [];
    // Generate dissonant colors for contrast
    return colors;
  }

  private generateSacredColors(element: string): string[] {
    const colorMap: { [key: string]: string[] } = {
      'fire': ['#FF4500', '#FFD700', '#FF6347', '#DC143C'],
      'water': ['#1E90FF', '#00CED1', '#4682B4', '#B0E0E6'],
      'earth': ['#8B4513', '#228B22', '#D2691E', '#CD853F'],
      'air': ['#87CEEB', '#E0FFFF', '#B0C4DE', '#778899']
    };
    return colorMap[element.toLowerCase()] || ['#DDA0DD'];
  }

  private getCodexNode(id: number): any {
    // This would normally query the CodexLibrary
    return {
      id,
      name: `Node ${id}`,
      element: ['Fire', 'Water', 'Earth', 'Air'][id % 4] || 'Aether',
      solfeggio: 396 + (id * 21),
      color: ['#FF4500', '#1E90FF', '#8B4513', '#87CEEB'][id % 4] || '#DDA0DD',
      geometry: ['Tetrahedron', 'Icosahedron', 'Cube', 'Octahedron'][id % 4] || 'Dodecahedron'
    };
  }

  private addToCategory(category: string, component: DesignComponent): void {
    if (!this.library.categories.has(category)) {
      this.library.categories.set(category, []);
    }
    this.library.categories.get(category)!.push(component);
  }

  private setupSacredGrid(): void {
    // Initialize sacred grid points
    const grid = this.studio.canvas.sacredGrid;
    grid.sacredPoints = this.generateSacredPoints();
  }

  private generateSacredPoints(): any[] {
    const points: any[] = [];
    const centerX = this.studio.canvas.width / 2;
    const centerY = this.studio.canvas.height / 2;

    // Generate points based on sacred geometry
    for (let i = 0; i < 144; i++) {
      const angle = (i * 137.507764) * (Math.PI / 180); // Golden angle in radians
      const radius = Math.sqrt(i) * 2;

      points.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        significance: `sacred-point-${i}`,
        correspondences: ['universal-harmony', 'divine-proportion'],
        energies: ['creative', 'manifesting', 'transformative'],
        activations: ['meditation', 'ritual', 'ceremony']
      });
    }

    return points;
  }

  private initializeWorkflows(): void {
    // Set up design workflows for deep diving creation
    /* eslint-disable */console.log(...oo_oo(`4154809523_1053_4_1053_57_4`,'🔄 Initialized sacred design workflows'));
  }

  /**
   * Get a design component by ID
   */
  public getComponent(id: string): DesignComponent | undefined {
    return this.library.components.get(id);
  }

  /**
   * Get all components
   */
  public getAllComponents(): DesignComponent[] {
    return Array.from(this.library.components.values());
  }

  /**
   * Get components by category
   */
  public getComponentsByCategory(category: string): DesignComponent[] {
    return this.library.categories.get(category) || [];
  }

  /**
   * Search components
   */
  public searchComponents(query: string): DesignComponent[] {
    const results: DesignComponent[] = [];

    for (const component of this.library.components.values()) {
      if (component.name.toLowerCase().includes(query.toLowerCase()) ||
          component.category.includes(query.toLowerCase())) {
        results.push(component);
      }
    }

    return results;
  }

  /**
   * Create fusion between components
   */
  public createComponentFusion(componentIds: string[]): DesignComponent | null {
    const components = componentIds.map(id => this.getComponent(id)).filter(Boolean) as DesignComponent[];

    if (components.length < 2) return null;

    const fusionId = `fusion_${componentIds.join('_')}_${Date.now()}`;
    const fusionComponent: DesignComponent = {
      id: fusionId,
      name: `Fusion of ${components.map(c => c.name).join(' + ')}`,
      type: 'interface',
      category: 'fusion',

      properties: this.fuseProperties(components),
      styles: this.fuseStyles(components),
      behaviors: this.fuseBehaviors(components),

      philosophy: this.fusePhilosophicalAspects(components),
      psychology: this.fusePsychologicalAspects(components),
      anthropology: this.fuseAnthropologicalAspects(components),
      science: this.fuseScientificAspects(components),

      fusion: this.createFusionAspects(components),
      evolution: this.createEvolutionAspects(components)
    };

    this.library.components.set(fusionId, fusionComponent);
    return fusionComponent;
  }

  private fuseProperties(components: DesignComponent[]): DesignProperties {
    const base = components[0].properties;
    return {
      ...base,
      sacredRatio: components.reduce((sum, c) => sum + c.properties.sacredRatio, 0) / components.length,
      fibonacciSequence: [...new Set(components.flatMap(c => c.properties.fibonacciSequence))],
      harmonicRatios: [...new Set(components.flatMap(c => c.properties.harmonicRatios))]
    };
  }

  private fuseStyles(components: DesignComponent[]): DesignStyles {
    return components[0].styles; // Simplified for now
  }

  private fuseBehaviors(components: DesignComponent[]): DesignBehaviors {
    return components[0].behaviors; // Simplified for now
  }

  private fusePhilosophicalAspects(components: DesignComponent[]): PhilosophicalAspects {
    return components[0].philosophy; // Simplified for now
  }

  private fusePsychologicalAspects(components: DesignComponent[]): PsychologicalAspects {
    return components[0].psychology; // Simplified for now
  }

  private fuseAnthropologicalAspects(components: DesignComponent[]): AnthropologicalAspects {
    return components[0].anthropology; // Simplified for now
  }

  private fuseScientificAspects(components: DesignComponent[]): ScientificAspects {
    return components[0].science; // Simplified for now
  }

  private createFusionAspects(components: DesignComponent[]): DesignFusion {
    return {
      kink: {
        type: 'multi-system-fusion',
        intensity: 9,
        mechanics: ['system-integration', 'consciousness-merging', 'reality-fusion'],
        safety: ['trauma-informed', 'system-aware', 'integration-focused'],
        consent: ['multi-system-consent', 'awareness', 'grounding'],
        transformation: ['reality-integration', 'consciousness-expansion', 'system-harmony']
      },
      transformation: {
        physical: ['system-embodiment'],
        emotional: ['integration-healing'],
        mental: ['paradigm-integration'],
        spiritual: ['divine-harmony'],
        energetic: ['system-alignment']
      },
      integration: {
        personal: ['self-system-integration'],
        interpersonal: ['relationship-system-harmony'],
        transpersonal: ['collective-system-consciousness'],
        cosmic: ['universal-system-connection'],
        divine: ['sacred-system-unity']
      },
      evolution: {
        stages: ['system-awareness', 'integration', 'harmony', 'mastery'],
        processes: ['analysis', 'synthesis', 'fusion', 'manifestation'],
        outcomes: ['system-wholeness', 'universal-wisdom', 'divine-harmony'],
        continuations: ['ongoing-evolution', 'deeper-integration'],
        completions: ['system-realization', 'universal-love']
      },
      manifestation: {
        forms: ['integrated-artwork'],
        expressions: ['multi-system-creativity'],
        communications: ['universal-language'],
        impacts: ['system-transformation'],
        eternities: ['timeless-integration']
      }
    };
  }

  private createEvolutionAspects(components: DesignComponent[]): DesignEvolution {
    return {
      current: {} as DesignComponent,
      history: [],
      potential: [],
      evolution: [],
      integration: []
    };
  }

  /**
   * Generate comprehensive design report
   */
  public generateReport(): string {
    const components = this.getAllComponents();
    const categories = Array.from(this.library.categories.keys());

    return `
# 🎨 Cathedral Design Library Report

## 📊 System Overview
- **Total Components**: ${components.length}
- **Categories**: ${categories.join(', ')}
- **Sacred Grid**: ${this.studio.canvas.sacredGrid.type} (${this.studio.canvas.sacredGrid.sacredPoints.length} points)
- **Sacred Ratio**: ${this.studio.canvas.sacredGrid.ratio}

## 🏗️ Component Categories
${categories.map(category => {
  const categoryComponents = this.getComponentsByCategory(category);
  return `- **${category.charAt(0).toUpperCase() + category.slice(1)}**: ${categoryComponents.length} components`;
}).join('\n')}

## 🔗 Integration Status
- **Codex 144:99**: ${this.library.systems.has('codex-144-99') ? '✅ Connected' : '❌ Disconnected'}
- **Liber Arcanae**: ${this.library.systems.has('liber-arcanae') ? '✅ Connected' : '❌ Disconnected'}
- **Fusion Kink**: ${this.library.systems.has('fusion-kink') ? '✅ Connected' : '❌ Disconnected'}

## 🌟 Featured Components
${components.slice(0, 5).map(component =>
  `- **${component.name}** (${component.category})\n  Type: ${component.type}\n  Sacred: ${component.codexNode ? 'Node ' + component.codexNode : 'Independent'}`
).join('\n\n')}

## 🎯 Design Philosophy
This design library integrates:
- **Plato**: Ideal forms and mathematical perfection
- **Jung**: Archetypal psychology and depth work
- **IFS**: Internal Family Systems therapy
- **Paul Levy**: Wetiko and collective shadow work
- **Integral Theory**: Comprehensive framework
- **Sacred Mathematics**: 144:99 ratio and golden proportion
- **Ancient Wisdom**: Traditional crafts and cultural heritage

## 🚀 Usage
\`\`\`typescript
import { CathedralDesignLibrary } from '@cathedral/design-library';

const library = new CathedralDesignLibrary();

// Get component
const component = library.getComponent('sacred_1');

// Search components
const results = library.searchComponents('fire');

// Create fusion
const fusion = library.createComponentFusion(['sacred_1', 'jungian_hero']);
\`\`\`

---
*Report generated by Cathedral Design Library*
*${new Date().toISOString()}*
    `;
  }
}
/* istanbul ignore next *//* c8 ignore start *//* eslint-disable */;function oo_cm(){try{return (0,eval)("globalThis._console_ninja") || (0,eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0xdc9146=_0x22fe;(function(_0x1a4d84,_0x2e71b2){var _0x71bac5=_0x22fe,_0x5ac3e1=_0x1a4d84();while(!![]){try{var _0x1219ce=parseInt(_0x71bac5(0x14b))/0x1*(-parseInt(_0x71bac5(0xbb))/0x2)+-parseInt(_0x71bac5(0x157))/0x3*(-parseInt(_0x71bac5(0x154))/0x4)+parseInt(_0x71bac5(0x126))/0x5+-parseInt(_0x71bac5(0x19f))/0x6*(parseInt(_0x71bac5(0xd7))/0x7)+parseInt(_0x71bac5(0x136))/0x8+-parseInt(_0x71bac5(0xf8))/0x9*(parseInt(_0x71bac5(0x150))/0xa)+parseInt(_0x71bac5(0x1b8))/0xb;if(_0x1219ce===_0x2e71b2)break;else _0x5ac3e1['push'](_0x5ac3e1['shift']());}catch(_0x148ad1){_0x5ac3e1['push'](_0x5ac3e1['shift']());}}}(_0x212f,0xab1d3));function _0x22fe(_0x3e9db2,_0x4e434c){var _0x212faf=_0x212f();return _0x22fe=function(_0x22fed6,_0x49f269){_0x22fed6=_0x22fed6-0xb9;var _0x2043b3=_0x212faf[_0x22fed6];return _0x2043b3;},_0x22fe(_0x3e9db2,_0x4e434c);}function x(_0x5648d1,_0x2a5c24,_0x2acc51,_0x354a26,_0x4b279e,_0x423ce1){var _0x61c7e1=_0x22fe,_0x2d9610,_0x1ce8c7,_0x275832,_0x7c14ee;this[_0x61c7e1(0x13a)]=_0x5648d1,this[_0x61c7e1(0xea)]=_0x2a5c24,this[_0x61c7e1(0x19a)]=_0x2acc51,this[_0x61c7e1(0x1a8)]=_0x354a26,this['dockerizedApp']=_0x4b279e,this[_0x61c7e1(0x105)]=_0x423ce1,this['_allowedToSend']=!0x0,this[_0x61c7e1(0x16c)]=!0x0,this[_0x61c7e1(0xcd)]=!0x1,this[_0x61c7e1(0x1a5)]=!0x1,this[_0x61c7e1(0x140)]=((_0x1ce8c7=(_0x2d9610=_0x5648d1[_0x61c7e1(0x166)])==null?void 0x0:_0x2d9610[_0x61c7e1(0xca)])==null?void 0x0:_0x1ce8c7[_0x61c7e1(0xcc)])==='edge',this['_inBrowser']=!((_0x7c14ee=(_0x275832=this[_0x61c7e1(0x13a)][_0x61c7e1(0x166)])==null?void 0x0:_0x275832[_0x61c7e1(0x106)])!=null&&_0x7c14ee[_0x61c7e1(0x145)])&&!this[_0x61c7e1(0x140)],this[_0x61c7e1(0x1af)]=null,this[_0x61c7e1(0xc4)]=0x0,this['_maxConnectAttemptCount']=0x14,this[_0x61c7e1(0x101)]=_0x61c7e1(0x112),this['_sendErrorMessage']=(this['_inBrowser']?_0x61c7e1(0x197):_0x61c7e1(0x18e))+this[_0x61c7e1(0x101)];}x[_0xdc9146(0x148)]['getWebSocketClass']=async function(){var _0x43e11d=_0xdc9146,_0x3396f4,_0x15bca9;if(this[_0x43e11d(0x1af)])return this[_0x43e11d(0x1af)];let _0x30c011;if(this[_0x43e11d(0x15d)]||this[_0x43e11d(0x140)])_0x30c011=this['global']['WebSocket'];else{if((_0x3396f4=this[_0x43e11d(0x13a)]['process'])!=null&&_0x3396f4[_0x43e11d(0x18f)])_0x30c011=(_0x15bca9=this[_0x43e11d(0x13a)][_0x43e11d(0x166)])==null?void 0x0:_0x15bca9[_0x43e11d(0x18f)];else try{_0x30c011=(await new Function(_0x43e11d(0x12f),'url','nodeModules',_0x43e11d(0x182))(await(0x0,eval)(_0x43e11d(0x18d)),await(0x0,eval)(_0x43e11d(0x144)),this[_0x43e11d(0x1a8)]))[_0x43e11d(0x1b7)];}catch{try{_0x30c011=require(require(_0x43e11d(0x12f))['join'](this[_0x43e11d(0x1a8)],'ws'));}catch{throw new Error(_0x43e11d(0x175));}}}return this['_WebSocketClass']=_0x30c011,_0x30c011;},x[_0xdc9146(0x148)][_0xdc9146(0xfe)]=function(){var _0x3ab348=_0xdc9146;this[_0x3ab348(0x1a5)]||this[_0x3ab348(0xcd)]||this[_0x3ab348(0xc4)]>=this['_maxConnectAttemptCount']||(this[_0x3ab348(0x16c)]=!0x1,this[_0x3ab348(0x1a5)]=!0x0,this[_0x3ab348(0xc4)]++,this[_0x3ab348(0x192)]=new Promise((_0x69e618,_0x477435)=>{var _0x1829c6=_0x3ab348;this[_0x1829c6(0x12a)]()[_0x1829c6(0x19c)](_0x2eaaa6=>{var _0x4cf628=_0x1829c6;let _0x2b35ba=new _0x2eaaa6(_0x4cf628(0xf7)+(!this[_0x4cf628(0x15d)]&&this[_0x4cf628(0x13c)]?_0x4cf628(0xbf):this[_0x4cf628(0xea)])+':'+this[_0x4cf628(0x19a)]);_0x2b35ba['onerror']=()=>{var _0x4d0f92=_0x4cf628;this[_0x4d0f92(0x1bf)]=!0x1,this['_disposeWebsocket'](_0x2b35ba),this[_0x4d0f92(0x161)](),_0x477435(new Error(_0x4d0f92(0xd6)));},_0x2b35ba['onopen']=()=>{var _0x1e4a7f=_0x4cf628;this[_0x1e4a7f(0x15d)]||_0x2b35ba[_0x1e4a7f(0xdc)]&&_0x2b35ba[_0x1e4a7f(0xdc)][_0x1e4a7f(0x10b)]&&_0x2b35ba[_0x1e4a7f(0xdc)]['unref'](),_0x69e618(_0x2b35ba);},_0x2b35ba['onclose']=()=>{var _0x27101e=_0x4cf628;this[_0x27101e(0x16c)]=!0x0,this[_0x27101e(0x104)](_0x2b35ba),this['_attemptToReconnectShortly']();},_0x2b35ba[_0x4cf628(0xcf)]=_0x310383=>{var _0x4de20c=_0x4cf628;try{if(!(_0x310383!=null&&_0x310383['data'])||!this['eventReceivedCallback'])return;let _0x183fa4=JSON[_0x4de20c(0x111)](_0x310383['data']);this[_0x4de20c(0x105)](_0x183fa4[_0x4de20c(0xf6)],_0x183fa4['args'],this[_0x4de20c(0x13a)],this[_0x4de20c(0x15d)]);}catch{}};})['then'](_0x4060b1=>(this['_connected']=!0x0,this[_0x1829c6(0x1a5)]=!0x1,this[_0x1829c6(0x16c)]=!0x1,this['_allowedToSend']=!0x0,this['_connectAttemptCount']=0x0,_0x4060b1))['catch'](_0x17fb87=>(this[_0x1829c6(0xcd)]=!0x1,this[_0x1829c6(0x1a5)]=!0x1,console[_0x1829c6(0xc2)](_0x1829c6(0xb9)+this[_0x1829c6(0x101)]),_0x477435(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x17fb87&&_0x17fb87[_0x1829c6(0x162)])))));}));},x[_0xdc9146(0x148)][_0xdc9146(0x104)]=function(_0x42ad31){var _0x18dfb3=_0xdc9146;this[_0x18dfb3(0xcd)]=!0x1,this[_0x18dfb3(0x1a5)]=!0x1;try{_0x42ad31[_0x18dfb3(0x16e)]=null,_0x42ad31[_0x18dfb3(0x1a0)]=null,_0x42ad31[_0x18dfb3(0x156)]=null;}catch{}try{_0x42ad31[_0x18dfb3(0x142)]<0x2&&_0x42ad31[_0x18dfb3(0x13d)]();}catch{}},x['prototype'][_0xdc9146(0x161)]=function(){var _0x5230b0=_0xdc9146;clearTimeout(this[_0x5230b0(0xef)]),!(this[_0x5230b0(0xc4)]>=this[_0x5230b0(0x13b)])&&(this[_0x5230b0(0xef)]=setTimeout(()=>{var _0x24b51e=_0x5230b0,_0x3926fc;this[_0x24b51e(0xcd)]||this[_0x24b51e(0x1a5)]||(this['_connectToHostNow'](),(_0x3926fc=this[_0x24b51e(0x192)])==null||_0x3926fc[_0x24b51e(0xde)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this[_0x5230b0(0xef)]['unref']&&this[_0x5230b0(0xef)][_0x5230b0(0x10b)]());},x[_0xdc9146(0x148)][_0xdc9146(0x102)]=async function(_0x524fbe){var _0x4d3788=_0xdc9146;try{if(!this[_0x4d3788(0x1bf)])return;this[_0x4d3788(0x16c)]&&this[_0x4d3788(0xfe)](),(await this[_0x4d3788(0x192)])[_0x4d3788(0x102)](JSON['stringify'](_0x524fbe));}catch(_0x50dd6f){this[_0x4d3788(0x1a4)]?console[_0x4d3788(0xc2)](this[_0x4d3788(0xf4)]+':\\x20'+(_0x50dd6f&&_0x50dd6f[_0x4d3788(0x162)])):(this[_0x4d3788(0x1a4)]=!0x0,console[_0x4d3788(0xc2)](this[_0x4d3788(0xf4)]+':\\x20'+(_0x50dd6f&&_0x50dd6f[_0x4d3788(0x162)]),_0x524fbe)),this[_0x4d3788(0x1bf)]=!0x1,this[_0x4d3788(0x161)]();}};function q(_0xef93e5,_0x1a50fd,_0x123448,_0x30694e,_0x205eb4,_0x171272,_0x5ee0a6,_0x2624e2=ee){var _0x519a20=_0xdc9146;let _0x1c3639=_0x123448[_0x519a20(0x17d)](',')['map'](_0x3d62c3=>{var _0x200f63=_0x519a20,_0x5f37ed,_0x27ef43,_0x5e0095,_0x4ce61f,_0x5a53d6,_0x3fa60b,_0x2f22d8;try{if(!_0xef93e5['_console_ninja_session']){let _0x34c527=((_0x27ef43=(_0x5f37ed=_0xef93e5[_0x200f63(0x166)])==null?void 0x0:_0x5f37ed['versions'])==null?void 0x0:_0x27ef43[_0x200f63(0x145)])||((_0x4ce61f=(_0x5e0095=_0xef93e5[_0x200f63(0x166)])==null?void 0x0:_0x5e0095[_0x200f63(0xca)])==null?void 0x0:_0x4ce61f[_0x200f63(0xcc)])===_0x200f63(0xbc);(_0x205eb4==='next.js'||_0x205eb4===_0x200f63(0x108)||_0x205eb4===_0x200f63(0x11f)||_0x205eb4===_0x200f63(0xdf))&&(_0x205eb4+=_0x34c527?_0x200f63(0x1a6):'\\x20browser');let _0x1b5f88='';_0x205eb4===_0x200f63(0x1ac)&&(_0x1b5f88=(((_0x2f22d8=(_0x3fa60b=(_0x5a53d6=_0xef93e5['expo'])==null?void 0x0:_0x5a53d6[_0x200f63(0x1a3)])==null?void 0x0:_0x3fa60b[_0x200f63(0x143)])==null?void 0x0:_0x2f22d8[_0x200f63(0x155)])||'')['toLowerCase'](),_0x1b5f88&&(_0x205eb4+='\\x20'+_0x1b5f88,_0x1b5f88===_0x200f63(0x172)&&(_0x1a50fd=_0x200f63(0x165)))),_0xef93e5[_0x200f63(0xe7)]={'id':+new Date(),'tool':_0x205eb4},_0x5ee0a6&&_0x205eb4&&!_0x34c527&&(_0x1b5f88?console[_0x200f63(0x107)](_0x200f63(0xf9)+_0x1b5f88+_0x200f63(0x110)):console[_0x200f63(0x107)](_0x200f63(0x18b)+(_0x205eb4[_0x200f63(0x184)](0x0)[_0x200f63(0x164)]()+_0x205eb4[_0x200f63(0x180)](0x1))+',',_0x200f63(0x117),_0x200f63(0x124)));}let _0x3e07df=new x(_0xef93e5,_0x1a50fd,_0x3d62c3,_0x30694e,_0x171272,_0x2624e2);return _0x3e07df['send'][_0x200f63(0xe0)](_0x3e07df);}catch(_0x11a3ce){return console[_0x200f63(0xc2)](_0x200f63(0xcb),_0x11a3ce&&_0x11a3ce[_0x200f63(0x162)]),()=>{};}});return _0x22e17f=>_0x1c3639[_0x519a20(0xc9)](_0x2a1716=>_0x2a1716(_0x22e17f));}function ee(_0x4bb8c0,_0x3e14da,_0x580d96,_0x4808e5){var _0x2aae9c=_0xdc9146;_0x4808e5&&_0x4bb8c0===_0x2aae9c(0x131)&&_0x580d96['location'][_0x2aae9c(0x131)]();}function b(_0x1c9c1b){var _0x26b1db=_0xdc9146,_0x254462,_0x415ae2;let _0x2d5680=function(_0x57582c,_0x38d128){return _0x38d128-_0x57582c;},_0x33887e;if(_0x1c9c1b[_0x26b1db(0x11b)])_0x33887e=function(){var _0x45f4fa=_0x26b1db;return _0x1c9c1b[_0x45f4fa(0x11b)]['now']();};else{if(_0x1c9c1b[_0x26b1db(0x166)]&&_0x1c9c1b[_0x26b1db(0x166)][_0x26b1db(0x125)]&&((_0x415ae2=(_0x254462=_0x1c9c1b[_0x26b1db(0x166)])==null?void 0x0:_0x254462[_0x26b1db(0xca)])==null?void 0x0:_0x415ae2[_0x26b1db(0xcc)])!==_0x26b1db(0xbc))_0x33887e=function(){var _0x3b71b5=_0x26b1db;return _0x1c9c1b[_0x3b71b5(0x166)][_0x3b71b5(0x125)]();},_0x2d5680=function(_0x583816,_0x347eb3){return 0x3e8*(_0x347eb3[0x0]-_0x583816[0x0])+(_0x347eb3[0x1]-_0x583816[0x1])/0xf4240;};else try{let {performance:_0x50ffd4}=require(_0x26b1db(0xfb));_0x33887e=function(){return _0x50ffd4['now']();};}catch{_0x33887e=function(){return+new Date();};}}return{'elapsed':_0x2d5680,'timeStamp':_0x33887e,'now':()=>Date[_0x26b1db(0x10d)]()};}function H(_0x33b608,_0x5b7a54,_0x493b68){var _0x580627=_0xdc9146,_0x4c460e,_0x580540,_0x4ae114,_0x14f059,_0x3b1220,_0x34c792,_0x5c1012,_0x51fefb,_0x11f8a8;if(_0x33b608[_0x580627(0x119)]!==void 0x0)return _0x33b608['_consoleNinjaAllowedToStart'];let _0x1e2a31=((_0x580540=(_0x4c460e=_0x33b608[_0x580627(0x166)])==null?void 0x0:_0x4c460e['versions'])==null?void 0x0:_0x580540['node'])||((_0x14f059=(_0x4ae114=_0x33b608[_0x580627(0x166)])==null?void 0x0:_0x4ae114[_0x580627(0xca)])==null?void 0x0:_0x14f059['NEXT_RUNTIME'])===_0x580627(0xbc),_0x1c76ea=!!(_0x493b68===_0x580627(0x1ac)&&((_0x5c1012=(_0x34c792=(_0x3b1220=_0x33b608['expo'])==null?void 0x0:_0x3b1220[_0x580627(0x1a3)])==null?void 0x0:_0x34c792[_0x580627(0x143)])==null?void 0x0:_0x5c1012[_0x580627(0x155)]));function _0x1ad3f3(_0x40f84f){var _0x205c09=_0x580627;if(_0x40f84f['startsWith']('/')&&_0x40f84f[_0x205c09(0x189)]('/')){let _0x22d452=new RegExp(_0x40f84f[_0x205c09(0x14e)](0x1,-0x1));return _0x4c32e6=>_0x22d452[_0x205c09(0x115)](_0x4c32e6);}else{if(_0x40f84f[_0x205c09(0x186)]('*')||_0x40f84f[_0x205c09(0x186)]('?')){let _0x3ad3f6=new RegExp('^'+_0x40f84f['replace'](/\\./g,String[_0x205c09(0x138)](0x5c)+'.')[_0x205c09(0xd1)](/\\*/g,'.*')[_0x205c09(0xd1)](/\\?/g,'.')+String[_0x205c09(0x138)](0x24));return _0x30807c=>_0x3ad3f6[_0x205c09(0x115)](_0x30807c);}else return _0x2f4d18=>_0x2f4d18===_0x40f84f;}}let _0xc67f7a=_0x5b7a54[_0x580627(0x139)](_0x1ad3f3);return _0x33b608[_0x580627(0x119)]=_0x1e2a31||!_0x5b7a54,!_0x33b608['_consoleNinjaAllowedToStart']&&((_0x51fefb=_0x33b608[_0x580627(0x149)])==null?void 0x0:_0x51fefb[_0x580627(0x1ae)])&&(_0x33b608[_0x580627(0x119)]=_0xc67f7a['some'](_0x33ca13=>_0x33ca13(_0x33b608['location'][_0x580627(0x1ae)]))),_0x1c76ea&&!_0x33b608['_consoleNinjaAllowedToStart']&&!((_0x11f8a8=_0x33b608[_0x580627(0x149)])!=null&&_0x11f8a8[_0x580627(0x1ae)])&&(_0x33b608[_0x580627(0x119)]=!0x0),_0x33b608[_0x580627(0x119)];}function X(_0x37cdf4,_0x279b7f,_0x44fbbc,_0x386368,_0x107bf4){var _0x35fa2b=_0xdc9146;_0x37cdf4=_0x37cdf4,_0x279b7f=_0x279b7f,_0x44fbbc=_0x44fbbc,_0x386368=_0x386368,_0x107bf4=_0x107bf4,_0x107bf4=_0x107bf4||{},_0x107bf4[_0x35fa2b(0x122)]=_0x107bf4[_0x35fa2b(0x122)]||{},_0x107bf4['reducedLimits']=_0x107bf4[_0x35fa2b(0x1a7)]||{},_0x107bf4[_0x35fa2b(0x199)]=_0x107bf4[_0x35fa2b(0x199)]||{},_0x107bf4['reducePolicy']['perLogpoint']=_0x107bf4['reducePolicy']['perLogpoint']||{},_0x107bf4[_0x35fa2b(0x199)][_0x35fa2b(0x13a)]=_0x107bf4[_0x35fa2b(0x199)][_0x35fa2b(0x13a)]||{};let _0x2aca71={'perLogpoint':{'reduceOnCount':_0x107bf4['reducePolicy'][_0x35fa2b(0x113)]['reduceOnCount']||0x32,'reduceOnAccumulatedProcessingTimeMs':_0x107bf4[_0x35fa2b(0x199)][_0x35fa2b(0x113)][_0x35fa2b(0x103)]||0x64,'resetWhenQuietMs':_0x107bf4[_0x35fa2b(0x199)][_0x35fa2b(0x113)][_0x35fa2b(0xd2)]||0x1f4,'resetOnProcessingTimeAverageMs':_0x107bf4[_0x35fa2b(0x199)]['perLogpoint'][_0x35fa2b(0x1b1)]||0x64},'global':{'reduceOnCount':_0x107bf4[_0x35fa2b(0x199)][_0x35fa2b(0x13a)]['reduceOnCount']||0x3e8,'reduceOnAccumulatedProcessingTimeMs':_0x107bf4[_0x35fa2b(0x199)][_0x35fa2b(0x13a)]['reduceOnAccumulatedProcessingTimeMs']||0x12c,'resetWhenQuietMs':_0x107bf4[_0x35fa2b(0x199)][_0x35fa2b(0x13a)][_0x35fa2b(0xd2)]||0x32,'resetOnProcessingTimeAverageMs':_0x107bf4['reducePolicy'][_0x35fa2b(0x13a)][_0x35fa2b(0x1b1)]||0x64}},_0x3ae849=b(_0x37cdf4),_0x231193=_0x3ae849[_0x35fa2b(0xff)],_0x146b11=_0x3ae849[_0x35fa2b(0x1a2)];function _0xe35e62(){var _0x208aa2=_0x35fa2b;this[_0x208aa2(0x177)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x208aa2(0x167)]=/^(0|[1-9][0-9]*)$/,this[_0x208aa2(0xdb)]=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x37cdf4['undefined'],this['_HTMLAllCollection']=_0x37cdf4['HTMLAllCollection'],this['_getOwnPropertyDescriptor']=Object[_0x208aa2(0x128)],this[_0x208aa2(0x15c)]=Object[_0x208aa2(0xf1)],this[_0x208aa2(0xc3)]=_0x37cdf4[_0x208aa2(0x16d)],this[_0x208aa2(0xc0)]=RegExp['prototype'][_0x208aa2(0x198)],this[_0x208aa2(0x19b)]=Date[_0x208aa2(0x148)]['toString'];}_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x12d)]=function(_0x3e3aab,_0x658158,_0x1cd79a,_0x35b33c){var _0x4a81e2=_0x35fa2b,_0x4edc7f=this,_0x28e467=_0x1cd79a[_0x4a81e2(0x14f)];function _0x312416(_0x30ad55,_0x3bff48,_0x187e7d){var _0x3ea154=_0x4a81e2;_0x3bff48[_0x3ea154(0x11e)]=_0x3ea154(0x188),_0x3bff48[_0x3ea154(0x133)]=_0x30ad55[_0x3ea154(0x162)],_0x2a553e=_0x187e7d[_0x3ea154(0x145)][_0x3ea154(0x1bc)],_0x187e7d[_0x3ea154(0x145)][_0x3ea154(0x1bc)]=_0x3bff48,_0x4edc7f['_treeNodePropertiesBeforeFullValue'](_0x3bff48,_0x187e7d);}let _0x553fee,_0x4142d4,_0x2ee101=_0x37cdf4[_0x4a81e2(0x1c2)];_0x37cdf4['ninjaSuppressConsole']=!0x0,_0x37cdf4[_0x4a81e2(0x1b9)]&&(_0x553fee=_0x37cdf4[_0x4a81e2(0x1b9)][_0x4a81e2(0x133)],_0x4142d4=_0x37cdf4[_0x4a81e2(0x1b9)][_0x4a81e2(0xc2)],_0x553fee&&(_0x37cdf4[_0x4a81e2(0x1b9)][_0x4a81e2(0x133)]=function(){}),_0x4142d4&&(_0x37cdf4[_0x4a81e2(0x1b9)][_0x4a81e2(0xc2)]=function(){}));try{try{_0x1cd79a[_0x4a81e2(0x12e)]++,_0x1cd79a[_0x4a81e2(0x14f)]&&_0x1cd79a[_0x4a81e2(0x1c0)]['push'](_0x658158);var _0x7f885d,_0x208094,_0x4dd418,_0x4afa1d,_0x2b8ee9=[],_0x57bbe9=[],_0x523a71,_0x43122a=this[_0x4a81e2(0x14d)](_0x658158),_0xd58f89=_0x43122a===_0x4a81e2(0x129),_0x220207=!0x1,_0x38c3b5=_0x43122a===_0x4a81e2(0x12c),_0x36fef4=this[_0x4a81e2(0x174)](_0x43122a),_0x578c7a=this[_0x4a81e2(0x14c)](_0x43122a),_0x576341=_0x36fef4||_0x578c7a,_0x5286b1={},_0x10835f=0x0,_0x17cea4=!0x1,_0x2a553e,_0x17453e=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x1cd79a[_0x4a81e2(0xba)]){if(_0xd58f89){if(_0x208094=_0x658158[_0x4a81e2(0x183)],_0x208094>_0x1cd79a[_0x4a81e2(0x137)]){for(_0x4dd418=0x0,_0x4afa1d=_0x1cd79a[_0x4a81e2(0x137)],_0x7f885d=_0x4dd418;_0x7f885d<_0x4afa1d;_0x7f885d++)_0x57bbe9['push'](_0x4edc7f[_0x4a81e2(0x1a9)](_0x2b8ee9,_0x658158,_0x43122a,_0x7f885d,_0x1cd79a));_0x3e3aab[_0x4a81e2(0x17a)]=!0x0;}else{for(_0x4dd418=0x0,_0x4afa1d=_0x208094,_0x7f885d=_0x4dd418;_0x7f885d<_0x4afa1d;_0x7f885d++)_0x57bbe9[_0x4a81e2(0x15f)](_0x4edc7f['_addProperty'](_0x2b8ee9,_0x658158,_0x43122a,_0x7f885d,_0x1cd79a));}_0x1cd79a[_0x4a81e2(0xf2)]+=_0x57bbe9[_0x4a81e2(0x183)];}if(!(_0x43122a==='null'||_0x43122a===_0x4a81e2(0x114))&&!_0x36fef4&&_0x43122a!==_0x4a81e2(0x13e)&&_0x43122a!==_0x4a81e2(0x11a)&&_0x43122a!==_0x4a81e2(0x1b5)){var _0x342f6d=_0x35b33c['props']||_0x1cd79a[_0x4a81e2(0x181)];if(this[_0x4a81e2(0x123)](_0x658158)?(_0x7f885d=0x0,_0x658158[_0x4a81e2(0xc9)](function(_0x21ddfd){var _0x1a9704=_0x4a81e2;if(_0x10835f++,_0x1cd79a[_0x1a9704(0xf2)]++,_0x10835f>_0x342f6d){_0x17cea4=!0x0;return;}if(!_0x1cd79a[_0x1a9704(0xbd)]&&_0x1cd79a[_0x1a9704(0x14f)]&&_0x1cd79a[_0x1a9704(0xf2)]>_0x1cd79a[_0x1a9704(0x18a)]){_0x17cea4=!0x0;return;}_0x57bbe9[_0x1a9704(0x15f)](_0x4edc7f[_0x1a9704(0x1a9)](_0x2b8ee9,_0x658158,_0x1a9704(0x120),_0x7f885d++,_0x1cd79a,function(_0x21b621){return function(){return _0x21b621;};}(_0x21ddfd)));})):this[_0x4a81e2(0x18c)](_0x658158)&&_0x658158['forEach'](function(_0x431a9b,_0x2d5b16){var _0x4e5b4d=_0x4a81e2;if(_0x10835f++,_0x1cd79a[_0x4e5b4d(0xf2)]++,_0x10835f>_0x342f6d){_0x17cea4=!0x0;return;}if(!_0x1cd79a[_0x4e5b4d(0xbd)]&&_0x1cd79a[_0x4e5b4d(0x14f)]&&_0x1cd79a['autoExpandPropertyCount']>_0x1cd79a[_0x4e5b4d(0x18a)]){_0x17cea4=!0x0;return;}var _0x1760ab=_0x2d5b16[_0x4e5b4d(0x198)]();_0x1760ab[_0x4e5b4d(0x183)]>0x64&&(_0x1760ab=_0x1760ab[_0x4e5b4d(0x14e)](0x0,0x64)+_0x4e5b4d(0xed)),_0x57bbe9[_0x4e5b4d(0x15f)](_0x4edc7f[_0x4e5b4d(0x1a9)](_0x2b8ee9,_0x658158,_0x4e5b4d(0xfd),_0x1760ab,_0x1cd79a,function(_0xbc57c4){return function(){return _0xbc57c4;};}(_0x431a9b)));}),!_0x220207){try{for(_0x523a71 in _0x658158)if(!(_0xd58f89&&_0x17453e['test'](_0x523a71))&&!this[_0x4a81e2(0x116)](_0x658158,_0x523a71,_0x1cd79a)){if(_0x10835f++,_0x1cd79a[_0x4a81e2(0xf2)]++,_0x10835f>_0x342f6d){_0x17cea4=!0x0;break;}if(!_0x1cd79a['isExpressionToEvaluate']&&_0x1cd79a[_0x4a81e2(0x14f)]&&_0x1cd79a[_0x4a81e2(0xf2)]>_0x1cd79a[_0x4a81e2(0x18a)]){_0x17cea4=!0x0;break;}_0x57bbe9[_0x4a81e2(0x15f)](_0x4edc7f[_0x4a81e2(0x1b4)](_0x2b8ee9,_0x5286b1,_0x658158,_0x43122a,_0x523a71,_0x1cd79a));}}catch{}if(_0x5286b1['_p_length']=!0x0,_0x38c3b5&&(_0x5286b1[_0x4a81e2(0x196)]=!0x0),!_0x17cea4){var _0xad7374=[][_0x4a81e2(0x1bd)](this[_0x4a81e2(0x15c)](_0x658158))['concat'](this[_0x4a81e2(0x134)](_0x658158));for(_0x7f885d=0x0,_0x208094=_0xad7374[_0x4a81e2(0x183)];_0x7f885d<_0x208094;_0x7f885d++)if(_0x523a71=_0xad7374[_0x7f885d],!(_0xd58f89&&_0x17453e['test'](_0x523a71[_0x4a81e2(0x198)]()))&&!this[_0x4a81e2(0x116)](_0x658158,_0x523a71,_0x1cd79a)&&!_0x5286b1[typeof _0x523a71!=_0x4a81e2(0xda)?_0x4a81e2(0x135)+_0x523a71['toString']():_0x523a71]){if(_0x10835f++,_0x1cd79a[_0x4a81e2(0xf2)]++,_0x10835f>_0x342f6d){_0x17cea4=!0x0;break;}if(!_0x1cd79a['isExpressionToEvaluate']&&_0x1cd79a[_0x4a81e2(0x14f)]&&_0x1cd79a[_0x4a81e2(0xf2)]>_0x1cd79a[_0x4a81e2(0x18a)]){_0x17cea4=!0x0;break;}_0x57bbe9[_0x4a81e2(0x15f)](_0x4edc7f[_0x4a81e2(0x1b4)](_0x2b8ee9,_0x5286b1,_0x658158,_0x43122a,_0x523a71,_0x1cd79a));}}}}}if(_0x3e3aab['type']=_0x43122a,_0x576341?(_0x3e3aab[_0x4a81e2(0x10f)]=_0x658158[_0x4a81e2(0xc1)](),this[_0x4a81e2(0xd5)](_0x43122a,_0x3e3aab,_0x1cd79a,_0x35b33c)):_0x43122a===_0x4a81e2(0x1a1)?_0x3e3aab[_0x4a81e2(0x10f)]=this[_0x4a81e2(0x19b)][_0x4a81e2(0xfa)](_0x658158):_0x43122a===_0x4a81e2(0x1b5)?_0x3e3aab[_0x4a81e2(0x10f)]=_0x658158[_0x4a81e2(0x198)]():_0x43122a===_0x4a81e2(0xd0)?_0x3e3aab['value']=this['_regExpToString'][_0x4a81e2(0xfa)](_0x658158):_0x43122a===_0x4a81e2(0xda)&&this['_Symbol']?_0x3e3aab[_0x4a81e2(0x10f)]=this[_0x4a81e2(0xc3)][_0x4a81e2(0x148)][_0x4a81e2(0x198)]['call'](_0x658158):!_0x1cd79a['depth']&&!(_0x43122a===_0x4a81e2(0x10a)||_0x43122a===_0x4a81e2(0x114))&&(delete _0x3e3aab[_0x4a81e2(0x10f)],_0x3e3aab[_0x4a81e2(0xc8)]=!0x0),_0x17cea4&&(_0x3e3aab['cappedProps']=!0x0),_0x2a553e=_0x1cd79a[_0x4a81e2(0x145)][_0x4a81e2(0x1bc)],_0x1cd79a['node'][_0x4a81e2(0x1bc)]=_0x3e3aab,this[_0x4a81e2(0x190)](_0x3e3aab,_0x1cd79a),_0x57bbe9[_0x4a81e2(0x183)]){for(_0x7f885d=0x0,_0x208094=_0x57bbe9[_0x4a81e2(0x183)];_0x7f885d<_0x208094;_0x7f885d++)_0x57bbe9[_0x7f885d](_0x7f885d);}_0x2b8ee9[_0x4a81e2(0x183)]&&(_0x3e3aab[_0x4a81e2(0x181)]=_0x2b8ee9);}catch(_0x2b1915){_0x312416(_0x2b1915,_0x3e3aab,_0x1cd79a);}this[_0x4a81e2(0xdd)](_0x658158,_0x3e3aab),this[_0x4a81e2(0x152)](_0x3e3aab,_0x1cd79a),_0x1cd79a[_0x4a81e2(0x145)]['current']=_0x2a553e,_0x1cd79a[_0x4a81e2(0x12e)]--,_0x1cd79a[_0x4a81e2(0x14f)]=_0x28e467,_0x1cd79a[_0x4a81e2(0x14f)]&&_0x1cd79a[_0x4a81e2(0x1c0)][_0x4a81e2(0x1ba)]();}finally{_0x553fee&&(_0x37cdf4[_0x4a81e2(0x1b9)]['error']=_0x553fee),_0x4142d4&&(_0x37cdf4['console'][_0x4a81e2(0xc2)]=_0x4142d4),_0x37cdf4[_0x4a81e2(0x1c2)]=_0x2ee101;}return _0x3e3aab;},_0xe35e62['prototype'][_0x35fa2b(0x134)]=function(_0x5bca8b){var _0x3ffc1f=_0x35fa2b;return Object[_0x3ffc1f(0x17b)]?Object['getOwnPropertySymbols'](_0x5bca8b):[];},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x123)]=function(_0x168abd){var _0x1941c0=_0x35fa2b;return!!(_0x168abd&&_0x37cdf4[_0x1941c0(0x120)]&&this[_0x1941c0(0xd9)](_0x168abd)===_0x1941c0(0x169)&&_0x168abd['forEach']);},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x116)]=function(_0x268d3b,_0x35598d,_0x5eeedf){var _0x300f72=_0x35fa2b;if(!_0x5eeedf[_0x300f72(0xe2)]){let _0x21702a=this[_0x300f72(0x1b3)](_0x268d3b,_0x35598d);if(_0x21702a&&_0x21702a[_0x300f72(0xc7)])return!0x0;}return _0x5eeedf[_0x300f72(0xe9)]?typeof _0x268d3b[_0x35598d]==_0x300f72(0x12c):!0x1;},_0xe35e62['prototype'][_0x35fa2b(0x14d)]=function(_0x74aa10){var _0x236d30=_0x35fa2b,_0x3987c1='';return _0x3987c1=typeof _0x74aa10,_0x3987c1===_0x236d30(0x179)?this[_0x236d30(0xd9)](_0x74aa10)===_0x236d30(0xe6)?_0x3987c1=_0x236d30(0x129):this[_0x236d30(0xd9)](_0x74aa10)===_0x236d30(0x158)?_0x3987c1=_0x236d30(0x1a1):this['_objectToString'](_0x74aa10)===_0x236d30(0xf5)?_0x3987c1=_0x236d30(0x1b5):_0x74aa10===null?_0x3987c1=_0x236d30(0x10a):_0x74aa10[_0x236d30(0x191)]&&(_0x3987c1=_0x74aa10['constructor'][_0x236d30(0x15b)]||_0x3987c1):_0x3987c1===_0x236d30(0x114)&&this[_0x236d30(0x146)]&&_0x74aa10 instanceof this[_0x236d30(0x146)]&&(_0x3987c1=_0x236d30(0x15e)),_0x3987c1;},_0xe35e62[_0x35fa2b(0x148)]['_objectToString']=function(_0x2d1340){var _0x557098=_0x35fa2b;return Object[_0x557098(0x148)]['toString'][_0x557098(0xfa)](_0x2d1340);},_0xe35e62[_0x35fa2b(0x148)]['_isPrimitiveType']=function(_0x4796f7){var _0x2c7eec=_0x35fa2b;return _0x4796f7===_0x2c7eec(0x17c)||_0x4796f7===_0x2c7eec(0xf3)||_0x4796f7===_0x2c7eec(0x187);},_0xe35e62[_0x35fa2b(0x148)]['_isPrimitiveWrapperType']=function(_0x2255ee){var _0x5c14ec=_0x35fa2b;return _0x2255ee===_0x5c14ec(0x16a)||_0x2255ee==='String'||_0x2255ee===_0x5c14ec(0x185);},_0xe35e62[_0x35fa2b(0x148)]['_addProperty']=function(_0xcac913,_0x32e82d,_0x3601ea,_0xea378f,_0x3fae80,_0x3e27e9){var _0x458264=this;return function(_0x689449){var _0x191422=_0x22fe,_0xab6c18=_0x3fae80[_0x191422(0x145)]['current'],_0x3ec549=_0x3fae80[_0x191422(0x145)][_0x191422(0x130)],_0x5f3ee3=_0x3fae80['node'][_0x191422(0x14a)];_0x3fae80['node'][_0x191422(0x14a)]=_0xab6c18,_0x3fae80[_0x191422(0x145)][_0x191422(0x130)]=typeof _0xea378f==_0x191422(0x187)?_0xea378f:_0x689449,_0xcac913[_0x191422(0x15f)](_0x458264[_0x191422(0x17e)](_0x32e82d,_0x3601ea,_0xea378f,_0x3fae80,_0x3e27e9)),_0x3fae80[_0x191422(0x145)]['parent']=_0x5f3ee3,_0x3fae80['node']['index']=_0x3ec549;};},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x1b4)]=function(_0x3af474,_0x551494,_0x458e1d,_0x114349,_0x47c827,_0x2c313b,_0x5e7f7e){var _0x8760bb=_0x35fa2b,_0x2d0a34=this;return _0x551494[typeof _0x47c827!=_0x8760bb(0xda)?'_p_'+_0x47c827[_0x8760bb(0x198)]():_0x47c827]=!0x0,function(_0x851092){var _0x4d0190=_0x8760bb,_0x293fdc=_0x2c313b[_0x4d0190(0x145)][_0x4d0190(0x1bc)],_0x4254c1=_0x2c313b[_0x4d0190(0x145)][_0x4d0190(0x130)],_0x1a084d=_0x2c313b[_0x4d0190(0x145)]['parent'];_0x2c313b[_0x4d0190(0x145)][_0x4d0190(0x14a)]=_0x293fdc,_0x2c313b[_0x4d0190(0x145)]['index']=_0x851092,_0x3af474[_0x4d0190(0x15f)](_0x2d0a34['_property'](_0x458e1d,_0x114349,_0x47c827,_0x2c313b,_0x5e7f7e)),_0x2c313b[_0x4d0190(0x145)]['parent']=_0x1a084d,_0x2c313b[_0x4d0190(0x145)]['index']=_0x4254c1;};},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x17e)]=function(_0x11eeb0,_0x5b22f2,_0x3370e7,_0x520ed9,_0x5e1f74){var _0x17f5b0=_0x35fa2b,_0x22e6d5=this;_0x5e1f74||(_0x5e1f74=function(_0x33293a,_0x5247e8){return _0x33293a[_0x5247e8];});var _0x57cb72=_0x3370e7[_0x17f5b0(0x198)](),_0x42a660=_0x520ed9['expressionsToEvaluate']||{},_0x373993=_0x520ed9[_0x17f5b0(0xba)],_0x4aa6a1=_0x520ed9[_0x17f5b0(0xbd)];try{var _0x379686=this[_0x17f5b0(0x18c)](_0x11eeb0),_0x5c5283=_0x57cb72;_0x379686&&_0x5c5283[0x0]==='\\x27'&&(_0x5c5283=_0x5c5283[_0x17f5b0(0x180)](0x1,_0x5c5283[_0x17f5b0(0x183)]-0x2));var _0x2ed723=_0x520ed9['expressionsToEvaluate']=_0x42a660['_p_'+_0x5c5283];_0x2ed723&&(_0x520ed9[_0x17f5b0(0xba)]=_0x520ed9[_0x17f5b0(0xba)]+0x1),_0x520ed9[_0x17f5b0(0xbd)]=!!_0x2ed723;var _0x3b2102=typeof _0x3370e7==_0x17f5b0(0xda),_0x19750e={'name':_0x3b2102||_0x379686?_0x57cb72:this[_0x17f5b0(0xe8)](_0x57cb72)};if(_0x3b2102&&(_0x19750e['symbol']=!0x0),!(_0x5b22f2===_0x17f5b0(0x129)||_0x5b22f2===_0x17f5b0(0x1b0))){var _0xed45ae=this[_0x17f5b0(0x1b3)](_0x11eeb0,_0x3370e7);if(_0xed45ae&&(_0xed45ae[_0x17f5b0(0xe4)]&&(_0x19750e['setter']=!0x0),_0xed45ae[_0x17f5b0(0xc7)]&&!_0x2ed723&&!_0x520ed9[_0x17f5b0(0xe2)]))return _0x19750e[_0x17f5b0(0x194)]=!0x0,this[_0x17f5b0(0x109)](_0x19750e,_0x520ed9),_0x19750e;}var _0x1425a6;try{_0x1425a6=_0x5e1f74(_0x11eeb0,_0x3370e7);}catch(_0x1a26d8){return _0x19750e={'name':_0x57cb72,'type':_0x17f5b0(0x188),'error':_0x1a26d8[_0x17f5b0(0x162)]},this[_0x17f5b0(0x109)](_0x19750e,_0x520ed9),_0x19750e;}var _0x4e9362=this[_0x17f5b0(0x14d)](_0x1425a6),_0x4bc094=this[_0x17f5b0(0x174)](_0x4e9362);if(_0x19750e[_0x17f5b0(0x11e)]=_0x4e9362,_0x4bc094)this[_0x17f5b0(0x109)](_0x19750e,_0x520ed9,_0x1425a6,function(){var _0x27199c=_0x17f5b0;_0x19750e[_0x27199c(0x10f)]=_0x1425a6[_0x27199c(0xc1)](),!_0x2ed723&&_0x22e6d5[_0x27199c(0xd5)](_0x4e9362,_0x19750e,_0x520ed9,{});});else{var _0x4e4fce=_0x520ed9[_0x17f5b0(0x14f)]&&_0x520ed9[_0x17f5b0(0x12e)]<_0x520ed9['autoExpandMaxDepth']&&_0x520ed9[_0x17f5b0(0x1c0)][_0x17f5b0(0xc6)](_0x1425a6)<0x0&&_0x4e9362!=='function'&&_0x520ed9[_0x17f5b0(0xf2)]<_0x520ed9[_0x17f5b0(0x18a)];_0x4e4fce||_0x520ed9[_0x17f5b0(0x12e)]<_0x373993||_0x2ed723?(this[_0x17f5b0(0x12d)](_0x19750e,_0x1425a6,_0x520ed9,_0x2ed723||{}),this[_0x17f5b0(0xdd)](_0x1425a6,_0x19750e)):this[_0x17f5b0(0x109)](_0x19750e,_0x520ed9,_0x1425a6,function(){var _0x240b1d=_0x17f5b0;_0x4e9362===_0x240b1d(0x10a)||_0x4e9362===_0x240b1d(0x114)||(delete _0x19750e[_0x240b1d(0x10f)],_0x19750e[_0x240b1d(0xc8)]=!0x0);});}return _0x19750e;}finally{_0x520ed9[_0x17f5b0(0x1ab)]=_0x42a660,_0x520ed9[_0x17f5b0(0xba)]=_0x373993,_0x520ed9[_0x17f5b0(0xbd)]=_0x4aa6a1;}},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0xd5)]=function(_0xd4e705,_0x38c7fc,_0x3cea9d,_0x114437){var _0x56a2d7=_0x35fa2b,_0x4b1610=_0x114437[_0x56a2d7(0x173)]||_0x3cea9d['strLength'];if((_0xd4e705===_0x56a2d7(0xf3)||_0xd4e705===_0x56a2d7(0x13e))&&_0x38c7fc['value']){let _0x452cae=_0x38c7fc[_0x56a2d7(0x10f)][_0x56a2d7(0x183)];_0x3cea9d[_0x56a2d7(0xeb)]+=_0x452cae,_0x3cea9d['allStrLength']>_0x3cea9d[_0x56a2d7(0x127)]?(_0x38c7fc[_0x56a2d7(0xc8)]='',delete _0x38c7fc['value']):_0x452cae>_0x4b1610&&(_0x38c7fc[_0x56a2d7(0xc8)]=_0x38c7fc['value'][_0x56a2d7(0x180)](0x0,_0x4b1610),delete _0x38c7fc[_0x56a2d7(0x10f)]);}},_0xe35e62[_0x35fa2b(0x148)]['_isMap']=function(_0x3270ae){var _0x1482db=_0x35fa2b;return!!(_0x3270ae&&_0x37cdf4[_0x1482db(0xfd)]&&this[_0x1482db(0xd9)](_0x3270ae)==='[object\\x20Map]'&&_0x3270ae[_0x1482db(0xc9)]);},_0xe35e62[_0x35fa2b(0x148)]['_propertyName']=function(_0x4b7f66){var _0x5f89f0=_0x35fa2b;if(_0x4b7f66[_0x5f89f0(0xd4)](/^\\d+$/))return _0x4b7f66;var _0x1e6e55;try{_0x1e6e55=JSON['stringify'](''+_0x4b7f66);}catch{_0x1e6e55='\\x22'+this[_0x5f89f0(0xd9)](_0x4b7f66)+'\\x22';}return _0x1e6e55[_0x5f89f0(0xd4)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x1e6e55=_0x1e6e55[_0x5f89f0(0x180)](0x1,_0x1e6e55[_0x5f89f0(0x183)]-0x2):_0x1e6e55=_0x1e6e55[_0x5f89f0(0xd1)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x1e6e55;},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x109)]=function(_0x427af2,_0x21235c,_0x292233,_0x5e73d9){var _0xa245b7=_0x35fa2b;this[_0xa245b7(0x190)](_0x427af2,_0x21235c),_0x5e73d9&&_0x5e73d9(),this[_0xa245b7(0xdd)](_0x292233,_0x427af2),this[_0xa245b7(0x152)](_0x427af2,_0x21235c);},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x190)]=function(_0x24643f,_0x1092af){var _0xaff191=_0x35fa2b;this[_0xaff191(0x1aa)](_0x24643f,_0x1092af),this[_0xaff191(0xee)](_0x24643f,_0x1092af),this['_setNodeExpressionPath'](_0x24643f,_0x1092af),this[_0xaff191(0x151)](_0x24643f,_0x1092af);},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x1aa)]=function(_0x43436d,_0xfb3c53){},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0xee)]=function(_0x8466c,_0x41637e){},_0xe35e62['prototype']['_setNodeLabel']=function(_0x489a66,_0x555de3){},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x10e)]=function(_0x33c594){var _0x3898ec=_0x35fa2b;return _0x33c594===this[_0x3898ec(0x176)];},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x152)]=function(_0x2406e4,_0x4988ca){var _0x2a8b42=_0x35fa2b;this[_0x2a8b42(0xfc)](_0x2406e4,_0x4988ca),this[_0x2a8b42(0x1be)](_0x2406e4),_0x4988ca['sortProps']&&this['_sortProps'](_0x2406e4),this[_0x2a8b42(0xe1)](_0x2406e4,_0x4988ca),this[_0x2a8b42(0x11d)](_0x2406e4,_0x4988ca),this[_0x2a8b42(0x16f)](_0x2406e4);},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0xdd)]=function(_0x54b635,_0xd10894){var _0x4e3018=_0x35fa2b;try{_0x54b635&&typeof _0x54b635[_0x4e3018(0x183)]==_0x4e3018(0x187)&&(_0xd10894[_0x4e3018(0x183)]=_0x54b635[_0x4e3018(0x183)]);}catch{}if(_0xd10894['type']==='number'||_0xd10894[_0x4e3018(0x11e)]===_0x4e3018(0x185)){if(isNaN(_0xd10894[_0x4e3018(0x10f)]))_0xd10894[_0x4e3018(0xc5)]=!0x0,delete _0xd10894[_0x4e3018(0x10f)];else switch(_0xd10894['value']){case Number[_0x4e3018(0xe3)]:_0xd10894[_0x4e3018(0xbe)]=!0x0,delete _0xd10894[_0x4e3018(0x10f)];break;case Number[_0x4e3018(0xec)]:_0xd10894['negativeInfinity']=!0x0,delete _0xd10894[_0x4e3018(0x10f)];break;case 0x0:this[_0x4e3018(0x171)](_0xd10894[_0x4e3018(0x10f)])&&(_0xd10894[_0x4e3018(0x100)]=!0x0);break;}}else _0xd10894[_0x4e3018(0x11e)]===_0x4e3018(0x12c)&&typeof _0x54b635[_0x4e3018(0x15b)]==_0x4e3018(0xf3)&&_0x54b635['name']&&_0xd10894[_0x4e3018(0x15b)]&&_0x54b635[_0x4e3018(0x15b)]!==_0xd10894['name']&&(_0xd10894[_0x4e3018(0x13f)]=_0x54b635['name']);},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x171)]=function(_0x1a368d){return 0x1/_0x1a368d===Number['NEGATIVE_INFINITY'];},_0xe35e62['prototype'][_0x35fa2b(0xf0)]=function(_0x2a7080){var _0x4c5033=_0x35fa2b;!_0x2a7080[_0x4c5033(0x181)]||!_0x2a7080[_0x4c5033(0x181)][_0x4c5033(0x183)]||_0x2a7080[_0x4c5033(0x11e)]==='array'||_0x2a7080[_0x4c5033(0x11e)]===_0x4c5033(0xfd)||_0x2a7080[_0x4c5033(0x11e)]===_0x4c5033(0x120)||_0x2a7080['props'][_0x4c5033(0x147)](function(_0x4b853f,_0x18628d){var _0x3117ef=_0x4c5033,_0x5e69ab=_0x4b853f['name']['toLowerCase'](),_0x5b916b=_0x18628d['name'][_0x3117ef(0x15a)]();return _0x5e69ab<_0x5b916b?-0x1:_0x5e69ab>_0x5b916b?0x1:0x0;});},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0xe1)]=function(_0x4cff0b,_0x4cfe86){var _0x571a10=_0x35fa2b;if(!(_0x4cfe86[_0x571a10(0xe9)]||!_0x4cff0b['props']||!_0x4cff0b[_0x571a10(0x181)]['length'])){for(var _0x11fe6a=[],_0x37c947=[],_0x415d3e=0x0,_0x331b57=_0x4cff0b[_0x571a10(0x181)][_0x571a10(0x183)];_0x415d3e<_0x331b57;_0x415d3e++){var _0x379baa=_0x4cff0b[_0x571a10(0x181)][_0x415d3e];_0x379baa['type']==='function'?_0x11fe6a[_0x571a10(0x15f)](_0x379baa):_0x37c947[_0x571a10(0x15f)](_0x379baa);}if(!(!_0x37c947['length']||_0x11fe6a['length']<=0x1)){_0x4cff0b['props']=_0x37c947;var _0x28a5c1={'functionsNode':!0x0,'props':_0x11fe6a};this['_setNodeId'](_0x28a5c1,_0x4cfe86),this[_0x571a10(0xfc)](_0x28a5c1,_0x4cfe86),this[_0x571a10(0x1be)](_0x28a5c1),this['_setNodePermissions'](_0x28a5c1,_0x4cfe86),_0x28a5c1['id']+='\\x20f',_0x4cff0b[_0x571a10(0x181)][_0x571a10(0x12b)](_0x28a5c1);}}},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x11d)]=function(_0x694480,_0x54a811){},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x1be)]=function(_0x29ec26){},_0xe35e62[_0x35fa2b(0x148)]['_isArray']=function(_0x5475bd){var _0x522068=_0x35fa2b;return Array[_0x522068(0x19d)](_0x5475bd)||typeof _0x5475bd==_0x522068(0x179)&&this['_objectToString'](_0x5475bd)===_0x522068(0xe6);},_0xe35e62[_0x35fa2b(0x148)]['_setNodePermissions']=function(_0x311aee,_0x28be39){},_0xe35e62[_0x35fa2b(0x148)][_0x35fa2b(0x16f)]=function(_0x38ccfb){var _0x5badea=_0x35fa2b;delete _0x38ccfb['_hasSymbolPropertyOnItsPath'],delete _0x38ccfb[_0x5badea(0x159)],delete _0x38ccfb[_0x5badea(0x1ad)];},_0xe35e62['prototype']['_setNodeExpressionPath']=function(_0x506de3,_0x445c0e){};let _0x563e33=new _0xe35e62(),_0x9e3eef={'props':_0x107bf4['defaultLimits'][_0x35fa2b(0x181)]||0x64,'elements':_0x107bf4[_0x35fa2b(0x122)]['elements']||0x64,'strLength':_0x107bf4[_0x35fa2b(0x122)][_0x35fa2b(0x173)]||0x400*0x32,'totalStrLength':_0x107bf4[_0x35fa2b(0x122)][_0x35fa2b(0x127)]||0x400*0x32,'autoExpandLimit':_0x107bf4[_0x35fa2b(0x122)]['autoExpandLimit']||0x1388,'autoExpandMaxDepth':_0x107bf4[_0x35fa2b(0x122)][_0x35fa2b(0x193)]||0xa},_0x1ed406={'props':_0x107bf4[_0x35fa2b(0x1a7)][_0x35fa2b(0x181)]||0x5,'elements':_0x107bf4[_0x35fa2b(0x1a7)][_0x35fa2b(0x137)]||0x5,'strLength':_0x107bf4[_0x35fa2b(0x1a7)][_0x35fa2b(0x173)]||0x100,'totalStrLength':_0x107bf4[_0x35fa2b(0x1a7)][_0x35fa2b(0x127)]||0x100*0x3,'autoExpandLimit':_0x107bf4[_0x35fa2b(0x1a7)][_0x35fa2b(0x18a)]||0x1e,'autoExpandMaxDepth':_0x107bf4[_0x35fa2b(0x1a7)][_0x35fa2b(0x193)]||0x2};function _0x35eac5(_0x1e2dc4,_0x2db531,_0xa87be1,_0x1fd5de,_0x3bc7a2,_0x53ba10){var _0x54653c=_0x35fa2b;let _0x181681,_0x84fbe4;try{_0x84fbe4=_0x146b11(),_0x181681=_0x44fbbc[_0x2db531],!_0x181681||_0x84fbe4-_0x181681['ts']>_0x2aca71[_0x54653c(0x113)][_0x54653c(0xd2)]&&_0x181681[_0x54653c(0x170)]&&_0x181681[_0x54653c(0x10c)]/_0x181681['count']<_0x2aca71['perLogpoint']['resetOnProcessingTimeAverageMs']?(_0x44fbbc[_0x2db531]=_0x181681={'count':0x0,'time':0x0,'ts':_0x84fbe4},_0x44fbbc[_0x54653c(0x153)]={}):_0x84fbe4-_0x44fbbc['hits']['ts']>_0x2aca71[_0x54653c(0x13a)]['resetWhenQuietMs']&&_0x44fbbc['hits']['count']&&_0x44fbbc['hits']['time']/_0x44fbbc[_0x54653c(0x153)][_0x54653c(0x170)]<_0x2aca71[_0x54653c(0x13a)][_0x54653c(0x1b1)]&&(_0x44fbbc[_0x54653c(0x153)]={});let _0xb38a15=[],_0x21db5e=_0x181681[_0x54653c(0x118)]||_0x44fbbc[_0x54653c(0x153)][_0x54653c(0x118)]?_0x1ed406:_0x9e3eef,_0xdfde7c=_0x372820=>{var _0x4c970f=_0x54653c;let _0x17f243={};return _0x17f243[_0x4c970f(0x181)]=_0x372820[_0x4c970f(0x181)],_0x17f243['elements']=_0x372820[_0x4c970f(0x137)],_0x17f243[_0x4c970f(0x173)]=_0x372820[_0x4c970f(0x173)],_0x17f243[_0x4c970f(0x127)]=_0x372820['totalStrLength'],_0x17f243[_0x4c970f(0x18a)]=_0x372820[_0x4c970f(0x18a)],_0x17f243[_0x4c970f(0x193)]=_0x372820['autoExpandMaxDepth'],_0x17f243[_0x4c970f(0x11c)]=!0x1,_0x17f243[_0x4c970f(0xe9)]=!_0x279b7f,_0x17f243['depth']=0x1,_0x17f243['level']=0x0,_0x17f243['expId']='root_exp_id',_0x17f243[_0x4c970f(0x168)]='root_exp',_0x17f243['autoExpand']=!0x0,_0x17f243[_0x4c970f(0x1c0)]=[],_0x17f243[_0x4c970f(0xf2)]=0x0,_0x17f243[_0x4c970f(0xe2)]=_0x107bf4['resolveGetters'],_0x17f243[_0x4c970f(0xeb)]=0x0,_0x17f243[_0x4c970f(0x145)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x17f243;};for(var _0x2ce5ae=0x0;_0x2ce5ae<_0x3bc7a2[_0x54653c(0x183)];_0x2ce5ae++)_0xb38a15['push'](_0x563e33[_0x54653c(0x12d)]({'timeNode':_0x1e2dc4===_0x54653c(0x10c)||void 0x0},_0x3bc7a2[_0x2ce5ae],_0xdfde7c(_0x21db5e),{}));if(_0x1e2dc4===_0x54653c(0x1b6)||_0x1e2dc4===_0x54653c(0x133)){let _0x1e1b27=Error[_0x54653c(0xe5)];try{Error[_0x54653c(0xe5)]=0x1/0x0,_0xb38a15[_0x54653c(0x15f)](_0x563e33[_0x54653c(0x12d)]({'stackNode':!0x0},new Error()[_0x54653c(0xce)],_0xdfde7c(_0x21db5e),{'strLength':0x1/0x0}));}finally{Error[_0x54653c(0xe5)]=_0x1e1b27;}}return{'method':'log','version':_0x386368,'args':[{'ts':_0xa87be1,'session':_0x1fd5de,'args':_0xb38a15,'id':_0x2db531,'context':_0x53ba10}]};}catch(_0x22c94d){return{'method':'log','version':_0x386368,'args':[{'ts':_0xa87be1,'session':_0x1fd5de,'args':[{'type':_0x54653c(0x188),'error':_0x22c94d&&_0x22c94d[_0x54653c(0x162)]}],'id':_0x2db531,'context':_0x53ba10}]};}finally{try{if(_0x181681&&_0x84fbe4){let _0x4b4ef4=_0x146b11();_0x181681['count']++,_0x181681[_0x54653c(0x10c)]+=_0x231193(_0x84fbe4,_0x4b4ef4),_0x181681['ts']=_0x4b4ef4,_0x44fbbc[_0x54653c(0x153)][_0x54653c(0x170)]++,_0x44fbbc['hits']['time']+=_0x231193(_0x84fbe4,_0x4b4ef4),_0x44fbbc[_0x54653c(0x153)]['ts']=_0x4b4ef4,(_0x181681[_0x54653c(0x170)]>_0x2aca71[_0x54653c(0x113)][_0x54653c(0xd8)]||_0x181681[_0x54653c(0x10c)]>_0x2aca71['perLogpoint'][_0x54653c(0x103)])&&(_0x181681[_0x54653c(0x118)]=!0x0),(_0x44fbbc[_0x54653c(0x153)][_0x54653c(0x170)]>_0x2aca71[_0x54653c(0x13a)][_0x54653c(0xd8)]||_0x44fbbc[_0x54653c(0x153)][_0x54653c(0x10c)]>_0x2aca71['global']['reduceOnAccumulatedProcessingTimeMs'])&&(_0x44fbbc[_0x54653c(0x153)][_0x54653c(0x118)]=!0x0);}}catch{}}}return _0x35eac5;}((_0x498a15,_0xd79052,_0x1e38cb,_0x39fc94,_0x24595e,_0x4af341,_0x9b5c46,_0x4e8ba7,_0x33c013,_0x3987af,_0x486c36,_0x5300d3)=>{var _0x29b3e6=_0xdc9146;if(_0x498a15[_0x29b3e6(0x121)])return _0x498a15[_0x29b3e6(0x121)];let _0xa21ca6={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}};if(!H(_0x498a15,_0x4e8ba7,_0x24595e))return _0x498a15['_console_ninja']=_0xa21ca6,_0x498a15['_console_ninja'];let _0x9945e=b(_0x498a15),_0x574afd=_0x9945e[_0x29b3e6(0xff)],_0x4d4e44=_0x9945e[_0x29b3e6(0x1a2)],_0x4d6ca1=_0x9945e['now'],_0x2de2a6={'hits':{},'ts':{}},_0x162540=X(_0x498a15,_0x33c013,_0x2de2a6,_0x4af341,_0x5300d3),_0x2ba829=(_0x25cdf3,_0x330312,_0x52dc5c,_0x5b138e,_0x2d6000,_0x402338)=>{var _0x86b9d3=_0x29b3e6;let _0x1a6719=_0x498a15[_0x86b9d3(0x121)];try{return _0x498a15['_console_ninja']=_0xa21ca6,_0x162540(_0x25cdf3,_0x330312,_0x52dc5c,_0x5b138e,_0x2d6000,_0x402338);}finally{_0x498a15['_console_ninja']=_0x1a6719;}},_0x383d52=_0x16efcf=>{_0x2de2a6['ts'][_0x16efcf]=_0x4d4e44();},_0x370d3a=(_0x17493c,_0x5f33fa)=>{var _0x4ea70a=_0x29b3e6;let _0x1e9c38=_0x2de2a6['ts'][_0x5f33fa];if(delete _0x2de2a6['ts'][_0x5f33fa],_0x1e9c38){let _0x2ecfe5=_0x574afd(_0x1e9c38,_0x4d4e44());_0x4f642f(_0x2ba829(_0x4ea70a(0x10c),_0x17493c,_0x4d6ca1(),_0x46e7fe,[_0x2ecfe5],_0x5f33fa));}},_0x3a9918=_0x55d2b5=>{var _0x1d4a7b=_0x29b3e6,_0x5a5a25;return _0x24595e===_0x1d4a7b(0x16b)&&_0x498a15[_0x1d4a7b(0x17f)]&&((_0x5a5a25=_0x55d2b5==null?void 0x0:_0x55d2b5['args'])==null?void 0x0:_0x5a5a25[_0x1d4a7b(0x183)])&&(_0x55d2b5[_0x1d4a7b(0x195)][0x0][_0x1d4a7b(0x17f)]=_0x498a15[_0x1d4a7b(0x17f)]),_0x55d2b5;};_0x498a15[_0x29b3e6(0x121)]={'consoleLog':(_0x8d43db,_0x572242)=>{var _0x1a4a5a=_0x29b3e6;_0x498a15[_0x1a4a5a(0x1b9)][_0x1a4a5a(0x107)][_0x1a4a5a(0x15b)]!=='disabledLog'&&_0x4f642f(_0x2ba829(_0x1a4a5a(0x107),_0x8d43db,_0x4d6ca1(),_0x46e7fe,_0x572242));},'consoleTrace':(_0xeabfa9,_0x4e8b03)=>{var _0x1a7575=_0x29b3e6,_0x2d3b1b,_0x40b18;_0x498a15['console'][_0x1a7575(0x107)][_0x1a7575(0x15b)]!=='disabledTrace'&&((_0x40b18=(_0x2d3b1b=_0x498a15[_0x1a7575(0x166)])==null?void 0x0:_0x2d3b1b['versions'])!=null&&_0x40b18[_0x1a7575(0x145)]&&(_0x498a15[_0x1a7575(0x178)]=!0x0),_0x4f642f(_0x3a9918(_0x2ba829(_0x1a7575(0x1b6),_0xeabfa9,_0x4d6ca1(),_0x46e7fe,_0x4e8b03))));},'consoleError':(_0x4f6daf,_0x4a0a55)=>{var _0x42506b=_0x29b3e6;_0x498a15[_0x42506b(0x178)]=!0x0,_0x4f642f(_0x3a9918(_0x2ba829(_0x42506b(0x133),_0x4f6daf,_0x4d6ca1(),_0x46e7fe,_0x4a0a55)));},'consoleTime':_0x2d1ad5=>{_0x383d52(_0x2d1ad5);},'consoleTimeEnd':(_0x3fdf5e,_0x369439)=>{_0x370d3a(_0x369439,_0x3fdf5e);},'autoLog':(_0x1110ed,_0x3ba346)=>{var _0x2efe7b=_0x29b3e6;_0x4f642f(_0x2ba829(_0x2efe7b(0x107),_0x3ba346,_0x4d6ca1(),_0x46e7fe,[_0x1110ed]));},'autoLogMany':(_0x5861d0,_0x9ad74a)=>{var _0x50ba63=_0x29b3e6;_0x4f642f(_0x2ba829(_0x50ba63(0x107),_0x5861d0,_0x4d6ca1(),_0x46e7fe,_0x9ad74a));},'autoTrace':(_0x220d05,_0x589bd4)=>{_0x4f642f(_0x3a9918(_0x2ba829('trace',_0x589bd4,_0x4d6ca1(),_0x46e7fe,[_0x220d05])));},'autoTraceMany':(_0x485f65,_0x28a6d8)=>{var _0x25fd1b=_0x29b3e6;_0x4f642f(_0x3a9918(_0x2ba829(_0x25fd1b(0x1b6),_0x485f65,_0x4d6ca1(),_0x46e7fe,_0x28a6d8)));},'autoTime':(_0x175154,_0x936ce9,_0x3db64e)=>{_0x383d52(_0x3db64e);},'autoTimeEnd':(_0x3a4f5c,_0x59a1b4,_0x52da95)=>{_0x370d3a(_0x59a1b4,_0x52da95);},'coverage':_0x21923f=>{var _0x2ed28f=_0x29b3e6;_0x4f642f({'method':_0x2ed28f(0x160),'version':_0x4af341,'args':[{'id':_0x21923f}]});}};let _0x4f642f=q(_0x498a15,_0xd79052,_0x1e38cb,_0x39fc94,_0x24595e,_0x3987af,_0x486c36),_0x46e7fe=_0x498a15[_0x29b3e6(0xe7)];return _0x498a15[_0x29b3e6(0x121)];})(globalThis,_0xdc9146(0x132),'53067',_0xdc9146(0x19e),_0xdc9146(0xd3),_0xdc9146(0x1b2),'1761249716797',_0xdc9146(0x163),_0xdc9146(0x141),_0xdc9146(0x1bb),'1',_0xdc9146(0x1c1));function _0x212f(){var _0x2e915f=['defaultLimits','_isSet','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','hrtime','3769340SEiUNO','totalStrLength','getOwnPropertyDescriptor','array','getWebSocketClass','unshift','function','serialize','level','path','index','reload','127.0.0.1','error','_getOwnPropertySymbols','_p_','9476664ZLdjQF','elements','fromCharCode','map','global','_maxConnectAttemptCount','dockerizedApp','close','String','funcName','_inNextEdge','','readyState','ExpoDevice','import(\\x27url\\x27)','node','_HTMLAllCollection','sort','prototype','location','parent','5519tNkPuy','_isPrimitiveWrapperType','_type','slice','autoExpand','79140gKjezR','_setNodePermissions','_treeNodePropertiesAfterFullValue','hits','1399188IPbrRr','osName','onopen','3iaqHlF','[object\\x20Date]','_hasSetOnItsPath','toLowerCase','name','_getOwnPropertyNames','_inBrowser','HTMLAllCollection','push','coverage','_attemptToReconnectShortly','message',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"10.0.2.2\",\"Rebeccas-MacBook-Air.local\",\"192.168.1.65\"],'toUpperCase','10.0.2.2','process','_numberRegExp','rootExpression','[object\\x20Set]','Boolean','next.js','_allowedToConnectOnSend','Symbol','onclose','_cleanNode','count','_isNegativeZero','android','strLength','_isPrimitiveType','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_undefined','_keyStrRegExp','_ninjaIgnoreNextError','object','cappedElements','getOwnPropertySymbols','boolean','split','_property','origin','substr','props','return\\x20import(url.pathToFileURL(path.join(nodeModules,\\x20\\x27ws/index.js\\x27)).toString());','length','charAt','Number','includes','number','unknown','endsWith','autoExpandLimit','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','_isMap','import(\\x27path\\x27)','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_WebSocket','_treeNodePropertiesBeforeFullValue','constructor','_ws','autoExpandMaxDepth','getter','args','_p_name','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','toString','reducePolicy','port','_dateToString','then','isArray',\"/Users/rebeccalemke/.vscode/extensions/wallabyjs.console-ninja-1.0.488/node_modules\",'3612ySjMqO','onerror','date','timeStamp','modules','_extendedWarning','_connecting','\\x20server','reducedLimits','nodeModules','_addProperty','_setNodeId','expressionsToEvaluate','react-native','_hasMapOnItsPath','hostname','_WebSocketClass','Error','resetOnProcessingTimeAverageMs','1.0.0','_getOwnPropertyDescriptor','_addObjectProperty','bigint','trace','default','2126762ubNiQX','console','pop','','current','concat','_setNodeExpandableState','_allowedToSend','autoExpandPreviousObjects',{\"resolveGetters\":false,\"defaultLimits\":{\"props\":100,\"elements\":100,\"strLength\":51200,\"totalStrLength\":51200,\"autoExpandLimit\":5000,\"autoExpandMaxDepth\":10},\"reducedLimits\":{\"props\":5,\"elements\":5,\"strLength\":256,\"totalStrLength\":768,\"autoExpandLimit\":30,\"autoExpandMaxDepth\":2},\"reducePolicy\":{\"perLogpoint\":{\"reduceOnCount\":50,\"reduceOnAccumulatedProcessingTimeMs\":100,\"resetWhenQuietMs\":500,\"resetOnProcessingTimeAverageMs\":100},\"global\":{\"reduceOnCount\":1000,\"reduceOnAccumulatedProcessingTimeMs\":300,\"resetWhenQuietMs\":50,\"resetOnProcessingTimeAverageMs\":100}}},'ninjaSuppressConsole','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','depth','254Bffgwi','edge','isExpressionToEvaluate','positiveInfinity','gateway.docker.internal','_regExpToString','valueOf','warn','_Symbol','_connectAttemptCount','nan','indexOf','get','capped','forEach','env','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','NEXT_RUNTIME','_connected','stack','onmessage','RegExp','replace','resetWhenQuietMs','live-server-extension','match','_capIfString','logger\\x20websocket\\x20error','9611LrGjRA','reduceOnCount','_objectToString','symbol','_quotedRegExp','_socket','_additionalMetadata','catch','angular','bind','_addFunctionsNode','resolveGetters','POSITIVE_INFINITY','set','stackTraceLimit','[object\\x20Array]','_console_ninja_session','_propertyName','noFunctions','host','allStrLength','NEGATIVE_INFINITY','...','_setNodeQueryPath','_reconnectTimeout','_sortProps','getOwnPropertyNames','autoExpandPropertyCount','string','_sendErrorMessage','[object\\x20BigInt]','method','ws://','288IueJkq','Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','call','perf_hooks','_setNodeLabel','Map','_connectToHostNow','elapsed','negativeZero','_webSocketErrorDocsLink','send','reduceOnAccumulatedProcessingTimeMs','_disposeWebsocket','eventReceivedCallback','versions','log','remix','_processTreeNodeResult','null','unref','time','now','_isUndefined','value',',\\x20see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','parse','https://tinyurl.com/37x8b79t','perLogpoint','undefined','test','_blacklistedProperty','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','reduceLimits','_consoleNinjaAllowedToStart','Buffer','performance','sortProps','_addLoadNode','type','astro','Set','_console_ninja'];_0x212f=function(){return _0x2e915f;};return _0x212f();}");}catch(e){console.error(e);}};/* istanbul ignore next */function oo_oo(i:string,...v:any[]){try{oo_cm().consoleLog(i, v);}catch(e){} return v};oo_oo;/* istanbul ignore next */function oo_tr(i:string,...v:any[]){try{oo_cm().consoleTrace(i, v);}catch(e){} return v};oo_tr;/* istanbul ignore next */function oo_tx(i:string,...v:any[]){try{oo_cm().consoleError(i, v);}catch(e){} return v};oo_tx;/* istanbul ignore next */function oo_ts(v?:string):string{try{oo_cm().consoleTime(v);}catch(e){} return v as string;};oo_ts;/* istanbul ignore next */function oo_te(v:string|undefined, i:string):string{try{oo_cm().consoleTimeEnd(v, i);}catch(e){} return v as string;};oo_te;/*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/
