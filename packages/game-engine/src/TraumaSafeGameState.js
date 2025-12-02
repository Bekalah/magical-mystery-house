/**
 * 🏛️✨ CATHEDRAL OF CIRCUITS - TRAUMA-SAFE GAME STATE
 *
 * Native ES module for your authentic trauma-safe design
 * Maximum CPTSD-safe protocols with ND accommodations
 *
 * @architecture Native ES Modules
 * @trauma_safe Your real CPTSD-safe system
 */

export class TraumaSafeGameState {
  constructor() {
    this.gameState = {
      isActive: false,
      currentSession: null,
      progression: {
        nodesExplored: [],
        arcanaeUnlocked: [],
        fusionsActivated: [],
        wisdomGained: 0,
        healingReceived: 0
      },
      safety: {
        ndAccommodations: true,
        cptsdSafe: true,
        consentRequired: true,
        groundingAvailable: true,
        emergencyExits: true,
        sensoryConsiderations: true
      },
      accessibility: {
        reducedMotion: false,
        highContrast: false,
        largeText: false,
        screenReader: false,
        audioCues: true,
        visualCues: true
      }
    };

    this.sessionMemory = new Map();
    this.safetyProtocols = this.initializeSafetyProtocols();
  }

  initialize() {
    console.log('🛡️ Initializing Trauma-Safe Game State...');

    // Set up safety protocols
    this.gameState.currentSession = {
      id: `session_${Date.now()}`,
      startTime: new Date(),
      lastActivity: new Date(),
      safetyChecks: 0,
      groundingExercises: 0
    };

    // Initialize accessibility settings
    this.loadAccessibilitySettings();

    console.log('✅ Trauma-safe game state initialized');
    console.log('🛡️ Maximum CPTSD-safe protocols active');
  }

  initializeSafetyProtocols() {
    return {
      consent: {
        required: true,
        explicit: true,
        revocable: true,
        informed: true
      },
      pacing: {
        userControlled: true,
        gentleTransitions: true,
        noForcedProgression: true,
        breathingGuides: true
      },
      grounding: {
        alwaysAvailable: true,
        multipleMethods: true,
        realityAnchors: true,
        supportResources: true
      },
      sensory: {
        noStrobing: true,
        gentleMotion: true,
        volumeControl: true,
        intensityAdjustment: true
      },
      emergency: {
        escapeKey: 'Escape',
        pauseButton: 'Always visible',
        safeSpace: 'Always accessible',
        supportContacts: 'Always available'
      }
    };
  }

  loadAccessibilitySettings() {
    try {
      const saved = localStorage.getItem('cathedral-accessibility');
      if (saved) {
        this.gameState.accessibility = { ...this.gameState.accessibility, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Failed to load accessibility settings:', error);
    }
  }

  saveAccessibilitySettings() {
    try {
      localStorage.setItem('cathedral-accessibility', JSON.stringify(this.gameState.accessibility));
    } catch (error) {
      console.warn('Failed to save accessibility settings:', error);
    }
  }

  updateAccessibilitySetting(setting, value) {
    this.gameState.accessibility[setting] = value;
    this.saveAccessibilitySettings();

    // Apply setting immediately
    this.applyAccessibilitySetting(setting, value);
  }

  applyAccessibilitySetting(setting, value) {
    const body = document.body;

    switch (setting) {
      case 'reducedMotion':
        body.style.setProperty('--animation-duration', value ? '0.1s' : '0.3s');
        break;
      case 'highContrast':
        body.classList.toggle('high-contrast', value);
        break;
      case 'largeText':
        body.classList.toggle('large-text', value);
        break;
    }
  }

  canAccessNode(nodeId) {
    // Your authentic trauma-safe progression system
    const progression = this.gameState.progression;

    // Start with foundational nodes
    if (nodeId <= 8) {
      return true; // First 8 nodes are always accessible
    }

    // Check progression requirements
    if (nodeId <= 22 && progression.nodesExplored.length >= 3) {
      return true; // After exploring 3 nodes, can access more
    }

    if (nodeId <= 99 && progression.arcanaeUnlocked.length >= 2) {
      return true; // After unlocking 2 arcanae, can access deeper nodes
    }

    return false;
  }

  updateNodeProgression(nodeId) {
    if (!this.gameState.progression.nodesExplored.includes(nodeId)) {
      this.gameState.progression.nodesExplored.push(nodeId);
      this.gameState.progression.wisdomGained++;

      // Save session memory
      this.saveSessionMemory('node_explored', nodeId);
    }
  }

  updateCharacterProgression(character) {
    this.gameState.progression.healingReceived++;

    // Save session memory
    this.saveSessionMemory('character_progression', character);
  }

  saveSessionMemory(type, data) {
    const sessionId = this.gameState.currentSession?.id;
    if (!sessionId) return;

    if (!this.sessionMemory.has(sessionId)) {
      this.sessionMemory.set(sessionId, {
        startTime: new Date(),
        activities: []
      });
    }

    const session = this.sessionMemory.get(sessionId);
    session.activities.push({
      type,
      data,
      timestamp: new Date()
    });
    session.lastActivity = new Date();
  }

  getProgression() {
    return {
      nodesExplored: this.gameState.progression.nodesExplored.length,
      arcanaeUnlocked: this.gameState.progression.arcanaeUnlocked.length,
      fusionsActivated: this.gameState.progression.fusionsActivated.length,
      wisdomGained: this.gameState.progression.wisdomGained,
      healingReceived: this.gameState.progression.healingReceived,
      sessionDuration: this.getSessionDuration()
    };
  }

  getSessionDuration() {
    if (!this.gameState.currentSession) return 0;

    return Date.now() - this.gameState.currentSession.startTime.getTime();
  }

  getAccessibleNodes() {
    // Return nodes that are safe to access based on progression
    const allNodes = [1, 2, 3, 4, 5, 6, 7, 8, 22, 41, 73, 99, 144];
    return allNodes.filter(nodeId => this.canAccessNode(nodeId));
  }

  getSafetyStatus() {
    return {
      ndAccommodations: this.gameState.safety.ndAccommodations,
      cptsdSafe: this.gameState.safety.cptsdSafe,
      consentRequired: this.gameState.safety.consentRequired,
      groundingAvailable: this.gameState.safety.groundingAvailable,
      emergencyExits: this.gameState.safety.emergencyExits,
      sensoryConsiderations: this.gameState.safety.sensoryConsiderations,
      currentSession: this.gameState.currentSession,
      safetyChecks: this.gameState.currentSession?.safetyChecks || 0
    };
  }

  pause() {
    this.gameState.isActive = false;
    this.saveSessionMemory('game_paused', { timestamp: new Date() });
    console.log('🛡️ Game paused - Trauma-safe state preserved');
  }

  resume() {
    this.gameState.isActive = true;
    this.gameState.currentSession.lastActivity = new Date();
    this.saveSessionMemory('game_resumed', { timestamp: new Date() });
    console.log('🎮 Game resumed - Welcome back to your sacred journey');
  }

  emergencyExit() {
    console.log('🚨 Emergency exit activated - Trauma-safe shutdown');

    // Save current state for potential return
    this.saveSessionMemory('emergency_exit', {
      timestamp: new Date(),
      nodeProgression: this.gameState.progression.nodesExplored,
      characterProgression: this.gameState.progression.healingReceived
    });

    // Reset to safe state
    this.gameState.isActive = false;
    this.gameState.currentSession = null;

    // Return to safe space
    return {
      safeSpace: 'Cathedral Entrance',
      message: 'You are safe. Take your time. Return when ready.',
      resources: [
        'Breathing exercises available',
        'Grounding techniques ready',
        'Professional support contacts',
        'Safe return path preserved'
      ]
    };
  }

  getGroundingExercises() {
    return [
      {
        name: '5-4-3-2-1 Grounding',
        description: 'Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste',
        duration: '2-3 minutes',
        accessibility: 'Works with all sensory abilities'
      },
      {
        name: 'Box Breathing',
        description: 'Inhale for 4 counts, hold for 4, exhale for 4, hold for 4',
        duration: '1-2 minutes',
        accessibility: 'Visual and audio guides available'
      },
      {
        name: 'Safe Place Visualization',
        description: 'Imagine your safest, most peaceful place in detail',
        duration: '3-5 minutes',
        accessibility: 'Audio-guided version available'
      }
    ];
  }

  getSupportResources() {
    return {
      crisis: {
        name: '988 Suicide & Crisis Lifeline',
        phone: '988',
        description: '24/7 confidential support for emotional distress'
      },
      ptsd: {
        name: 'PTSD Foundation',
        phone: '1-877-717-PTSD',
        description: 'Specialized PTSD support and resources'
      },
      trauma: {
        name: 'RAINN National Sexual Assault Hotline',
        phone: '1-800-656-HOPE',
        description: 'Support for survivors of sexual violence'
      }
    };
  }
}
