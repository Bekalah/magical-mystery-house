import React, { useEffect, useState } from 'react';

export default function ResearchLab() {
  const [codexPreview, setCodexPreview] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/data/codex.144_99.json');
        if (!res.ok) throw new Error('Failed to load codex');
        const json = await res.json();
        const nodes = Array.isArray(json?.nodes) ? json.nodes.slice(0, 10) : [];
        if (!cancelled) setCodexPreview(nodes);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-[#EDEBE6]/70 max-w-prose">Research Archive: sampling codex nodes for cross-lab narrative mapping. (Showing first 10 nodes if present.)</p>
      {error && <div className="text-red-400 text-xs">{error}</div>}
      <ul className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2">
        {codexPreview.map((n, i) => (
          <li key={i} className="bg-[#222834]/60 border border-[#FFD700]/20 rounded p-2">
            <div className="font-semibold text-[#FFD700] truncate">{n.title || n.id || 'Untitled'}</div>
            {n.archetype && <div className="text-[10px] opacity-70">{n.archetype}</div>}
          </li>
        ))}
        {!error && !codexPreview.length && <li className="text-[#EDEBE6]/50 text-xs">No codex nodes loaded.</li>}
      </ul>
    </div>
  );
}
