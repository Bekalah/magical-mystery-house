/**
 * ⚗️ Mystery House Unified - All Traditions Connected
 * 
 * Cross-engineered system combining:
 * - Jodorowsky Psychomagic
 * - Antero Alli Angel Tech
 * - Soyga (Planetary Magic)
 * - I Ching (64 Hexagrams)
 * - Kabbalah (Tree of Life)
 * - Evolutionary Astrology
 * - Solfeggio Frequencies
 * - Fractal Mathematics
 * - Fusion Kink (78-card Tarot)
 * 
 * All unified into Codex 144:99 structure
 * 
 * @license CC0-1.0 - Public Domain
 */

import { Codex144Engine, CodexNode } from '../../codex-144-99-core/src/Codex144Engine';
import { MysteryRoom, RoomFeature, RoomCorrespondences } from './MysteryHouseEngine';

export interface UnifiedPuzzle {
  id: string;
  type: 'soyga' | 'iching' | 'kabbalah' | 'astrology' | 'solfeggio' | 'fractal' | 'fusion_kink';
  name: string;
  description: string;
  psychomagic: string;
  angel_tech: string;
  codex_connection: {
    node?: number;
    depth?: number;
    gate?: number;
    arcana?: number;
  };
  solution: string;
  canon: string[];
}

export interface UnifiedArt {
  id: string;
  tradition: string;
  name: string;
  masters: string[];
  techniques: string[];
  psychomagic: string;
  angel_tech: string;
  codex_connection: {
    node?: number;
    depth?: number;
    gate?: number;
  };
}

export interface UnifiedScience {
  id: string;
  tradition: string;
  name: string;
  scientists: string[];
  discoveries: string[];
  psychomagic: string;
  angel_tech: string;
  codex_connection: {
    node?: number;
    depth?: number;
    gate?: number;
  };
}

export interface UnifiedCanon {
  id: string;
  tradition: string;
  sources: string[];
  texts: string[];
  psychomagic: string;
  angel_tech: string;
  codex_connection: {
    node?: number;
    depth?: number;
    gate?: number;
  };
}

export interface UnifiedMysteryRoom extends MysteryRoom {
  puzzles: UnifiedPuzzle[];
  art: UnifiedArt[];
  science: UnifiedScience[];
  canon: UnifiedCanon[];
  psychomagic_ritual: string;
  angel_tech_connection: string;
  all_systems_connected: {
    soyga: { table?: number; planetary?: string };
    iching: { hexagram?: number; changing_lines?: number[] };
    kabbalah: { sephirah?: number; path?: number };
    astrology: { planetary_node?: string; evolution?: number };
    solfeggio: { frequency?: number; hz?: number };
    fractal: { iteration?: number; pattern?: string };
    fusion_kink: { card?: number; arcana?: number };
  };
}

export class MysteryHouseUnified {
  private codex: Codex144Engine;
  private rooms: Map<number, UnifiedMysteryRoom>;

  constructor() {
    this.codex = new Codex144Engine();
    this.rooms = new Map();
    this.initializeUnifiedRooms();
  }

  private initializeUnifiedRooms(): void {
    // Initialize all 99 rooms with unified connections
    for (let roomNum = 1; roomNum <= 99; roomNum++) {
      const node = this.getNodeForRoom(roomNum);
      const depth = roomNum - 1; // 0-98
      
      const unifiedRoom: UnifiedMysteryRoom = {
        roomNumber: roomNum,
        name: this.generateUnifiedRoomName(roomNum, node),
        theme: this.generateUnifiedTheme(roomNum, node),
        description: this.generateUnifiedDescription(roomNum, node),
        type: this.determineType(roomNum),
        tier: this.determineTier(roomNum),
        features: this.generateUnifiedFeatures(roomNum),
        correspondences: this.generateUnifiedCorrespondences(roomNum, node),
        arcanaConnections: node ? [node.consciousnessLevel] : [],
        gateConnections: [roomNum],
        nodeConnections: node ? [node.nodeIndex] : [],
        chapelConnections: this.calculateChapelConnections(roomNum),
        research: [],
        art: [],
        science: [],
        pathworking: [],
        connections: this.calculateRoomConnections(roomNum),
        puzzles: this.generateUnifiedPuzzles(roomNum, node, depth),
        canon: this.generateUnifiedCanon(roomNum, node, depth),
        psychomagic_ritual: this.generatePsychomagicRitual(roomNum, node),
        angel_tech_connection: this.generateAngelTechConnection(roomNum, node),
        all_systems_connected: this.generateAllSystemsConnection(roomNum, node, depth)
      };

      // Add art and science
      unifiedRoom.art = this.generateUnifiedArt(roomNum, node, depth);
      unifiedRoom.science = this.generateUnifiedScience(roomNum, node, depth);

      this.rooms.set(roomNum, unifiedRoom);
    }
  }

  private getNodeForRoom(roomNum: number): CodexNode | null {
    const nodes = this.codex.getNodesForRoom(roomNum);
    return nodes[0] || null;
  }

  private generateUnifiedRoomName(roomNum: number, node: CodexNode | null): string {
    if (!node) return `Unified Room ${roomNum}`;
    
    const arcanaNames = [
      'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
      'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
      'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
      'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'
    ];
    
    const arcanaName = arcanaNames[node.consciousnessLevel] || 'Unknown';
    return `${arcanaName} Ritual Angel - Room ${roomNum}`;
  }

  private generateUnifiedTheme(roomNum: number, node: CodexNode | null): string {
    const themes = [
      'Psychomagic Angel Tech',
      'Unified Tradition',
      'Cross-Engineered Beauty',
      'All Systems Connected'
    ];
    return themes[roomNum % themes.length];
  }

  private generateUnifiedDescription(roomNum: number, node: CodexNode | null): string {
    if (!node) return `Unified Room ${roomNum} - All traditions connected through psychomagic and angel tech.`;
    
    return `Room ${roomNum} - ${node.name} through psychomagic and angel tech. All systems unified: Soyga, I Ching, Kabbalah, Evolutionary Astrology, Solfeggio, Fractal Math, Fusion Kink.`;
  }

  private determineType(roomNum: number): 'library' | 'laboratory' | 'studio' | 'chamber' | 'hall' | 'garden' | 'temple' {
    const types: Array<'library' | 'laboratory' | 'studio' | 'chamber' | 'hall' | 'garden' | 'temple'> = 
      ['library', 'laboratory', 'studio', 'chamber', 'hall', 'garden', 'temple'];
    return types[(roomNum - 1) % types.length];
  }

  private determineTier(roomNum: number): 'Foundation' | 'Growth' | 'Integration' | 'Harmonic' | 'Spiral' {
    if (roomNum <= 11) return 'Foundation';
    if (roomNum <= 22) return 'Growth';
    if (roomNum <= 33) return 'Integration';
    if (roomNum <= 66) return 'Harmonic';
    return 'Spiral';
  }

  private generateUnifiedFeatures(roomNum: number): RoomFeature[] {
    return [
      {
        id: `room-${roomNum}-unified-exploration`,
        name: 'Unified System Exploration',
        type: 'exploration',
        description: `Explore all unified systems: Soyga, I Ching, Kabbalah, Astrology, Solfeggio, Fractal, Fusion Kink`,
        connections: [`room-${roomNum}`]
      },
      {
        id: `room-${roomNum}-psychomagic-ritual`,
        name: 'Psychomagic Ritual',
        type: 'interactive',
        description: `Perform psychomagic ritual connecting all systems`,
        connections: [`room-${roomNum}`]
      },
      {
        id: `room-${roomNum}-angel-tech`,
        name: 'Angel Tech Connection',
        type: 'interactive',
        description: `Connect through angel tech to all unified systems`,
        connections: [`room-${roomNum}`]
      }
    ];
  }

  private generateUnifiedCorrespondences(roomNum: number, node: CodexNode | null): RoomCorrespondences {
    const elements = ['Fire', 'Water', 'Air', 'Earth', 'Spirit'];
    const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
    
    return {
      element: elements[roomNum % elements.length],
      planet: planets[roomNum % planets.length],
      soyga: `Table ${(roomNum % 36) + 1}`,
      iching: `Hexagram ${(roomNum % 64) + 1}`,
      kabbalah: node ? `Sephirah ${(node.consciousnessLevel % 10) + 1}` : undefined
    };
  }

  private calculateChapelConnections(roomNum: number): number[] {
    return [((roomNum - 1) % 8) + 1];
  }

  private calculateRoomConnections(roomNum: number): number[] {
    const connections: number[] = [];
    if (roomNum > 1) connections.push(roomNum - 1);
    if (roomNum < 99) connections.push(roomNum + 1);
    return connections.slice(0, 5);
  }

  private generateUnifiedPuzzles(roomNum: number, node: CodexNode | null, depth: number): UnifiedPuzzle[] {
    const puzzles: UnifiedPuzzle[] = [];

    // Soyga Puzzle
    puzzles.push({
      id: `room-${roomNum}-soyga-puzzle`,
      type: 'soyga',
      name: 'Soyga Planetary Puzzle',
      description: `Solve Soyga planetary magic table ${(roomNum % 36) + 1} to unlock room features`,
      psychomagic: 'Soyga Ritual Angel',
      angel_tech: 'Planetary Angel',
      codex_connection: {
        node: node?.nodeIndex,
        gate: roomNum,
        arcana: node?.consciousnessLevel
      },
      solution: `Navigate planetary correspondences through Codex node ${node?.nodeIndex || 'N/A'}`,
      canon: ['Soyga tables (John Dee)', 'Planetary magic correspondences', 'Magic square systems']
    });

    // I Ching Puzzle
    puzzles.push({
      id: `room-${roomNum}-iching-puzzle`,
      type: 'iching',
      name: 'I Ching Hexagram Puzzle',
      description: `Consult I Ching hexagram ${(roomNum % 64) + 1} to navigate room challenges`,
      psychomagic: 'I Ching Ritual Angel',
      angel_tech: 'Change Angel',
      codex_connection: {
        node: node?.nodeIndex,
        gate: roomNum,
        arcana: node?.consciousnessLevel
      },
      solution: `Use hexagram ${(roomNum % 64) + 1} correspondences through Codex node ${node?.nodeIndex || 'N/A'}`,
      canon: ['I Ching - Book of Changes', '64 hexagrams', 'Yin-Yang philosophy', 'Change mathematics']
    });

    // Kabbalah Puzzle
    puzzles.push({
      id: `room-${roomNum}-kabbalah-puzzle`,
      type: 'kabbalah',
      name: 'Tree of Life Pathworking Puzzle',
      description: `Pathwork through Tree of Life to unlock room features`,
      psychomagic: 'Qabalistic Ritual Angel',
      angel_tech: 'Tree of Life Angel',
      codex_connection: {
        node: node?.nodeIndex,
        gate: roomNum,
        arcana: node?.consciousnessLevel
      },
      solution: `Navigate Tree of Life through Codex gate ${roomNum} and arcana ${node?.consciousnessLevel || 'N/A'}`,
      canon: ['Tree of Life (Kabbalah)', '10 Sephiroth', '22 Paths of Wisdom', 'Gematria']
    });

    // Evolutionary Astrology Puzzle
    puzzles.push({
      id: `room-${roomNum}-astrology-puzzle`,
      type: 'astrology',
      name: 'Evolutionary Astrology Puzzle',
      description: `Navigate soul evolution through planetary nodes`,
      psychomagic: 'Astrological Ritual Angel',
      angel_tech: 'Soul Evolution Angel',
      codex_connection: {
        node: node?.nodeIndex,
        depth: depth,
        arcana: node?.consciousnessLevel
      },
      solution: `Map soul evolution through Codex consciousness level ${node?.consciousnessLevel || 'N/A'}`,
      canon: ['Evolutionary Astrology (Jeffrey Wolf Green)', 'Soul evolution', 'Planetary nodes', 'Evolutionary cycles']
    });

    // Solfeggio Puzzle
    puzzles.push({
      id: `room-${roomNum}-solfeggio-puzzle`,
      type: 'solfeggio',
      name: 'Solfeggio Frequency Puzzle',
      description: `Tune to sacred frequency to unlock room features`,
      psychomagic: 'Frequency Ritual Angel',
      angel_tech: 'Sound Angel',
      codex_connection: {
        node: node?.nodeIndex,
        depth: depth
      },
      solution: `Tune to frequency ${node?.frequency || 'N/A'} Hz through Codex node ${node?.nodeIndex || 'N/A'}`,
      canon: ['Solfeggio Frequencies', '9 sacred tones: 174, 285, 396, 417, 528, 639, 741, 852, 963 Hz', 'Cymatics']
    });

    // Fractal Puzzle
    puzzles.push({
      id: `room-${roomNum}-fractal-puzzle`,
      type: 'fractal',
      name: 'Fractal Mathematics Puzzle',
      description: `Navigate fractal patterns to unlock room geometry`,
      psychomagic: 'Fractal Ritual Angel',
      angel_tech: 'Pattern Angel',
      codex_connection: {
        node: node?.nodeIndex,
        depth: depth
      },
      solution: `Navigate fractal iteration ${depth} through Codex node ${node?.nodeIndex || 'N/A'}`,
      canon: ['Mandelbrot set (Benoit Mandelbrot)', 'Julia sets', 'Fractal geometry', 'Chaos theory']
    });

    // Fusion Kink Puzzle
    puzzles.push({
      id: `room-${roomNum}-fusion-kink-puzzle`,
      type: 'fusion_kink',
      name: 'Fusion Kink Tarot Puzzle',
      description: `Read tarot card to unlock room correspondences`,
      psychomagic: 'Fusion Ritual Angel',
      angel_tech: 'Rebis Angel',
      codex_connection: {
        node: node?.nodeIndex,
        arcana: node?.consciousnessLevel
      },
      solution: `Read tarot arcana ${node?.consciousnessLevel || 'N/A'} through Codex node ${node?.nodeIndex || 'N/A'}`,
      canon: ['Fusion Kink - 78-card tarot system', 'Major Arcana (22)', 'Minor Arcana (56)', 'Rebis (unified opposites)']
    });

    return puzzles;
  }

  private generateUnifiedArt(roomNum: number, node: CodexNode | null, depth: number): UnifiedArt[] {
    return [
      {
        id: `room-${roomNum}-soyga-art`,
        tradition: 'Planetary Magic Art',
        name: 'Soyga Planetary Art',
        masters: ['John Dee', 'Edward Kelley', 'Planetary talismans'],
        techniques: ['Planetary symbols', 'Magic squares', 'Talismanic art'],
        psychomagic: 'Soyga Ritual Angel',
        angel_tech: 'Planetary Angel',
        codex_connection: { node: node?.nodeIndex, gate: roomNum }
      },
      {
        id: `room-${roomNum}-iching-art`,
        tradition: 'I Ching Visual Art',
        name: 'I Ching Hexagram Art',
        masters: ['Chinese calligraphy', 'Hexagram visualization', 'Change art'],
        techniques: ['Hexagram patterns', 'Yin-Yang balance', 'Change visualization'],
        psychomagic: 'I Ching Ritual Angel',
        angel_tech: 'Change Angel',
        codex_connection: { node: node?.nodeIndex, gate: roomNum }
      },
      {
        id: `room-${roomNum}-kabbalah-art`,
        tradition: 'Qabalistic Art',
        name: 'Tree of Life Art',
        masters: ['Tree of Life art', 'Sephirotic visualization', 'Path art'],
        techniques: ['Tree of Life diagrams', 'Sephirotic colors', 'Path visualization'],
        psychomagic: 'Qabalistic Ritual Angel',
        angel_tech: 'Tree of Life Angel',
        codex_connection: { node: node?.nodeIndex, gate: roomNum }
      },
      {
        id: `room-${roomNum}-fractal-art`,
        tradition: 'Fractal Mathematics Art',
        name: 'Fractal Pattern Art',
        masters: ['Mandelbrot art', 'Julia set art', 'Fractal geometry'],
        techniques: ['Fractal rendering', 'Sacred geometry', 'Pattern art'],
        psychomagic: 'Fractal Ritual Angel',
        angel_tech: 'Pattern Angel',
        codex_connection: { node: node?.nodeIndex, depth: depth }
      },
      {
        id: `room-${roomNum}-fusion-kink-art`,
        tradition: 'Fusion Kink Tarot Art',
        name: 'Tarot Arcana Art',
        masters: ['Tarot art', 'Arcana visualization', 'Rebis art'],
        techniques: ['Tarot card art', 'Arcana symbols', 'Unified opposites art'],
        psychomagic: 'Fusion Ritual Angel',
        angel_tech: 'Rebis Angel',
        codex_connection: { node: node?.nodeIndex, arcana: node?.consciousnessLevel }
      }
    ];
  }

  private generateUnifiedScience(roomNum: number, node: CodexNode | null, depth: number): UnifiedScience[] {
    return [
      {
        id: `room-${roomNum}-soyga-science`,
        tradition: 'Planetary Magic Science',
        name: 'Soyga Planetary Science',
        scientists: ['John Dee', 'Edward Kelley', 'Planetary correspondences'],
        discoveries: ['Planetary magic tables', 'Soyga system', 'Planetary correspondences'],
        psychomagic: 'Soyga Ritual Angel',
        angel_tech: 'Planetary Angel',
        codex_connection: { node: node?.nodeIndex, gate: roomNum }
      },
      {
        id: `room-${roomNum}-iching-science`,
        tradition: 'I Ching Mathematics',
        name: 'I Ching Binary Science',
        scientists: ['Ancient Chinese mathematicians', 'Binary system', 'Change mathematics'],
        discoveries: ['Binary system (pre-computer)', '64 hexagram system', 'Change mathematics'],
        psychomagic: 'I Ching Ritual Angel',
        angel_tech: 'Change Angel',
        codex_connection: { node: node?.nodeIndex, gate: roomNum }
      },
      {
        id: `room-${roomNum}-kabbalah-science`,
        tradition: 'Qabalistic Mathematics',
        name: 'Tree of Life Science',
        scientists: ['Kabbalistic mathematicians', 'Gematria', 'Tree of Life math'],
        discoveries: ['Gematria', 'Tree of Life geometry', 'Sacred mathematics'],
        psychomagic: 'Qabalistic Ritual Angel',
        angel_tech: 'Tree of Life Angel',
        codex_connection: { node: node?.nodeIndex, gate: roomNum }
      },
      {
        id: `room-${roomNum}-solfeggio-science`,
        tradition: 'Solfeggio Frequency Science',
        name: 'Sacred Sound Science',
        scientists: ['Sound scientists', 'Frequency researchers', 'Cymatics'],
        discoveries: ['Solfeggio frequencies', 'Cymatics', 'Sound healing'],
        psychomagic: 'Frequency Ritual Angel',
        angel_tech: 'Sound Angel',
        codex_connection: { node: node?.nodeIndex, depth: depth }
      },
      {
        id: `room-${roomNum}-fractal-science`,
        tradition: 'Fractal Mathematics Science',
        name: 'Fractal Pattern Science',
        scientists: ['Benoit Mandelbrot', 'Fractal mathematicians', 'Chaos theory'],
        discoveries: ['Mandelbrot set', 'Julia sets', 'Fractal geometry', 'Chaos theory'],
        psychomagic: 'Fractal Ritual Angel',
        angel_tech: 'Pattern Angel',
        codex_connection: { node: node?.nodeIndex, depth: depth }
      }
    ];
  }

  private generateUnifiedCanon(roomNum: number, node: CodexNode | null, depth: number): UnifiedCanon[] {
    return [
      {
        id: `room-${roomNum}-soyga-canon`,
        tradition: 'Soyga',
        sources: ['Soyga tables (John Dee)', 'Planetary magic correspondences', 'Magic square systems'],
        texts: ['Soyga manuscripts', 'Planetary magic texts'],
        psychomagic: 'Soyga Ritual Angel',
        angel_tech: 'Planetary Angel',
        codex_connection: { node: node?.nodeIndex, gate: roomNum }
      },
      {
        id: `room-${roomNum}-iching-canon`,
        tradition: 'I Ching',
        sources: ['I Ching - Book of Changes', '64 hexagrams', 'Yin-Yang philosophy'],
        texts: ['I Ching', 'Book of Changes', 'Yin-Yang texts'],
        psychomagic: 'I Ching Ritual Angel',
        angel_tech: 'Change Angel',
        codex_connection: { node: node?.nodeIndex, gate: roomNum }
      },
      {
        id: `room-${roomNum}-kabbalah-canon`,
        tradition: 'Kabbalah',
        sources: ['Tree of Life (Kabbalah)', '10 Sephiroth', '22 Paths of Wisdom', 'Gematria'],
        texts: ['Sefer Yetzirah', 'Zohar', 'Tree of Life texts'],
        psychomagic: 'Qabalistic Ritual Angel',
        angel_tech: 'Tree of Life Angel',
        codex_connection: { node: node?.nodeIndex, gate: roomNum }
      },
      {
        id: `room-${roomNum}-astrology-canon`,
        tradition: 'Evolutionary Astrology',
        sources: ['Evolutionary Astrology (Jeffrey Wolf Green)', 'Soul evolution', 'Planetary nodes'],
        texts: ['Pluto: The Evolutionary Journey of the Soul', 'Evolutionary astrology texts'],
        psychomagic: 'Astrological Ritual Angel',
        angel_tech: 'Soul Evolution Angel',
        codex_connection: { node: node?.nodeIndex, depth: depth }
      },
      {
        id: `room-${roomNum}-solfeggio-canon`,
        tradition: 'Solfeggio',
        sources: ['Solfeggio Frequencies', '9 sacred tones: 174, 285, 396, 417, 528, 639, 741, 852, 963 Hz'],
        texts: ['Solfeggio frequency texts', 'Sound healing texts'],
        psychomagic: 'Frequency Ritual Angel',
        angel_tech: 'Sound Angel',
        codex_connection: { node: node?.nodeIndex, depth: depth }
      },
      {
        id: `room-${roomNum}-fractal-canon`,
        tradition: 'Fractal Mathematics',
        sources: ['Mandelbrot set (Benoit Mandelbrot)', 'Julia sets', 'Fractal geometry', 'Chaos theory'],
        texts: ['The Fractal Geometry of Nature', 'Fractal mathematics texts'],
        psychomagic: 'Fractal Ritual Angel',
        angel_tech: 'Pattern Angel',
        codex_connection: { node: node?.nodeIndex, depth: depth }
      },
      {
        id: `room-${roomNum}-fusion-kink-canon`,
        tradition: 'Fusion Kink',
        sources: ['Fusion Kink - 78-card tarot system', 'Major Arcana (22)', 'Minor Arcana (56)', 'Rebis'],
        texts: ['Fusion Kink tarot texts', 'Rebis texts'],
        psychomagic: 'Fusion Ritual Angel',
        angel_tech: 'Rebis Angel',
        codex_connection: { node: node?.nodeIndex, arcana: node?.consciousnessLevel }
      }
    ];
  }

  private generatePsychomagicRitual(roomNum: number, node: CodexNode | null): string {
    if (!node) return `Psychomagic Ritual for Room ${roomNum}`;
    
    const rituals = [
      'Dissolution Ritual (Solve)',
      'Coagulation Ritual (Coagula)',
      'Conjunction Ritual (Coniunctio)',
      'Separation Ritual (Separatio)'
    ];
    
    return `${rituals[roomNum % rituals.length]} - ${node.name} through psychomagic`;
  }

  private generateAngelTechConnection(roomNum: number, node: CodexNode | null): string {
    if (!node) return `Angel Tech Connection for Room ${roomNum}`;
    
    const angels = [
      'Circuit Angel',
      'Archetypal Angel',
      'Qabalistic Angel',
      'Hermetic Angel',
      'Neoplatonic Angel',
      'Thelemic Angel',
      'Mystic Christian Angel'
    ];
    
    return `${angels[roomNum % angels.length]} - ${node.name} through angel tech`;
  }

  private generateAllSystemsConnection(roomNum: number, node: CodexNode | null, depth: number): UnifiedMysteryRoom['all_systems_connected'] {
    return {
      soyga: {
        table: (roomNum % 36) + 1,
        planetary: ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'][roomNum % 7]
      },
      iching: {
        hexagram: (roomNum % 64) + 1,
        changing_lines: [depth % 6 + 1]
      },
      kabbalah: {
        sephirah: node ? (node.consciousnessLevel % 10) + 1 : (roomNum % 10) + 1,
        path: node ? node.consciousnessLevel : (roomNum % 22)
      },
      astrology: {
        planetary_node: ['North Node', 'South Node'][roomNum % 2],
        evolution: node?.consciousnessLevel || depth
      },
      solfeggio: {
        frequency: node?.frequency || [174, 285, 396, 417, 528, 639, 741, 852, 963][depth % 9],
        hz: node?.frequency || [174, 285, 396, 417, 528, 639, 741, 852, 963][depth % 9]
      },
      fractal: {
        iteration: depth,
        pattern: ['Mandelbrot', 'Julia', 'Sacred Geometry'][roomNum % 3]
      },
      fusion_kink: {
        card: (roomNum % 78) + 1,
        arcana: node?.consciousnessLevel || (roomNum % 22)
      }
    };
  }

  getRoom(roomNumber: number): UnifiedMysteryRoom | null {
    return this.rooms.get(roomNumber) || null;
  }

  getAllRooms(): UnifiedMysteryRoom[] {
    return Array.from(this.rooms.values());
  }

  getRoomsBySystem(system: 'soyga' | 'iching' | 'kabbalah' | 'astrology' | 'solfeggio' | 'fractal' | 'fusion_kink'): UnifiedMysteryRoom[] {
    return Array.from(this.rooms.values()).filter(room => 
      room.puzzles.some(p => p.type === system) ||
      room.art.some(a => a.tradition.toLowerCase().includes(system)) ||
      room.science.some(s => s.tradition.toLowerCase().includes(system))
    );
  }

  getRoomsByArcana(arcana: number): UnifiedMysteryRoom[] {
    return Array.from(this.rooms.values()).filter(room => 
      room.arcanaConnections.includes(arcana)
    );
  }
}

export default MysteryHouseUnified;

