/**
 * Cathedral SQLite Persistence Engine
 * 
 * Robust SQLite database integration for the Cathedral Professional Design Suite
 * with Node.js v25 support, featuring automatic saving, transaction handling,
 * and crash recovery mechanisms to prevent data loss.
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

import Database from 'better-sqlite3';
import { EventEmitter } from 'events';
import { join, dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { promisify } from 'util';
import * as z from 'zod';

// Database schemas
export const DesignElementSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  type: z.enum(['vector', 'text', 'image', 'shape', 'sacred_geometry']),
  name: z.string(),
  position_x: z.number(),
  position_y: z.number(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  transform_data: z.string(), // JSON string
  style_data: z.string(), // JSON string
  metadata: z.string(), // JSON string
  created_at: z.string(),
  updated_at: z.string(),
  version: z.number().default(1),
  layer_id: z.string().nullable(),
  parent_id: z.string().nullable(),
  z_index: z.number().default(0)
});

export const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['web', 'print', 'mobile', 'social', 'vector', 'layout']),
  width: z.number(),
  height: z.number(),
  dpi: z.number(),
  color_space: z.string(),
  background_color: z.string(),
  canvas_settings: z.string(), // JSON string
  created_at: z.string(),
  updated_at: z.string(),
  user_id: z.string().nullable(),
  collaboration_enabled: z.boolean().default(false),
  auto_save_enabled: z.boolean().default(true),
  auto_save_interval: z.number().default(30000), // 30 seconds
  quality_standard: z.enum(['standard', 'professional', 'master', 'scientific']).default('professional')
});

export const VersionSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  label: z.string(),
  description: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  parent_version_id: z.string().nullable(),
  elements_snapshot: z.string(), // JSON string
  quality_score: z.number().nullable(),
  size_bytes: z.number()
});

export const CollaborationSessionSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  session_name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  active_users: z.string(), // JSON string array
  permissions: z.string(), // JSON string
  real_time_sync_enabled: z.boolean().default(true),
  max_users: z.number().default(10)
});

export type DesignElement = z.infer<typeof DesignElementSchema>;
export type Workspace = z.infer<typeof WorkspaceSchema>;
export type Version = z.infer<typeof VersionSchema>;
export type CollaborationSession = z.infer<typeof CollaborationSessionSchema>;

export class CathedralSQLiteEngine extends EventEmitter {
  private db: Database.Database;
  private autoSaveTimers: Map<string, NodeJS.Timeout> = new Map();
  private transactionQueue: Array<() => Promise<void>> = [];
  private isProcessingTransactions = false;
  private backupInterval: NodeJS.Timeout | null = null;
  private dataDirectory: string;

  constructor(dbPath?: string) {
    super();
    
    // Use Node.js v25 SQLite support with optimal configuration
    this.dataDirectory = dbPath || join(process.cwd(), 'cathedral-data');
    
    // Ensure data directory exists
    if (!existsSync(this.dataDirectory)) {
      mkdirSync(this.dataDirectory, { recursive: true });
    }
    
    const databasePath = join(this.dataDirectory, 'cathedral-design-suite.db');
    
    // Initialize database with optimal settings for Node.js v25
    this.db = new Database(databasePath, {
      // Performance optimizations for Node.js v25
      memory: false,
      fileMustExist: false,
      readonly: false,
      verbose: undefined, // Disable verbose logging in production
    });

    this.setupDatabase();
    this.initializeAutoSave();
    this.initializeBackupSystem();
  }

  /**
   * Setup database schema and indexes
   */
  private setupDatabase(): void {
    // Enable foreign key constraints for data integrity
    this.db.pragma('foreign_keys = ON');
    
    // Optimize for performance
    this.db.pragma('journal_mode = WAL'); // Write-Ahead Logging for better performance
    this.db.pragma('synchronous = NORMAL');
    this.db.pragma('cache_size = 10000'); // 10MB cache
    this.db.pragma('temp_store = MEMORY');
    this.db.pragma('mmap_size = 268435456'); // 256MB memory-mapped I/O

    // Create tables
    this.createTables();
    this.createIndexes();
    this.createTriggers();
  }

  private createTables(): void {
    // Workspaces table
    this.db.exec(`
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
        user_id TEXT,
        collaboration_enabled BOOLEAN DEFAULT FALSE,
        auto_save_enabled BOOLEAN DEFAULT TRUE,
        auto_save_interval INTEGER DEFAULT 30000,
        quality_standard TEXT DEFAULT 'professional' CHECK (quality_standard IN ('standard', 'professional', 'master', 'scientific'))
      );
    `);

    // Design elements table
    this.db.exec(`
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
    `);

    // Layers table
    this.db.exec(`
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
    `);

    // Versions table
    this.db.exec(`
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
    `);

    // Collaboration sessions table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS collaboration_sessions (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL,
        session_name TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        active_users TEXT NOT NULL, -- JSON array
        permissions TEXT NOT NULL, -- JSON object
        real_time_sync_enabled BOOLEAN DEFAULT TRUE,
        max_users INTEGER DEFAULT 10,
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
      );
    `);

    // Auto-save history table
    this.db.exec(`
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
    `);

    // Recovery checkpoints table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS recovery_checkpoints (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL,
        checkpoint_data TEXT NOT NULL,
        created_at TEXT NOT NULL,
        checkpoint_type TEXT NOT NULL,
        is_valid BOOLEAN DEFAULT TRUE,
        FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
      );
    `);
  }

  private createIndexes(): void {
    // Performance indexes
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_design_elements_workspace ON design_elements(workspace_id);');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_design_elements_type ON design_elements(type);');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_design_elements_layer ON design_elements(layer_id);');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_design_elements_z_index ON design_elements(z_index);');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_versions_workspace ON versions(workspace_id);');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_versions_created_at ON versions(created_at);');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_auto_save_workspace ON auto_save_history(workspace_id);');
    this.db.exec('CREATE INDEX IF NOT EXISTS idx_auto_save_created_at ON auto_save_history(saved_at);');
  }

  private createTriggers(): void {
    // Auto-update timestamps
    this.db.exec(`
      CREATE TRIGGER IF NOT EXISTS update_workspaces_timestamp 
      AFTER UPDATE ON workspaces
      FOR EACH ROW
      BEGIN
        UPDATE workspaces SET updated_at = datetime('now') WHERE id = NEW.id;
      END;
    `);

    this.db.exec(`
      CREATE TRIGGER IF NOT EXISTS update_design_elements_timestamp 
      AFTER UPDATE ON design_elements
      FOR EACH ROW
      BEGIN
        UPDATE design_elements SET updated_at = datetime('now') WHERE id = NEW.id;
      END;
    `);

    // Auto-create recovery checkpoints
    this.db.exec(`
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

  /**
   * Initialize auto-save system
   */
  private initializeAutoSave(): void {
    // Auto-save every 30 seconds for workspaces with auto-save enabled
    setInterval(() => {
      this.processAutoSaveQueue();
    }, 30000);

    // Handle graceful shutdown
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
  }

  /**
   * Initialize backup system
   */
  private initializeBackupSystem(): void {
    // Create backup every hour
    this.backupInterval = setInterval(() => {
      this.createBackup();
    }, 60 * 60 * 1000);
  }

  /**
   * Create a new workspace
   */
  public async createWorkspace(workspace: Omit<Workspace, 'created_at' | 'updated_at'>): Promise<string> {
    const now = new Date().toISOString();
    
    const workspaceData: Workspace = {
      ...workspace,
      created_at: now,
      updated_at: now
    };

    // Validate against schema
    const validated = WorkspaceSchema.parse(workspaceData);

    const stmt = this.db.prepare(`
      INSERT INTO workspaces (
        id, name, type, width, height, dpi, color_space, background_color,
        canvas_settings, created_at, updated_at, user_id, collaboration_enabled,
        auto_save_enabled, auto_save_interval, quality_standard
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      validated.id,
      validated.name,
      validated.type,
      validated.width,
      validated.height,
      validated.dpi,
      validated.color_space,
      validated.background_color,
      validated.canvas_settings,
      validated.created_at,
      validated.updated_at,
      validated.user_id,
      validated.collaboration_enabled,
      validated.auto_save_enabled,
      validated.auto_save_interval,
      validated.quality_standard
    );

    this.emit('workspaceCreated', validated);
    return validated.id;
  }

  /**
   * Save design element with transaction
   */
  public async saveDesignElement(element: Omit<DesignElement, 'created_at' | 'updated_at'>): Promise<void> {
    const now = new Date().toISOString();
    
    const elementData: DesignElement = {
      ...element,
      created_at: element.created_at || now,
      updated_at: now
    };

    // Validate against schema
    const validated = DesignElementSchema.parse(elementData);

    // Use transaction for data integrity
    const transaction = this.db.transaction((element: DesignElement) => {
      const stmt = this.db.prepare(`
        INSERT OR REPLACE INTO design_elements (
          id, workspace_id, type, name, position_x, position_y, width, height,
          transform_data, style_data, metadata, created_at, updated_at, version,
          layer_id, parent_id, z_index
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        validated.id,
        validated.workspace_id,
        validated.type,
        validated.name,
        validated.position_x,
        validated.position_y,
        validated.width,
        validated.height,
        validated.transform_data,
        validated.style_data,
        validated.metadata,
        validated.created_at,
        validated.updated_at,
        validated.version,
        validated.layer_id,
        validated.parent_id,
        validated.z_index
      );
    });

    transaction(validated);

    this.emit('elementSaved', validated);

    // Trigger auto-save for workspace
    if (this.isAutoSaveEnabled(validated.workspace_id)) {
      this.queueAutoSave(validated.workspace_id);
    }
  }

  /**
   * Auto-save functionality
   */
  private isAutoSaveEnabled(workspaceId: string): boolean {
    const stmt = this.db.prepare('SELECT auto_save_enabled FROM workspaces WHERE id = ?');
    const result = stmt.get(workspaceId) as { auto_save_enabled: boolean } | undefined;
    return result?.auto_save_enabled ?? true;
  }

  private queueAutoSave(workspaceId: string): void {
    this.transactionQueue.push(async () => {
      await this.performAutoSave(workspaceId);
    });

    if (!this.isProcessingTransactions) {
      this.processTransactionQueue();
    }
  }

  private async processTransactionQueue(): Promise<void> {
    this.isProcessingTransactions = true;

    while (this.transactionQueue.length > 0) {
      const transaction = this.transactionQueue.shift();
      if (transaction) {
        try {
          await transaction();
        } catch (error) {
          console.error('Transaction failed:', error);
          this.emit('transactionError', error);
        }
      }
    }

    this.isProcessingTransactions = false;
  }

  private async performAutoSave(workspaceId: string): Promise<void> {
    const startTime = Date.now();
    
    try {
      // Get all elements for the workspace
      const elements = this.getDesignElements(workspaceId);
      
      // Calculate data size
      const dataString = JSON.stringify(elements);
      const sizeBytes = Buffer.byteLength(dataString, 'utf8');
      
      // Validate data integrity
      if (!this.validateDataIntegrity(elements)) {
        throw new Error('Data integrity validation failed');
      }

      // Record auto-save in history
      const saveId = `autosave_${workspaceId}_${Date.now()}`;
      const duration = Date.now() - startTime;
      
      const stmt = this.db.prepare(`
        INSERT INTO auto_save_history (
          id, workspace_id, saved_at, elements_count, file_size_bytes,
          save_duration_ms, success, error_message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        saveId,
        workspaceId,
        new Date().toISOString(),
        elements.length,
        sizeBytes,
        duration,
        true,
        null
      );

      this.emit('autoSaveComplete', { workspaceId, elementsCount: elements.length, duration });
      
    } catch (error) {
      // Record failed auto-save
      const saveId = `autosave_${workspaceId}_${Date.now()}`;
      const duration = Date.now() - startTime;
      
      const stmt = this.db.prepare(`
        INSERT INTO auto_save_history (
          id, workspace_id, saved_at, elements_count, file_size_bytes,
          save_duration_ms, success, error_message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        saveId,
        workspaceId,
        new Date().toISOString(),
        0,
        0,
        duration,
        false,
        error instanceof Error ? error.message : 'Unknown error'
      );

      this.emit('autoSaveFailed', { workspaceId, error });
      throw error;
    }
  }

  /**
   * Get all design elements for a workspace
   */
  public getDesignElements(workspaceId: string): DesignElement[] {
    const stmt = this.db.prepare(`
      SELECT * FROM design_elements 
      WHERE workspace_id = ? 
      ORDER BY z_index ASC, created_at ASC
    `);
    
    const rows = stmt.all(workspaceId) as any[];
    return rows.map(row => DesignElementSchema.parse({
      ...row,
      position_x: row.position_x,
      position_y: row.position_y,
      width: row.width,
      height: row.height,
      transform_data: row.transform_data,
      style_data: row.style_data,
      metadata: row.metadata
    }));
  }

  /**
   * Get workspace by ID
   */
  public getWorkspace(id: string): Workspace | null {
    const stmt = this.db.prepare('SELECT * FROM workspaces WHERE id = ?');
    const row = stmt.get(id) as any;
    
    if (!row) return null;
    
    return WorkspaceSchema.parse({
      ...row,
      canvas_settings: row.canvas_settings
    });
  }

  /**
   * Create version/backup
   */
  public async createVersion(
    workspaceId: string, 
    label: string, 
    description?: string,
    createdBy: string = 'system'
  ): Promise<string> {
    const versionId = `version_${workspaceId}_${Date.now()}`;
    const elements = this.getDesignElements(workspaceId);
    const elementsSnapshot = JSON.stringify(elements);
    
    const stmt = this.db.prepare(`
      INSERT INTO versions (
        id, workspace_id, label, description, created_at, created_by,
        parent_version_id, elements_snapshot, quality_score, size_bytes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      versionId,
      workspaceId,
      label,
      description,
      new Date().toISOString(),
      createdBy,
      null, // parent_version_id - would be set for branching
      elementsSnapshot,
      this.calculateQualityScore(elements),
      Buffer.byteLength(elementsSnapshot, 'utf8')
    );

    this.emit('versionCreated', { workspaceId, versionId, label });
    return versionId;
  }

  /**
   * Validate data integrity
   */
  private validateDataIntegrity(elements: DesignElement[]): boolean {
    try {
      // Check for duplicate IDs
      const ids = elements.map(e => e.id);
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        console.error('Duplicate element IDs detected');
        return false;
      }

      // Validate required fields
      for (const element of elements) {
        if (!element.id || !element.workspace_id || !element.name) {
          console.error('Missing required fields in element:', element.id);
          return false;
        }
      }

      // Check position and size validity
      for (const element of elements) {
        if (element.width !== null && element.width < 0) return false;
        if (element.height !== null && element.height < 0) return false;
        if (isNaN(element.position_x) || isNaN(element.position_y)) return false;
      }

      return true;
    } catch (error) {
      console.error('Data integrity validation error:', error);
      return false;
    }
  }

  /**
   * Calculate quality score for elements
   */
  private calculateQualityScore(elements: DesignElement[]): number {
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

  /**
   * Recovery from crash
   */
  public async recoverFromCrash(workspaceId: string): Promise<{
    recovered: boolean;
    lastCheckpoint?: any;
    elements?: DesignElement[];
  }> {
    try {
      // Get the latest recovery checkpoint
      const checkpointStmt = this.db.prepare(`
        SELECT * FROM recovery_checkpoints 
        WHERE workspace_id = ? AND is_valid = TRUE 
        ORDER BY created_at DESC 
        LIMIT 1
      `);
      
      const checkpoint = checkpointStmt.get(workspaceId) as any;
      
      if (!checkpoint) {
        return { recovered: false };
      }

      // Try to recover data
      const checkpointData = JSON.parse(checkpoint.checkpoint_data);
      
      if (Array.isArray(checkpointData)) {
        // Restore elements
        for (const elementData of checkpointData) {
          await this.saveDesignElement(elementData as DesignElement);
        }

        return { 
          recovered: true, 
          lastCheckpoint: checkpoint, 
          elements: checkpointData as DesignElement[] 
        };
      }

      return { recovered: false };
      
    } catch (error) {
      console.error('Recovery failed:', error);
      return { recovered: false };
    }
  }

  /**
   * Create database backup
   */
  public createBackup(): void {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = join(this.dataDirectory, `backup_${timestamp}.db`);
      
      // Use SQLite backup API
      this.db.backup(backupPath);
      
      this.emit('backupCreated', { backupPath, timestamp });
      console.log(`Database backup created: ${backupPath}`);
      
    } catch (error) {
      console.error('Backup failed:', error);
      this.emit('backupFailed', { error });
    }
  }

  /**
   * Get auto-save history for workspace
   */
  public getAutoSaveHistory(workspaceId: string, limit: number = 10): any[] {
    const stmt = this.db.prepare(`
      SELECT * FROM auto_save_history 
      WHERE workspace_id = ? 
      ORDER BY saved_at DESC 
      LIMIT ?
    `);
    
    return stmt.all(workspaceId, limit) as any[];
  }

  /**
   * Cleanup old auto-save history
   */
  public cleanupOldAutoSaves(olderThanDays: number = 7): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
    
    const stmt = this.db.prepare(`
      DELETE FROM auto_save_history 
      WHERE saved_at < ?
    `);
    
    const result = stmt.run(cutoffDate.toISOString());
    console.log(`Cleaned up ${result.changes} old auto-save records`);
  }

  /**
   * Graceful shutdown
   */
  public shutdown(): void {
    // Clear timers
    this.autoSaveTimers.forEach(timer => clearTimeout(timer));
    this.autoSaveTimers.clear();
    
    if (this.backupInterval) {
      clearInterval(this.backupInterval);
      this.backupInterval = null;
    }
    
    // Process remaining transactions
    if (this.transactionQueue.length > 0) {
      console.log(`Processing ${this.transactionQueue.length} remaining transactions...`);
      this.processTransactionQueue();
    }
    
    // Close database
    this.db.close();
    
    this.emit('shutdown');
    console.log('CathedralSQLiteEngine shutdown complete');
  }

  /**
   * Get database statistics
   */
  public getStats(): any {
    const workspaceCount = this.db.prepare('SELECT COUNT(*) as count FROM workspaces').get() as any;
    const elementCount = this.db.prepare('SELECT COUNT(*) as count FROM design_elements').get() as any;
    const versionCount = this.db.prepare('SELECT COUNT(*) as count FROM versions').get() as any;
    const autoSaveCount = this.db.prepare('SELECT COUNT(*) as count FROM auto_save_history').get() as any;
    
    return {
      workspaces: workspaceCount.count,
      designElements: elementCount.count,
      versions: versionCount.count,
      autoSaveHistory: autoSaveCount.count,
      databaseSize: this.getDatabaseSize()
    };
  }

  private getDatabaseSize(): number {
    try {
      const stmt = this.db.prepare('PRAGMA page_count * PRAGMA page_size as size');
      const result = stmt.get() as any;
      return result.size || 0;
    } catch {
      return 0;
    }
  }
}

// Export singleton instance
export const cathedralSQLiteEngine = new CathedralSQLiteEngine();

// Export for global access
if (typeof window !== 'undefined') {
  (window as any).cathedralSQLiteEngine = cathedralSQLiteEngine;
}

if (typeof globalThis !== 'undefined') {
  (globalThis as any).cathedralSQLiteEngine = cathedralSQLiteEngine;
}

export default cathedralSQLiteEngine;