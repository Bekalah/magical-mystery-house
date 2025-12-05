/**
 * 🔧 Tech Mapping - Mapping Packages to Body of God
 * 
 * Maps actual Cathedral packages to the Tree of Life structure
 * 
 * @license CC0-1.0 - Public Domain
 */

import { Sephirah, SEPHIROTH_TECH } from './Sephiroth';

/**
 * ⚗️ PackageMapping - The Principle
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
export interface PackageMapping {
  packageName: string;
  sephirah: Sephirah;
  sephirahName: string;
  techRole: string;
  element: string;
  energyType: string;
  dataFlow: string;
  relatedPackages: string[];
}

/**
 * Map packages to sephiroth based on their function
 */
/**
 * ⚗️ MapPackageToSephirah - Solve et Coagula
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
export function mapPackageToSephirah(packageName: string): PackageMapping | null {
  const name = packageName.toLowerCase();
  const sephirah = getSephirahForPackage(name);
  
  if (!sephirah) return null;
  
  const sephirahTech = SEPHIROTH_TECH[sephirah];
  
  return {
    packageName,
    sephirah,
    sephirahName: sephirahTech.name,
    techRole: sephirahTech.techRole,
    element: sephirahTech.element,
    energyType: sephirahTech.energyType,
    dataFlow: sephirahTech.dataFlow,
    relatedPackages: findRelatedPackages(name, sephirah)
  };
}

/**
 * ⚗️ GetSephirahForPackage - Solve et Coagula
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
function getSephirahForPackage(packageName: string): Sephirah | null {
  const name = packageName.toLowerCase();
  
  // Kether - Core architecture
  if (name.includes('trinity') && name.includes('core')) {
    return Sephirah.KETHER;
  }
  if (name.includes('core') && (name.includes('architecture') || name.includes('foundation'))) {
    return Sephirah.KETHER;
  }
  
  // Chokmah - Creative engines
  if (name.includes('engine') && (name.includes('art') || name.includes('creative') || name.includes('music'))) {
    return Sephirah.CHOKMAH;
  }
  if (name.includes('generator') || name.includes('synthesis')) {
    return Sephirah.CHOKMAH;
  }
  
  // Binah - Design systems
  if (name.includes('design') || name.includes('style') || name.includes('visual')) {
    return Sephirah.BINAH;
  }
  if (name.includes('system') && name.includes('design')) {
    return Sephirah.BINAH;
  }
  
  // Chesed - Art tools, expansion
  if (name.includes('art-') && !name.includes('engine')) {
    return Sephirah.CHESED;
  }
  if (name.includes('tool') && name.includes('art')) {
    return Sephirah.CHESED;
  }
  
  // Geburah - Editing, refinement
  if (name.includes('edit') || name.includes('refine') || name.includes('quality')) {
    return Sephirah.GEBURAH;
  }
  if (name.includes('control') && name.includes('quality')) {
    return Sephirah.GEBURAH;
  }
  
  // Tiphareth - Main interfaces, balance
  if (name.includes('ui') || name.includes('interface') || name.includes('portal')) {
    return Sephirah.TIPHARETH;
  }
  if (name.includes('bridge') || name.includes('integration')) {
    return Sephirah.TIPHARETH;
  }
  
  // Netzach - Game systems
  if (name.includes('game') || name.includes('rpg') || name.includes('world')) {
    return Sephirah.NETZACH;
  }
  
  // Hod - Audio, sound
  if (name.includes('audio') || name.includes('sound') || name.includes('music')) {
    return Sephirah.HOD;
  }
  if (name.includes('synthesis') && name.includes('audio')) {
    return Sephirah.HOD;
  }
  
  // Yesod - Data, foundation
  if (name.includes('data') || name.includes('storage') || name.includes('persistence')) {
    return Sephirah.YESOD;
  }
  if (name.includes('foundation') && !name.includes('core')) {
    return Sephirah.YESOD;
  }
  
  // Malkuth - Export, rendering
  if (name.includes('export') || name.includes('render') || name.includes('output')) {
    return Sephirah.MALKUTH;
  }
  
  // Default to Tiphareth (center/balance)
  return Sephirah.TIPHARETH;
}

/**
 * ⚗️ FindRelatedPackages - Solve et Coagula
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
function findRelatedPackages(packageName: string, sephirah: Sephirah): string[] {
  const sephirahTech = SEPHIROTH_TECH[sephirah];
  const related: string[] = [];
  
  // Find packages in parent sephiroth
  for (const parent of sephirahTech.parents) {
    const parentTech = SEPHIROTH_TECH[parent];
    related.push(`${parentTech.name} (${parentTech.techRole})`);
  }
  
  // Find packages in child sephiroth
  for (const child of sephirahTech.children) {
    const childTech = SEPHIROTH_TECH[child];
    related.push(`${childTech.name} (${childTech.techRole})`);
  }
  
  return related;
}

/**
 * Get all packages mapped to a sephirah
 */
/**
 * ⚗️ GetPackagesForSephirah - Solve et Coagula
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
export function getPackagesForSephirah(sephirah: Sephirah, packageList: string[]): PackageMapping[] {
  return packageList
    .map(pkg => mapPackageToSephirah(pkg))
    .filter((mapping): mapping is PackageMapping => mapping !== null && mapping.sephirah === sephirah);
}

/**
 * Get complete tech mapping for all packages
 */
/**
 * ⚗️ GetCompleteTechMapping - Solve et Coagula
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
export function getCompleteTechMapping(packageList: string[]): Record<Sephirah, PackageMapping[]> {
  const mapping: Partial<Record<Sephirah, PackageMapping[]>> = {};
  
  for (const pkg of packageList) {
    const mapped = mapPackageToSephirah(pkg);
    if (mapped) {
      if (!mapping[mapped.sephirah]) {
        mapping[mapped.sephirah] = [];
      }
      mapping[mapped.sephirah]!.push(mapped);
    }
  }
  
  return mapping as Record<Sephirah, PackageMapping[]>;
}

