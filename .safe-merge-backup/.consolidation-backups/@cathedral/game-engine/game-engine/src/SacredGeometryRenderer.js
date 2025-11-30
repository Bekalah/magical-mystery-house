/**
 * 🏛️✨ CATHEDRAL OF CIRCUITS - SACRED GEOMETRY RENDERER
 *
 * Native ES module for rendering your authentic sacred geometry
 * Three.js integration with your Codex 144:99 geometries
 *
 * @architecture Native ES Modules with Three.js
 * @geometry_authentic Your real sacred forms
 */

export class SacredGeometryRenderer {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.canvas = null;
    this.isInitialized = false;
    this.currentGeometry = null;
  }

  async initialize() {
    try {
// console.log('🔷 Initializing Sacred Geometry Renderer...');

      // Create canvas for Three.js
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'sacredGeometryCanvas';
      this.canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
      `;

      // Initialize Three.js scene
      const THREE = await this.loadThreeJS();

      // Scene setup
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0B0B0B);

      // Camera setup
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 5);

      // Renderer setup
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Add ambient lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      this.scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      this.scene.add(directionalLight);

      this.isInitialized = true;
// console.log('✅ Sacred Geometry Renderer initialized');

    } catch (error) {
// console.error('❌ Failed to initialize geometry renderer:', error);
      throw error;
    }
  }

  async loadThreeJS() {
    // Dynamic import of Three.js for native ES modules
    try {
      const THREE = await import('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js');
      return THREE;
    } catch (error) {
// console.error('Failed to load Three.js:', error);
      throw error;
    }
  }

  async renderNode(node) {
    if (!this.isInitialized) {
      await this.initialize();
    }

// console.log(`🔷 Rendering sacred geometry for ${node.name}...`);

    // Clear previous geometry
    this.clearGeometry();

    // Create geometry based on your authentic node data
    const geometry = this.createGeometryFromNode(node);
    this.currentGeometry = geometry;

    // Add to scene
    this.scene.add(geometry);

    // Animate based on node properties
    this.startNodeAnimation(node);

    return geometry;
  }

  createGeometryFromNode(node) {
    const THREE = window.THREE; // Access from global after dynamic import

    let geometry;
    let material;

    // Your authentic geometry creation based on node data
    switch (node.geometry?.toLowerCase()) {
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(2);
        break;
      case 'cube':
        geometry = new THREE.BoxGeometry(2, 2, 2);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(2);
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(2);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(2);
        break;
      case 'flower of life':
        geometry = this.createFlowerOfLifeGeometry();
        break;
      case 'merkaba':
        geometry = this.createMerkabaGeometry();
        break;
      case "metatron's cube":
        geometry = this.createMetatronsCubeGeometry();
        break;
      default:
        geometry = new THREE.SphereGeometry(2);
    }

    // Material based on your authentic color data
    const color = node.color_ray || '#4169E1';
    material = new THREE.MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      wireframe: false
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Position based on your sacred mathematics
    mesh.position.set(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    );

    return mesh;
  }

  createFlowerOfLifeGeometry() {
    const THREE = window.THREE;
    const group = new THREE.Group();

    // Create overlapping circles for Flower of Life pattern
    const circleGeometry = new THREE.CircleGeometry(1, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({
      color: 0x4169E1,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });

    // Center circle
    const centerCircle = new THREE.Mesh(circleGeometry, circleMaterial);
    group.add(centerCircle);

    // Surrounding circles
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * 2;
      const y = Math.sin(angle) * 2;

      const circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.position.set(x, y, 0);
      group.add(circle);
    }

    return group;
  }

  createMerkabaGeometry() {
    const THREE = window.THREE;
    const group = new THREE.Group();

    // Two interlocking tetrahedrons
    const tetraGeometry = new THREE.TetrahedronGeometry(1.5);

    const tetra1 = new THREE.Mesh(tetraGeometry, new THREE.MeshPhongMaterial({
      color: 0x4169E1,
      transparent: true,
      opacity: 0.6
    }));

    const tetra2 = new THREE.Mesh(tetraGeometry, new THREE.MeshPhongMaterial({
      color: 0xFFD700,
      transparent: true,
      opacity: 0.6
    }));

    // Rotate second tetrahedron
    tetra2.rotation.z = Math.PI / 2;

    group.add(tetra1);
    group.add(tetra2);

    return group;
  }

  createMetatronsCubeGeometry() {
    const THREE = window.THREE;
    const group = new THREE.Group();

    // Metatron's Cube - complex sacred geometry
    const geometries = [
      new THREE.OctahedronGeometry(1),
      new THREE.IcosahedronGeometry(1),
      new THREE.DodecahedronGeometry(1)
    ];

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshPhongMaterial({
        color: [0x4169E1, 0xFFD700, 0xFF69B4][index],
        transparent: true,
        opacity: 0.4,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (index - 1) * 2,
        0,
        0
      );

      group.add(mesh);
    });

    return group;
  }

  startNodeAnimation(node) {
    if (!this.currentGeometry) return;

    // Your authentic animation based on node properties
    const animate = () => {
      if (this.currentGeometry) {
        // Sacred rotation based on your solfeggio frequencies
        const rotationSpeed = (node.solfeggio || 432) / 43200;
        this.currentGeometry.rotation.x += rotationSpeed;
        this.currentGeometry.rotation.y += rotationSpeed * 0.7;

        // Sacred pulsing based on your harmonics
        const pulse = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        this.currentGeometry.scale.setScalar(pulse);

        this.renderer.render(this.scene, this.camera);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  fuseGeometries(node1, node2) {
    const THREE = window.THREE;
    const group = new THREE.Group();

    // Create geometries for both nodes
    const geometry1 = this.createGeometryFromNode(node1);
    const geometry2 = this.createGeometryFromNode(node2);

    // Position them to show fusion
    geometry1.position.set(-1, 0, 0);
    geometry2.position.set(1, 0, 0);

    group.add(geometry1);
    group.add(geometry2);

    // Add fusion effect
    const fusionGeometry = new THREE.RingGeometry(0.5, 1, 32);
    const fusionMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF69B4,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });

    const fusionRing = new THREE.Mesh(fusionGeometry, fusionMaterial);
    group.add(fusionRing);

    return group;
  }

  async getCurrentGeometry() {
    return this.currentGeometry;
  }

  clearGeometry() {
    if (this.scene && this.currentGeometry) {
      this.scene.remove(this.currentGeometry);
      this.currentGeometry = null;
    }
  }

  updateCamera(position) {
    if (this.camera) {
      this.camera.position.set(position.x, position.y, position.z);
    }
  }

  resize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
