import React, { useState, useEffect, useCallback } from 'react';
import { 
  LIVING_ARCANA, 
  ALPHA_OMEGA_CYCLES, 
  WORLD_REGIONS, 
  CIRCUITUM_ITSELF,
  ArcanaPerformance,
  type LivingArcana,
  type CircuitumItself 
} from './LivingArcanaDatabase';

// Types for progression and game state
interface PlayerProgress {
  currentLevel: number;
  circuitumStage: number;
  arcanaMet: number[];
  wisdomTokensCollected: string[];
  memoryFragmentsUnlocked: string[];
  totalEnergy: number;
  alphaOmegaBalance: number;
  achievements: string[];
}

interface GameState {
  player: PlayerProgress;
  selectedArcana: LivingArcana | null;
  currentStudio: 'atelier' | 'synth' | 'geometry' | null;
  showCircuitumItself: boolean;
  soundEnabled: boolean;
  performanceMode: boolean;
}

// Circuitum 99 - Alpha et Omega (Eternal Cycle)
// The canonical deployment showcasing the 22 Living Arcana with complete 99-stage system
export default function App() {
  // Initialize game state with local storage persistence
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('circuitum99-save');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      player: {
        currentLevel: 1,
        circuitumStage: 1,
        arcanaMet: [],
        wisdomTokensCollected: [],
        memoryFragmentsUnlocked: [],
        totalEnergy: 0,
        alphaOmegaBalance: 0.5,
        achievements: []
      },
      selectedArcana: null,
      currentStudio: null,
      showCircuitumItself: false,
      soundEnabled: true,
      performanceMode: false
    };
  });

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('circuitum99-save', JSON.stringify(gameState));
  }, [gameState]);

  // Calculate progression metrics
  const progress = ArcanaPerformance.getAlphaOmegaProgress(gameState.player.currentLevel);
  const availableArcana = ArcanaPerformance.getAvailableArcana(gameState.player.currentLevel);
  const totalCircuitumEnergy = ArcanaPerformance.calculateTotalCircuitumEnergy();

  // Handle Arcana meeting
  const meetArcana = useCallback((arcana: LivingArcana) => {
    if (arcana.canMeet && arcana.levelRequirement <= gameState.player.currentLevel) {
      const newArcanaMet = [...gameState.player.arcanaMet];
      if (!newArcanaMet.includes(arcana.id)) {
        newArcanaMet.push(arcana.id);
        
        setGameState(prev => ({
          ...prev,
          player: {
            ...prev.player,
            arcanaMet: newArcanaMet,
            totalEnergy: prev.player.totalEnergy + arcana.frequency,
            wisdomTokensCollected: [...prev.player.wisdomTokensCollected, ...(arcana.wisdomTokens || [])],
            memoryFragmentsUnlocked: [...prev.player.memoryFragmentsUnlocked, ...(arcana.memoryFragments || [])]
          },
          selectedArcana: arcana
        }));
      } else {
        setGameState(prev => ({ ...prev, selectedArcana: arcana }));
      }
    }
  }, [gameState.player]);

  // Handle level progression
  const advanceLevel = useCallback(() => {
    const newLevel = Math.min(999, gameState.player.currentLevel + 1);
    const newStage = Math.min(99, gameState.player.circuitumStage + 1);
    
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        currentLevel: newLevel,
        circuitumStage: newStage,
        alphaOmegaBalance: newLevel / 999
      }
    }));
  }, [gameState.player]);

  // Render energy signature visualization
  const renderEnergySignature = (arcana: LivingArcana) => {
    const signature = arcana.energySignature;
    if (!signature) return null;

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '0.5rem'
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          backgroundColor: signature.primaryColor,
          borderRadius: '50%',
          border: `2px solid ${signature.secondaryColor}`
        }} />
        <span style={{ fontSize: '0.8rem', color: '#ccc' }}>
          {signature.geometricPattern}
        </span>
      </div>
    );
  };

  // Render frequency visualization
  const renderFrequencyVisualization = (frequency: number) => {
    const bars = Array.from({ length: 5 }, (_, i) => {
      const intensity = Math.min(1, frequency / 1000);
      const height = 10 + (intensity * 20);
      const opacity = 0.3 + (intensity * 0.7);
      
      return (
        <div
          key={i}
          style={{
            width: '4px',
            height: `${height}px`,
            backgroundColor: `rgba(255, 215, 0, ${opacity})`,
            margin: '0 1px',
            borderRadius: '2px'
          }}
        />
      );
    });

    return (
      <div style={{ display: 'flex', alignItems: 'end', height: '35px' }}>
        {bars}
      </div>
    );
  };

  // Render Combat Stats
  const renderCombatStats = (arcana: LivingArcana) => {
    const stats = arcana.combatStats;
    if (!stats) return null;

    const statNames = {
      power: 'Power',
      wisdom: 'Wisdom', 
      creativity: 'Creativity',
      consciousness: 'Consciousness'
    };

    return (
      <div style={{ marginTop: '0.5rem' }}>
        <h4 style={{ color: '#d4af37', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>Combat Stats</h4>
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            marginBottom: '0.2rem'
          }}>
            <span style={{ color: '#ccc' }}>{statNames[key as keyof typeof statNames]}:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{
                width: '50px',
                height: '4px',
                backgroundColor: '#333',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${value}%`,
                  height: '100%',
                  backgroundColor: '#d4af37',
                  borderRadius: '2px'
                }} />
              </div>
              <span style={{ color: '#d4af37', fontWeight: 'bold' }}>{value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render Studio components
  const renderStudio = (studio: string) => {
    const studioStyles = {
      atelier: {
        bg: 'linear-gradient(135deg, #8b4513 0%, #a0522d 100%)',
        icon: '🎨',
        title: 'The Atelier',
        description: 'Visual art creation and character customization'
      },
      synth: {
        bg: 'linear-gradient(135deg, #191970 0%, #4169e1 100%)',
        icon: '🎵',
        title: 'Synth Lab',
        description: 'Sound design and music creation with frequency synthesis'
      },
      geometry: {
        bg: 'linear-gradient(135deg, #2e8b57 0%, #3cb371 100%)',
        icon: '🔬',
        title: 'Geometry Studio',
        description: 'Sacred mathematics and 3D geometric exploration'
      }
    };

    const style = studioStyles[studio as keyof typeof studioStyles];
    
    return (
      <div style={{
        background: style.bg,
        color: '#f5f5dc',
        padding: '2rem',
        borderRadius: '10px',
        margin: '1rem 0'
      }}>
        <h3 style={{ color: '#d4af37', margin: '0 0 1rem 0' }}>
          {style.icon} {style.title}
        </h3>
        <p style={{ lineHeight: '1.5' }}>{style.description}</p>
        <div style={{ marginTop: '1rem' }}>
          <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
            [Studio implementation coming in next phase]
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      padding: 0,
      fontFamily: "serif",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      minHeight: "100vh",
      color: "#f5f5dc"
    }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(90deg, #d4af37 0%, #ffd700 50%, #d4af37 100%)",
        color: "#1a1a2e",
        padding: "2rem",
        textAlign: "center",
        position: "relative"
      }}>
        <h1 style={{ fontSize: "3rem", margin: 0, fontWeight: "bold" }}>
          ⚡ CIRCUITUM 99
        </h1>
        <p style={{ fontSize: "1.2rem", margin: "0.5rem 0 0 0", fontStyle: "italic" }}>
          Alpha et Omega - The Eternal Cycle
        </p>
        <p style={{ fontSize: "0.9rem", margin: "0.5rem 0 0 0" }}>
          Canonical deployment for the 22 Living Arcana
        </p>
        
        {/* Circuitum Itself Toggle */}
        <button
          onClick={() => setGameState(prev => ({ ...prev, showCircuitumItself: !prev.showCircuitumItself }))}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(0,0,0,0.3)",
            color: "#d4af37",
            border: "1px solid #d4af37",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "0.8rem"
          }}
        >
          {gameState.showCircuitumItself ? "Hide" : "Reveal"} The Circuitum Itself
        </button>
      </header>

      {/* Status Bar */}
      <div style={{
        background: "rgba(0,0,0,0.7)",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #d4af37",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <strong>Level:</strong> {gameState.player.currentLevel} / 999
        </div>
        <div>
          <strong>Circuitum Stage:</strong> {gameState.player.circuitumStage} / 99
        </div>
        <div>
          <strong>Phase:</strong> {progress.nextPhase}
        </div>
        <div>
          <strong>Arcana Met:</strong> {gameState.player.arcanaMet.length} / 22
        </div>
        <div>
          <strong>Energy:</strong> {gameState.player.totalEnergy} Hz
        </div>
        <div>
          <strong>Balance:</strong> {(gameState.player.alphaOmegaBalance * 100).toFixed(1)}%
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* The 22 Living Arcana */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ 
            color: "#d4af37", 
            borderBottom: "2px solid #d4af37", 
            paddingBottom: "0.5rem",
            fontSize: "2rem"
          }}>
            The 22 Living Arcana
          </h2>
          <p style={{ color: "#cccccc", fontStyle: "italic", marginBottom: "2rem" }}>
            Real historical figures canonically represented as living archetypal beings
          </p>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "1.5rem"
          }}>
            {LIVING_ARCANA.map((arcana: LivingArcana) => {
              const isMet = gameState.player.arcanaMet.includes(arcana.id);
              const isAvailable = arcana.canMeet && arcana.levelRequirement <= gameState.player.currentLevel;
              
              return (
                <div
                  key={arcana.id}
                  onClick={() => isAvailable && meetArcana(arcana)}
                  style={{
                    background: arcana.aspect === "Divine" ? "linear-gradient(135deg, #d4af37 0%, #ffd700 100%)" :
                             arcana.aspect === "Infernal" ? "linear-gradient(135deg, #8b0000 0%, #dc143c 100%)" :
                             "linear-gradient(135deg, #4169e1 0%, #87ceeb 100%)",
                    color: arcana.aspect === "Divine" || arcana.aspect === "Infernal" ? "#1a1a2e" : "#f5f5dc",
                    padding: "1.5rem",
                    borderRadius: "10px",
                    cursor: isAvailable ? "pointer" : "not-allowed",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: isMet ? "0 0 20px rgba(212,175,55,0.6)" : "0 4px 8px rgba(0,0,0,0.3)",
                    opacity: isAvailable ? 1 : 0.6
                  }}
                  onMouseEnter={(e) => {
                    if (isAvailable) {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 8px 16px rgba(212,175,55,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isAvailable) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = isMet ? "0 0 20px rgba(212,175,55,0.6)" : "0 4px 8px rgba(0,0,0,0.3)";
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{arcana.id}. {arcana.name}</span>
                      {isMet && <span style={{ fontSize: "0.8rem" }}>✨</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ 
                        background: "rgba(0,0,0,0.2)", 
                        padding: "0.2rem 0.5rem", 
                        borderRadius: "5px",
                        fontSize: "0.8rem"
                      }}>
                        {arcana.aspect}
                      </span>
                      {renderFrequencyVisualization(arcana.frequency)}
                    </div>
                  </div>
                  
                  <p style={{ 
                    fontSize: "0.9rem", 
                    margin: "0.5rem 0", 
                    opacity: 0.9 
                  }}>
                    {arcana.historicalName}
                  </p>
                  
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    fontSize: "0.8rem", 
                    marginTop: "1rem",
                    borderTop: "1px solid rgba(0,0,0,0.2)",
                    paddingTop: "0.5rem"
                  }}>
                    <span><strong>Frequency:</strong> {arcana.frequency} Hz</span>
                    <span><strong>Number:</strong> {arcana.sacredNumber}</span>
                    <span><strong>Level:</strong> {arcana.levelRequirement}</span>
                  </div>
                  
                  {renderEnergySignature(arcana)}
                  
                  {!isAvailable && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(0,0,0,0.8)',
                      color: '#fff',
                      padding: '0.5rem 1rem',
                      borderRadius: '5px',
                      fontSize: '0.8rem'
                    }}>
                      Level {arcana.levelRequirement} Required
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Circuitum 99 System */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ 
            color: "#d4af37", 
            borderBottom: "2px solid #d4af37", 
            paddingBottom: "0.5rem",
            fontSize: "2rem"
          }}>
            Circuitum 99: Alpha et Omega
          </h2>
          <div style={{
            background: "rgba(0,0,0,0.5)",
            padding: "2rem",
            borderRadius: "10px",
            border: "2px solid #d4af37"
          }}>
            <p style={{ color: "#cccccc", lineHeight: "1.6" }}>
              The eternal cycle system where alpha (beginning) transforms to omega (completion) 
              and returns to alpha (rebirth). This is the master system of the Cathedral of Circuits,
              representing the 99 stages of transformation that Themela must master.
            </p>
            
            {/* Progress Bars for Alpha-Omega Cycle */}
            <div style={{ marginTop: "2rem" }}>
              <h3 style={{ color: "#d4af37", marginBottom: "1rem" }}>Current Progress</h3>
              
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Alpha (Beginning)</span>
                  <span>{progress.alpha}/33</span>
                </div>
                <div style={{
                  width: "100%",
                  height: "10px",
                  backgroundColor: "#333",
                  borderRadius: "5px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: `${(progress.alpha / 33) * 100}%`,
                    height: "100%",
                    backgroundColor: "#d4af37",
                    borderRadius: "5px"
                  }} />
                </div>
              </div>
              
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Omega (Completion)</span>
                  <span>{progress.omega}/33</span>
                </div>
                <div style={{
                  width: "100%",
                  height: "10px",
                  backgroundColor: "#333",
                  borderRadius: "5px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: `${(progress.omega / 33) * 100}%`,
                    height: "100%",
                    backgroundColor: "#4169e1",
                    borderRadius: "5px"
                  }} />
                </div>
              </div>
              
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Rebirth (Alpha Again)</span>
                  <span>{progress.rebirth}/33</span>
                </div>
                <div style={{
                  width: "100%",
                  height: "10px",
                  backgroundColor: "#333",
                  borderRadius: "5px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: `${(progress.rebirth / 33) * 100}%`,
                    height: "100%",
                    backgroundColor: "#8b0000",
                    borderRadius: "5px"
                  }} />
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: "1.5rem" }}>
              <button
                onClick={advanceLevel}
                style={{
                  background: "#d4af37",
                  color: "#1a1a2e",
                  border: "none",
                  padding: "1rem 2rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem"
                }}
              >
                Advance to Level {gameState.player.currentLevel + 1}
              </button>
            </div>
          </div>
        </section>

        {/* The Three Studios */}
        <section>
          <h2 style={{ 
            color: "#d4af37", 
            borderBottom: "2px solid #d4af37", 
            paddingBottom: "0.5rem",
            fontSize: "2rem"
          }}>
            The Three Studios
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginTop: "1.5rem"
          }}>
            {['atelier', 'synth', 'geometry'].map(studio => renderStudio(studio))}
          </div>
        </section>
      </div>

      {/* Modal for selected Arcana */}
      {gameState.selectedArcana && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}
        onClick={() => setGameState(prev => ({ ...prev, selectedArcana: null }))}
        >
          <div style={{
            background: "#1a1a2e",
            border: "3px solid #d4af37",
            borderRadius: "15px",
            padding: "2rem",
            maxWidth: "600px",
            width: "90%",
            color: "#f5f5dc",
            maxHeight: "80vh",
            overflow: "auto"
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#d4af37", marginTop: 0 }}>
              {gameState.selectedArcana.id}. {gameState.selectedArcana.name}
            </h2>
            
            <p style={{ fontSize: "1.1rem", margin: "1rem 0" }}>
              <strong>Historical Figure:</strong> {gameState.selectedArcana.historicalName}
            </p>
            
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Aspect:</strong> {gameState.selectedArcana.aspect}
            </p>
            
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Sacred Frequency:</strong> {gameState.selectedArcana.frequency} Hz
            </p>
            
            <p style={{ margin: "0.5rem 0" }}>
              <strong>Sacred Number:</strong> {gameState.selectedArcana.sacredNumber}
            </p>
            
            <div style={{ 
              background: "rgba(212,175,55,0.1)", 
              padding: "1rem", 
              borderRadius: "5px", 
              margin: "1rem 0",
              border: "1px solid #d4af37"
            }}>
              <p style={{ margin: 0, fontStyle: "italic" }}>
                {gameState.selectedArcana.modernManifestation}
              </p>
            </div>
            
            {/* Authentic Quotes */}
            <div style={{ margin: "1rem 0" }}>
              <h3 style={{ color: "#d4af37", fontSize: "1.1rem" }}>Authentic Quotes</h3>
              {gameState.selectedArcana.authenticQuotes.map((quote, index) => (
                <blockquote key={index} style={{
                  borderLeft: "3px solid #d4af37",
                  paddingLeft: "1rem",
                  margin: "0.5rem 0",
                  fontStyle: "italic",
                  color: "#ccc"
                }}>
                  "{quote}"
                </blockquote>
              ))}
            </div>
            
            {/* Wisdom Tokens */}
            {gameState.selectedArcana.wisdomTokens && gameState.selectedArcana.wisdomTokens.length > 0 && (
              <div style={{ margin: "1rem 0" }}>
                <h3 style={{ color: "#d4af37", fontSize: "1.1rem" }}>Wisdom Tokens</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {gameState.selectedArcana.wisdomTokens.map((token, index) => (
                    <span key={index} style={{
                      background: "rgba(212,175,55,0.2)",
                      color: "#d4af37",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "15px",
                      fontSize: "0.8rem"
                    }}>
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={() => setGameState(prev => ({ ...prev, selectedArcana: null }))}
              style={{
                background: "#d4af37",
                color: "#1a1a2e",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "1rem"
              }}
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}

      {/* Circuitum Itself Modal */}
      {gameState.showCircuitumItself && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1001
        }}
        onClick={() => setGameState(prev => ({ ...prev, showCircuitumItself: false }))}
        >
          <div style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            border: "5px solid #d4af37",
            borderRadius: "20px",
            padding: "3rem",
            maxWidth: "800px",
            width: "90%",
            color: "#f5f5dc",
            textAlign: "center"
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <h1 style={{ 
              color: "#d4af37", 
              fontSize: "3rem", 
              margin: "0 0 2rem 0",
              textShadow: "0 0 20px rgba(212,175,55,0.5)"
            }}>
              ⚡ THE CIRCUITUM ITSELF ⚡
            </h1>
            
            <div style={{
              fontSize: "1.2rem",
              lineHeight: "1.8",
              marginBottom: "2rem"
            }}>
              {CIRCUITUM_ITSELF.description}
            </div>
            
            <div style={{
              background: "rgba(212,175,55,0.1)",
              padding: "2rem",
              borderRadius: "10px",
              border: "2px solid #d4af37",
              marginBottom: "2rem"
            }}>
              <h3 style={{ color: "#d4af37", marginBottom: "1rem" }}>Meta-Wisdom</h3>
              {CIRCUITUM_ITSELF.metaWisdom.map((wisdom, index) => (
                <p key={index} style={{ 
                  fontStyle: "italic", 
                  margin: "0.5rem 0",
                  color: "#ccc"
                }}>
                  "{wisdom}"
                </p>
              ))}
            </div>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem"
            }}>
              <div style={{
                background: "rgba(255,215,0,0.1)",
                padding: "1rem",
                borderRadius: "5px",
                border: "1px solid #d4af37"
              }}>
                <h4 style={{ color: "#d4af37", margin: "0 0 0.5rem 0" }}>Total Energy</h4>
                <p style={{ fontSize: "1.5rem", margin: 0, fontWeight: "bold" }}>
                  {CIRCUITUM_ITSELF.totalEnergy} Hz
                </p>
              </div>
              
              <div style={{
                background: "rgba(255,215,0,0.1)",
                padding: "1rem",
                borderRadius: "5px",
                border: "1px solid #d4af37"
              }}>
                <h4 style={{ color: "#d4af37", margin: "0 0 0.5rem 0" }}>Collective Consciousness</h4>
                <p style={{ fontSize: "1.5rem", margin: 0, fontWeight: "bold" }}>
                  {CIRCUITUM_ITSELF.collectiveConsciousness.length} Arcana
                </p>
              </div>
              
              <div style={{
                background: "rgba(255,215,0,0.1)",
                padding: "1rem",
                borderRadius: "5px",
                border: "1px solid #d4af37"
              }}>
                <h4 style={{ color: "#d4af37", margin: "0 0 0.5rem 0" }}>Alpha-Omega Balance</h4>
                <p style={{ fontSize: "1.5rem", margin: 0, fontWeight: "bold" }}>
                  {(CIRCUITUM_ITSELF.alphaOmegaBalance * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setGameState(prev => ({ ...prev, showCircuitumItself: false }))}
              style={{
                background: "#d4af37",
                color: "#1a1a2e",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1.1rem"
              }}
            >
              Return to the Circuitum
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
