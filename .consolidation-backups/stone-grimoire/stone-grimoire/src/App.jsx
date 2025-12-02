import React, { useState, useMemo } from 'react';
import CYOA from './components/CYOA.jsx';
import ArtGallery from './components/ArtGallery.jsx';
import GenerativeArt from './components/GenerativeArt.jsx';
import LabNavigator from './labs/LabNavigator.jsx';
import SoundLab from './labs/SoundLab.jsx';
import FractalLab from './labs/FractalLab.jsx';
import ResearchLab from './labs/ResearchLab.jsx';

// Legacy mapping to preserve previous route buttons if any external references still use them.
const legacyMap = {
  story: 'story-hall',
  gallery: 'art-gallery',
  generative: 'sigil-forge'
};

export default function App() {
  const [activeLab, setActiveLab] = useState('story-hall');

  // Provide a dynamic list so future labs can be added by editing the registry only.
  const labs = useMemo(() => ([
    { id: 'story-hall', title: 'Story Hall', component: <CYOA />, kind: 'narrative', desc: 'Choose-your-own-ascension narrative sequences.' },
    { id: 'art-gallery', title: 'Art Gallery', component: <ArtGallery />, kind: 'gallery', desc: 'Curated symbolic pieces & mythic sigils.' },
    { id: 'sigil-forge', title: 'Sigil Forge', component: <GenerativeArt />, kind: 'generative', desc: 'Procedural luminous geometry + archetypal forms.' },
    { id: 'harmonic-lab', title: 'Harmonic Lab', component: <SoundLab />, kind: 'sound', desc: 'Therapeutic modal drones & resonance experiments.' },
    { id: 'fractal-atelier', title: 'Fractal Atelier', component: <FractalLab />, kind: 'fractal', desc: 'Exploratory fractal parameter sketches (gentle).'},
    { id: 'research-archive', title: 'Research Archive', component: <ResearchLab />, kind: 'research', desc: 'Codex node excerpts & symbolic indices.' }
  ]), []);

  const active = labs.find(l => l.id === (legacyMap[activeLab] || activeLab)) || labs[0];

  return (
    <div className="grimoire-bg min-h-screen flex flex-col md:flex-row text-white">
      <aside className="w-full md:w-64 bg-[#0f1218]/90 border-r border-[#FFD700]/30 p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-[#FFD700] tracking-wide drop-shadow">Stone Grimoire</h1>
        <p className="text-xs leading-snug text-[#EDEBE6]/70">Renaissance revival engine: converging art, sound, archetype, and sacred computation into gentle exploratory labs.</p>
        <LabNavigator labs={labs} activeId={active.id} onSelect={setActiveLab} />
        <div className="mt-auto pt-4 text-[10px] opacity-60">
          <p>ND-safe & trauma-aware. Azure AI optional; graceful fallbacks engaged.</p>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-[#FFD700] mb-1 drop-shadow-sm">{active.title}</h2>
          <p className="text-xs text-[#EDEBE6]/70">{active.desc}</p>
        </div>
        <div className="rounded-lg bg-[#1a1e27]/70 shadow-xl border border-[#FFD700]/20 p-4">
          {active.component}
        </div>
      </main>
    </div>
  );
}
