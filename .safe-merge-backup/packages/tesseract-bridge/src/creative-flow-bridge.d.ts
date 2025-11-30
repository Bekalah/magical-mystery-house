/**
 * 🌉 Creative Flow Bridge - Complete Mode Switching System
 *
 * For super creative people who want to seamlessly switch between:
 * 🎮 GAME → 🎵 MUSIC → 🎨 ART → 🎨 DESIGN → 📚 RESEARCH
 *
 * All connected through the Codex 144:99 with Tesseract Bridge
 *
 * @package @cathedral/tesseract-bridge
 */
import { TesseractBridge } from './index';
export type CreativeMode = 'game' | 'music' | 'art' | 'design' | 'research' | 'fusion' | 'flow';
export interface CreativeState {
    currentMode: CreativeMode;
    previousMode: CreativeMode | null;
    activeTools: string[];
    codexNodes: number[];
    arcanaCards: string[];
    frequency: number;
    colorPalette: string[];
    sacredGeometry: string;
    flowState: FlowState;
    inspiration: InspirationSource[];
}
export interface FlowState {
    inFlow: boolean;
    flowDuration: number;
    flowIntensity: number;
    transitions: number;
    creativityScore: number;
}
export interface InspirationSource {
    type: 'codex' | 'arcana' | 'music' | 'art' | 'nature' | 'research';
    id: string;
    name: string;
    contribution: number;
}
export interface CreativeTransition {
    from: CreativeMode;
    to: CreativeMode;
    preserveContext: boolean;
    transitionEffect: 'fade' | 'morph' | 'instant' | 'harmonic';
    codexMapping: number[];
}
export interface GameTool {
    name: string;
    type: 'exploration' | 'combat' | 'dialogue' | 'puzzle' | 'creation';
    codexConnection: number;
    arcanaCard?: string;
}
export interface MusicTool {
    name: string;
    type: 'synth' | 'sampler' | 'effects' | 'sequencer' | 'mixer';
    frequency: number;
    waveform: 'sine' | 'square' | 'sawtooth' | 'triangle' | 'custom';
    codexConnection: number;
}
export interface ArtTool {
    name: string;
    type: 'brush' | 'shape' | 'pattern' | 'geometry' | 'fractal' | 'filter';
    palette: string[];
    sacredGeometry?: string;
    codexConnection: number;
}
export interface DesignTool {
    name: string;
    type: 'layout' | 'typography' | 'color' | 'spacing' | 'component';
    principles: string[];
    codexConnection: number;
}
export interface ResearchTool {
    name: string;
    type: 'browse' | 'annotate' | 'connect' | 'visualize' | 'export';
    sources: string[];
    codexConnection: number;
}
/**
 * Maps Codex 144:99 nodes to creative modes and tools
 */
export declare const CODEX_CREATIVE_MAP: Record<number, {
    element: string;
    primaryMode: CreativeMode;
    secondaryModes: CreativeMode[];
    tools: string[];
    frequency: number;
    color: string;
    geometry: string;
}>;
/**
 * Creative Flow Bridge
 *
 * Enables seamless switching between creative modes while maintaining
 * context and inspiration through the Codex 144:99
 */
export declare class CreativeFlowBridge {
    private tesseractBridge;
    private state;
    private listeners;
    private autoFlowEnabled;
    private flowTimer;
    constructor(tesseractBridge?: TesseractBridge);
    /**
     * Create initial creative state
     */
    private createInitialState;
    /**
     * Register creative endpoints with tesseract bridge
     */
    private registerCreativeEndpoints;
    /**
     * Switch creative mode with full context preservation
     */
    switchMode(newMode: CreativeMode, options?: {
        preserveContext?: boolean;
        transitionEffect?: 'fade' | 'morph' | 'instant' | 'harmonic';
        codexNodes?: number[];
    }): Promise<CreativeState>;
    /**
     * Quick switch shortcuts for creative people
     */
    toGame(codexNodes?: number[]): Promise<CreativeState>;
    toMusic(codexNodes?: number[]): Promise<CreativeState>;
    toArt(codexNodes?: number[]): Promise<CreativeState>;
    toDesign(codexNodes?: number[]): Promise<CreativeState>;
    toResearch(codexNodes?: number[]): Promise<CreativeState>;
    toFusion(codexNodes?: number[]): Promise<CreativeState>;
    /**
     * Get tools recommended for a mode based on Codex nodes
     */
    private getToolsForMode;
    /**
     * Calculate frequency for mode based on Codex nodes
     */
    private calculateModeFrequency;
    /**
     * Get color palette for mode based on Codex nodes
     */
    private getPaletteForMode;
    /**
     * Get sacred geometry for mode
     */
    private getGeometryForMode;
    /**
     * Enable automatic mode switching based on activity
     */
    enableAutoFlow(intervalMs?: number): void;
    /**
     * Disable auto-flow mode
     */
    disableAutoFlow(): void;
    /**
     * Analyze current activity and suggest optimal mode
     */
    private analyzeAndSuggestMode;
    /**
     * Calculate current flow intensity
     */
    private calculateFlowIntensity;
    /**
     * Get suggested mode based on current state
     */
    private getSuggestedMode;
    /**
     * Save current context before switching
     */
    private saveCurrentContext;
    /**
     * Restore context from previous mode
     */
    restoreContext(mode: CreativeMode): Promise<CreativeState>;
    /**
     * Emit creative event through tesseract bridge
     */
    private emitCreativeEvent;
    /**
     * Subscribe to creative state changes
     */
    onStateChange(callback: (state: CreativeState) => void): () => void;
    /**
     * Subscribe to mode changes
     */
    onModeChange(mode: CreativeMode, callback: (state: CreativeState) => void): () => void;
    /**
     * Notify all listeners
     */
    private notifyListeners;
    /**
     * Get current creative state
     */
    getState(): CreativeState;
    /**
     * Get current mode
     */
    getCurrentMode(): CreativeMode;
    /**
     * Get active tools
     */
    getActiveTools(): string[];
    /**
     * Get current frequency
     */
    getCurrentFrequency(): number;
    /**
     * Get current color palette
     */
    getCurrentPalette(): string[];
    /**
     * Get current sacred geometry
     */
    getCurrentGeometry(): string;
    /**
     * Add Codex node to current session
     */
    addCodexNode(nodeId: number): void;
    /**
     * Add Arcana card to current session
     */
    addArcanaCard(cardId: string): void;
    /**
     * Get inspiration sources for current state
     */
    getInspiration(): InspirationSource[];
    /**
     * Get mode-specific recommendations
     */
    getRecommendations(): {
        tools: string[];
        codexNodes: number[];
        frequency: number;
        geometry: string;
    };
}
export declare const creativeFlowBridge: CreativeFlowBridge;
export default CreativeFlowBridge;
//# sourceMappingURL=creative-flow-bridge.d.ts.map