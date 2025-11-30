# Codex 144:99 Visual Map

## Complete System Structure

### 144 Nodes - Spiral Organization

```
                    [144] Completion
                 [133-143] Layer 12
              [121-132] Layer 11
           [109-120] Layer 10
        [97-108] Layer 9
     [85-96] Layer 8
  [73-84] Layer 7
[61-72] Layer 6
[49-60] Layer 5
[37-48] Layer 4
[25-36] Layer 3
[13-24] Layer 2
[1-12] Layer 1 (Foundation)
```

### 99 Gates - Three-Tier System

```
Primary Gates (1-33):
├── Gates 1-11:   Foundation Tier
├── Gates 12-22:  Growth Tier
└── Gates 23-33:  Integration Tier

Harmonic Gates (34-66):
├── Gates 34-44:  Harmonic Foundation
├── Gates 45-55:  Harmonic Growth
└── Gates 56-66:  Harmonic Integration

Spiral Gates (67-99):
├── Gates 67-77:  Spiral Foundation
├── Gates 78-88:  Spiral Growth
└── Gates 89-99:  Spiral Completion
```

## Node-to-Gate Mapping Formula

### Primary Gate (1-33)
```
Primary Gate = ((Node ID - 1) % 33) + 1
```

### Harmonic Gates (34-66)
```
For each harmonic node:
  Harmonic Gate = 33 + ((Harmonic Node ID - 1) % 33) + 1
```

### Spiral Gate (67-99)
```
Layer = Math.ceil(Node ID / 12)
Spiral Gate = 66 + ((Layer - 1) % 33) + 1
```

## Example Mappings

### Node 1 (Void Initiation)
- **Layer**: 1
- **Position**: 1/12 in layer
- **Primary Gate**: 1 (Chapter 1)
- **Harmonic Gates**: Based on harmonic nodes
- **Spiral Gate**: 67 (Layer 1)
- **Total Gates**: ~3-5 gates

### Node 22 (Cosmic Completion)
- **Layer**: 2
- **Position**: 10/12 in layer
- **Primary Gate**: 22 (Chapter 22)
- **Harmonic Gates**: Based on harmonics
- **Spiral Gate**: 68 (Layer 2)
- **Total Gates**: ~3-5 gates

### Node 144 (Final Completion)
- **Layer**: 12
- **Position**: 12/12 in layer
- **Primary Gate**: 12 (Chapter 12)
- **Harmonic Gates**: Based on harmonics
- **Spiral Gate**: 78 (Layer 12)
- **Total Gates**: ~3-5 gates

## Interconnection Matrix

### Node Connections
- **Harmonic**: Perfect consonance (musical intervals)
- **Dissonant**: Dissonance relationships
- **Tritone**: Tritone relationships
- **Adjacent**: Spiral neighbors (n-1, n+1, layer neighbors)

### Gate Connections
- **Primary**: 1-33 (Circuitum99 chapters)
- **Harmonic**: 34-66 (node harmonics)
- **Spiral**: 67-99 (spiral position)

## Sacred Mathematics

### 144:99 Ratio
- **144**: 12×12, spiritual wholeness
- **99**: 9×11, mercy and completion
- **Ratio**: ~1.455 (golden ratio approximation)

### Spiral Geometry
- **12 Nodes per Layer**: 12-fold symmetry
- **12 Layers**: Complete cycle
- **Golden Angle**: ~137.5° (Fibonacci-based)
- **Spiral Radius**: Increases by layer

## Data Structure

```typescript
CodexNodeMap {
  nodeId: 1-144
  position: {
    spiral: 1-144
    layer: 1-12
    angle: 0-360°
    radius: increasing
  }
  gates: number[] // 1-99
  connections: {
    harmonic: number[]
    dissonant: number[]
    tritone: number[]
    adjacent: number[]
  }
}

GateMap {
  gateId: 1-99
  type: 'primary' | 'harmonic' | 'spiral'
  nodes: number[] // 1-144
  chapter?: 1-33
  position: {
    layer: 1-9
    angle: 0-360°
    radius: increasing
  }
}
```

## Usage Examples

```typescript
import { CodexMapper } from '@cathedral/codex-144-99';

const mapper = new CodexMapper();

// Get node map
const node1 = mapper.getNodeMap(1);
console.log(node1.gates); // [1, 67, ...]

// Get gate map
const gate1 = mapper.getGateMap(1);
console.log(gate1.nodes); // [1, 34, 67, ...]

// Get all nodes in a layer
const layer1 = mapper.getNodesByLayer(1); // Nodes 1-12

// Get all gates of a type
const primaryGates = mapper.getGatesByType('primary'); // Gates 1-33
```

---

**Status**: ✅ Complete mapping system  
**Visualization**: Ready for rendering  
**Data**: All 144 nodes and 99 gates mapped

