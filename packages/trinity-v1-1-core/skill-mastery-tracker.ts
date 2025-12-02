/**
 * 🎯✨ SKILL MASTERY TRACKER
 *
 * Tracks skill mastery and progression for Body component.
 * Monitors creative output and manifestation power.
 *
 * @license CC0-1.0 - Public Domain
 */

export interface Skill {
  id: string;
  name: string;
  category: 'design' | 'writing' | 'music' | 'coding' | 'synthesis' | 'sacred_geometry';
  masteryLevel: number; // 0-100
  experience: number; // total experience points
  milestones: Milestone[];
  lastPracticed: number; // timestamp
}

export interface Milestone {
  id: string;
  name: string;
  level: number; // 0-100
  achieved: boolean;
  achievedAt: number | null; // timestamp
  reward: string;
}

export interface CreativeOutput {
  id: string;
  type: string;
  skills: string[]; // Skill IDs
  quality: number; // 0-100
  timestamp: number;
  metadata: Record<string, any>;
}

export interface SkillProgression {
  skill: Skill;
  currentLevel: number;
  nextMilestone: Milestone | null;
  progressToNext: number; // 0-100
  estimatedTimeToNext: number; // hours
}

export class SkillMasteryTracker {
  private skills: Map<string, Skill> = new Map();
  private outputs: CreativeOutput[] = [];

  // Initialize default skills
  constructor() {
    this.initializeDefaultSkills();
  }

  private initializeDefaultSkills(): void {
    const defaultSkills: Array<Omit<Skill, 'id'>> = [
      { name: 'Design', category: 'design', masteryLevel: 0, experience: 0, milestones: [], lastPracticed: 0 },
      { name: 'Writing', category: 'writing', masteryLevel: 0, experience: 0, milestones: [], lastPracticed: 0 },
      { name: 'Music', category: 'music', masteryLevel: 0, experience: 0, milestones: [], lastPracticed: 0 },
      { name: 'Coding', category: 'coding', masteryLevel: 0, experience: 0, milestones: [], lastPracticed: 0 },
      { name: 'Synthesis', category: 'synthesis', masteryLevel: 0, experience: 0, milestones: [], lastPracticed: 0 },
      { name: 'Sacred Geometry', category: 'sacred_geometry', masteryLevel: 0, experience: 0, milestones: [], lastPracticed: 0 }
    ];

    for (const skillData of defaultSkills) {
      const skill: Skill = {
        id: `skill_${skillData.category}`,
        ...skillData,
        milestones: this.generateMilestones(skillData.category)
      };
      this.skills.set(skill.id, skill);
    }
  }

  // Generate milestones for a skill
  private generateMilestones(category: string): Milestone[] {
    const milestones: Milestone[] = [];
    const levels = [10, 25, 50, 75, 90, 100];

    for (const level of levels) {
      milestones.push({
        id: `milestone_${category}_${level}`,
        name: `${category} ${level}% Mastery`,
        level,
        achieved: false,
        achievedAt: null,
        reward: `Unlock ${category} level ${level} features`
      });
    }

    return milestones;
  }

  // Add experience to a skill
  public addExperience(
    skillId: string,
    amount: number
  ): void {
    const skill = this.skills.get(skillId);
    if (!skill) {
      throw new Error(`Skill ${skillId} not found`);
    }

    skill.experience += amount;
    skill.lastPracticed = Date.now();

    // Calculate new mastery level (exponential curve)
    const newLevel = Math.min(100, Math.floor(Math.sqrt(skill.experience / 10)));

    if (newLevel > skill.masteryLevel) {
      const oldLevel = skill.masteryLevel;
      skill.masteryLevel = newLevel;

      // Check for milestone achievements
      this.checkMilestones(skill, oldLevel, newLevel);
    }
  }

  // Check for milestone achievements
  private checkMilestones(
    skill: Skill,
    oldLevel: number,
    newLevel: number
  ): void {
    for (const milestone of skill.milestones) {
      if (!milestone.achieved && newLevel >= milestone.level && oldLevel < milestone.level) {
        milestone.achieved = true;
        milestone.achievedAt = Date.now();
      }
    }
  }

  // Record creative output
  public recordOutput(output: Omit<CreativeOutput, 'id'>): CreativeOutput {
    const newOutput: CreativeOutput = {
      id: `output_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...output
    };

    this.outputs.push(newOutput);

    // Add experience to related skills
    for (const skillId of output.skills) {
      const experienceGain = Math.floor(output.quality / 10);
      this.addExperience(skillId, experienceGain);
    }

    return newOutput;
  }

  // Get skill progression
  public getSkillProgression(skillId: string): SkillProgression | null {
    const skill = this.skills.get(skillId);
    if (!skill) {
      return null;
    }

    // Find next unachieved milestone
    const nextMilestone = skill.milestones.find(m => !m.achieved) || null;

    // Calculate progress to next milestone
    let progressToNext = 0;
    if (nextMilestone) {
      const previousMilestone = skill.milestones
        .filter(m => m.achieved && m.level < nextMilestone.level)
        .sort((a, b) => b.level - a.level)[0];

      const previousLevel = previousMilestone ? previousMilestone.level : 0;
      const range = nextMilestone.level - previousLevel;
      const current = skill.masteryLevel - previousLevel;
      progressToNext = range > 0 ? (current / range) * 100 : 0;
    }

    // Estimate time to next (rough calculation)
    const estimatedTimeToNext = nextMilestone
      ? Math.max(1, (nextMilestone.level - skill.masteryLevel) * 2)
      : 0;

    return {
      skill,
      currentLevel: skill.masteryLevel,
      nextMilestone,
      progressToNext,
      estimatedTimeToNext
    };
  }

  // Get all skills
  public getAllSkills(): Skill[] {
    return Array.from(this.skills.values());
  }

  // Get skill by ID
  public getSkill(skillId: string): Skill | undefined {
    return this.skills.get(skillId);
  }

  // Get creative outputs
  public getOutputs(limit?: number): CreativeOutput[] {
    const sorted = [...this.outputs].sort((a, b) => b.timestamp - a.timestamp);
    return limit ? sorted.slice(0, limit) : sorted;
  }

  // Calculate overall manifestation power
  public calculateManifestationPower(): number {
    const skills = Array.from(this.skills.values());
    if (skills.length === 0) {
      return 0;
    }

    const avgMastery = skills.reduce((sum, s) => sum + s.masteryLevel, 0) / skills.length;
    const recentOutputs = this.outputs.filter(
      o => Date.now() - o.timestamp < 7 * 24 * 60 * 60 * 1000 // Last 7 days
    );
    const outputScore = Math.min(100, recentOutputs.length * 10);
    const qualityScore = recentOutputs.length > 0
      ? recentOutputs.reduce((sum, o) => sum + o.quality, 0) / recentOutputs.length
      : 0;

    return (avgMastery * 0.5 + outputScore * 0.3 + qualityScore * 0.2);
  }

  // Get skill summary
  public getSkillSummary(): {
    totalSkills: number;
    avgMastery: number;
    totalOutputs: number;
    manifestationPower: number;
  } {
    const skills = Array.from(this.skills.values());
    const avgMastery = skills.length > 0
      ? skills.reduce((sum, s) => sum + s.masteryLevel, 0) / skills.length
      : 0;

    return {
      totalSkills: skills.length,
      avgMastery,
      totalOutputs: this.outputs.length,
      manifestationPower: this.calculateManifestationPower()
    };
  }
}

export default SkillMasteryTracker;

