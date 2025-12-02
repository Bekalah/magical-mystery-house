/**
 * CATHEDRAL RPG
 * 
 * A Fable-style choose your own adventure
 * that brings REAL art, music, and books into the game
 * 
 * But designed like a museum, not a mobile game.
 */

import React, { useState, useEffect } from 'react';
import '../styles/cathedral-couture.css';

// =====================================================
// TYPES
// =====================================================

interface RealArtwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  imageUrl?: string;
  description: string;
  tradition: string;
}

interface RealBook {
  id: string;
  title: string;
  author: string;
  year: string;
  excerpt: string;
  connection: string;
}

interface RealMusic {
  id: string;
  title: string;
  composer: string;
  frequency: number;
  description: string;
}

interface Choice {
  id: string;
  text: string;
  consequence: string;
  alignment: 'light' | 'shadow' | 'balance';
  leadsTo: string;
  unlocksArt?: string;
  unlocksBook?: string;
  unlocksMusic?: string;
}

interface Scene {
  id: string;
  title: string;
  location: string;
  narrative: string;
  atmosphere: string;
  choices: Choice[];
  featuredArt?: RealArtwork;
  featuredBook?: RealBook;
  featuredMusic?: RealMusic;
  codexNode: number;
}

interface PlayerState {
  currentScene: string;
  alignment: number; // -100 (shadow) to +100 (light)
  discoveries: {
    art: string[];
    books: string[];
    music: string[];
  };
  visitedScenes: string[];
  currentNode: number;
}

// =====================================================
// REAL ART DATABASE
// =====================================================

const REAL_ARTWORKS: Record<string, RealArtwork> = {
  'chartres-labyrinth': {
    id: 'chartres-labyrinth',
    title: 'The Chartres Labyrinth',
    artist: 'Unknown Medieval Mason',
    year: 'c. 1200',
    medium: 'Stone floor inlay',
    description: 'The 11-circuit labyrinth embedded in the floor of Chartres Cathedral. A walking meditation path representing the soul\'s journey.',
    tradition: 'Gothic Sacred Architecture'
  },
  'hilma-af-klint-ten-largest': {
    id: 'hilma-af-klint-ten-largest',
    title: 'The Ten Largest, No. 7, Adulthood',
    artist: 'Hilma af Klint',
    year: '1907',
    medium: 'Tempera on paper',
    description: 'Abstract paintings created through spiritual practice, predating Kandinsky. Af Klint channeled these works through séances.',
    tradition: 'Spiritualist Abstract'
  },
  'bernini-ecstasy': {
    id: 'bernini-ecstasy',
    title: 'Ecstasy of Saint Teresa',
    artist: 'Gian Lorenzo Bernini',
    year: '1647-1652',
    medium: 'Marble sculpture',
    description: 'The moment of divine union rendered in stone. Light from a hidden window creates the illusion of divine presence.',
    tradition: 'Baroque Mysticism'
  },
  'durer-melencolia': {
    id: 'durer-melencolia',
    title: 'Melencolia I',
    artist: 'Albrecht Dürer',
    year: '1514',
    medium: 'Engraving',
    description: 'Dense with alchemical and mathematical symbolism. The magic square, the polyhedron, the sleeping dog—each element a key.',
    tradition: 'Northern Renaissance Hermeticism'
  },
  'remedios-varo-creation': {
    id: 'remedios-varo-creation',
    title: 'Creation of the Birds',
    artist: 'Remedios Varo',
    year: '1957',
    medium: 'Oil on masonite',
    description: 'An owl-woman paints birds that come to life. The creative act as literal magic, the artist as alchemist.',
    tradition: 'Surrealist Alchemy'
  }
};

// =====================================================
// REAL BOOKS DATABASE
// =====================================================

const REAL_BOOKS: Record<string, RealBook> = {
  'corpus-hermeticum': {
    id: 'corpus-hermeticum',
    title: 'The Corpus Hermeticum',
    author: 'Hermes Trismegistus (attributed)',
    year: 'c. 100-300 CE',
    excerpt: '"As above, so below; as below, so above." The microcosm reflects the macrocosm. What is true of the stars is true of the self.',
    connection: 'The foundation of Western esoteric thought'
  },
  'book-of-kells': {
    id: 'book-of-kells',
    title: 'The Book of Kells',
    author: 'Unknown Irish Monks',
    year: 'c. 800 CE',
    excerpt: 'Each illuminated letter contains worlds within worlds. The Chi-Rho page alone took years to complete.',
    connection: 'The art of sacred patience'
  },
  'secret-teachings': {
    id: 'secret-teachings',
    title: 'The Secret Teachings of All Ages',
    author: 'Manly P. Hall',
    year: '1928',
    excerpt: '"The true Mason is not creed-bound. He realizes with the divine illumination of his lodge that as a Mason his religion must be universal."',
    connection: 'The synthesis of mystery traditions'
  },
  'tao-te-ching': {
    id: 'tao-te-ching',
    title: 'Tao Te Ching',
    author: 'Lao Tzu',
    year: 'c. 6th century BCE',
    excerpt: '"The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name."',
    connection: 'The way that cannot be taught'
  }
};

// =====================================================
// SCENES - FABLE-STYLE NARRATIVE
// =====================================================

const SCENES: Record<string, Scene> = {
  'threshold': {
    id: 'threshold',
    title: 'The Threshold',
    location: 'The space between worlds',
    narrative: `You stand at the threshold. Behind you, the ordinary world—its noise, its demands, its relentless flatness. Before you, something vast opens.

Not a door, exactly. More like a recognition. As if the cathedral has always been here, waiting for you to notice.

The stones remember. They\'ve held this space for eight hundred years, absorbing prayers and questions and silent weeping. Now they hold you.

How will you enter?`,
    atmosphere: 'liminal',
    codexNode: 1,
    featuredArt: REAL_ARTWORKS['chartres-labyrinth'],
    choices: [
      {
        id: 'enter-slowly',
        text: 'Enter slowly, feeling each step',
        consequence: 'You choose presence over haste. The labyrinth teaches patience.',
        alignment: 'light',
        leadsTo: 'nave',
        unlocksArt: 'chartres-labyrinth'
      },
      {
        id: 'enter-seeking',
        text: 'Enter seeking power',
        consequence: 'Ambition drives you forward. But power has many forms here.',
        alignment: 'shadow',
        leadsTo: 'crypt'
      },
      {
        id: 'enter-empty',
        text: 'Enter empty, without intention',
        consequence: 'The Tao that can be walked is not the eternal Tao. You understand.',
        alignment: 'balance',
        leadsTo: 'rose-window',
        unlocksBook: 'tao-te-ching'
      }
    ]
  },
  
  'nave': {
    id: 'nave',
    title: 'The Nave',
    location: 'Central axis of the cathedral',
    narrative: `Light falls through ancient glass, painting the stone floor with color that seems alive. You are walking the labyrinth now—eleven circuits spiraling toward the center.

The path doubles back. You think you\'re close, then find yourself at the edge again. This is the teaching: the direct route is not always the true one.

At the center, a rose opens. Six petals, the geometry of creation. Someone has left flowers here. Fresh ones.

You are not alone in this place. Others walk the same path, in different times.`,
    atmosphere: 'sacred',
    codexNode: 13,
    featuredArt: REAL_ARTWORKS['hilma-af-klint-ten-largest'],
    featuredBook: REAL_BOOKS['corpus-hermeticum'],
    choices: [
      {
        id: 'trace-labyrinth',
        text: 'Trace the full labyrinth path',
        consequence: 'Forty-five minutes of walking meditation. When you reach the center, something has shifted.',
        alignment: 'light',
        leadsTo: 'center',
        unlocksArt: 'hilma-af-klint-ten-largest'
      },
      {
        id: 'cut-across',
        text: 'Cut across directly to the center',
        consequence: 'Efficiency has its place. But some things cannot be rushed.',
        alignment: 'shadow',
        leadsTo: 'center'
      },
      {
        id: 'study-geometry',
        text: 'Study the geometry of the rose',
        consequence: 'Six petals. Twelve points. The numbers unfold into meaning.',
        alignment: 'balance',
        leadsTo: 'scriptorium',
        unlocksBook: 'corpus-hermeticum'
      }
    ]
  },

  'rose-window': {
    id: 'rose-window',
    title: 'Before the Rose Window',
    location: 'The west facade',
    narrative: `The rose window holds twelve thousand pieces of glass, each one cut by hand, each one singing a different frequency of light.

This is not decoration. This is theology made visible. The geometry of the divine, expressed in color and lead.

The afternoon sun streams through, and for a moment you see what the medieval builders saw: heaven touching earth through pure mathematics.

Someone is crying in the back pew. The beauty here has that effect.`,
    atmosphere: 'transcendent',
    codexNode: 25,
    featuredArt: REAL_ARTWORKS['bernini-ecstasy'],
    choices: [
      {
        id: 'sit-with-light',
        text: 'Sit and let the light wash over you',
        consequence: 'Time stops. Or rather, you step outside of time. The window has always been here. You have always been here.',
        alignment: 'light',
        leadsTo: 'chapel-contemplation',
        unlocksArt: 'bernini-ecstasy'
      },
      {
        id: 'analyze-structure',
        text: 'Analyze the mathematical structure',
        consequence: 'The sacred geometry reveals itself: golden ratios, vesica piscis, the flower of life.',
        alignment: 'balance',
        leadsTo: 'scriptorium'
      },
      {
        id: 'approach-crying',
        text: 'Approach the one who weeps',
        consequence: 'Sometimes the most sacred act is simply being present with another\'s pain.',
        alignment: 'light',
        leadsTo: 'confession'
      }
    ]
  },

  'crypt': {
    id: 'crypt',
    title: 'The Crypt',
    location: 'Beneath the cathedral',
    narrative: `Down here, the air is different. Older. The stones predate the cathedral—this was sacred ground before the Christians came, before the Romans, before names were given to gods.

The darkness is not empty. It holds something. Waiting.

Power lives here. The kind that transforms. The kind that destroys. They are often the same thing.

An altar stone, worn smooth by centuries of offerings. What will you leave here? What will you take?`,
    atmosphere: 'chthonic',
    codexNode: 37,
    featuredArt: REAL_ARTWORKS['durer-melencolia'],
    choices: [
      {
        id: 'leave-offering',
        text: 'Leave an offering at the altar',
        consequence: 'You place something precious on the stone. The darkness accepts.',
        alignment: 'balance',
        leadsTo: 'transformation',
        unlocksArt: 'durer-melencolia'
      },
      {
        id: 'take-power',
        text: 'Reach for the power you sense here',
        consequence: 'It comes to you. But power always has a price.',
        alignment: 'shadow',
        leadsTo: 'shadow-chapel'
      },
      {
        id: 'sit-darkness',
        text: 'Sit with the darkness, neither taking nor giving',
        consequence: 'The shadow needs witnesses, not conquerers. You understand something essential.',
        alignment: 'balance',
        leadsTo: 'integration'
      }
    ]
  },

  'scriptorium': {
    id: 'scriptorium',
    title: 'The Scriptorium',
    location: 'Where knowledge is preserved',
    narrative: `Books line the walls from floor to vaulted ceiling. Some are bound in leather, some in velvet, some in materials you cannot name.

The scribes who worked here spent their lives copying sacred texts, illuminating margins with gold leaf and lapis lazuli. A single book might take thirty years.

What is worth thirty years of your life?

A codex lies open on the central lectern. The page it shows seems to change each time you look at it.`,
    atmosphere: 'studious',
    codexNode: 49,
    featuredBook: REAL_BOOKS['secret-teachings'],
    featuredArt: REAL_ARTWORKS['remedios-varo-creation'],
    choices: [
      {
        id: 'read-codex',
        text: 'Read from the changing codex',
        consequence: 'The words rearrange themselves as you read. They are teaching you how to see.',
        alignment: 'balance',
        leadsTo: 'revelation',
        unlocksBook: 'secret-teachings'
      },
      {
        id: 'seek-specific',
        text: 'Search for a specific text',
        consequence: 'The book you need finds you. It always does, in places like this.',
        alignment: 'light',
        leadsTo: 'library-deep',
        unlocksArt: 'remedios-varo-creation'
      },
      {
        id: 'write-own',
        text: 'Begin writing your own text',
        consequence: 'The scriptorium provides materials. Your story deserves to be recorded.',
        alignment: 'light',
        leadsTo: 'creation'
      }
    ]
  },

  'center': {
    id: 'center',
    title: 'The Center',
    location: 'Heart of the labyrinth',
    narrative: `You have arrived at the center. The journey took longer than expected—or shorter. Time moves differently in sacred spaces.

From here, you can see the whole path you\'ve walked. Every turn, every doubling back, was necessary. There were no wrong steps.

The rose opens beneath your feet. Six petals, twelve points, infinite depth.

What do you do with arrival?`,
    atmosphere: 'culmination',
    codexNode: 72,
    choices: [
      {
        id: 'rest',
        text: 'Rest here, in the achieved center',
        consequence: 'You\'ve earned this stillness. Let it fill you.',
        alignment: 'light',
        leadsTo: 'integration'
      },
      {
        id: 'return',
        text: 'Begin the return journey',
        consequence: 'The labyrinth has two directions. Coming in is only half the teaching.',
        alignment: 'balance',
        leadsTo: 'threshold'
      },
      {
        id: 'transcend',
        text: 'Step off the path entirely',
        consequence: 'Rules are for those still learning. You are ready for something else.',
        alignment: 'shadow',
        leadsTo: 'void'
      }
    ]
  }
};

// =====================================================
// RPG COMPONENT
// =====================================================

export const CathedralRPG: React.FC = () => {
  const [player, setPlayer] = useState<PlayerState>({
    currentScene: 'threshold',
    alignment: 0,
    discoveries: {
      art: [],
      books: [],
      music: []
    },
    visitedScenes: ['threshold'],
    currentNode: 1
  });

  const [transitioning, setTransitioning] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState<{
    type: 'art' | 'book' | 'music';
    item: RealArtwork | RealBook | RealMusic;
  } | null>(null);

  const currentScene = SCENES[player.currentScene];

  const makeChoice = (choice: Choice) => {
    setTransitioning(true);

    // Process discoveries
    if (choice.unlocksArt && !player.discoveries.art.includes(choice.unlocksArt)) {
      setTimeout(() => {
        setShowDiscovery({
          type: 'art',
          item: REAL_ARTWORKS[choice.unlocksArt!]
        });
      }, 1000);
    }

    if (choice.unlocksBook && !player.discoveries.books.includes(choice.unlocksBook)) {
      setTimeout(() => {
        setShowDiscovery({
          type: 'book',
          item: REAL_BOOKS[choice.unlocksBook!]
        });
      }, 1000);
    }

    // Update player state after transition
    setTimeout(() => {
      setPlayer(prev => ({
        ...prev,
        currentScene: choice.leadsTo,
        alignment: prev.alignment + (choice.alignment === 'light' ? 10 : choice.alignment === 'shadow' ? -10 : 0),
        discoveries: {
          art: choice.unlocksArt ? [...prev.discoveries.art, choice.unlocksArt] : prev.discoveries.art,
          books: choice.unlocksBook ? [...prev.discoveries.books, choice.unlocksBook] : prev.discoveries.books,
          music: choice.unlocksMusic ? [...prev.discoveries.music, choice.unlocksMusic] : prev.discoveries.music
        },
        visitedScenes: [...prev.visitedScenes, choice.leadsTo],
        currentNode: SCENES[choice.leadsTo]?.codexNode || prev.currentNode
      }));
      setTransitioning(false);
    }, 1500);
  };

  const closeDiscovery = () => {
    setShowDiscovery(null);
  };

  if (!currentScene) {
    return (
      <div className="layout-full">
        <div className="position-offset-left">
          <p className="text-whisper">Scene not found</p>
          <button className="action-primary" onClick={() => setPlayer(prev => ({ ...prev, currentScene: 'threshold' }))}>
            Return to threshold
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cathedral-rpg">
      <div className="cathedral-atmosphere" />
      
      {/* Subtle geometry */}
      <div className="geometry-field">
        <div className="geometry-form" />
        <div className="geometry-form" />
        <div className="geometry-form" />
      </div>

      {/* Discovery Modal */}
      {showDiscovery && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(5, 5, 5, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-breath)',
          animation: 'presence-enter 0.8s ease forwards'
        }}>
          <div style={{ maxWidth: '600px', textAlign: 'center' }}>
            <p className="text-whisper" style={{ marginBottom: '2rem' }}>
              You have discovered
            </p>
            
            {showDiscovery.type === 'art' && (
              <>
                <h2 className="title-section">{(showDiscovery.item as RealArtwork).title}</h2>
                <p className="text-body" style={{ marginTop: '1rem' }}>
                  {(showDiscovery.item as RealArtwork).artist}, {(showDiscovery.item as RealArtwork).year}
                </p>
                <p className="text-body" style={{ marginTop: '2rem', fontStyle: 'italic' }}>
                  {(showDiscovery.item as RealArtwork).description}
                </p>
                <p className="text-whisper" style={{ marginTop: '2rem' }}>
                  {(showDiscovery.item as RealArtwork).tradition}
                </p>
              </>
            )}

            {showDiscovery.type === 'book' && (
              <>
                <h2 className="title-section">{(showDiscovery.item as RealBook).title}</h2>
                <p className="text-body" style={{ marginTop: '1rem' }}>
                  {(showDiscovery.item as RealBook).author}, {(showDiscovery.item as RealBook).year}
                </p>
                <blockquote style={{ 
                  marginTop: '2rem',
                  padding: '2rem',
                  borderLeft: '2px solid var(--burnished-gold)',
                  fontStyle: 'italic',
                  color: 'var(--text-soft)'
                }}>
                  {(showDiscovery.item as RealBook).excerpt}
                </blockquote>
              </>
            )}

            <button 
              className="action-primary" 
              style={{ marginTop: '3rem' }}
              onClick={closeDiscovery}
            >
              Continue your journey
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="layout-full" style={{ opacity: transitioning ? 0.3 : 1, transition: 'opacity 0.5s ease' }}>
        <div className="position-offset-left stagger">
          {/* Location indicator */}
          <div className="node-indicator">
            Node {currentScene.codexNode} · {currentScene.location}
          </div>

          {/* Scene title */}
          <h1 className="title-section" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            {currentScene.title}
          </h1>

          {/* Narrative - the story */}
          <div style={{ maxWidth: '50ch' }}>
            {currentScene.narrative.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-body" style={{ marginBottom: '1.5rem' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Featured art (if present) */}
          {currentScene.featuredArt && (
            <div style={{ 
              marginTop: '3rem', 
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
              <p className="text-whisper">In this space</p>
              <p style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.25rem',
                color: 'var(--champagne)',
                marginTop: '0.5rem'
              }}>
                {currentScene.featuredArt.title}
              </p>
              <p className="text-body" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                {currentScene.featuredArt.artist}, {currentScene.featuredArt.year}
              </p>
            </div>
          )}

          {/* Choices - presented elegantly, not as buttons */}
          <div style={{ marginTop: '4rem' }}>
            <p className="text-whisper" style={{ marginBottom: '1.5rem' }}>
              What will you do?
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentScene.choices.map((choice) => (
                <button
                  key={choice.id}
                  className="action-primary"
                  onClick={() => makeChoice(choice)}
                  disabled={transitioning}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Subtle progress indicator */}
      <div className="safety-subtle">
        <span>
          {player.discoveries.art.length + player.discoveries.books.length} discoveries
        </span>
      </div>

      {/* Alignment indicator - ambient, not a meter */}
      <div style={{
        position: 'fixed',
        top: 'var(--space-flow)',
        right: 'var(--space-flow)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <span className="text-whisper">
          {player.alignment > 20 ? 'Light path' : player.alignment < -20 ? 'Shadow path' : 'Balance'}
        </span>
      </div>
    </div>
  );
};

export default CathedralRPG;

