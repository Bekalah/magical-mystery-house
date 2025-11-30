/**
 * mode-switcher
 * 
 * @package @cathedral/shared
 */
/**
 * Cathedral Mode Switcher - Seamless Mode Transition System
 * 
 * Connects all apps (web, synth-lab, tarot-arena, etc.) for seamless mode switching
 * between Game Mode, Design Mode, and Music Mode
 */

export type CathedralMode = 'game' | 'design' | 'music' | 'codex' | 'tarot' | 'fusionkink' | 'welcome';

export interface ModeState {
  currentMode: CathedralMode;
  previousMode: CathedralMode | null;
  transitionHistory: CathedralMode[];
  appContext: Record<string, any>;
}

export interface ModeTransition {
  from: CathedralMode;
  to: CathedralMode;
  timestamp: number;
  context?: Record<string, any>;
}

export class ModeSwitcher {
  private state: ModeState;
  private listeners: Map<CathedralMode, Set<(state: ModeState) => void>> = new Map();
  private transitionHistory: ModeTransition[] = [];
  private appConnections: Map<string, any> = new Map();

  constructor(initialMode: CathedralMode = 'welcome') {
    this.state = {
      currentMode: initialMode,
      previousMode: null,
      transitionHistory: [initialMode],
      appContext: {}
    };
  }

  /**
   * Switch to a new mode seamlessly
   */
  async switchMode(
    newMode: CathedralMode,
    context?: Record<string, any>
  ): Promise<void> {
    const previousMode = this.state.currentMode;
    
    // Save current app context before switching
    if (this.state.appContext[previousMode]) {
      this.state.appContext[previousMode] = {
        ...this.state.appContext[previousMode],
        savedAt: Date.now()
      };
    }

    // Create transition record
    const transition: ModeTransition = {
      from: previousMode,
      to: newMode,
      timestamp: Date.now(),
      context: context || {}
    };
    this.transitionHistory.push(transition);

    // Update state
    this.state.previousMode = previousMode;
    this.state.currentMode = newMode;
    this.state.transitionHistory.push(newMode);
    this.state.appContext[newMode] = context || {};

    // Notify listeners
    this.notifyListeners(newMode);

    // Initialize mode-specific features
    await this.initializeMode(newMode, context);
  }

  /**
   * Initialize mode-specific features
   */
  private async initializeMode(
    mode: CathedralMode,
    context?: Record<string, any>
  ): Promise<void> {
    switch (mode) {
      case 'game':
        await this.initializeGameMode(context);
        break;
      case 'design':
        await this.initializeDesignMode(context);
        break;
      case 'music':
        await this.initializeMusicMode(context);
        break;
      case 'codex':
        await this.initializeCodexMode(context);
        break;
      case 'tarot':
        await this.initializeTarotMode(context);
        break;
      case 'fusionkink':
        await this.initializeFusionKinkMode(context);
        break;
      case 'welcome':
        // Welcome mode - no special initialization
        break;
    }
  }

  /**
   * Initialize Game Mode
   */
  private async initializeGameMode(context?: Record<string, any>): Promise<void> {
    try {
      // Load game engine if available
      const gameModule = await import('@cathedral/game-engine');
      if (gameModule && typeof window !== 'undefined') {
// console.log('🎮 Game mode initialized');
      }
    } catch (error) {
// console.warn('Game engine not available, continuing without it');
    }
  }

  /**
   * Initialize Design Mode
   */
  private async initializeDesignMode(context?: Record<string, any>): Promise<void> {
    try {
      // Load design tools if available
      const designModule = await import('@cathedral/cathedral-design-library');
      if (designModule && typeof window !== 'undefined') {
// console.log('🎨 Design mode initialized');
      }
    } catch (error) {
// console.warn('Design library not available, continuing without it');
    }
  }

  /**
   * Initialize Music Mode
   */
  private async initializeMusicMode(context?: Record<string, any>): Promise<void> {
    try {
      // Load synth engine if available
      const synthModule = await import('@cathedral/synth');
      if (synthModule && typeof window !== 'undefined') {
// console.log('🎵 Music mode initialized with 10 legendary synthesizers');
      }
    } catch (error) {
// console.warn('Synth engine not available, continuing without it');
    }
  }

  /**
   * Initialize Codex Mode
   */
  private async initializeCodexMode(context?: Record<string, any>): Promise<void> {
    try {
      // Load Codex 144:99 (pure algorithmic, no AI)
      const codexModule = await import('@cathedral/codex-14499');
      if (codexModule && typeof window !== 'undefined') {
// console.log('📚 Codex 144:99 mode initialized (pure algorithmic)');
      }
    } catch (error) {
// console.warn('Codex library not available, continuing without it');
    }
  }

  /**
   * Initialize Tarot Mode
   */
  private async initializeTarotMode(context?: Record<string, any>): Promise<void> {
    try {
      // Load Liber Arcanae with art
      const liberModule = await import('@cathedral/liber-arcanae');
      if (liberModule && typeof window !== 'undefined') {
// console.log('🃏 Liber Arcanae Codex Abyssiae initialized with art');
      }
    } catch (error) {
// console.warn('Liber Arcanae not available, continuing without it');
    }
  }

  /**
   * Initialize FusionKink Mode
   */
  private async initializeFusionKinkMode(context?: Record<string, any>): Promise<void> {
    try {
      // Load Cathedral Integration System
      const integrationModule = await import('./cathedral-integration');
      if (integrationModule.cathedralIntegration && typeof window !== 'undefined') {
// console.log('⚗️ FusionKink mode initialized - connecting all systems');
// console.log('  - Sound Tech (10 legendary synthesizers)');
// console.log('  - Art Tech (atelier, geometry studio)');
// console.log('  - Fusion Tech (reality synthesis)');
// console.log('  - Learning Tech (cosmogenesis-learning-engine)');
// console.log('  - Living Grimoire (Stone Grimoire)');
// console.log('  - Magical Mystery House (Living Library)');
// console.log('  - Living Cathedral (Cathedral of Circuits)');
// console.log('  - Game Engine (Godot 4.5 + Rust)');
// console.log('  🎨 Art Quality: Museum-level classical mastery with sacred geometry');
      }
    } catch (error) {
// console.warn('Cathedral Integration not available, continuing without it');
    }
  }

  /**
   * Subscribe to mode changes
   */
  onModeChange(mode: CathedralMode, callback: (state: ModeState) => void): () => void {
    if (!this.listeners.has(mode)) {
      this.listeners.set(mode, new Set());
    }
    this.listeners.get(mode)!.add(callback);

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(mode);
      if (listeners) {
        listeners.delete(callback);
      }
    };
  }

  /**
   * Notify listeners of mode change
   */
  private notifyListeners(mode: CathedralMode): void {
    const listeners = this.listeners.get(mode);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(this.state);
        } catch (error) {
// console.error('Error in mode change listener:', error);
        }
      });
    }

    // Also notify 'all' listeners
    const allListeners = this.listeners.get('all' as CathedralMode);
    if (allListeners) {
      allListeners.forEach(callback => {
        try {
          callback(this.state);
        } catch (error) {
// console.error('Error in mode change listener:', error);
        }
      });
    }
  }

  /**
   * Get current mode state
   */
  getState(): ModeState {
    return { ...this.state };
  }

  /**
   * Get transition history
   */
  getTransitionHistory(): ModeTransition[] {
    return [...this.transitionHistory];
  }

  /**
   * Restore app context for a mode
   */
  restoreContext(mode: CathedralMode): Record<string, any> | null {
    return this.state.appContext[mode] || null;
  }

  /**
   * Connect an app to the mode switcher
   */
  connectApp(appName: string, appInstance: any): void {
    this.appConnections.set(appName, appInstance);
// console.log(`🔗 Connected app: ${appName}`);
  }

  /**
   * Get connected app
   */
  getApp(appName: string): any {
    return this.appConnections.get(appName);
  }
}

// Global mode switcher instance
export const modeSwitcher = new ModeSwitcher();

// Export for use across apps
export default modeSwitcher;
