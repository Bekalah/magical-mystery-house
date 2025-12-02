// Minimal adaptive sound kernel skeleton (no external deps yet)
// Provides: registerMotif, selectMotifByEnergy, planLayers
const motifs = new Map();

export function registerMotif(def){
  if(!def || !def.id) throw new Error('motif def requires id');
  motifs.set(def.id, def);
}

export function loadAudioMap(map){
  if(map?.motifs){ map.motifs.forEach(m=>registerMotif(m)); }
  return motifs.size;
}

export function selectMotifByEnergy(energy=0){
  const list = [...motifs.values()].filter(m=>{
    if(!Array.isArray(m.energy)) return true;
    const [lo,hi] = m.energy; return energy >= lo && energy <= hi;
  });
  if(!list.length) return null;
  return list[ energy % list.length ];
}

export function planLayers(motif){
  if(!motif) return [];
  const base = motif.palette || [];
  // simple expansion rule
  return base.map((id,i)=>({ layer:i, instrument:id, gain: 0.6 - i*0.1 }));
}

export function adaptiveState(node){
  // Node enriched with music.* from codex enrichment
  const e = node?.music?.energy_hint || 0;
  const selected = selectMotifByEnergy(e) || { id:'fallback', palette:['soft_pad']};
  return { motif: selected.id, layers: planLayers(selected) };
}
