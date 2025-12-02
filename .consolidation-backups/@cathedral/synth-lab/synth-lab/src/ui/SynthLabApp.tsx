import React, { useEffect, useState, useRef } from 'react';
import { SynthEngine } from '@cathedral/synth';
import { listFusionSets, computeFusionResonance, listCrystalIds } from '@cathedral/crystals';
import { archetypes } from '@cathedral/soul';

interface LivePatchInfo {
  id: string;
  name: string;
}

const synth = new SynthEngine();

export const SynthLabApp: React.FC = () => {
  const [patches, setPatches] = useState<LivePatchInfo[]>([]);
  const [selectedPatch, setSelectedPatch] = useState<string>('');
  const [fusionId, setFusionId] = useState<string>('');
  const [fusionData, setFusionData] = useState<any>(null);
  const [status, setStatus] = useState<string>('idle');
  const [audioReady, setAudioReady] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const fusions = listFusionSets();
  const crystals = listCrystalIds();

  useEffect(() => {
    setPatches(synth.listPatches() as LivePatchInfo[]);
  }, []);

  useEffect(() => {
    if (fusionId) {
      setFusionData(computeFusionResonance(fusionId));
    } else {
      setFusionData(null);
    }
  }, [fusionId]);

  function ensureAudio() {
    if (!audioCtxRef.current) {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      setAudioReady(true);
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }

  function handleRender() {
    ensureAudio();
    if (!selectedPatch) return;
    setStatus('rendering');
    const plan = synth.render({ patchId: selectedPatch, durationSeconds: 6 });
    setTimeout(() => setStatus(plan.ok ? 'render-complete' : 'error'), 200);
  }

  const creator = archetypes.creator;

  return (
    <div className="app-shell" style={{ display: 'grid', gridTemplateColumns: '280px 1fr 360px', gap: 18, padding: 18 }}>
      {/* Left: Patch & Fusion Selection */}
      <div className="panel scroll" style={{ minHeight: 0 }}>
        <h1>Synth Lab</h1>
        <h2>Patches</h2>
        <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
          {patches.map(p => (
            <button key={p.id} onClick={() => setSelectedPatch(p.id)} style={{ borderColor: selectedPatch === p.id ? '#6fb3ff' : '#3f556e' }}>
              {p.name}
            </button>
          ))}
        </div>
        <h2>Fusion Sets</h2>
        <select value={fusionId} onChange={e => setFusionId(e.target.value)} style={{ width: '100%', marginBottom: 12 }}>
          <option value="">(none)</option>
          {fusions.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
        <h2>Crystals</h2>
        <div className="mono" style={{ maxHeight: 120, overflow: 'auto', background:'#1b222d', padding:8, borderRadius:8 }}>
          {crystals.join(', ')}
        </div>
        <h2>Status</h2>
        <div className="mono" style={{ color: status.startsWith('render') ? '#9ec5ff' : '#ffd27f' }}>{status}</div>
        <button onClick={handleRender} disabled={!selectedPatch} style={{ marginTop: 18 }}>Render Plan</button>
        <button onClick={ensureAudio} style={{ marginTop: 8 }}>{audioReady ? 'Audio Ready' : 'Init Audio'}</button>
      </div>

      {/* Center: Visualization + Future Graph */}
      <div className="panel scroll" style={{ minHeight:0 }}>
        <h2>Patch Graph Plan</h2>
        {selectedPatch ? (
          <pre className="mono" style={{ background:'#1b222d', padding:12, borderRadius:12 }}>
            {JSON.stringify(synth.planGraph(selectedPatch), null, 2)}
          </pre>
        ) : <div>Select a patch.</div>}
        <h2>Fusion Resonance</h2>
        {fusionData ? (
          <pre className="mono" style={{ background:'#1b222d', padding:12, borderRadius:12 }}>
            {JSON.stringify(fusionData, null, 2)}
          </pre>
        ) : <div>No fusion selected.</div>}
        <h2>Archetype Color/Sound Sample (Creator)</h2>
        <div className="mono" style={{ background:'#1b222d', padding:12, borderRadius:12 }}>
          {JSON.stringify({ colorWavelength: creator.colorWavelength, soundFrequency: creator.soundFrequency }, null, 2)}
        </div>
      </div>

      {/* Right: Roadmap & Integration */}
      <div className="panel scroll" style={{ minHeight:0 }}>
        <h2>Integration Roadmap</h2>
        <ul style={{ marginTop:0, paddingLeft:18, lineHeight:1.5 }}>
          <li>AudioWorklet supersaw & granular engine</li>
            <li>Crystal-driven modulation matrix</li>
            <li>Archetype personality macro controls</li>
            <li>Live spectral analyzer + dynamic safety filter</li>
            <li>Patch morphing & session recall</li>
            <li>Polyrhythm clock & procedural pulse sculptor</li>
        </ul>
        <h2>Session Notes</h2>
        <textarea placeholder="Log ideas, resonances, patch inspirations..." style={{ width:'100%', height:160, background:'#1b222d', color:'#eef', border:'1px solid #314257', borderRadius:10, padding:10 }} />
      </div>
    </div>
  );
};
