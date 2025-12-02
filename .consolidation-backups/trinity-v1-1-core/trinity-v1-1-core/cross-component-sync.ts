/**
 * 🔄✨ CROSS-COMPONENT SYNC
 *
 * Synchronizes state across Brain, Soul, and Body components.
 * Ensures real-time coherence and shared context.
 *
 * @license CC0-1.0 - Public Domain
 */

import type { TrinityV11State } from './TrinityV11Core';
import MemoryPalaceManager from './memory-palace-manager';
import NarrativeThreadManager from './narrative-thread-manager';
import SkillMasteryTracker from './skill-mastery-tracker';
import FlowStateDetector from './flow-state-detector';

export interface SyncEvent {
  timestamp: number;
  component: 'brain' | 'soul' | 'body';
  event: string;
  data: Record<string, any>;
}

export interface SharedContext {
  currentFlowState: number; // 0-100
  activeMemoryRooms: string[];
  activeNarrativeThreads: string[];
  activeSkills: string[];
  coherence: number; // 0-1
}

export class CrossComponentSync {
  private syncHistory: SyncEvent[] = [];
  private sharedContext: SharedContext;
  private memoryPalace: MemoryPalaceManager;
  private narrativeThreads: NarrativeThreadManager;
  private skillTracker: SkillMasteryTracker;

  constructor() {
    this.sharedContext = {
      currentFlowState: 0,
      activeMemoryRooms: [],
      activeNarrativeThreads: [],
      activeSkills: [],
      coherence: 0.5
    };
    this.memoryPalace = new MemoryPalaceManager();
    this.narrativeThreads = new NarrativeThreadManager();
    this.skillTracker = new SkillMasteryTracker();
  }

  // Sync state across all components
  public syncState(state: TrinityV11State): TrinityV11State {
    const syncedState = { ...state };

    // Sync Brain → Soul
    if (state.brain.flow_state.active) {
      const flowDepth = state.brain.flow_state.depth;
      this.sharedContext.currentFlowState = flowDepth;

      // Create memory of flow state
      const flowRoom = this.memoryPalace.createRoom(
        `Flow State ${Date.now()}`,
        'creative_flow'
      );
      this.sharedContext.activeMemoryRooms.push(flowRoom.id);

      this.recordSync('brain', 'flow_state_detected', {
        depth: flowDepth,
        roomId: flowRoom.id
      });
    }

    // Sync Soul → Brain
    const storyFlow = this.narrativeThreads.getStoryFlow();
    if (storyFlow.activeThread) {
      // Add narrative pattern to creative tendencies
      syncedState.brain.pattern_recognition.creative_tendencies.push({
        id: `narrative_${storyFlow.activeThread}`,
        tendency: 'narrative_storytelling',
        strength: Math.floor(storyFlow.coherence * 100)
      });

      this.recordSync('soul', 'narrative_active', {
        threadId: storyFlow.activeThread,
        coherence: storyFlow.coherence
      });
    }

    // Sync Body → Brain
    const skillSummary = this.skillTracker.getSkillSummary();
    syncedState.brain.creative_energy = Math.min(
      100,
      Math.floor(skillSummary.manifestationPower)
    );

    this.recordSync('body', 'skill_manifestation', {
      manifestationPower: skillSummary.manifestationPower,
      avgMastery: skillSummary.avgMastery
    });

    // Sync Brain → Body
    if (state.brain.flow_state.active) {
      // Map flow_quality to FlowStateMetrics quality type
      const qualityMap: Record<string, 'novice' | 'apprentice' | 'adept' | 'master' | 'transcendent'> = {
        'novice': 'novice',
        'developing': 'apprentice',
        'master': 'master',
        'transcendent': 'transcendent'
      };
      const mappedQuality = qualityMap[state.brain.flow_state.flow_quality] || 'novice';

      const flowScore = FlowStateDetector.calculateFlowScore({
        depth: state.brain.flow_state.depth,
        duration: state.brain.flow_state.duration,
        quality: mappedQuality,
        creativeAcceleration: state.brain.flow_state.creative_acceleration,
        obstacles: [],
        optimalConditions: []
      });

      // Boost skill experience during flow
      for (const skill of this.skillTracker.getAllSkills()) {
        this.skillTracker.addExperience(skill.id, Math.floor(flowScore / 10));
      }
    }

    // Update shared context coherence
    this.sharedContext.coherence = this.calculateCoherence(syncedState);

    return syncedState;
  }

  // Record sync event
  private recordSync(
    component: 'brain' | 'soul' | 'body',
    event: string,
    data: Record<string, any>
  ): void {
    this.syncHistory.push({
      timestamp: Date.now(),
      component,
      event,
      data
    });

    // Keep only last 100 events
    if (this.syncHistory.length > 100) {
      this.syncHistory.shift();
    }
  }

  // Calculate overall coherence
  private calculateCoherence(state: TrinityV11State): number {
    const brainCoherence = state.brain.flow_state.active ? 0.8 : 0.5;
    const soulCoherence = state.soul.narrative_threads.length > 0 ? 0.7 : 0.4;
    const bodyCoherence = state.body.manifestation_power > 50 ? 0.7 : 0.4;

    return (brainCoherence * 0.4 + soulCoherence * 0.3 + bodyCoherence * 0.3);
  }

  // Get shared context
  public getSharedContext(): SharedContext {
    return { ...this.sharedContext };
  }

  // Get sync history
  public getSyncHistory(limit?: number): SyncEvent[] {
    const sorted = [...this.syncHistory].sort((a, b) => b.timestamp - a.timestamp);
    return limit ? sorted.slice(0, limit) : sorted;
  }

  // Get component managers
  public getMemoryPalace(): MemoryPalaceManager {
    return this.memoryPalace;
  }

  public getNarrativeThreads(): NarrativeThreadManager {
    return this.narrativeThreads;
  }

  public getSkillTracker(): SkillMasteryTracker {
    return this.skillTracker;
  }

  // Optimize cross-component connections
  public optimizeConnections(state: TrinityV11State): {
    recommendations: string[];
    expectedImpact: number;
  } {
    const recommendations: string[] = [];
    let expectedImpact = 0;

    // Check Brain-Soul connection
    if (state.brain.flow_state.active && state.soul.narrative_threads.length === 0) {
      recommendations.push('Create narrative thread during flow state for enhanced coherence');
      expectedImpact += 20;
    }

    // Check Soul-Body connection
    if (state.soul.wisdom_accumulation > 50 && state.body.manifestation_power < 30) {
      recommendations.push('Apply accumulated wisdom to increase manifestation power');
      expectedImpact += 25;
    }

    // Check Brain-Body connection
    if (state.brain.creative_energy > 70 && state.body.manifestation_power < 50) {
      recommendations.push('Channel high creative energy into skill practice');
      expectedImpact += 30;
    }

    return {
      recommendations,
      expectedImpact: Math.min(100, expectedImpact)
    };
  }
}

export default CrossComponentSync;

