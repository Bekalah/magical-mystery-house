/**
 * SacredMaterials
 * 
 * @package @cathedral/src
 */
/**
 * Sacred Materials Library
 * Traditional artistic materials and techniques for sacred art creation
 * Inspired by Ernst Fuchs, medieval grimoires, and visionary artists
 */

export interface SacredMaterial {
  id: string;
  name: string;
  type: 'pigment' | 'binder' | 'substrate' | 'metal' | 'tool' | 'technique';
  category: 'traditional' | 'alchemical' | 'visionary' | 'contemporary';
  era: 'ancient' | 'medieval' | 'renaissance' | 'modern' | 'contemporary';

  // Physical properties
  properties: MaterialProperties;

  // Sacred correspondences
  correspondences: SacredCorrespondences;

  // Usage and techniques
  usage: MaterialUsage;

  // Historical context
  history: HistoricalContext;

  // Modern applications
  applications: ModernApplications;
}

export interface MaterialProperties {
  // Physical characteristics
  color?: string;
  transparency: number; // 0-1
  luminosity: number; // 0-1
  durability: number; // 0-1
  flexibility: number; // 0-1

  // Chemical properties
  toxicity: 'none' | 'low' | 'medium' | 'high';
  stability: number; // 0-1
  reactivity: number; // 0-1

  // Optical properties
  refractiveIndex: number;
  iridescence: number; // 0-1
  fluorescence: number; // 0-1
}

export interface SacredCorrespondences {
  element: string;
  planet: string;
  zodiac: string;
  chakra: string;
  solfeggio: number;
  deity: string;
  archangel: string;
  demon: string;
  alchemicalStage: string;
  tarotCard: string;
}

export interface MaterialUsage {
  traditionalTechniques: string[];
  sacredApplications: string[];
  ritualUses: string[];
  preparationMethods: string[];
  combinationMaterials: string[];
  safetyConsiderations: string[];
}

export interface HistoricalContext {
  origin: string;
  era: string;
  culturalContext: string;
  famousPractitioners: string[];
  historicalSignificance: string;
  evolution: string;
}

export interface ModernApplications {
  contemporaryUses: string[];
  sacredTechnologyIntegration: string[];
  artisticInnovations: string[];
  therapeuticApplications: string[];
  educationalValue: string[];
}

export class SacredMaterialsLibrary {
  private materials: Map<string, SacredMaterial> = new Map();

  constructor() {
    this.initializeMaterials();
  }

  private initializeMaterials(): void {
    // Ernst Fuchs and Vienna School Materials
    this.addErnstFuchsMaterials();

    // Medieval Grimoire Materials
    this.addMedievalMaterials();

    // Contemporary Visionary Materials
    this.addContemporaryMaterials();

    // Alchemical Materials
    this.addAlchemicalMaterials();
  }

  private addErnstFuchsMaterials(): void {
    // Mischtechnik materials
    const eggTempera: SacredMaterial = {
      id: 'egg_tempera',
      name: 'Egg Tempera',
      type: 'binder',
      category: 'traditional',
      era: 'medieval',

      properties: {
        transparency: 0.3,
        luminosity: 0.8,
        durability: 0.9,
        flexibility: 0.4,
        toxicity: 'low',
        stability: 0.9,
        reactivity: 0.2,
        refractiveIndex: 1.5,
        iridescence: 0.1,
        fluorescence: 0.0
      },

      correspondences: {
        element: 'Water',
        planet: 'Moon',
        zodiac: 'Cancer',
        chakra: 'Sacral',
        solfeggio: 417,
        deity: 'Isis',
        archangel: 'Gabriel',
        demon: 'Agares',
        alchemicalStage: 'albedo',
        tarotCard: 'The High Priestess'
      },

      usage: {
        traditionalTechniques: [
          'Underdrawing preparation',
          'Layer building',
          'Luminous underpainting',
          'Matte surface creation'
        ],
        sacredApplications: [
          'Icon painting',
          'Sacred geometry illumination',
          'Mandala creation',
          'Divine portraiture'
        ],
        ritualUses: [
          'Meditation focus creation',
          'Sacred space decoration',
          'Ceremonial objects',
          'Altar pieces'
        ],
        preparationMethods: [
          'Egg yolk separation',
          'Pigment grinding',
          'Binder mixing',
          'Testing consistency'
        ],
        combinationMaterials: [
          'Natural pigments',
          'Gold leaf',
          'Resin glazes',
          'Oil mediums'
        ],
        safetyConsiderations: [
          'Fresh egg use only',
          'Proper ventilation',
          'Skin protection',
          'Storage in cool, dry conditions'
        ]
      },

      history: {
        origin: 'Ancient Egypt, refined in Byzantine Empire',
        era: 'Medieval (4th-15th century)',
        culturalContext: 'Christian iconography and sacred art',
        famousPractitioners: [
          'Ernst Fuchs',
          'Andrew Wyeth',
          'Giorgio Vasari',
          'Cennino Cennini'
        ],
        historicalSignificance: 'Primary medium for sacred art for over 1000 years',
        evolution: 'From ancient Egyptian to modern visionary art revival'
      },

      applications: {
        contemporaryUses: [
          'Visionary art underpainting',
          'Sacred geometry work',
          'Icon restoration',
          'Modern tempera painting'
        ],
        sacredTechnologyIntegration: [
          'Digital tempera simulation',
          'Sacred geometry algorithms',
          'Luminous effect replication',
          'Traditional technique preservation'
        ],
        artisticInnovations: [
          'Layered luminosity techniques',
          'Color transparency methods',
          'Sacred symbol illumination',
          'Modern interpretation of ancient methods'
        ],
        therapeuticApplications: [
          'Meditation aid creation',
          'Sacred space enhancement',
          'Healing mandala production',
          'Art therapy materials'
        ],
        educationalValue: [
          'Traditional technique preservation',
          'Sacred art history',
          'Material science education',
          'Artistic skill development'
        ]
      }
    };

    this.materials.set(eggTempera.id, eggTempera);

    // Oil and resin glazes
    const oilGlaze: SacredMaterial = {
      id: 'oil_resin_glaze',
      name: 'Oil and Resin Glaze',
      type: 'binder',
      category: 'traditional',
      era: 'renaissance',

      properties: {
        transparency: 0.8,
        luminosity: 0.9,
        durability: 0.8,
        flexibility: 0.6,
        toxicity: 'medium',
        stability: 0.7,
        reactivity: 0.4,
        refractiveIndex: 1.6,
        iridescence: 0.3,
        fluorescence: 0.1
      },

      correspondences: {
        element: 'Fire',
        planet: 'Sun',
        zodiac: 'Leo',
        chakra: 'Solar Plexus',
        solfeggio: 528,
        deity: 'Ra',
        archangel: 'Michael',
        demon: 'Marbas',
        alchemicalStage: 'rubedo',
        tarotCard: 'The Sun'
      },

      usage: {
        traditionalTechniques: [
          'Layer glazing',
          'Color depth creation',
          'Luminosity enhancement',
          'Surface protection'
        ],
        sacredApplications: [
          'Sacred art finishing',
          'Divine light representation',
          'Symbolic depth creation',
          'Energetic enhancement'
        ],
        ritualUses: [
          'Ceremonial object creation',
          'Sacred space illumination',
          'Divine energy focusing',
          'Light work enhancement'
        ],
        preparationMethods: [
          'Resin purification',
          'Oil refinement',
          'Glaze mixing',
          'Testing transparency'
        ],
        combinationMaterials: [
          'Natural oils',
          'Tree resins',
          'Essential oils',
          'Crystal essences'
        ],
        safetyConsiderations: [
          'Proper ventilation required',
          'Skin protection essential',
          'Fire safety protocols',
          'Storage away from heat'
        ]
      },

      history: {
        origin: 'Flemish painting techniques, refined by Ernst Fuchs',
        era: 'Renaissance to Modern',
        culturalContext: 'Northern European painting and visionary art',
        famousPractitioners: [
          'Ernst Fuchs',
          'Jan van Eyck',
          'Rogier van der Weyden',
          'Albrecht Dürer'
        ],
        historicalSignificance: 'Revolutionary glazing technique for luminous effects',
        evolution: 'From medieval methods to modern visionary art'
      },

      applications: {
        contemporaryUses: [
          'Visionary art glazing',
          'Luminous effect creation',
          'Sacred art finishing',
          'Modern oil techniques'
        ],
        sacredTechnologyIntegration: [
          'Digital glaze simulation',
          'Luminous algorithm development',
          'Sacred light replication',
          'Traditional method preservation'
        ],
        artisticInnovations: [
          'Transparent layering techniques',
          'Light manipulation methods',
          'Depth creation innovations',
          'Modern interpretation of ancient glazing'
        ],
        therapeuticApplications: [
          'Light therapy art creation',
          'Sacred space enhancement',
          'Healing visual environments',
          'Art therapy with luminous materials'
        ],
        educationalValue: [
          'Glazing technique education',
          'Light manipulation study',
          'Sacred art methodology',
          'Artistic skill development'
        ]
      }
    };

    this.materials.set(oilGlaze.id, oilGlaze);
  }

  private addMedievalMaterials(): void {
    // Parchment and vellum
    const parchment: SacredMaterial = {
      id: 'parchment',
      name: 'Parchment',
      type: 'substrate',
      category: 'traditional',
      era: 'ancient',

      properties: {
        transparency: 0.0,
        luminosity: 0.2,
        durability: 0.9,
        flexibility: 0.7,
        toxicity: 'none',
        stability: 0.9,
        reactivity: 0.1,
        refractiveIndex: 1.4,
        iridescence: 0.0,
        fluorescence: 0.0
      },

      correspondences: {
        element: 'Earth',
        planet: 'Saturn',
        zodiac: 'Capricorn',
        chakra: 'Root',
        solfeggio: 396,
        deity: 'Demeter',
        archangel: 'Cassiel',
        demon: 'Vassago',
        alchemicalStage: 'nigredo',
        tarotCard: 'The World'
      },

      usage: {
        traditionalTechniques: [
          'Skin preparation',
          'Liming process',
          'Stretching and drying',
          'Surface polishing'
        ],
        sacredApplications: [
          'Grimoire creation',
          'Sacred text illumination',
          'Magical diagram drawing',
          'Ritual object construction'
        ],
        ritualUses: [
          'Sacred text preservation',
          'Magical working surface',
          'Divine message recording',
          'Ceremonial object creation'
        ],
        preparationMethods: [
          'Animal skin selection',
          'Lime solution preparation',
          'Dehairing process',
          'Stretching and drying'
        ],
        combinationMaterials: [
          'Oak gall ink',
          'Natural pigments',
          'Gold leaf',
          'Mineral colors'
        ],
        safetyConsiderations: [
          'Proper tool handling',
          'Clean work environment',
          'Material storage',
          'Allergy considerations'
        ]
      },

      history: {
        origin: 'Ancient Pergamon (Pergamum)',
        era: 'Ancient to Medieval',
        culturalContext: 'Sacred text preservation and illumination',
        famousPractitioners: [
          'Medieval scribes',
          'Illuminated manuscript artists',
          'Grimoire creators',
          'Sacred text preservers'
        ],
        historicalSignificance: 'Primary material for sacred knowledge preservation',
        evolution: 'From ancient scrolls to modern bookbinding'
      },

      applications: {
        contemporaryUses: [
          'Artisanal bookbinding',
          'Sacred text reproduction',
          'Modern grimoire creation',
          'Traditional craft revival'
        ],
        sacredTechnologyIntegration: [
          'Digital parchment simulation',
          'Sacred text digitization',
          'Traditional method preservation',
          'Modern ritual applications'
        ],
        artisticInnovations: [
          'Contemporary illumination',
          'Mixed media applications',
          'Sacred art surfaces',
          'Traditional technique revival'
        ],
        therapeuticApplications: [
          'Art therapy surfaces',
          'Sacred craft therapy',
          'Traditional skill building',
          'Mindfulness practice materials'
        ],
        educationalValue: [
          'Historical craft education',
          'Sacred text study',
          'Traditional technique learning',
          'Cultural heritage preservation'
        ]
      }
    };

    this.materials.set(parchment.id, parchment);

    // Oak gall ink
    const oakGallInk: SacredMaterial = {
      id: 'oak_gall_ink',
      name: 'Oak Gall Ink',
      type: 'pigment',
      category: 'traditional',
      era: 'medieval',

      properties: {
        color: '#2F1B14',
        transparency: 0.0,
        luminosity: 0.1,
        durability: 0.95,
        flexibility: 0.0,
        toxicity: 'low',
        stability: 0.95,
        reactivity: 0.2,
        refractiveIndex: 1.3,
        iridescence: 0.0,
        fluorescence: 0.0
      },

      correspondences: {
        element: 'Earth',
        planet: 'Saturn',
        zodiac: 'Capricorn',
        chakra: 'Root',
        solfeggio: 396,
        deity: 'Hecate',
        archangel: 'Cassiel',
        demon: 'Vassago',
        alchemicalStage: 'nigredo',
        tarotCard: 'The Hermit'
      },

      usage: {
        traditionalTechniques: [
          'Gall collection',
          'Fermentation process',
          'Iron sulfate addition',
          'Gum arabic binding'
        ],
        sacredApplications: [
          'Grimoire text writing',
          'Sacred diagram creation',
          'Magical symbol inscription',
          'Divine name recording'
        ],
        ritualUses: [
          'Sacred text creation',
          'Magical inscription',
          'Divine communication',
          'Ceremonial documentation'
        ],
        preparationMethods: [
          'Oak gall harvesting',
          'Water extraction',
          'Iron salt addition',
          'Binder incorporation'
        ],
        combinationMaterials: [
          'Iron sulfate',
          'Gum arabic',
          'Wine or vinegar',
          'Clove oil'
        ],
        safetyConsiderations: [
          'Iron salt handling',
          'Proper ventilation',
          'Skin protection',
          'Storage in glass containers'
        ]
      },

      history: {
        origin: 'Ancient Rome, refined in medieval Europe',
        era: 'Medieval (5th-15th century)',
        culturalContext: 'Sacred text and grimoire creation',
        famousPractitioners: [
          'Medieval scribes',
          'Monastic illuminators',
          'Grimoire authors',
          'Sacred text creators'
        ],
        historicalSignificance: 'Primary ink for sacred and magical texts',
        evolution: 'From ancient recipes to modern formulations'
      },

      applications: {
        contemporaryUses: [
          'Calligraphy and lettering',
          'Sacred text reproduction',
          'Modern grimoire creation',
          'Artisanal ink making'
        ],
        sacredTechnologyIntegration: [
          'Digital ink simulation',
          'Sacred text digitization',
          'Traditional recipe preservation',
          'Modern ritual applications'
        ],
        artisticInnovations: [
          'Contemporary calligraphy',
          'Sacred art integration',
          'Modern illumination',
          'Traditional technique revival'
        ],
        therapeuticApplications: [
          'Art therapy with traditional materials',
          'Sacred writing practice',
          'Mindfulness calligraphy',
          'Traditional craft therapy'
        ],
        educationalValue: [
          'Historical ink making',
          'Calligraphy education',
          'Sacred text study',
          'Traditional craft learning'
        ]
      }
    };

    this.materials.set(oakGallInk.id, oakGallInk);
  }

  private addAlchemicalMaterials(): void {
    // Lapis Lazuli
    const lapisLazuli: SacredMaterial = {
      id: 'lapis_lazuli',
      name: 'Lapis Lazuli',
      type: 'pigment',
      category: 'alchemical',
      era: 'ancient',

      properties: {
        color: '#1E90FF',
        transparency: 0.0,
        luminosity: 0.7,
        durability: 0.9,
        flexibility: 0.0,
        toxicity: 'low',
        stability: 0.9,
        reactivity: 0.1,
        refractiveIndex: 1.6,
        iridescence: 0.4,
        fluorescence: 0.0
      },

      correspondences: {
        element: 'Water',
        planet: 'Venus',
        zodiac: 'Libra',
        chakra: 'Throat',
        solfeggio: 741,
        deity: 'Isis',
        archangel: 'Haniel',
        demon: 'Gremory',
        alchemicalStage: 'albedo',
        tarotCard: 'The High Priestess'
      },

      usage: {
        traditionalTechniques: [
          'Grinding and purification',
          'Binder mixing',
          'Layer application',
          'Surface polishing'
        ],
        sacredApplications: [
          'Divine representation',
          'Sacred space decoration',
          'Ceremonial objects',
          'Healing mandalas'
        ],
        ritualUses: [
          'Divine presence invocation',
          'Sacred space creation',
          'Healing work enhancement',
          'Wisdom seeking'
        ],
        preparationMethods: [
          'Stone selection',
          'Grinding process',
          'Purification ritual',
          'Binder preparation'
        ],
        combinationMaterials: [
          'Egg tempera',
          'Oil mediums',
          'Gold leaf',
          'Other mineral pigments'
        ],
        safetyConsiderations: [
          'Dust protection',
          'Proper grinding tools',
          'Clean work environment',
          'Storage in dry conditions'
        ]
      },

      history: {
        origin: 'Ancient Afghanistan, traded throughout ancient world',
        era: 'Ancient to Renaissance',
        culturalContext: 'Sacred art and divine representation',
        famousPractitioners: [
          'Medieval illuminators',
          'Renaissance masters',
          'Sacred artists',
          'Alchemical practitioners'
        ],
        historicalSignificance: 'Most precious pigment for divine representation',
        evolution: 'From ancient trade to modern alchemical art'
      },

      applications: {
        contemporaryUses: [
          'Sacred art creation',
          'Divine symbol painting',
          'Modern illumination',
          'Alchemical art'
        ],
        sacredTechnologyIntegration: [
          'Digital color replication',
          'Sacred geometry integration',
          'Traditional technique preservation',
          'Modern ritual applications'
        ],
        artisticInnovations: [
          'Contemporary sacred art',
          'Alchemical painting methods',
          'Divine representation',
          'Traditional technique revival'
        ],
        therapeuticApplications: [
          'Color therapy with sacred pigments',
          'Sacred art therapy',
          'Meditation aid creation',
          'Healing mandala production'
        ],
        educationalValue: [
          'Alchemical pigment study',
          'Sacred color education',
          'Traditional technique learning',
          'Artistic material science'
        ]
      }
    };

    this.materials.set(lapisLazuli.id, lapisLazuli);

    // Gold leaf
    const goldLeaf: SacredMaterial = {
      id: 'gold_leaf',
      name: 'Gold Leaf',
      type: 'metal',
      category: 'alchemical',
      era: 'ancient',

      properties: {
        transparency: 0.0,
        luminosity: 1.0,
        durability: 1.0,
        flexibility: 0.2,
        toxicity: 'none',
        stability: 1.0,
        reactivity: 0.0,
        refractiveIndex: 0.47,
        iridescence: 0.0,
        fluorescence: 0.0
      },

      correspondences: {
        element: 'Fire',
        planet: 'Sun',
        zodiac: 'Leo',
        chakra: 'Solar Plexus',
        solfeggio: 528,
        deity: 'Ra',
        archangel: 'Michael',
        demon: 'Marbas',
        alchemicalStage: 'rubedo',
        tarotCard: 'The Sun'
      },

      usage: {
        traditionalTechniques: [
          'Leaf beating',
          'Adhesive application',
          'Leaf placement',
          'Burnishing and polishing'
        ],
        sacredApplications: [
          'Divine light representation',
          'Sacred geometry gilding',
          'Icon background creation',
          'Ceremonial object decoration'
        ],
        ritualUses: [
          'Divine presence manifestation',
          'Sacred space illumination',
          'Light work enhancement',
          'Divine energy focusing'
        ],
        preparationMethods: [
          'Gold purification',
          'Hammer beating',
          'Leaf cutting',
          'Storage preparation'
        ],
        combinationMaterials: [
          'Gesso or clay base',
          'Glair adhesive',
          'Agate burnishers',
          'Soft brushes'
        ],
        safetyConsiderations: [
          'Proper adhesive handling',
          'Clean work environment',
          'Tool care and maintenance',
          'Storage in controlled conditions'
        ]
      },

      history: {
        origin: 'Ancient Egypt, refined throughout history',
        era: 'Ancient to Contemporary',
        culturalContext: 'Divine representation and sacred art',
        famousPractitioners: [
          'Ancient Egyptian artisans',
          'Medieval illuminators',
          'Renaissance masters',
          'Contemporary sacred artists'
        ],
        historicalSignificance: 'Ultimate material for divine light representation',
        evolution: 'From ancient tombs to modern sacred art'
      },

      applications: {
        contemporaryUses: [
          'Sacred art gilding',
          'Icon creation',
          'Modern illumination',
          'Alchemical art decoration'
        ],
        sacredTechnologyIntegration: [
          'Digital gold simulation',
          'Sacred geometry integration',
          'Traditional technique preservation',
          'Modern ritual applications'
        ],
        artisticInnovations: [
          'Contemporary gilding techniques',
          'Sacred art applications',
          'Light manipulation methods',
          'Traditional method revival'
        ],
        therapeuticApplications: [
          'Light therapy art creation',
          'Sacred space enhancement',
          'Healing visual environments',
          'Art therapy with precious materials'
        ],
        educationalValue: [
          'Gilding technique education',
          'Sacred art methodology',
          'Material science study',
          'Artistic skill development'
        ]
      }
    };

    this.materials.set(goldLeaf.id, goldLeaf);
  }

  private addContemporaryMaterials(): void {
    // Modern visionary art materials
    const acrylicMedium: SacredMaterial = {
      id: 'acrylic_medium',
      name: 'Acrylic Medium',
      type: 'binder',
      category: 'contemporary',
      era: 'modern',

      properties: {
        transparency: 0.8,
        luminosity: 0.7,
        durability: 0.8,
        flexibility: 0.9,
        toxicity: 'low',
        stability: 0.8,
        reactivity: 0.3,
        refractiveIndex: 1.5,
        iridescence: 0.2,
        fluorescence: 0.3
      },

      correspondences: {
        element: 'Air',
        planet: 'Uranus',
        zodiac: 'Aquarius',
        chakra: 'Third Eye',
        solfeggio: 852,
        deity: 'Prometheus',
        archangel: 'Uriel',
        demon: 'Decarabia',
        alchemicalStage: 'citrinitas',
        tarotCard: 'The Star'
      },

      usage: {
        traditionalTechniques: [
          'Layer building',
          'Glazing methods',
          'Texture creation',
          'Surface manipulation'
        ],
        sacredApplications: [
          'Visionary art creation',
          'Sacred space decoration',
          'Modern icon creation',
          'Contemporary illumination'
        ],
        ritualUses: [
          'Modern ritual objects',
          'Sacred space enhancement',
          'Visionary work support',
          'Contemporary ceremony'
        ],
        preparationMethods: [
          'Medium selection',
          'Pigment mixing',
          'Consistency testing',
          'Surface preparation'
        ],
        combinationMaterials: [
          'Modern pigments',
          'Natural materials',
          'Contemporary binders',
          'Mixed media elements'
        ],
        safetyConsiderations: [
          'Proper ventilation',
          'Skin protection',
          'Material compatibility',
          'Storage guidelines'
        ]
      },

      history: {
        origin: '20th century artistic innovation',
        era: 'Modern to Contemporary',
        culturalContext: 'Contemporary visionary and sacred art',
        famousPractitioners: [
          'Contemporary visionary artists',
          'Modern sacred artists',
          'Mixed media creators',
          'Sacred art innovators'
        ],
        historicalSignificance: 'Revolutionary medium for modern sacred expression',
        evolution: 'From commercial development to sacred art application'
      },

      applications: {
        contemporaryUses: [
          'Visionary art creation',
          'Sacred space decoration',
          'Modern icon painting',
          'Contemporary illumination'
        ],
        sacredTechnologyIntegration: [
          'Digital medium simulation',
          'Sacred art algorithms',
          'Traditional integration',
          'Modern technique development'
        ],
        artisticInnovations: [
          'Contemporary sacred art methods',
          'Mixed media sacred applications',
          'Modern illumination techniques',
          'Sacred art evolution'
        ],
        therapeuticApplications: [
          'Modern art therapy',
          'Sacred art healing',
          'Contemporary ritual materials',
          'Visionary art therapy'
        ],
        educationalValue: [
          'Modern technique education',
          'Sacred art methodology',
          'Contemporary material science',
          'Artistic innovation study'
        ]
      }
    };

    this.materials.set(acrylicMedium.id, acrylicMedium);
  }

  /**
   * Get material by ID
   */
  public getMaterial(id: string): SacredMaterial | undefined {
    return this.materials.get(id);
  }

  /**
   * Get all materials
   */
  public getAllMaterials(): SacredMaterial[] {
    return Array.from(this.materials.values());
  }

  /**
   * Get materials by category
   */
  public getMaterialsByCategory(category: string): SacredMaterial[] {
    return Array.from(this.materials.values()).filter(material =>
      material.category === category
    );
  }

  /**
   * Get materials by type
   */
  public getMaterialsByType(type: string): SacredMaterial[] {
    return Array.from(this.materials.values()).filter(material =>
      material.type === type
    );
  }

  /**
   * Get materials by element
   */
  public getMaterialsByElement(element: string): SacredMaterial[] {
    return Array.from(this.materials.values()).filter(material =>
      material.correspondences.element.toLowerCase() === element.toLowerCase()
    );
  }

  /**
   * Get materials by alchemical stage
   */
  public getMaterialsByAlchemicalStage(stage: string): SacredMaterial[] {
    return Array.from(this.materials.values()).filter(material =>
      material.correspondences.alchemicalStage === stage
    );
  }

  /**
   * Search materials
   */
  public searchMaterials(query: string): SacredMaterial[] {
    const results: SacredMaterial[] = [];

    for (const material of this.materials.values()) {
      if (material.name.toLowerCase().includes(query.toLowerCase()) ||
          material.type.includes(query.toLowerCase()) ||
          material.category.includes(query.toLowerCase()) ||
          material.correspondences.element.toLowerCase().includes(query.toLowerCase())) {
        results.push(material);
      }
    }

    return results;
  }

  /**
   * Get material recommendations for technique
   */
  public getRecommendationsForTechnique(technique: string): SacredMaterial[] {
    const recommendations: SacredMaterial[] = [];

    for (const material of this.materials.values()) {
      if (material.usage.traditionalTechniques.some(t =>
        t.toLowerCase().includes(technique.toLowerCase())) ||
        material.usage.sacredApplications.some(a =>
        a.toLowerCase().includes(technique.toLowerCase()))) {
        recommendations.push(material);
      }
    }

    return recommendations;
  }

  /**
   * Get material combinations
   */
  public getMaterialCombinations(materialId: string): string[] {
    const material = this.materials.get(materialId);
    return material ? material.usage.combinationMaterials : [];
  }

  /**
   * Generate material usage guide
   */
  public generateUsageGuide(materialId: string): string {
    const material = this.materials.get(materialId);
    if (!material) return 'Material not found';

    return `
# 📚 ${material.name} - Sacred Material Guide

## 🌟 Sacred Correspondences
- **Element**: ${material.correspondences.element}
- **Planet**: ${material.correspondences.planet}
- **Chakra**: ${material.correspondences.chakra}
- **Solfeggio**: ${material.correspondences.solfeggio}Hz
- **Deity**: ${material.correspondences.deity}
- **Alchemical Stage**: ${material.correspondences.alchemicalStage}

## 🛠️ Traditional Techniques
${material.usage.traditionalTechniques.map(technique => `- ${technique}`).join('
')
')}

## ✨ Sacred Applications
${material.usage.sacredApplications.map(app => `- ${app}`).join('
')
')}

## 🧪 Preparation Methods
${material.usage.preparationMethods.map(method => `- ${method}`).join('
')
')}

## ⚠️ Safety Considerations
${material.usage.safetyConsiderations.map(safety => `- ${safety}`).join('
')
')}

## 📖 Historical Context
**Origin**: ${material.history.origin}
**Era**: ${material.history.era}
**Cultural Context**: ${material.history.culturalContext}
**Famous Practitioners**: ${material.history.famousPractitioners.join(', ')}

## 🎨 Modern Applications
**Contemporary Uses**: ${material.applications.contemporaryUses.join(', ')}
**Sacred Technology**: ${material.applications.sacredTechnologyIntegration.join(', ')}
**Artistic Innovations**: ${material.applications.artisticInnovations.join(', ')}

---
*Material guide generated by Cathedral Design Library*
*${new Date().toISOString()}*
    `;
  }

  /**
   * Get material science data
   */
  public getMaterialScience(materialId: string): string {
    const material = this.materials.get(materialId);
    if (!material) return 'Material not found';

    return `
# 🔬 ${material.name} - Material Science Analysis

## 🧪 Physical Properties
- **Transparency**: ${material.properties.transparency}/1.0
- **Luminosity**: ${material.properties.luminosity}/1.0
- **Durability**: ${material.properties.durability}/1.0
- **Flexibility**: ${material.properties.flexibility}/1.0
- **Refractive Index**: ${material.properties.refractiveIndex}
- **Iridescence**: ${material.properties.iridescence}/1.0

## ⚗️ Chemical Properties
- **Toxicity**: ${material.properties.toxicity}
- **Stability**: ${material.properties.stability}/1.0
- **Reactivity**: ${material.properties.reactivity}/1.0

## 🎨 Artistic Properties
- **Color**: ${material.properties.color || 'N/A'}
- **Luminosity**: ${material.properties.luminosity}/1.0
- **Durability**: ${material.properties.durability}/1.0

## 🔗 Sacred Integration
This material resonates with ${material.correspondences.element} energy
and supports ${material.correspondences.alchemicalStage} alchemical work.

---
*Material science analysis by Cathedral Design Library*
*${new Date().toISOString()}*
    `;
  }
}
