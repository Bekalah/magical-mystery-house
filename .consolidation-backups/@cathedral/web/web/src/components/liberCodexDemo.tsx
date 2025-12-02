// apps/web/src/components/liberCodexDemo.tsx
import React from "react";
import { MajorArcana, getCardName } from "liber-arcanae";
import { SpiralEngine } from "codex-144-99/core";

export default function LiberCodexDemo() {
  const engine = new SpiralEngine({ seed: "luna", depth: 2 });
  const node = engine.generateNode(1);
  return (
    <div style={{ padding: 20, fontFamily: "serif" }}>
      <h2>Liber Arcanae + Codex 144:99 Demo</h2>
      <p><strong>Engine:</strong> {engine.describe()}</p>
      <p><strong>Generated node:</strong> {node.id} — {node.archetype}</p>
      <h3>Sample Major Arcana</h3>
      <ul>
        {MajorArcana.slice(0, 6).map((c) => (
          <li key={c}>{getCardName(c)}</li>
        ))}
      </ul>
      <p style={{ fontSize: 12, opacity: 0.8 }}>
        This is a safe, read-only demo component — extend it into the game UI as you please.
      </p>
    </div>
  );
}
