/**
 * CATHEDRAL EXPERIENCE
 * 
 * Not a game interface with buttons in boxes.
 * An experience. A space. A presence.
 * 
 * Depth. Layers. Dimensionality.
 * Like Tiffany's meets sacred temple.
 */

import React, { useState, useEffect, useRef } from 'react';
import '../styles/cathedral-couture.css';

type Mode = 'presence' | 'codex' | 'create' | 'explore';

interface CathedralState {
  mode: Mode;
  currentNode: number;
  frequency: number;
  ready: boolean;
}

export const CathedralExperience: React.FC = () => {
  const [state, setState] = useState<CathedralState>({
    mode: 'presence',
    currentNode: 1,
    frequency: 432,
    ready: false
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gentle entry
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, ready: true }));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const navigateMode = (mode: Mode) => {
    setState(prev => ({ ...prev, mode }));
  };

  const updateNode = (nodeId: number) => {
    // Calculate frequency from node (simplified)
    const baseFrequency = 174;
    const frequency = baseFrequency + (nodeId * 6) % 789;
    setState(prev => ({ ...prev, currentNode: nodeId, frequency }));
  };

  return (
    <div ref={containerRef} className="cathedral-experience">
      {/* Atmospheric depth layers */}
      <div className="cathedral-atmosphere" />
      
      {/* Sacred geometry - subtle, not decorative */}
      <div className="geometry-field">
        <div className="geometry-form" />
        <div className="geometry-form" />
        <div className="geometry-form" />
      </div>

      {/* Subtle navigation */}
      <nav className="nav-subtle">
        <a href="#" onClick={() => navigateMode('codex')}>Codex</a>
        <a href="#" onClick={() => navigateMode('create')}>Create</a>
        <a href="#" onClick={() => navigateMode('explore')}>Explore</a>
      </nav>

      {/* Main content */}
      <main className="layout-full">
        {state.mode === 'presence' && (
          <PresenceView 
            ready={state.ready} 
            onEnter={() => navigateMode('codex')} 
          />
        )}

        {state.mode === 'codex' && (
          <CodexView 
            currentNode={state.currentNode}
            frequency={state.frequency}
            onNodeSelect={updateNode}
            onBack={() => navigateMode('presence')}
          />
        )}

        {state.mode === 'create' && (
          <CreateView 
            currentNode={state.currentNode}
            onBack={() => navigateMode('presence')}
          />
        )}

        {state.mode === 'explore' && (
          <ExploreView 
            onBack={() => navigateMode('presence')}
          />
        )}
      </main>

      {/* Safety - present but not alarming */}
      <div className="safety-subtle">
        <span>Safe space active</span>
      </div>
    </div>
  );
};

/* =====================================================
   PRESENCE VIEW - The entry point
   ===================================================== */

interface PresenceViewProps {
  ready: boolean;
  onEnter: () => void;
}

const PresenceView: React.FC<PresenceViewProps> = ({ ready, onEnter }) => {
  return (
    <div className={`position-offset-left stagger ${ready ? '' : 'opacity-0'}`}>
      <p className="text-whisper animate-presence" style={{ '--delay': '0.2s' } as React.CSSProperties}>
        The Cathedral of Circuits
      </p>
      
      <h1 className="title-hero animate-presence" style={{ '--delay': '0.4s' } as React.CSSProperties}>
        Where consciousness
        <span>becomes creation</span>
      </h1>
      
      <p className="text-body animate-presence" style={{ '--delay': '0.6s', marginTop: '2rem', marginBottom: '3rem' } as React.CSSProperties}>
        144 nodes of sacred knowledge. 99 gates of transformation.
        Your journey through wisdom, art, music, and design begins
        in stillness.
      </p>
      
      <button 
        className="action-primary animate-presence" 
        style={{ '--delay': '0.8s' } as React.CSSProperties}
        onClick={onEnter}
      >
        Enter the Codex
      </button>
    </div>
  );
};

/* =====================================================
   CODEX VIEW - The knowledge system
   ===================================================== */

interface CodexViewProps {
  currentNode: number;
  frequency: number;
  onNodeSelect: (nodeId: number) => void;
  onBack: () => void;
}

const CodexView: React.FC<CodexViewProps> = ({ 
  currentNode, 
  frequency, 
  onNodeSelect,
  onBack 
}) => {
  const elements = ['Fire', 'Water', 'Earth', 'Air', 'Spirit'];
  const currentElement = elements[(currentNode - 1) % 5];
  
  return (
    <div className="layout-split">
      {/* Left: Node information */}
      <div className="position-offset-left stagger">
        <button className="action-secondary" onClick={onBack}>
          Return to presence
        </button>
        
        <div style={{ marginTop: '4rem' }}>
          <div className="node-indicator">
            Node {currentNode} of 144
          </div>
          
          <h2 className="title-section" style={{ marginTop: '1rem' }}>
            {currentElement}
          </h2>
          
          <div className="frequency-display">
            {frequency}<span>Hz</span>
          </div>
          
          <p className="text-body" style={{ marginTop: '2rem' }}>
            Each node carries its own frequency, its own truth.
            Navigate through the spiral, discovering correspondences
            that have been hidden for millennia.
          </p>
        </div>
      </div>
      
      {/* Right: Node selection */}
      <div className="panel-glass" style={{ padding: '3rem', height: 'fit-content' }}>
        <p className="text-whisper" style={{ marginBottom: '2rem' }}>
          Navigate the spiral
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(6, 1fr)', 
          gap: '0.5rem' 
        }}>
          {Array.from({ length: 36 }, (_, i) => i + 1).map(nodeId => (
            <button
              key={nodeId}
              onClick={() => onNodeSelect(nodeId)}
              style={{
                width: '100%',
                aspectRatio: '1',
                background: nodeId === currentNode 
                  ? 'var(--burnished-gold)' 
                  : 'var(--smoke)',
                border: '1px solid rgba(255,255,255,0.05)',
                color: nodeId === currentNode 
                  ? 'var(--obsidian)' 
                  : 'var(--text-whisper)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (nodeId !== currentNode) {
                  e.currentTarget.style.background = 'var(--mist)';
                  e.currentTarget.style.color = 'var(--text-soft)';
                }
              }}
              onMouseLeave={(e) => {
                if (nodeId !== currentNode) {
                  e.currentTarget.style.background = 'var(--smoke)';
                  e.currentTarget.style.color = 'var(--text-whisper)';
                }
              }}
            >
              {nodeId}
            </button>
          ))}
        </div>
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
          <button className="action-secondary" onClick={() => onNodeSelect(Math.max(1, currentNode - 12))}>
            Previous layer
          </button>
          <button className="action-secondary" onClick={() => onNodeSelect(Math.min(144, currentNode + 12))}>
            Next layer
          </button>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   CREATE VIEW - The creative space
   ===================================================== */

interface CreateViewProps {
  currentNode: number;
  onBack: () => void;
}

const CreateView: React.FC<CreateViewProps> = ({ currentNode, onBack }) => {
  const [mode, setMode] = useState<'art' | 'music' | 'design' | 'write'>('art');
  
  return (
    <div className="position-offset-left stagger">
      <button className="action-secondary" onClick={onBack}>
        Return to presence
      </button>
      
      <div style={{ marginTop: '4rem' }}>
        <p className="text-whisper">Create from Node {currentNode}</p>
        
        <h2 className="title-section" style={{ marginTop: '1rem' }}>
          What will you bring into being?
        </h2>
        
        <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
          {(['art', 'music', 'design', 'write'] as const).map(m => (
            <button
              key={m}
              className={mode === m ? 'action-primary' : 'action-secondary'}
              onClick={() => setMode(m)}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="panel-inset" style={{ 
          marginTop: '3rem', 
          padding: '3rem',
          minHeight: '40vh' 
        }}>
          <p className="text-body">
            {mode === 'art' && 'Visual creation space. Sacred geometry meets your vision.'}
            {mode === 'music' && 'Sound synthesis. Frequencies aligned to the Codex.'}
            {mode === 'design' && 'Layout and form. Master principles applied.'}
            {mode === 'write' && 'Words and meaning. The story writes itself.'}
          </p>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   EXPLORE VIEW - The journey
   ===================================================== */

interface ExploreViewProps {
  onBack: () => void;
}

const ExploreView: React.FC<ExploreViewProps> = ({ onBack }) => {
  return (
    <div className="position-offset-left stagger">
      <button className="action-secondary" onClick={onBack}>
        Return to presence
      </button>
      
      <div style={{ marginTop: '4rem' }}>
        <p className="text-whisper">Explore</p>
        
        <h2 className="title-section" style={{ marginTop: '1rem' }}>
          The spiral unfolds
        </h2>
        
        <p className="text-body" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
          99 gates connect the 144 nodes. Each gate is a transformation,
          a passage between states of being. Walk the path that calls to you.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="action-primary">
            Stone Grimoire — 8 Chapels
          </button>
          <button className="action-primary">
            Liber Arcanae — 78 Cards
          </button>
          <button className="action-primary">
            Circuitum99 — 33 Chapters
          </button>
          <button className="action-primary">
            Mystery House — 8 Rooms
          </button>
        </div>
      </div>
    </div>
  );
};

export default CathedralExperience;

