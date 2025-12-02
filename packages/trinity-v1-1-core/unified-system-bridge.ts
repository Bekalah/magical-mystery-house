/**
 * 🌉✨ UNIFIED SYSTEM BRIDGE
 *
 * Creates unified connections between all Cathedral systems.
 * Bridges 22 Arcanae, 99 Gates, Codex, Grimoire, Mystery House.
 *
 * @license CC0-1.0 - Public Domain
 */

import type { TrinityV11State } from './TrinityV11Core';
import ArcanaeConnector from './arcanae-connector';
import Circuitum99Connector from './circuitum99-connector';
import CodexConnector from './codex-connector';
import StoneGrimoireConnector from './stone-grimoire-connector';
import MysteryHouseConnector from './mystery-house-connector';

export interface UnifiedConnection {
  fromSystem: string;
  fromId: number | string;
  toSystem: string;
  toId: number | string;
  connectionStrength: number; // 0-1
  connectionType: 'arcana-gate' | 'gate-codex' | 'arcana-chapel' | 'chapel-room' | 'codex-room';
}

export class UnifiedSystemBridge {
  private arcanae: ArcanaeConnector;
  private gates: Circuitum99Connector;
  private codex: CodexConnector;
  private grimoire: StoneGrimoireConnector;
  private mysteryHouse: MysteryHouseConnector;
  private connections: UnifiedConnection[] = [];

  constructor() {
    this.arcanae = new ArcanaeConnector();
    this.gates = new Circuitum99Connector();
    this.codex = new CodexConnector();
    this.grimoire = new StoneGrimoireConnector();
    this.mysteryHouse = new MysteryHouseConnector();

    this.buildUnifiedConnections();
  }

  private buildUnifiedConnections(): void {
    // Connect Arcanae to Gates
    const arcanae = this.arcanae.getAllArcanae();
    for (const arcana of arcanae) {
      for (const gateId of arcana.gate_connections) {
        this.connections.push({
          fromSystem: 'arcanae',
          fromId: arcana.arcana_id,
          toSystem: 'gates',
          toId: gateId,
          connectionStrength: 0.8,
          connectionType: 'arcana-gate'
        });
      }
    }

    // Connect Gates to Codex
    const gates = this.gates.getAllGates();
    for (const gate of gates) {
      for (const codexNodeId of gate.codex_connections) {
        this.connections.push({
          fromSystem: 'gates',
          fromId: gate.gate_id,
          toSystem: 'codex',
          toId: codexNodeId,
          connectionStrength: 0.7,
          connectionType: 'gate-codex'
        });
      }
    }

    // Connect Arcanae to Chapels
    for (const arcana of arcanae) {
      for (const chapelId of arcana.chapel_connections) {
        this.connections.push({
          fromSystem: 'arcanae',
          fromId: arcana.arcana_id,
          toSystem: 'grimoire',
          toId: chapelId,
          connectionStrength: 0.75,
          connectionType: 'arcana-chapel'
        });
      }
    }

    // Connect Chapels to Rooms
    const chapels = this.grimoire.getAllChapels();
    const rooms = this.mysteryHouse.getAllRooms();

    for (const chapel of chapels) {
      const connectedRooms = rooms.filter(room =>
        room.chapel_connections.includes(chapel.chapel_id)
      );

      for (const room of connectedRooms) {
        this.connections.push({
          fromSystem: 'grimoire',
          fromId: chapel.chapel_id,
          toSystem: 'mystery-house',
          toId: room.room_id,
          connectionStrength: 0.7,
          connectionType: 'chapel-room'
        });
      }
    }

    // Connect Codex to Rooms
    const codexNodes = this.codex.getAllNodes();
    for (const node of codexNodes) {
      const connectedRooms = rooms.filter(room =>
        room.arcana_connections.some(arcanaId => {
          const arcana = arcanae.find(a => a.arcana_id === arcanaId);
          return arcana?.codex_connections.includes(node.node_id);
        })
      );

      for (const room of connectedRooms.slice(0, 2)) { // Limit connections
        this.connections.push({
          fromSystem: 'codex',
          fromId: node.node_id,
          toSystem: 'mystery-house',
          toId: room.room_id,
          connectionStrength: 0.6,
          connectionType: 'codex-room'
        });
      }
    }
  }

  public getAllConnections(): UnifiedConnection[] {
    return this.connections;
  }

  public getConnectionsByType(type: UnifiedConnection['connectionType']): UnifiedConnection[] {
    return this.connections.filter(conn => conn.connectionType === type);
  }

  public getConnectionsForSystem(system: string, id: number | string): UnifiedConnection[] {
    return this.connections.filter(conn =>
      (conn.fromSystem === system && conn.fromId === id) ||
      (conn.toSystem === system && conn.toId === id)
    );
  }

  public getConnectionStrength(system1: string, id1: number | string, system2: string, id2: number | string): number {
    const connection = this.connections.find(conn =>
      ((conn.fromSystem === system1 && conn.fromId === id1 && conn.toSystem === system2 && conn.toId === id2) ||
       (conn.fromSystem === system2 && conn.fromId === id2 && conn.toSystem === system1 && conn.toId === id1))
    );

    return connection?.connectionStrength || 0;
  }

  public integrateWithTrinityState(state: TrinityV11State): TrinityV11State {
    const updatedState = { ...state };

    // Calculate unified coherence based on all connections
    const totalConnections = this.connections.length;
    const avgStrength = this.connections.reduce((sum, conn) => sum + conn.connectionStrength, 0) / totalConnections;

    // Update brain consciousness based on connection strength
    updatedState.brain.consciousness_level = Math.min(
      999,
      Math.floor(updatedState.brain.consciousness_level * (1 + avgStrength * 0.05))
    );

    // Update soul wisdom based on connection completeness
    updatedState.soul.wisdom_accumulation = Math.min(
      100,
      Math.floor(updatedState.soul.wisdom_accumulation + (totalConnections / 100))
    );

    // Update body manifestation based on unified connections
    updatedState.body.manifestation_power = Math.min(
      100,
      Math.floor(updatedState.body.manifestation_power * (1 + avgStrength * 0.1))
    );

    return updatedState;
  }
}

export default UnifiedSystemBridge;

