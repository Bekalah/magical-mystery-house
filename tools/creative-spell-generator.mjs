#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Creative Spell Generator
 * Generates creative spells blending historical cannon with visionary interpretation
 * Integrates with grimoire system and alchemical tarot
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Historical spell templates
const HISTORICAL_TEMPLATES = [
  {
    name: 'Invocation of {deity}',
    source: 'Key of Solomon',
    suit: 'wands',
    element: 'Sulfur',
    pattern: 'Invoke {deity} for {purpose} through {method}'
  },
  {
    name: 'Ritual of {operation}',
    source: 'Agrippa\'s Three Books',
    suit: 'cups',
    element: 'Mercury',
    pattern: 'Perform {operation} using {element} and {correspondence}'
  },
  {
    name: 'Working of {purpose}',
    source: 'Lesser Key of Solomon',
    suit: 'swords',
    element: 'Salt',
    pattern: 'Work {purpose} through {method} with {correspondence}'
  },
  {
    name: 'Manifestation of {goal}',
    source: 'Picatrix',
    suit: 'pentacles',
    element: 'Ash',
    pattern: 'Manifest {goal} using {element} and {correspondence}'
  }
];

// Visionary interpretations
const VISIONARY_INTERPRETATIONS = [
  'Through the lens of active imagination',
  'In the style of Alice in Wonderland',
  'With surrealist magic',
  'Through visionary creativity',
  'In the tradition of Jung\'s active imagination',
  'With creative interpretation'
];

function generateCreativeSpell(baseSpell, arcanaNumber, inspiration) {
  const template = HISTORICAL_TEMPLATES[Math.floor(Math.random() * HISTORICAL_TEMPLATES.length)];
  const interpretation = VISIONARY_INTERPRETATIONS[Math.floor(Math.random() * VISIONARY_INTERPRETATIONS.length)];
  
  // Get arcana info
  const charactersPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'characters.json');
  let arcanaName = `Arcana ${arcanaNumber}`;
  if (fs.existsSync(charactersPath)) {
    const data = JSON.parse(fs.readFileSync(charactersPath, 'utf-8'));
    const arcana = data.major_arcana?.find(a => a.number === arcanaNumber);
    if (arcana) {
      arcanaName = arcana.name;
    }
  }
  
  const spell = {
    id: `spell-creative-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: template.name.replace('{deity}', inspiration || arcanaName),
    source: `${template.source} + ${interpretation}`,
    tarotSuit: template.suit,
    alchemicalElement: template.element,
    description: template.pattern
      .replace('{purpose}', 'creative manifestation')
      .replace('{method}', 'visionary work')
      .replace('{element}', template.element)
      .replace('{correspondence}', 'arcanae connection'),
    creativeInterpretation: `${interpretation}, this spell blends historical accuracy from ${template.source} with the creative vision of ${arcanaName}, allowing for ${inspiration || 'visionary'} work through ${template.element} (${template.suit}).`,
    arcana: arcanaNumber,
    arcanaName: arcanaName,
    generated: new Date().toISOString()
  };
  
  return spell;
}

async function generateCreativeSpells(count = 10, arcanaNumber = null) {
  console.log('✨ Generating Creative Spells...\n');
  
  const spells = [];
  const charactersPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'characters.json');
  let inspirations = [];
  
  if (fs.existsSync(charactersPath)) {
    const data = JSON.parse(fs.readFileSync(charactersPath, 'utf-8'));
    inspirations = data.major_arcana || [];
  }
  
  for (let i = 0; i < count; i++) {
    const targetArcana = arcanaNumber !== null ? arcanaNumber : Math.floor(Math.random() * 22);
    const inspiration = inspirations.find(a => a.number === targetArcana);
    const inspirationName = inspiration?.purity_designation || inspiration?.name || 'Unknown';
    
    const spell = generateCreativeSpell(null, targetArcana, inspirationName);
    spells.push(spell);
    
    console.log(`✅ Generated: ${spell.name}`);
    console.log(`   Arcana: ${spell.arcanaName} (${targetArcana})`);
    console.log(`   Element: ${spell.alchemicalElement} (${spell.tarotSuit})`);
  }
  
  // Save spells
  const outputPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'creative-spells.json');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Load existing spells if any
  let allSpells = spells;
  if (fs.existsSync(outputPath)) {
    const existing = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    if (Array.isArray(existing)) {
      allSpells = [...existing, ...spells];
    } else if (existing.spells) {
      allSpells = [...existing.spells, ...spells];
    }
  }
  
  fs.writeFileSync(outputPath, JSON.stringify({ spells: allSpells, generated: new Date().toISOString() }, null, 2), 'utf-8');
  
  console.log(`\n✅ Creative spells generated!`);
  console.log(`   Total spells: ${allSpells.length}`);
  console.log(`   Saved to: ${outputPath}`);
  
  return allSpells;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const count = parseInt(process.argv[2]) || 10;
  const arcana = process.argv[3] ? parseInt(process.argv[3]) : null;
  generateCreativeSpells(count, arcana).catch(console.error);
}

export { generateCreativeSpell, generateCreativeSpells };
export default generateCreativeSpells;

