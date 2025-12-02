import React from 'react';

export default function LabNavigator({ labs, activeId, onSelect }) {
  return (
    <nav className="flex flex-col gap-2">
      {labs.map(lab => (
        <button
          key={lab.id}
          onClick={() => onSelect(lab.id)}
          className={`text-left px-3 py-2 rounded border transition-colors text-xs font-semibold tracking-wide ${activeId === lab.id ? 'bg-[#FFD700] text-[#1a1e27] border-[#FFD700]' : 'bg-[#222834] hover:bg-[#2d3442] border-[#FFD700]/30 text-[#EDEBE6]'}`}
          aria-current={activeId === lab.id ? 'page' : undefined}
        >
          <span className="block leading-tight">{lab.title}</span>
          <span className="block text-[10px] opacity-60 font-normal">{lab.kind}</span>
        </button>
      ))}
    </nav>
  );
}
