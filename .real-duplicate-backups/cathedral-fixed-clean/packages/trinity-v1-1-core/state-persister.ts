/**
// 🎨 Visionary Art - Museum-grade quality - 144:99 ratio compliance - Fibonacci-based sizing - Golden ratio proportions - Organic, flowing aesthetics - Trauma-aware visual design - Open world design (not website-like) - Immersive 3D environments - Sacred geometry integration - Multi-modal creation experiences - Organic, quality: Three.js or Babylon.js for 3D immersive environment
// 🎨 Visionary Art: Golden ratio (1.618), Fibonacci, 144:99 ratio
// 🎨 Visionary Art: Multi-modal creation (Art + Music + Science + Spirituality)
// 🔧 Design Fix: Open world experience with non-linear, organic navigation
 * 💾✨ STATE PERSISTER
 *
 * Saves and restores Trinity Architecture state.
 * PTSD-safe: Regular saves prevent data loss anxiety.
 *
 * @license CC0-1.0 - Public Domain
  * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
*/

import * as fs from 'fs';
import * as path from 'path';
import type { TrinityV11State } from './TrinityV11Core';
import ErrorHandler from './error-handler';

export interface PersistedState {
  state: TrinityV11State;
  timestamp: number;
  version: string;
}

export // Trauma-aware: gentle, supportive, ESC exits, pause anytime
class StatePersister {
  private static readonly STATE_DIR = path.join(process.cwd(), '.trinity-state');
  private static readonly STATE_FILE = path.join(StatePersister.STATE_DIR, 'state.json');
  private static readonly BACKUP_DIR = path.join(StatePersister.STATE_DIR, 'backups');
  private static readonly VERSION = '1.1.0';

  // Ensure directories exist
  private static ensureDirectories(): void {
    if (!fs.existsSync(StatePersister.STATE_DIR)) {
      fs.mkdirSync(StatePersister.STATE_DIR, { recursive: true });
    }
    if (!fs.existsSync(StatePersister.BACKUP_DIR)) {
      fs.mkdirSync(StatePersister.BACKUP_DIR, { recursive: true });
    }
  }

  // Save state
  public static saveState(state: TrinityV11State): boolean {
    return ErrorHandler.safeSync(() => {
      StatePersister.ensureDirectories();

      const persisted: PersistedState = {
        state,
        timestamp: Date.now(),
        version: StatePersister.VERSION
      };

      // Save current state
      fs.writeFileSync(
        StatePersister.STATE_FILE,
        JSON.stringify(persisted, null, 2),
        'utf-8'
      );

      // Create backup every 30 minutes
      const lastBackup = StatePersister.getLastBackupTime();
      if (Date.now() - lastBackup > 30 * 60 * 1000) {
        StatePersister.createBackup(persisted);
      }

      return true;
    }, {
      system: 'StatePersister',
      operation: 'saveState',
      timestamp: Date.now(),
      userFriendly: true
    }, false);
  }

  // Load state
  public static loadState(): TrinityV11State | null {
    return ErrorHandler.safeSync(() => {
      if (!fs.existsSync(StatePersister.STATE_FILE)) {
        return null;
      }

      const content = fs.readFileSync(StatePersister.STATE_FILE, 'utf-8');
      const persisted: PersistedState = JSON.parse(content);

      return persisted.state;
    }, {
      system: 'StatePersister',
      operation: 'loadState',
      timestamp: Date.now(),
      userFriendly: true
    }, null);
  }

  // Create backup
  private static createBackup(persisted: PersistedState): void {
    const backupFile = path.join(
      StatePersister.BACKUP_DIR,
      `state-${Date.now()}.json`
    );

    fs.writeFileSync(
      backupFile,
      JSON.stringify(persisted, null, 2),
      'utf-8'
    );

    // Keep only last 10 backups
    StatePersister.cleanupBackups();
  }

  // Get last backup time
  private static getLastBackupTime(): number {
    if (!fs.existsSync(StatePersister.BACKUP_DIR)) {
      return 0;
    }

    const backups = fs.readdirSync(StatePersister.BACKUP_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const match = f.match(/state-(\d+)\.json/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .sort((a, b) => b - a);

    return backups[0] || 0;
  }

  // Cleanup old backups
  private static cleanupBackups(): void {
    if (!fs.existsSync(StatePersister.BACKUP_DIR)) {
      return;
    }

    const backups = fs.readdirSync(StatePersister.BACKUP_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => ({
        name: f,
        time: (() => {
          const match = f.match(/state-(\d+)\.json/);
          return match ? parseInt(match[1], 10) : 0;
        })()
      }))
      .sort((a, b) => b.time - a.time);

    // Keep only last 10
    for (let i = 10; i < backups.length; i++) {
      const backupPath = path.join(StatePersister.BACKUP_DIR, backups[i].name);
      if (fs.existsSync(backupPath)) {
        fs.unlinkSync(backupPath);
      }
    }
  }

  // Restore from backup
  public static restoreFromBackup(backupTime?: number): TrinityV11State | null {
    return ErrorHandler.safeSync(() => {
      if (!fs.existsSync(StatePersister.BACKUP_DIR)) {
        return null;
      }

      const backups = fs.readdirSync(StatePersister.BACKUP_DIR)
        .filter(f => f.endsWith('.json'))
        .map(f => {
          const match = f.match(/state-(\d+)\.json/);
          return {
            name: f,
            time: match ? parseInt(match[1], 10) : 0
          };
        })
        .sort((a, b) => b.time - a.time);

      if (backups.length === 0) {
        return null;
      }

      // Use specified backup or most recent
      const backup = backupTime
        ? backups.find(b => b.time === backupTime) || backups[0]
        : backups[0];

      const backupPath = path.join(StatePersister.BACKUP_DIR, backup.name);
      const content = fs.readFileSync(backupPath, 'utf-8');
      const persisted: PersistedState = JSON.parse(content);

      return persisted.state;
    }, {
      system: 'StatePersister',
      operation: 'restoreFromBackup',
      timestamp: Date.now(),
      userFriendly: true
    }, null);
  }

  // Get state info
  public static getStateInfo(): {
    exists: boolean;
    timestamp: number | null;
    version: string | null;
    backupCount: number;
  } {
    const exists = fs.existsSync(StatePersister.STATE_FILE);
    let timestamp: number | null = null;
    let version: string | null = null;

    if (exists) {
      try {
        const content = fs.readFileSync(StatePersister.STATE_FILE, 'utf-8');
        const persisted: PersistedState = JSON.parse(content);
        timestamp = persisted.timestamp;
        version = persisted.version;
      } catch {
        // Ignore errors
      }
    }

    const backupCount = fs.existsSync(StatePersister.BACKUP_DIR)
      ? fs.readdirSync(StatePersister.BACKUP_DIR).filter(f => f.endsWith('.json')).length
      : 0;

    return {
      exists,
      timestamp,
      version,
      backupCount
    };
  }
}

export default StatePersister;

