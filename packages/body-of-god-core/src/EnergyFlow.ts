/**
 * ⚡ Energy Flow - Data Flow Through the Tree of Life
 * 
 * Technical implementation of energy/data flow through the Body of God
 * 
 * @license CC0-1.0 - Public Domain
 */

import { Sephirah, SEPHIROTH_TECH } from './Sephiroth';
import { Path, PATHS_TECH, getPath } from './Paths';

/**
 * ⚗️ EnergyFlow - The Principle
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
export interface EnergyFlow {
  from: Sephirah;
  to: Sephirah;
  path: Path | null;
  energyType: 'active' | 'receptive' | 'balanced';
  dataType: string;
  transformation: string;
}

/**
 * Get energy flow from source (Kether) to manifestation (Malkuth)
 */
/**
 * ⚗️ GetEnergyFlowFromKether - Solve et Coagula
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
export function getEnergyFlowFromKether(): EnergyFlow[] {
  const flow: EnergyFlow[] = [];
  
  // Kether → Chokmah/Binah
  flow.push({
    from: Sephirah.KETHER,
    to: Sephirah.CHOKMAH,
    path: getPath(Sephirah.KETHER, Sephirah.CHOKMAH),
    energyType: 'active',
    dataType: 'creative-force',
    transformation: 'Unity → Active Force'
  });
  
  flow.push({
    from: Sephirah.KETHER,
    to: Sephirah.BINAH,
    path: getPath(Sephirah.KETHER, Sephirah.BINAH),
    energyType: 'receptive',
    dataType: 'structure',
    transformation: 'Unity → Receptive Form'
  });
  
  // Chokmah/Binah → Tiphareth
  flow.push({
    from: Sephirah.CHOKMAH,
    to: Sephirah.TIPHARETH,
    path: getPath(Sephirah.CHOKMAH, Sephirah.TIPHARETH),
    energyType: 'active',
    dataType: 'creative-energy',
    transformation: 'Active Force → Balance'
  });
  
  flow.push({
    from: Sephirah.BINAH,
    to: Sephirah.TIPHARETH,
    path: getPath(Sephirah.BINAH, Sephirah.TIPHARETH),
    energyType: 'receptive',
    dataType: 'structure',
    transformation: 'Receptive Form → Balance'
  });
  
  // Tiphareth → Yesod
  flow.push({
    from: Sephirah.TIPHARETH,
    to: Sephirah.YESOD,
    path: getPath(Sephirah.TIPHARETH, Sephirah.YESOD),
    energyType: 'balanced',
    dataType: 'harmonized',
    transformation: 'Balance → Foundation'
  });
  
  // Yesod → Malkuth
  flow.push({
    from: Sephirah.YESOD,
    to: Sephirah.MALKUTH,
    path: getPath(Sephirah.YESOD, Sephirah.MALKUTH),
    energyType: 'balanced',
    dataType: 'manifested',
    transformation: 'Foundation → Manifestation'
  });
  
  return flow;
}

/**
 * Get energy flow for a specific sephirah
 */
/**
 * ⚗️ GetEnergyFlowForSephirah - Solve et Coagula
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
export function getEnergyFlowForSephirah(sephirah: Sephirah): {
  incoming: EnergyFlow[];
  outgoing: EnergyFlow[];
  sephirah: typeof SEPHIROTH_TECH[Sephirah];
} {
  const sephirahTech = SEPHIROTH_TECH[sephirah];
  
  const incoming: EnergyFlow[] = sephirahTech.parents.map(parent => ({
    from: parent,
    to: sephirah,
    path: getPath(parent, sephirah),
    energyType: SEPHIROTH_TECH[parent].energyType,
    dataType: `${SEPHIROTH_TECH[parent].techRole.toLowerCase()}-data`,
    transformation: `${SEPHIROTH_TECH[parent].name} → ${sephirahTech.name}`
  }));
  
  const outgoing: EnergyFlow[] = sephirahTech.children.map(child => ({
    from: sephirah,
    to: child,
    path: getPath(sephirah, child),
    energyType: sephirahTech.energyType,
    dataType: `${sephirahTech.techRole.toLowerCase()}-data`,
    transformation: `${sephirahTech.name} → ${SEPHIROTH_TECH[child].name}`
  }));
  
  return {
    incoming,
    outgoing,
    sephirah: sephirahTech
  };
}

/**
 * Get complete energy flow map
 */
/**
 * ⚗️ GetCompleteEnergyFlowMap - Solve et Coagula
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
export function getCompleteEnergyFlowMap(): Record<Sephirah, {
  incoming: EnergyFlow[];
  outgoing: EnergyFlow[];
}> {
  const map: Partial<Record<Sephirah, { incoming: EnergyFlow[]; outgoing: EnergyFlow[] }>> = {};
  
  for (const sephirah of Object.values(Sephirah)) {
    const flow = getEnergyFlowForSephirah(sephirah);
    map[sephirah] = {
      incoming: flow.incoming,
      outgoing: flow.outgoing
    };
  }
  
  return map as Record<Sephirah, { incoming: EnergyFlow[]; outgoing: EnergyFlow[] }>;
}

