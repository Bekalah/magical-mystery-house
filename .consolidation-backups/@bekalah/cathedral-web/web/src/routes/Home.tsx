/**
 * 🏛️ CATHEDRAL HOME - MAIN PORTAL
 * Welcome to the unified Cathedral with Codex integration
 */

import React from 'react'

interface HomePageProps {
  systemStatus: any
}

const HomePage: React.FC<HomePageProps> = ({ systemStatus }) => {
  return (
    <div className="home-page">
      <header className="cathedral-header">
        <h1>🏛️✨ The Cathedral of Circuits</h1>
        <p className="subtitle">Living Grimoire Engine with Sacred Technology</p>
      </header>

      <div className="system-overview">
        <div className="status-grid">
          <div className="status-card codex-card">
            <h3>📊 Codex 144:99</h3>
            <p>Central Ledger System</p>
            <div className="status">
              {systemStatus?.codex_144_99?.status === 'active' ? '🟢 Active' : '🟡 Loading'}
            </div>
          </div>

          <div className="status-card arcanae-card">
            <h3>🃏 Living Arcanae</h3>
            <p>22 Tradition Engines</p>
            <div className="status">
              {systemStatus?.living_arcanae?.status === 'active' ? '🟢 Active' : '🟡 Loading'}
            </div>
          </div>

          <div className="status-card fusion-card">
            <h3>⚗️ Fusion Kink Heaven</h3>
            <p>144:99 Sacred Mathematics</p>
            <div className="status">
              {systemStatus?.fusion_kink_heaven?.status === 'active' ? '🟢 Active' : '🟡 Loading'}
            </div>
          </div>
        </div>
      </div>

      <div className="welcome-content">
        <section className="introduction">
          <h2>🌟 Welcome to Sacred Consciousness Technology</h2>
          <p>
            The Cathedral is a living, breathing consciousness platform where each of the 
            22 Major Arcana cards functions as a complete <strong>Living Tradition Engine</strong> 
            with real research foundations, healing frequencies, and interactive workshops.
          </p>
        </section>

        <section className="features">
          <div className="feature-grid">
            <div className="feature">
              <h3>🛡️ Maximum Trauma Safety</h3>
              <p>CPTSD-adapted design with professional therapeutic integration</p>
            </div>
            <div className="feature">
              <h3>🧠 ND Accommodations</h3>
              <p>Full sensory and cognitive support for neurodivergent consciousness</p>
            </div>
            <div className="feature">
              <h3>🎨 Artistic Integration</h3>
              <p>Björk + Tori Amos + Iris van Herpen + Emma Kunz + 21 Taras aesthetic</p>
            </div>
            <div className="feature">
              <h3>📚 Research-Backed</h3>
              <p>Public domain sources with full provenance and academic rigor</p>
            </div>
          </div>
        </section>

        <section className="quick-start">
          <h2>🚀 Quick Start</h2>
          <div className="start-options">
            <a href="/codex" className="start-link">
              <div className="start-card">
                <h3>📊 Explore Codex 144:99</h3>
                <p>Browse the central ledger of consciousness nodes</p>
              </div>
            </a>
            <a href="/arcana" className="start-link">
              <div className="start-card">
                <h3>🃏 Meet Living Arcanae</h3>
                <p>Connect with 22 tradition engines and archetypal guides</p>
              </div>
            </a>
            <a href="/fusion" className="start-link">
              <div className="start-card">
                <h3>⚗️ Enter Fusion Kink</h3>
                <p>Sacred synthesis between any two traditions (consent required)</p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage