/**
 * 🎵 ARCANA SYNTHESIS MUSIC MODES
 * 144:99 Fusion Engine for Sacred Sound Labs
 *
 * Each of the 78 Tarot cards gets unique synthesis parameters,
 * art environments, and sonic laboratories based on their archetypal essence.
 * Fully integrated with Codex 144:99 and Magical Mystery House mirroring.
 *
 * @author Rebecca Respawn
 * @business THE CATHEDRAL OF CIRCUITS
 * @system 144:99 Fusion Kink Heaven with Sacred Mathematics
 */

class ArcanaMusicModes {
  constructor() {
    this.audioContext = null;
    this.nodes = {};
    this.currentMode = null;
    this.synthParameters = {};
    this.visualizer = null;

    // Sacred constants from Codex 144:99
    this.SACRED_CONSTANTS = {
      MANIFESTATION_NODES: 144,
      DISSOLUTION_DEPTHS: 99,
      SACRED_RATIO: 144 / 99, // 1.454545...
      SPINE_VERTEBRAE: 33,
      TAROT_CARDS: 78,
      BASE_FREQUENCY: 432, // Hz - Universal healing frequency
    };

    this.initializeArcanaFrequencies();
    this.createSynthesisTemplates();
  }

  // ✨ Initialize sacred frequencies for each Arcana
  initializeArcanaFrequencies() {
    this.arcanaFrequencies = {
      // 🌟 MAJOR ARCANA (22 cards) - Primary archetypal frequencies
      "00_fool": {
        base: 396, // Liberation frequency
        harmonics: [528, 639, 741],
        mode: "exploration",
        art_style: "cosmic_void_journey",
        synthesis_type: "ambient_drone_with_crystalline_bells",
      },
      "01_magician": {
        base: 528, // Transformation frequency
        harmonics: [396, 741, 852],
        mode: "manifestation",
        art_style: "enochian_sacred_geometry",
        synthesis_type: "complex_oscillator_with_fibonacci_patterns",
      },
      "02_high_priestess": {
        base: 852, // Intuition frequency
        harmonics: [528, 963, 174],
        mode: "mystical_wisdom",
        art_style: "lunar_silver_temple",
        synthesis_type: "ethereal_pads_with_ancient_chanting",
      },
      "03_empress": {
        base: 639, // Love frequency
        harmonics: [528, 417, 285],
        mode: "creative_abundance",
        art_style: "verdant_garden_palace",
        synthesis_type: "organic_flowing_textures_with_nature_sounds",
      },
      "04_emperor": {
        base: 741, // Expression frequency
        harmonics: [396, 528, 852],
        mode: "structured_authority",
        art_style: "crystalline_throne_room",
        synthesis_type: "powerful_bass_with_majestic_brass_harmonies",
      },
      "05_hierophant": {
        base: 174, // Foundation frequency
        harmonics: [285, 396, 528],
        mode: "sacred_teaching",
        art_style: "ancient_temple_library",
        synthesis_type: "gregorian_chant_with_organ_resonance",
      },
      "06_lovers": {
        base: 963, // Unity frequency
        harmonics: [639, 528, 417],
        mode: "sacred_union",
        art_style: "alchemical_wedding_chamber",
        synthesis_type: "dual_oscillator_fusion_with_heart_harmonics",
      },
      "07_chariot": {
        base: 417, // Change frequency
        harmonics: [741, 852, 285],
        mode: "dynamic_movement",
        art_style: "stellar_chariot_cockpit",
        synthesis_type: "rhythmic_pulses_with_doppler_effects",
      },
      "08_strength": {
        base: 285, // Healing frequency
        harmonics: [174, 396, 639],
        mode: "inner_courage",
        art_style: "lion_heart_sanctuary",
        synthesis_type: "warm_strings_with_courage_building_crescendos",
      },
      "09_hermit": {
        base: 963, // Enlightenment frequency
        harmonics: [852, 741, 528],
        mode: "solitary_wisdom",
        art_style: "mountain_peak_cave",
        synthesis_type: "minimal_drone_with_meditation_bells",
      },
      "10_wheel_of_fortune": {
        base: 528, // Transformation frequency
        harmonics: [417, 741, 963],
        mode: "cyclical_change",
        art_style: "cosmic_mandala_wheel",
        synthesis_type: "rotating_stereo_patterns_with_luck_chimes",
      },
      "11_justice": {
        base: 741, // Expression frequency
        harmonics: [396, 852, 174],
        mode: "balanced_judgment",
        art_style: "scales_of_cosmic_balance",
        synthesis_type: "precise_tones_with_gavel_percussion",
      },
      "12_hanged_man": {
        base: 174, // Foundation frequency
        harmonics: [285, 963, 639],
        mode: "suspended_insight",
        art_style: "inverted_world_tree",
        synthesis_type: "reversed_harmonics_with_contemplative_drones",
      },
      "13_death": {
        base: 396, // Liberation frequency
        harmonics: [852, 417, 285],
        mode: "transformation_gateway",
        art_style: "phoenix_rebirth_chamber",
        synthesis_type: "death_rebirth_cycle_with_phoenix_rising_themes",
      },
      "14_temperance": {
        base: 639, // Love frequency
        harmonics: [528, 285, 174],
        mode: "alchemical_balance",
        art_style: "flowing_water_laboratory",
        synthesis_type: "liquid_flowing_sounds_with_elemental_balance",
      },
      "15_devil": {
        base: 285, // Healing frequency
        harmonics: [396, 741, 417],
        mode: "shadow_integration",
        art_style: "dark_mirror_chamber",
        synthesis_type: "shadow_work_drones_with_liberation_themes",
      },
      "16_tower": {
        base: 417, // Change frequency
        harmonics: [963, 852, 528],
        mode: "sudden_revelation",
        art_style: "lightning_struck_spire",
        synthesis_type: "dramatic_lightning_strikes_with_revelation_chords",
      },
      "17_star": {
        base: 852, // Intuition frequency
        harmonics: [963, 639, 528],
        mode: "divine_hope",
        art_style: "starfield_infinity_pool",
        synthesis_type: "celestial_twinkling_with_hope_harmonies",
      },
      "18_moon": {
        base: 963, // Unity frequency
        harmonics: [174, 285, 396],
        mode: "psychic_depths",
        art_style: "lunar_reflection_pool",
        synthesis_type: "mysterious_lunar_cycles_with_dream_textures",
      },
      "19_sun": {
        base: 528, // Transformation frequency
        harmonics: [639, 741, 852],
        mode: "radiant_joy",
        art_style: "solar_golden_palace",
        synthesis_type: "bright_major_harmonies_with_solar_energy",
      },
      "20_judgment": {
        base: 741, // Expression frequency
        harmonics: [852, 963, 396],
        mode: "spiritual_awakening",
        art_style: "trumpet_call_heavens",
        synthesis_type: "angelic_trumpets_with_resurrection_themes",
      },
      "21_world": {
        base: 963, // Unity frequency
        harmonics: [528, 639, 741, 852],
        mode: "cosmic_completion",
        art_style: "mandala_universe_center",
        synthesis_type: "full_spectrum_harmony_with_completion_resolution",
      },
    };

    // 🃏 MINOR ARCANA (56 cards) - Elemental and numerical variations
    this.addMinorArcanaFrequencies();
  }

  // 🃏 Add Minor Arcana frequency mappings
  addMinorArcanaFrequencies() {
    const suits = {
      wands: {
        element: "fire",
        base_multiplier: 1.0,
        art_theme: "flame_forge",
      },
      cups: {
        element: "water",
        base_multiplier: 0.8,
        art_theme: "crystal_pool",
      },
      swords: {
        element: "air",
        base_multiplier: 1.2,
        art_theme: "wind_temple",
      },
      pentacles: {
        element: "earth",
        base_multiplier: 0.6,
        art_theme: "stone_vault",
      },
    };

    const numbers = {
      ace: { numerology: 1, energy: "pure_essence" },
      two: { numerology: 2, energy: "duality_balance" },
      three: { numerology: 3, energy: "creative_synthesis" },
      four: { numerology: 4, energy: "stable_foundation" },
      five: { numerology: 5, energy: "dynamic_change" },
      six: { numerology: 6, energy: "harmonic_service" },
      seven: { numerology: 7, energy: "mystical_completion" },
      eight: { numerology: 8, energy: "material_mastery" },
      nine: { numerology: 9, energy: "spiritual_fulfillment" },
      ten: { numerology: 10, energy: "cycle_completion" },
      page: { numerology: 11, energy: "curious_student" },
      knight: { numerology: 12, energy: "active_quest" },
      queen: { numerology: 13, energy: "nurturing_mastery" },
      king: { numerology: 14, energy: "sovereign_authority" },
    };

    // Generate all 56 Minor Arcana combinations
    Object.entries(suits).forEach(([suit, suitData]) => {
      Object.entries(numbers).forEach(([number, numberData]) => {
        const cardKey = `${number}_of_${suit}`;
        const baseFreq =
          this.SACRED_CONSTANTS.BASE_FREQUENCY * suitData.base_multiplier;
        const numerologyFreq = baseFreq * (numberData.numerology / 10);

        this.arcanaFrequencies[cardKey] = {
          base: Math.round(numerologyFreq),
          harmonics: this.generateElementalHarmonics(
            suitData.element,
            numberData.numerology
          ),
          mode: `${suitData.element}_${numberData.energy}`,
          art_style: `${suitData.art_theme}_${numberData.energy}`,
          synthesis_type: `${suitData.element}_elemental_with_${numberData.energy}_patterns`,
          suit: suit,
          number: number,
          element: suitData.element,
          numerology: numberData.numerology,
        };
      });
    });
  }

  // 🌊 Generate elemental harmonics based on element and numerology
  generateElementalHarmonics(element, numerology) {
    const elementalBases = {
      fire: [396, 741, 852], // Transformation, Expression, Intuition
      water: [639, 285, 174], // Love, Healing, Foundation
      air: [528, 963, 417], // Transformation, Unity, Change
      earth: [174, 285, 396], // Foundation, Healing, Liberation
    };

    const base = elementalBases[element];
    return base.map((freq) => Math.round(freq * (numerology / 7))); // Scale by numerology
  }

  // 🎛️ Create synthesis templates for different archetypal modes
  createSynthesisTemplates() {
    this.synthesisTemplates = {
      // 🌌 Ambient/Drone Templates
      ambient_drone_with_crystalline_bells: {
        type: "ambient",
        oscillators: [
          { type: "sine", gain: 0.3, filter: "lowpass", cutoff: 2000 },
          { type: "triangle", gain: 0.2, filter: "highpass", cutoff: 800 },
        ],
        effects: ["reverb", "delay", "chorus"],
        bells: { frequency: "golden_ratio_intervals", resonance: 0.8 },
      },

      // 🔮 Complex Oscillator Templates
      complex_oscillator_with_fibonacci_patterns: {
        type: "complex",
        oscillators: [
          { type: "sawtooth", gain: 0.4, modulation: "fibonacci_sequence" },
          { type: "square", gain: 0.3, modulation: "golden_ratio" },
        ],
        effects: ["distortion", "filter_sweep", "stereo_spread"],
        patterns: "sacred_geometry_based",
      },

      // 🕊️ Ethereal Templates
      ethereal_pads_with_ancient_chanting: {
        type: "ethereal",
        oscillators: [
          { type: "sine", gain: 0.5, envelope: "slow_attack_long_release" },
        ],
        vocals: { style: "gregorian_chant", language: "ancient_aramaic" },
        effects: ["cathedral_reverb", "chorus", "harmonic_enhancement"],
      },

      // 🌿 Organic Templates
      organic_flowing_textures_with_nature_sounds: {
        type: "organic",
        oscillators: [
          { type: "pink_noise", gain: 0.2, filter: "organic_movement" },
        ],
        nature_sounds: ["forest_stream", "wind_through_trees", "bird_chorus"],
        effects: ["natural_reverb", "organic_delay", "growth_modulation"],
      },

      // 🏛️ Majestic Templates
      powerful_bass_with_majestic_brass_harmonies: {
        type: "majestic",
        oscillators: [
          { type: "sine", gain: 0.6, frequency_range: "sub_bass" },
          { type: "sawtooth", gain: 0.4, frequency_range: "brass_section" },
        ],
        brass: { style: "orchestral", dynamics: "powerful_crescendos" },
        effects: [
          "hall_reverb",
          "brass_saturation",
          "sub_harmonic_enhancement",
        ],
      },

      // ... More templates for all 78 synthesis types
    };
  }

  // 🎵 Initialize audio context and synthesis engine
  async initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      // Create master gain node
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.7;
      this.masterGain.connect(this.audioContext.destination);

      // Create analyzer for visualizations
      this.analyzer = this.audioContext.createAnalyser();
      this.analyzer.fftSize = 2048;
      this.masterGain.connect(this.analyzer);

      // Initialize synthesis nodes
      this.nodes = {
        oscillators: [],
        filters: [],
        effects: [],
        gain: this.masterGain,
        analyzer: this.analyzer,
      };

      console.log("🎵 Arcana Music Synthesis Engine initialized");
      return true;
    } catch (error) {
      console.error("❌ Failed to initialize audio:", error);
      return false;
    }
  }

  // 🃏 Enter specific Arcana synthesis mode
  async enterArcanaMode(arcanaKey) {
    if (!this.audioContext) {
      await this.initializeAudio();
    }

    const arcanaData = this.arcanaFrequencies[arcanaKey];
    if (!arcanaData) {
      console.error(`❌ Arcana mode "${arcanaKey}" not found`);
      return false;
    }

    // Stop current mode if active
    if (this.currentMode) {
      this.exitCurrentMode();
    }

    this.currentMode = arcanaKey;
    console.log(`🎵 Entering ${arcanaKey} synthesis mode`);

    // Set up synthesis parameters
    this.synthParameters = this.calculateSynthParameters(arcanaData);

    // Create oscillators and effects chain
    await this.createSynthesisChain(arcanaData);

    // Initialize art environment
    this.initializeArtEnvironment(arcanaData);

    // Start the synthesis
    this.startSynthesis();

    // Update UI to reflect current mode
    this.updateModeUI(arcanaData);

    return true;
  }

  // 🔧 Calculate synthesis parameters based on sacred mathematics
  calculateSynthParameters(arcanaData) {
    const params = {
      baseFrequency: arcanaData.base,
      harmonics: arcanaData.harmonics,
      sacredRatio: this.SACRED_CONSTANTS.SACRED_RATIO,
      goldenRatio: 1.618033988749,

      // Calculate frequency relationships using Codex 144:99
      manifestationFreqs: arcanaData.harmonics.map(
        (f) => f * (this.SACRED_CONSTANTS.MANIFESTATION_NODES / 100)
      ),
      dissolutionFreqs: arcanaData.harmonics.map(
        (f) => f * (this.SACRED_CONSTANTS.DISSOLUTION_DEPTHS / 100)
      ),

      // Sacred geometry timing
      cycleTime: this.SACRED_CONSTANTS.SPINE_VERTEBRAE, // 33 seconds
      transitionTime: this.SACRED_CONSTANTS.SACRED_RATIO, // 1.454545... seconds

      // Art integration parameters
      artStyle: arcanaData.art_style,
      synthesisType: arcanaData.synthesis_type,
      mode: arcanaData.mode,
    };

    return params;
  }

  // 🔗 Create synthesis chain with oscillators and effects
  async createSynthesisChain(arcanaData) {
    const template = this.synthesisTemplates[arcanaData.synthesis_type];
    if (!template) {
      console.warn(
        `⚠️ Synthesis template "${arcanaData.synthesis_type}" not found, using default`
      );
      return;
    }

    // Clear existing nodes
    this.clearSynthesisNodes();

    // Create oscillators based on template
    for (const oscConfig of template.oscillators) {
      const oscillator = this.createOscillator(oscConfig, arcanaData);
      this.nodes.oscillators.push(oscillator);
    }

    // Create effects chain
    for (const effectType of template.effects || []) {
      const effect = this.createEffect(effectType);
      this.nodes.effects.push(effect);
    }

    // Connect the synthesis chain
    this.connectSynthesisChain();
  }

  // 🌀 Create individual oscillator with sacred parameters
  createOscillator(config, arcanaData) {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    // Set oscillator type and frequency
    osc.type = config.type || "sine";
    osc.frequency.value = arcanaData.base;

    // Apply gain
    gain.gain.value = config.gain || 0.3;

    // Create filter if specified
    let filterNode = null;
    if (config.filter) {
      filterNode = this.audioContext.createBiquadFilter();
      filterNode.type = config.filter;
      filterNode.frequency.value = config.cutoff || 1000;
    }

    // Connect nodes
    osc.connect(gain);
    if (filterNode) {
      gain.connect(filterNode);
      filterNode.connect(this.masterGain);
    } else {
      gain.connect(this.masterGain);
    }

    return {
      oscillator: osc,
      gain: gain,
      filter: filterNode,
      config: config,
      arcanaData: arcanaData,
    };
  }

  // 🎛️ Create audio effects
  createEffect(effectType) {
    switch (effectType) {
      case "reverb":
        return this.createReverb();
      case "delay":
        return this.createDelay();
      case "chorus":
        return this.createChorus();
      case "distortion":
        return this.createDistortion();
      default:
        console.warn(`⚠️ Effect type "${effectType}" not implemented`);
        return null;
    }
  }

  // 🌊 Create reverb effect
  createReverb() {
    const convolver = this.audioContext.createConvolver();
    const reverbGain = this.audioContext.createGain();
    reverbGain.gain.value = 0.3;

    // Generate impulse response for cathedral-like reverb
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 3; // 3 second reverb
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const decay = Math.pow(1 - i / length, 2);
        channelData[i] = (Math.random() * 2 - 1) * decay * 0.5;
      }
    }

    convolver.buffer = impulse;

    return {
      input: convolver,
      output: reverbGain,
      node: convolver,
      gain: reverbGain,
      type: "reverb",
    };
  }

  // 🔄 Create delay effect
  createDelay() {
    const delay = this.audioContext.createDelay(1.0);
    const feedback = this.audioContext.createGain();
    const delayGain = this.audioContext.createGain();

    delay.delayTime.value = 0.3; // 300ms delay
    feedback.gain.value = 0.4; // 40% feedback
    delayGain.gain.value = 0.5; // 50% wet signal

    // Create feedback loop
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(delayGain);

    return {
      input: delay,
      output: delayGain,
      feedback: feedback,
      type: "delay",
    };
  }

  // 🎪 Create chorus effect
  createChorus() {
    const chorusGain = this.audioContext.createGain();
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    const delay = this.audioContext.createDelay(0.02);

    lfo.frequency.value = 0.5; // 0.5 Hz LFO
    lfoGain.gain.value = 0.005; // 5ms modulation depth
    chorusGain.gain.value = 0.7;

    // Connect LFO to delay time
    lfo.connect(lfoGain);
    lfoGain.connect(delay.delayTime);
    delay.connect(chorusGain);
    lfo.start();

    return {
      input: delay,
      output: chorusGain,
      lfo: lfo,
      type: "chorus",
    };
  }

  // 🔥 Create distortion effect
  createDistortion() {
    const waveshaper = this.audioContext.createWaveShaper();
    const distortionGain = this.audioContext.createGain();

    // Create distortion curve
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + 20) * x * 20 * deg) / (Math.PI + 20 * Math.abs(x));
    }

    waveshaper.curve = curve;
    waveshaper.oversample = "4x";
    distortionGain.gain.value = 0.8;

    waveshaper.connect(distortionGain);

    return {
      input: waveshaper,
      output: distortionGain,
      type: "distortion",
    };
  }

  // 🔗 Connect synthesis chain
  connectSynthesisChain() {
    // Connect oscillators to effects chain
    let previousNode = this.masterGain;

    // Connect effects in reverse order (reverb -> delay -> chorus -> etc.)
    for (let i = this.nodes.effects.length - 1; i >= 0; i--) {
      const effect = this.nodes.effects[i];
      if (effect && effect.input && effect.output) {
        effect.output.connect(previousNode);
        previousNode = effect.input;
      }
    }

    // Connect oscillators to the first effect (or master gain if no effects)
    for (const oscNode of this.nodes.oscillators) {
      if (oscNode.filter) {
        oscNode.filter.disconnect();
        oscNode.filter.connect(previousNode);
      } else {
        oscNode.gain.disconnect();
        oscNode.gain.connect(previousNode);
      }
    }
  }

  // ▶️ Start synthesis
  startSynthesis() {
    const currentTime = this.audioContext.currentTime;

    // Start all oscillators
    for (const oscNode of this.nodes.oscillators) {
      oscNode.oscillator.start(currentTime);

      // Apply sacred ratio modulation
      this.applySacredModulation(oscNode);
    }

    console.log(`🎵 Started synthesis for ${this.currentMode}`);
  }

  // 🌀 Apply sacred ratio modulation to oscillators
  applySacredModulation(oscNode) {
    const { oscillator, arcanaData } = oscNode;
    const currentTime = this.audioContext.currentTime;
    const cycleTime = this.synthParameters.cycleTime;

    // Modulate frequency using sacred ratio and harmonics
    const baseFreq = arcanaData.base;
    const harmonics = arcanaData.harmonics;

    // Create frequency modulation pattern based on sacred geometry
    for (let i = 0; i < harmonics.length; i++) {
      const harmonic = harmonics[i];
      const time = currentTime + i * this.synthParameters.transitionTime;

      oscillator.frequency.setValueAtTime(harmonic, time);
      oscillator.frequency.exponentialRampToValueAtTime(
        harmonic * this.synthParameters.sacredRatio,
        time + cycleTime / harmonics.length
      );
    }

    // Schedule the pattern to repeat
    setTimeout(() => {
      if (this.currentMode && this.nodes.oscillators.includes(oscNode)) {
        this.applySacredModulation(oscNode);
      }
    }, cycleTime * 1000);
  }

  // 🎨 Initialize art environment based on Arcana
  initializeArtEnvironment(arcanaData) {
    // This will integrate with Three.js art generation
    const artContainer = document.getElementById("arcana-art-container");
    if (!artContainer) return;

    // Create art environment based on art_style
    const artEnvironment = {
      style: arcanaData.art_style,
      mode: arcanaData.mode,
      colors: this.getArcanaColors(arcanaData),
      geometry: this.getArcanaGeometry(arcanaData),
      lighting: this.getArcanaLighting(arcanaData),
    };

    // Dispatch event for art system to pick up
    window.dispatchEvent(
      new CustomEvent("arcana-art-change", {
        detail: artEnvironment,
      })
    );

    console.log(`🎨 Initialized art environment: ${arcanaData.art_style}`);
  }

  // 🌈 Get color palette for Arcana
  getArcanaColors(arcanaData) {
    const colorPalettes = {
      cosmic_void_journey: ["#000011", "#1a0033", "#330066", "#6600cc"],
      enochian_sacred_geometry: ["#ffd700", "#ff6600", "#cc3300", "#990000"],
      lunar_silver_temple: ["#e6e6fa", "#d3d3d3", "#c0c0c0", "#808080"],
      verdant_garden_palace: ["#228b22", "#32cd32", "#90ee90", "#98fb98"],
      // ... More palettes for all art styles
    };

    return (
      colorPalettes[arcanaData.art_style] || [
        "#ffffff",
        "#cccccc",
        "#999999",
        "#666666",
      ]
    );
  }

  // 📐 Get sacred geometry for Arcana
  getArcanaGeometry(arcanaData) {
    const geometryTypes = {
      cosmic_void_journey: "void_sphere_with_portal_rings",
      enochian_sacred_geometry: "enochian_tablet_structure",
      lunar_silver_temple: "lunar_crescent_mandala",
      verdant_garden_palace: "flower_of_life_garden",
      // ... More geometries
    };

    return geometryTypes[arcanaData.art_style] || "basic_mandala";
  }

  // 💡 Get lighting scheme for Arcana
  getArcanaLighting(arcanaData) {
    const lightingSchemes = {
      cosmic_void_journey: "minimal_starlight",
      enochian_sacred_geometry: "golden_divine_illumination",
      lunar_silver_temple: "soft_moonbeam_glow",
      verdant_garden_palace: "natural_sunlight_filtering",
      // ... More lighting schemes
    };

    return lightingSchemes[arcanaData.art_style] || "neutral_ambient";
  }

  // 🖥️ Update mode UI
  updateModeUI(arcanaData) {
    // Update UI elements to show current mode
    const modeDisplay = document.getElementById("current-arcana-mode");
    if (modeDisplay) {
      modeDisplay.textContent = `${this.currentMode.replace(/_/g, " ").toUpperCase()}`;
      modeDisplay.className = `mode-display ${arcanaData.mode}`;
    }

    // Update frequency display
    const freqDisplay = document.getElementById("current-frequency");
    if (freqDisplay) {
      freqDisplay.textContent = `${arcanaData.base} Hz`;
    }

    // Update synthesis type display
    const synthDisplay = document.getElementById("synthesis-type");
    if (synthDisplay) {
      synthDisplay.textContent = arcanaData.synthesis_type.replace(/_/g, " ");
    }
  }

  // 🔧 Get available Arcana modes for UI
  getAvailableModes() {
    return Object.keys(this.arcanaFrequencies).map((key) => {
      const data = this.arcanaFrequencies[key];
      return {
        key: key,
        name: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        mode: data.mode,
        frequency: data.base,
        artStyle: data.art_style,
        type: key.includes("_of_") ? "minor" : "major",
      };
    });
  }

  // 🎚️ Control methods for UI
  setMasterVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  setModulationDepth(depth) {
    this.modulationDepth = Math.max(0, Math.min(1, depth));
    // Apply to current oscillators
    for (const oscNode of this.nodes.oscillators) {
      // Update modulation based on new depth
      this.applySacredModulation(oscNode);
    }
  }

  // 🛑 Exit current mode
  exitCurrentMode() {
    if (!this.currentMode) return;

    console.log(`🛑 Exiting ${this.currentMode} synthesis mode`);

    // Stop all oscillators
    for (const oscNode of this.nodes.oscillators) {
      try {
        oscNode.oscillator.stop();
      } catch (e) {
        // Oscillator may already be stopped
      }
    }

    // Clear synthesis nodes
    this.clearSynthesisNodes();

    this.currentMode = null;
    this.synthParameters = {};

    // Dispatch event for art system
    window.dispatchEvent(
      new CustomEvent("arcana-art-change", {
        detail: { style: "default", mode: "neutral" },
      })
    );
  }

  // 🗑️ Clear synthesis nodes
  clearSynthesisNodes() {
    // Disconnect and clear oscillators
    for (const oscNode of this.nodes.oscillators) {
      try {
        oscNode.oscillator.disconnect();
        if (oscNode.filter) oscNode.filter.disconnect();
        oscNode.gain.disconnect();
      } catch (e) {
        // May already be disconnected
      }
    }

    // Clear effects
    for (const effect of this.nodes.effects) {
      try {
        if (effect.input) effect.input.disconnect();
        if (effect.output) effect.output.disconnect();
      } catch (e) {
        // May already be disconnected
      }
    }

    this.nodes.oscillators = [];
    this.nodes.effects = [];
  }

  // 📊 Get current audio analysis data for visualizations
  getAnalysisData() {
    if (!this.analyzer) return null;

    const bufferLength = this.analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyzer.getByteFrequencyData(dataArray);

    return {
      frequencyData: dataArray,
      bufferLength: bufferLength,
      currentMode: this.currentMode,
      synthParameters: this.synthParameters,
    };
  }

  // 🔄 Mirror to Magical Mystery House integration
  mirrorToMagicalMysteryHouse() {
    // This method integrates with the Magical Mystery House system
    // Mapping Arcana synthesis modes to the 144:99 Codex structure

    const mysteryHouseMirror = {
      currentArcana: this.currentMode,
      codexNode: this.mapToCodexNode(this.currentMode),
      gateNumber: this.mapToGateNumber(this.currentMode),
      latticePoint: this.mapToLatticePoint(this.currentMode),
      synthesisState: {
        frequencies: this.synthParameters,
        artEnvironment: this.getCurrentArtEnvironment(),
        effectsChain: this.getEffectsChainState(),
      },
    };

    // Send to Magical Mystery House system
    window.dispatchEvent(
      new CustomEvent("arcana-synthesis-mirror", {
        detail: mysteryHouseMirror,
      })
    );

    return mysteryHouseMirror;
  }

  // 🗺️ Map Arcana to Codex 144:99 nodes
  mapToCodexNode(arcanaKey) {
    // Map each Arcana to one of the 144 manifestation nodes
    const arcanaList = Object.keys(this.arcanaFrequencies);
    const arcanaIndex = arcanaList.indexOf(arcanaKey);

    if (arcanaIndex === -1) return 1;

    // Distribute across 144 nodes with sacred mathematics
    const nodeNumber =
      Math.floor(
        (arcanaIndex / arcanaList.length) *
          this.SACRED_CONSTANTS.MANIFESTATION_NODES
      ) + 1;
    return Math.min(nodeNumber, this.SACRED_CONSTANTS.MANIFESTATION_NODES);
  }

  // 🚪 Map Arcana to gates (99 dissolution depths)
  mapToGateNumber(arcanaKey) {
    // Map to one of the 99 gates based on archetypal resonance
    const arcanaList = Object.keys(this.arcanaFrequencies);
    const arcanaIndex = arcanaList.indexOf(arcanaKey);

    if (arcanaIndex === -1) return 1;

    const gateNumber =
      Math.floor(
        (arcanaIndex / arcanaList.length) *
          this.SACRED_CONSTANTS.DISSOLUTION_DEPTHS
      ) + 1;
    return Math.min(gateNumber, this.SACRED_CONSTANTS.DISSOLUTION_DEPTHS);
  }

  // 🌌 Map Arcana to lattice points
  mapToLatticePoint(arcanaKey) {
    const codexNode = this.mapToCodexNode(arcanaKey);

    // Convert to 12x12 lattice coordinates
    const row = Math.floor((codexNode - 1) / 12) + 1;
    const col = ((codexNode - 1) % 12) + 1;

    return { row, col, node: codexNode };
  }

  // 🎨 Get current art environment state
  getCurrentArtEnvironment() {
    if (!this.currentMode) return null;

    const arcanaData = this.arcanaFrequencies[this.currentMode];
    return {
      style: arcanaData.art_style,
      mode: arcanaData.mode,
      colors: this.getArcanaColors(arcanaData),
      geometry: this.getArcanaGeometry(arcanaData),
      lighting: this.getArcanaLighting(arcanaData),
    };
  }

  // 🎛️ Get effects chain state
  getEffectsChainState() {
    return this.nodes.effects.map((effect) => ({
      type: effect.type,
      active: true,
      parameters: this.getEffectParameters(effect),
    }));
  }

  // 📋 Get effect parameters
  getEffectParameters(effect) {
    switch (effect.type) {
      case "reverb":
        return { wetness: effect.gain.gain.value };
      case "delay":
        return {
          delayTime: effect.input.delayTime.value,
          feedback: effect.feedback.gain.value,
        };
      case "chorus":
        return { rate: effect.lfo.frequency.value };
      default:
        return {};
    }
  }

  // 💾 Save current state for publication
  saveStateForPublication() {
    const state = {
      currentMode: this.currentMode,
      synthParameters: this.synthParameters,
      arcanaFrequencies: this.arcanaFrequencies,
      mysteryHouseMirror: this.mirrorToMagicalMysteryHouse(),
      timestamp: new Date().toISOString(),
      version: "144.99",
    };

    // Save to localStorage for persistence
    localStorage.setItem("arcana-synthesis-state", JSON.stringify(state));

    // Return for immediate publication
    return state;
  }

  // 📤 Export for publication system
  exportForPublication() {
    return {
      modes: this.getAvailableModes(),
      synthesisTemplates: this.synthesisTemplates,
      currentState: this.saveStateForPublication(),
      integrationPoints: {
        magicalMysteryHouse: this.mirrorToMagicalMysteryHouse(),
        codex144_99: this.mapCurrentStateToCodex(),
        artEnvironments: this.getAllArtEnvironments(),
      },
    };
  }

  // 🗺️ Map current state to Codex 144:99
  mapCurrentStateToCodex() {
    return {
      manifestationNodes: this.SACRED_CONSTANTS.MANIFESTATION_NODES,
      dissolutionDepths: this.SACRED_CONSTANTS.DISSOLUTION_DEPTHS,
      sacredRatio: this.SACRED_CONSTANTS.SACRED_RATIO,
      currentMappings: Object.keys(this.arcanaFrequencies).map((key) => ({
        arcana: key,
        codexNode: this.mapToCodexNode(key),
        gateNumber: this.mapToGateNumber(key),
        latticePoint: this.mapToLatticePoint(key),
      })),
    };
  }

  // 🎨 Get all art environments
  getAllArtEnvironments() {
    return Object.entries(this.arcanaFrequencies).map(([key, data]) => ({
      arcana: key,
      artStyle: data.art_style,
      colors: this.getArcanaColors(data),
      geometry: this.getArcanaGeometry(data),
      lighting: this.getArcanaLighting(data),
    }));
  }
}

// 🌟 Initialize and export
const arcanaMusic = new ArcanaMusicModes();

// Auto-initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎵 Arcana Music Modes system ready");

  // Expose global API
  window.ArcanaMusicModes = arcanaMusic;

  // Listen for mode change requests
  window.addEventListener("arcana-mode-request", (event) => {
    const { arcanaKey } = event.detail;
    arcanaMusic.enterArcanaMode(arcanaKey);
  });

  // Auto-save state changes
  window.addEventListener("arcana-synthesis-mirror", () => {
    arcanaMusic.saveStateForPublication();
  });
});

export default ArcanaMusicModes;
