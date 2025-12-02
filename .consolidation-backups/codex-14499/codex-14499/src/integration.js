// Codex 144:99 Integration System
// Connects all Trinity apps through the complete lattice

class Codex14499Bridge {
    constructor() {
        this.apps = new Map();
        this.activeConnections = new Set();
        this.initializeConnections();
    }

    // Register all Trinity apps
    initializeConnections() {
        const trinityApps = [
            { name: 'circuitum99', role: 'soul', path: '../circuitum99/' },
            { name: 'stone-grimoire', role: 'body', path: '../stone-grimoire/' },
            { name: 'cosmogenesis-learning-engine', role: 'spirit', path: '../cosmogenesis-learning-engine/' },
            { name: 'holographic-interface', role: 'interface', path: '../holographic-interface/' },
            { name: 'tesseract-bridge', role: 'bridge', path: '../tesseract-bridge/' },
            { name: 'liber-arcanae', role: 'rpg', path: '../liber-arcanae/' },
            { name: 'gentle-fusion-lab', role: 'healing', path: '../gentle-fusion-lab/' },
            { name: 'magical-mystery-house', role: 'exploration', path: '../magical-mystery-house/' }
        ];

        trinityApps.forEach(app => {
            this.apps.set(app.name, app);
        });

        console.log('🏛️ Codex 144:99 Bridge Initialized');
        console.log(`✅ Connected to ${this.apps.size} Trinity applications`);
    }

    // Create portal to specific app
    createPortal(appName) {
        const app = this.apps.get(appName);
        if (!app) {
            console.warn(`⚠️ App ${appName} not found in Trinity system`);
            return null;
        }

        this.activeConnections.add(appName);
        console.log(`🔮 Portal opened to ${app.role}: ${appName}`);
        
        // Return portal configuration
        return {
            name: app.name,
            role: app.role,
            path: app.path,
            isActive: true,
            timestamp: Date.now()
        };
    }

    // Get all active connections
    getActiveConnections() {
        return Array.from(this.activeConnections).map(name => ({
            ...this.apps.get(name),
            status: 'connected'
        }));
    }

    // Navigate to app
    navigateToApp(appName) {
        const portal = this.createPortal(appName);
        if (portal) {
            window.location.href = portal.path;
        }
    }

    // Send data between apps
    sendToApp(appName, data) {
        const portal = this.createPortal(appName);
        if (portal) {
            // Store data for cross-app communication
            sessionStorage.setItem(`codex-14499-${appName}`, JSON.stringify({
                data,
                timestamp: Date.now(),
                source: 'codex-14499'
            }));
            console.log(`📡 Data sent to ${appName}:`, data);
        }
    }

    // Receive data from other apps
    receiveFromApp(appName) {
        const storedData = sessionStorage.getItem(`${appName}-codex-14499`);
        if (storedData) {
            const parsed = JSON.parse(storedData);
            console.log(`📡 Data received from ${appName}:`, parsed.data);
            return parsed.data;
        }
        return null;
    }

    // Get Trinity status
    getTrinityStatus() {
        return {
            lattice: 'codex-14499',
            totalApps: this.apps.size,
            activeConnections: this.activeConnections.size,
            apps: Array.from(this.apps.values()),
            timestamp: Date.now()
        };
    }
}

// Initialize global bridge
window.Codex14499Bridge = new Codex14499Bridge();

// Export for module use
export default Codex14499Bridge;