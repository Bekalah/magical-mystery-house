/**
 * CATHEDRAL OF CIRCUITS
 * 
 * Not flat. Not boxed. Not cartoony.
 * Depth. Layers. Dimensionality.
 * 
 * The RPG is here - but it looks like art, not a mobile game.
 */

import { useState } from 'react';
import { CathedralExperience } from './components/CathedralExperience';
import { CathedralRPG } from './components/CathedralRPG';
import './styles/cathedral-couture.css';

type AppMode = 'experience' | 'rpg';

function App() {
  const [mode, setMode] = useState<AppMode>('experience');

  // Mode switcher - minimal, not buttons
  const ModeNav = () => (
    <div style={{
      position: 'fixed',
      top: 'var(--space-flow, 2rem)',
      left: 'var(--space-flow, 2rem)',
      zIndex: 200,
      display: 'flex',
      gap: '2rem'
    }}>
      <button
        onClick={() => setMode('experience')}
        style={{
          all: 'unset',
          cursor: 'pointer',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: mode === 'experience' 
            ? 'rgba(255,255,255,0.9)' 
            : 'rgba(255,255,255,0.4)',
          transition: 'color 0.4s ease',
          borderBottom: mode === 'experience' 
            ? '1px solid rgba(184,134,11,0.5)' 
            : '1px solid transparent'
        }}
      >
        Experience
      </button>
      <button
        onClick={() => setMode('rpg')}
        style={{
          all: 'unset',
          cursor: 'pointer',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: mode === 'rpg' 
            ? 'rgba(255,255,255,0.9)' 
            : 'rgba(255,255,255,0.4)',
          transition: 'color 0.4s ease',
          borderBottom: mode === 'rpg' 
            ? '1px solid rgba(184,134,11,0.5)' 
            : '1px solid transparent'
        }}
      >
        Journey
      </button>
    </div>
  );

  return (
    <>
      <ModeNav />
      {mode === 'experience' && <CathedralExperience />}
      {mode === 'rpg' && <CathedralRPG />}
    </>
  );
}

export default App;
