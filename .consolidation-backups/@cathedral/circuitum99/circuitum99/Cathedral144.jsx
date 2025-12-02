// Cathedral144.jsx - Complete Alice/Matrix/RPG System
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './Cathedral144.css';

const MAJOR_ARCANA = [
  { id: 0, name: "THE FOOL", char: "Alice", subtitle: "Gateway of Beginnings", color: 0xffd700, ability: "Leap of Faith", cost: 0 },
  { id: 1, name: "THE MAGICIAN", char: "John Dee", subtitle: "Sacred Geometry", color: 0xd4af37, ability: "Enochian Sigils", cost: 10 },
  { id: 2, name: "THE HIGH PRIESTESS", char: "Dion Fortune", subtitle: "Hidden Knowledge", color: 0x9370db, ability: "Astral Sight", cost: 15 },
  { id: 3, name: "THE EMPRESS", char: "Leonora Carrington", subtitle: "Surreal Nature", color: 0x2ecc71, ability: "Reality Warp", cost: 20 },
  { id: 4, name: "THE EMPEROR", char: "Buckminster Fuller", subtitle: "Cosmic Order", color: 0xe74c3c, ability: "Geodesic Shield", cost: 25 },
  { id: 5, name: "THE HIEROPHANT", char: "Max Ernst", subtitle: "Spirit Guide", color: 0xf39c12, ability: "Sacred Transmission", cost: 20 },
  { id: 6, name: "THE LOVERS", char: "Remedios Varo", subtitle: "Sacred Union", color: 0xe91e63, ability: "Dual Nature", cost: 30 },
  { id: 7, name: "THE CHARIOT", char: "Austin Osman Spare", subtitle: "Will in Motion", color: 0x3498db, ability: "Sigil Speed", cost: 25 },
  { id: 8, name: "STRENGTH", char: "Hilma af Klint", subtitle: "Inner Power", color: 0xf5d4c8, ability: "Divine Geometry", cost: 35 },
  { id: 9, name: "THE HERMIT", char: "Aleister Crowley", subtitle: "Solitary Path", color: 0x95a5a6, ability: "Thelemic Vision", cost: 30 },
  { id: 10, name: "WHEEL OF FORTUNE", char: "The Cycles", subtitle: "Manifestation", color: 0x1abc9c, ability: "Fate Shift", cost: 40 },
  { id: 11, name: "JUSTICE", char: "Cosmic Balance", subtitle: "Truth Unveiled", color: 0x34495e, ability: "Equilibrium", cost: 35 },
  { id: 12, name: "THE HANGED MAN", char: "Neo", subtitle: "Surrender & Vision", color: 0x16a085, ability: "Bullet Time", cost: 45 },
  { id: 13, name: "DEATH", char: "Transformation", subtitle: "Gate Keeper", color: 0x2c3e50, ability: "Metamorphosis", cost: 50 },
  { id: 14, name: "TEMPERANCE", char: "The Alchemist", subtitle: "Synthesis", color: 0xe8dff5, ability: "Transmutation", cost: 40 },
  { id: 15, name: "THE DEVIL", char: "Shadow Self", subtitle: "Integration", color: 0x8e44ad, ability: "Shadow Work", cost: 45 },
  { id: 16, name: "THE TOWER", char: "Divine Disruption", subtitle: "Breaking Point", color: 0xc0392b, ability: "Chaos Strike", cost: 60 },
  { id: 17, name: "THE STAR", char: "Cosmic Hope", subtitle: "Guidance", color: 0x87ceeb, ability: "Stellar Navigation", cost: 35 },
  { id: 18, name: "THE MOON", char: "Moonchild", subtitle: "Dream Logic", color: 0xe8b4b8, ability: "Lunar Illusion", cost: 40 },
  { id: 19, name: "THE SUN", char: "Illumination", subtitle: "Consciousness", color: 0xffa500, ability: "Solar Clarity", cost: 50 },
  { id: 20, name: "JUDGEMENT", char: "Awakening", subtitle: "Resurrection", color: 0xff69b4, ability: "Rebirth", cost: 55 },
  { id: 21, name: "THE WORLD", char: "Unity", subtitle: "Completion", color: 0xd4af37, ability: "Cosmic Dance", cost: 100 }
];

export default function Cathedral144() {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const [gameState, setGameState] = useState('portal'); // portal, matrix, playing
  const [motionReduced, setMotionReduced] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [motionIntensity, setMotionIntensity] = useState(0.3);
  
  const [player, setPlayer] = useState({
    level: 1,
    xp: 0,
    xpToNext: 100,
    hp: 100,
    maxHp: 100,
    mana: 50,
    maxMana: 50,
    abilities: [0], // unlocked arcana IDs
    inventory: [],
    visitedNodes: [0],
    currentNode: 0,
    gold: 0
  });
  
  const [settings, setSettings] = useState({
    depth: 5,
    frequency: 432,
    ratio: 1.618,
    flow: 0.5,
    volume: 0.1 // Safe default
  });

  const [activeAbility, setActiveAbility] = useState(null);
  const [showCodex, setShowCodex] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [questLog, setQuestLog] = useState([
    { id: 1, name: "Follow the White Rabbit", progress: 0, max: 1, reward: { xp: 50, gold: 10 } },
    { id: 2, name: "Unlock 5 Major Arcana", progress: 1, max: 5, reward: { xp: 200, ability: 5 } },
    { id: 3, name: "Master Sacred Geometry", progress: 0, max: 3, reward: { xp: 150, item: "Merkaba Crystal" } }
  ]);

  const sceneRef = useRef(null);
  const audioContextRef = useRef(null);

  // Check for motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMotionReduced(mediaQuery.matches);
    
    const handler = () => setMotionReduced(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Global escape key handler
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') {
        // Exit pointer lock
        if (document.pointerLockElement) document.exitPointerLock();
        // Pause all motion
        setIsPaused(true);
        // Stop audio
        if (audioContextRef.current && audioContextRef.current.state === 'running') {
          audioContextRef.current.suspend();
        }
        // Reset to safe state
        setGameState('portal');
        setPlayer(prev => ({ ...prev, currentNode: 0 }));
        // Dispatch safe stop event
        window.dispatchEvent(new CustomEvent('cathedral-safe-stop'));
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // === MATRIX RAIN TRANSITION ===
  useEffect(() => {
    if (gameState === 'matrix' && !motionReduced) {
      const canvas = document.getElementById('matrix-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const chars = '🐇♠♣♥♦⚡01アイウ';
      const fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = Array(columns).fill(1);
      
      const interval = setInterval(() => {
        if (isPaused) return;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }, motionReduced ? 200 : 50);
      
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setGameState('playing');
      }, motionReduced ? 1000 : 3000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else if (gameState === 'matrix' && motionReduced) {
      // Skip matrix effect for reduced motion
      setTimeout(() => setGameState('playing'), 500);
    }
  }, [gameState, motionReduced, isPaused]);

  // === THREE.JS SCENE ===
  useEffect(() => {
    if (gameState !== 'playing' || !mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    camera.position.set(0, 5, 20);
    sceneRef.current = { scene, camera, renderer };

    // Gentle lighting
    const ambient = new THREE.AmbientLight(0x888888, 0.6);
    scene.add(ambient);
    
    const pointLight = new THREE.PointLight(0xd4af37, 0.8, 100);
    pointLight.position.set(0, 15, 15);
    scene.add(pointLight);

    // Reduced particle system for performance
    const particleCount = motionReduced ? 500 : 1000;
    const particleGeo = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < particleCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
      
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.75, 0.7, 0.6);
      colors.push(color.r, color.g, color.b);
    }
    
    particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Use InstancedMesh for nodes (performance)
    const nodeGeo = new THREE.OctahedronGeometry(0.6, 0);
    const nodeMat = new THREE.MeshPhongMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.8
    });
    
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, 144);
    const dummy = new THREE.Object3D();
    const colorArray = new Float32Array(144 * 3);
    
    for (let i = 0; i < 144; i++) {
      const isUnlocked = player.visitedNodes.includes(i);
      const isMajor = i < 22;
      
      if (isMajor) {
        const angle = (i / 22) * Math.PI * 2;
        const radius = 12;
        dummy.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        
        // Set color for major arcana
        const color = new THREE.Color(MAJOR_ARCANA[i].color);
        colorArray[i * 3] = color.r;
        colorArray[i * 3 + 1] = color.g;
        colorArray[i * 3 + 2] = color.b;
      } else {
        const ring = Math.floor((i - 22) / 40);
        const slot = (i - 22) % 40;
        const angle = (slot / 40) * Math.PI * 2;
        const radius = 22 + ring * 12;
        dummy.position.set(
          Math.cos(angle) * radius,
          ring * 2 - 3,
          Math.sin(angle) * radius
        );
        
        // Set color for minor nodes
        const color = new THREE.Color(0x4a5568);
        colorArray[i * 3] = color.r;
        colorArray[i * 3 + 1] = color.g;
        colorArray[i * 3 + 2] = color.b;
      }
      
      dummy.updateMatrix();
      instancedNodes.setMatrixAt(i, dummy.matrix);
    }
    
    instancedNodes.geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArray, 3));
    instancedNodes.instanceMatrix.needsUpdate = true;
    scene.add(instancedNodes);

    // Merkaba geometry (star tetrahedron)
    const merkabaGeo = new THREE.TetrahedronGeometry(3, 0);
    const merkabaMat = new THREE.MeshPhongMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      emissive: 0xd4af37,
      emissiveIntensity: 0.3
    });
    
    const merkaba1 = new THREE.Mesh(merkabaGeo, merkabaMat);
    const merkaba2 = new THREE.Mesh(merkabaGeo, merkabaMat.clone());
    merkaba2.rotation.z = Math.PI;
    
    const merkabaGroup = new THREE.Group();
    merkabaGroup.add(merkaba1);
    merkabaGroup.add(merkaba2);
    merkabaGroup.position.y = 8;
    scene.add(merkabaGroup);

    // Animation loop with motion sensitivity
    let time = 0;
    function animate() {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      animationRef.current = requestAnimationFrame(animate);
      
      const motionMultiplier = motionReduced ? 0.1 : motionIntensity;
      time += 0.01 * motionMultiplier;
      
      // Gentle particle rotation
      particles.rotation.y += 0.0005 * settings.flow * motionMultiplier;
      
      // Pulse nodes gently
      for (let i = 0; i < 144; i++) {
        if (player.visitedNodes.includes(i)) {
          const scale = 1 + Math.sin(time * settings.frequency / 100 + i) * 0.15 * motionMultiplier;
          dummy.scale.set(scale, scale, scale);
          dummy.updateMatrix();
          instancedNodes.setMatrixAt(i, dummy.matrix);
        }
      }
      instancedNodes.instanceMatrix.needsUpdate = true;
      
      // Gentle Merkaba rotation
      if (!motionReduced) {
        merkabaGroup.rotation.y += 0.01 * motionMultiplier;
        merkaba1.rotation.x += 0.02 * motionMultiplier;
        merkaba2.rotation.x -= 0.02 * motionMultiplier;
      }
      
      // Subtle camera orbit
      if (!motionReduced) {
        const radius = 20;
        camera.position.x = Math.sin(time * 0.05) * radius * motionMultiplier;
        camera.position.z = Math.cos(time * 0.05) * radius;
        camera.lookAt(0, 0, 0);
      }
      
      renderer.render(scene, camera);
    }
    
    animate();

    // Raycaster for node selection with accessibility
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    function onClick(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(instancedNodes);
      
      if (intersects.length > 0) {
        const instanceId = intersects[0].instanceId;
        if (player.visitedNodes.includes(instanceId)) {
          visitNode(instanceId);
        }
      }
    }
    
    renderer.domElement.addEventListener('click', onClick);
    
    // Keyboard navigation
    function onKeyDown(e) {
      if (e.key === 'Tab' && showCodex) {
        e.preventDefault();
        // Cycle through unlocked nodes
        const unlockedNodes = player.visitedNodes.filter(id => id < 22);
        const currentIndex = unlockedNodes.indexOf(player.currentNode);
        const nextIndex = (currentIndex + 1) % unlockedNodes.length;
        visitNode(unlockedNodes[nextIndex]);
      }
    }
    
    window.addEventListener('keydown', onKeyDown);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      renderer.domElement.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [gameState, player.visitedNodes, settings, motionReduced, isPaused, motionIntensity]);

  // === GAME LOGIC ===
  function visitNode(nodeId) {
    if (!player.visitedNodes.includes(nodeId)) {
      setPlayer(prev => ({
        ...prev,
        visitedNodes: [...prev.visitedNodes, nodeId],
        currentNode: nodeId,
        xp: prev.xp + 20,
        gold: prev.gold + 5
      }));
      
      checkLevelUp();
      updateQuest(2, 1);
    } else {
      setPlayer(prev => ({ ...prev, currentNode: nodeId }));
    }
  }

  function checkLevelUp() {
    setPlayer(prev => {
      if (prev.xp >= prev.xpToNext) {
        return {
          ...prev,
          level: prev.level + 1,
          xp: prev.xp - prev.xpToNext,
          xpToNext: Math.floor(prev.xpToNext * 1.5),
          maxHp: prev.maxHp + 10,
          hp: prev.maxHp + 10,
          maxMana: prev.maxMana + 5,
          mana: prev.maxMana + 5
        };
      }
      return prev;
    });
  }

  function unlockAbility(arcanaId) {
    const arcana = MAJOR_ARCANA[arcanaId];
    if (!player.abilities.includes(arcanaId) && player.gold >= arcana.cost) {
      setPlayer(prev => ({
        ...prev,
        abilities: [...prev.abilities, arcanaId],
        gold: prev.gold - arcana.cost
      }));
      updateQuest(2, 1);
    }
  }

  function useAbility(arcanaId) {
    const arcana = MAJOR_ARCANA[arcanaId];
    const manaCost = Math.floor(arcana.cost / 2);
    
    if (player.mana >= manaCost) {
      setActiveAbility(arcana);
      setPlayer(prev => ({ ...prev, mana: prev.mana - manaCost }));
      
      setTimeout(() => setActiveAbility(null), 3000);
    }
  }

  function updateQuest(questId, amount) {
    setQuestLog(prev => prev.map(q => {
      if (q.id === questId && q.progress < q.max) {
        const newProgress = Math.min(q.progress + amount, q.max);
        if (newProgress === q.max) {
          if (q.reward.xp) setPlayer(p => ({ ...p, xp: p.xp + q.reward.xp }));
          if (q.reward.gold) setPlayer(p => ({ ...p, gold: p.gold + q.reward.gold }));
          if (q.reward.ability) unlockAbility(q.reward.ability);
          if (q.reward.item) {
            setPlayer(p => ({ ...p, inventory: [...p.inventory, q.reward.item] }));
          }
        }
        return { ...q, progress: newProgress };
      }
      return q;
    }));
  }

  function enterWonderland() {
    updateQuest(1, 1);
    setGameState('matrix');
  }

  function startAudio() {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();
      gain.gain.value = settings.volume * 0.01; // Ultra-safe default
      osc.frequency.value = settings.frequency;
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);
      osc.start();
      setAudioEnabled(true);
    }
  }

  function togglePause() {
    setIsPaused(prev => {
      const newPaused = !prev;
      if (audioContextRef.current) {
        if (newPaused) {
          audioContextRef.current.suspend();
        } else {
          audioContextRef.current.resume();
        }
      }
      window.dispatchEvent(new CustomEvent('cathedral-pause-toggle', { detail: { paused: newPaused } }));
      return newPaused;
    });
  }

  const currentArcana = MAJOR_ARCANA[player.currentNode] || MAJOR_ARCANA[0];

  return (
    <div className="cathedral-root">
      {/* PORTAL SCREEN */}
      {gameState === 'portal' && (
        <div className="portal-screen" role="main">
          <div className="portal-content">
            <div className="rabbit" aria-hidden="true">🐇</div>
            <h1>Cathedral 144:99</h1>
            <h2>Codex Abyssiae Explorer</h2>
            <p className="portal-tagline">
              Follow the White Rabbit into the Merkaba<br/>
              Where Alice meets Neo in Sacred Geometry
            </p>
            
            {/* Motion Controls */}
            <div className="portal-controls">
              <label>
                Motion Intensity: {(motionIntensity * 100).toFixed(0)}%
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  value={motionIntensity}
                  onChange={e => setMotionIntensity(parseFloat(e.target.value))}
                  aria-label="Motion intensity control"
                />
              </label>
              
              <button 
                className="safety-btn"
                onClick={togglePause}
                aria-label={isPaused ? "Resume motion" : "Pause motion"}
              >
                {isPaused ? "▶️ Resume" : "⏸️ Pause"}
              </button>
              
              <button 
                className="safety-btn"
                onClick={startAudio}
                disabled={audioEnabled}
                aria-label="Start optional audio"
              >
                {audioEnabled ? "🔊 Audio On" : "🔊 Start Audio (Optional)"}
              </button>
            </div>
            
            <div className="portal-buttons">
              <button 
                className="portal-btn" 
                onClick={enterWonderland}
                onKeyDown={e => e.key === 'Enter' && enterWonderland()}
                aria-label="Take the red pill and enter the cathedral"
              >
                Take the Red Pill
              </button>
              <button 
                className="portal-btn blue" 
                onClick={enterWonderland}
                aria-label="Take the blue pill and enter the cathedral"
              >
                Take the Blue Pill
              </button>
            </div>
            
            <p className="portal-hint">
              (Both lead to the Cathedral - this is the Matrix's joke)
            </p>
            
            <div className="safety-notice">
              <p><kbd>ESC</kbd> - Safe exit anytime</p>
              <p>Trauma-aware design • Move at your own pace</p>
              {motionReduced && <p>✨ Reduced motion detected - gentle mode enabled</p>}
            </div>
          </div>
        </div>
      )}

      {/* MATRIX TRANSITION */}
      {gameState === 'matrix' && (
        <div className="matrix-container">
          {!motionReduced && <canvas id="matrix-canvas" className="matrix-canvas" aria-hidden="true"></canvas>}
          {motionReduced && (
            <div className="matrix-static">
              <p>🐇 Following the White Rabbit...</p>
              <p>Entering the Cathedral...</p>
            </div>
          )}
        </div>
      )}

      {/* MAIN GAME */}
      {gameState === 'playing' && (
        <>
          <div ref={mountRef} className="hologram-mount" />
          
          {/* Safety Controls (Always Visible) */}
          <div className="safety-panel" role="toolbar" aria-label="Safety controls">
            <button 
              onClick={togglePause}
              className="safety-btn"
              aria-label={isPaused ? "Resume" : "Pause"}
            >
              {isPaused ? "▶️" : "⏸️"}
            </button>
            <button 
              onClick={() => setGameState('portal')}
              className="safety-btn"
              aria-label="Return to portal (safe exit)"
            >
              🏠 Exit
            </button>
            <span className="safety-text">ESC for emergency exit</span>
          </div>
          
          {/* HUD */}
          <div className="hud" role="complementary">
            {/* Node Card */}
            <div className="node-card" role="status" aria-live="polite">
              <div className="card-arcana">{currentArcana.name}</div>
              <div className="card-character">{currentArcana.char}</div>
              <div className="card-subtitle">{currentArcana.subtitle}</div>
            </div>

            {/* Player Stats */}
            <div className="player-stats" role="status">
              <div className="stat-bar">
                <span>HP</span>
                <div className="bar" role="progressbar" aria-valuenow={player.hp} aria-valuemax={player.maxHp}>
                  <div className="fill hp" style={{ width: `${(player.hp/player.maxHp)*100}%` }} />
                </div>
                <span>{player.hp}/{player.maxHp}</span>
              </div>
              <div className="stat-bar">
                <span>MP</span>
                <div className="bar" role="progressbar" aria-valuenow={player.mana} aria-valuemax={player.maxMana}>
                  <div className="fill mp" style={{ width: `${(player.mana/player.maxMana)*100}%` }} />
                </div>
                <span>{player.mana}/{player.maxMana}</span>
              </div>
              <div className="stat-bar">
                <span>XP</span>
                <div className="bar" role="progressbar" aria-valuenow={player.xp} aria-valuemax={player.xpToNext}>
                  <div className="fill xp" style={{ width: `${(player.xp/player.xpToNext)*100}%` }} />
                </div>
                <span>{player.xp}/{player.xpToNext}</span>
              </div>
              <div className="stat-row">
                <span>Level: {player.level}</span>
                <span>Gold: {player.gold}</span>
              </div>
            </div>

            {/* Abilities */}
            <div className="abilities-panel">
              <h3>Abilities</h3>
              <div className="ability-grid" role="group" aria-label="Available abilities">
                {player.abilities.map(id => (
                  <button 
                    key={id}
                    className="ability-btn"
                    onClick={() => useAbility(id)}
                    disabled={player.mana < MAJOR_ARCANA[id].cost / 2}
                    aria-label={`Use ${MAJOR_ARCANA[id].ability} - ${MAJOR_ARCANA[id].cost / 2} mana`}
                  >
                    {MAJOR_ARCANA[id].ability}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="nav-panel">
              <button 
                className="hud-btn" 
                onClick={() => setShowCodex(!showCodex)}
                aria-expanded={showCodex}
                aria-controls="codex-panel"
              >
                📖 Codex
              </button>
              <button 
                className="hud-btn" 
                onClick={() => setShowInventory(!showInventory)}
                aria-expanded={showInventory}
                aria-controls="inventory-panel"
              >
                🎒 Inventory
              </button>
            </div>

            {/* Settings Panel */}
            <div className="settings-panel">
              <h3>Sacred Parameters</h3>
              <label>
                Frequency: {settings.frequency} Hz
                <input 
                  type="range" 
                  min="20" 
                  max="1000" 
                  value={settings.frequency}
                  onChange={e => setSettings(s => ({ ...s, frequency: parseInt(e.target.value) }))}
                  aria-label="Audio frequency"
                />
              </label>
              <label>
                Golden Ratio: {settings.ratio.toFixed(3)}
                <input 
                  type="range" 
                  min="1" 
                  max="2" 
                  step="0.001" 
                  value={settings.ratio}
                  onChange={e => setSettings(s => ({ ...s, ratio: parseFloat(e.target.value) }))}
                  aria-label="Golden ratio parameter"
                />
              </label>
              <label>
                Flow: {settings.flow.toFixed(2)}
                <input 
                  type="range" 
                  min="0" 
                  max="2" 
                  step="0.1" 
                  value={settings.flow}
                  onChange={e => setSettings(s => ({ ...s, flow: parseFloat(e.target.value) }))}
                  aria-label="Animation flow speed"
                />
              </label>
              <label>
                Motion Intensity: {(motionIntensity * 100).toFixed(0)}%
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1" 
                  value={motionIntensity}
                  onChange={e => setMotionIntensity(parseFloat(e.target.value))}
                  aria-label="Overall motion intensity"
                />
              </label>
            </div>
          </div>

          {/* Codex Overlay */}
          {showCodex && (
            <div 
              className="codex-overlay" 
              onClick={() => setShowCodex(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="codex-title"
            >
              <div className="codex-panel" id="codex-panel" onClick={e => e.stopPropagation()}>
                <button 
                  className="close-btn"
                  onClick={() => setShowCodex(false)}
                  aria-label="Close codex"
                >
                  ✕
                </button>
                <h2 id="codex-title">The Codex Abyssiae</h2>
                
                <div className="codex-section">
                  <h3>Quest Log</h3>
                  {questLog.map(q => (
                    <div key={q.id} className="quest-item">
                      <div className="quest-name">{q.name}</div>
                      <div className="quest-progress">
                        <div 
                          className="quest-bar" 
                          role="progressbar" 
                          aria-valuenow={q.progress} 
                          aria-valuemax={q.max}
                        >
                          <div className="quest-fill" style={{ width: `${(q.progress/q.max)*100}%` }} />
                        </div>
                        <span>{q.progress}/{q.max}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="codex-section">
                  <h3>Unlockable Arcana</h3>
                  <div className="arcana-shop">
                    {MAJOR_ARCANA.map(a => (
                      <div key={a.id} className={`arcana-item ${player.abilities.includes(a.id) ? 'owned' : ''}`}>
                        <div className="arcana-name">{a.name}</div>
                        <div className="arcana-char">{a.char}</div>
                        <div className="arcana-ability">{a.ability}</div>
                        {!player.abilities.includes(a.id) && (
                          <button 
                            className="unlock-btn"
                            onClick={() => unlockAbility(a.id)}
                            disabled={player.gold < a.cost}
                            aria-label={`Unlock ${a.name} for ${a.cost} gold`}
                          >
                            Unlock ({a.cost}g)
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Overlay */}
          {showInventory && (
            <div 
              className="codex-overlay" 
              onClick={() => setShowInventory(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="inventory-title"
            >
              <div className="codex-panel" id="inventory-panel" onClick={e => e.stopPropagation()}>
                <button 
                  className="close-btn"
                  onClick={() => setShowInventory(false)}
                  aria-label="Close inventory"
                >
                  ✕
                </button>
                <h2 id="inventory-title">Inventory</h2>
                <div className="inventory-grid">
                  {player.inventory.length === 0 ? (
                    <p>Your inventory is empty</p>
                  ) : (
                    player.inventory.map((item, i) => (
                      <div key={i} className="inventory-item">{item}</div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Active Ability Display */}
          {activeAbility && (
            <div className="ability-active" role="status" aria-live="assertive">
              <div className="ability-name">{activeAbility.ability}</div>
              <div className="ability-char">{activeAbility.char}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}