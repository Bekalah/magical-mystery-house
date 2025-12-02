/**
 * Liber Arcanae Tarot App - Main Application
 * Real readings with alchemy-themed Circuitum99 spreads
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { PluginManager } from '@cathedral/plugin-system';
import App from './App.tsx';
import './index.css';

// Initialize the sacred systems
const initializeCathedral = async () => {
  console.log('🌟 Initializing Liber Arcanae Tarot App...');

  try {
    // Initialize the plugin system with all sacred systems
    const pluginManager = new PluginManager({
      autoLoad: true,
      parallelLoading: false,
      validationEnabled: true
    });

    // Get the modular system interface
    const cathedral = pluginManager.getModularSystem();

    console.log('✅ Sacred systems initialized successfully');
    console.log('📚 Codex 144:99:', cathedral.codex144.getAllNodes().length, 'nodes');
    console.log('🃏 Liber Arcanae:', cathedral.liberArcanae.getAllCards().length, 'cards');
    console.log('⚗️ Fusion Kink: Ready for sacred sessions');

    return cathedral;

  } catch (error) {
    console.error('❌ Error initializing sacred systems:', error);
    throw error;
  }
};

// Initialize and render the app
initializeCathedral().then((cathedral) => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <App cathedral={cathedral} />
    </React.StrictMode>
  );
}).catch((error) => {
  console.error('Failed to start Liber Arcanae Tarot App:', error);

  // Render error state
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>🌟 Liber Arcanae Tarot App</h1>
        <p>✨ Initializing sacred systems...</p>
        <p style={{ fontSize: '0.9em', opacity: 0.8 }}>
          Connecting to Codex 144:99, Liber Arcanae, and Fusion Kink
        </p>
      </div>
    </div>
  );
});