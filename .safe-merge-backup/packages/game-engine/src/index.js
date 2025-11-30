/**
 * 🏛️✨ CATHEDRAL OF CIRCUITS - GAME ENGINE ENTRY POINT
 *
 * Native ES module exports for your Guild Wars-style RPG engine
 * Integrates with your authentic Codex 144:99 system
 *
 * @architecture Native ES Modules
 * @game_authentic Your real Guild Wars-style RPG
 */

export { CodexGameEngine } from './CodexGameEngine.js';
export { CodexNodeManager } from './CodexNodeManager.js';
export { ArcanaeCharacterSystem } from './ArcanaeCharacterSystem.js';
export { SacredGeometryRenderer } from './SacredGeometryRenderer.js';
export { AudioSynthesisEngine } from './AudioSynthesisEngine.js';
export { TraumaSafeGameState } from './TraumaSafeGameState.js';

// Convenience function to create a new game instance
export async function createCathedralGame() {
  const game = new CodexGameEngine();
  await game.initialize();
  return game;
}

// Quick start function for your Royal Initiate Path
export async function startRoyalInitiatePath() {
  const game = await createCathedralGame();
  const gameStart = await game.startGame();

// console.log('🎮 Royal Initiate Path started!');
// console.log(`👤 Character: ${gameStart.character.name}`);
// console.log(`🌟 Starting Node: ${gameStart.startingNode.name}`);
// console.log('🛡️ Trauma-safe progression active');

  return game;
}
