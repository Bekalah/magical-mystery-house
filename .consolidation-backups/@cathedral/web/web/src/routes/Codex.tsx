/**
 * 📊 CODEX 144:99 - CENTRAL LEDGER INTERFACE
 */

import React, { useState, useEffect } from 'react'

const CodexPage: React.FC = () => {
  const [nodes, setNodes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/codex/nodes')
      .then(r => r.json())
      .then(data => {
        setNodes(data.nodes || [])
        setLoading(false)
      })
      .catch(() => {
        setNodes([])
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading Codex 144:99...</div>
  }

  return (
    <div className="codex-page">
      <h1>📊 Codex 144:99 - Central Ledger</h1>
      <p>Sacred mathematics nodes with complete correspondences</p>
      
      {nodes.length > 0 ? (
        <div className="nodes-grid">
          {nodes.map(node => (
            <div key={node.id} className="node-card">
              <h3>{node.title}</h3>
              <p>{node.teaching_function}</p>
              <div className="node-meta">
                <span>🔢 Node {node.id}</span>
                <span>🎵 {node.frequency_hz}Hz</span>
                <span>💎 {node.crystal}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="fallback-message">
          <p>Codex 144:99 nodes loading...</p>
          <p>Central ledger system initializing</p>
        </div>
      )}
    </div>
  )
}

export default CodexPage