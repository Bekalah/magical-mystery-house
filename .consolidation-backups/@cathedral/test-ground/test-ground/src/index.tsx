import React from 'react';
import ReactDOM from 'react-dom/client';
import { ColorScience } from '@cathedral/brain';
import { SoundScience } from '@cathedral/brain';
import { StyleFusion } from '@cathedral/brain';
import { archetypes, archetypeInterference } from '@cathedral/soul';
import { CollaborativeLab } from '@cathedral/labs';
import { listFusionSets, computeFusionResonance, listCrystalIds } from '@cathedral/crystals';
import { SynthEngine, mapFusionToPatchModifiers } from '@cathedral/synth';

const colorScience = new ColorScience();
const soundScience = new SoundScience();
const styleFusion = new StyleFusion();
const collabLab = new CollaborativeLab();
const synth = new SynthEngine();

function TestGround() {
  // Example: Color and sound fusion
  const creator = archetypes.creator;
  const transformer = archetypes.transformer;
  const color = colorScience.wavelengthToRGB(creator.colorWavelength);
  const sound = soundScience.harmonicSeries(creator.soundFrequency);
  const interference = archetypeInterference(creator, transformer, 0.5);
  const fusionList = listFusionSets();
  const firstFusion = fusionList[0];
  const fusionResult = firstFusion ? computeFusionResonance(firstFusion.id) : null;
  const fusionModifiers = firstFusion ? mapFusionToPatchModifiers(firstFusion.id, { listFusionSets, computeFusionResonance }) : null;
  const crystalIds = listCrystalIds();

  return (
    <div style={{ padding: 32 }}>
      <h1>Cathedral Test Ground</h1>
      <h2>ColorScience (Creator):</h2>
      <pre>{JSON.stringify(color, null, 2)}</pre>
      <h2>SoundScience (Creator):</h2>
      <pre>{JSON.stringify(sound, null, 2)}</pre>
      <h2>Archetype Interference (Creator vs Transformer):</h2>
      <pre>{JSON.stringify(interference, null, 2)}</pre>
      <h2>Collaborative Lab Canvas:</h2>
      <div>{collabLab.sharedFrequencyCanvas() ? 'Canvas Ready' : 'Not Ready'}</div>
      <h2>StyleFusion Golden Ratio Points:</h2>
      <pre>{JSON.stringify(styleFusion.goldenRatioComposition(800, 600), null, 2)}</pre>
      <h2>Crystal Fusion Sets:</h2>
      <pre>{JSON.stringify(fusionList, null, 2)}</pre>
      <h2>First Fusion Resonance:</h2>
      <pre>{JSON.stringify(fusionResult, null, 2)}</pre>
  <h2>Fusion → Synth Mod Suggestions:</h2>
  <pre>{JSON.stringify(fusionModifiers, null, 2)}</pre>
      <h2>Available Crystal IDs:</h2>
      <pre>{JSON.stringify(crystalIds, null, 2)}</pre>
      <h2>Synth Patch List:</h2>
      <pre>{JSON.stringify(synth.listPatches(), null, 2)}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<TestGround />);
