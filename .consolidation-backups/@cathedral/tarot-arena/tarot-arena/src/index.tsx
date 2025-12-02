import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { archetypes } from '@cathedral/soul';
import { CoutureOverlay } from './CoutureOverlay';

// Import Morgan Le Fay Avalon System
import { MorganLeFay } from '../../../MorganLeFay.js';
import { AvalonRealmEngine } from '../../../AvalonRealmEngine.js';
import { TarotCreatureSystem } from '../../../TarotCreatureSystem.js';
import { AvalonNodeIntegration } from '../../../AvalonNodeIntegration.js';

// Example Arcana avatars (expand with full lore, stats, resonance, etc.)
const arcanaList = [
  {
    key: 'creator',
    name: 'The Magician',
    lore: 'Master of elements, creative technomancer. Wields the four elements and sacred geometry. Associated with Mercury and the caduceus. Can transmute energy and reality.',
    resonance: 417,
    art: '/assets/avatars/magician.png',
    sigil: '☿',
    team: 'Light',
    color: '#8ecae6',
    sound: 'A4',
    citation: 'Codex 144:99, Liber Arcanae',
  },
  {
    key: 'transformer',
    name: 'The High Priestess',
    lore: 'Oracle of the moon, keeper of mysteries. Guardian of the veil, intuition, and the subconscious. Associated with the moon and water. Can reveal hidden truths.',
    resonance: 528,
    art: '/assets/avatars/priestess.png',
    sigil: '☾',
    team: 'Shadow',
    color: '#b983ff',
    sound: 'C#5',
    citation: 'Codex 144:99, Liber Arcanae',
  },
  {
    key: 'preserver',
    name: 'The Empress',
    lore: 'Nurturer, creator of abundance. Embodies fertility, nature, and the creative matrix. Associated with Venus and the rose. Can heal and empower.',
    resonance: 639,
    art: '/assets/avatars/empress.png',
    sigil: '♀',
    team: 'Light',
    color: '#ffd6a5',
    sound: 'F4',
    citation: 'Codex 144:99, Liber Arcanae',
  },
];


function AvatarCard({ avatar, onSelect, selected }: any) {
  const [showLore, setShowLore] = React.useState(false);
  return (
    <div
      className="avatar-card"
      style={{
        border: selected ? '2px solid gold' : 'none',
        borderRadius: 24,
        padding: 0,
        margin: 16,
        background: 'rgba(24,24,28,0.7)',
        color: '#fff',
        cursor: 'pointer',
        minWidth: 200,
        boxShadow: selected ? '0 0 32px gold' : '0 0 12px #222',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s, border 0.3s',
        backdropFilter: 'blur(6px)',
      }}
      onClick={() => onSelect(avatar)}
      onMouseEnter={() => setShowLore(true)}
      onMouseLeave={() => setShowLore(false)}
    >
      <div style={{
        height: 180,
        background: `radial-gradient(ellipse at 50% 0%, ${avatar.color} 0%, #18181c 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <img src={avatar.art} alt={avatar.name} style={{ height: 120, filter: selected ? 'drop-shadow(0 0 16px gold)' : 'drop-shadow(0 0 8px #222)' }} />
        <div style={{
          position: 'absolute',
          top: 8,
          right: 12,
          fontSize: 32,
          opacity: 0.7,
        }}>{avatar.sigil}</div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 'bold', fontSize: 22, letterSpacing: 1 }}>{avatar.name}</div>
        <div style={{ fontSize: 15, color: avatar.color }}>{avatar.sound} • {avatar.resonance} Hz</div>
        <div style={{ fontSize: 13, color: '#aaa', marginTop: 4 }}>Team: {avatar.team}</div>
      </div>
      {showLore && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(20,16,32,0.98)',
          color: '#fff',
          zIndex: 10,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 16,
          borderRadius: 24,
          boxShadow: '0 0 32px #000',
        }}>
          <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>{avatar.name}</div>
          <div style={{ fontStyle: 'italic', marginBottom: 12 }}>{avatar.lore}</div>
          <div style={{ fontSize: 13, color: '#ffd700', marginBottom: 8 }}>Source: {avatar.citation}</div>
          <div style={{ fontSize: 13, color: '#aaa' }}>Sigil: {avatar.sigil}</div>
        </div>
      )}
    </div>
  );
}


function TarotArena() {
  const [selected, setSelected] = useState<any[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [grimoire, setGrimoire] = useState('');

  // Initialize Morgan Le Fay Avalon System
  const [morganLeFay] = useState(() => new MorganLeFay());
  const [avalonEngine] = useState(() => new AvalonRealmEngine(morganLeFay));
  const [tarotCreatureSystem] = useState(() => new TarotCreatureSystem(morganLeFay, avalonEngine));
  const [avalonNodeIntegration] = useState(() => new AvalonNodeIntegration(morganLeFay, avalonEngine, tarotCreatureSystem));

  // Avalon system state
  const [activeCreatures, setActiveCreatures] = useState<any[]>([]);
  const [currentRealm, setCurrentRealm] = useState<any>(null);
  const [showAvalonInterface, setShowAvalonInterface] = useState(false);
  const [currentNodeExperience, setCurrentNodeExperience] = useState<any>(null);
  const [showNodeInterface, setShowNodeInterface] = useState(false);

  function handleSelect(avatar: any) {
    setSelected((prev) => {
      if (prev.find((a) => a.key === avatar.key)) return prev;
      return [...prev, avatar];
    });
  }

  function handleDuel() {
    if (selected.length < 2) return;
    const [a, b] = selected;
    const winner = a.resonance > b.resonance ? a : b;
    setLog((l) => [
      `${a.name} (${a.resonance} Hz) vs ${b.name} (${b.resonance} Hz): ${winner.name} wins!`,
      ...l,
    ]);
  }

  function handleTeamUp() {
    if (selected.length < 2) return;
    const [a, b] = selected;
    setLog((l) => [
      `${a.name} and ${b.name} create a resonance pattern: ${a.resonance + b.resonance} Hz!`,
      ...l,
    ]);
  }

  function handleClear() {
    setSelected([]);
  }

  // Morgan Le Fay Avalon Functions
  function summonTarotCreature(avatar: any) {
    // Create tarot card object from avatar data
    const tarotCard = {
      name: avatar.name,
      element: getElementFromAvatar(avatar),
      suit: getSuitFromAvatar(avatar),
      powers: getPowersFromAvatar(avatar),
      frequency_hz: avatar.resonance
    };

    const creature = morganLeFay.createTarotCreature(tarotCard);
    setActiveCreatures(prev => [...prev, creature]);

    setLog(prev => [
      `🏰 Morgan le Fay summons: ${creature.name} - "${creature.personality}"`,
      ...prev
    ]);

    return creature;
  }

  function createAvalonRealm(avatar: any) {
    const tarotCard = {
      name: avatar.name,
      element: getElementFromAvatar(avatar),
      suit: getSuitFromAvatar(avatar),
      powers: getPowersFromAvatar(avatar),
      frequency_hz: avatar.resonance
    };

    const realm = avalonEngine.createTarotRealm(tarotCard);
    setCurrentRealm(realm);
    setShowAvalonInterface(true);

    setLog(prev => [
      `🏰 Morgan le Fay opens: ${realm.name} - ${realm.template.purpose}`,
      ...prev
    ]);

    return realm;
  }

  function getMorganTeaching() {
    const teaching = morganLeFay.getLivingTeaching('tarot');
    setLog(prev => [
      `🌙 Morgan le Fay teaches: "${teaching}"`,
      ...prev
    ]);
  }

  // Helper functions to map avatar data to tarot system
  function getElementFromAvatar(avatar: any) {
    const elementMap: { [key: string]: string } = {
      'The Magician': 'Air',
      'The High Priestess': 'Water',
      'The Empress': 'Earth'
    };
    return elementMap[avatar.name] || 'Air';
  }

  function getSuitFromAvatar(avatar: any) {
    const suitMap: { [key: string]: string } = {
      'The Magician': 'Swords',
      'The High Priestess': 'Cups',
      'The Empress': 'Pentacles'
    };
    return suitMap[avatar.name] || 'Swords';
  }

  function getPowersFromAvatar(avatar: any) {
    const powersMap: { [key: string]: string[] } = {
      'The Magician': ['Reality Manifestation', 'Elemental Command', 'Will Projection'],
      'The High Priestess': ['Lunar Attunement', 'Psychic Perception', 'Veil Piercing'],
      'The Empress': ['Life Force Channeling', 'Natural Harmony', 'Creative Genesis']
    };
    return powersMap[avatar.name] || ['Consciousness Enhancement', 'Wisdom Sharing'];
  }

  return (
    <>
      <CoutureOverlay />
      <div style={{ padding: 48, background: 'transparent', minHeight: '100vh', color: '#fff', zIndex: 1, position: 'relative' }}>
        <h1 style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 48, letterSpacing: 2, textShadow: '0 2px 24px #000' }}>Tarot Arena</h1>
        <p style={{ fontSize: 20, color: '#ffd700', marginBottom: 32, textShadow: '0 1px 8px #000' }}>
          Select Arcana avatars to team up, duel, or create living art. Hover for lore. All actions are ND/trauma-safe and research-based.
        </p>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {arcanaList.map((avatar) => (
            <AvatarCard
              key={avatar.key}
              avatar={avatar}
              onSelect={handleSelect}
              selected={!!selected.find((a) => a.key === avatar.key)}
            />
          ))}
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={handleDuel} disabled={selected.length < 2} style={{
            marginRight: 8, padding: '12px 32px', fontSize: 18, borderRadius: 12, background: '#222', color: '#ffd700', border: 'none', boxShadow: '0 0 8px #000', cursor: 'pointer', opacity: selected.length < 2 ? 0.5 : 1
          }}>
            ⚔️ Duel
          </button>
          <button onClick={handleTeamUp} disabled={selected.length < 2} style={{
            marginRight: 8, padding: '12px 32px', fontSize: 18, borderRadius: 12, background: '#222', color: '#8ecae6', border: 'none', boxShadow: '0 0 8px #000', cursor: 'pointer', opacity: selected.length < 2 ? 0.5 : 1
          }}>
            🤝 Team Up
          </button>
          <button onClick={handleClear} disabled={selected.length === 0} style={{
            padding: '12px 32px', fontSize: 18, borderRadius: 12, background: '#222', color: '#fff', border: 'none', boxShadow: '0 0 8px #000', cursor: 'pointer', opacity: selected.length === 0 ? 0.5 : 1
          }}>
            🗑️ Clear
          </button>
        </div>

        {/* Morgan Le Fay Avalon Interface */}
        <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => selected.length > 0 && summonTarotCreature(selected[0])}
            disabled={selected.length === 0}
            style={{
              padding: '12px 24px', fontSize: 16, borderRadius: 12, background: 'linear-gradient(135deg, #4a0e4e, #8b5a8c)', color: '#fff', border: 'none', boxShadow: '0 0 16px #8b5a8c', cursor: 'pointer', opacity: selected.length === 0 ? 0.5 : 1
            }}
          >
            🏰 Summon Creature
          </button>
          <button
            onClick={() => selected.length > 0 && createAvalonRealm(selected[0])}
            disabled={selected.length === 0}
            style={{
              padding: '12px 24px', fontSize: 16, borderRadius: 12, background: 'linear-gradient(135deg, #2d5a27, #7fb069)', color: '#fff', border: 'none', boxShadow: '0 0 16px #7fb069', cursor: 'pointer', opacity: selected.length === 0 ? 0.5 : 1
            }}
          >
            🌙 Create Avalon Realm
          </button>
          <button
            onClick={getMorganTeaching}
            style={{
              padding: '12px 24px', fontSize: 16, borderRadius: 12, background: 'linear-gradient(135deg, #1a1a2e, #16213e)', color: '#ffd700', border: 'none', boxShadow: '0 0 16px #16213e', cursor: 'pointer'
            }}
          >
            🌙 Morgan's Wisdom
          </button>
        </div>
        <div style={{ marginTop: 48, background: 'rgba(24,24,28,0.7)', borderRadius: 24, padding: 32, boxShadow: '0 0 32px #000', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ fontSize: 28, color: '#ffd700', marginBottom: 16 }}>Battle/Art Log</h2>
          <ul style={{ fontSize: 18, lineHeight: 1.5 }}>
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
        {/* Avalon Realm Interface */}
        {showAvalonInterface && currentRealm && (
          <div style={{ marginTop: 48, background: 'rgba(20,10,30,0.9)', borderRadius: 24, padding: 32, boxShadow: '0 0 48px #4a0e4e', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto', border: '2px solid #8b5a8c' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 32, color: '#ffd700', margin: 0 }}>🏰 {currentRealm.name}</h2>
              <button
                onClick={() => setShowAvalonInterface(false)}
                style={{
                  padding: '8px 16px', fontSize: 14, borderRadius: 8, background: '#8b5a8c', color: '#fff', border: 'none', cursor: 'pointer'
                }}
              >
                Close Realm
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div style={{ background: 'rgba(139,90,140,0.2)', borderRadius: 16, padding: 20 }}>
                <h3 style={{ color: '#8b5a8c', fontSize: 20, marginBottom: 12 }}>🏛️ Architecture</h3>
                <p style={{ fontSize: 14, color: '#fff', marginBottom: 8 }}>
                  <strong>Structure:</strong> {currentRealm.template.architecture.structure}
                </p>
                <p style={{ fontSize: 14, color: '#fff', marginBottom: 8 }}>
                  <strong>Sacred Geometry:</strong> {currentRealm.template.architecture.sacred_geometry.join(", ")}
                </p>
                <p style={{ fontSize: 14, color: '#fff' }}>
                  <strong>Colors:</strong> {currentRealm.template.architecture.colors.join(", ")}
                </p>
              </div>

              <div style={{ background: 'rgba(45,90,39,0.2)', borderRadius: 16, padding: 20 }}>
                <h3 style={{ color: '#7fb069', fontSize: 20, marginBottom: 12 }}>✨ Magical Features</h3>
                <ul style={{ fontSize: 14, color: '#fff', margin: 0 }}>
                  {currentRealm.magical_features.slice(0, 3).map((feature: string, i: number) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ background: 'rgba(74,14,78,0.2)', borderRadius: 16, padding: 20 }}>
              <h3 style={{ color: '#ffd700', fontSize: 18, marginBottom: 12 }}>👥 Inhabitants</h3>
              <p style={{ fontSize: 14, color: '#fff' }}>
                {currentRealm.inhabitants.join(", ")}
              </p>
            </div>
          </div>
        )}

        {/* Active Creatures Display */}
        {activeCreatures.length > 0 && (
          <div style={{ marginTop: 48, background: 'rgba(30,20,40,0.8)', borderRadius: 24, padding: 32, boxShadow: '0 0 32px #4a0e4e', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
            <h2 style={{ fontSize: 28, color: '#ffd700', marginBottom: 24, textAlign: 'center' }}>🔮 Morgan's Tarot Creatures</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
              {activeCreatures.map((creature) => (
                <div key={creature.id} style={{
                  background: 'rgba(139,90,140,0.1)', borderRadius: 16, padding: 20, border: '1px solid #8b5a8c', boxShadow: '0 0 16px rgba(139,90,140,0.3)'
                }}>
                  <h3 style={{ color: '#ffd700', fontSize: 18, marginBottom: 8 }}>{creature.name}</h3>
                  <p style={{ fontSize: 12, color: '#8b5a8c', marginBottom: 8 }}>
                    <strong>Archetype:</strong> {creature.tarot_archetype.name}
                  </p>
                  <p style={{ fontSize: 12, color: '#aaa', marginBottom: 12 }}>
                    <strong>Element:</strong> {creature.elemental_base.energy_pattern}
                  </p>
                  <p style={{ fontSize: 12, color: '#fff', marginBottom: 12, fontStyle: 'italic' }}>
                    "{creature.personality}"
                  </p>
                  <div style={{ fontSize: 11, color: '#7fb069' }}>
                    <strong>Abilities:</strong> {creature.abilities.basic.slice(0, 2).join(", ")}
                  </div>
                  <div style={{ fontSize: 11, color: '#4a90e2', marginTop: 8 }}>
                    <strong>Evolution:</strong> Level {creature.evolution.current_level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 48, background: 'rgba(24,24,28,0.7)', borderRadius: 24, padding: 32, boxShadow: '0 0 32px #000', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ fontSize: 28, color: '#ffd700', marginBottom: 16 }}>Battle/Art Log</h2>
          <ul style={{ fontSize: 18, lineHeight: 1.5 }}>
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: 48, background: 'rgba(24,24,28,0.7)', borderRadius: 24, padding: 32, boxShadow: '0 0 32px #000', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ fontSize: 28, color: '#ffd700', marginBottom: 16 }}>Grimoire & Lore</h2>
          <p style={{ fontSize: 16, color: '#aaa', marginBottom: 12 }}>Each avatar has unique lore. You can add your own below:</p>
          <textarea
            style={{ width: '100%', height: 100, background: '#222', color: '#fff', borderRadius: 12, fontSize: 16, padding: 12, border: '1px solid #444', marginBottom: 8 }}
            placeholder="Write your own lore or grimoire entry..."
            value={grimoire}
            onChange={e => setGrimoire(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<TarotArena />);
