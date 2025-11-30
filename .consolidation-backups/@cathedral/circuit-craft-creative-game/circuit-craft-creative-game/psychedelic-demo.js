/**
 * 🌈🧠🌀 TIMOTHY LEARY CIRCUIT CRAFT: PSYCHEDELIC RPG DEMO
 *
 * Demonstration showing CircuitCraft as a consciousness-expanding RPG adventure
 * combining Fable-style moral choices, Witcher-depth narratives, real scientific research,
 * and visionary art realm experiences.
 */

import CircuitCraftGame from './src/index.js';
import TimothyLearyArchetypeAdventure from './src/timothyLeary-adventure.js';

async function runTimothyLearyPsychedelicDemo() {
  console.log('🌈🧠🌀 TIMOTHY LEARY CIRCUIT CRAFT: PSYCHEDELIC ARCHETYPE QUEST');
  console.log('🎭 Like Fable meets most trippy consciousness expansion adventures');
  console.log('📚 Real books • Quantum physics • Archetype psychology • Visionary art realms\n');

  // Initialize the consciousness-powered construction game
  const circuitCraft = new CircuitCraftGame();
  await circuitCraft.initialize();

  // Initialize Timothy Leary's archetype adventure system
  const learyAdventure = new TimothyLearyArchetypeAdventure(circuitCraft);

  console.log('🎭 Character created with base consciousness level:', learyAdventure.player.consciounessLevel);

  // Begin the consciousness expansion journey
  console.log('\n🚀 STARTING INITIATION QUEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const initiationQuest = await learyAdventure.beginPsychedelicQuest('initiation');
  console.log('\n🔍 Consulting wisdom before making choice...');

  // Consult real books for guidance
  await learyAdventure.consultRealBook('consciousness_expansion_models');
  await learyAdventure.consultRealBook('jungian_archetypes');

  console.log('\n🎯 Faced with first moral choice...');

  // Make choice that shapes consciousness evolution
  const choiceResult = await learyAdventure.makeMoralChoice(0); // Choose infinite chaos
  console.log('\n🌟 Consciousness Level after choice:', learyAdventure.player.consciounessLevel);
  console.log('⚖️ Moral Alignment:', JSON.stringify(learyAdventure.player.moralAlignment, null, 2));

  // Experience psychedelic vision in the chosen realm
  console.log('\n🌈 Triggers psychedelic experience...');

  // Complete initiation and start archetype exploration
  console.log('\n🏆 COMPLETING INITIATION QUEST');
  const initiationCompletion = learyAdventure.completeAdventure();

  console.log('\n🚀 BEGINNING ARCHETYPE EXPLORATION QUEST');

  // Start deep archetype exploration
  const archetypeQuest = await learyAdventure.beginPsychedelicQuest('archetype-exploration');
  console.log('\n🔍 Consulting psychological research...');

  // Study relevant materials
  await learyAdventure.consultRealBook('jungian_analytical_psychology');
  await learyAdventure.consultRealBook('consciousness_mapping');

  console.log('\n🎯 Making archetypal integration choice...');

  // Choose to merge with archetype consciousness
  const archetypeChoice = await learyAdventure.makeMoralChoice(0);
  console.log('\n🌟 Consciousness Level after archetype integration:', learyAdventure.player.consciounessLevel);
  console.log('🏛️ Archetype Resonance:', JSON.stringify(learyAdventure.player.archetypeResonance, null, 2));

  // Complete archetype exploration
  const archetypeCompletion = learyAdventure.completeAdventure();

  console.log('\n🚀 ENTERING MORAL DILEMMA REALM');

  // Face serious consciousness dilemma
  const moralQuest = await learyAdventure.beginPsychedelicQuest('moral-dilemma');
  console.log('\n🔍 Researching ethics and consciousness...');

  // Consult philosophical texts
  await learyAdventure.consultRealBook('moral_philosophy');
  console.log('\n📖 Camuss insight boosted consciousness by levels');

  console.log('\n🎯 Confronting liberation vs conformity dilemma...');

  // Choose consciousness liberation
  const moralChoice = await learyAdventure.makeMoralChoice(1); // Rebel for liberation
  console.log('\n🌟 Consciousness Level after moral breakthrough:', learyAdventure.player.consciounessLevel);
  console.log('⚡ Reality Bending Capability:', (learyAdventure.player.realityBendingCapability * 100).toFixed(1) + '%');

  // Build symbol of liberation through construction
  console.log('\n🏗️ Building symbol of consciousness liberation...');
  await circuitCraft.initiateThoughtStream('transformation', learyAdventure.player.consciounessLevel / 12);

  console.log('\n🌈 MAXIMUM PSYCHEDELIC EXPERIENCE TRIGGERED');
  console.log('\n🌅 QUANTUM BREAKTHROUGH ACHIEVED');

  // Complete moral dilemma
  const moralCompletion = learyAdventure.completeAdventure();

  console.log('\n🚀 ENTERING QUANTUM REALITY NAVIGATION');

  // Explore quantum consciousness
  const quantumQuest = await learyAdventure.beginPsychedelicQuest('quantum-reality-bend');
  console.log('\n🔍 Studying quantum mechanics...');

  await learyAdventure.consultRealBook('quantum_mechanics');
  console.log('\n⚛️ Bohms implicate order revealed!');

  console.log('\n🎯 Choosing between observation and creation...');

  // Choose quantum creation
  const quantumChoice = await learyAdventure.makeMoralChoice(0);
  console.log('\n🌟 Consciousness Level after quantum creation:', learyAdventure.player.consciounessLevel);
  console.log('🌌 Reality Bending Capability:', (learyAdventure.player.realityBendingCapability * 100).toFixed(1) + '%');

  // Build quantum reality structure
  console.log('\n🏗️ Constructing multi-dimensional quantum reality anchor...');
  await circuitCraft.createMultiDimensionalStructure(
    { x: 0, y: 0, z: 10 },
    ['wave-space', 'particle-space', 'consciousness-space'],
    ['1_magician', '21_world']
  );

  // Complete quantum quest
  const quantumCompletion = learyAdventure.completeAdventure();

  console.log('\n🚀 ENTERING VISIONARY ART REALM');

  // Experience visionary art ecstasy
  const artQuest = await learyAdventure.beginPsychedelicQuest('visionary-art-realm');
