#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Compile All Character Data
 * Finds and compiles all character data from various sources:
 * - characters.json (game data)
 * - character-grimoires.json (grimoires)
 * - character-deities.json (gods/goddesses)
 * - complete-arcana-profiles.json (detailed profiles)
 * - complete-rebecca-arcanae-influences.json (inspirations)
 * Ensures all playable characters have complete data for the experiment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Map from ALCHEMY_TAROT_SYSTEM.md
const ARCANA_INSPIRATIONS = {
  0: { inspiration: 'Crowley (Holy Guardian Angel)', operation: 'Prima Materia', archetype: 'The Beginner\'s Mind' },
  1: { inspiration: 'Agrippa, Dee', operation: 'Conjunction', archetype: 'The Channel' },
  2: { inspiration: 'Fortune (Sea Priestess)', operation: 'Reflection', archetype: 'The Seer' },
  3: { inspiration: 'Carrington', operation: 'Fermentation', archetype: 'The Creator' },
  4: { inspiration: 'Steiner', operation: 'Fixation', archetype: 'The Architect' },
  5: { inspiration: 'Crowley (*Moon Child* / Max Ernst)', operation: 'Multiplication', archetype: 'The Teacher' },
  6: { inspiration: 'Fortune (inner marriage)', operation: 'Conjunction', archetype: 'The Integrator' },
  7: { inspiration: 'Case (Cube of Space)', operation: 'Sublimation', archetype: 'The Director' },
  8: { inspiration: 'Kunz', operation: 'Digestion', archetype: 'The Alchemist' },
  9: { inspiration: 'Dee (library work)', operation: 'Separation', archetype: 'The Researcher' },
  10: { inspiration: 'Agrippa (celestial magic)', operation: 'Rotation', archetype: 'The Cycler' },
  11: { inspiration: 'Case (scales)', operation: 'Equilibrium', archetype: 'The Balancer' },
  12: { inspiration: 'Crowley (crossing the Abyss)', operation: 'Dissolution', archetype: 'The Surrenderer' },
  13: { inspiration: 'All (nigredo)', operation: 'Putrefaction', archetype: 'The Transformer' },
  14: { inspiration: 'Carrington (kitchen alchemy)', operation: 'Distillation', archetype: 'The Mixer' },
  15: { inspiration: 'Crowley, Fortune', operation: 'Calcination', archetype: 'The Shadow Worker' },
  16: { inspiration: 'Dee (fall from grace)', operation: 'Mortification', archetype: 'The Destroyer' },
  17: { inspiration: 'Kunz (healing drawings)', operation: 'Coagulation', archetype: 'The Healer' },
  18: { inspiration: 'Fortune (inner planes)', operation: 'Fermentation', archetype: 'The Dreamer' },
  19: { inspiration: 'Steiner (light work)', operation: 'Projection', archetype: 'The Radiator' },
  20: { inspiration: 'Case (resurrection)', operation: 'Exaltation', archetype: 'The Awakener' },
  21: { inspiration: 'All (rubedo)', operation: 'Philosopher\'s Stone', archetype: 'The Completer' }
};

// Real-world inspirations and realms (from user's specifications)
const REAL_INSPIRATIONS = {
  0: { realWorld: 'Leonora Carrington + Rebecca Respawn', realm: 'Kitchen Alchemy & Christian Mysticism' },
  1: { realWorld: 'John Dee', realm: 'Enochian' },
  2: { realWorld: 'Dion Fortune', realm: 'Avalon' },
  3: { realWorld: 'Leonora Carrington', realm: 'Doreen\'s Garden' },
  4: { realWorld: 'Rudolf Steiner', realm: 'Structured Authority' },
  5: { realWorld: 'Crowley (Moon Child) / Max Ernst', realm: 'The Tower on the Tor' },
  6: { realWorld: 'Dion Fortune (inner marriage)', realm: 'Sacred Union' },
  7: { realWorld: 'Paul Foster Case (Cube of Space)', realm: 'Dimensional Navigation' },
  8: { realWorld: 'Emma Kunz', realm: 'Inner Power' },
  9: { realWorld: 'John Dee (library work)', realm: 'Solitary Research' },
  10: { realWorld: 'Agrippa (celestial magic)', realm: 'Eternal Flux' },
  11: { realWorld: 'Paul Foster Case (scales)', realm: 'Balance' },
  12: { realWorld: 'Crowley (crossing the Abyss)', realm: 'Suspended Perspective' },
  13: { realWorld: 'All (nigredo)', realm: 'Transformation' },
  14: { realWorld: 'Leonora Carrington (kitchen alchemy)', realm: 'Alchemical Mixing' },
  15: { realWorld: 'Crowley, Fortune', realm: 'Shadow Work' },
  16: { realWorld: 'John Dee (fall from grace)', realm: 'Destructive Awakening' },
  17: { realWorld: 'Emma Kunz (healing drawings)', realm: 'Hope & Healing' },
  18: { realWorld: 'Dion Fortune (inner planes)', realm: 'Dream Navigation' },
  19: { realWorld: 'Rudolf Steiner (light work)', realm: 'Radiant Illumination' },
  20: { realWorld: 'Paul Foster Case (resurrection)', realm: 'Awakening' },
  21: { realWorld: 'All (rubedo)', realm: 'Completion' }
};

async function compileAllCharacterData() {
  console.log('🔮 Compiling All Character Data (Major + Minor Arcana)...\n');
  
  // Load all character data sources
  const charactersPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'characters.json');
  const grimoiresPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'character-grimoires.json');
  const deitiesPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'character-deities.json');
  const profilesPath = path.join(rootDir, 'packages', 'liber-arcanae', 'data', 'complete-arcana-profiles.json');
  const influencesPath = path.join(rootDir, 'packages', 'liber-arcanae', 'data', 'complete-rebecca-arcanae-influences.json');
  
  // Load system data
  const circuitumPath = path.join(rootDir, 'packages', 'circuitum99-core');
  const mysteryHousePath = path.join(rootDir, 'packages', 'mystery-house-core');
  const cosmogenesisPath = path.join(rootDir, 'packages', 'cosmogenesis');
  const stoneGrimoirePath = path.join(rootDir, 'packages', 'stone-grimoire');
  
  // Load data with error handling
  let characters, grimoires, deities, profiles, influences;
  try {
    characters = JSON.parse(fs.readFileSync(charactersPath, 'utf-8'));
  } catch (e) {
    console.error(`Error loading characters.json: ${e.message}`);
    characters = { major_arcana: [] };
  }
  try {
    grimoires = fs.existsSync(grimoiresPath) ? JSON.parse(fs.readFileSync(grimoiresPath, 'utf-8')) : {};
  } catch (e) {
    console.warn(`Error loading character-grimoires.json: ${e.message}`);
    grimoires = {};
  }
  try {
    deities = fs.existsSync(deitiesPath) ? JSON.parse(fs.readFileSync(deitiesPath, 'utf-8')) : {};
  } catch (e) {
    console.warn(`Error loading character-deities.json: ${e.message}`);
    deities = {};
  }
  try {
    profiles = fs.existsSync(profilesPath) ? JSON.parse(fs.readFileSync(profilesPath, 'utf-8')) : {};
  } catch (e) {
    console.warn(`Error loading complete-arcana-profiles.json: ${e.message}`);
    profiles = {};
  }
  try {
    influences = fs.existsSync(influencesPath) ? JSON.parse(fs.readFileSync(influencesPath, 'utf-8')) : {};
  } catch (e) {
    console.warn(`Error loading complete-rebecca-arcanae-influences.json: ${e.message}`);
    influences = {};
  }
  
  const compiled = {
    timestamp: new Date().toISOString(),
    totalMajorArcana: 22,
    totalMinorArcana: 56, // 4 suits × 14 cards (Ace-10 + Page, Knight, Queen, King)
    totalArcana: 78, // 22 Major + 56 Minor
    majorArcana: {},
    minorArcana: {},
    systems: {
      circuitum99: fs.existsSync(circuitumPath),
      mysteryHouse: fs.existsSync(mysteryHousePath),
      cosmogenesis: fs.existsSync(cosmogenesisPath),
      stoneGrimoire: fs.existsSync(stoneGrimoirePath)
    }
  };
  
  // Compile data for each character
  for (const character of characters.major_arcana) {
    const num = character.number;
    const grimoire = grimoires[num] || null;
    const deity = deities[num] || null;
    const profile = profiles.rebecca_respawns_arcanae_compendium?.major_arcana_complete_details?.[`${num}_${character.name.toLowerCase().replace(/\s+/g, '_')}`] || null;
    const influence = influences.rebecca_respawns_arcanae_compendium?.major_arcana_complete_details?.[`${num}_${character.name.toLowerCase().replace(/\s+/g, '_')}`] || null;
    const inspiration = ARCANA_INSPIRATIONS[num] || {};
    const realInsp = REAL_INSPIRATIONS[num] || {};
    
    // Determine tarot suit and alchemical element
    const tarotSuit = character.tarot_suit || (num % 4 === 0 ? 'wands' : num % 4 === 1 ? 'cups' : num % 4 === 2 ? 'swords' : 'pentacles');
    const alchemicalElement = character.alchemical_element || (tarotSuit === 'wands' ? 'Sulfur' : tarotSuit === 'cups' ? 'Mercury' : tarotSuit === 'swords' ? 'Salt' : 'Ash');
    
    compiled.majorArcana[num] = {
      // Core game data
      number: num,
      name: character.name,
      purityDesignation: character.purity_designation,
      fractalSignature: character.fractal_signature,
      colorPalette: character.color_palette,
      frequencyResonance: character.frequency_resonance,
      abilities: character.abilities,
      playstyle: character.playstyle,
      
      // Real-world inspirations
      realInspiration: character.real_inspiration || realInsp.realWorld || inspiration.inspiration,
      realm: character.realm || realInsp.realm,
      themes: character.themes || [],
      alchemicalOperation: character.alchemical_operation || inspiration.operation,
      creativeArchetype: inspiration.archetype,
      
      // Alchemical tarot
      tarotSuit: tarotSuit,
      alchemicalElement: alchemicalElement,
      
      // Detailed inspirations (from complete data)
      inspirations: influence?.inspirations || profile?.inspirations || {
        literary: [],
        artistic: [],
        scientific: [],
        mystical: [],
        technological: []
      },
      
      // Grimoire data
      grimoire: grimoire ? {
        id: grimoire.id,
        spells: grimoire.spells?.length || 0,
        daimons: grimoire.daimons
      } : null,
      
      // Deity data
      deities: deity ? {
        primary: deity.primaryDeities,
        secondary: deity.secondaryDeities,
        realm: deity.realm
      } : null,
      
      // Tech features
      techFeatures: {
        trueWill: true,
        rpg: true,
        grimoire: grimoire !== null,
        spells: grimoire?.spells?.length > 0,
        deities: deity !== null,
        pathworking: true,
        portal: true,
        witchEye: true,
        witchMod: true,
        synchronizer: true, // Synchronizer tech for character/arcana synchronization
        synthesizer: true, // Fractal sound synthesizer working with fractal tech
        fractal: true, // Fractal tech - each character has fractal signature
        fractalSound: true, // Fractal sound synthesis
        creativeFrequency: true // Creative frequency synthesizer
      },
      
      // Design features
      designFeatures: {
        fractalSignature: character.fractal_signature,
        colorPalette: character.color_palette,
        frequencyResonance: character.frequency_resonance,
        shaderEffects: true,
        sacredGeometry: true,
        alchemicalMapping: true
      },
      
      // Cannon
      cannon: {
        historicalSources: grimoire?.inspiration?.historicalSources || [],
        realInspiration: character.real_inspiration || realInsp.realWorld,
        realm: character.realm || realInsp.realm,
        alchemicalOperation: character.alchemical_operation || inspiration.operation,
        lineage: inspiration.inspiration
      },
      
      // System Connections - Circuitum99: Alpha et Omega
      circuitum99: {
        connected: compiled.systems.circuitum99,
        gates: [], // Circuitum99 gates (1-99) connected to this arcana
        stories: [], // Stories from Circuitum99StoryEngine
        pathways: [], // Story pathways
        features: ['interactive-storytelling', 'cyoa', 'theatre-experience']
      },
      
      // System Connections - Magical Mystery House
      mysteryHouse: {
        connected: compiled.systems.mysteryHouse,
        rooms: [], // Mystery house rooms (1-99) connected to this arcana
        features: [], // Room features for this arcana
        pathworking: [], // Pathworking nodes
        stories: [] // Stories from mystery house
      },
      
      // System Connections - Cosmogenesis Learning Engine
      cosmogenesis: {
        connected: compiled.systems.cosmogenesis,
        learningPaths: [], // Learning paths for this arcana
        features: ['adaptive-learning', 'spiral-learning', 'trauma-aware'],
        stories: [] // Learning stories
      },
      
      // System Connections - Stone Grimoire
      stoneGrimoire: {
        connected: compiled.systems.stoneGrimoire,
        chapels: [], // Stone grimoire chapels (1-8) connected to this arcana
        folios: [], // Folios (1-144) connected to this arcana
        features: ['grimoire-maker', 'dynamic-pages', 'sacred-geometry']
      },
      
      // Stories from all systems
      stories: {
        circuitum99: [], // Stories from circuitum99: alpha et omega
        mysteryHouse: [], // Stories from magical-mystery-house
        cosmogenesis: [], // Learning stories from cosmogenesis-learning-engine
        stoneGrimoire: [], // Stories from stone-grimoire
        general: [] // General character stories
      },
      
      // Completeness check
      completeness: {
        hasGameData: true,
        hasGrimoire: grimoire !== null,
        hasDeities: deity !== null,
        hasInspirations: (influence?.inspirations || profile?.inspirations) !== null,
        hasRealInspiration: (character.real_inspiration || realInsp.realWorld) !== null,
        hasRealm: (character.realm || realInsp.realm) !== null,
        hasAlchemical: character.alchemical_operation !== null,
        complete: false
      }
    };
    
    // Calculate completeness
    const comp = compiled.majorArcana[num].completeness;
    comp.complete = comp.hasGameData && comp.hasGrimoire && comp.hasDeities && 
                    comp.hasRealInspiration && comp.hasRealm && comp.hasAlchemical;
  }
  
  // Save compiled data
  const outputPath = path.join(rootDir, 'ALL_CHARACTER_DATA_COMPILED.json');
  fs.writeFileSync(outputPath, JSON.stringify(compiled, null, 2), 'utf-8');
  
  // Compile Minor Arcana (56 cards)
  const suits = ['wands', 'cups', 'swords', 'pentacles'];
  const pipCards = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
  const courtCards = ['page', 'knight', 'queen', 'king'];
  
  for (const suit of suits) {
    const alchemicalElement = suit === 'wands' ? 'Sulfur' : suit === 'cups' ? 'Mercury' : suit === 'swords' ? 'Salt' : 'Ash';
    
    // Pip cards (Ace-10)
    for (const number of pipCards) {
      const cardId = `${suit}-${number}`;
      compiled.minorArcana[cardId] = {
        id: cardId,
        suit: suit,
        number: number,
        type: 'pip',
        name: `${number === '1' ? 'Ace' : ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'][parseInt(number) - 2]} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
        alchemicalElement: alchemicalElement,
        tarotSuit: suit,
        systemConnections: {
          circuitum99: { connected: true, gates: [] },
          mysteryHouse: { connected: true, rooms: [] },
          cosmogenesis: { connected: true, learningPaths: [] },
          stoneGrimoire: { connected: true, folios: [] }
        },
        techFeatures: {
          trueWill: true,
          rpg: true,
          grimoire: true,
          spells: true,
          synchronizer: true,
          synthesizer: true,
          fractal: true,
          fractalSound: true,
          creativeFrequency: true
        }
      };
    }
    
    // Court cards
    for (const court of courtCards) {
      const cardId = `${suit}-${court}`;
      compiled.minorArcana[cardId] = {
        id: cardId,
        suit: suit,
        court: court,
        type: 'court',
        name: `${court.charAt(0).toUpperCase() + court.slice(1)} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
        alchemicalElement: alchemicalElement,
        tarotSuit: suit,
        systemConnections: {
          circuitum99: { connected: true, gates: [] },
          mysteryHouse: { connected: true, rooms: [] },
          cosmogenesis: { connected: true, learningPaths: [] },
          stoneGrimoire: { connected: true, folios: [] }
        },
        techFeatures: {
          trueWill: true,
          rpg: true,
          grimoire: true,
          spells: true,
          synchronizer: true,
          synthesizer: true,
          fractal: true,
          fractalSound: true,
          creativeFrequency: true
        }
      };
    }
  }
  
  // Generate summary
  const complete = Object.values(compiled.majorArcana).filter(c => c.completeness.complete).length;
  const missingGrimoires = Object.values(compiled.majorArcana).filter(c => !c.completeness.hasGrimoire).length;
  const missingDeities = Object.values(compiled.majorArcana).filter(c => !c.completeness.hasDeities).length;
  const missingInspirations = Object.values(compiled.majorArcana).filter(c => !c.completeness.hasRealInspiration).length;
  
  console.log(`✅ Character Data Compiled!`);
  console.log(`   Major Arcana: ${compiled.totalMajorArcana}`);
  console.log(`   Minor Arcana: ${compiled.totalMinorArcana}`);
  console.log(`   Total Arcana: ${compiled.totalArcana}`);
  console.log(`   Complete Major: ${complete}/${compiled.totalMajorArcana}`);
  console.log(`   Missing grimoires: ${missingGrimoires}`);
  console.log(`   Missing deities: ${missingDeities}`);
  console.log(`   Missing inspirations: ${missingInspirations}`);
  console.log(`   System connections:`);
  console.log(`     - Circuitum99: ${compiled.systems.circuitum99 ? '✅' : '❌'}`);
  console.log(`     - Mystery House: ${compiled.systems.mysteryHouse ? '✅' : '❌'}`);
  console.log(`     - Cosmogenesis: ${compiled.systems.cosmogenesis ? '✅' : '❌'}`);
  console.log(`     - Stone Grimoire: ${compiled.systems.stoneGrimoire ? '✅' : '❌'}`);
  console.log(`   Saved to: ${outputPath}`);
  
  // Generate improvement opportunities for experiment
  const improvements = [];
  if (missingGrimoires > 0) {
    improvements.push(`Generate ${missingGrimoires} missing character grimoires`);
  }
  if (missingDeities > 0) {
    improvements.push(`Assign ${missingDeities} missing character deities`);
  }
  if (missingInspirations > 0) {
    improvements.push(`Add ${missingInspirations} missing real-world inspirations`);
  }
  
  const improvementPath = path.join(rootDir, 'CHARACTER_DATA_IMPROVEMENTS.json');
  fs.writeFileSync(improvementPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    improvements: improvements,
    details: Object.values(compiled.majorArcana).map(c => ({
      number: c.number,
      name: c.name,
      missing: Object.entries(c.completeness)
        .filter(([k, v]) => k !== 'complete' && !v)
        .map(([k]) => k)
    })).filter(c => c.missing.length > 0)
  }, null, 2), 'utf-8');
  
  console.log(`   Improvement opportunities: ${improvements.length}`);
  console.log(`   Saved to: ${improvementPath}`);
  
  return compiled;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  compileAllCharacterData().catch(console.error);
}

export default compileAllCharacterData;

