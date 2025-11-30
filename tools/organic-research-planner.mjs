#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */

/**
 * Organic Research & Planning Tool
 * 
 * Reflects a highly creative, nervous person's organic process:
 * - Momentary doubt phases
 * - Deep research and planning
 * - Organic, non-linear exploration
 * - Open world experience (not website-like)
 * - Trauma-aware, gentle approach
 * 
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();
const RESEARCH_DIR = path.join(BASE_DIR, 'docs', 'organic-research');
const PLANNING_DIR = path.join(BASE_DIR, 'docs', 'organic-planning');

// ND joy: Central to all tools - honors neurodivergent creative expression
class OrganicResearchPlanner {
  constructor() {
    this.ensureDirectories();
    this.doubtMoments = [];
    this.researchTopics = [];
    this.planningSessions = [];
  }

  ensureDirectories() {
    [RESEARCH_DIR, PLANNING_DIR].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Create a momentary doubt phase - organic, gentle, exploratory
   */
  async createDoubtMoment(context) {
    const timestamp = new Date().toISOString();
    const momentId = `doubt-${Date.now()}`;
    
    logger.info(`🤔 Creating organic doubt moment: ${momentId}`);
    
    const doubtMoment = {
      id: momentId,
      timestamp,
      context: context || 'General creative exploration',
      feelings: this.generateOrganicFeelings(),
      questions: this.generateOrganicQuestions(context),
      researchPaths: [],
      planningNeeds: [],
      nextSteps: []
    };

    // Save doubt moment
    const doubtFile = path.join(RESEARCH_DIR, `${momentId}.json`);
    fs.writeFileSync(doubtFile, JSON.stringify(doubtMoment, null, 2));
    
    this.doubtMoments.push(doubtMoment);
    
    logger.info(`✅ Doubt moment saved: ${doubtFile}`);
    
    return doubtMoment;
  }

  /**
   * Generate organic feelings - reflects creative nervousness
   */
  generateOrganicFeelings() {
    const feelings = [
      'uncertainty about direction',
      'wondering if this is the right path',
      'feeling overwhelmed by possibilities',
      'excitement mixed with anxiety',
      'curiosity about alternatives',
      'need to explore more deeply',
      'wanting to understand better',
      'feeling the need to pause and reflect'
    ];
    
    // Return 2-4 random feelings (organic, not systematic)
    const count = Math.floor(Math.random() * 3) + 2;
    const selected = [];
    for (let i = 0; i < count; i++) {
      const feeling = feelings[Math.floor(Math.random() * feelings.length)];
      if (!selected.includes(feeling)) {
        selected.push(feeling);
      }
    }
    
    return selected;
  }

  /**
   * Generate organic questions - open world exploration
   */
  generateOrganicQuestions(context) {
    const baseQuestions = [
      'What if we approached this differently?',
      'Is there a more beautiful way?',
      'What am I missing?',
      'How does this connect to everything else?',
      'What would feel more organic?',
      'Is this too structured? Too website-like?',
      'How can this be more like an open world?',
      'What would make this feel more alive?',
      'Are we honoring the creative process?',
      'Is this gentle enough? Following design protocols?',
      'What content aligns with Rebecca Respawn\'s vision?',
      'What patterns are misaligned and need clearing?',
      'How to make this more open world and less website-like?',
      'What sacred geometry is missing?',
      'What design protocols need adding?',
      'Is this flattened work making visionary art look flat?',
      'Do these pages look bad? How to upgrade to museum-grade?',
      'Does this content sound lame? How to make it inspiring?'
    ];
    
    const contextQuestions = context ? [
      `How does ${context} relate to the whole?`,
      `What would make ${context} more organic?`,
      `Is ${context} too rigid? Too flat?`,
      `How can ${context} be more exploratory?`
    ] : [];
    
    const allQuestions = [...baseQuestions, ...contextQuestions];
    const count = Math.floor(Math.random() * 4) + 3; // 3-6 questions
    const selected = [];
    
    for (let i = 0; i < count; i++) {
      const question = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      if (!selected.includes(question)) {
        selected.push(question);
      }
    }
    
    return selected;
  }

  /**
   * Conduct deep research - organic exploration
   */
  async conductResearch(doubtMoment, topic) {
    logger.info(`🔍 Conducting organic research: ${topic}`);
    
    const research = {
      id: `research-${Date.now()}`,
      timestamp: new Date().toISOString(),
      doubtMomentId: doubtMoment.id,
      topic,
      approach: this.generateResearchApproach(),
      sources: await this.findOrganicSources(topic),
      insights: [],
      connections: [],
      openWorldExplorations: [],
      nextResearchPaths: []
    };

    // Simulate organic research process
    research.insights = await this.generateInsights(topic);
    research.connections = await this.findConnections(topic);
    research.openWorldExplorations = await this.generateOpenWorldExplorations(topic);

    // Save research
    const researchFile = path.join(RESEARCH_DIR, `${research.id}.json`);
    fs.writeFileSync(researchFile, JSON.stringify(research, null, 2));
    
    doubtMoment.researchPaths.push(research);
    
    logger.info(`✅ Research saved: ${researchFile}`);
    
    return research;
  }

  /**
   * Generate research approach - organic, not systematic
   */
  generateResearchApproach() {
    const approaches = [
      'exploratory wandering through related concepts',
      'following intuitive connections',
      'deep diving into one aspect',
      'broad scanning across multiple domains',
      'following a thread that caught attention',
      'organic exploration of possibilities',
      'gentle investigation without pressure',
      'open-ended curiosity-driven research'
    ];
    
    return approaches[Math.floor(Math.random() * approaches.length)];
  }

  /**
   * Find organic sources - real research
   */
  async findOrganicSources(topic) {
    // Search for relevant files, docs, code
    const sources = [];
    
    const searchPaths = [
      path.join(BASE_DIR, 'docs'),
      path.join(BASE_DIR, 'packages'),
      path.join(BASE_DIR, 'tools')
    ];
    
    for (const searchPath of searchPaths) {
      if (fs.existsSync(searchPath)) {
        const files = this.findFiles(searchPath, ['.md', '.ts', '.js', '.json'], 2);
        for (const file of files.slice(0, 10)) {
          try {
            const content = fs.readFileSync(file, 'utf-8');
            if (content.toLowerCase().includes(topic.toLowerCase())) {
              sources.push({
                file: path.relative(BASE_DIR, file),
                relevance: 'found',
                excerpt: content.substring(0, 200)
              });
            }
          } catch (err) {
            // Skip files we can't read
          }
        }
      }
    }
    
    return sources.slice(0, 8); // Organic, not exhaustive
  }

  /**
   * Generate insights - organic understanding
   */
  async generateInsights(topic) {
    const insights = [
      `Understanding ${topic} requires organic exploration`,
      `This connects to multiple systems in unexpected ways`,
      `The creative process needs space for doubt and research`,
      `Open world experiences allow for non-linear discovery`,
      `Design protocols mean gentle, supportive, clear exploration`,
      `Organic processes feel more alive than structured ones`
    ];
    
    const count = Math.floor(Math.random() * 3) + 2;
    return insights.slice(0, count);
  }

  /**
   * Find connections - organic relationships
   */
  async findConnections(topic) {
    const connections = [
      'Connects to sacred mathematics',
      'Relates to consciousness levels',
      'Links to visionary art principles',
      'Touches on design protocols',
      'Connects to open world exploration',
      'Relates to organic creative process'
    ];
    
    const count = Math.floor(Math.random() * 3) + 2;
    return connections.slice(0, count);
  }

  /**
   * Generate open world explorations - not website-like
   */
  async generateOpenWorldExplorations(topic) {
    const explorations = [
      'How can this be explored freely, like an open world?',
      'What would make this feel less like a website?',
      'How can users wander and discover organically?',
      'What hidden paths and connections exist?',
      'How can this feel more alive and responsive?',
      'What would make exploration feel natural?'
    ];
    
    const count = Math.floor(Math.random() * 3) + 2;
    return explorations.slice(0, count);
  }

  /**
   * Create organic planning session
   */
  async createPlanningSession(doubtMoment, research) {
    logger.info(`📋 Creating organic planning session`);
    
    const planning = {
      id: `planning-${Date.now()}`,
      timestamp: new Date().toISOString(),
      doubtMomentId: doubtMoment.id,
      researchId: research.id,
      approach: 'organic, non-linear, exploratory',
      considerations: this.generatePlanningConsiderations(),
      paths: this.generatePlanningPaths(research),
      gentleNextSteps: this.generateGentleNextSteps(),
      openWorldElements: this.generateOpenWorldElements()
    };

    // Save planning
    const planningFile = path.join(PLANNING_DIR, `${planning.id}.json`);
    fs.writeFileSync(planningFile, JSON.stringify(planning, null, 2));
    
    doubtMoment.planningNeeds.push(planning);
    
    logger.info(`✅ Planning saved: ${planningFile}`);
    
    return planning;
  }

  /**
   * Generate planning considerations - design protocols
   */
  generatePlanningConsiderations() {
    return [
      'Keep it gentle and supportive',
      'Allow for organic exploration',
      'Make it feel like an open world, not a website',
      'Honor the creative process with doubt and research',
      'Support nervous energy with calm exploration',
      'Make every interaction feel alive and responsive',
      'Allow for non-linear discovery',
      'Create space for organic connections'
    ];
  }

  /**
   * Generate planning paths - multiple organic options
   */
  generatePlanningPaths(research) {
    const paths = [
      {
        name: 'Deep exploration path',
        description: 'Go deeper into one aspect',
        organic: true,
        openWorld: true
      },
      {
        name: 'Broad connection path',
        description: 'Explore connections across systems',
        organic: true,
        openWorld: true
      },
      {
        name: 'Gentle integration path',
        description: 'Slowly integrate insights',
        organic: true,
        traumaAware: true
      }
    ];
    
    return paths;
  }

  /**
   * Generate gentle next steps - design protocols
   */
  generateGentleNextSteps() {
    return [
      'Take a moment to breathe and reflect',
      'Explore one connection at a time',
      'Allow insights to settle organically',
      'No pressure, just gentle exploration',
      'Follow what feels right',
      'Honor the creative process'
    ];
  }

  /**
   * Generate open world elements
   */
  generateOpenWorldElements() {
    return [
      'Free exploration without rigid paths',
      'Hidden discoveries and connections',
      'Organic navigation that feels natural',
      'Responsive environment that adapts',
      'Multiple ways to approach everything',
      'Living, breathing experience'
    ];
  }

  /**
   * Find files recursively
   */
  findFiles(dir, extensions, maxDepth, currentDepth = 0) {
    if (currentDepth >= maxDepth) return [];
    
    const files = [];
    
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.includes('node_modules')) {
          files.push(...this.findFiles(fullPath, extensions, maxDepth, currentDepth + 1));
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          if (extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (err) {
      // Skip directories we can't read
    }
    
    return files;
  }

  /**
   * Save summary of organic process
   */
  async saveSummary() {
    const summary = {
      timestamp: new Date().toISOString(),
      doubtMoments: this.doubtMoments.length,
      researchSessions: this.researchTopics.length,
      planningSessions: this.planningSessions.length,
      approach: 'organic, creative, design protocols, open world',
      philosophy: 'Reflecting a highly creative, nervous person\'s organic process'
    };

    const summaryFile = path.join(RESEARCH_DIR, 'organic-process-summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    
    logger.info(`✅ Organic process summary saved: ${summaryFile}`);
  }
}

// Export for use in experiment runner
export default OrganicResearchPlanner;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const planner = new OrganicResearchPlanner();
  
  // Create a sample doubt moment
  planner.createDoubtMoment('Building cathedrals workflow')
    .then(doubtMoment => {
      return planner.conductResearch(doubtMoment, 'organic creative process');
    })
    .then(research => {
      logger.info('✅ Organic research and planning complete');
      return planner.saveSummary();
    })
    .catch(err => {
      logger.error(`Error in organic research: ${err.message}`);
    });
}

