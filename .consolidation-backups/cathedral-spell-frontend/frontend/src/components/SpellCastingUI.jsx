// React Spell Scene Components
// Interactive spell visualization with Three.js integration

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import axios from 'axios';

// Spell API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Volcanic Fire Effect with Three.js
const VolcanicFireEffect = ({ config }) => {
    const meshRef = useRef();
    const particlesRef = useRef();
    const { scene } = useThree();

    useEffect(() => {
        if (!config) return;

        // Create particle system for fire
        const particleCount = config.particles?.count || 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Position
            positions[i3] = (Math.random() - 0.5) * 4;
            positions[i3 + 1] = Math.random() * 2;
            positions[i3 + 2] = (Math.random() - 0.5) * 4;

            // Color (red-orange gradient)
            colors[i3] = 1.0; // Red
            colors[i3 + 1] = Math.random() * 0.8; // Green (for orange)
            colors[i3 + 2] = 0.0; // Blue

            // Velocity
            velocities[i3] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 1] = Math.random() * 0.05 + 0.02;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const material = new THREE.PointsMaterial({
            size: config.particles?.size || 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        particlesRef.current = particles;

        return () => {
            scene.remove(particles);
            geometry.dispose();
            material.dispose();
        };
    }, [config, scene]);

    useFrame((state, delta) => {
        if (!particlesRef.current) return;

        const positions = particlesRef.current.geometry.attributes.position.array;
        const velocities = particlesRef.current.geometry.attributes.velocity.array;

        // Animate particles
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            // Reset particles that go too high
            if (positions[i + 1] > 8) {
                positions[i] = (Math.random() - 0.5) * 4;
                positions[i + 1] = 0;
                positions[i + 2] = (Math.random() - 0.5) * 4;
            }
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial
                color={config.core_color || "#ff4500"}
                emissive={config.core_color || "#ff4500"}
                emissiveIntensity={0.3}
            />
        </mesh>
    );
};

// Spell Cast Animation
const SpellCastAnimation = ({ isActive, intensity = 0.5 }) => {
    const ringRef = useRef();

    useFrame((state, delta) => {
        if (!ringRef.current || !isActive) return;

        ringRef.current.rotation.y += delta * intensity;
        ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    });

    if (!isActive) return null;

    return (
        <mesh ref={ringRef} position={[0, 0.1, 0]}>
            <torusGeometry args={[2, 0.1, 8, 32]} />
            <meshStandardMaterial
                color="#9d4edd"
                emissive="#9d4edd"
                emissiveIntensity={0.5}
                transparent
                opacity={0.7}
            />
        </mesh>
    );
};

// Main Spell Scene Component
const SpellScene = ({ spell, isActive = false }) => {
    const [cameraPosition, setCameraPosition] = useState([0, 5, 8]);

    useEffect(() => {
        if (spell && spell.three_js_config) {
            const config = spell.three_js_config;
            if (config.camera_position) {
                setCameraPosition(config.camera_position);
            }
        }
    }, [spell]);

    if (!spell) {
        return (
            <Canvas camera={{ position: [0, 5, 8] }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />

                <Text
                    position={[0, 0, 0]}
                    fontSize={1}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    No spell active
                </Text>
            </Canvas>
        );
    }

    return (
        <Canvas camera={{ position: cameraPosition }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={0.8}
                color="#ffd700"
            />

            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

            {/* Spell Effects */}
            {spell.effect === 'volcanic_fire' && (
                <VolcanicFireEffect config={spell.three_js_config} />
            )}

            {/* Cast Animation */}
            <SpellCastAnimation isActive={isActive} intensity={spell.intensity} />

            {/* Oracle Text */}
            <Text
                position={[0, 6, 0]}
                fontSize={0.3}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={10}
            >
                {spell.oracle_sentence}
            </Text>

            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#2a2a2a" />
            </mesh>
        </Canvas>
    );
};

// Spell Casting UI Component
const SpellCastingUI = () => {
    const [availableSpells, setAvailableSpells] = useState([]);
    const [currentSpell, setCurrentSpell] = useState(null);
    const [isCasting, setIsCasting] = useState(false);
    const [spellResult, setSpellResult] = useState(null);
    const [worldState, setWorldState] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch available spells on mount
    useEffect(() => {
        fetchAvailableSpells();
        fetchWorldState();
    }, []);

    const fetchAvailableSpells = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/spells/available`);
            setAvailableSpells(response.data.spells);
        } catch (error) {
            console.error('Failed to fetch spells:', error);
        }
    };

    const fetchWorldState = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/world/state`);
            setWorldState(response.data);
        } catch (error) {
            console.error('Failed to fetch world state:', error);
        }
    };

    const castSpell = async (spellId, casterLocation = null) => {
        setLoading(true);
        setIsCasting(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/spells/cast`, {
                spell_id: spellId,
                caster_location: casterLocation
            });

            setSpellResult(response.data.spell_result);
            setCurrentSpell(response.data.spell_result);

            // Update world state
            await fetchWorldState();

            // Animation timing
            setTimeout(() => {
                setIsCasting(false);
            }, 3000);

        } catch (error) {
            console.error('Failed to cast spell:', error);
            setIsCasting(false);
        } finally {
            setLoading(false);
        }
    };

    const resetWorld = async () => {
        try {
            await axios.post(`${API_BASE_URL}/world/reset`);
            await fetchWorldState();
            setCurrentSpell(null);
            setSpellResult(null);
        } catch (error) {
            console.error('Failed to reset world:', error);
        }
    };

    return (
        <div className="spell-casting-app">
            <div className="spell-scene-container">
                <SpellScene spell={currentSpell} isActive={isCasting} />
            </div>

            <div className="spell-ui-panel">
                <h1>🏛️ Cathedral Spell Engine</h1>

                {/* Available Spells */}
                <div className="spells-section">
                    <h2>Available Spells</h2>
                    <div className="spells-grid">
                        {availableSpells.map((spell) => (
                            <button
                                key={spell.id}
                                className={`spell-button ${spell.element}`}
                                onClick={() => castSpell(spell.id)}
                                disabled={loading || isCasting}
                            >
                                <div className="spell-name">{spell.name}</div>
                                <div className="spell-element">{spell.element}</div>
                                <div className="spell-intensity">Intensity: {spell.intensity}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Spell Result */}
                {spellResult && (
                    <div className="spell-result">
                        <h3>Spell Cast Result</h3>
                        <div className="oracle-sentence">{spellResult.oracle_sentence}</div>

                        {spellResult.museum_sources.length > 0 && (
                            <div className="museum-sources">
                                <strong>Museum Sources:</strong>
                                <ul>
                                    {spellResult.museum_sources.map((source, idx) => (
                                        <li key={idx}>{source}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {spellResult.artifacts_generated.length > 0 && (
                            <div className="artifacts">
                                <strong>Artifacts Generated:</strong>
                                <ul>
                                    {spellResult.artifacts_generated.map((artifact, idx) => (
                                        <li key={idx}>{artifact}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {spellResult.graph_navigation && (
                            <div className="graph-navigation">
                                <strong>Graph Navigation:</strong>
                                <div>Current Node: {spellResult.graph_navigation.current_node}</div>
                                <div>Intensity: {spellResult.graph_navigation.intensity}</div>
                                <div>Oracle: {spellResult.graph_navigation.oracle}</div>
                            </div>
                        )}
                    </div>
                )}

                {/* World State */}
                {worldState && (
                    <div className="world-state">
                        <h3>World State</h3>
                        <div>Weather: {worldState.world.weather}</div>
                        <div>Terrain: {worldState.world.terrain}</div>
                        <div>Energy Level: {worldState.player.energy_level}</div>

                        <div className="npcs">
                            <strong>NPCs:</strong>
                            {worldState.world.npcs.map((npc, idx) => (
                                <div key={idx} className="npc">
                                    {npc.name} ({npc.emotion}) at {npc.location}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Controls */}
                <div className="controls">
                    <button onClick={resetWorld} className="reset-button">
                        🔄 Reset World
                    </button>
                    <button onClick={fetchWorldState} className="refresh-button">
                        ↻ Refresh State
                    </button>
                </div>
            </div>
        </div>
    );
};

// CSS Styles (to be added to a separate CSS file)
const styles = `
.spell-casting-app {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.spell-scene-container {
  flex: 1;
  height: 100%;
}

.spell-ui-panel {
  width: 400px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  overflow-y: auto;
  border-left: 2px solid #9d4edd;
}

.spells-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.spell-button {
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.spell-button.fire {
  background: linear-gradient(135deg, #ff4500, #ff6347);
}

.spell-button.water {
  background: linear-gradient(135deg, #0077be, #4169e1);
}

.spell-button.earth {
  background: linear-gradient(135deg, #8b4513, #a0522d);
}

.spell-button.air {
  background: linear-gradient(135deg, #87ceeb, #b0e0e6);
}

.spell-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(157, 78, 221, 0.3);
}

.spell-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.spell-name {
  font-weight: bold;
  font-size: 16px;
}

.spell-element {
  font-size: 12px;
  opacity: 0.8;
  text-transform: uppercase;
}

.spell-intensity {
  font-size: 12px;
  margin-top: 5px;
}

.spell-result {
  background: rgba(157, 78, 221, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #9d4edd;
}

.oracle-sentence {
  font-style: italic;
  font-size: 14px;
  margin-bottom: 10px;
  color: #ffd700;
}

.museum-sources ul,
.artifacts ul {
  margin: 5px 0;
  padding-left: 20px;
}

.world-state {
  background: rgba(0, 100, 0, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #32cd32;
}

.npcs {
  margin-top: 10px;
}

.npc {
  font-size: 12px;
  margin: 2px 0;
  padding: 2px 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.controls {
  display: flex;
  gap: 10px;
}

.reset-button,
.refresh-button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.reset-button {
  background: #dc3545;
  color: white;
}

.refresh-button {
  background: #28a745;
  color: white;
}

.reset-button:hover,
.refresh-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
`;

export default SpellCastingUI;
export { SpellScene, VolcanicFireEffect, styles };