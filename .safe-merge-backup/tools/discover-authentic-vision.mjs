#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Discover Authentic Vision Tool
 * 
 * Finds your real ideas, inspirations, passions, and goals across all repositories
 * Discovers what drives you and what you're building toward
 * 
 * @license CC0-1.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { join, extname } = path;

const logger = new EnhancedLogger();

class AuthenticVisionDiscoverer
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.visionData = {
      ideas: [],
      inspirations: [],
      passions: [],
      goals: [],
      personalNotes: [],
      creativeStatements: [],
      timestamp: new Date().toISOString()
    };
    
    this.searchPatterns = {
      ideas: [
        /my idea/i,
        /i want to/i,
        /i'm building/i,
        /i'm creating/i,
        /vision/i,
        /dream/i,
        /aspiration/i
      ],
      inspirations: [
        /inspired by/i,
        /influence/i,
        /following/i,
        /studying/i,
        /research/i,
        /learned from/i
      ],
      passions: [
        /passion/i,
        /love/i,
        /excited about/i,
        /deeply interested/i,
        /fascinated by/i
      ],
      goals: [
        /goal/i,
        /purpose/i,
        /mission/i,
        /aim/i,
        /objective/i,
        /want to achieve/i
      ]
    };
  }

  async discover() {
    logger.info('🔍 Discovering your authentic vision, ideas, inspirations, passions, and goals...');
    
    const workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean',
      '/Users/rebeccalemke/Roo-Code'
    ];

    for (const workspace of workspaces) {
      try {
        await this.scanWorkspace(workspace);
      } catch (error) {
        logger.warning(`Could not scan ${workspace}: ${error.message}`);
      }
    }

    // Also check for personal notes files
    await this.findPersonalNotes();

    return this.visionData;
  }

  async scanWorkspace(rootPath) {
    const textExtensions = ['.md', '.txt', '.js', '.ts', '.json', '.yaml', '.yml'];
    const excludeDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];

    const scanDir = async (dir, depth = 0) => {
      if (depth > 10) return; // Prevent infinite recursion

      try {
        const entries = readdirSync(dir);
        
        for (const entry of entries) {
          if (excludeDirs.includes(entry)) continue;

          const fullPath = join(dir, entry);
          const stat = statSync(fullPath);

          if (stat.isDirectory()) {
            await scanDir(fullPath, depth + 1);
          } else if (stat.isFile() && textExtensions.includes(extname(entry))) {
            await this.analyzeFile(fullPath);
          }
        }
      } catch (error) {
        // Skip files we can't read
      }
    };

    await scanDir(rootPath);
  }

  async analyzeFile(filePath) {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        // Check for ideas
        if (this.searchPatterns.ideas.some(pattern => pattern.test(line))) {
          this.visionData.ideas.push({
            text: line.trim(),
            file: filePath,
            line: index + 1
          });
        }

        // Check for inspirations
        if (this.searchPatterns.inspirations.some(pattern => pattern.test(line))) {
          this.visionData.inspirations.push({
            text: line.trim(),
            file: filePath,
            line: index + 1
          });
        }

        // Check for passions
        if (this.searchPatterns.passions.some(pattern => pattern.test(line))) {
          this.visionData.passions.push({
            text: line.trim(),
            file: filePath,
            line: index + 1
          });
        }

        // Check for goals
        if (this.searchPatterns.goals.some(pattern => pattern.test(line))) {
          this.visionData.goals.push({
            text: line.trim(),
            file: filePath,
            line: index + 1
          });
        }
      });
    } catch (error) {
      // Skip files we can't read
    }
  }

  async findPersonalNotes() {
    const noteFiles = [
      'PERSONAL_NOTES.md',
      'MY_VISION.md',
      'GOALS.md',
      'IDEAS.md',
      'INSPIRATIONS.md',
      'PASSIONS.md',
      'README.md',
      'VISION.md'
    ];

    const workspaces = [
      '/Users/rebeccalemke/cathedral-master-deployment',
      '/Users/rebeccalemke/cathedral-real',
      '/Users/rebeccalemke/cathedral-fixed-clean'
    ];

    for (const workspace of workspaces) {
      for (const noteFile of noteFiles) {
        try {
          const filePath = join(workspace, noteFile);
          const content = readFileSync(filePath, 'utf-8');
          
          this.visionData.personalNotes.push({
            file: filePath,
            content: content.substring(0, 1000) // First 1000 chars
          });
        } catch (error) {
          // File doesn't exist, skip
        }
      }
    }
  }

  generateReport() {
    const report = {
      summary: {
        ideasFound: this.visionData.ideas.length,
        inspirationsFound: this.visionData.inspirations.length,
        passionsFound: this.visionData.passions.length,
        goalsFound: this.visionData.goals.length,
        personalNotesFound: this.visionData.personalNotes.length
      },
      ideas: this.visionData.ideas.slice(0, 20), // Top 20
      inspirations: this.visionData.inspirations.slice(0, 20),
      passions: this.visionData.passions.slice(0, 20),
      goals: this.visionData.goals.slice(0, 20),
      personalNotes: this.visionData.personalNotes
    };

    return report;
  }
}

// Main execution
async function main() {
  const discoverer = new AuthenticVisionDiscoverer();
  await discoverer.discover();
  const report = discoverer.generateReport();

  logger.info(`✨ Discovered ${report.summary.ideasFound} ideas, ${report.summary.inspirationsFound} inspirations, ${report.summary.passionsFound} passions, ${report.summary.goalsFound} goals`);

  // Save to file
  const fs = await import('fs');
  const reportPath = join(__dirname, '..', 'docs', 'AUTHENTIC_VISION_DISCOVERY.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  logger.success(`📄 Report saved to ${reportPath}`);

  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    logger.error(`Discovery failed: ${error.message}`);
    process.exit(1);
  });
}

export { AuthenticVisionDiscoverer };

