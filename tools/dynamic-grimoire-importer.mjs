#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Dynamic Grimoire Importer
 * Import any book (PDF, text, markdown, JSON) and convert to interactive grimoire
 * Extract spells, rituals, correspondences automatically
 * Map spells to alchemical tarot system
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Alchemical tarot mapping
const TAROT_TO_ALCHEMICAL = {
  'wands': 'Sulfur',
  'cups': 'Mercury',
  'swords': 'Salt',
  'pentacles': 'Ash',
  'disks': 'Ash'
};

// Keywords that indicate spells, rituals, or correspondences
const SPELL_KEYWORDS = [
  'spell', 'ritual', 'invocation', 'evocation', 'incantation', 'charm',
  'formula', 'recipe', 'operation', 'working', 'ceremony', 'rite'
];

const CORRESPONDENCE_KEYWORDS = [
  'correspondence', 'corresponds to', 'attributed to', 'associated with',
  'element', 'planet', 'zodiac', 'color', 'herb', 'stone', 'metal'
];

function extractSpells(text) {
  const spells = [];
  const lines = text.split('\n');
  
  let currentSpell = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if line indicates a spell
    const isSpellLine = SPELL_KEYWORDS.some(keyword => 
      line.toLowerCase().includes(keyword)
    );
    
    if (isSpellLine && !currentSpell) {
      currentSpell = {
        name: line,
        description: '',
        source: 'Imported book',
        lines: [i]
      };
    } else if (currentSpell) {
      if (line.length > 0) {
        currentSpell.description += line + ' ';
      } else {
        // Empty line might end the spell
        if (currentSpell.description.length > 50) {
          spells.push(currentSpell);
        }
        currentSpell = null;
      }
    }
  }
  
  // Add last spell if exists
  if (currentSpell && currentSpell.description.length > 50) {
    spells.push(currentSpell);
  }
  
  return spells;
}

function extractCorrespondences(text) {
  const correspondences = {
    elements: [],
    planets: [],
    zodiac: [],
    colors: [],
    herbs: [],
    stones: []
  };
  
  const lines = text.split('\n');
  for (const line of lines) {
    const lower = line.toLowerCase();
    
    // Extract elements
    ['fire', 'water', 'air', 'earth', 'aether'].forEach(element => {
      if (lower.includes(element) && !correspondences.elements.includes(element)) {
        correspondences.elements.push(element);
      }
    });
    
    // Extract planets
    ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'].forEach(planet => {
      if (lower.includes(planet) && !correspondences.planets.includes(planet)) {
        correspondences.planets.push(planet);
      }
    });
  }
  
  return correspondences;
}

function mapSpellToTarot(spell) {
  const text = (spell.name + ' ' + spell.description).toLowerCase();
  
  // Determine tarot suit based on content
  if (text.includes('fire') || text.includes('will') || text.includes('power') || text.includes('action')) {
    return { suit: 'wands', element: 'Sulfur' };
  } else if (text.includes('water') || text.includes('emotion') || text.includes('feeling') || text.includes('love')) {
    return { suit: 'cups', element: 'Mercury' };
  } else if (text.includes('air') || text.includes('intellect') || text.includes('thought') || text.includes('knowledge')) {
    return { suit: 'swords', element: 'Salt' };
  } else {
    return { suit: 'pentacles', element: 'Ash' };
  }
}

function importBookToGrimoire(bookPath, outputPath) {
  console.log(`📚 Importing book: ${bookPath}\n`);
  
  if (!fs.existsSync(bookPath)) {
    throw new Error(`Book file not found: ${bookPath}`);
  }
  
  const ext = path.extname(bookPath).toLowerCase();
  let text = '';
  
  // Read based on file type
  if (ext === '.txt' || ext === '.md' || ext === '.markdown') {
    text = fs.readFileSync(bookPath, 'utf-8');
  } else if (ext === '.json') {
    const json = JSON.parse(fs.readFileSync(bookPath, 'utf-8'));
    text = JSON.stringify(json, null, 2);
  } else {
    // For PDF and other formats, we'd need a library
    // For now, try to read as text
    try {
      text = fs.readFileSync(bookPath, 'utf-8');
    } catch (e) {
      throw new Error(`Unsupported file format: ${ext}. Supported: .txt, .md, .json`);
    }
  }
  
  // Extract content
  const spells = extractSpells(text);
  const correspondences = extractCorrespondences(text);
  
  // Map spells to tarot
  const mappedSpells = spells.map((spell, idx) => {
    const tarot = mapSpellToTarot(spell);
    return {
      id: `spell-imported-${idx + 1}`,
      name: spell.name,
      source: spell.source,
      description: spell.description.trim(),
      tarotSuit: tarot.suit,
      alchemicalElement: tarot.element,
      originalLines: spell.lines
    };
  });
  
  // Create grimoire structure
  const grimoire = {
    id: `grimoire-imported-${Date.now()}`,
    title: path.basename(bookPath, ext),
    source: bookPath,
    imported: new Date().toISOString(),
    spells: mappedSpells,
    correspondences,
    pages: [
      {
        id: 'page-imported-1',
        pageNumber: 1,
        title: 'Imported Content',
        content: `This grimoire was imported from: ${path.basename(bookPath)}\n\nTotal spells extracted: ${mappedSpells.length}`
      }
    ],
    metadata: {
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      tags: ['imported', 'dynamic', 'book'],
      category: 'imported-grimoire'
    }
  };
  
  // Save grimoire
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(grimoire, null, 2), 'utf-8');
  
  console.log(`✅ Book imported successfully!`);
  console.log(`   Spells extracted: ${mappedSpells.length}`);
  console.log(`   Saved to: ${outputPath}`);
  
  return grimoire;
}

async function importBook(bookPath, outputDir = null) {
  if (!outputDir) {
    outputDir = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'imported-grimoires');
  }
  
  const bookName = path.basename(bookPath, path.extname(bookPath));
  const outputPath = path.join(outputDir, `${bookName}-grimoire.json`);
  
  return importBookToGrimoire(bookPath, outputPath);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const bookPath = process.argv[2];
  if (!bookPath) {
    console.error('Usage: node dynamic-grimoire-importer.mjs <book-path>');
    process.exit(1);
  }
  importBook(bookPath).catch(console.error);
}

export default importBook;

