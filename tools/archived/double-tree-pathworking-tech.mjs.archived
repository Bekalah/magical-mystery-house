#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Double Tree Pathworking Tech
 * Pathworking system using the Tree of Life (Kabbalah) and Tree of Death
 * Dual tree navigation for complete spiritual work
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Tree of Life Sephiroth (10 + Daath)
const SEPHIROTH = [
  { number: 1, name: 'Kether', hebrew: 'כתר', meaning: 'Crown', element: 'Aether' },
  { number: 2, name: 'Chokmah', hebrew: 'חכמה', meaning: 'Wisdom', element: 'Fire' },
  { number: 3, name: 'Binah', hebrew: 'בינה', meaning: 'Understanding', element: 'Water' },
  { number: 4, name: 'Chesed', hebrew: 'חסד', meaning: 'Mercy', element: 'Water' },
  { number: 5, name: 'Geburah', hebrew: 'גבורה', meaning: 'Severity', element: 'Fire' },
  { number: 6, name: 'Tiphareth', hebrew: 'תפארת', meaning: 'Beauty', element: 'Air' },
  { number: 7, name: 'Netzach', hebrew: 'נצח', meaning: 'Victory', element: 'Fire' },
  { number: 8, name: 'Hod', hebrew: 'הוד', meaning: 'Glory', element: 'Water' },
  { number: 9, name: 'Yesod', hebrew: 'יסוד', meaning: 'Foundation', element: 'Air' },
  { number: 10, name: 'Malkuth', hebrew: 'מלכות', meaning: 'Kingdom', element: 'Earth' },
  { number: 11, name: 'Daath', hebrew: 'דעת', meaning: 'Knowledge', element: 'Aether' }
];

// Tree of Death Qliphoth (corresponding to Sephiroth)
const QLIPHOTH = [
  { number: 1, name: 'Thaumiel', meaning: 'Twins of God', shadow: 'Kether' },
  { number: 2, name: 'Ghagiel', meaning: 'Hinderers', shadow: 'Chokmah' },
  { number: 3, name: 'Sathariel', meaning: 'Concealment of God', shadow: 'Binah' },
  { number: 4, name: 'Gamchicoth', meaning: 'Disturbers', shadow: 'Chesed' },
  { number: 5, name: 'Golachab', meaning: 'Burners', shadow: 'Geburah' },
  { number: 6, name: 'Thagirion', meaning: 'Disputers', shadow: 'Tiphareth' },
  { number: 7, name: 'A\'arab Zaraq', meaning: 'Ravens of Dispersion', shadow: 'Netzach' },
  { number: 8, name: 'Samael', meaning: 'Poison of God', shadow: 'Hod' },
  { number: 9, name: 'Gamaliel', meaning: 'Obscene Ones', shadow: 'Yesod' },
  { number: 10, name: 'Lilith', meaning: 'Night', shadow: 'Malkuth' },
  { number: 11, name: 'Daath Qliphoth', meaning: 'Abyss', shadow: 'Daath' }
];

// Paths between Sephiroth (22 paths, corresponding to Major Arcana)
const PATHS = [
  { number: 11, from: 1, to: 2, arcana: 0, name: 'The Fool' },
  { number: 12, from: 1, to: 3, arcana: 1, name: 'The Magician' },
  { number: 13, from: 2, to: 3, arcana: 2, name: 'The High Priestess' },
  { number: 14, from: 2, to: 6, arcana: 3, name: 'The Empress' },
  { number: 15, from: 3, to: 6, arcana: 4, name: 'The Emperor' },
  { number: 16, from: 2, to: 4, arcana: 5, name: 'The Hierophant' },
  { number: 17, from: 3, to: 5, arcana: 6, name: 'The Lovers' },
  { number: 18, from: 4, to: 5, arcana: 7, name: 'The Chariot' },
  { number: 19, from: 4, to: 6, arcana: 8, name: 'Strength' },
  { number: 20, from: 5, to: 6, arcana: 9, name: 'The Hermit' },
  { number: 21, from: 4, to: 7, arcana: 10, name: 'Wheel of Fortune' },
  { number: 22, from: 5, to: 8, arcana: 11, name: 'Justice' },
  { number: 23, from: 6, to: 7, arcana: 12, name: 'The Hanged Man' },
  { number: 24, from: 6, to: 8, arcana: 13, name: 'Death' },
  { number: 25, from: 6, to: 9, arcana: 14, name: 'Temperance' },
  { number: 26, from: 7, to: 8, arcana: 15, name: 'The Devil' },
  { number: 27, from: 7, to: 9, arcana: 16, name: 'The Tower' },
  { number: 28, from: 7, to: 10, arcana: 17, name: 'The Star' },
  { number: 29, from: 8, to: 9, arcana: 18, name: 'The Moon' },
  { number: 30, from: 8, to: 10, arcana: 19, name: 'The Sun' },
  { number: 31, from: 9, to: 10, arcana: 20, name: 'Judgment' },
  { number: 32, from: 1, to: 6, arcana: 21, name: 'The World' }
];

class DoubleTreePathworkingTech {
  constructor() {
    this.pathworkings = new Map();
    this.currentPath = null;
  }

  // Start pathworking on Tree of Life
  startTreeOfLifePathworking(startSephiroth, endSephiroth) {
    const path = this.findPath(startSephiroth, endSephiroth, 'life');
    const pathworking = {
      id: `pathworking-life-${Date.now()}`,
      tree: 'life',
      start: startSephiroth,
      end: endSephiroth,
      path: path,
      current: startSephiroth,
      completed: false,
      started: new Date().toISOString()
    };
    
    this.pathworkings.set(pathworking.id, pathworking);
    this.currentPath = pathworking;
    return pathworking;
  }

  // Start pathworking on Tree of Death
  startTreeOfDeathPathworking(startQliphoth, endQliphoth) {
    const path = this.findPath(startQliphoth, endQliphoth, 'death');
    const pathworking = {
      id: `pathworking-death-${Date.now()}`,
      tree: 'death',
      start: startQliphoth,
      end: endQliphoth,
      path: path,
      current: startQliphoth,
      completed: false,
      started: new Date().toISOString()
    };
    
    this.pathworkings.set(pathworking.id, pathworking);
    this.currentPath = pathworking;
    return pathworking;
  }

  // Find path between two nodes
  findPath(start, end, tree) {
    if (tree === 'life') {
      // Find path through Tree of Life
      const sephirothPath = this.findSephirothPath(start, end);
      const pathDetails = sephirothPath.map((node, idx) => {
        if (idx < sephirothPath.length - 1) {
          const path = PATHS.find(p => 
            (p.from === node && p.to === sephirothPath[idx + 1]) ||
            (p.to === node && p.from === sephirothPath[idx + 1])
          );
          return {
            sephiroth: SEPHIROTH.find(s => s.number === node),
            path: path,
            arcana: path ? path.arcana : null
          };
        }
        return {
          sephiroth: SEPHIROTH.find(s => s.number === node),
          path: null,
          arcana: null
        };
      });
      return pathDetails;
    } else {
      // Find path through Tree of Death
      const qliphothPath = this.findQliphothPath(start, end);
      return qliphothPath.map(node => ({
        qliphoth: QLIPHOTH.find(q => q.number === node),
        shadow: QLIPHOTH.find(q => q.number === node)?.shadow
      }));
    }
  }

  // Simple pathfinding for Sephiroth
  findSephirothPath(start, end) {
    // Simplified - in practice, use proper graph traversal
    // For now, return direct path if exists
    const directPath = PATHS.find(p => 
      (p.from === start && p.to === end) || (p.to === start && p.from === end)
    );
    
    if (directPath) {
      return [start, end];
    }
    
    // Otherwise, find through Tiphareth (middle pillar)
    if (start !== 6 && end !== 6) {
      return [start, 6, end];
    }
    
    return [start, end];
  }

  // Simple pathfinding for Qliphoth
  findQliphothPath(start, end) {
    // Similar to Sephiroth but through shadow tree
    return [start, end];
  }

  // Progress through pathworking
  progressPathworking(pathworkingId, nextNode) {
    const pathworking = this.pathworkings.get(pathworkingId);
    if (!pathworking) {
      throw new Error(`Pathworking not found: ${pathworkingId}`);
    }
    
    pathworking.current = nextNode;
    
    if (pathworking.current === pathworking.end) {
      pathworking.completed = true;
      pathworking.completedAt = new Date().toISOString();
    }
    
    return pathworking;
  }

  // Get pathworking for arcana
  getPathworkingForArcana(arcanaNumber) {
    const path = PATHS.find(p => p.arcana === arcanaNumber);
    if (!path) {
      return null;
    }
    
    return {
      path: path,
      sephiroth: {
        from: SEPHIROTH.find(s => s.number === path.from),
        to: SEPHIROTH.find(s => s.number === path.to)
      },
      qliphoth: {
        from: QLIPHOTH.find(q => q.shadow === SEPHIROTH.find(s => s.number === path.from)?.name),
        to: QLIPHOTH.find(q => q.shadow === SEPHIROTH.find(s => s.number === path.to)?.name)
      }
    };
  }

  // Dual tree pathworking (both trees simultaneously)
  startDualPathworking(sephirothStart, sephirothEnd, qliphothStart, qliphothEnd) {
    const lifePathworking = this.startTreeOfLifePathworking(sephirothStart, sephirothEnd);
    const deathPathworking = this.startTreeOfDeathPathworking(qliphothStart, qliphothEnd);
    
    const dualPathworking = {
      id: `pathworking-dual-${Date.now()}`,
      life: lifePathworking,
      death: deathPathworking,
      balance: 'seeking-equilibrium',
      started: new Date().toISOString()
    };
    
    this.pathworkings.set(dualPathworking.id, dualPathworking);
    return dualPathworking;
  }

  // Save pathworking
  save(pathworkingId, outputPath = null) {
    const pathworking = this.pathworkings.get(pathworkingId);
    if (!pathworking) {
      throw new Error(`Pathworking not found: ${pathworkingId}`);
    }
    
    if (!outputPath) {
      outputPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'pathworkings', `${pathworkingId}.json`);
    }
    
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(pathworking, null, 2), 'utf-8');
    return pathworking;
  }
}

async function createPathworking(type, config) {
  const tech = new DoubleTreePathworkingTech();
  let pathworking;
  
  if (type === 'life') {
    pathworking = tech.startTreeOfLifePathworking(config.start, config.end);
  } else if (type === 'death') {
    pathworking = tech.startTreeOfDeathPathworking(config.start, config.end);
  } else if (type === 'dual') {
    pathworking = tech.startDualPathworking(
      config.sephirothStart,
      config.sephirothEnd,
      config.qliphothStart,
      config.qliphothEnd
    );
  } else {
    throw new Error(`Unknown pathworking type: ${type}`);
  }
  
  console.log(`🌳 Pathworking created: ${type}`);
  console.log(`   ID: ${pathworking.id}`);
  
  return { tech, pathworking };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createPathworking('life', { start: 10, end: 1 }).then(({ pathworking }) => {
    console.log('✅ Pathworking created');
  }).catch(console.error);
}

export { DoubleTreePathworkingTech, createPathworking, SEPHIROTH, QLIPHOTH, PATHS };
export default createPathworking;

