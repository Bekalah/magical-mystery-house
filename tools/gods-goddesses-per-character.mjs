#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Gods and Goddesses Per Character Tech
 * Assigns real gods and goddesses to each character based on their
 * arcana, realm, inspiration, and correspondences
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Real gods and goddesses mapped to characters
const CHARACTER_DEITIES = {
  0: { // The Fool - Leonora Carrington + Rebecca Respawn
    primary: [
      { name: 'Divine Sophia', type: 'Goddess', pantheon: 'Christian Mysticism', connection: 'Wisdom and mysticism' },
      { name: 'The Holy Guardian Angel', type: 'Angel', pantheon: 'Christian Mysticism', connection: 'Crowley\'s HGA work' }
    ],
    secondary: [
      { name: 'Hermes', type: 'God', pantheon: 'Greek', connection: 'Traveler, guide' },
      { name: 'Trickster Deities', type: 'Collective', pantheon: 'Various', connection: 'Fool energy' }
    ],
    realm: 'Kitchen Alchemy & Christian Mysticism'
  },
  1: { // The Magician - John Dee
    primary: [
      { name: 'Enochian Angels', type: 'Angelic Host', pantheon: 'Enochian', connection: 'Dee\'s angelic system' },
      { name: 'Hermes Trismegistus', type: 'God', pantheon: 'Hermetic', connection: 'Hermetic tradition' },
      { name: 'Thoth', type: 'God', pantheon: 'Egyptian', connection: 'Wisdom and magic' }
    ],
    secondary: [
      { name: 'Mercury', type: 'God', pantheon: 'Roman', connection: 'Communication and magic' },
      { name: 'Odin', type: 'God', pantheon: 'Norse', connection: 'Wisdom and magic' }
    ],
    realm: 'Enochian'
  },
  2: { // The High Priestess - Dion Fortune
    primary: [
      { name: 'Morgan Le Fay', type: 'Goddess', pantheon: 'Avalon', connection: 'Avalon mysteries' },
      { name: 'The Lady of the Lake', type: 'Goddess', pantheon: 'Avalon', connection: 'Water magic, Avalon' },
      { name: 'Isis', type: 'Goddess', pantheon: 'Egyptian', connection: 'Mysteries and magic' }
    ],
    secondary: [
      { name: 'Hecate', type: 'Goddess', pantheon: 'Greek', connection: 'Crossroads, magic' },
      { name: 'Luna', type: 'Goddess', pantheon: 'Roman', connection: 'Moon, intuition' }
    ],
    realm: 'Avalon'
  },
  3: { // The Empress - Leonora Carrington
    primary: [
      { name: 'Demeter', type: 'Goddess', pantheon: 'Greek', connection: 'Fertility, nature' },
      { name: 'Freya', type: 'Goddess', pantheon: 'Norse', connection: 'Fertility, love' },
      { name: 'Gaia', type: 'Goddess', pantheon: 'Greek', connection: 'Earth, nature' }
    ],
    secondary: [
      { name: 'Persephone', type: 'Goddess', pantheon: 'Greek', connection: 'Seasons, growth' },
      { name: 'Brigid', type: 'Goddess', pantheon: 'Celtic', connection: 'Fertility, creativity' }
    ],
    realm: 'Doreen\'s Garden'
  },
  4: { // The Emperor - Rudolf Steiner
    primary: [
      { name: 'Zeus', type: 'God', pantheon: 'Greek', connection: 'Authority, order' },
      { name: 'Jupiter', type: 'God', pantheon: 'Roman', connection: 'Authority, structure' },
      { name: 'Odin', type: 'God', pantheon: 'Norse', connection: 'Wisdom, authority' }
    ],
    secondary: [
      { name: 'Ra', type: 'God', pantheon: 'Egyptian', connection: 'Solar authority' },
      { name: 'Marduk', type: 'God', pantheon: 'Mesopotamian', connection: 'Order, creation' }
    ],
    realm: 'Structured Authority'
  },
  5: { // The Hierophant - Crowley/Max Ernst
    primary: [
      { name: 'Chiron', type: 'Centaur', pantheon: 'Greek', connection: 'Teaching, healing' },
      { name: 'Thoth', type: 'God', pantheon: 'Egyptian', connection: 'Wisdom, teaching' },
      { name: 'Hermes', type: 'God', pantheon: 'Greek', connection: 'Communication, teaching' }
    ],
    secondary: [
      { name: 'Ganesha', type: 'God', pantheon: 'Hindu', connection: 'Wisdom, teaching' },
      { name: 'Saraswati', type: 'Goddess', pantheon: 'Hindu', connection: 'Knowledge, arts' }
    ],
    realm: 'The Tower on the Tor'
  },
  6: { // The Lovers - Dion Fortune
    primary: [
      { name: 'Aphrodite', type: 'Goddess', pantheon: 'Greek', connection: 'Love, union' },
      { name: 'Venus', type: 'Goddess', pantheon: 'Roman', connection: 'Love, beauty' },
      { name: 'Freya', type: 'Goddess', pantheon: 'Norse', connection: 'Love, fertility' }
    ],
    secondary: [
      { name: 'Eros', type: 'God', pantheon: 'Greek', connection: 'Love, desire' },
      { name: 'Cupid', type: 'God', pantheon: 'Roman', connection: 'Love, union' }
    ],
    realm: 'Sacred Union'
  },
  7: { // The Chariot - Paul Foster Case
    primary: [
      { name: 'Apollo', type: 'God', pantheon: 'Greek', connection: 'Direction, victory' },
      { name: 'Sol', type: 'God', pantheon: 'Roman', connection: 'Solar power, direction' },
      { name: 'Mithras', type: 'God', pantheon: 'Roman', connection: 'Victory, direction' }
    ],
    secondary: [
      { name: 'Thor', type: 'God', pantheon: 'Norse', connection: 'Strength, victory' },
      { name: 'Indra', type: 'God', pantheon: 'Hindu', connection: 'Victory, power' }
    ],
    realm: 'Dimensional Navigation'
  },
  8: { // Strength - Emma Kunz
    primary: [
      { name: 'Hercules', type: 'Hero', pantheon: 'Greek', connection: 'Strength, courage' },
      { name: 'Athena', type: 'Goddess', pantheon: 'Greek', connection: 'Inner strength, wisdom' },
      { name: 'Durga', type: 'Goddess', pantheon: 'Hindu', connection: 'Strength, protection' }
    ],
    secondary: [
      { name: 'Kali', type: 'Goddess', pantheon: 'Hindu', connection: 'Power, transformation' },
      { name: 'Sekhmet', type: 'Goddess', pantheon: 'Egyptian', connection: 'Strength, protection' }
    ],
    realm: 'Inner Power'
  },
  9: { // The Hermit - John Dee
    primary: [
      { name: 'Thoth', type: 'God', pantheon: 'Egyptian', connection: 'Wisdom, knowledge' },
      { name: 'Odin', type: 'God', pantheon: 'Norse', connection: 'Wisdom, solitude' },
      { name: 'Hermes Trismegistus', type: 'God', pantheon: 'Hermetic', connection: 'Hermetic wisdom' }
    ],
    secondary: [
      { name: 'Mercury', type: 'God', pantheon: 'Roman', connection: 'Communication, knowledge' },
      { name: 'Ganesha', type: 'God', pantheon: 'Hindu', connection: 'Wisdom, knowledge' }
    ],
    realm: 'Solitary Research'
  },
  10: { // Wheel of Fortune - Agrippa
    primary: [
      { name: 'Fortuna', type: 'Goddess', pantheon: 'Roman', connection: 'Fortune, cycles' },
      { name: 'Tyche', type: 'Goddess', pantheon: 'Greek', connection: 'Fortune, chance' },
      { name: 'Lakshmi', type: 'Goddess', pantheon: 'Hindu', connection: 'Fortune, abundance' }
    ],
    secondary: [
      { name: 'Nemesis', type: 'Goddess', pantheon: 'Greek', connection: 'Balance, cycles' },
      { name: 'Karma Deities', type: 'Collective', pantheon: 'Various', connection: 'Cycles, balance' }
    ],
    realm: 'Eternal Flux'
  },
  11: { // Justice - Paul Foster Case
    primary: [
      { name: 'Ma\'at', type: 'Goddess', pantheon: 'Egyptian', connection: 'Justice, balance' },
      { name: 'Themis', type: 'Goddess', pantheon: 'Greek', connection: 'Justice, order' },
      { name: 'Justitia', type: 'Goddess', pantheon: 'Roman', connection: 'Justice, law' }
    ],
    secondary: [
      { name: 'Dike', type: 'Goddess', pantheon: 'Greek', connection: 'Justice, moral order' },
      { name: 'Shamash', type: 'God', pantheon: 'Mesopotamian', connection: 'Justice, law' }
    ],
    realm: 'Balance'
  },
  12: { // The Hanged Man - Crowley
    primary: [
      { name: 'Odin', type: 'God', pantheon: 'Norse', connection: 'Sacrifice, wisdom' },
      { name: 'Prometheus', type: 'Titan', pantheon: 'Greek', connection: 'Sacrifice, knowledge' },
      { name: 'Christ', type: 'Deity', pantheon: 'Christian', connection: 'Sacrifice, redemption' }
    ],
    secondary: [
      { name: 'Attis', type: 'God', pantheon: 'Phrygian', connection: 'Sacrifice, rebirth' },
      { name: 'Osiris', type: 'God', pantheon: 'Egyptian', connection: 'Death, rebirth' }
    ],
    realm: 'Suspended Perspective'
  },
  13: { // Death - All (nigredo)
    primary: [
      { name: 'Anubis', type: 'God', pantheon: 'Egyptian', connection: 'Death, transformation' },
      { name: 'Hades', type: 'God', pantheon: 'Greek', connection: 'Underworld, transformation' },
      { name: 'Hel', type: 'Goddess', pantheon: 'Norse', connection: 'Death, transformation' }
    ],
    secondary: [
      { name: 'Persephone', type: 'Goddess', pantheon: 'Greek', connection: 'Death, rebirth' },
      { name: 'Yama', type: 'God', pantheon: 'Hindu', connection: 'Death, justice' }
    ],
    realm: 'Transformation'
  },
  14: { // Temperance - Carrington
    primary: [
      { name: 'Iris', type: 'Goddess', pantheon: 'Greek', connection: 'Rainbow, balance' },
      { name: 'Hestia', type: 'Goddess', pantheon: 'Greek', connection: 'Home, balance' },
      { name: 'Vesta', type: 'Goddess', pantheon: 'Roman', connection: 'Home, balance' }
    ],
    secondary: [
      { name: 'Brigid', type: 'Goddess', pantheon: 'Celtic', connection: 'Home, balance' },
      { name: 'Hestia', type: 'Goddess', pantheon: 'Greek', connection: 'Kitchen, balance' }
    ],
    realm: 'Alchemical Mixing'
  },
  15: { // The Devil - Crowley/Fortune
    primary: [
      { name: 'Pan', type: 'God', pantheon: 'Greek', connection: 'Nature, shadow' },
      { name: 'Baphomet', type: 'Deity', pantheon: 'Esoteric', connection: 'Balance, shadow' },
      { name: 'Loki', type: 'God', pantheon: 'Norse', connection: 'Trickster, shadow' }
    ],
    secondary: [
      { name: 'Set', type: 'God', pantheon: 'Egyptian', connection: 'Chaos, shadow' },
      { name: 'Satan', type: 'Deity', pantheon: 'Christian', connection: 'Shadow work' }
    ],
    realm: 'Shadow Work'
  },
  16: { // The Tower - John Dee
    primary: [
      { name: 'Zeus', type: 'God', pantheon: 'Greek', connection: 'Lightning, destruction' },
      { name: 'Thor', type: 'God', pantheon: 'Norse', connection: 'Thunder, destruction' },
      { name: 'Indra', type: 'God', pantheon: 'Hindu', connection: 'Lightning, revelation' }
    ],
    secondary: [
      { name: 'Shiva', type: 'God', pantheon: 'Hindu', connection: 'Destruction, transformation' },
      { name: 'Kali', type: 'Goddess', pantheon: 'Hindu', connection: 'Destruction, transformation' }
    ],
    realm: 'Destructive Awakening'
  },
  17: { // The Star - Emma Kunz
    primary: [
      { name: 'Astarte', type: 'Goddess', pantheon: 'Canaanite', connection: 'Stars, hope' },
      { name: 'Ishtar', type: 'Goddess', pantheon: 'Mesopotamian', connection: 'Stars, hope' },
      { name: 'Nut', type: 'Goddess', pantheon: 'Egyptian', connection: 'Stars, sky' }
    ],
    secondary: [
      { name: 'Aurora', type: 'Goddess', pantheon: 'Roman', connection: 'Dawn, hope' },
      { name: 'Eos', type: 'Goddess', pantheon: 'Greek', connection: 'Dawn, hope' }
    ],
    realm: 'Hope & Healing'
  },
  18: { // The Moon - Dion Fortune
    primary: [
      { name: 'Selene', type: 'Goddess', pantheon: 'Greek', connection: 'Moon, dreams' },
      { name: 'Luna', type: 'Goddess', pantheon: 'Roman', connection: 'Moon, intuition' },
      { name: 'Hecate', type: 'Goddess', pantheon: 'Greek', connection: 'Moon, magic' }
    ],
    secondary: [
      { name: 'Artemis', type: 'Goddess', pantheon: 'Greek', connection: 'Moon, nature' },
      { name: 'Diana', type: 'Goddess', pantheon: 'Roman', connection: 'Moon, nature' }
    ],
    realm: 'Dream Navigation'
  },
  19: { // The Sun - Rudolf Steiner
    primary: [
      { name: 'Apollo', type: 'God', pantheon: 'Greek', connection: 'Sun, light' },
      { name: 'Helios', type: 'God', pantheon: 'Greek', connection: 'Sun, radiance' },
      { name: 'Ra', type: 'God', pantheon: 'Egyptian', connection: 'Sun, life' }
    ],
    secondary: [
      { name: 'Sol', type: 'God', pantheon: 'Roman', connection: 'Sun, light' },
      { name: 'Surya', type: 'God', pantheon: 'Hindu', connection: 'Sun, vitality' }
    ],
    realm: 'Radiant Illumination'
  },
  20: { // Judgment - Paul Foster Case
    primary: [
      { name: 'Gabriel', type: 'Angel', pantheon: 'Abrahamic', connection: 'Judgment, awakening' },
      { name: 'Michael', type: 'Angel', pantheon: 'Abrahamic', connection: 'Judgment, protection' },
      { name: 'Raphael', type: 'Angel', pantheon: 'Abrahamic', connection: 'Healing, judgment' }
    ],
    secondary: [
      { name: 'Uriel', type: 'Angel', pantheon: 'Abrahamic', connection: 'Wisdom, judgment' },
      { name: 'Metatron', type: 'Angel', pantheon: 'Abrahamic', connection: 'Divine judgment' }
    ],
    realm: 'Awakening'
  },
  21: { // The World - All (rubedo)
    primary: [
      { name: 'Gaia', type: 'Goddess', pantheon: 'Greek', connection: 'Earth, completion' },
      { name: 'Terra', type: 'Goddess', pantheon: 'Roman', connection: 'Earth, wholeness' },
      { name: 'Prithvi', type: 'Goddess', pantheon: 'Hindu', connection: 'Earth, completion' }
    ],
    secondary: [
      { name: 'All Deities', type: 'Collective', pantheon: 'All', connection: 'Completion, wholeness' },
      { name: 'The All', type: 'Deity', pantheon: 'Universal', connection: 'Wholeness, completion' }
    ],
    realm: 'Completion'
  }
};

function getDeitiesForCharacter(arcanaNumber) {
  return CHARACTER_DEITIES[arcanaNumber] || {
    primary: [],
    secondary: [],
    realm: 'Unknown'
  };
}

async function generateDeitiesForAllCharacters() {
  console.log('🔮 Generating Gods and Goddesses for All Characters...\n');
  
  // Load character data
  const charactersPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'characters.json');
  const charactersData = JSON.parse(fs.readFileSync(charactersPath, 'utf-8'));
  
  const characterDeities = {};
  
  for (const character of charactersData.major_arcana) {
    const deities = getDeitiesForCharacter(character.number);
    characterDeities[character.number] = {
      character: {
        number: character.number,
        name: character.name,
        purityDesignation: character.purity_designation
      },
      realm: deities.realm,
      primaryDeities: deities.primary,
      secondaryDeities: deities.secondary,
      connections: deities.primary.map(d => d.connection)
    };
    
    console.log(`✅ ${character.name} (${character.number})`);
    console.log(`   Primary: ${deities.primary.map(d => d.name).join(', ')}`);
    console.log(`   Realm: ${deities.realm}`);
  }
  
  // Save to file
  const outputPath = path.join(rootDir, 'packages', 'godot-liber-arcanae', 'data', 'character-deities.json');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(characterDeities, null, 2), 'utf-8');
  
  console.log(`\n✅ All character deities generated!`);
  console.log(`   Saved to: ${outputPath}`);
  console.log(`   Total characters: ${Object.keys(characterDeities).length}`);
  
  return characterDeities;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateDeitiesForAllCharacters().catch(console.error);
}

export { getDeitiesForCharacter, generateDeitiesForAllCharacters, CHARACTER_DEITIES };
export default generateDeitiesForAllCharacters;

