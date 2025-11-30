// Cathedral144.jsx - Complete Alice/Matrix/RPG System with High-End Graphics
import React, { useEffect, useRef, useState, useCallback } from 'react';
import '@cathedral/shared/src/styles/unified-professional.css';
import * as THREE from 'three';
import './Cathedral144.css';

const MAJOR_ARCANA = [
  { id: 0, name: "THE FOOL", char: "White Rabbit", subtitle: "Gateway of Beginnings", color: 0xffffff, ability: "Quantum Leap", cost: 0, element: "Aether" },
  { id: 1, name: "THE MAGICIAN", char: "John Dee", subtitle: "Sacred Geometry", color: 0xd4af37, ability: "Enochian Sigils", cost: 10, element: "Air" },
  { id: 2, name: "THE HIGH PRIESTESS", char: "Dion Fortune", subtitle: "Hidden Knowledge", color: 0x9370db, ability: "Astral Sight", cost: 15, element: "Water" },
  { id: 3, name: "THE EMPRESS", char: "Leonora Carrington", subtitle: "Surreal Nature", color: 0x2ecc71, ability: "Reality Warp", cost: 20, element: "Earth" },
  { id: 4, name: "THE EMPEROR", char: "Buckminster Fuller", subtitle: "Cosmic Order", color: 0xe74c3c, ability: "Geodesic Shield", cost: 25, element: "Fire" },
  { id: 5, name: "THE HIEROPHANT", char: "Max Ernst", subtitle: "Spirit Guide", color: 0xf39c12, ability: "Sacred Transmission", cost: 20, element: "Spirit" },
  { id: 6, name: "THE LOVERS", char: "Remedios Varo", subtitle: "Sacred Union", color: 0xe91e63, ability: "Dual Nature", cost: 30, element: "Love" },
  { id: 7, name: "THE CHARIOT", char: "Austin Osman Spare", subtitle: "Will in Motion", color: 0x3498db, ability: "Sigil Speed", cost: 25, element: "Motion" },
  { id: 8, name: "STRENGTH", char: "Hilma af Klint", subtitle: "Inner Power", color: 0xf5d4c8, ability: "Divine Geometry", cost: 35, element: "Force" },
  { id: 9, name: "THE HERMIT", char: "Aleister Crowley", subtitle: "Solitary Path", color: 0x95a5a6, ability: "Thelemic Vision", cost: 30, element: "Wisdom" },
  { id: 10, name: "WHEEL OF FORTUNE", char: "The Cycles", subtitle: "Manifestation", color: 0x1abc9c, ability: "Fate Shift", cost: 40, element: "Chance" },
  { id: 11, name: "JUSTICE", char: "Cosmic Balance", subtitle: "Truth Unveiled", color: 0x34495e, ability: "Equilibrium", cost: 35, element: "Balance" },
  { id: 12, name: "THE HANGED MAN", char: "Neo", subtitle: "Surrender & Vision", color: 0x16a085, ability: "Bullet Time", cost: 45, element: "Time" },
  { id: 13, name: "DEATH", char: "Transformation", subtitle: "Gate Keeper", color: 0x2c3e50, ability: "Metamorphosis", cost: 50, element: "Change" },
  { id: 14, name: "TEMPERANCE", char: "The Alchemist", subtitle: "Synthesis", color: 0xe8dff5, ability: "Transmutation", cost: 40, element: "Alchemy" },
  { id: 15, name: "THE DEVIL", char: "Shadow Self", subtitle: "Integration", color: 0x8e44ad, ability: "Shadow Work", cost: 45, element: "Shadow" },
  { id: 16, name: "THE TOWER", char: "Divine Disruption", subtitle: "Breaking Point", color: 0xc0392b, ability: "Chaos Strike", cost: 60, element: "Lightning" },
  { id: 17, name: "THE STAR", char: "Cosmic Hope", subtitle: "Guidance", color: 0x87ceeb, ability: "Stellar Navigation", cost: 35, element: "Stars" },
  { id: 18, name: "THE MOON", char: "Moonchild", subtitle: "Dream Logic", color: 0xe8b4b8, ability: "Lunar Illusion", cost: 40, element: "Dreams" },
  { id: 19, name: "THE SUN", char: "Illumination", subtitle: "Consciousness", color: 0xffa500, ability: "Solar Clarity", cost: 50, element: "Light" },
  { id: 20, name: "JUDGEMENT", char: "Awakening", subtitle: "Resurrection", color: 0xff69b4, ability: "Rebirth", cost: 55, element: "Phoenix" },
  { id: 21, name: "THE WORLD", char: "Unity", subtitle: "Completion", color: 0xd4af37, ability: "Cosmic Dance", cost: 100, element: "Unity" }
];

// High-end shader materials
const createAdvancedNodeShader = () => ({
  uniforms: {
    time: { value: 0 },
    nodeColor: { value: new THREE.Color(0xffffff) },
    intensity: { value: 1.0 },
    frequency: { value: 432.0 },
    goldenRatio: { value: 1.618 },
    isWhiteRabbit: { value: 0.0 },
    powerLevel: { value: 1.0 }
  },
  vertexShader: `
    varying vec3 vWorldPos;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDistance;
    uniform float time;
    uniform float frequency;
    uniform float goldenRatio;
    uniform float powerLevel;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // Sacred geometry displacement
      vec3 pos = position;
      float wave = sin(time * frequency * 0.01 + length(position) * goldenRatio) * 0.1 * powerLevel;
      pos += normal * wave;
      
      // Spiral flow
      float spiral = atan(pos.z, pos.x) + time * 0.5;
      pos.x += sin(spiral) * 0.05 * powerLevel;
      pos.z += cos(spiral) * 0.05 * powerLevel;
      
      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      vWorldPos = worldPos.xyz;
      vDistance = length(worldPos.xyz);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 nodeColor;
    uniform float intensity;
    uniform float frequency;
    uniform float isWhiteRabbit;
    uniform float powerLevel;
    varying vec3 vWorldPos;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDistance;
    
    // Quantum noise function
    float quantum(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898, 78.233, 54.853))) * 43758.5453);
    }
    
    // Fractal noise
    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(quantum(i), quantum(i + vec3(1,0,0)), f.x),
            mix(quantum(i + vec3(0,1,0)), quantum(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(quantum(i + vec3(0,0,1)), quantum(i + vec3(1,0,1)), f.x),
            mix(quantum(i + vec3(0,1,1)), quantum(i + vec3(1,1,1)), f.x), f.y), f.z);
    }
    
    void main() {
      // Base sacred geometry pattern
      float dist = vDistance * 0.1;
      float pulse = sin(time * 2.0 + dist * 3.14159) * 0.5 + 0.5;
      
      // Fresnel effect
      float fresnel = pow(1.0 - max(0.0, dot(normalize(vNormal), vec3(0,0,1))), 2.0);
      
      // Quantum field effect
      vec3 quantumPos = vWorldPos * 0.1 + time * 0.1;
      float quantum_field = noise(quantumPos) * noise(quantumPos * 2.0) * noise(quantumPos * 4.0);
      
      // White Rabbit special effect
      float rabbitGlow = 1.0;
      if (isWhiteRabbit > 0.5) {
        // Time dilation effect for White Rabbit
        float timeWave = sin(time * 5.0) * cos(time * 3.0);
        rabbitGlow = 2.0 + timeWave * 0.5;
        
        // Matrix rain effect
        float rain = step(0.8, quantum(vWorldPos + time));
        rabbitGlow += rain * 3.0;
      }
      
      // Combine all effects
      float finalIntensity = (0.3 + fresnel * 0.4 + quantum_field * 0.3) * intensity * pulse * rabbitGlow * powerLevel;
      
      vec3 color = nodeColor;
      
      // White Rabbit gets special color treatment
      if (isWhiteRabbit > 0.5) {
        vec3 rabbitColors[3];
        rabbitColors[0] = vec3(1.0, 1.0, 1.0); // Pure white
        rabbitColors[1] = vec3(0.0, 1.0, 0.4); // Matrix green
        rabbitColors[2] = vec3(1.0, 0.3, 0.8); // Cheshire pink
        
        float colorCycle = sin(time * 2.0) * 0.5 + 0.5;
        if (colorCycle < 0.33) {
          color = mix(rabbitColors[0], rabbitColors[1], colorCycle * 3.0);
        } else if (colorCycle < 0.66) {
          color = mix(rabbitColors[1], rabbitColors[2], (colorCycle - 0.33) * 3.0);
        } else {
          color = mix(rabbitColors[2], rabbitColors[0], (colorCycle - 0.66) * 3.0);
        }
      }
      
      gl_FragColor = vec4(color * finalIntensity, clamp(finalIntensity, 0.0, 0.9));
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});

// GPU Particle System
const createGPUParticles = (scene, count = 5000) => {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const life = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    // Spiral distribution
    const t = i / count;
    const spiral = t * Math.PI * 2 * 8;
    const radius = 5 + t * 80;
    
    positions[i * 3] = Math.cos(spiral) * radius + (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = Math.sin(spiral) * radius + (Math.random() - 0.5) * 20;
    
    velocities[i * 3] = (Math.random() - 0.5) * 0.1;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    
    // White Rabbit theme colors
    const colorChoice = Math.random();
    if (colorChoice < 0.3) {
      colors[i * 3] = 1.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 1.0; // White
    } else if (colorChoice < 0.6) {
      colors[i * 3] = 0.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 0.4; // Matrix green
    } else {
      colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.3; colors[i * 3 + 2] = 0.8; // Alice pink
    }
    
    sizes[i] = 0.1 + Math.random() * 0.3;
    life[i] = Math.random();
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('life', new THREE.BufferAttribute(life, 1));
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pointTexture: { value: null }
    },
    vertexShader: `
      attribute float size;
      attribute float life;
      attribute vec3 velocity;
      varying vec3 vColor;
      varying float vLife;
      uniform float time;
      
      void main() {
        vColor = color;
        vLife = life;
        
        vec3 pos = position + velocity * time * 10.0;
        
        // Quantum flutter
        pos.x += sin(time * 3.0 + position.y * 0.01) * 0.5;
        pos.z += cos(time * 3.0 + position.x * 0.01) * 0.5;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vLife;
      uniform float time;
      
      void main() {
        float alpha = sin(vLife * 3.14159) * (0.5 + 0.5 * sin(time * 2.0));
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        float glow = 1.0 - smoothstep(0.0, 0.5, dist);
        
        gl_FragColor = vec4(vColor * glow, alpha * glow);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true
  });
  
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  return particles;
};

// White Rabbit Portal Effect
const createWhiteRabbitPortal = (scene) => {
  const portalGroup = new THREE.Group();
  
  // Rabbit hole geometry
  const holeGeometry = new THREE.RingGeometry(2, 4, 32);
  const holeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      depth: { value: 5.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float depth;
      varying vec2 vUv;
      
      float spiral(vec2 uv, float t) {
        vec2 center = uv - 0.5;
        float angle = atan(center.y, center.x);
        float radius = length(center);
        return sin(angle * 8.0 + radius * 20.0 - t * 5.0) * 0.5 + 0.5;
      }
      
      void main() {
        float spiralPattern = spiral(vUv, time);
        float tunnel = 1.0 - length(vUv - 0.5) * 2.0;
        tunnel = pow(tunnel, depth);
        
        vec3 color = mix(
          vec3(0.0, 0.3, 0.8), // Deep blue
          vec3(1.0, 1.0, 1.0), // White
          spiralPattern
        );
        
        float alpha = tunnel * spiralPattern;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });
  
  const rabbitHole = new THREE.Mesh(holeGeometry, holeMaterial);
  rabbitHole.rotation.x = -Math.PI / 2;
  rabbitHole.position.y = -5;
  portalGroup.add(rabbitHole);
  
  // Clock elements floating around portal
  for (let i = 0; i < 12; i++) {
    const clockGeo = new THREE.RingGeometry(0.1, 0.2, 8);
    const clockMat = new THREE.MeshPhongMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.7
    });
    const clock = new THREE.Mesh(clockGeo, clockMat);
    
    const angle = (i / 12) * Math.PI * 2;
    clock.position.x = Math.cos(angle) * 6;
    clock.position.z = Math.sin(angle) * 6;
    clock.position.y = Math.sin(angle + Date.now() * 0.001) * 2;
    
    portalGroup.add(clock);
  }
  
  scene.add(portalGroup);
  return portalGroup;
};

export default function Cathedral144() {
  const mountRef = useRef(null);
  const [gameState, setGameState] = useState('portal'); // portal, matrix, playing
  const [player, setPlayer] = useState({
    level: 1,
    xp: 0,
    xpToNext: 100,
    hp: 100,
    maxHp: 100,
    mana: 50,
    maxMana: 50,
    abilities: [0], // Start with White Rabbit
    inventory: ["Pocket Watch", "Red Pill", "Blue Pill"],
    visitedNodes: [0],
    currentNode: 0,
    gold: 50,
    followingRabbit: true
  });
  
  const [settings, setSettings] = useState({
    depth: 8,
    frequency: 432,
    ratio: 1.618,
    flow: 0.8,
    volume: 0.3,
    particleCount: 5000,
    graphicsQuality: 'ultra'
  });

  const [activeAbility, setActiveAbility] = useState(null);
  const [showCodex, setShowCodex] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [combatMode, setCombatMode] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [rabbitDialogue, setRabbitDialogue] = useState(null);
  
  const [questLog, setQuestLog] = useState([
    { id: 1, name: "Follow the White Rabbit", progress: 0, max: 1, reward: { xp: 100, gold: 50 }, description: "Take the leap into Wonderland" },
    { id: 2, name: "Master the Matrix", progress: 0, max: 1, reward: { xp: 200, ability: 12 }, description: "Learn to bend reality like Neo" },
    { id: 3, name: "Collect Sacred Geometry", progress: 0, max: 7, reward: { xp: 300, item: "Merkaba Crystal" }, description: "Gather the seven sacred forms" },
    { id: 4, name: "Unite the Archetypes", progress: 1, max: 22, reward: { xp: 1000, ability: 21 }, description: "Unlock all Major Arcana" }
  ]);

  const sceneRef = useRef(null);
  const audioContextRef = useRef(null);
  const particleSystemRef = useRef(null);
  const portalRef = useRef(null);
  const animationRef = useRef(null);

  // Enhanced Matrix Rain with White Rabbit symbols
  useEffect(() => {
    if (gameState === 'matrix') {
      const canvas = document.getElementById('matrix-canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const chars = '🐇⏰🕳️♠♣♥♦⚡⚗️🔮✨01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const fontSize = 18;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = Array(columns).fill(1);
      
      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        
        // Fade effect
        ctx.fillStyle = matrixMode ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drops.length; i++) {
          // Special White Rabbit column
          if (i === Math.floor(columns / 2) && frame % 60 < 30) {
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${fontSize + 4}px monospace`;
            ctx.fillText('🐇', i * fontSize, drops[i] * fontSize);
          } else {
            // Matrix green or Alice colors
            const colorChoice = Math.random();
            if (colorChoice < 0.7) {
              ctx.fillStyle = '#00ff41'; // Classic matrix green
            } else if (colorChoice < 0.85) {
              ctx.fillStyle = '#ff1493'; // Alice pink
            } else {
              ctx.fillStyle = '#ffffff'; // White rabbit
            }
            
            ctx.font = `${fontSize}px monospace`;
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          }
          
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }, matrixMode ? 30 : 50);
      
      setTimeout(() => {
        clearInterval(interval);
        setGameState('playing');
        updateQuest(1, 1); // Complete "Follow the White Rabbit"
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [gameState, matrixMode]);

  // High-end Three.js scene with advanced graphics
  useEffect(() => {
    if (gameState !== 'playing' || !mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000011, 0.002);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    mountRef.current.appendChild(renderer.domElement);
    camera.position.set(0, 8, 25);
    sceneRef.current = { scene, camera, renderer };

    // Enhanced lighting
    const ambient = new THREE.AmbientLight(0x404080, 0.4);
    scene.add(ambient);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(10, 20, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);
    
    // White Rabbit special light
    const rabbitLight = new THREE.PointLight(0xffffff, 2, 50);
    rabbitLight.position.set(0, 5, 0);
    scene.add(rabbitLight);

    // Create GPU particle system
    particleSystemRef.current = createGPUParticles(scene, settings.particleCount);
    
    // Create White Rabbit portal
    portalRef.current = createWhiteRabbitPortal(scene);

    // Enhanced node lattice with advanced shaders
    const nodes = new THREE.Group();
    const nodeMaterials = [];
    
    for (let i = 0; i < 144; i++) {
      const isUnlocked = player.visitedNodes.includes(i);
      const isMajor = i < 22;
      const isWhiteRabbit = i === 0;
      
      const geometry = isWhiteRabbit ? 
        new THREE.OctahedronGeometry(1.2, 2) : 
        new THREE.OctahedronGeometry(0.8, isMajor ? 1 : 0);
      
      const shaderData = createAdvancedNodeShader();
      const material = new THREE.ShaderMaterial(shaderData);
      
      if (isMajor) {
        material.uniforms.nodeColor.value.setHex(MAJOR_ARCANA[i].color);
        if (isWhiteRabbit) {
          material.uniforms.isWhiteRabbit.value = 1.0;
          material.uniforms.powerLevel.value = 2.0;
        }
      } else {
        const hue = ((i - 22) / 122) * 360;
        material.uniforms.nodeColor.value.setHSL(hue / 360, 0.7, 0.5);
      }
      
      material.uniforms.intensity.value = isUnlocked ? 1.0 : 0.3;
      nodeMaterials.push(material);
      
      const node = new THREE.Mesh(geometry, material);
      
      if (isMajor) {
        // Sacred spiral arrangement for Major Arcana
        const t = i / 22;
        const spiral = t * Math.PI * 2 * 3; // 3 full rotations
        const radius = 15 + t * 5; // Expanding spiral
        const height = Math.sin(t * Math.PI * 2) * 3; // Wave height
        
        node.position.set(
          Math.cos(spiral) * radius,
          height,
          Math.sin(spiral) * radius
        );
      } else {
        // Concentric rings for Minor Arcana
        const ring = Math.floor((i - 22) / 40);
        const slot = (i - 22) % 40;
        const angle = (slot / 40) * Math.PI * 2;
        const radius = 35 + ring * 15;
        
        node.position.set(
          Math.cos(angle) * radius,
          ring * 3 - 5 + Math.sin(angle * 3) * 2,
          Math.sin(angle) * radius
        );
      }
      
      node.userData = { id: i, isMajor, isUnlocked, isWhiteRabbit };
      if (isUnlocked) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
      
      nodes.add(node);
    }
    
    scene.add(nodes);

    // Sacred geometry structures
    const geometryGroup = new THREE.Group();
    
    // Merkaba (Star Tetrahedron)
    const merkabaGeo = new THREE.TetrahedronGeometry(4, 0);
    const merkabaMat = new THREE.MeshPhongMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      emissive: 0x332200,
      emissiveIntensity: 0.3
    });
    
    const merkaba1 = new THREE.Mesh(merkabaGeo, merkabaMat);
    const merkaba2 = new THREE.Mesh(merkabaGeo, merkabaMat.clone());
    merkaba2.rotation.z = Math.PI;
    
    const merkabaGroup = new THREE.Group();
    merkabaGroup.add(merkaba1);
    merkabaGroup.add(merkaba2);
    merkabaGroup.position.y = 12;
    geometryGroup.add(merkabaGroup);
    
    // Flower of Life
    const flowerGeo = new THREE.RingGeometry(8, 12, 6);
    const flowerMat = new THREE.MeshPhongMaterial({
      color: 0xe8dff5,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });
    
    for (let i = 0; i < 7; i++) {
      const ring = new THREE.Mesh(flowerGeo, flowerMat);
      const angle = (i / 6) * Math.PI * 2;
      ring.position.x = Math.cos(angle) * 6;
      ring.position.z = Math.sin(angle) * 6;
      ring.position.y = -8;
      ring.rotation.x = -Math.PI / 2;
      geometryGroup.add(ring);
    }
    
    scene.add(geometryGroup);

    // Enhanced animation loop
    let time = 0;
    let rabbitDialogueTimer = 0;
    
    function animate() {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.016; // ~60fps
      
      // Update shader uniforms
      nodeMaterials.forEach(material => {
        material.uniforms.time.value = time;
        material.uniforms.frequency.value = settings.frequency;
        material.uniforms.goldenRatio.value = settings.ratio;
      });
      
      // Particle system animation
      if (particleSystemRef.current) {
        particleSystemRef.current.material.uniforms.time.value = time;
        
        // Update particle positions
        const positions = particleSystemRef.current.geometry.attributes.position.array;
        const velocities = particleSystemRef.current.geometry.attributes.velocity.array;
        
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i] * settings.flow;
          positions[i + 1] += velocities[i + 1] * settings.flow;
          positions[i + 2] += velocities[i + 2] * settings.flow;
          
          // Boundary wrapping
          if (Math.abs(positions[i]) > 100) positions[i] *= -0.9;
          if (Math.abs(positions[i + 1]) > 50) positions[i + 1] *= -0.9;
          if (Math.abs(positions[i + 2]) > 100) positions[i + 2] *= -0.9;
        }
        
        particleSystemRef.current.geometry.attributes.position.needsUpdate = true;
      }
      
      // White Rabbit portal animation
      if (portalRef.current) {
        portalRef.current.rotation.y += 0.01;
        portalRef.current.children[0].material.uniforms.time.value = time;
        
        // Animate floating clocks
        portalRef.current.children.forEach((child, i) => {
          if (i > 0) { // Skip the portal itself
            child.position.y = Math.sin(time * 2 + i) * 2;
            child.rotation.z += 0.02;
          }
        });
      }
      
      // Node animations
      nodes.children.forEach((node, i) => {
        if (node.userData.isUnlocked) {
          const baseRotation = 0.005 * (1 + i * 0.001);
          node.rotation.y += baseRotation;
          node.rotation.x += baseRotation * 0.5;
          
          // White Rabbit special effects
          if (node.userData.isWhiteRabbit) {
            const rabbitScale = 1 + Math.sin(time * 3) * 0.2;
            node.scale.set(rabbitScale, rabbitScale, rabbitScale);
            
            // Quantum teleportation effect
            if (Math.random() < 0.01) {
              node.position.x += (Math.random() - 0.5) * 2;
              node.position.z += (Math.random() - 0.5) * 2;
            }
          }
        }
        
        // Proximity detection for interactions
        const distance = camera.position.distanceTo(node.position);
        if (distance < 5 && player.currentNode !== i) {
          setPlayer(prev => ({ ...prev, currentNode: i }));
          
          if (node.userData.isWhiteRabbit && Math.random() < 0.02) {
            showRabbitDialogue();
          }
        }
      });
      
      // Sacred geometry animation
      merkabaGroup.rotation.y += 0.01;
      merkaba1.rotation.x += 0.02;
      merkaba2.rotation.x -= 0.02;
      
      // Dynamic camera movement
      const radius = 25 + Math.sin(time * 0.1) * 5;
      camera.position.x = Math.sin(time * 0.02) * radius;
      camera.position.z = Math.cos(time * 0.02) * radius;
      camera.position.y = 8 + Math.sin(time * 0.03) * 3;
      camera.lookAt(0, 0, 0);
      
      // White Rabbit light pulsing
      rabbitLight.intensity = 2 + Math.sin(time * 4) * 0.5;
      
      renderer.render(scene, camera);
    }
    
    animate();

    // Enhanced raycaster for node interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    function onClick(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes.children);
      
      if (intersects.length > 0) {
        const selected = intersects[0].object;
        if (selected.userData.isUnlocked || selected.userData.isWhiteRabbit) {
          visitNode(selected.userData.id);
          
          if (selected.userData.isWhiteRabbit) {
            showRabbitDialogue();
          }
        }
      }
    }
    
    function onKeyDown(event) {
      switch(event.key) {
        case 'm':
        case 'M':
          setMatrixMode(!matrixMode);
          break;
        case 'r':
        case 'R':
          if (player.followingRabbit) {
            camera.position.set(nodes.children[0].position.x, nodes.children[0].position.y + 5, nodes.children[0].position.z + 10);
          }
          break;
      }
    }
    
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [gameState, player.visitedNodes, player.currentNode, settings, matrixMode]);

  // Game logic functions
  const visitNode = useCallback((nodeId) => {
    if (!player.visitedNodes.includes(nodeId)) {
      setPlayer(prev => ({
        ...prev,
        visitedNodes: [...prev.visitedNodes, nodeId],
        currentNode: nodeId,
        xp: prev.xp + (nodeId < 22 ? 50 : 20),
        gold: prev.gold + (nodeId < 22 ? 15 : 5)
      }));
      
      updateQuest(4, 1); // Unite the Archetypes
      checkLevelUp();
    } else {
      setPlayer(prev => ({ ...prev, currentNode: nodeId }));
    }
  }, [player.visitedNodes]);

  const checkLevelUp = useCallback(() => {
    setPlayer(prev => {
      if (prev.xp >= prev.xpToNext) {
        return {
          ...prev,
          level: prev.level + 1,
          xp: prev.xp - prev.xpToNext,
          xpToNext: Math.floor(prev.xpToNext * 1.5),
          maxHp: prev.maxHp + 15,
          hp: prev.maxHp + 15,
          maxMana: prev.maxMana + 8,
          mana: prev.maxMana + 8
        };
      }
      return prev;
    });
  }, []);

  const unlockAbility = useCallback((arcanaId) => {
    const arcana = MAJOR_ARCANA[arcanaId];
    if (!player.abilities.includes(arcanaId) && player.gold >= arcana.cost) {
      setPlayer(prev => ({
        ...prev,
        abilities: [...prev.abilities, arcanaId],
        gold: prev.gold - arcana.cost
      }));
      updateQuest(4, 1);
    }
  }, [player.abilities, player.gold]);

  const useAbility = useCallback((arcanaId) => {
    const arcana = MAJOR_ARCANA[arcanaId];
    const manaCost = Math.floor(arcana.cost / 3);
    
    if (player.mana >= manaCost) {
      setActiveAbility(arcana);
      setPlayer(prev => ({ ...prev, mana: prev.mana - manaCost }));
      
      // Special effects for White Rabbit
      if (arcanaId === 0) {
        setMatrixMode(true);
        setTimeout(() => setMatrixMode(false), 2000);
      }
      
      setTimeout(() => setActiveAbility(null), 3000);
    }
  }, [player.mana]);

  const updateQuest = useCallback((questId, amount) => {
    setQuestLog(prev => prev.map(q => {
      if (q.id === questId && q.progress < q.max) {
        const newProgress = Math.min(q.progress + amount, q.max);
        if (newProgress === q.max) {
          // Quest complete - grant rewards
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
  }, [unlockAbility]);

  const showRabbitDialogue = useCallback(() => {
    const dialogues = [
      "I'm late! I'm late! For a very important date with destiny!",
      "Curiouser and curiouser... you're beginning to see the Matrix, aren't you?",
      "Time is an illusion, but lunch time doubly so. Care for some quantum tea?",
      "Follow me down the rabbit hole, but mind the falling code!",
      "The Queen of Hearts is just a program, you know. We're all mad here in the Matrix."
    ];
    
    setRabbitDialogue(dialogues[Math.floor(Math.random() * dialogues.length)]);
    setTimeout(() => setRabbitDialogue(null), 4000);
  }, []);

  const enterWonderland = useCallback((choice) => {
    if (choice === 'red') {
      setMatrixMode(true);
      updateQuest(2, 1); // Master the Matrix
    }
    
    setGameState('matrix');
    
    // Initialize enhanced audio
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      // White Rabbit theme frequency (432 Hz sacred geometry)
      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();
      const filter = audioContextRef.current.createBiquadFilter();
      
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      gain.gain.value = settings.volume * 0.05;
      osc.frequency.value = settings.frequency;
      osc.type = 'sine';
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioContextRef.current.destination);
      osc.start();
    }
  }, [settings.volume, settings.frequency]);

  // Render
  const currentArcana = MAJOR_ARCANA[player.currentNode] || MAJOR_ARCANA[0];

  return (
    <div className="cathedral-root professional-theme">
      {/* PORTAL SCREEN */}
      {gameState === 'portal' && (
        <div className="portal-screen professional-theme">
          <div className="wonderland-bg professional-theme"></div>
          <div className="portal-content professional-theme">
            <div className="white-rabbit professional-theme">
              <span className="rabbit-emoji professional-theme">🐇</span>
              <div className="rabbit-glow professional-theme"></div>
            </div>
            <h1 className="portal-title professional-theme">Cathedral 144:99</h1>
            <h2 className="portal-subtitle professional-theme">Follow the White Rabbit</h2>
            <p className="portal-tagline professional-theme">
              "I'm late! I'm late! For a very important date with the Matrix!"<br/>
              <em>Where Alice meets Neo in Sacred Geometry</em>
            </p>
            
            <div className="pill-choice professional-theme">
              <button className="portal-btn red-pill professional-theme" onClick={() => enterWonderland('red')}>
                🔴 Red Pill
                <span className="pill-desc professional-theme">See how deep the rabbit hole goes</span>
              </button>
              <button className="portal-btn blue-pill professional-theme" onClick={() => enterWonderland('blue')}>
                🔵 Blue Pill  
                <span className="pill-desc professional-theme">Stay in Wonderland a little longer</span>
              </button>
            </div>
            
            <p className="portal-hint professional-theme">
              <em>"Both pills lead to the Cathedral - that's the White Rabbit's joke"</em>
            </p>
            
            <div className="portal-stats professional-theme">
              <div>🕰️ Time: Always 6 o'clock</div>
              <div>🎭 Mad Level: Delightfully</div>
              <div>🌀 Reality Status: Negotiable</div>
            </div>
          </div>
        </div>
      )}

      {/* MATRIX TRANSITION */}
      {gameState === 'matrix' && (
        <>
          <canvas id="matrix-canvas" className="matrix-canvas professional-theme"></canvas>
          <div className="matrix-overlay professional-theme">
            <div className="matrix-text professional-theme">
              {matrixMode ? "Welcome to the Real World" : "Welcome to Wonderland"}
            </div>
            <div className="loading-text professional-theme">Following the White Rabbit...</div>
          </div>
        </>
      )}

      {/* MAIN GAME */}
      {gameState === 'playing' && (
        <>
          <div ref={mountRef} className="hologram-mount professional-theme" />
          
          {/* Enhanced HUD */}
          <div className="hud professional-theme">
            {/* White Rabbit Status */}
            {player.followingRabbit && (
              <div className="rabbit-status professional-theme">
                <span className="rabbit-icon professional-theme">🐇</span>
                <div className="rabbit-text professional-theme">Following the White Rabbit</div>
                <div className="rabbit-quote professional-theme">"We're painting the roses red with code!"</div>
              </div>
            )}

            {/* Node Card */}
            <div className="node-card enhanced professional-theme">
              <div className="card-arcana professional-theme">{currentArcana.name}</div>
              <div className="card-character professional-theme">{currentArcana.char}</div>
              <div className="card-subtitle professional-theme">{currentArcana.subtitle}</div>
              <div className="card-element professional-theme">{currentArcana.element}</div>
              {currentArcana.char === "White Rabbit" && (
                <div className="rabbit-special professional-theme">⏰ Time Master Active</div>
              )}
            </div>

            {/* Enhanced Player Stats */}
            <div className="player-stats enhanced professional-theme">
              <div className="stat-bar professional-theme">
                <span>HP</span>
                <div className="bar hp-bar professional-theme">
                  <div className="fill hp professional-theme" style={{ width: `${(player.hp/player.maxHp)*100}%` }} />
                  <div className="bar-glow professional-theme"></div>
                </div>
                <span>{player.hp}/{player.maxHp}</span>
              </div>
              <div className="stat-bar professional-theme">
                <span>MP</span>
                <div className="bar mp-bar professional-theme">
                  <div className="fill mp professional-theme" style={{ width: `${(player.mana/player.maxMana)*100}%` }} />
                  <div className="bar-glow professional-theme"></div>
                </div>
                <span>{player.mana}/{player.maxMana}</span>
              </div>
              <div className="stat-bar professional-theme">
                <span>XP</span>
                <div className="bar xp-bar professional-theme">
                  <div className="fill xp professional-theme" style={{ width: `${(player.xp/player.xpToNext)*100}%` }} />
                  <div className="bar-glow professional-theme"></div>
                </div>
                <span>{player.xp}/{player.xpToNext}</span>
              </div>
              <div className="stat-row professional-theme">
                <span>Level: {player.level}</span>
                <span>Gold: {player.gold}g</span>
                <span>Nodes: {player.visitedNodes.length}/144</span>
              </div>
            </div>

            {/* Enhanced Abilities Panel */}
            <div className="abilities-panel enhanced professional-theme">
              <h3>🎭 Arcane Abilities</h3>
              <div className="ability-grid professional-theme">
                {player.abilities.map(id => {
                  const arcana = MAJOR_ARCANA[id];
                  const manaCost = Math.floor(arcana.cost / 3);
                  const canUse = player.mana >= manaCost;
                  
                  return (
                    <button 
                      key={id}
                      className={`ability-btn ${arcana.char === 'White Rabbit' ? 'rabbit-ability' : ''} ${!canUse ? 'disabled' : ''}`}
                      onClick={() => useAbility(id)}
                      disabled={!canUse}
                      title={`${arcana.ability} - ${arcana.element} Element - ${manaCost} MP`}
                    >
                      <div className="ability-name professional-theme">{arcana.ability}</div>
                      <div className="ability-cost professional-theme">{manaCost} MP</div>
                      <div className="ability-element professional-theme">{arcana.element}</div>
                    </button>
                  );
                })}
              </div>
              
              {player.abilities.includes(0) && (
                <div className="rabbit-controls professional-theme">
                  <button className="rabbit-btn professional-theme" onClick={() => setMatrixMode(!matrixMode)}>
                    {matrixMode ? "🐇 Exit Matrix" : "🐇 Enter Matrix"}
                  </button>
                </div>
              )}
            </div>

            {/* Enhanced Settings Panel */}
            <div className="settings-panel enhanced professional-theme">
              <h3>⚗️ Sacred Parameters</h3>
              <div className="setting-group professional-theme">
                <label>
                  <span>Frequency: {settings.frequency} Hz</span>
                  <input 
                    type="range" 
                    min="20" 
                    max="1000" 
                    value={settings.frequency}
                    onChange={e => setSettings(s => ({ ...s, frequency: parseInt(e.target.value) }))}
                    className="sacred-slider professional-theme"
                  />
                </label>
                <label>
                  <span>Golden Ratio: {settings.ratio.toFixed(3)}</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="2" 
                    step="0.001" 
                    value={settings.ratio}
                    onChange={e => setSettings(s => ({ ...s, ratio: parseFloat(e.target.value) }))}
                    className="sacred-slider professional-theme"
                  />
                </label>
                <label>
                  <span>Quantum Flow: {settings.flow.toFixed(2)}</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="2" 
                    step="0.1" 
                    value={settings.flow}
                    onChange={e => setSettings(s => ({ ...s, flow: parseFloat(e.target.value) }))}
                    className="sacred-slider professional-theme"
                  />
                </label>
                <label>
                  <span>Particles: {settings.particleCount}</span>
                  <input 
                    type="range" 
                    min="1000" 
                    max="10000" 
                    step="500" 
                    value={settings.particleCount}
                    onChange={e => setSettings(s => ({ ...s, particleCount: parseInt(e.target.value) }))}
                    className="sacred-slider professional-theme"
                  />
                </label>
              </div>
            </div>

            {/* Mode Toggle Buttons */}
            <div className="mode-controls professional-theme">
              <button className="hud-btn professional-theme" onClick={() => setShowCodex(!showCodex)}>
                📖 Codex Abyssiae
              </button>
              <button className="hud-btn professional-theme" onClick={() => setShowInventory(!showInventory)}>
                🎒 Wonder-Bag
              </button>
              <button className={`hud-btn ${matrixMode ? 'matrix-active' : ''}`} 
                      onClick={() => setMatrixMode(!matrixMode)}>
                {matrixMode ? "🕳️ Exit Matrix" : "💊 Enter Matrix"}
              </button>
            </div>
          </div>

          {/* White Rabbit Dialogue */}
          {rabbitDialogue && (
            <div className="rabbit-dialogue professional-theme">
              <div className="dialogue-bubble professional-theme">
                <div className="rabbit-avatar professional-theme">🐇</div>
                <div className="dialogue-text professional-theme">{rabbitDialogue}</div>
              </div>
            </div>
          )}

          {/* Enhanced Codex Overlay */}
          {showCodex && (
            <div className="codex-overlay enhanced professional-theme" onClick={() => setShowCodex(false)}>
              <div className="codex-panel enhanced professional-theme" onClick={e => e.stopPropagation()}>
                <h2>📜 The Codex Abyssiae</h2>
                
                <div className="codex-tabs professional-theme">
                  <button className="tab active professional-theme">Quests</button>
                  <button className="tab professional-theme">Arcana Shop</button>
                  <button className="tab professional-theme">Lore</button>
                </div>
                
                <div className="codex-section professional-theme">
                  <h3>🎯 Active Quests</h3>
                  {questLog.map(q => (
                    <div key={q.id} className="quest-item enhanced professional-theme">
                      <div className="quest-header professional-theme">
                        <div className="quest-name professional-theme">{q.name}</div>
                        <div className="quest-status professional-theme">
                          {q.progress === q.max ? "✅ Complete" : "🔄 In Progress"}
                        </div>
                      </div>
                      <div className="quest-description professional-theme">{q.description}</div>
                      <div className="quest-progress professional-theme">
                        <div className="quest-bar professional-theme">
                          <div className="quest-fill professional-theme" style={{ width: `${(q.progress/q.max)*100}%` }} />
                        </div>
                        <span>{q.progress}/{q.max}</span>
                      </div>
                      <div className="quest-rewards professional-theme">
                        Rewards: {q.reward.xp && `${q.reward.xp} XP `}
                        {q.reward.gold && `${q.reward.gold}g `}
                        {q.reward.ability && `New Ability `}
                        {q.reward.item && `${q.reward.item}`}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="codex-section professional-theme">
                  <h3>🃏 Arcana Emporium</h3>
                  <div className="arcana-shop enhanced professional-theme">
                    {MAJOR_ARCANA.map(a => (
                      <div key={a.id} className={`arcana-item enhanced ${player.abilities.includes(a.id) ? 'owned' : ''}`}>
                        <div className="arcana-header professional-theme">
                          <div className="arcana-name professional-theme">{a.name}</div>
                          {a.char === "White Rabbit" && <span className="special-mark professional-theme">⭐</span>}
                        </div>
                        <div className="arcana-char professional-theme">{a.char}</div>
                        <div className="arcana-ability professional-theme">{a.ability}</div>
                        <div className="arcana-element professional-theme">{a.element} Element</div>
                        {!player.abilities.includes(a.id) && (
                          <button 
                            className="unlock-btn enhanced professional-theme"
                            onClick={() => unlockAbility(a.id)}
                            disabled={player.gold < a.cost}
                          >
                            Unlock ({a.cost}g)
                          </button>
                        )}
                        {player.abilities.includes(a.id) && (
                          <div className="owned-mark professional-theme">✨ Mastered</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Inventory */}
          {showInventory && (
            <div className="codex-overlay enhanced professional-theme" onClick={() => setShowInventory(false)}>
              <div className="codex-panel enhanced professional-theme" onClick={e => e.stopPropagation()}>
                <h2>🎒 Wonderland Inventory</h2>
                <div className="inventory-grid enhanced professional-theme">
                  {player.inventory.length === 0 ? (
                    <p>Your wonder-bag is empty... for now!</p>
                  ) : (
                    player.inventory.map((item, i) => (
                      <div key={i} className="inventory-item enhanced professional-theme">
                        <div className="item-icon professional-theme">
                          {item === "Pocket Watch" ? "⏰" : 
                           item === "Red Pill" ? "🔴" : 
                           item === "Blue Pill" ? "🔵" :
                           item === "Merkaba Crystal" ? "💎" : "✨"}
                        </div>
                        <div className="item-name professional-theme">{item}</div>
                        {item === "Pocket Watch" && (
                          <div className="item-desc professional-theme">Time flows differently here...</div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Active Ability Display */}
          {activeAbility && (
            <div className="ability-active enhanced professional-theme">
              <div className="ability-burst professional-theme"></div>
              <div className="ability-name professional-theme">{activeAbility.ability}</div>
              <div className="ability-char professional-theme">{activeAbility.char}</div>
              <div className="ability-element professional-theme">{activeAbility.element} Element</div>
              {activeAbility.char === "White Rabbit" && (
                <div className="rabbit-effect professional-theme">⏰ Time Dilation Active!</div>
              )}
            </div>
          )}

          {/* Matrix Mode Overlay */}
          {matrixMode && (
            <div className="matrix-mode-overlay professional-theme">
              <div className="matrix-hud professional-theme">
                <div className="matrix-title professional-theme">THE MATRIX</div>
                <div className="matrix-subtitle professional-theme">Reality.exe has stopped working</div>
                <div className="matrix-stats professional-theme">
                  <div>Red Pills Taken: {player.inventory.includes("Red Pill") ? "∞" : "0"}</div>
                  <div>Spoons Bent: 42</div>
                  <div>Reality Level: Negotiable</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}