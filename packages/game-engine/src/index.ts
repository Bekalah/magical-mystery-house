/**
 * @package @cathedral/game-engine
 */

export const PACKAGE_NAME = 'game-engine';
export const VERSION = '1.0.0';

// Export RPG Tech
export * from './RPGTech';
export { RPGTech, createRPGCharacter, CANON_BOONS, REAL_STORIES } from './RPGTech';
export type { Character, CharacterData, Quest, CanonBoon, RealStory, CharacterStats } from './RPGTech';

// Export placeholder to prevent empty module errors
export default {
  name: PACKAGE_NAME,
  version: VERSION
};
