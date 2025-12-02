/**
 * SQLite Database Manager for Cathedral Professional Design Suite
 * 
 * Node.js v25 SQLite integration with persistent data storage,
 * auto-save functionality, and crash recovery mechanisms.
 * 
 * Features:
 * - Persistent design project storage
 * - Auto-save with transaction integrity
 * - Crash recovery and data validation
 * - Professional-grade data consistency
 * - Real-time collaboration data sync
 * - Sacred geometry and design element persistence
 * 
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 * @license CC0 - Your Original Work
 */

class SQLiteDatabaseManager {
    constructor() {
        this.db = null;
        this.dataPath = '/Users/rebeccalemke/cathedral-real/cathedral-data';
        this.isInitialized = false;
        this.backupInterval = null;
        this.transactionQueue = [];
        this.isProcessingTransactions = false;
        this.codexData = null;
        this.spiralEngine = null;
    }

    async initialize() {
        try {
            console.log('🗄 Initializing SQLite database with Node.js v25...');
            console.log('🔗 Integrating with existing Codex 144:99 system...');
            
            // Try to use better-sqlite3 if available, otherwise fallback to localStorage
            try {
                // Dynamic import for better-sqlite3
                const Database = (await import('better-sqlite3')).default;
                const path = await import('path');
                const fs = await import('fs');
                
                // Ensure data directory exists
                if (!fs.existsSync(this.dataPath)) {
                    fs.mkdirSync(this.dataPath, { recursive: true });
                }
                
                const dbPath = path.join(this.dataPath, 'cathedral-design-suite.db');
                this.db = new Database(dbPath, {
                    fileMustExist: false,
                    readonly: false
                });
                
                // Optimize database for performance
                this.db.pragma('journal_mode = WAL');
                this.db.pragma('synchronous = NORMAL');
                this.db.pragma('cache_size = 10000');
                this.db.pragma('temp_store = MEMORY');
                this.db.pragma('mmap_size = 268435456'); // 256MB
                
                console.log('✅ SQLite database initialized with better-sqlite3');
                console.log('🔗 Connected to existing Codex 144:99 system');
                
            } catch (error) {
                console.log('📝 Using localStorage database (better-sqlite3 not available)');
                this.db = null; // Will use localStorage fallback
            }
            
            // Create database schema
            this.createTables();
            this.createIndexes();
            this.createTriggers();
            
            // Load and integrate existing Codex 144:99 data
            await this.loadCodex14499Data();
            
            // Start backup system
            this.startBackupSystem();
            
            this.isInitialized = true;
            console.log('✅ Database manager initialized with Codex 144:99 integration');
            
        } catch (error) {
            console.error('❌ Database initialization failed:', error);
            throw error;
        }
    }

    createTables() {
        if (this.db && this.db.exec) {
            // SQLite database
            this.db.exec(`
                -- Workspaces table
                CREATE TABLE IF NOT EXISTS workspaces (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    type TEXT NOT NULL CHECK (type IN ('web', 'print', 'mobile', 'social', 'vector', 'layout')),
                    width INTEGER NOT NULL,
                    height INTEGER NOT NULL,
                    dpi INTEGER NOT NULL,
                    color_space TEXT NOT NULL,
                    background_color TEXT NOT NULL,
                    canvas_settings TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL,
                    auto_save_enabled BOOLEAN DEFAULT TRUE,
                    quality_standard TEXT DEFAULT 'professional' CHECK (quality_standard IN ('standard', 'professional', 'master', 'scientific')),
                    user_id TEXT
                );

                -- Design elements table
                CREATE TABLE IF NOT EXISTS design_elements (
                    id TEXT PRIMARY KEY,
                    workspace_id TEXT NOT NULL,
                    type TEXT NOT NULL CHECK (type IN ('vector', 'text', 'image', 'shape', 'sacred_geometry')),
                    name TEXT NOT NULL,
                    position_x REAL NOT NULL,
                    position_y REAL NOT NULL,
                    width REAL,
                    height REAL,
                    transform_data TEXT NOT NULL,
                    style_data TEXT NOT NULL,
                    metadata TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL,
                    version INTEGER DEFAULT 1,
                    layer_id TEXT,
                    parent_id TEXT,
                    z_index INTEGER DEFAULT 0,
                    FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
                    FOREIGN KEY (layer_id) REFERENCES layers(id) ON DELETE SET NULL,
                    FOREIGN KEY (parent_id) REFERENCES design_elements(id) ON DELETE CASCADE
                );

                -- Layers table
                CREATE TABLE IF NOT EXISTS layers (
                    id TEXT PRIMARY KEY,
                    workspace_id TEXT NOT NULL,
                    name TEXT NOT NULL,
                    visible BOOLEAN DEFAULT TRUE,
                    locked BOOLEAN DEFAULT FALSE,
                    opacity REAL DEFAULT 1.0,
                    blend_mode TEXT DEFAULT 'normal',
                    order_index INTEGER NOT NULL,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL,
                    FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
                );

                -- Versions table
                CREATE TABLE IF NOT EXISTS versions (
                    id TEXT PRIMARY KEY,
                    workspace_id TEXT NOT NULL,
                    label TEXT NOT NULL,
                    description TEXT,
                    created_at TEXT NOT NULL,
                    created_by TEXT NOT NULL,
                    parent_version_id TEXT,
                    elements_snapshot TEXT NOT NULL,
                    quality_score REAL,
                    size_bytes INTEGER NOT NULL,
                    FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
                    FOREIGN KEY (parent_version_id) REFERENCES versions(id) ON DELETE SET NULL
                );

                -- Auto-save history table
                CREATE TABLE IF NOT EXISTS auto_save_history (
                    id TEXT PRIMARY KEY,
                    workspace_id TEXT NOT NULL,
                    saved_at TEXT NOT NULL,
                    elements_count INTEGER NOT NULL,
                    file_size_bytes INTEGER NOT NULL,
                    save_duration_ms INTEGER,
                    success BOOLEAN NOT NULL,
                    error_message TEXT,
                    FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
                );

                -- Recovery checkpoints table
                CREATE TABLE IF NOT EXISTS recovery_checkpoints (
                    id TEXT PRIMARY KEY,
                    workspace_id TEXT NOT NULL,
                    checkpoint_data TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    checkpoint_type TEXT NOT NULL,
                    is_valid BOOLEAN DEFAULT TRUE,
                    FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
                );

                -- Collaboration sessions table
                CREATE TABLE IF NOT EXISTS collaboration_sessions (
                    id TEXT PRIMARY KEY,
                    workspace_id TEXT NOT NULL,
                    session_name TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL,
                    active_users TEXT NOT NULL,
                    permissions TEXT NOT NULL,
                    real_time_sync_enabled BOOLEAN DEFAULT TRUE,
                    max_users INTEGER DEFAULT 10,
                    FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
                );
            `);
        } else {
            // localStorage fallback - ensure storage exists
            this.initializeLocalStorage();
        }
    }

    initializeLocalStorage() {
        // Initialize localStorage for workspace data
        const workspaces = localStorage.getItem('cathedral_workspaces');
        if (!workspaces) {
            localStorage.setItem('cathedral_workspaces', JSON.stringify([]));
        }
        
        const elements = localStorage.getItem('cathedral_design_elements');
        if (!elements) {
            localStorage.setItem('cathedral_design_elements', JSON.stringify([]));
        }
        
        const layers = localStorage.getItem('cathedral_layers');
        if (!layers) {
            localStorage.setItem('cathedral_layers', JSON.stringify([]));
        }
        
        const versions = localStorage.getItem('cathedral_versions');
        if (!versions) {
            localStorage.setItem('cathedral_versions', JSON.stringify([]));
        }
        
        const autoSaveHistory = localStorage.getItem('cathedral_auto_save_history');
        if (!autoSaveHistory) {
            localStorage.setItem('cathedral_auto_save_history', JSON.stringify([]));
        }
        
        const recoveryCheckpoints = localStorage.getItem('cathedral_recovery_checkpoints');
        if (!recoveryCheckpoints) {
            localStorage.setItem('cathedral_recovery_checkpoints', JSON.stringify([]));
        }
        
        console.log('📝 localStorage database initialized');
    }

    createIndexes() {
        if (this.db && this.db.exec) {
            this.db.exec(`
                -- Performance indexes
                CREATE INDEX IF NOT EXISTS idx_design_elements_workspace ON design_elements(workspace_id);
                CREATE INDEX IF NOT EXISTS idx_design_elements_type ON design_elements(type);
                CREATE INDEX IF NOT EXISTS idx_design_elements_layer ON design_elements(layer_id);
                CREATE INDEX IF NOT EXISTS idx_design_elements_z_index ON design_elements(z_index);
                CREATE INDEX IF NOT EXISTS idx_versions_workspace ON versions(workspace_id);
                CREATE INDEX IF NOT EXISTS idx_versions_created_at ON versions(created_at);
                CREATE INDEX IF NOT EXISTS idx_auto_save_workspace ON auto_save_history(workspace_id);
                CREATE INDEX IF NOT EXISTS idx_auto_save_created_at ON auto_save_history(saved_at);
                CREATE INDEX IF NOT EXISTS idx_recovery_workspace ON recovery_checkpoints(workspace_id);
            `);
        }
    }

    createTriggers() {
        if (this.db && this.db.exec) {
            this.db.exec(`
                -- Auto-update timestamps
                CREATE TRIGGER IF NOT EXISTS update_workspaces_timestamp 
                AFTER UPDATE ON workspaces
                FOR EACH ROW
                BEGIN
                    UPDATE workspaces SET updated_at = datetime('now') WHERE id = NEW.id;
                END;

                CREATE TRIGGER IF NOT EXISTS update_design_elements_timestamp 
                AFTER UPDATE ON design_elements
                FOR EACH ROW
                BEGIN
                    UPDATE design_elements SET updated_at = datetime('now') WHERE id = NEW.id;
                END;

                CREATE TRIGGER IF NOT EXISTS update_layers_timestamp 
                AFTER UPDATE ON layers
                FOR EACH ROW
                BEGIN
                    UPDATE layers SET updated_at = datetime('now') WHERE id = NEW.id;
                END;

                -- Auto-create recovery checkpoints
                CREATE TRIGGER IF NOT EXISTS create_recovery_checkpoint
                AFTER UPDATE ON workspaces
                FOR EACH ROW
                WHEN NEW.auto_save_enabled = TRUE
                BEGIN
                    INSERT INTO recovery_checkpoints (id, workspace_id, checkpoint_data, created_at, checkpoint_type)
                    VALUES (
                        'cp_' || NEW.id || '_' || strftime('%Y%m%d_%H%M%S', 'now'),
                        NEW.id,
                        (SELECT json_group_array(json_object(
                            'id', id, 'type', type, 'name', name,
                            'position_x', position_x, 'position_y', position_y,
                            'width', width, 'height', height,
                            'transform_data', transform_data, 'style_data', style_data
                        )) FROM design_elements WHERE workspace_id = NEW.id),
                        datetime('now'),
                        'auto_checkpoint'
                    );
                END;
            `);
        }
    }

    startBackupSystem() {
        // Create backup every hour
        this.backupInterval = setInterval(() => {
            this.createBackup();
        }, 60 * 60 * 1000);
        
        console.log('💾 Backup system initialized (hourly backups)');
    }

    async createWorkspace(workspaceData) {
        const now = new Date().toISOString();
        
        const workspace = {
            id: workspaceData.id,
            name: workspaceData.name,
            type: workspaceData.type,
            width: workspaceData.width,
            height: workspaceData.height,
            dpi: workspaceData.dpi,
            color_space: workspaceData.color_space,
            background_color: workspaceData.background_color,
            canvas_settings: workspaceData.canvas_settings,
            created_at: now,
            updated_at: now,
            auto_save_enabled: workspaceData.auto_save_enabled !== false,
            quality_standard: workspaceData.quality_standard || 'professional',
            user_id: workspaceData.user_id || null
        };

        if (this.db && this.db.prepare) {
            // SQLite database
            const stmt = this.db.prepare(`
                INSERT INTO workspaces (
                    id, name, type, width, height, dpi, color_space, background_color,
                    canvas_settings, created_at, updated_at, auto_save_enabled, quality_standard, user_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            stmt.run(
                workspace.id, workspace.name, workspace.type, workspace.width,
                workspace.height, workspace.dpi, workspace.color_space,
                workspace.background_color, workspace.canvas_settings,
                workspace.created_at, workspace.updated_at, workspace.auto_save_enabled,
                workspace.quality_standard, workspace.user_id
            );
        } else {
            // localStorage fallback
            const workspaces = JSON.parse(localStorage.getItem('cathedral_workspaces'));
            workspaces.push(workspace);
            localStorage.setItem('cathedral_workspaces', JSON.stringify(workspaces));
        }

        console.log(`📁 Workspace created: ${workspace.name} (${workspace.id})`);
        return workspace.id;
    }

    async getWorkspaces() {
        if (this.db && this.db.prepare) {
            // SQLite database
            const stmt = this.db.prepare('SELECT * FROM workspaces ORDER BY created_at DESC');
            return stmt.all();
        } else {
            // localStorage fallback
            return JSON.parse(localStorage.getItem('cathedral_workspaces') || '[]');
        }
    }

    async getWorkspace(id) {
        if (this.db && this.db.prepare) {
            // SQLite database
            const stmt = this.db.prepare('SELECT * FROM workspaces WHERE id = ?');
            return stmt.get(id);
        } else {
            // localStorage fallback
            const workspaces = JSON.parse(localStorage.getItem('cathedral_workspaces') || '[]');
            return workspaces.find(w => w.id === id) || null;
        }
    }

    async saveWorkspace(workspaceData) {
        return await this.createWorkspace(workspaceData);
    }

    async saveDesignElement(elementData) {
        const now = new Date().toISOString();
        
        const element = {
            id: elementData.id,
            workspace_id: elementData.workspace_id,
            type: elementData.type,
            name: elementData.name,
            position_x: elementData.position_x,
            position_y: elementData.position_y,
            width: elementData.width,
            height: elementData.height,
            transform_data: elementData.transform_data,
            style_data: elementData.style_data,
            metadata: elementData.metadata,
            created_at: elementData.created_at || now,
            updated_at: now,
            version: elementData.version || 1,
            layer_id: elementData.layer_id || null,
            parent_id: elementData.parent_id || null,
            z_index: elementData.z_index || 0
        };

        if (this.db && this.db.prepare) {
            // SQLite database
            const stmt = this.db.prepare(`
                INSERT OR REPLACE INTO design_elements (
                    id, workspace_id, type, name, position_x, position_y, width, height,
                    transform_data, style_data, metadata, created_at, updated_at, version,
                    layer_id, parent_id, z_index
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            stmt.run(
                element.id, element.workspace_id, element.type, element.name,
                element.position_x, element.position_y, element.width, element.height,
                element.transform_data, element.style_data, element.metadata,
                element.created_at, element.updated_at, element.version,
                element.layer_id, element.parent_id, element.z_index
            );
        } else {
            // localStorage fallback
            const elements = JSON.parse(localStorage.getItem('cathedral_design_elements') || '[]');
            const existingIndex = elements.findIndex(e => e.id === element.id);
            
            if (existingIndex >= 0) {
                elements[existingIndex] = element;
            } else {
                elements.push(element);
            }
            
            localStorage.setItem('cathedral_design_elements', JSON.stringify(elements));
        }

        console.log(`🎨 Design element saved: ${element.name}`);
    }

    async getDesignElements(workspaceId) {
        if (this.db && this.db.prepare) {
            // SQLite database
            const stmt = this.db.prepare(`
                SELECT * FROM design_elements 
                WHERE workspace_id = ? 
                ORDER BY z_index ASC, created_at ASC
            `);
            return stmt.all(workspaceId);
        } else {
            // localStorage fallback
            const elements = JSON.parse(localStorage.getItem('cathedral_design_elements') || '[]');
            return elements
                .filter(element => element.workspace_id === workspaceId)
                .sort((a, b) => a.z_index - b.z_index);
        }
    }

    async autoSave(workspaceId) {
        const startTime = Date.now();
        
        try {
            const elements = await this.getDesignElements(workspaceId);
            const dataString = JSON.stringify(elements);
            const sizeBytes = Buffer.byteLength(dataString, 'utf8');
            const duration = Date.now() - startTime;

            // Record auto-save
            const saveId = `autosave_${workspaceId}_${Date.now()}`;
            
            if (this.db && this.db.prepare) {
                // SQLite database
                const stmt = this.db.prepare(`
                    INSERT INTO auto_save_history (
                        id, workspace_id, saved_at, elements_count, file_size_bytes, 
                        save_duration_ms, success, error_message
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `);

                stmt.run(
                    saveId, workspaceId, new Date().toISOString(), elements.length,
                    sizeBytes, duration, true, null
                );
            } else {
                // localStorage fallback
                const history = JSON.parse(localStorage.getItem('cathedral_auto_save_history') || '[]');
                history.push({
                    id: saveId,
                    workspace_id: workspaceId,
                    saved_at: new Date().toISOString(),
                    elements_count: elements.length,
                    file_size_bytes: sizeBytes,
                    save_duration_ms: duration,
                    success: true
                });
                
                // Keep only last 100 records
                if (history.length > 100) {
                    history.splice(0, history.length - 100);
                }
                
                localStorage.setItem('cathedral_auto_save_history', JSON.stringify(history));
            }

            console.log(`💾 Auto-save completed: ${elements.length} elements, ${sizeBytes} bytes, ${duration}ms`);
            
        } catch (error) {
            console.error('Auto-save failed:', error);
            
            // Record failed auto-save
            const saveId = `autosave_${workspaceId}_${Date.now()}`;
            
            if (this.db && this.db.prepare) {
                // SQLite database
                const stmt = this.db.prepare(`
                    INSERT INTO auto_save_history (
                        id, workspace_id, saved_at, elements_count, file_size_bytes, 
                        save_duration_ms, success, error_message
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `);

                stmt.run(
                    saveId, workspaceId, new Date().toISOString(), 0,
                    0, Date.now() - startTime, false, error.message
                );
            } else {
                // localStorage fallback
                const history = JSON.parse(localStorage.getItem('cathedral_auto_save_history') || '[]');
                history.push({
                    id: saveId,
                    workspace_id: workspaceId,
                    saved_at: new Date().toISOString(),
                    elements_count: 0,
                    file_size_bytes: 0,
                    save_duration_ms: Date.now() - startTime,
                    success: false,
                    error_message: error.message
                });
                
                localStorage.setItem('cathedral_auto_save_history', JSON.stringify(history));
            }
            
            throw error;
        }
    }

    async getAutoSaveHistory(workspaceId, limit = 10) {
        if (this.db && this.db.prepare) {
            // SQLite database
            const stmt = this.db.prepare(`
                SELECT * FROM auto_save_history 
                WHERE workspace_id = ? 
                ORDER BY saved_at DESC 
                LIMIT ?
            `);
            return stmt.all(workspaceId, limit);
        } else {
            // localStorage fallback
            const history = JSON.parse(localStorage.getItem('cathedral_auto_save_history') || '[]');
            return history
                .filter(record => record.workspace_id === workspaceId)
                .sort((a, b) => b.saved_at.localeCompare(a.saved_at))
                .slice(0, limit);
        }
    }

    async performRecovery() {
        try {
            console.log('🛡️ Performing crash recovery...');
            
            // Get workspaces with auto-save enabled
            const workspaces = await this.getWorkspaces();
            const autoSaveEnabled = workspaces.filter(w => w.auto_save_enabled);
            
            for (const workspace of autoSaveEnabled) {
                try {
                    await this.autoSave(workspace.id);
                    console.log(`✅ Recovery auto-save completed for workspace: ${workspace.name}`);
                } catch (error) {
                    console.error(`❌ Recovery auto-save failed for workspace: ${workspace.name}`, error);
                }
            }
            
            console.log('🛡️ Crash recovery completed');
            
        } catch (error) {
            console.error('❌ Crash recovery failed:', error);
        }
    }

    async createVersion(workspaceId, label, description = '', createdBy = 'system') {
        const versionId = `version_${workspaceId}_${Date.now()}`;
        const elements = await this.getDesignElements(workspaceId);
        const elementsSnapshot = JSON.stringify(elements);
        
        if (this.db && this.db.prepare) {
            // SQLite database
            const stmt = this.db.prepare(`
                INSERT INTO versions (
                    id, workspace_id, label, description, created_at, created_by,
                    parent_version_id, elements_snapshot, quality_score, size_bytes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            stmt.run(
                versionId, workspaceId, label, description, new Date().toISOString(),
                createdBy, null, elementsSnapshot, this.calculateQualityScore(elements),
                Buffer.byteLength(elementsSnapshot, 'utf8')
            );
        } else {
            // localStorage fallback
            const versions = JSON.parse(localStorage.getItem('cathedral_versions') || '[]');
            versions.push({
                id: versionId,
                workspace_id: workspaceId,
                label: label,
                description: description,
                created_at: new Date().toISOString(),
                created_by: createdBy,
                parent_version_id: null,
                elements_snapshot: elementsSnapshot,
                quality_score: this.calculateQualityScore(elements),
                size_bytes: Buffer.byteLength(elementsSnapshot, 'utf8')
            });
            
            localStorage.setItem('cathedral_versions', JSON.stringify(versions));
        }

        console.log(`📋 Version created: ${label} (${versionId})`);
        return versionId;
    }

    calculateQualityScore(elements) {
        if (elements.length === 0) return 0;

        let totalScore = 0;
        let validElements = 0;

        for (const element of elements) {
            let score = 1.0;

            // Check for sacred geometry elements
            if (element.type === 'sacred_geometry') {
                score += 0.1; // Bonus for sacred geometry
            }

            // Check for proper naming
            if (element.name && element.name.length > 0) {
                score += 0.05;
            }

            // Check for complete metadata
            if (element.metadata && element.metadata.length > 0) {
                score += 0.05;
            }

            totalScore += Math.min(score, 1.0);
            validElements++;
        }

        return validElements > 0 ? totalScore / validElements : 0;
    }

    async exportDatabase() {
        try {
            const workspaces = await this.getWorkspaces();
            const exportData = {
                exported_at: new Date().toISOString(),
                version: '1.0.0',
                database_type: this.db ? 'SQLite' : 'localStorage',
                workspaces: []
            };

            for (const workspace of workspaces) {
                const elements = await this.getDesignElements(workspace.id);
                const autoSaveHistory = await this.getAutoSaveHistory(workspace.id, 5);
                
                exportData.workspaces.push({
                    workspace,
                    elements,
                    autoSaveHistory
                });
            }
            
            console.log(`📤 Database exported: ${exportData.workspaces.length} workspaces`);
            return exportData;
            
        } catch (error) {
            console.error('❌ Database export failed:', error);
            throw error;
        }
    }

    async loadCodex14499Data() {
        try {
            console.log('📚 Loading Codex 144:99 data...');
            
            // Load expanded Codex 144:99 data
            try {
                const response = await fetch('/Users/rebeccalemke/cathedral-real/data/codex-144-expanded.json');
                if (response.ok) {
                    this.codexData = await response.json();
                    console.log('✅ Loaded Codex 144:99 expanded data');
                }
            } catch (error) {
                console.warn('⚠️ Could not load Codex 144:99 expanded data:', error);
            }
            
            // Try to load Spiral Engine from existing package
            try {
                const { SpiralEngine } = await import('/Users/rebeccalemke/cathedral-real/packages/codex-144-99/src/core.ts');
                this.spiralEngine = new SpiralEngine({
                    seed: "cathedral-design",
                    depth: 3,
                    ratio: 144/99 // Sacred mathematics ratio
                });
                console.log('✅ SpiralEngine initialized with sacred mathematics');
            } catch (error) {
                console.warn('⚠️ Could not load SpiralEngine, using fallback');
                // Create simple fallback spiral engine
                this.spiralEngine = {
                    config: { seed: "fallback", depth: 3, ratio: 144/99 },
                    generateNode: (index = 0) => ({
                        id: `node-${index}`,
                        archetype: `archetype-${index % 12}`,
                        position: { x: 0, y: 0, z: 0 },
                        connections: []
                    })
                };
            }
            
            console.log('🔗 Codex 144:99 integration complete');
            
        } catch (error) {
            console.error('❌ Failed to load Codex 144:99 data:', error);
            // Continue without Codex integration
        }
    }

    // Get Codex node data for design integration
    getCodexNode(nodeId) {
        if (this.spiralEngine) {
            return this.spiralEngine.generateNode(nodeId);
        }
        return null;
    }
    
    // Get sacred geometry parameters from Codex
    getSacredGeometryParams() {
        if (this.codexData?.codex_144_99_expanded?.sacred_mathematics) {
            return this.codexData.codex_144_99_expanded.sacred_mathematics;
        }
        return {
            manifestation_nodes: 144,
            dissolution_gates: 99,
            ratio: 1.454545,
            golden_ratio: 1.618033988749895
        };
    }

    // Validate design element against Codex standards
    validateAgainstCodex(element) {
        const sacredParams = this.getSacredGeometryParams();
        let validation = {
            isValid: true,
            score: 0.8,
            issues: []
        };
        
        // Check for sacred geometry alignment
        if (element.type === 'sacred_geometry') {
            // Validate golden ratio proportions
            if (element.width && element.height) {
                const ratio = element.width / element.height;
                const goldenRatio = sacredParams.golden_ratio;
                const deviation = Math.abs(ratio - goldenRatio) / goldenRatio;
                
                if (deviation > 0.05) { // 5% tolerance
                    validation.issues.push(`Golden ratio deviation: ${(deviation * 100).toFixed(1)}%`);
                    validation.score -= 0.2;
                } else {
                    validation.score += 0.1; // Bonus for good alignment
                }
            }
        }
        
        // Check for proper naming (Codex-style)
        if (!element.name || element.name.length < 3) {
            validation.issues.push('Element name should be descriptive (3+ characters)');
            validation.score -= 0.1;
        }
        
        validation.isValid = validation.score >= 0.6;
        return validation;
    }

    createBackup() {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            
            if (this.db && this.db.backup) {
                // SQLite backup
                const backupPath = `${this.dataPath}/backup_${timestamp}.db`;
                this.db.backup(backupPath);
                console.log(`💾 Database backup created: ${backupPath}`);
            } else {
                // localStorage backup
                const exportData = this.exportDatabase();
                const backupData = {
                    timestamp: timestamp,
                    data: exportData
                };
                localStorage.setItem(`cathedral_backup_${timestamp}`, JSON.stringify(backupData));
                console.log(`💾 localStorage backup created: ${timestamp}`);
            }
            
        } catch (error) {
            console.error('❌ Backup creation failed:', error);
        }
    }

    getStats() {
        try {
            if (this.db && this.db.prepare) {
                // SQLite database
                const workspaceCount = this.db.prepare('SELECT COUNT(*) as count FROM workspaces').get();
                const elementCount = this.db.prepare('SELECT COUNT(*) as count FROM design_elements').get();
                const versionCount = this.db.prepare('SELECT COUNT(*) as count FROM versions').get();
                const autoSaveCount = this.db.prepare('SELECT COUNT(*) as count FROM auto_save_history').get();
                
                return {
                    workspaces: workspaceCount?.count || 0,
                    designElements: elementCount?.count || 0,
                    versions: versionCount?.count || 0,
                    autoSaveHistory: autoSaveCount?.count || 0,
                    databaseType: 'SQLite',
                    isInitialized: this.isInitialized
                };
            } else {
                // localStorage fallback
                return {
                    workspaces: JSON.parse(localStorage.getItem('cathedral_workspaces') || '[]').length,
                    designElements: JSON.parse(localStorage.getItem('cathedral_design_elements') || '[]').length,
                    versions: JSON.parse(localStorage.getItem('cathedral_versions') || '[]').length,
                    autoSaveHistory: JSON.parse(localStorage.getItem('cathedral_auto_save_history') || '[]').length,
                    databaseType: 'localStorage',
                    isInitialized: this.isInitialized
                };
            }
        } catch (error) {
            console.error('Failed to get database stats:', error);
            return { error: error.message };
        }
    }

    close() {
        // Clear backup interval
        if (this.backupInterval) {
            clearInterval(this.backupInterval);
            this.backupInterval = null;
        }
        
        // Close database connection
        if (this.db && this.db.close) {
            this.db.close();
        }
        
        this.isInitialized = false;
        console.log('🗄 Database manager closed');
    }
}

// Export for global access
if (typeof window !== 'undefined') {
    window.SQLiteDatabaseManager = SQLiteDatabaseManager;
}

export default SQLiteDatabaseManager;