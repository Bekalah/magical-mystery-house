#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 */
/**
 * Discover Influences Tool
 * 
 * Finds references to people you follow and their work
 * Documents how their work influences your systems
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

class InfluenceDiscoverer
  // ND joy: Central to all tools - honors neurodivergent creative expression {
  constructor() {
    this.influences = {
      // Artists & Visionaries
      'Hilma af Klint': [],
      'Leonora Carrington': [],
      'Emma Kunz': [],
      
      // Mystics & Occultists
      'Dion Fortune': [],
      'Aleister Crowley': [],
      'Agrippa': [],
      'John Dee': [],
      'Paul Foster Case': [],
      'Rudolf Steiner': [],
      'Frater Achad': [],
      
      // Modern Researchers
      'Ronald Hutton': [],
      
      // Other potential influences
      'Andrew Gonzalez': [],
      'Gabor Maté': [],
      'Paul Levy': [],
      'Robert Falconer': []
    };

    this.influencePatterns = {
      'Hilma af Klint': [
        /hilma\s+af\s+klint/i,
        /hilma/i,
        /af\s+klint/i,
        /sacred\s+visionary\s+temple/i,
        /spiral\s+diagrams/i
      ],
      'Leonora Carrington': [
        /leonora\s+carrington/i,
        /carrington/i,
        /surreal\s+dream\s+logic/i,
        /feminine\s+grotesque/i,
        /celtic.*mexican\s+synthesis/i
      ],
      'Emma Kunz': [
        /emma\s+kunz/i,
        /kunz/i,
        /pendulum\s+art/i,
        /geometric\s+drawings.*healing/i,
        /sacred\s+geometry.*emma/i
      ],
      'Dion Fortune': [
        /dion\s+fortune/i,
        /fortune/i,
        /sea\s+priestess/i,
        /avalon\s+realms/i,
        /mystical\s+priestess/i
      ],
      'Aleister Crowley': [
        /aleister\s+crowley/i,
        /crowley/i,
        /thoth\s+system/i,
        /moon\s+child/i,
        /hierophant.*max\s+ernst/i
      ],
      'Agrippa': [
        /agrippa/i,
        /three\s+books/i,
        /henry\s+cornelius\s+agrippa/i
      ],
      'John Dee': [
        /john\s+dee/i,
        /dee/i,
        /monas\s+hieroglyphica/i,
        /enochian/i,
        /mathematics.*mystical/i
      ],
      'Paul Foster Case': [
        /paul\s+foster\s+case/i,
        /case/i,
        /b\.o\.t\.a\./i,
        /bota/i,
        /cube\s+of\s+space/i,
        /color\s+scales/i
      ],
      'Rudolf Steiner': [
        /rudolf\s+steiner/i,
        /steiner/i,
        /anthroposophical/i,
        /eurythmic/i,
        /color\s+theory.*steiner/i
      ],
      'Frater Achad': [
        /frater\s+achad/i,
        /achad/i
      ],
      'Ronald Hutton': [
        /ronald\s+hutton/i,
        /hutton/i,
        /british\s+mysticism/i
      ],
      'Andrew Gonzalez': [
        /andrew\s+gonzalez/i,
        /gonzalez/i,
        /sacred\s+anatomy/i
      ],
      'Gabor Maté': [
        /gabor\s+mat[ée]/i,
        /mat[ée]/i,
        /trauma.*medicine/i
      ],
      'Paul Levy': [
        /paul\s+levy/i,
        /levy/i,
        /wetiko/i
      ],
      'Robert Falconer': [
        /robert\s+falconer/i,
        /falconer/i,
        /daimon/i
      ]
    };
  }

  async discover() {
    logger.info('🔍 Discovering people you follow and their influences...');

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

    return this.influences;
  }

  async scanWorkspace(rootPath) {
    const textExtensions = ['.md', '.txt', '.js', '.ts', '.json', '.yaml', '.yml'];
    const excludeDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];

    const scanDir = async (dir, depth = 0) => {
      if (depth > 10) return;

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

      for (const [person, patterns] of Object.entries(this.influencePatterns)) {
        for (const pattern of patterns) {
          lines.forEach((line, index) => {
            if (pattern.test(line)) {
              // Check if we already have this reference
              const existing = this.influences[person].find(
                ref => ref.file === filePath && ref.line === index + 1
              );

              if (!existing) {
                this.influences[person].push({
                  text: line.trim(),
                  file: filePath,
                  line: index + 1,
                  context: this.getContext(lines, index)
                });
              }
            }
          });
        }
      }
    } catch (error) {
      // Skip files we can't read
    }
  }

  getContext(lines, index, contextSize = 2) {
    const start = Math.max(0, index - contextSize);
    const end = Math.min(lines.length, index + contextSize + 1);
    return lines.slice(start, end).map((line, i) => ({
      line: start + i + 1,
      text: line.trim()
    }));
  }

  generateReport() {
    const report = {
      summary: {},
      influences: {},
      integrationSuggestions: []
    };

    for (const [person, references] of Object.entries(this.influences)) {
      report.summary[person] = references.length;
      report.influences[person] = references.slice(0, 10); // Top 10 references

      if (references.length > 0) {
        report.integrationSuggestions.push({
          person,
          count: references.length,
          suggestion: `Integrate ${person}'s work more deeply into your systems`
        });
      }
    }

    return report;
  }
}

// Main execution
async function main() {
  const discoverer = new InfluenceDiscoverer();
  await discoverer.discover();
  const report = discoverer.generateReport();

  const totalReferences = Object.values(report.summary).reduce((sum, count) => sum + count, 0);
  logger.info(`✨ Found ${totalReferences} references to people you follow`);

  // Save to file
  const fs = await import('fs');
  const reportPath = join(__dirname, '..', 'docs', 'INFLUENCES_DISCOVERY.json');
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

export { InfluenceDiscoverer };

