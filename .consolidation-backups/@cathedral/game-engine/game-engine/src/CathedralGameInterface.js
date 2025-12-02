/**
 * 🏛️✨ CATHEDRAL OF CIRCUITS - GAME INTERFACE
 *
 * Native ES module interface for your Guild Wars-style RPG
 * Connects your Codex 144:99 system with React/Vite frontend
 *
 * @architecture Native ES Modules with React
 * @game_authentic Your real Guild Wars-style RPG
 */

import { CodexGameEngine } from './CodexGameEngine.js';

export class CathedralGameInterface {
  constructor(containerId = 'cathedral-game') {
    this.containerId = containerId;
    this.gameEngine = new CodexGameEngine();
    this.isGameActive = false;
    this.currentView = 'menu';

    this.views = {
      menu: this.createMainMenu.bind(this),
      characterSelect: this.createCharacterSelect.bind(this),
      nodeNavigation: this.createNodeNavigation.bind(this),
      fusionKink: this.createFusionKink.bind(this),
      settings: this.createSettings.bind(this)
    };
  }

  async initialize() {
    console.log('🏛️ Initializing Cathedral Game Interface...');

    // Initialize the game engine
    await this.gameEngine.initialize();

    // Create the game container
    this.createGameContainer();

    // Show main menu
    this.showView('menu');

    console.log('✅ Game interface ready');
  }

  createGameContainer() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      const newContainer = document.createElement('div');
      newContainer.id = this.containerId;
      newContainer.className = 'cathedral-game-container';
      document.body.appendChild(newContainer);
    }
  }

  showView(viewName) {
    this.currentView = viewName;
    const container = document.getElementById(this.containerId);

    if (this.views[viewName]) {
      container.innerHTML = this.views[viewName]();
    } else {
      container.innerHTML = this.createErrorView(viewName);
    }
  }

  createMainMenu() {
    return `
      <div class="game-menu">
        <h1>🏛️✨ CATHEDRAL OF CIRCUITS</h1>
        <p class="subtitle">Guild Wars-Style Sacred Technology RPG</p>

        <div class="menu-options">
          <button class="menu-button primary" onclick="window.gameInterface.startNewGame()">
            🎮 Start Royal Initiate Path
          </button>

          <button class="menu-button secondary" onclick="window.gameInterface.showView('characterSelect')">
            🃏 Select Arcanae Class
          </button>

          <button class="menu-button secondary" onclick="window.gameInterface.showView('nodeNavigation')">
            🌟 Navigate Sacred Nodes
          </button>

          <button class="menu-button accent" onclick="window.gameInterface.showView('fusionKink')">
            ⚗️ Fusion Kink Heaven
          </button>

          <button class="menu-button settings" onclick="window.gameInterface.showView('settings')">
            ⚙️ Accessibility & Safety
          </button>
        </div>

        <div class="game-info">
          <p>🛡️ Maximum CPTSD-Safe Design</p>
          <p>📊 Codex 144:99 Integration</p>
          <p>🃏 22 Living Tradition Engines</p>
          <p>🎵 Authentic Solfeggio Frequencies</p>
        </div>
      </div>
    `;
  }

  async startNewGame() {
    console.log('🎮 Starting new Royal Initiate Path...');

    try {
      const gameStart = await this.gameEngine.startGame();
      this.isGameActive = true;

      // Show character creation
      this.showCharacterCreation(gameStart);
    } catch (error) {
      console.error('Failed to start game:', error);
      this.showError('Failed to start your sacred journey. Please try again.');
    }
