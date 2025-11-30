/**
 * 🛡️ Trauma-Safe Creative Interface Templates
 * Neurodivergent-friendly design with gentle defaults and emergency exits
 * Compatible with Hall of Ateliers, Fusion Creative Suite, and Sacred Mathematics
 * 
 * Based on trauma-informed design principles and accessibility best practices
 */

import { 
  TrinityComponent 
} from '../trinity-architecture/index.js';

// ============================================================================
// TRAUMA-SAFE DESIGN CONSTANTS
// ============================================================================

export const TRAUMA_SAFE_CONSTANTS = {
  // Processing time allowances (in milliseconds)
  PROCESSING_TIME: {
    MINIMAL: 500,      // Quick actions
    STANDARD: 1500,    // Normal interactions
    GENTLE: 3000,      // Slower pace for sensitive users
    EXTENDED: 5000     // Complex operations
  },
  
  // Motion and animation settings
  MOTION_LEVELS: {
    NONE: 0,           // No motion
    REDUCED: 0.3,      // Minimal motion
    MODERATE: 0.6,     // Standard motion
    FULL: 1.0          // Full motion effects
  },
  
  // Color intensity levels
  COLOR_INTENSITY: {
    DIMMED: 0.4,       // Soft, gentle colors
    SOFT: 0.6,         // Gentle but visible
    STANDARD: 0.8,     // Normal visibility
    BRIGHT: 1.0        // Full brightness
  },
  
  // Sound levels
  SOUND_LEVELS: {
    SILENT: 0,         // No sound
    GENTLE: 0.3,       // Soft sounds only
    STANDARD: 0.6,     // Normal audio
    FULL: 1.0          // Full audio experience
  },
  
  // Sacred frequency ranges (safe healing frequencies only)
  SAFE_FREQUENCIES: {
    LIBERATION: 396,   // Liberation from fear
    CHANGE: 417,       // Facilitating change
    CONNECTION: 639,   // Heart connection
    TRANSFORMATION: 528, // DNA repair
    INTUITION: 741,    // Awakening intuition
    SPIRITUAL: 852,    // Return to spiritual order
    CONSCIOUSNESS: 963  // Divine consciousness
  }
};

// ============================================================================
// TRAUMA-SAFE INTERFACE TEMPLATE
// ============================================================================

export interface TraumaSafeConfig {
  emergencyExits: boolean;
  processingTime: number;
  motionLevel: number;
  colorIntensity: number;
  soundLevel: number;
  frequencyRange: 'safe' | 'full' | 'custom';
  gentleDefaults: boolean;
  keyboardNavigation: boolean;
  screenReader: boolean;
  voiceControl: boolean;
  eyeTracking: boolean;
  processingDelay: number;
  sensoryBreakInterval: number;
}

export class TraumaSafeInterface {
  private config: TraumaSafeConfig;
  private emergencyExitCallbacks: (() => void)[] = [];
  private processingTimeouts: NodeJS.Timeout[] = [];
  private sensoryBreakTimer: NodeJS.Timeout | null = null;
  private isActive: boolean = true;
  
  constructor(config?: Partial<TraumaSafeConfig>) {
    this.config = this.createDefaultConfig(config);
    this.initializeInterface();
  }
  
  private createDefaultConfig(overrides?: Partial<TraumaSafeConfig>): TraumaSafeConfig {
    return {
      emergencyExits: true,
      processingTime: TRAUMA_SAFE_CONSTANTS.PROCESSING_TIME.GENTLE,
      motionLevel: TRAUMA_SAFE_CONSTANTS.MOTION_LEVELS.REDUCED,
      colorIntensity: TRAUMA_SAFE_CONSTANTS.COLOR_INTENSITY.DIMMED,
      soundLevel: TRAUMA_SAFE_CONSTANTS.SOUND_LEVELS.GENTLE,
      frequencyRange: 'safe',
      gentleDefaults: true,
      keyboardNavigation: true,
      screenReader: true,
      voiceControl: false, // Default to false for safety
      eyeTracking: false,  // Default to false for privacy
      processingDelay: 1000, // Default delay between actions
      sensoryBreakInterval: 300000, // 5 minutes
      ...overrides
    };
  }
  
  private initializeInterface(): void {
    console.log('🛡️ Initializing trauma-safe creative interface...');
    console.log('   Processing time:', this.config.processingTime + 'ms');
    console.log('   Motion level:', this.config.motionLevel);
    console.log('   Color intensity:', this.config.colorIntensity);
    console.log('   Sound level:', this.config.soundLevel);
    
    this.setupEmergencyExits();
    this.setupSensoryBreaks();
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
  }
  
  private setupEmergencyExits(): void {
    if (!this.config.emergencyExits) return;
    
    // ESC key emergency exit
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.triggerEmergencyExit();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Visible emergency exit button
    this.createEmergencyExitButton();
    
    // Double-click emergency exit (for screen readers)
    const handleDoubleClick = () => {
      this.triggerEmergencyExit();
    };
    
    document.addEventListener('dblclick', handleDoubleClick);
  }
  
  private createEmergencyExitButton(): void {
    const exitButton = document.createElement('button');
    exitButton.textContent = '🛡️ Safe Exit';
    exitButton.className = 'trauma-safe-emergency-exit';
    exitButton.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #4a5568;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 10000;
      cursor: pointer;
      transition: background-color 0.3s ease;
    `;
    
    exitButton.addEventListener('mouseenter', () => {
      exitButton.style.background = '#2d3748';
    });
    
    exitButton.addEventListener('mouseleave', () => {
      exitButton.style.background = '#4a5568';
    });
    
    exitButton.addEventListener('click', () => {
      this.triggerEmergencyExit();
    });
    
    document.body.appendChild(exitButton);
  }
  
  private triggerEmergencyExit(): void {
    console.log('🛡️ Emergency exit triggered');
    
    // Clear all processing timeouts
    this.processingTimeouts.forEach(timeout => clearTimeout(timeout));
    this.processingTimeouts = [];
    
    // Clear sensory break timer
    if (this.sensoryBreakTimer) {
      clearTimeout(this.sensoryBreakTimer);
      this.sensoryBreakTimer = null;
    }
    
    // Execute all emergency exit callbacks
    this.emergencyExitCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in emergency exit callback:', error);
      }
    });
    
    // Show confirmation message
    this.showExitConfirmation();
  }
  
  private showExitConfirmation(): void {
    const confirmation = document.createElement('div');
    confirmation.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #2d3748;
      color: white;
      padding: 20px;
      border-radius: 8px;
      z-index: 10001;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    `;
    
    confirmation.innerHTML = `
      <h3>Safe Exit Activated</h3>
      <p>You have safely exited the creative interface.</p>
      <button onclick="this.parentElement.remove()" style="
        background: #4a5568;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
      ">Continue</button>
    `;
    
    document.body.appendChild(confirmation);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (confirmation.parentElement) {
        confirmation.remove();
      }
    }, 5000);
  }
  
  private setupSensoryBreaks(): void {
    if (this.config.sensoryBreakInterval <= 0) return;
    
    const scheduleSensoryBreak = () => {
      this.sensoryBreakTimer = setTimeout(() => {
        this.triggerSensoryBreak();
        scheduleSensoryBreak(); // Schedule next break
      }, this.config.sensoryBreakInterval);
    };
    
    scheduleSensoryBreak();
  }
  
  private triggerSensoryBreak(): void {
    console.log('🛡️ Sensory break triggered');
    
    // Reduce motion
    const originalMotion = this.config.motionLevel;
    this.config.motionLevel = 0;
    
    // Dim colors
    const originalColor = this.config.colorIntensity;
    this.config.colorIntensity = 0.2;
    
    // Show gentle notification
    this.showSensoryBreakNotification();
    
    // Restore normal settings after break
    setTimeout(() => {
      this.config.motionLevel = originalMotion;
      this.config.colorIntensity = originalColor;
      this.hideSensoryBreakNotification();
    }, 60000); // 1 minute break
  }
  
  private showSensoryBreakNotification(): void {
    const notification = document.createElement('div');
    notification.id = 'sensory-break-notification';
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(74, 85, 104, 0.9);
      color: white;
      padding: 30px;
      border-radius: 12px;
      z-index: 10002;
      text-align: center;
      font-size: 18px;
      max-width: 400px;
    `;
    
    notification.innerHTML = `
      <div style="font-size: 24px; margin-bottom: 10px;">🛡️</div>
      <h3>Sensory Break</h3>
      <p>Take a moment to breathe and relax.</p>
      <p style="font-size: 14px; opacity: 0.8;">This interface will automatically return to normal in 1 minute.</p>
    `;
    
    document.body.appendChild(notification);
  }
  
  private hideSensoryBreakNotification(): void {
    const notification = document.getElementById('sensory-break-notification');
    if (notification) {
      notification.remove();
    }
  }
  
  private setupKeyboardNavigation(): void {
    if (!this.config.keyboardNavigation) return;
    
    const handleKeyNavigation = (event: KeyboardEvent) => {
      // Tab navigation
      if (event.key === 'Tab') {
        this.handleTabNavigation(event);
      }
      
      // Arrow key navigation
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        this.handleArrowNavigation(event);
      }
      
      // Enter/Space activation
      if (event.key === 'Enter' || event.key === ' ') {
        this.handleActivation(event);
      }
    };
    
    document.addEventListener('keydown', handleKeyNavigation);
  }
  
  private handleTabNavigation(event: KeyboardEvent): void {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (event.shiftKey) {
      // Shift+Tab (backward)
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab (forward)
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
  
  private handleArrowNavigation(event: KeyboardEvent): void {
    const currentElement = document.activeElement as HTMLElement;
    if (!currentElement) return;
    
    // Move between related elements
    const parent = currentElement.parentElement;
    if (!parent) return;
    
    const siblings = Array.from(parent.children) as HTMLElement[];
    const currentIndex = siblings.indexOf(currentElement);
    
    let targetIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowUp':
        targetIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowDown':
        targetIndex = Math.min(siblings.length - 1, currentIndex + 1);
        break;
      case 'ArrowLeft':
        targetIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowRight':
        targetIndex = Math.min(siblings.length - 1, currentIndex + 1);
        break;
    }
    
    if (targetIndex !== currentIndex) {
      event.preventDefault();
      siblings[targetIndex].focus();
    }
  }
  
  private handleActivation(event: KeyboardEvent): void {
    const currentElement = document.activeElement as HTMLElement;
    if (!currentElement) return;
    
    // Only activate buttons and links
    if (currentElement.tagName === 'BUTTON' || currentElement.tagName === 'A') {
      currentElement.click();
    }
  }
  
  private setupScreenReaderSupport(): void {
    if (!this.config.screenReader) return;
    
    // Add ARIA labels to interactive elements
    const addAriaSupport = () => {
      const buttons = document.querySelectorAll('button:not([aria-label])');
      buttons.forEach((button, index) => {
        if (!button.getAttribute('aria-label')) {
          button.setAttribute('aria-label', `Button ${index + 1}`);
        }
      });
      
      const inputs = document.querySelectorAll('input:not([aria-label])');
      inputs.forEach((input, index) => {
        if (!input.getAttribute('aria-label')) {
          const type = input.getAttribute('type') || 'input';
          input.setAttribute('aria-label', `${type} field ${index + 1}`);
        }
      });
    };
    
    // Run immediately and when DOM changes
    addAriaSupport();
    const observer = new MutationObserver(addAriaSupport);
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  // Public API methods
  registerEmergencyExit(callback: () => void): void {
    this.emergencyExitCallbacks.push(callback);
  }
  
  async processWithDelay<T>(operation: () => Promise<T>): Promise<T> {
    // Add processing delay for gentle user experience
    await new Promise(resolve => setTimeout(resolve, this.config.processingDelay));
    
    const timeout = setTimeout(() => {
      console.log('🛡️ Operation taking longer than expected - consider taking a break');
    }, this.config.processingTime);
    
    this.processingTimeouts.push(timeout);
    
    try {
      const result = await operation();
      clearTimeout(timeout);
      return result;
    } catch (error) {
      clearTimeout(timeout);
      throw error;
    }
  }
  
  updateConfig(newConfig: Partial<TraumaSafeConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('🛡️ Trauma-safe config updated:', this.config);
  }
  
  getConfig(): TraumaSafeConfig {
    return { ...this.config };
  }
  
  isSafeModeActive(): boolean {
    return this.isActive && this.config.gentleDefaults;
  }
  
  pause(): void {
    this.isActive = false;
    console.log('🛡️ Trauma-safe interface paused');
  }
  
  resume(): void {
    this.isActive = true;
    console.log('🛡️ Trauma-safe interface resumed');
  }
}

// ============================================================================
// CREATIVE TOOL TRAUMA-SAFE WRAPPERS
// ============================================================================

export class TraumaSafeCreativeTool {
  private interface: TraumaSafeInterface;
  private toolName: string;
  
  constructor(toolName: string, config?: Partial<TraumaSafeConfig>) {
    this.toolName = toolName;
    this.interface = new TraumaSafeInterface(config);
    
    console.log(`🛡️ Trauma-safe ${toolName} initialized`);
  }
  
  // Wrapper for creative operations
  async safeCreativeOperation<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> {
    console.log(`🛡️ Starting safe ${operationName} in ${this.toolName}`);
    
    return this.interface.processWithDelay(async () => {
      // Apply gentle settings during operation
      const originalConfig = this.interface.getConfig();
      
      // Temporarily reduce intensity for safety
      this.interface.updateConfig({
        motionLevel: Math.min(originalConfig.motionLevel, 0.3),
        colorIntensity: Math.min(originalConfig.colorIntensity, 0.6),
        soundLevel: Math.min(originalConfig.soundLevel, 0.3)
      });
      
      try {
        const result = await operation();
        console.log(`✅ Safe ${operationName} completed in ${this.toolName}`);
        return result;
      } catch (error) {
        console.error(`❌ Error in safe ${operationName}:`, error);
        throw error;
      } finally {
        // Restore original settings
        this.interface.updateConfig(originalConfig);
      }
    });
  }
  
  // Safe character selection (for Arcana system)
  async safeCharacterSelection(
    characterData: any,
    onSelect: (character: any) => void
  ): Promise<void> {
    await this.safeCreativeOperation(async () => {
      // Add gentle processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validate character data for safety
      const safeCharacter = this.validateCharacterData(characterData);
      
      onSelect(safeCharacter);
    }, 'character selection');
  }
  
  private validateCharacterData(character: any): any {
    // Ensure character data is safe and appropriate
    return {
      ...character,
      // Remove any potentially overwhelming visual effects
      visualIntensity: Math.min(character.visualIntensity || 1, 0.7),
      motionSpeed: Math.min(character.motionSpeed || 1, 0.5),
      soundVolume: Math.min(character.soundVolume || 1, 0.4)
    };
  }
  
  // Safe geometry generation (for Sacred Mathematics)
  async safeGeometryGeneration(
    geometryParams: any,
    onGenerate: (geometry: any) => void
  ): Promise<void> {
    await this.safeCreativeOperation(async () => {
      // Add processing time for complex calculations
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Apply sacred mathematics with gentle defaults
      const safeGeometry = {
        ...geometryParams,
        complexity: Math.min(geometryParams.complexity || 1, 0.8),
        colorIntensity: Math.min(geometryParams.colorIntensity || 1, 0.6),
        animationSpeed: Math.min(geometryParams.animationSpeed || 1, 0.4)
      };
      
      onGenerate(safeGeometry);
    }, 'geometry generation');
  }
}

// ============================================================================
// ACCESSIBILITY UTILITIES
// ============================================================================

export class AccessibilityManager {
  private voiceCommands: Map<string, () => void> = new Map();
  private isVoiceEnabled: boolean = false;
  
  constructor() {
    this.initializeVoiceCommands();
  }
  
  private initializeVoiceCommands(): void {
    // Safe voice commands for creative tools
    this.voiceCommands.set('safe exit', () => {
      const interface_ = document.querySelector('.trauma-safe-emergency-exit') as HTMLElement;
      if (interface_) interface_.click();
    });
    
    this.voiceCommands.set('gentle mode', () => {
      this.setGentleMode();
    });
    
    this.voiceCommands.set('reset', () => {
      this.resetToDefaults();
    });
    
    this.voiceCommands.set('break', () => {
      this.triggerSensoryBreak();
    });
  }
  
  enableVoiceControl(): void {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('🛡️ Voice control not supported in this browser');
      return;
    }
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: any) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      console.log('🛡️ Voice command detected:', command);
      
      if (this.voiceCommands.has(command)) {
        this.voiceCommands.get(command)?.();
      }
    };
    
    recognition.onerror = (event: any) => {
      console.error('🛡️ Voice recognition error:', event.error);
    };
    
    recognition.start();
    this.isVoiceEnabled = true;
    console.log('🛡️ Voice control enabled');
  }
  
  disableVoiceControl(): void {
    this.isVoiceEnabled = false;
    console.log('🛡️ Voice control disabled');
  }
  
  private setGentleMode(): void {
    // Apply gentle mode settings
    const style = document.createElement('style');
    style.textContent = `
      .gentle-mode * {
        transition: all 0.5s ease !important;
        animation-duration: 0.5s !important;
      }
      .gentle-mode {
        filter: brightness(0.8) contrast(0.9) !important;
      }
    `;
    document.head.appendChild(style);
    document.body.classList.add('gentle-mode');
    console.log('🛡️ Gentle mode activated');
  }
  
  private resetToDefaults(): void {
    // Remove all trauma-safe modifications
    document.body.classList.remove('gentle-mode');
    const gentleStyles = document.querySelectorAll('style[data-trauma-safe]');
    gentleStyles.forEach(style => style.remove());
    console.log('🛡️ Reset to defaults');
  }
  
  private triggerSensoryBreak(): void {
    // Trigger sensory break
    const event = new CustomEvent('sensory-break');
    document.dispatchEvent(event);
  }
  
  // High contrast mode
  enableHighContrast(): void {
    const style = document.createElement('style');
    style.setAttribute('data-trauma-safe', 'true');
    style.textContent = `
      * {
        background: white !important;
        color: black !important;
        border-color: black !important;
        box-shadow: none !important;
      }
      button, input, select, textarea {
        background: white !important;
        color: black !important;
        border: 2px solid black !important;
      }
    `;
    document.head.appendChild(style);
    console.log('🛡️ High contrast mode enabled');
  }
  
  // Large text mode
  enableLargeText(): void {
    const style = document.createElement('style');
    style.setAttribute('data-trauma-safe', 'true');
    style.textContent = `
      body {
        font-size: 18px !important;
        line-height: 1.6 !important;
      }
      h1 { font-size: 28px !important; }
      h2 { font-size: 24px !important; }
      h3 { font-size: 20px !important; }
    `;
    document.head.appendChild(style);
    console.log('🛡️ Large text mode enabled');
  }
}

// ============================================================================
// EXPORT ALL TRAUMA-SAFE UTILITIES
// ============================================================================

export {
  TraumaSafeInterface,
  TraumaSafeCreativeTool,
  AccessibilityManager
};

// Singleton instances
export const traumaSafeInterface = new TraumaSafeInterface();
export const accessibilityManager = new AccessibilityManager();

// Professional trauma-safe presets
export const TRAUMA_SAFE_PRESETS = {
  // Preset for sensitive users
  SENSITIVE: {
    processingTime: TRAUMA_SAFE_CONSTANTS.PROCESSING_TIME.EXTENDED,
    motionLevel: TRAUMA_SAFE_CONSTANTS.MOTION_LEVELS.NONE,
    colorIntensity: TRAUMA_SAFE_CONSTANTS.COLOR_INTENSITY.DIMMED,
    soundLevel: TRAUMA_SAFE_CONSTANTS.SOUND_LEVELS.SILENT,
    frequencyRange: 'safe',
    gentleDefaults: true
  },
  
  // Preset for standard users
  STANDARD: {
    processingTime: TRAUMA_SAFE_CONSTANTS.PROCESSING_TIME.GENTLE,
    motionLevel: TRAUMA_SAFE_CONSTANTS.MOTION_LEVELS.REDUCED,
    colorIntensity: TRAUMA_SAFE_CONSTANTS.COLOR_INTENSITY.SOFT,
    soundLevel: TRAUMA_SAFE_CONSTANTS.SOUND_LEVELS.GENTLE,
    frequencyRange: 'safe',
    gentleDefaults: true
  },
  
  // Preset for advanced users
  ADVANCED: {
    processingTime: TRAUMA_SAFE_CONSTANTS.PROCESSING_TIME.STANDARD,
    motionLevel: TRAUMA_SAFE_CONSTANTS.MOTION_LEVELS.MODERATE,
    colorIntensity: TRAUMA_SAFE_CONSTANTS.COLOR_INTENSITY.STANDARD,
    soundLevel: TRAUMA_SAFE_CONSTANTS.SOUND_LEVELS.STANDARD,
    frequencyRange: 'full',
    gentleDefaults: false
  }
};

export default {
  interface: traumaSafeInterface,
  accessibility: accessibilityManager,
  constants: TRAUMA_SAFE_CONSTANTS,
  presets: TRAUMA_SAFE_PRESETS
};