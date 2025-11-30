/**
 * 🏛️✨ CATHEDRAL OF CIRCUITS - AUDIO SYNTHESIS ENGINE
 *
 * Native ES module for your authentic solfeggio frequencies
 * Web Audio API integration with your sacred sound system
 *
 * @architecture Native ES Modules with Web Audio API
 * @audio_authentic Your real solfeggio frequencies
 */

export class AudioSynthesisEngine {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.isInitialized = false;
    this.currentFrequencies = [];
    this.oscillators = [];
  }

  async initialize() {
    try {
// console.log('🎵 Initializing Audio Synthesis Engine...');

      // Initialize Web Audio API
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Create master gain node
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.setValueAtTime(0.1, this.audioContext.currentTime); // Start quiet
      this.masterGain.connect(this.audioContext.destination);

      // Your authentic solfeggio frequencies
      this.solfeggioFrequencies = {
        396: { name: 'Liberation', chakra: 'Root', intention: 'Liberating guilt and fear' },
        417: { name: 'Transmutation', chakra: 'Sacral', intention: 'Undoing situations and facilitating change' },
        432: { name: 'Heart', chakra: 'Heart', intention: 'Natural harmony and peace' },
        528: { name: 'Transformation', chakra: 'Solar Plexus', intention: 'DNA repair and transformation' },
        639: { name: 'Connection', chakra: 'Heart', intention: 'Reconnecting and balancing relationships' },
        741: { name: 'Intuition', chakra: 'Throat', intention: 'Awakening intuition and solving problems' },
        852: { name: 'Vision', chakra: 'Third Eye', intention: 'Returning to spiritual order' },
        963: { name: 'Unity', chakra: 'Crown', intention: 'Connecting with divine consciousness' }
      };

      this.isInitialized = true;
// console.log('✅ Audio Synthesis Engine initialized');
// console.log('🎵 Solfeggio frequencies ready for sacred sound');

    } catch (error) {
// console.error('❌ Failed to initialize audio engine:', error);
      throw error;
    }
  }

  async playNodeFrequencies(node) {
    if (!this.isInitialized) {
      await this.initialize();
    }

// console.log(`🎵 Playing frequencies for ${node.name}...`);

    // Stop existing oscillators
    this.stopAllFrequencies();

    // Create oscillators for this node's frequencies
    const frequencies = this.getNodeFrequencies(node);

    frequencies.forEach((freq, index) => {
      const oscillator = this.createSacredOscillator(freq, index);
      this.oscillators.push(oscillator);
    });

    this.currentFrequencies = frequencies;
  }

  getNodeFrequencies(node) {
    const frequencies = [];

    // Primary frequency from node
    if (node.solfeggio) {
      frequencies.push(node.solfeggio);
    }

    // Add harmonic frequencies based on your sacred mathematics
    if (node.harmonics) {
      const baseFreq = node.solfeggio || 432;
      node.harmonics.perfectConsonance?.forEach(ratio => {
        frequencies.push(baseFreq * ratio);
      });
    }

    return frequencies.length > 0 ? frequencies : [432]; // Default to 432 Hz
  }

  createSacredOscillator(frequency, index) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Sacred waveforms based on your node properties
    const waveType = index % 2 === 0 ? 'sine' : 'triangle';

    oscillator.type = waveType;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    // Sacred envelope for smooth transitions
    const now = this.audioContext.currentTime;
    const attackTime = 0.1;
    const releaseTime = 2.0;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.05, now + attackTime);
    gainNode.gain.setValueAtTime(0.05, now + attackTime + 1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + attackTime + releaseTime);

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Start oscillator
    oscillator.start(now);
    oscillator.stop(now + attackTime + releaseTime + 1);

    return oscillator;
  }

  fuseFrequencies(node1, node2) {
    const freq1 = this.getNodeFrequencies(node1);
    const freq2 = this.getNodeFrequencies(node2);

    // Your authentic frequency fusion
    const fusedFrequencies = [...new Set([...freq1, ...freq2])];

// console.log(`🎵 Fused frequencies: ${fusedFrequencies.join(', ')} Hz`);

    return fusedFrequencies;
  }

  async fadeIn() {
    if (!this.masterGain) return;

    const now = this.audioContext.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(0.1, now + 1);
  }

  async fadeOut() {
    if (!this.masterGain) return;

    const now = this.audioContext.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0.1, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1);
  }

  stopAllFrequencies() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator already stopped
      }
    });
    this.oscillators = [];
    this.currentFrequencies = [];
  }

  getCurrentFrequencies() {
    return this.currentFrequencies;
  }

  playSolfeggioFrequency(frequency) {
    if (!this.solfeggioFrequencies[frequency]) {
// console.error(`Solfeggio frequency ${frequency} Hz not found`);
      return;
    }

    const freqInfo = this.solfeggioFrequencies[frequency];
// console.log(`🎵 Playing ${frequency} Hz - ${freqInfo.name}: ${freqInfo.intention}`);

    this.stopAllFrequencies();
    this.currentFrequencies = [frequency];

    const oscillator = this.createSacredOscillator(frequency, 0);
    this.oscillators.push(oscillator);

    return freqInfo;
  }

  createSacredChord(frequencies) {
// console.log(`🎵 Creating sacred chord with ${frequencies.length} frequencies...`);

    this.stopAllFrequencies();

    frequencies.forEach((freq, index) => {
      const oscillator = this.createSacredOscillator(freq, index);
      this.oscillators.push(oscillator);
    });

    this.currentFrequencies = frequencies;
  }

  getSolfeggioInfo(frequency) {
    return this.solfeggioFrequencies[frequency] || null;
  }

  getAllSolfeggioFrequencies() {
    return Object.entries(this.solfeggioFrequencies).map(([freq, info]) => ({
      frequency: parseInt(freq),
      ...info
    }));
  }
}
