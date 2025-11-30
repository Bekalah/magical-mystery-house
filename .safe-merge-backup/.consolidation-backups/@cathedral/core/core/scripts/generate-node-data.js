#!/usr/bin/env node

/**
 * Generate Node Data Script
 * Creates JSON exports of Codex 144:99 + Morgan Le Fay Avalon system
 * For use with Godot labs/game and web visualizations
 */

const fs = require('fs');
const path = require('path');

// Import our Avalon system using dynamic imports for ES modules
let MorganLeFay, AvalonRealmEngine, TarotCreatureSystem, AvalonNodeIntegration;

async function initializeModules() {
  const module = await import('../../MorganLeFay.js');
  MorganLeFay = module.MorganLeFay;

  const avalonModule = await import('../../AvalonRealmEngine.js');
  AvalonRealmEngine = avalonModule.AvalonRealmEngine;

  const tarotModule = await import('../../TarotCreatureSystem.js');
  TarotCreatureSystem = tarotModule.TarotCreatureSystem;

  const nodeModule = await import('../../AvalonNodeIntegration.js');
  AvalonNodeIntegration = nodeModule.AvalonNodeIntegration;
}

class NodeDataGenerator {
  constructor() {
    this.outputDir = path.join(__dirname, '../data');
    this.morganLeFay = null;
    this.avalonEngine = null;
    this.tarotCreatureSystem = null;
    this.nodeIntegration = null;

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async initialize() {
    await initializeModules();
    this.morganLeFay = new MorganLeFay();
    this.avalonEngine = new AvalonRealmEngine(this.morganLeFay);
    this.tarotCreatureSystem = new TarotCreatureSystem(this.morganLeFay, this.avalonEngine);
    this.nodeIntegration = new AvalonNodeIntegration(this.morganLeFay, this.avalonEngine, this.tarotCreatureSystem);
  }

  /**
   * Generate all node data
   */
  async generateAllNodeData() {
// console.log('🔮 Generating Codex 144:99 + Morgan Le Fay Avalon node data...');

    const allNodesData = {
      metadata: {
        generated: new Date().toISOString(),
        version: "1.0.0",
        total_nodes: 144,
        description: "Complete node dataset integrating Codex 144:99 with Morgan Le Fay Avalon realms"
      },

      nodes: {},
      avalon_realms: {},
      tarot_creatures: {},
      node_experiences: {},

      // Integration mappings
      integrations: {
        threejs_geometries: {},
        tonejs_audio: {},
        p5js_visuals: {},
        babylonjs_scenes: {},
        godot_scenes: {}
      },

      // Living spine and fusion gates
      living_spine: this.nodeIntegration.livingSpine,
      fusion_gates: this.nodeIntegration.fusionGates,

      // Open-source library mappings
      library_integrations: this.nodeIntegration.libraryIntegrations
    };

    // Generate data for first 12 nodes (expandable to 144)
    for (let nodeId = 1; nodeId <= 12; nodeId++) {
// console.log(`📊 Processing Node ${nodeId}...`);

      // Generate base node data
      const nodeData = this.nodeIntegration.generateNodeData(nodeId);
      allNodesData.nodes[nodeId] = nodeData;

      // Generate Avalon node package
      const nodePackage = this.nodeIntegration.generateAvalonNode(nodeId, {
        includeGeometry: true,
        includeAudio: true,
        includeVisuals: true,
        includeRealm: true,
        includeTarotCreature: true,
        style: "dion_fortune"
      });

      // Generate complete experience
      const nodeExperience = this.nodeIntegration.generateNodeExperience(nodeId, "dion_fortune");
      allNodesData.node_experiences[nodeId] = nodeExperience;

      // Store individual components
      if (nodePackage.avalon_realm) {
        allNodesData.avalon_realms[nodePackage.avalon_realm.id] = nodePackage.avalon_realm;
      }

      if (nodePackage.tarot_creature) {
        allNodesData.tarot_creatures[nodePackage.tarot_creature.id] = nodePackage.tarot_creature;
      }

      // Store technical integrations
      if (nodePackage.threejs_geometry) {
        allNodesData.integrations.threejs_geometries[nodeId] = nodePackage.threejs_geometry;
      }

      if (nodePackage.tonejs_audio) {
        allNodesData.integrations.tonejs_audio[nodeId] = nodePackage.tonejs_audio;
      }

      if (nodePackage.p5js_visual) {
        allNodesData.integrations.p5js_visuals[nodeId] = nodePackage.p5js_visual;
      }

      if (nodePackage.babylonjs_scene) {
        allNodesData.integrations.babylonjs_scenes[nodeId] = nodePackage.babylonjs_scene;
      }
    }

    // Write main nodes file
    const nodesPath = path.join(this.outputDir, 'nodes.json');
    fs.writeFileSync(nodesPath, JSON.stringify(allNodesData, null, 2));
// console.log(`✅ Generated ${nodesPath}`);

    // Generate separate files for different integrations
    await this.generateIntegrationFiles(allNodesData);

    // Generate Godot-specific exports
    await this.generateGodotExports(allNodesData);

    // Generate web-specific exports
    await this.generateWebExports(allNodesData);

// console.log('🎉 Node data generation complete!');
// console.log(`📁 Files generated in: ${this.outputDir}`);
  }

  /**
   * Generate separate integration files for different libraries
   */
  async generateIntegrationFiles(allNodesData) {
    // Three.js geometries
    const threejsData = {
      geometries: allNodesData.integrations.threejs_geometries,
      materials: this.nodeIntegration.geometryEngine.libraries.threejs.materials,
      animations: this.nodeIntegration.geometryEngine.libraries.threejs.animations
    };

    const threejsPath = path.join(this.outputDir, 'threejs-geometries.json');
    fs.writeFileSync(threejsPath, JSON.stringify(threejsData, null, 2));
// console.log(`✅ Generated ${threejsPath}`);

    // Tone.js audio
    const tonejsData = {
      audio_patterns: allNodesData.integrations.tonejs_audio,
      instruments: this.nodeIntegration.audioEngine.libraries.tonejs.instruments,
      effects: this.nodeIntegration.audioEngine.libraries.tonejs.effects,
      scales: this.nodeIntegration.audioEngine.libraries.tonejs.scales
    };

    const tonejsPath = path.join(this.outputDir, 'tonejs-audio.json');
    fs.writeFileSync(tonejsPath, JSON.stringify(tonejsData, null, 2));
// console.log(`✅ Generated ${tonejsPath}`);

    // p5.js visuals
    const p5jsData = {
      visual_patterns: allNodesData.integrations.p5js_visuals,
      sketches: this.nodeIntegration.visualEngine.libraries.p5js.sketches,
      features: this.nodeIntegration.visualEngine.libraries.p5js.features
    };

    const p5jsPath = path.join(this.outputDir, 'p5js-visuals.json');
    fs.writeFileSync(p5jsPath, JSON.stringify(p5jsData, null, 2));
// console.log(`✅ Generated ${p5jsPath}`);

    // Babylon.js scenes
    const babylonjsData = {
      scenes: allNodesData.integrations.babylonjs_scenes,
      features: this.nodeIntegration.geometryEngine.libraries.babylonjs.features,
      shaders: this.nodeIntegration.geometryEngine.libraries.babylonjs.shaders
    };

    const babylonjsPath = path.join(this.outputDir, 'babylonjs-scenes.json');
    fs.writeFileSync(babylonjsPath, JSON.stringify(babylonjsData, null, 2));
// console.log(`✅ Generated ${babylonjsPath}`);
  }

  /**
   * Generate Godot-specific export files
   */
  async generateGodotExports(allNodesData) {
    const godotDir = path.join(this.outputDir, 'godot');

    if (!fs.existsSync(godotDir)) {
      fs.mkdirSync(godotDir, { recursive: true });
    }

    // Generate GDScript scenes for each node
    for (const [nodeId, nodeData] of Object.entries(allNodesData.nodes)) {
      const gdScript = this.generateGDScriptForNode(parseInt(nodeId), nodeData);
      const scriptPath = path.join(godotDir, `node_${nodeId}.gd`);
      fs.writeFileSync(scriptPath, gdScript);
    }

    // Generate project configuration
    const projectConfig = {
      config: {
        name: "Cathedral Avalon Lab",
        version: "1.0.0",
        nodes: Object.keys(allNodesData.nodes).length,
        integrations: ["MorganLeFay", "AvalonRealms", "TarotCreatures"]
      },
      scenes: Object.keys(allNodesData.nodes).map(id => `node_${id}.gd`),
      audio: {
        frequencies: Object.values(allNodesData.nodes).map(node => node.frequency_hz),
        instruments: Object.values(allNodesData.nodes).map(node => node.music.instruments).flat()
      }
    };

    const configPath = path.join(godotDir, 'project-config.json');
    fs.writeFileSync(configPath, JSON.stringify(projectConfig, null, 2));
// console.log(`✅ Generated Godot exports in ${godotDir}`);
  }

  /**
   * Generate web-specific export files
   */
  async generateWebExports(allNodesData) {
    const webDir = path.join(this.outputDir, 'web');

    if (!fs.existsSync(webDir)) {
      fs.mkdirSync(webDir, { recursive: true });
    }

    // Generate React components for nodes
    for (const [nodeId, nodeData] of Object.entries(allNodesData.nodes)) {
      const reactComponent = this.generateReactComponentForNode(parseInt(nodeId), nodeData);
      const componentPath = path.join(webDir, `Node${nodeId}Component.jsx`);
      fs.writeFileSync(componentPath, reactComponent);
    }

    // Generate Three.js components
    const threejsComponents = Object.entries(allNodesData.integrations.threejs_geometries)
      .map(([nodeId, geometry]) => this.generateThreeJSComponent(parseInt(nodeId), geometry))
      .join('\n\n');

    const threejsPath = path.join(webDir, 'ThreeJSNodeComponents.jsx');
    fs.writeFileSync(threejsPath, threejsComponents);

    // Generate Tone.js components
    const tonejsComponents = Object.entries(allNodesData.integrations.tonejs_audio)
      .map(([nodeId, audio]) => this.generateToneJSComponent(parseInt(nodeId), audio))
      .join('\n\n');

    const tonejsWebPath = path.join(webDir, 'ToneJSNodeComponents.jsx');
    fs.writeFileSync(tonejsWebPath, tonejsComponents);

// console.log(`✅ Generated web exports in ${webDir}`);
  }

  /**
   * Generate GDScript for a node
   */
  generateGDScriptForNode(nodeId, nodeData) {
    return `extends Node3D

# Codex 144:99 Node ${nodeId} - ${nodeData.name}
# Generated for Godot Avalon Lab

var node_id = ${nodeId}
var node_data = ${JSON.stringify(nodeData, null, 2)}

func _ready():
    print("Initializing Avalon Node ${nodeId}: ${nodeData.name}")
    setup_node_geometry()
    setup_node_audio()
    setup_avalon_realm()

func setup_node_geometry():
    # Generate ${nodeData.geometry} geometry
    var geometry = generate_sacred_geometry("${nodeData.geometry}")
    add_child(geometry)

func setup_node_audio():
    # Setup ${nodeData.frequency_hz} Hz harmonic audio
    var audio_stream = generate_node_audio(${nodeData.frequency_hz})
    $AudioStreamPlayer3D.stream = audio_stream

func setup_avalon_realm():
    # Create Morgan Le Fay Avalon realm
    var realm = create_avalon_realm("${nodeData.name} - Avalon Domain")
    add_child(realm)

func generate_sacred_geometry(geometry_type):
    var mesh_instance = MeshInstance3D.new()
    match geometry_type:
        "Prime Spiral Halo":
            mesh_instance.mesh = TorusMesh.new()
        "Lunar Crescent Array":
            mesh_instance.mesh = SphereMesh.new()
        _:
            mesh_instance.mesh = BoxMesh.new()
    return mesh_instance

func generate_node_audio(frequency):
    # Generate procedural audio for node frequency
    var audio_stream = AudioStreamGenerator.new()
    # Implementation would use Godot's audio generation
    return audio_stream

func create_avalon_realm(realm_name):
    var realm_node = Node3D.new()
    realm_node.name = realm_name
    # Add Morgan Le Fay presence and tarot creatures
    return realm_node
`;
  }

  /**
   * Generate React component for a node
   */
  generateReactComponentForNode(nodeId, nodeData) {
    return `import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Node${nodeId}Component = ({ nodeData }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create Three.js scene for Node ${nodeId}
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    // Generate ${nodeData.geometry} geometry
    const geometry = new THREE.${this.getThreeJSGeometryType(nodeData)}();
    const material = new THREE.MeshStandardMaterial({
      color: '${this.nodeIntegration.getNodeColor(nodeData)}',
      emissive: '${this.nodeIntegration.getNodeEmissive(nodeData)}',
      transparent: true,
      opacity: 0.8
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    sceneRef.current = { scene, camera, renderer, mesh };

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="node-component">
      <h3>Node ${nodeId}: {nodeData.name}</h3>
      <div ref={mountRef} style={{ width: '400px', height: '400px' }} />
      <div className="node-info">
        <p><strong>Chakra:</strong> {nodeData.chakra}</p>
        <p><strong>Element:</strong> {nodeData.element}</p>
        <p><strong>Frequency:</strong> {nodeData.frequency_hz} Hz</p>
        <p><strong>Tarot:</strong> {nodeData.tarot}</p>
      </div>
    </div>
  );
};
`;
  }

  /**
   * Generate Three.js component
   */
  generateThreeJSComponent(nodeId, geometry) {
    return `// Three.js component for Node ${nodeId}
export const Node${nodeId}ThreeJS = () => {
  return {
    geometryType: "${geometry.geometry_type}",
    parameters: ${JSON.stringify(geometry.parameters)},
    codeTemplate: \`${geometry.code_template}\`
  };
};`;
  }

  /**
   * Generate Tone.js component
   */
  generateToneJSComponent(nodeId, audio) {
    return `// Tone.js component for Node ${nodeId}
export const Node${nodeId}ToneJS = () => {
  return {
    instrument: "${audio.instrument}",
    frequency: ${audio.frequency},
    scale: "${audio.scale}",
    rootNote: "${audio.root_note}",
    codeTemplate: \`${audio.code_template}\`
  };
};`;
  }

  /**
   * Helper function to get Three.js geometry type
   */
  getThreeJSGeometryType(nodeData) {
    const typeMap = {
      "Prime Spiral Halo": "TorusKnotGeometry",
      "Lunar Crescent Array": "RingGeometry",
      "Rose Heart Mandala": "CircleGeometry",
      "Elemental Tetrahedron": "TetrahedronGeometry"
    };
    return typeMap[nodeData.geometry] || "TorusKnotGeometry";
  }
}

// Run the generator if this script is executed directly
if (require.main === module) {
  const generator = new NodeDataGenerator();
  generator.initialize().then(() => {
    return generator.generateAllNodeData();
  }).catch(console.error);
}

module.exports = NodeDataGenerator;
