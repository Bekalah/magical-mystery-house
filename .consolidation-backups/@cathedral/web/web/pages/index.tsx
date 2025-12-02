import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import heavy libraries to avoid SSR issues
const ThreeJSNodeLab = dynamic(() => import('../components/ThreeJSNodeLab'), { ssr: false });
const P5JSNodeLab = dynamic(() => import('../components/P5JSNodeLab'), { ssr: false });
const BabylonJSNodeLab = dynamic(() => import('../components/BabylonJSNodeLab'), { ssr: false });
const ToneJSNodeLab = dynamic(() => import('../components/ToneJSNodeLab'), { ssr: false });

// Import our Avalon system
import { MorganLeFay, AvalonRealmEngine, TarotCreatureSystem, AvalonNodeIntegration, NodeUtils } from '@cathedral/core';

export default function AvalonLabs() {
  const [morganLeFay] = useState(() => new MorganLeFay());
  const [avalonEngine] = useState(() => new AvalonRealmEngine(morganLeFay));
  const [tarotCreatureSystem] = useState(() => new TarotCreatureSystem(morganLeFay, avalonEngine));
  const [nodeIntegration] = useState(() => new AvalonNodeIntegration(morganLeFay, avalonEngine, tarotCreatureSystem));

  const [activeLab, setActiveLab] = useState('overview');
  const [selectedNode, setSelectedNode] = useState(1);
  const [nodeExperience, setNodeExperience] = useState(null);
  const [availableNodes, setAvailableNodes] = useState([]);

  useEffect(() => {
    // Load available nodes on component mount
    const nodes = NodeUtils.getAllNodes(nodeIntegration);
    setAvailableNodes(nodes);
  }, [nodeIntegration]);

  const exploreNode = (nodeId: number) => {
    const experience = NodeUtils.generateNodeExperience(
      nodeId,
      morganLeFay,
      avalonEngine,
      tarotCreatureSystem,
      nodeIntegration
    );
    setNodeExperience(experience);
    setSelectedNode(nodeId);
  };

  const getMorganTeaching = () => {
    return morganLeFay.getLivingTeaching('general');
  };

  return (
    <>
      <Head>
        <title>Morgan Le Fay Avalon Labs | Codex 144:99 Integration</title>
        <meta name="description" content="Interactive Avalon realms with Dion Fortune visionary art and Ronald Hutton earth wisdom" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 100%)',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Header */}
        <header style={{
          padding: '2rem',
          textAlign: 'center',
          borderBottom: '2px solid #8b5a8c',
          background: 'rgba(20, 10, 30, 0.8)'
        }}>
          <h1 style={{
            fontSize: '3rem',
            margin: '0 0 1rem 0',
            background: 'linear-gradient(135deg, #ffd700, #ff6b35, #4ecdc4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🏰 Morgan Le Fay Avalon Labs
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#ffd700',
            margin: '0 0 1rem 0',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Visionary realms blending Dion Fortune's mystical artistry with Ronald Hutton's authentic earth wisdom
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#8b5a8c',
            fontStyle: 'italic'
          }}>
            "Each node becomes a living sanctuary where consciousness meets mystical artistry"
          </p>
        </header>

        {/* Navigation */}
        <nav style={{
          padding: '1rem 2rem',
          background: 'rgba(30, 20, 40, 0.8)',
          borderBottom: '1px solid #4a0e4e'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'overview', name: '📋 Overview', desc: 'System overview and node selection' },
              { id: 'threejs', name: '🎲 Three.js Lab', desc: '3D geometry visualization' },
              { id: 'babylonjs', name: '🌍 Babylon.js Lab', desc: 'Advanced 3D environments' },
              { id: 'p5js', name: '🎨 p5.js Lab', desc: '2D generative patterns' },
              { id: 'tonejs', name: '🎵 Tone.js Lab', desc: 'Procedural audio harmonics' },
              { id: 'creatures', name: '🔮 Tarot Creatures', desc: 'Dynamic archetype beings' },
              { id: 'realms', name: '🏛️ Avalon Realms', desc: 'Visionary consciousness spaces' }
            ].map(lab => (
              <button
                key={lab.id}
                onClick={() => setActiveLab(lab.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: activeLab === lab.id ? '#8b5a8c' : 'rgba(139, 90, 140, 0.2)',
                  border: activeLab === lab.id ? '2px solid #ffd700' : '1px solid #8b5a8c',
                  borderRadius: '8px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{lab.name.split(' ')[0]}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{lab.name.split(' ').slice(1).join(' ')}</div>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main style={{ padding: '2rem' }}>
          {activeLab === 'overview' && (
            <OverviewLab
              availableNodes={availableNodes}
              selectedNode={selectedNode}
              onNodeSelect={setSelectedNode}
              onExploreNode={exploreNode}
              nodeExperience={nodeExperience}
              getMorganTeaching={getMorganTeaching}
            />
          )}

          {activeLab === 'threejs' && (
            <ThreeJSNodeLab
              nodeId={selectedNode}
              nodeIntegration={nodeIntegration}
            />
          )}

          {activeLab === 'babylonjs' && (
            <BabylonJSNodeLab
              nodeId={selectedNode}
              nodeIntegration={nodeIntegration}
            />
          )}

          {activeLab === 'p5js' && (
            <P5JSNodeLab
              nodeId={selectedNode}
              nodeIntegration={nodeIntegration}
            />
          )}

          {activeLab === 'tonejs' && (
            <ToneJSNodeLab
              nodeId={selectedNode}
              nodeIntegration={nodeIntegration}
            />
          )}

          {activeLab === 'creatures' && (
            <CreaturesLab
              nodeId={selectedNode}
              nodeIntegration={nodeIntegration}
              tarotCreatureSystem={tarotCreatureSystem}
            />
          )}

          {activeLab === 'realms' && (
            <RealmsLab
              nodeId={selectedNode}
              nodeIntegration={nodeIntegration}
              avalonEngine={avalonEngine}
            />
          )}
        </main>

        {/* Footer */}
        <footer style={{
          padding: '2rem',
          textAlign: 'center',
          borderTop: '1px solid #4a0e4e',
          background: 'rgba(20, 10, 30, 0.8)',
          color: '#888'
        }}>
          <p>🏰 Morgan Le Fay Avalon Labs | 🔮 Codex 144:99 Integration | 🌙 Visionary Consciousness Exploration</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Built with Three.js, Babylon.js, p5.js, Tone.js, and TurboRepo + pnpm
          </p>
        </footer>
      </div>
    </>
  );
}

// Overview Lab Component
function OverviewLab({ availableNodes, selectedNode, onNodeSelect, onExploreNode, nodeExperience, getMorganTeaching }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem', color: '#ffd700' }}>
        🔮 Codex 144:99 Node Explorer
      </h2>

      {/* Node Selection */}
      <div style={{
        background: 'rgba(30, 20, 40, 0.8)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '2px solid #8b5a8c'
      }}>
        <h3 style={{ color: '#8b5a8c', marginBottom: '1rem' }}>Select Codex Node to Explore</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {availableNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => onNodeSelect(node.id)}
              style={{
                padding: '1rem',
                background: selectedNode === node.id ? '#8b5a8c' : 'rgba(139, 90, 140, 0.2)',
                border: selectedNode === node.id ? '2px solid #ffd700' : '1px solid #8b5a8c',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>Node {node.id}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{node.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#4ecdc4' }}>{node.tarot}</div>
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onExploreNode(selectedNode)}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #4a0e4e, #8b5a8c)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(139, 90, 140, 0.5)'
            }}
          >
            🏰 Explore Node {selectedNode} in Avalon
          </button>
        </div>
      </div>

      {/* Node Experience Display */}
      {nodeExperience && (
        <div style={{
          background: 'rgba(20, 10, 30, 0.9)',
          borderRadius: '16px',
          padding: '2rem',
          border: '2px solid #ffd700'
        }}>
          <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>
            🔮 Node {selectedNode} Experience Generated
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h4 style={{ color: '#8b5a8c' }}>🏛️ Avalon Realm</h4>
              <p><strong>Name:</strong> {nodeExperience.experience.components.realm?.name}</p>
              <p><strong>Style:</strong> {nodeExperience.experience.style}</p>
              <p><strong>Purpose:</strong> {nodeExperience.experience.components.realm?.purpose}</p>
            </div>

            <div>
              <h4 style={{ color: '#4ecdc4' }}>🔥 Tarot Creature</h4>
              <p><strong>Name:</strong> {nodeExperience.experience.components.creature?.name}</p>
              <p><strong>Archetype:</strong> {nodeExperience.experience.components.creature?.tarot_archetype?.name}</p>
              <p><strong>Element:</strong> {nodeExperience.experience.components.creature?.elemental_base?.energy_pattern}</p>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: '#ff6b35' }}>🌙 Morgan Le Fay Teaching</h4>
            <p style={{ fontStyle: 'italic', background: 'rgba(255, 107, 53, 0.1)', padding: '1rem', borderRadius: '8px' }}>
              {getMorganTeaching()}
            </p>
          </div>
        </div>
      )}

      {/* System Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        <div style={{
          background: 'rgba(139, 90, 140, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #8b5a8c'
        }}>
          <h3 style={{ color: '#8b5a8c', marginBottom: '1rem' }}>🎨 Visionary Art Style</h3>
          <p>Dion Fortune-inspired living mandalas and sacred geometry patterns that breathe with consciousness</p>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
            <li>Living mandala visualization</li>
            <li>Consciousness-responsive patterns</li>
            <li>Trauma-informed mystical artistry</li>
            <li>Psychological depth integration</li>
          </ul>
        </div>

        <div style={{
          background: 'rgba(45, 90, 39, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #7fb069'
        }}>
          <h3 style={{ color: '#7fb069', marginBottom: '1rem' }}>🌍 Earth Wisdom Style</h3>
          <p>Ronald Hutton-inspired authentic British landscape mysticism and folklore traditions</p>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
            <li>Ancient stone circle patterns</li>
            <li>Seasonal magic responsiveness</li>
            <li>Folklore wisdom embodiment</li>
            <li>Land spirit communication</li>
          </ul>
        </div>

        <div style={{
          background: 'rgba(74, 14, 78, 0.1)',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #ffd700'
        }}>
          <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>⚡ Technical Integration</h3>
          <p>Open-source libraries creating procedural experiences across all platforms</p>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
            <li>Three.js for 3D geometry</li>
            <li>Tone.js for harmonic audio</li>
            <li>p5.js for generative patterns</li>
            <li>Babylon.js for advanced 3D</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Placeholder components for other labs
function CreaturesLab({ nodeId, nodeIntegration, tarotCreatureSystem }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h2 style={{ color: '#ffd700', marginBottom: '2rem' }}>🔮 Tarot Creatures Lab</h2>
      <p style={{ fontSize: '1.2rem', color: '#8b5a8c' }}>
        Dynamic tarot-responsive creatures that evolve based on archetype selection
      </p>
      <div style={{
        background: 'rgba(139, 90, 140, 0.1)',
        borderRadius: '16px',
        padding: '2rem',
        marginTop: '2rem',
        border: '1px solid #8b5a8c'
      }}>
        <p>🧙‍♀️ Morgan Le Fay summons tarot creatures that embody both Dion Fortune's visionary mysticism and Ronald Hutton's earth wisdom</p>
        <p>🔮 Each creature evolves through 5 levels: Manifestation → Integration → Visionary Awakening → Wild Magic → Sovereign Wisdom</p>
      </div>
    </div>
  );
}

function RealmsLab({ nodeId, nodeIntegration, avalonEngine }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h2 style={{ color: '#ffd700', marginBottom: '2rem' }}>🏛️ Avalon Realms Lab</h2>
      <p style={{ fontSize: '1.2rem', color: '#7fb069' }}>
        Consciousness-responsive visionary landscapes and mystical sanctuaries
      </p>
      <div style={{
        background: 'rgba(45, 90, 39, 0.1)',
        borderRadius: '16px',
        padding: '2rem',
        marginTop: '2rem',
        border: '1px solid #7fb069'
      }}>
        <p>🏰 Realms that breathe and evolve with user consciousness</p>
        <p>🎨 Sacred geometry architecture responding to emotional states</p>
        <p>🌙 Trauma-safe mystical exploration spaces</p>
      </div>
    </div>
  );
}
