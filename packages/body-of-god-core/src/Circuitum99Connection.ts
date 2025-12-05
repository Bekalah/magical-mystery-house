/**
 * ⊙ Circuitum99 Connection to Body of God
 * 
 * Connects Circuitum99: Alpha et Omega to the Tree of Life
 * 
 * @license CC0-1.0 - Public Domain
 */

import { Sephirah, SEPHIROTH_TECH, getAllSephiroth } from './Sephiroth';
import { Path, PATHS_TECH, getPath } from './Paths';

/**
 * ⚗️ Circuitum99SephirahMapping - The Principle
 * 
 * In the alchemical tradition, this type serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this type
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: The Principle
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export interface Circuitum99SephirahMapping {
  gate: number; // 1-99 gates
  sephirah: Sephirah;
  path: Path | null;
  meaning: string;
  storyRole: string;
}

/**
 * ⚗️ Circuitum99: Alpha et Omega Mapping
 * 
 * Maps the 99 gates to the Tree of Life structure
 * - Alpha (Gate 1) = Kether (Beginning)
 * - Omega (Gate 99) = Malkuth (End)
 * - Gates 1-33 = Atziluth (Archetypal World)
 * - Gates 34-66 = Briah (Creative World)
 * - Gates 67-99 = Yetzirah/Assiah (Formative/Material Worlds)
 */
export function mapCircuitum99GatesToSephiroth(): Circuitum99SephirahMapping[] {
  const mappings: Circuitum99SephirahMapping[] = [];
  const sephiroth = getAllSephiroth();
  
  // Alpha - Kether (Gates 1-11)
  for (let gate = 1; gate <= 11; gate++) {
    mappings.push({
      gate,
      sephirah: Sephirah.KETHER,
      path: null,
      meaning: `Alpha Gate ${gate} - Source of all stories`,
      storyRole: 'Beginning, origin, pure narrative force'
    });
  }
  
  // Chokmah/Binah (Gates 12-22)
  for (let gate = 12; gate <= 22; gate++) {
    const sephirah = gate % 2 === 0 ? Sephirah.CHOKMAH : Sephirah.BINAH;
    mappings.push({
      gate,
      sephirah,
      path: sephirah === Sephirah.CHOKMAH ? Path.CHOKMAH_TIPHARETH : Path.BINAH_TIPHARETH,
      meaning: `${sephirah === Sephirah.CHOKMAH ? 'Active' : 'Receptive'} Gate ${gate}`,
      storyRole: sephirah === Sephirah.CHOKMAH 
        ? 'Creative narrative force' 
        : 'Structured narrative form'
    });
  }
  
  // Tiphareth (Gates 23-33) - Center
  for (let gate = 23; gate <= 33; gate++) {
    mappings.push({
      gate,
      sephirah: Sephirah.TIPHARETH,
      path: Path.TIPHARETH_YESOD,
      meaning: `Balance Gate ${gate} - Narrative harmony`,
      storyRole: 'Balanced storytelling, harmonious narrative'
    });
  }
  
  // Chesed/Geburah (Gates 34-44)
  for (let gate = 34; gate <= 44; gate++) {
    const sephirah = gate % 2 === 0 ? Sephirah.CHESED : Sephirah.GEBURAH;
    mappings.push({
      gate,
      sephirah,
      path: sephirah === Sephirah.CHESED ? Path.CHESED_NETZACH : Path.GEBURAH_HOD,
      meaning: `${sephirah === Sephirah.CHESED ? 'Expansion' : 'Contraction'} Gate ${gate}`,
      storyRole: sephirah === Sephirah.CHESED
        ? 'Expansive narrative growth'
        : 'Narrative refinement and discipline'
    });
  }
  
  // Netzach/Hod (Gates 45-55)
  for (let gate = 45; gate <= 55; gate++) {
    const sephirah = gate % 2 === 0 ? Sephirah.NETZACH : Sephirah.HOD;
    mappings.push({
      gate,
      sephirah,
      path: Path.NETZACH_YESOD,
      meaning: `${sephirah === Sephirah.NETZACH ? 'Victory' : 'Glory'} Gate ${gate}`,
      storyRole: sephirah === Sephirah.NETZACH
        ? 'Victorious narrative persistence'
        : 'Glory through narrative form'
    });
  }
  
  // Yesod (Gates 56-88) - Foundation
  for (let gate = 56; gate <= 88; gate++) {
    mappings.push({
      gate,
      sephirah: Sephirah.YESOD,
      path: Path.YESOD_MALKUTH,
      meaning: `Foundation Gate ${gate} - Narrative foundation`,
      storyRole: 'Foundation for narrative, story data, narrative persistence'
    });
  }
  
  // Omega - Malkuth (Gates 89-99)
  for (let gate = 89; gate <= 99; gate++) {
    mappings.push({
      gate,
      sephirah: Sephirah.MALKUTH,
      path: null,
      meaning: `Omega Gate ${gate} - Story manifestation`,
      storyRole: 'End, completion, manifested narrative'
    });
  }
  
  return mappings;
}

/**
 * ⚗️ GetCircuitum99GateForSephirah - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getCircuitum99GateForSephirah(sephirah: Sephirah): Circuitum99SephirahMapping[] {
  const mappings = mapCircuitum99GatesToSephiroth();
  return mappings.filter(m => m.sephirah === sephirah);
}

/**
 * ⚗️ ConnectCircuitum99ToBodyOfGod - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function connectCircuitum99ToBodyOfGod(gateNumber: number): {
  gate: Circuitum99SephirahMapping;
  sephirah: typeof SEPHIROTH_TECH[Sephirah];
  path: ReturnType<typeof getPath> | null;
  storyFlow: {
    from: string;
    to: string;
    transformation: string;
  };
} {
  const mappings = mapCircuitum99GatesToSephiroth();
  const gate = mappings.find(m => m.gate === gateNumber) || mappings[0];
  
  const sephirah = SEPHIROTH_TECH[gate.sephirah];
  const path = gate.path ? PATHS_TECH[gate.path] : null;
  
  // Determine story flow
  let from = 'Alpha (Kether)';
  let to = 'Omega (Malkuth)';
  
  if (gate.gate <= 11) {
    from = 'Alpha - Beginning';
    to = 'Chokmah/Binah';
  } else if (gate.gate <= 33) {
    from = 'Chokmah/Binah';
    to = 'Tiphareth';
  } else if (gate.gate <= 55) {
    from = 'Tiphareth';
    to = 'Yesod';
  } else if (gate.gate <= 88) {
    from = 'Yesod';
    to = 'Malkuth';
  } else {
    from = 'Yesod';
    to = 'Omega - End';
  }
  
  return {
    gate,
    sephirah,
    path,
    storyFlow: {
      from,
      to,
      transformation: `${gate.meaning} transforms narrative from ${from} to ${to}`
    }
  };
}

/**
 * ⚗️ GetAlphaEtOmegaPath - Solve et Coagula
 * 
 * In the alchemical tradition, this function serves as a vessel where
 * aether energy and sacred mathematics converge to manifest
 * visionary works.
 * 
 * Like the philosopher's stone transforming base metals to gold, this function
 * transforms raw data and principles into art that speaks to the deepest
 * layers of human experience.
 * 
 * **Element**: Aether
 * **Process**: Solve et Coagula
 * **Ratio**: 144:99 (Sacred Cathedral Proportion)
 * 
 * @license CC0-1.0 - Public Domain
 */
export function getAlphaEtOmegaPath(): {
  alpha: Circuitum99SephirahMapping;
  omega: Circuitum99SephirahMapping;
  path: Array<{ sephirah: Sephirah; gates: number[] }>;
} {
  const mappings = mapCircuitum99GatesToSephiroth();
  const alpha = mappings[0]; // Gate 1
  const omega = mappings[mappings.length - 1]; // Gate 99
  
  // Group gates by sephirah
  const pathMap = new Map<Sephirah, number[]>();
  for (const mapping of mappings) {
    if (!pathMap.has(mapping.sephirah)) {
      pathMap.set(mapping.sephirah, []);
    }
    pathMap.get(mapping.sephirah)!.push(mapping.gate);
  }
  
  const path = Array.from(pathMap.entries()).map(([sephirah, gates]) => ({
    sephirah,
    gates
  }));
  
  return {
    alpha,
    omega,
    path
  };
}

