/**
 * 🏛️✨ CATHEDRAL OF CIRCUITS - MAIN APP COMPONENT
 *
 * React app that integrates your native ES game engine
 * Guild Wars-style RPG with your authentic Codex 144:99 system
 *
 * @architecture React + TypeScript + Vite
 * @game_authentic Your real Guild Wars-style RPG
 */

import { CathedralGameInterface } from './components/CathedralGameInterface';
import './App.css';

function App() {
  return (
    <div className="cathedral-app">
      <CathedralGameInterface />
    </div>
  );
}

export default App;
