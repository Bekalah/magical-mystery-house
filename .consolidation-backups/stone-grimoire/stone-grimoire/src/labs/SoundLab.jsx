import React, { useState, useRef } from 'react';
import * as Tone from 'tone';

const MODES = [
  { id: 'aeolian', label: 'Aeolian (Healing)', intervals: [0,2,3,5,7,8,10] },
  { id: 'dorian', label: 'Dorian (Balanced)', intervals: [0,2,3,5,7,9,10] },
  { id: 'lydian', label: 'Lydian (Uplift)', intervals: [0,2,4,6,7,9,11] },
  { id: 'phrygian', label: 'Phrygian (Inner)', intervals: [0,1,3,5,7,8,10] }
];

function buildScale(rootMidi, intervals) {
  return intervals.map(i => Tone.Frequency(rootMidi + i, 'midi').toNote());
}

export default function SoundLab() {
  const [mode, setMode] = useState('aeolian');
  const [root, setRoot] = useState('C4');
  const [running, setRunning] = useState(false);
  const synthRef = useRef(null);
  const loopRef = useRef(null);

  const currentMode = MODES.find(m => m.id === mode);

  async function start() {
    await Tone.start();
    if (!synthRef.current) {
      synthRef.current = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.4, decay: 0.3, sustain: 0.5, release: 2 }
      }).toDestination();
    }
    const rootFreq = Tone.Frequency(root).toMidi();
    const scale = buildScale(rootFreq, currentMode.intervals);

    let step = 0;
    if (!loopRef.current) {
      loopRef.current = new Tone.Loop(time => {
        const note = scale[step % scale.length];
        synthRef.current.triggerAttackRelease(note, '2n', time, 0.4);
        step++;
      }, '1n');
    }
    loopRef.current.start(0);
    Tone.Transport.start();
    setRunning(true);
  }

  function stop() {
    Tone.Transport.stop();
    if (loopRef.current) loopRef.current.stop();
    setRunning(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-[#EDEBE6]/70 max-w-prose">Gentle therapeutic drone generator. Modes map to emotional / archetypal qualities. Built to remain ND-safe (no sudden spikes).</p>
      <div className="flex flex-wrap gap-2">
        <select value={mode} onChange={e => setMode(e.target.value)} className="bg-[#222834] border border-[#FFD700]/30 rounded px-2 py-1 text-xs">
          {MODES.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
        <select value={root} onChange={e => setRoot(e.target.value)} className="bg-[#222834] border border-[#FFD700]/30 rounded px-2 py-1 text-xs">
          {['C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4'].map(n => <option key={n}>{n}</option>)}
        </select>
        {!running && <button onClick={start} className="bg-[#FFD700] text-[#1a1e27] px-3 py-1 rounded text-xs font-semibold hover:bg-[#9370DB] transition-colors">Start</button>}
        {running && <button onClick={stop} className="bg-[#9370DB] text-white px-3 py-1 rounded text-xs font-semibold hover:bg-[#FFD700] hover:text-[#1a1e27] transition-colors">Stop</button>}
      </div>
    </div>
  );
}
