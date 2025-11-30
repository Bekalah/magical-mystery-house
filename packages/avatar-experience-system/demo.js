/**
 * 🌟🃏🔥 AVATAR EXPERIENCE SYSTEM DEMO
 *
 * Demonstration showing how each Major Arcana avatar generates completely different experiences
 * across 5 modes with unique organic fractals
 */

import AvatarExperienceSystem from './src/index.js';

async function runAvatarExperienceDemo() {
  console.log('🌟🃏🔥 AVATAR EXPERIENCE SYSTEM DEMO\n');
  console.log('🎭 22 Major Arcana Avatars • 5 Experience Modes • Unique Organic Fractals\n');

  const system = new AvatarExperienceSystem();
  await system.initialize();

  // Demo different avatars to show uniqueness
  const avatarsToTest = [
    '0_fool',
    '1_magician',
    '2_high_priestess',
    '3_empress',
    '19_sun',
    '21_world'
  ];

  const modes = ['game', 'teacher', 'design', 'art-science', 'music'];

  for (const avatarId of avatarsToTest) {
    console.log(`\n🎭 Testing Avatar: ${avatarId.toUpperCase()}`);
    console.log('='.repeat(60));

    for (const mode of modes) {
      try {
        console.log(`\n🌟 ${mode.toUpperCase()} MODE:`);

        const experience = await system.startAvatarExperience(avatarId, mode);

        // Show unique fractal signature
        console.log(`   🌀 Unique Fractal: ${experience.fractal.uniqueSignature}`);

        // Show organic elements
        const organic = experience.fractal.organicParameters;
        console.log(`   🌱 Growth Pattern: ${organic.growthPattern.vectors.length} growth vectors`);
        console.log(`   💧 Fluid Dynamics: ${organic.fluidDynamics.flowPattern}`);
        console.log(`   💎 Crystal Structure: ${organic.crystallineStructure.symmetry}-fold symmetry`);

        // Show elemental fusion
        const fusion = experience.fractal.elementalFusion;
        console.log(`   ⚗️ Elemental Fusion: ${fusion.primaryElement} + ${fusion.secondaryElement} -> ${fusion.resultingElement}`);
        console.log(`   🔮 Fusion Method: ${fusion.fusionMethod}`);

        // Show consciousness signature
        const consciousness = experience.fractal.consciousnessSignature;
        console.log(`   🧠 Awareness Layers: ${consciousness.awarenessLayers}`);
        console.log(`   🌌 Unity Index: ${consciousness.unity.value}`);

        // Show mode-specific experience
        const exp = experience.experience;
        console.log(`   🎮 Unique Elements: ${Object.keys(exp.uniqueElements).join(', ')}`);

        // Show visual representation sample
        console.log(`   🎨 Fractal SVG Size: ${experience.fractal.visual.svg.length} chars`);

        system.endExperience();

      } catch (error) {
        console.log(`   ❌ Error in ${mode} mode: ${error.message}`);
      }
    }
  }

  // Show experience history
  console.log('\n📊 EXPERIENCE HISTORY SUMMARY');
  console.log('='.repeat(60));

  const history = system.getExperienceHistory();
  const summary = {};

  history.forEach(exp => {
    const key = `${exp.avatar.name}_${exp.mode}`;
    summary[key] = (summary[key] || 0) + 1;
  });

  Object.entries(summary).forEach(([key, count]) => {
    console.log(`🎭 ${key}: ${count} experiences`);
  });

  console.log(`\n📈 Total Experiences: ${history.length}`);
  console.log('🌟 Each experience generates completely unique organic fractals!');
  console.log('🎨 Visual fractal patterns that adapt to consciousness');
  console.log('🔊 Audio fractals based on solfeggio frequencies');
  console.log('👐 Interactive elements responding to awareness');
  console.log('🎵 Consciousness-driven music compositions');
  console.log('🎮 Organic AI adapting to personality traits');
}

runAvatarExperienceDemo().catch(console.error);
