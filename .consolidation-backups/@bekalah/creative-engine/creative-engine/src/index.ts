/**
 * Cathedral Creative Engine - TypeScript Implementation
 * Unified creative generation system for all Cathedral repositories
 */

export interface CodexNode {
  id: number;
  name: string;
  element: string;
  planet?: string;
  zodiac?: string;
  chakra?: string;
  solfeggio: number;
  color: string;
  geometry: string;
  pigment?: string;
  shem?: string;
  goetia?: string;

  // Creative properties
  narrative?: {
    theme: string;
    archetype: string;
    storyBeats: string[];
    dialogueStyle: string;
    keywords: string[];
  };

  gameDesign?: {
    abilityType: string;
    mechanics: string[];
    questType: string;
    rewardStyle: string;
    enemyAffinity?: string;
    environmentEffect?: string;
  };

  architecture?: {
    spatialQuality: string;
    roomType: string;
    lighting: string;
    materials: string[];
    ambience: string;
    symbolPlacement: string;
  };

  symbolism?: {
    primarySymbol: string;
    secondarySymbols: string[];
    geometricPattern: string;
    colorBlending: string;
  };

  harmonics?: {
    perfectConsonance: number[];
    consonance: number[];
    dissonance: number[];
    tritone: number[];
  };
}

export interface HarmonicAnalysis {
  freqRatios: Array<{
    ratio: number;
    simplified: string;
    type: string;
  }>;
  consonanceScore: number;
  relationship: 'Perfect Harmony' | 'Consonant' | 'Balanced' | 'Tension' | 'Dissonant';
  elementalBalance: {
    elements: Record<string, number>;
    dominant: string;
    diversity: number;
    evenness: number;
  };
  geometricCompatibility: {
    types: string[];
    diversity: number;
    platonicCount: number;
  };
  overallHarmony: string;
}

export interface CreativeOutput {
  harmony: HarmonicAnalysis;
  narrative?: {
    title: string;
    themes: string[];
    archetypes: string[];
    structure: string;
    story: {
      opening: string;
      development: string;
      climax: string;
      resolution: string;
    };
    fullText: string;
    keywords: string[];
  };
  game?: {
    questType: string;
    objectives: Array<{
      order: number;
      description: string;
      location: string;
      requirement: string;
    }>;
    encounter: {
      enemyCount: number;
      phases: number;
      phaseTransitions: Array<{
        trigger: string;
        effect: string;
      }>;
      weaknesses: string[];
    };
    mechanics: string[];
    abilities: Array<{
      name: string;
      type: string;
      effect: string;
      cost: number;
      cooldown: string;
      visualEffect: string;
    }>;
    rewards: {
      experience: number;
      items: Array<{
        name: string;
        type: string;
        bonus: string;
      }>;
      unlock: string;
    };
    difficulty: string;
    environmentalHazards: string[];
  };
  architecture?: {
    layout: {
      shape: string;
      description: string;
      dimensions: string;
      height: string;
      stations: Array<{
        position: {
          angle: number;
          x: number;
          y: number;
          z: number;
          description: string;
        };
        node: string;
        feature: string;
      }>;
    };
    lighting: {
      primary: string;
      scheme: string;
      colors: string[];
      quality: string;
      sources: Array<{
        position: string;
        color: string;
        intensity: string;
        effect: string;
      }>;
    };
    materials: {
      primary: string;
      secondary: string;
      accent: string;
      all: string[];
      textures: Array<{
        element: string;
        texture: string;
        pattern: string;
      }>;
    };
    atmosphere: {
      mood: string;
      sounds: string[];
      temperature: string;
      airFlow: string;
      scent: string;
    };
    acoustics: {
      resonance: string;
      reverbTime: string;
      frequencyEmphasis: string;
      recommendation: string;
    };
    symbolPlacement: Array<{
      symbol: string;
      position: any;
      size: string;
      material: string;
      illumination: string;
      orientation: string;
    }>;
  };
  symbol?: {
    fusedSymbol: string;
    colorScheme: {
      original: string[];
      blended: string;
      gradient: string;
      harmonic: string;
    };
    pattern: {
      individual: string[];
      merged: string;
      complexity: string;
    };
    meaning: {
      synthesis: string;
      harmonicMeaning: string;
      usage: string;
    };
    svgCode: string;
  };
}

/**
 * Main Creative Engine Class
 */
export class CreativeEngine {
  private nodes: CodexNode[];
  private harmonic: HarmonicResolver;
  private narrative: NarrativeGenerator;
  private game: GameDesigner;
  private architect: SpatialDesigner;
  private symbolist: SymbolFusion;

  constructor(nodes: CodexNode[]) {
    this.nodes = nodes;
    this.harmonic = new HarmonicResolver();
    this.narrative = new NarrativeGenerator();
    this.game = new GameDesigner();
    this.architect = new SpatialDesigner();
    this.symbolist = new SymbolFusion();
  }

  /**
   * Generate complete creative output from node combination
   */
  combineNodes(nodeIds: number[]): CreativeOutput {
    const nodes = nodeIds.map(id => this.nodes.find(n => n.id === id)).filter(Boolean) as CodexNode[];
    const harmony = this.harmonic.analyzeHarmony(nodes);

    return {
      harmony: harmony,
      narrative: this.narrative.generate(nodes, harmony),
      game: this.game.design(nodes, harmony),
      architecture: this.architect.design(nodes, harmony),
      symbol: this.symbolist.fuse(nodes, harmony)
    };
  }

  /**
   * Generate story from node combination
   */
  generateStory(nodeIds: number[]) {
    return this.combineNodes(nodeIds).narrative!;
  }

  /**
   * Design quest from node combination
   */
  designQuest(nodeIds: number[]) {
    return this.combineNodes(nodeIds).game!;
  }

  /**
   * Design space from node combination
   */
  designSpace(nodeIds: number[]) {
    return this.combineNodes(nodeIds).architecture!;
  }

  /**
   * Fuse symbols from node combination
   */
  fuseSymbols(nodeIds: number[]) {
    return this.combineNodes(nodeIds).symbol!;
  }

  /**
   * Get nodes by IDs
   */
  getNodes(nodeIds: number[]): CodexNode[] {
    return nodeIds.map(id => this.nodes.find(n => n.id === id)).filter(Boolean) as CodexNode[];
  }

  /**
   * Get all nodes
   */
  getAllNodes(): CodexNode[] {
    return this.nodes;
  }
}

/**
 * Harmonic Analysis Engine
 */
export class HarmonicResolver {
  analyzeHarmony(nodes: CodexNode[]): HarmonicAnalysis {
    const freqs = nodes.map(n => n.solfeggio);
    const ratios = this.calculateRatios(freqs);
    const consonance = this.measureConsonance(ratios);
    const elements = this.elementalBalance(nodes);

    return {
      freqRatios: ratios,
      consonanceScore: consonance,
      relationship: this.classifyRelationship(consonance),
      elementalBalance: elements,
      geometricCompatibility: this.geometryCheck(nodes),
      overallHarmony: this.calculateOverallHarmony(consonance, elements)
    };
  }

  private calculateRatios(frequencies: number[]) {
    const ratios = [];
    for (let i = 0; i < frequencies.length; i++) {
      for (let j = i + 1; j < frequencies.length; j++) {
        const ratio = frequencies[j] / frequencies[i];
        ratios.push({
          ratio: ratio,
          simplified: this.simplifyRatio(ratio),
          type: this.ratioType(ratio)
        });
      }
    }
    return ratios;
  }

  private simplifyRatio(decimal: number): string {
    const tolerance = 0.01;
    for (let denominator = 1; denominator <= 12; denominator++) {
      for (let numerator = 1; numerator <= 24; numerator++) {
        if (Math.abs(numerator / denominator - decimal) < tolerance) {
          return `${numerator}/${denominator}`;
        }
      }
    }
    return decimal.toFixed(3);
  }

  private ratioType(ratio: number): string {
    if (Math.abs(ratio - 1.0) < 0.01) return 'Unison';
    if (Math.abs(ratio - 2.0) < 0.01) return 'Octave';
    if (Math.abs(ratio - 1.5) < 0.01) return 'Perfect Fifth';
    if (Math.abs(ratio - 1.333) < 0.01) return 'Perfect Fourth';
    if (Math.abs(ratio - 1.25) < 0.01) return 'Major Third';
    if (Math.abs(ratio - 1.6) < 0.01) return 'Minor Sixth';
    if (Math.abs(ratio - 1.414) < 0.1) return 'Tritone (Tension)';
    return 'Complex';
  }

  private measureConsonance(ratios: any[]): number {
    let score = 0;
    ratios.forEach((r: any) => {
      if (r.type === 'Unison' || r.type === 'Octave') score += 10;
      else if (r.type === 'Perfect Fifth') score += 9;
      else if (r.type === 'Perfect Fourth') score += 8;
      else if (r.type === 'Major Third') score += 7;
      else if (r.type === 'Minor Sixth') score += 6;
      else if (r.type === 'Tritone (Tension)') score += 3;
      else score += 4;
    });
    return score / ratios.length;
  }

  private classifyRelationship(score: number): 'Perfect Harmony' | 'Consonant' | 'Balanced' | 'Tension' | 'Dissonant' {
    if (score >= 9) return 'Perfect Harmony';
    if (score >= 7.5) return 'Consonant';
    if (score >= 6) return 'Balanced';
    if (score >= 4) return 'Tension';
    return 'Dissonant';
  }

  private elementalBalance(nodes: CodexNode[]) {
    const elements: Record<string, number> = {};
    nodes.forEach(n => {
      elements[n.element] = (elements[n.element] || 0) + 1;
    });

    const total = nodes.length;
    const balance = {
      elements: elements,
      dominant: Object.keys(elements).reduce((a, b) =>
        elements[a] > elements[b] ? a : b),
      diversity: Object.keys(elements).length / 5,
      evenness: 1 - (Math.max(...Object.values(elements)) / total - 0.2) * 5
    };

    return balance;
  }

  private geometryCheck(nodes: CodexNode[]) {
    const geometries = nodes.map(n => n.geometry);
    const unique = [...new Set(geometries)];

    return {
      types: unique,
      diversity: unique.length / nodes.length,
      platonicCount: unique.filter(g =>
        ['Tetrahedron', 'Cube', 'Octahedron', 'Dodecahedron', 'Icosahedron']
        .includes(g)).length
    };
  }

  private calculateOverallHarmony(consonance: number, elements: any): string {
    return (consonance * 0.6 + elements.evenness * 10 * 0.4).toFixed(2);
  }
}

/**
 * Narrative Generation Engine
 */
export class NarrativeGenerator {
  generate(nodes: CodexNode[], harmony: HarmonicAnalysis) {
    const themes = nodes.map(n => n.narrative?.theme).filter((theme): theme is string => Boolean(theme));
    const archetypes = nodes.map(n => n.narrative?.archetype).filter((archetype): archetype is string => Boolean(archetype));
    const keywords = nodes.flatMap(n => n.narrative?.keywords || []);

    const structure = this.selectStructure(harmony.relationship);
    const title = this.generateTitle(themes, keywords);
    const opening = this.generateOpening(nodes[0], harmony);
    const development = this.generateDevelopment(nodes, harmony);
    const climax = this.generateClimax(nodes, harmony);
    const resolution = this.generateResolution(nodes, harmony);

    return {
      title: title,
      themes: themes,
      archetypes: archetypes,
      structure: structure,
      story: {
        opening: opening,
        development: development,
        climax: climax,
        resolution: resolution
      },
      fullText: this.assembleStory(opening, development, climax, resolution),
      keywords: keywords
    };
  }

  private selectStructure(relationship: string): string {
    const structures: Record<string, string> = {
      'Perfect Harmony': 'Hero\'s Journey (Classic)',
      'Consonant': 'Three-Act Structure',
      'Balanced': 'Five-Act (Freytag\'s Pyramid)',
      'Tension': 'Conflict-Resolution Arc',
      'Dissonant': 'Tragedy or Dark Journey'
    };
    return structures[relationship] || 'Experimental Structure';
  }

  private generateTitle(themes: string[], keywords: string[]): string {
    const titlePatterns = [
      `The ${keywords[0]} of ${keywords[1]}`,
      `${themes[0]}: A Tale of ${themes[1] || 'Mystery'}`,
      `Beyond the ${keywords[2] || 'Veil'}`
    ];
    return titlePatterns[Math.floor(Math.random() * titlePatterns.length)];
  }

  private generateOpening(firstNode: CodexNode, harmony: HarmonicAnalysis): string {
    const theme = firstNode.narrative?.theme || 'Mystery';
    const archetype = firstNode.narrative?.archetype || 'The Seeker';
    const setting = firstNode.architecture?.roomType || 'ancient chamber';

    return `In the depths of a ${setting}, where ${theme.toLowerCase()} whispers through stone, ${archetype} begins their journey. The air hums with a frequency of ${firstNode.solfeggio} Hz, resonating with ${harmony.relationship.toLowerCase()} energy.`;
  }

  private generateDevelopment(nodes: CodexNode[], harmony: HarmonicAnalysis): string {
    const beats = nodes.flatMap(n => n.narrative?.storyBeats || []);
    const selected = beats.slice(0, 3);

    return selected.map((beat, i) =>
      `${i === 0 ? 'First' : i === 1 ? 'Then' : 'Finally'}, ${beat.toLowerCase()}.`
    ).join(' ');
  }

  private generateClimax(nodes: CodexNode[], harmony: HarmonicAnalysis): string {
    const finalNode = nodes[nodes.length - 1];
    const tension = harmony.consonanceScore < 6 ? 'chaotic' : 'harmonious';

    return `At the moment of truth, all forces converge in ${tension} unity. ${finalNode.narrative?.storyBeats?.[0] || 'The path becomes clear'}.`;
  }

  private generateResolution(nodes: CodexNode[], harmony: HarmonicAnalysis): string {
    const resolution = harmony.relationship === 'Perfect Harmony'
      ? 'finds peace and understanding'
      : harmony.relationship === 'Dissonant'
      ? 'embraces the necessary discord'
      : 'achieves hard-won balance';

    return `The seeker ${resolution}, forever changed by the journey through ${nodes.length} sacred stations.`;
  }

  private assembleStory(opening: string, development: string, climax: string, resolution: string): string {
    return `${opening}\n\n${development}\n\n${climax}\n\n${resolution}`;
  }
}

/**
 * Game Design Engine
 */
export class GameDesigner {
  design(nodes: CodexNode[], harmony: HarmonicAnalysis) {
    const mechanics = nodes.flatMap(n => n.gameDesign?.mechanics || []);
    const questType = this.determineQuestType(nodes, harmony);
    const encounter = this.designEncounter(nodes, harmony);
    const rewards = this.generateRewards(nodes);
    const abilities = this.createAbilities(nodes, harmony);

    return {
      questType: questType,
      objectives: this.generateObjectives(nodes, questType),
      encounter: encounter,
      mechanics: [...new Set(mechanics)],
      abilities: abilities,
      rewards: rewards,
      difficulty: this.calculateDifficulty(harmony),
      environmentalHazards: this.createHazards(nodes)
    };
  }

  private determineQuestType(nodes: CodexNode[], harmony: HarmonicAnalysis): string {
    const types = nodes.map(n => n.gameDesign?.questType);
    const dominant = types.reduce((a, b, i, arr) =>
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
    );

    if (harmony.relationship === 'Dissonant') return 'Boss Fight';
    if (harmony.relationship === 'Tension') return 'Survival Challenge';
    return dominant || 'Exploration';
  }

  private generateObjectives(nodes: CodexNode[], questType: string) {
    return nodes.map((node, i) => {
      const action = questType === 'Boss Fight' ? 'Defeat' :
                    questType === 'Survival Challenge' ? 'Survive' :
                    'Discover';
      return {
        order: i + 1,
        description: `${action} the ${node.narrative?.archetype || 'guardian'} of ${node.name}`,
        location: node.architecture?.roomType || 'sacred chamber',
        requirement: node.gameDesign?.environmentEffect || 'none'
      };
    });
  }

  private designEncounter(nodes: CodexNode[], harmony: HarmonicAnalysis) {
    const enemyCount = Math.floor(nodes.length * harmony.elementalBalance.diversity * 3);
    const phases = Math.ceil(nodes.length / 2);

    return {
      enemyCount: enemyCount,
      phases: phases,
      phaseTransitions: nodes.map(n => ({
        trigger: `${n.element} threshold reached`,
        effect: n.gameDesign?.environmentEffect || 'Environmental change'
      })),
      weaknesses: nodes.map(n => n.gameDesign?.enemyAffinity).filter(Boolean)
    };
  }

  private createAbilities(nodes: CodexNode[], harmony: HarmonicAnalysis) {
    return nodes.map(node => ({
      name: `${node.name} Invocation`,
      type: node.gameDesign?.abilityType || 'Passive',
      effect: node.gameDesign?.mechanics?.[0] || 'Unknown effect',
      cost: Math.floor(node.solfeggio / 10),
      cooldown: harmony.consonanceScore < 6 ? 'Long' : 'Medium',
      visualEffect: `${node.color} ${node.symbolism?.primarySymbol || 'glyph'}`
    }));
  }

  private generateRewards(nodes: CodexNode[]) {
    return {
      experience: nodes.reduce((sum, n) => sum + n.solfeggio, 0),
      items: nodes.map(n => ({
        name: `${n.element} Relic`,
        type: n.gameDesign?.rewardStyle || 'Artifact',
        bonus: `+${n.id % 10} to ${n.element} affinity`
      })),
      unlock: `${nodes[nodes.length - 1]?.name} Path`
    };
  }

  private calculateDifficulty(harmony: HarmonicAnalysis): string {
    const score = parseFloat(harmony.overallHarmony);
    if (score < 5) return 'Nightmare';
    if (score < 6.5) return 'Hard';
    if (score < 8) return 'Medium';
    return 'Easy';
  }

  private createHazards(nodes: CodexNode[]): string[] {
    return nodes.map(n => n.gameDesign?.environmentEffect).filter(Boolean) as string[];
  }
}

/**
 * Spatial Architecture Designer
 */
export class SpatialDesigner {
  design(nodes: CodexNode[], harmony: HarmonicAnalysis) {
    const layout = this.generateLayout(nodes, harmony);
    const lighting = this.designLighting(nodes);
    const materials = this.selectMaterials(nodes);
    const atmosphere = this.createAtmosphere(nodes, harmony);

    return {
      layout: layout,
      lighting: lighting,
      materials: materials,
      atmosphere: atmosphere,
      acoustics: this.designAcoustics(harmony),
      symbolPlacement: this.placeSymbols(nodes, layout)
    };
  }

  private generateLayout(nodes: CodexNode[], harmony: HarmonicAnalysis) {
    const geometry = harmony.geometricCompatibility.types[0] || 'Organic';
    const nodeCount = nodes.length;

    const layouts: Record<string, string> = {
      'Tetrahedron': 'Pyramidal chamber with apex altar',
      'Cube': 'Square room with four cardinal stations',
      'Octahedron': 'Double pyramid meeting at center',
      'Dodecahedron': 'Twelve-sided chamber with pentagonal floor',
      'Icosahedron': 'Twenty-faced dome with triangular panels',
      'Organic': 'Flowing, non-Euclidean space'
    };

    return {
      shape: geometry,
      description: layouts[geometry] || layouts['Organic'],
      dimensions: `${nodeCount * 3}m diameter`,
      height: `${nodeCount * 2}m ceiling`,
      stations: nodes.map((n, i) => ({
        position: this.calculatePosition(i, nodeCount, geometry),
        node: n.name,
        feature: n.architecture?.roomType || 'Altar'
      }))
    };
  }

  private calculatePosition(index: number, total: number, geometry: string) {
    const angle = (index / total) * 360;
    const radius = 5;

    return {
      angle: angle,
      x: Math.cos(angle * Math.PI / 180) * radius,
      y: 0,
      z: Math.sin(angle * Math.PI / 180) * radius,
      description: `${angle}° around ${geometry} center`
    };
  }

  private designLighting(nodes: CodexNode[]) {
    const colors = nodes.map(n => n.color);
    const qualities = nodes.map(n => n.architecture?.lighting).filter(Boolean);

    return {
      primary: colors[0],
      scheme: 'Gradient blend',
      colors: colors,
      quality: qualities[0] || 'Ethereal, shifting',
      sources: nodes.map(n => ({
        position: n.name,
        color: n.color,
        intensity: (n.solfeggio / 1000).toFixed(2),
        effect: n.architecture?.lighting || 'Steady glow'
      }))
    };
  }

  private selectMaterials(nodes: CodexNode[]) {
    const allMaterials = nodes.flatMap(n => n.architecture?.materials || []);
    const unique = [...new Set(allMaterials)];

    return {
      primary: unique[0] || 'Stone',
      secondary: unique[1] || 'Wood',
      accent: unique[2] || 'Crystal',
      all: unique,
      textures: this.generateTextures(nodes)
    };
  }

  private generateTextures(nodes: CodexNode[]) {
    return nodes.map(n => ({
      element: n.element,
      texture: this.elementToTexture(n.element),
      pattern: n.symbolism?.geometricPattern || 'Smooth'
    }));
  }

  private elementToTexture(element: string): string {
    const textures: Record<string, string> = {
      'Fire': 'Rough, heat-marked, ash-dusted',
      'Water': 'Smooth, reflective, rippled',
      'Earth': 'Coarse, mineral-veined, crystalline',
      'Air': 'Polished, light-catching, ethereal',
      'Aether': 'Otherworldly, semi-transparent, shimmering'
    };
    return textures[element] || 'Neutral stone';
  }

  private createAtmosphere(nodes: CodexNode[], harmony: HarmonicAnalysis) {
    const ambiences = nodes.map(n => n.architecture?.ambience).filter(Boolean);
    const mood = harmony.relationship === 'Perfect Harmony' ? 'Peaceful, sacred' :
                 harmony.relationship === 'Dissonant' ? 'Tense, foreboding' :
                 'Mysterious, contemplative';

    return {
      mood: mood,
      sounds: ambiences,
      temperature: this.calculateTemperature(nodes),
      airFlow: harmony.elementalBalance.elements.Air ? 'Breezy, circulating' : 'Still, heavy',
      scent: this.determineScent(nodes)
    };
  }

  private calculateTemperature(nodes: CodexNode[]): string {
    const fire = nodes.filter(n => n.element === 'Fire').length;
    const water = nodes.filter(n => n.element === 'Water').length;

    if (fire > water * 1.5) return 'Warm to hot';
    if (water > fire * 1.5) return 'Cool to cold';
    return 'Temperate';
  }

  private determineScent(nodes: CodexNode[]): string {
    const scents: Record<string, string> = {
      'Fire': 'Smoke, burning cedar',
      'Water': 'Misty, aquatic, clean',
      'Earth': 'Loam, minerals, sage',
      'Air': 'Fresh, ionized, crisp',
      'Aether': 'Incense, otherworldly fragrance'
    };
    const dominant = nodes[0]?.element;
    return scents[dominant] || 'Neutral, clean air';
  }

  private designAcoustics(harmony: HarmonicAnalysis) {
    return {
      resonance: harmony.relationship,
      reverbTime: harmony.consonanceScore > 7 ? 'Long, cathedral-like' : 'Short, focused',
      frequencyEmphasis: `${harmony.freqRatios[0]?.type || 'Balanced'} intervals enhanced`,
      recommendation: harmony.consonanceScore > 8 ? 'Perfect for chanting' : 'Good for meditation'
    };
  }

  private placeSymbols(nodes: CodexNode[], layout: any) {
    return nodes.map((node, i) => ({
      symbol: node.symbolism?.primarySymbol || '◯',
      position: layout.stations[i].position,
      size: `${node.id % 5 + 1}m`,
      material: 'Carved into ' + (node.architecture?.materials?.[0] || 'stone'),
      illumination: `Lit with ${node.color} light`,
      orientation: node.architecture?.symbolPlacement || 'Facing center'
    }));
  }
}

/**
 * Symbol Fusion Engine
 */
export class SymbolFusion {
  fuse(nodes: CodexNode[], harmony: HarmonicAnalysis) {
    const symbols = nodes.map(n => n.symbolism?.primarySymbol).filter(Boolean);
    const colors = nodes.map(n => n.color);
    const patterns = nodes.map(n => n.symbolism?.geometricPattern).filter(Boolean);

    return {
      fusedSymbol: this.createFusedSymbol(symbols, harmony),
      colorScheme: this.blendColors(colors, harmony),
      pattern: this.mergePatterns(patterns),
      meaning: this.interpretFusion(nodes, harmony),
      svgCode: this.generateSVG(nodes, harmony)
    };
  }

  private createFusedSymbol(symbols: string[], harmony: HarmonicAnalysis): string {
    const relationship = harmony.relationship;

    if (relationship === 'Perfect Harmony') {
      return `⟨${symbols.join('')}⟩ (Unified Mandala)`;
    } else if (relationship === 'Dissonant') {
      return `⟨${symbols.join('⚡')}⟩ (Conflicting Duality)`;
    } else {
      return `⟨${symbols.join('∴')}⟩ (Balanced Triad)`;
    }
  }

  private blendColors(colors: string[], harmony: HarmonicAnalysis) {
    const rgbs = colors.map(c => this.hexToRgb(c));
    const avg = {
      r: Math.floor(rgbs.reduce((s, c) => s + c.r, 0) / rgbs.length),
      g: Math.floor(rgbs.reduce((s, c) => s + c.g, 0) / rgbs.length),
      b: Math.floor(rgbs.reduce((s, c) => s + c.b, 0) / rgbs.length)
    };

    const blended = this.rgbToHex(avg.r, avg.g, avg.b);

    return {
      original: colors,
      blended: blended,
      gradient: `linear-gradient(${colors.join(', ')})`,
      harmonic: harmony.relationship === 'Perfect Harmony' ? 'Seamless transition' : 'Vibrant contrast'
    };
  }

  private hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  private mergePatterns(patterns: string[]) {
    const unique = [...new Set(patterns)];
    return {
      individual: unique,
      merged: unique.join(' interwoven with '),
      complexity: unique.length > 2 ? 'Highly intricate' : 'Clean, focused'
    };
  }

  private interpretFusion(nodes: CodexNode[], harmony: HarmonicAnalysis) {
    const themes = nodes.map(n => n.narrative?.theme).join(', ');
    return {
      synthesis: `The fusion of ${nodes.length} archetypes creates: ${themes}`,
      harmonicMeaning: `This ${harmony.relationship.toLowerCase()} combination suggests ${this.getHarmonicMessage(harmony.relationship)}`,
      usage: `Use for ${this.suggestUsage(harmony)}`
    };
  }

  private getHarmonicMessage(relationship: string): string {
    const messages: Record<string, string> = {
      'Perfect Harmony': 'divine unity and transcendent synthesis',
      'Consonant': 'cooperative balance and mutual enhancement',
      'Balanced': 'dynamic equilibrium and creative tension',
      'Tension': 'transformative conflict and necessary opposition',
      'Dissonant': 'revolutionary change and breaking of boundaries'
    };
    return messages[relationship] || 'mysterious significance';
  }

  private suggestUsage(harmony: HarmonicAnalysis): string {
    const score = parseFloat(harmony.overallHarmony);
    if (score > 8) return 'Healing rituals, meditation, sacred ceremonies';
    if (score > 6) return 'Creative work, problem-solving, balanced manifestation';
    if (score > 4) return 'Shadow work, transformation, challenging growth';
    return 'Alchemical transmutation, boundary dissolution';
  }

  private generateSVG(nodes: CodexNode[], harmony: HarmonicAnalysis): string {
    const symbols = nodes.map(n => n.symbolism?.primarySymbol || '◯');
    const colors = nodes.map(n => n.color);

    return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fusion-gradient">
      ${colors.map((c, i) => `<stop offset="${i / colors.length * 100}%" stop-color="${c}" />`).join('\n      ')}
    </radialGradient>
  </defs>
  <circle cx="100" cy="100" r="80" fill="url(#fusion-gradient)" opacity="0.8"/>
  <text x="100" y="110" text-anchor="middle" font-size="48" fill="white">
    ${symbols.join('')}
  </text>
</svg>`;
  }
}

/**
 * Factory function to create creative engine from codex data
 */
export function createCreativeEngine(codexData: any): CreativeEngine {
  return new CreativeEngine(codexData.nodes || []);
}

/**
 * Utility function to load codex data
 */
export async function loadCodexData(): Promise<CodexNode[]> {
  try {
    const response = await fetch('data/codex-144-expanded.json');
    const data = await response.json();
    return data.nodes || [];
  } catch (error) {
    console.error('Failed to load codex data:', error);
    return [];
  }
}
