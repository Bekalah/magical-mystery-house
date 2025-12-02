/**
 * Cathedral Professional Design Suite - Main Application Entry
 * 
 * Complete deploy architecture with menu systems and SQLite persistence
 * for Node.js v25 support, featuring auto-save, crash recovery, and
 * professional design tools that rival Adobe Creative Suite and Figma.
 * 
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 * @license CC0 - Your Original Work
 */

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';

// Import main deploy architecture component
import DeployArchitecture from './DeployArchitecture';

// Import SQLite integration
import { SQLiteDatabaseManager } from './components/SQLiteDatabaseManager';

interface AppState {
  isInitialized: boolean;
  databaseStatus: 'connecting' | 'connected' | 'error' | 'offline';
  currentWorkspace: string | null;
  autoSaveEnabled: boolean;
  lastBackupTime: Date | null;
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    isInitialized: false,
    databaseStatus: 'connecting',
    currentWorkspace: null,
    autoSaveEnabled: true,
    lastBackupTime: null
  });

  const [dbManager] = useState(() => new SQLiteDatabaseManager());

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('🏰 Initializing Cathedral Professional Design Suite...');
      
      // Initialize SQLite database with Node.js v25
      await dbManager.initialize();
      
      // Setup auto-save system
      setupAutoSave();
      
      // Setup crash recovery
      setupCrashRecovery();
      
      // Create default workspace if none exists
      const defaultWorkspace = await createDefaultWorkspace();
      
      setAppState(prev => ({
        ...prev,
        isInitialized: true,
        databaseStatus: 'connected',
        currentWorkspace: defaultWorkspace
      }));
      
      console.log('✅ Cathedral Professional Design Suite initialized');
      
    } catch (error) {
      console.error('❌ Failed to initialize app:', error);
      setAppState(prev => ({ ...prev, databaseStatus: 'error' }));
    }
  };

  const createDefaultWorkspace = async (): Promise<string> => {
    try {
      // Check if default workspace exists
      const existingWorkspaces = await dbManager.getWorkspaces();
      const defaultWorkspace = existingWorkspaces.find(w => w.name === 'Default Workspace');
      
      if (defaultWorkspace) {
        return defaultWorkspace.id;
      }
      
      // Create new default workspace
      const workspaceData = {
        id: `workspace_${Date.now()}`,
        name: 'Default Workspace',
        type: 'vector' as const,
        width: 1920,
        height: 1080,
        dpi: 72,
        color_space: 'sRGB',
        background_color: '#ffffff',
        canvas_settings: JSON.stringify({
          grid_enabled: true,
          grid_size: 20,
          snap_to_grid: true,
          sacred_geometry_enabled: true
        })
      };
      
      await dbManager.createWorkspace(workspaceData);
      console.log('📁 Created default workspace');
      
      return workspaceData.id;
      
    } catch (error) {
      console.error('Failed to create default workspace:', error);
      throw error;
    }
  };

  const setupAutoSave = () => {
    if (!appState.autoSaveEnabled) return;
    
    // Auto-save every 30 seconds
    setInterval(async () => {
      if (appState.currentWorkspace) {
        try {
          await dbManager.autoSave(appState.currentWorkspace);
          setAppState(prev => ({ 
            ...prev, 
            lastBackupTime: new Date()
          }));
          console.log('💾 Auto-save completed');
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    }, 30000);
  };

  const setupCrashRecovery = () => {
    // Handle graceful shutdown
    const handleShutdown = () => {
      console.log('🔄 Performing graceful shutdown...');
      dbManager.close();
    };
    
    process.on('SIGINT', handleShutdown);
    process.on('SIGTERM', handleShutdown);
    process.on('beforeExit', handleShutdown);
    
    // Setup crash recovery on unhandled errors
    process.on('unhandledRejection', (reason) => {
      console.error('🚨 Unhandled rejection detected, initiating recovery:', reason);
      dbManager.performRecovery();
    });
    
    process.on('uncaughtException', (error) => {
      console.error('🚨 Uncaught exception detected, initiating recovery:', error);
      dbManager.performRecovery();
    });
    
    console.log('🛡️ Crash recovery system activated');
  };

  if (!appState.isInitialized) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <div className="sacred-geometry-loader">
            <div className="golden-ratio-spiral"></div>
          </div>
          <h1>Cathedral Professional Design Suite</h1>
          <p>Initializing deploy architecture and SQLite database...</p>
          <div className="loading-status">
            <span className={`status ${appState.databaseStatus}`}>
              Database: {appState.databaseStatus}
            </span>
          </div>
          <div className="loading-progress">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cathedral-app">
      <DeployArchitecture 
        dbManager={dbManager}
        currentWorkspace={appState.currentWorkspace}
        onWorkspaceChange={(workspaceId) => 
          setAppState(prev => ({ ...prev, currentWorkspace: workspaceId }))
        }
        onAutoSaveToggle={(enabled) => 
          setAppState(prev => ({ ...prev, autoSaveEnabled: enabled }))
        }
      />
    </div>
  );
};

// Mount the application
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
  console.log('🎨 Cathedral Professional Design Suite loaded');
} else {
  console.error('❌ Root container not found');
}

// Export for Node.js environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { App };
}

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

console.log('🏰 Cathedral Professional Design Suite - Main entry point loaded');