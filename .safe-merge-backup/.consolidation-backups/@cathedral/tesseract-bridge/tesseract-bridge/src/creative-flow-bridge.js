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
// ============================================
// CODEX 144:99 CREATIVE MAPPINGS
// ============================================
/**
 * Maps Codex 144:99 nodes to creative modes and tools
 */
export const CODEX_CREATIVE_MAP = {
    // Fire nodes (1-12) - Game/Action
    1: { element: 'Fire', primaryMode: 'game', secondaryModes: ['music', 'art'], tools: ['combat', 'synth-fire', 'flame-brush'], frequency: 396, color: '#FF4444', geometry: 'tetrahedron' },
    2: { element: 'Fire', primaryMode: 'game', secondaryModes: ['design'], tools: ['exploration', 'heat-mapper'], frequency: 417, color: '#FF6644', geometry: 'pyramid' },
    3: { element: 'Fire', primaryMode: 'music', secondaryModes: ['game'], tools: ['bass-synth', 'rhythm'], frequency: 528, color: '#FF8844', geometry: 'star' },
    // Water nodes (13-24) - Music/Flow
    13: { element: 'Water', primaryMode: 'music', secondaryModes: ['art', 'design'], tools: ['pad-synth', 'flow-brush', 'wave-layout'], frequency: 639, color: '#4488FF', geometry: 'icosahedron' },
    14: { element: 'Water', primaryMode: 'music', secondaryModes: ['research'], tools: ['ambient-synth', 'notation'], frequency: 741, color: '#4466FF', geometry: 'wave' },
    15: { element: 'Water', primaryMode: 'art', secondaryModes: ['music'], tools: ['watercolor', 'gradient'], frequency: 852, color: '#4444FF', geometry: 'spiral' },
    // Earth nodes (25-36) - Design/Structure
    25: { element: 'Earth', primaryMode: 'design', secondaryModes: ['art', 'research'], tools: ['grid-layout', 'structure-brush', 'foundation'], frequency: 174, color: '#44AA44', geometry: 'cube' },
    26: { element: 'Earth', primaryMode: 'design', secondaryModes: ['game'], tools: ['typography', 'solid-shapes'], frequency: 285, color: '#66AA44', geometry: 'hexahedron' },
    27: { element: 'Earth', primaryMode: 'research', secondaryModes: ['design'], tools: ['documentation', 'archive'], frequency: 396, color: '#88AA44', geometry: 'crystal' },
    // Air nodes (37-48) - Research/Ideas
    37: { element: 'Air', primaryMode: 'research', secondaryModes: ['music', 'art'], tools: ['mind-map', 'idea-flow', 'concept-art'], frequency: 417, color: '#AAAAFF', geometry: 'octahedron' },
    38: { element: 'Air', primaryMode: 'research', secondaryModes: ['design'], tools: ['connection-map', 'wireframe'], frequency: 528, color: '#CCCCFF', geometry: 'dodecahedron' },
    39: { element: 'Air', primaryMode: 'art', secondaryModes: ['research'], tools: ['ethereal-brush', 'light-patterns'], frequency: 639, color: '#EEEEFF', geometry: 'merkaba' },
    // Spirit nodes (49-60) - Fusion/All
    49: { element: 'Spirit', primaryMode: 'fusion', secondaryModes: ['game', 'music', 'art', 'design', 'research'], tools: ['all'], frequency: 963, color: '#FFD700', geometry: 'metatron' },
    50: { element: 'Spirit', primaryMode: 'fusion', secondaryModes: ['game', 'music', 'art', 'design', 'research'], tools: ['transmutation'], frequency: 111, color: '#FFFFFF', geometry: 'flower-of-life' },
    // Continue mapping for all 144 nodes...
    // Each node connects to specific creative modes and tools
};
// Fill in remaining nodes with algorithm
for (let i = 1; i <= 144; i++) {
    if (!CODEX_CREATIVE_MAP[i]) {
        const element = ['Fire', 'Water', 'Earth', 'Air', 'Spirit'][(i - 1) % 5];
        const primaryModes = ['game', 'music', 'art', 'design', 'research'];
        const primaryMode = primaryModes[(i - 1) % 5];
        const frequency = 174 + ((i - 1) * 6) % 789; // Solfeggio-based
        CODEX_CREATIVE_MAP[i] = {
            element,
            primaryMode,
            secondaryModes: primaryModes.filter(m => m !== primaryMode).slice(0, 2),
            tools: [`tool-${i}`],
            frequency,
            color: `hsl(${(i * 2.5) % 360}, 70%, 50%)`,
            geometry: ['tetrahedron', 'cube', 'octahedron', 'icosahedron', 'dodecahedron'][(i - 1) % 5]
        };
    }
}
// ============================================
// CREATIVE FLOW BRIDGE CLASS
// ============================================
/**
 * Creative Flow Bridge
 *
 * Enables seamless switching between creative modes while maintaining
 * context and inspiration through the Codex 144:99
 */
export class CreativeFlowBridge {
    tesseractBridge;
    state;
    listeners = new Map();
    autoFlowEnabled = false;
    flowTimer = null;
    constructor(tesseractBridge) {
        this.tesseractBridge = tesseractBridge || new TesseractBridge();
        this.state = this.createInitialState();
        this.registerCreativeEndpoints();
    }
    /**
     * Create initial creative state
     */
    createInitialState() {
        return {
            currentMode: 'flow',
            previousMode: null,
            activeTools: [],
            codexNodes: [],
            arcanaCards: [],
            frequency: 432, // Natural frequency
            colorPalette: ['#FFD700', '#4169E1', '#228B22', '#DC143C', '#9932CC'],
            sacredGeometry: 'flower-of-life',
            flowState: {
                inFlow: false,
                flowDuration: 0,
                flowIntensity: 0,
                transitions: 0,
                creativityScore: 0
            },
            inspiration: []
        };
    }
    /**
     * Register creative endpoints with tesseract bridge
     */
    registerCreativeEndpoints() {
        const creativeEndpoints = [
            {
                name: 'game-engine',
                url: '/packages/game-engine',
                protocol: { type: 'state-management', version: '1.0.0', encryption: true, compression: true },
                security: { type: 'protection-seal', enabled: true },
                status: 'active'
            },
            {
                name: 'synth-lab',
                url: '/apps/synth-lab',
                protocol: { type: 'event-bridge', version: '1.0.0', encryption: true, compression: false },
                security: { type: 'protection-seal', enabled: true },
                status: 'active'
            },
            {
                name: 'art-generation',
                url: '/packages/art-generation-node',
                protocol: { type: 'data-sync', version: '1.0.0', encryption: true, compression: true },
                security: { type: 'provenance-tracking', enabled: true },
                status: 'active'
            },
            {
                name: 'design-library',
                url: '/packages/cathedral-design-library',
                protocol: { type: 'state-management', version: '1.0.0', encryption: true, compression: true },
                security: { type: 'protection-seal', enabled: true },
                status: 'active'
            },
            {
                name: 'research-codex',
                url: '/packages/codex-144-99',
                protocol: { type: 'data-sync', version: '1.0.0', encryption: true, compression: true },
                security: { type: 'immutable-schema', enabled: true },
                status: 'active'
            }
        ];
        creativeEndpoints.forEach(endpoint => {
            this.tesseractBridge.registerEndpoint(endpoint);
        });
    }
    // ============================================
    // MODE SWITCHING
    // ============================================
    /**
     * Switch creative mode with full context preservation
     */
    async switchMode(newMode, options = {}) {
        const { preserveContext = true, transitionEffect = 'harmonic', codexNodes = [] } = options;
        // Emit transition event
        this.emitCreativeEvent('mode-transition-start', {
            from: this.state.currentMode,
            to: newMode,
            preserveContext
        });
        // Save current context if preserving
        if (preserveContext) {
            await this.saveCurrentContext();
        }
        // Get recommended tools for new mode
        const recommendedTools = this.getToolsForMode(newMode, codexNodes);
        // Calculate new frequency based on mode and nodes
        const newFrequency = this.calculateModeFrequency(newMode, codexNodes);
        // Get color palette for mode
        const newPalette = this.getPaletteForMode(newMode, codexNodes);
        // Get sacred geometry for mode
        const newGeometry = this.getGeometryForMode(newMode, codexNodes);
        // Update state
        this.state = {
            ...this.state,
            previousMode: this.state.currentMode,
            currentMode: newMode,
            activeTools: recommendedTools,
            codexNodes: codexNodes.length > 0 ? codexNodes : this.state.codexNodes,
            frequency: newFrequency,
            colorPalette: newPalette,
            sacredGeometry: newGeometry,
            flowState: {
                ...this.state.flowState,
                transitions: this.state.flowState.transitions + 1,
                inFlow: true
            }
        };
        // Emit transition complete event
        this.emitCreativeEvent('mode-transition-complete', {
            mode: newMode,
            tools: recommendedTools,
            frequency: newFrequency
        });
        // Notify listeners
        this.notifyListeners();
        return this.state;
    }
    /**
     * Quick switch shortcuts for creative people
     */
    async toGame(codexNodes) {
        return this.switchMode('game', { codexNodes });
    }
    async toMusic(codexNodes) {
        return this.switchMode('music', { codexNodes });
    }
    async toArt(codexNodes) {
        return this.switchMode('art', { codexNodes });
    }
    async toDesign(codexNodes) {
        return this.switchMode('design', { codexNodes });
    }
    async toResearch(codexNodes) {
        return this.switchMode('research', { codexNodes });
    }
    async toFusion(codexNodes) {
        return this.switchMode('fusion', { codexNodes });
    }
    // ============================================
    // CODEX INTEGRATION
    // ============================================
    /**
     * Get tools recommended for a mode based on Codex nodes
     */
    getToolsForMode(mode, codexNodes) {
        const tools = [];
        // Get tools from specified nodes
        codexNodes.forEach(nodeId => {
            const nodeMap = CODEX_CREATIVE_MAP[nodeId];
            if (nodeMap && (nodeMap.primaryMode === mode || nodeMap.secondaryModes.includes(mode))) {
                tools.push(...nodeMap.tools);
            }
        });
        // If no specific nodes, get default tools for mode
        if (tools.length === 0) {
            switch (mode) {
                case 'game':
                    tools.push('exploration', 'combat', 'dialogue', 'puzzle');
                    break;
                case 'music':
                    tools.push('synth-pad', 'sequencer', 'effects', 'mixer');
                    break;
                case 'art':
                    tools.push('brush', 'geometry', 'pattern', 'fractal');
                    break;
                case 'design':
                    tools.push('layout', 'typography', 'color', 'spacing');
                    break;
                case 'research':
                    tools.push('browser', 'annotator', 'connector', 'visualizer');
                    break;
                case 'fusion':
                    tools.push('transmutation', 'alchemizer', 'synthesizer', 'harmonizer');
                    break;
                case 'flow':
                    tools.push('auto-suggest', 'context-aware', 'adaptive');
                    break;
            }
        }
        return [...new Set(tools)];
    }
    /**
     * Calculate frequency for mode based on Codex nodes
     */
    calculateModeFrequency(mode, codexNodes) {
        if (codexNodes.length > 0) {
            const frequencies = codexNodes
                .map(id => CODEX_CREATIVE_MAP[id]?.frequency || 432)
                .filter(f => f > 0);
            return frequencies.reduce((a, b) => a + b, 0) / frequencies.length;
        }
        // Default frequencies for each mode
        const modeFrequencies = {
            game: 396, // Liberation frequency
            music: 528, // Love/DNA repair frequency
            art: 639, // Connection frequency
            design: 741, // Intuition frequency
            research: 852, // Spiritual order frequency
            fusion: 963, // Awakening frequency
            flow: 432 // Natural/Cosmic frequency
        };
        return modeFrequencies[mode];
    }
    /**
     * Get color palette for mode based on Codex nodes
     */
    getPaletteForMode(mode, codexNodes) {
        if (codexNodes.length > 0) {
            return codexNodes
                .map(id => CODEX_CREATIVE_MAP[id]?.color || '#888888')
                .slice(0, 5);
        }
        const modePalettes = {
            game: ['#FF4444', '#44FF44', '#4444FF', '#FFFF44', '#FF44FF'],
            music: ['#4169E1', '#9370DB', '#00CED1', '#FFB6C1', '#98FB98'],
            art: ['#FFD700', '#FF6347', '#32CD32', '#4169E1', '#9932CC'],
            design: ['#2C3E50', '#ECF0F1', '#3498DB', '#E74C3C', '#2ECC71'],
            research: ['#34495E', '#95A5A6', '#1ABC9C', '#F39C12', '#9B59B6'],
            fusion: ['#FFD700', '#C0C0C0', '#CD7F32', '#E5E4E2', '#B87333'],
            flow: ['#FFFFFF', '#F0F0F0', '#E0E0E0', '#D0D0D0', '#C0C0C0']
        };
        return modePalettes[mode];
    }
    /**
     * Get sacred geometry for mode
     */
    getGeometryForMode(mode, codexNodes) {
        if (codexNodes.length > 0 && CODEX_CREATIVE_MAP[codexNodes[0]]) {
            return CODEX_CREATIVE_MAP[codexNodes[0]].geometry;
        }
        const modeGeometries = {
            game: 'tetrahedron',
            music: 'wave',
            art: 'flower-of-life',
            design: 'golden-ratio',
            research: 'merkaba',
            fusion: 'metatron',
            flow: 'torus'
        };
        return modeGeometries[mode];
    }
    // ============================================
    // AUTO-FLOW MODE
    // ============================================
    /**
     * Enable automatic mode switching based on activity
     */
    enableAutoFlow(intervalMs = 30000) {
        this.autoFlowEnabled = true;
        this.flowTimer = setInterval(() => {
            this.analyzeAndSuggestMode();
        }, intervalMs);
    }
    /**
     * Disable auto-flow mode
     */
    disableAutoFlow() {
        this.autoFlowEnabled = false;
        if (this.flowTimer) {
            clearInterval(this.flowTimer);
            this.flowTimer = null;
        }
    }
    /**
     * Analyze current activity and suggest optimal mode
     */
    analyzeAndSuggestMode() {
        // Analyze flow state and suggest transitions
        const flowIntensity = this.calculateFlowIntensity();
        if (flowIntensity < 3) {
            // Low flow - suggest mode change
            const suggestedMode = this.getSuggestedMode();
            this.emitCreativeEvent('mode-suggestion', {
                currentMode: this.state.currentMode,
                suggestedMode,
                flowIntensity,
                reason: 'Flow intensity low, consider switching modes'
            });
        }
    }
    /**
     * Calculate current flow intensity
     */
    calculateFlowIntensity() {
        const timeFactor = Math.min(this.state.flowState.flowDuration / 3600, 1); // Max at 1 hour
        const transitionFactor = Math.max(0, 1 - (this.state.flowState.transitions / 10));
        const toolsFactor = Math.min(this.state.activeTools.length / 5, 1);
        return (timeFactor * 3 + transitionFactor * 3 + toolsFactor * 4);
    }
    /**
     * Get suggested mode based on current state
     */
    getSuggestedMode() {
        const modes = ['game', 'music', 'art', 'design', 'research'];
        const currentIndex = modes.indexOf(this.state.currentMode);
        // Suggest next mode in cycle, or random if in fusion/flow
        if (currentIndex >= 0) {
            return modes[(currentIndex + 1) % modes.length];
        }
        return modes[Math.floor(Math.random() * modes.length)];
    }
    // ============================================
    // CONTEXT MANAGEMENT
    // ============================================
    /**
     * Save current context before switching
     */
    async saveCurrentContext() {
        const contextKey = `creative-context-${this.state.currentMode}`;
        const context = {
            mode: this.state.currentMode,
            tools: this.state.activeTools,
            codexNodes: this.state.codexNodes,
            timestamp: Date.now()
        };
        // Save to tesseract bridge
        this.emitCreativeEvent('context-saved', context);
    }
    /**
     * Restore context from previous mode
     */
    async restoreContext(mode) {
        // Emit restore event
        this.emitCreativeEvent('context-restore-request', { mode });
        // Switch to mode with preserved context
        return this.switchMode(mode, { preserveContext: true });
    }
    // ============================================
    // EVENT SYSTEM
    // ============================================
    /**
     * Emit creative event through tesseract bridge
     */
    emitCreativeEvent(type, data) {
        const event = {
            id: `creative-${type}-${Date.now()}`,
            type: `creative:${type}`,
            source: 'creative-flow-bridge',
            data,
            timestamp: Date.now(),
            propagation: []
        };
        this.tesseractBridge.emitEvent(event);
    }
    /**
     * Subscribe to creative state changes
     */
    onStateChange(callback) {
        const key = 'state-change';
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key).add(callback);
        return () => {
            this.listeners.get(key)?.delete(callback);
        };
    }
    /**
     * Subscribe to mode changes
     */
    onModeChange(mode, callback) {
        const key = `mode-${mode}`;
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key).add(callback);
        return () => {
            this.listeners.get(key)?.delete(callback);
        };
    }
    /**
     * Notify all listeners
     */
    notifyListeners() {
        // Notify state change listeners
        this.listeners.get('state-change')?.forEach(cb => cb(this.state));
        // Notify mode-specific listeners
        this.listeners.get(`mode-${this.state.currentMode}`)?.forEach(cb => cb(this.state));
    }
    // ============================================
    // PUBLIC API
    // ============================================
    /**
     * Get current creative state
     */
    getState() {
        return { ...this.state };
    }
    /**
     * Get current mode
     */
    getCurrentMode() {
        return this.state.currentMode;
    }
    /**
     * Get active tools
     */
    getActiveTools() {
        return [...this.state.activeTools];
    }
    /**
     * Get current frequency
     */
    getCurrentFrequency() {
        return this.state.frequency;
    }
    /**
     * Get current color palette
     */
    getCurrentPalette() {
        return [...this.state.colorPalette];
    }
    /**
     * Get current sacred geometry
     */
    getCurrentGeometry() {
        return this.state.sacredGeometry;
    }
    /**
     * Add Codex node to current session
     */
    addCodexNode(nodeId) {
        if (!this.state.codexNodes.includes(nodeId)) {
            this.state.codexNodes.push(nodeId);
            this.notifyListeners();
        }
    }
    /**
     * Add Arcana card to current session
     */
    addArcanaCard(cardId) {
        if (!this.state.arcanaCards.includes(cardId)) {
            this.state.arcanaCards.push(cardId);
            this.notifyListeners();
        }
    }
    /**
     * Get inspiration sources for current state
     */
    getInspiration() {
        const inspiration = [];
        // Add Codex-based inspiration
        this.state.codexNodes.forEach(nodeId => {
            const nodeMap = CODEX_CREATIVE_MAP[nodeId];
            if (nodeMap) {
                inspiration.push({
                    type: 'codex',
                    id: `node-${nodeId}`,
                    name: `${nodeMap.element} Node ${nodeId}`,
                    contribution: 1 / this.state.codexNodes.length
                });
            }
        });
        return inspiration;
    }
    /**
     * Get mode-specific recommendations
     */
    getRecommendations() {
        const mode = this.state.currentMode;
        const recommendedNodes = [];
        // Find nodes that match current mode
        Object.entries(CODEX_CREATIVE_MAP).forEach(([id, map]) => {
            if (map.primaryMode === mode) {
                recommendedNodes.push(parseInt(id));
            }
        });
        return {
            tools: this.getToolsForMode(mode, recommendedNodes.slice(0, 5)),
            codexNodes: recommendedNodes.slice(0, 10),
            frequency: this.calculateModeFrequency(mode, recommendedNodes),
            geometry: this.getGeometryForMode(mode, recommendedNodes)
        };
    }
}
// ============================================
// SINGLETON INSTANCE
// ============================================
export const creativeFlowBridge = new CreativeFlowBridge();
export default CreativeFlowBridge;
//# sourceMappingURL=creative-flow-bridge.js.map