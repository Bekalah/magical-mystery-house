/**
 * Sacred mathematics: 144:99 ratio, golden ratio, Fibonacci - foundational
 */
/**
 * ND joy: Central to all tools - honors neurodivergent creative expression
 */
/**
 * @author Rebecca Respawn
 */
/**
 * @license CC0-1.0 - Public Domain
 */

#!/usr/bin/env node

/**
 * Automated Documentation Generator
 * Automatically generates and updates documentation
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import EnhancedLogger from './enhanced-logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.path.dirname(__filename);
const BASE_DIR = path.join(__dirname, '..');

const logger = new EnhancedLogger();

logger.info('🔧 IMPROVEMENT: Creating Automated Documentation Generator');
logger.info('   → Auto-generates documentation from code');
logger.info('   → Updates README files automatically');
logger.info('   → Creates tool documentation\n');

function generateToolDocumentation() {
  logger.info('📝 Generating tool documentation...');
  
  const toolsDir = path.join(BASE_DIR, 'tools');
  const tools = fs.readdirSync(toolsDir)
    .filter(f => f.endsWith('.mjs') || f.endsWith('.js'))
    .map(f => {
      const toolPath = path.join(toolsDir, f);
      const content = fs.readFileSync(toolPath, 'utf-8');
      
      // Extract description from JSDoc
      const descMatch = content.match(/\/\*\*[\s\S]*?\*\s+(.+?)[\s\S]*?\*\//);
      const description = descMatch ? descMatch[1].trim() : 'No description';
      
      return {
        name: f.replace(/\.(mjs|js)$/, ''),
        file: f,
        description
      };
    });

  let doc = '# 🛠️ Tools Documentation\n\n';
  doc += '**Auto-generated**: ' + new Date().toISOString() + '\n\n';
  doc += 'Complete documentation for all tools in the `tools/` directory.\n\n';
  doc += '---\n\n';

  // Group by category
  const categories = {
    'Maintenance': ['self-maintain', 'maintain', 'cleanup', 'organize'],
    'Health & Monitoring': ['health', 'monitor', 'performance'],
    'Recovery': ['recover', 'error', 'backup'],
    'Integration': ['integrate', 'sync', 'update'],
    'Testing': ['test'],
    'Documentation': ['doc', 'generate', 'inventory'],
    'GitHub': ['github'],
    'Other': []
  };

  for (const [category, keywords] of Object.entries(categories)) {
    const categoryTools = tools.filter(tool => {
      if (category === 'Other') {
        return !Object.values(categories).flat().some(kw => 
          tool.name.toLowerCase().includes(kw.toLowerCase())
        );
      }
      return keywords.some(kw => tool.name.toLowerCase().includes(kw.toLowerCase()));
    });

    if (categoryTools.length > 0) {
      doc += `## ${category}\n\n`;
      for (const tool of categoryTools) {
        doc += `### ${tool.name}\n\n`;
        doc += `- **File**: \`tools/${tool.file}\`\n`;
        doc += `- **Description**: ${tool.description}\n\n`;
      }
    }
  }

  const docPath = path.join(BASE_DIR, 'docs/tools/TOOLS.md');
  const docDir = path.dirname(docPath);
  if (!fs.existsSync(docDir)) {
    fs.mkdirSync(docDir, { recursive: true });
  }
  fs.writeFileSync(docPath, doc, 'utf-8');

  logger.info(`   ✅ Generated: docs/tools/TOOLS.md (${tools.length} tools)\n`);
  return tools.length;
}

function generateCommandReference() {
  logger.info('📝 Generating command reference...');
  
  // Handle JSDoc header in package.json
  const packageJsonContent = fs.readFileSync(path.join(BASE_DIR, 'package.json'), 'utf-8');
  const jsonStart = packageJsonContent.indexOf('{');
  const packageJson = JSON.parse(packageJsonContent.substring(jsonStart));
  const scripts = packageJson.scripts || {};

  let doc = '# 📋 Command Reference\n\n';
  doc += '**Auto-generated**: ' + new Date().toISOString() + '\n\n';
  doc += 'Complete reference for all available commands.\n\n';
  doc += '---\n\n';

  // Group commands by category
  const categories = {
    'Maintenance': ['maintain', 'cleanup', 'organize'],
    'Health & Monitoring': ['health', 'monitor'],
    'Performance': ['optimize', 'performance'],
    'Recovery': ['recover', 'backup'],
    'Testing': ['test'],
    'Integration': ['integrate', 'sync', 'update', 'apply'],
    'Documentation': ['doc', 'inventory', 'reference'],
    'GitHub': ['github'],
    'Validation': ['validate', 'check'],
    'Other': []
  };

  for (const [category, keywords] of Object.entries(categories)) {
    const categoryScripts = Object.entries(scripts).filter(([name]) => {
      if (category === 'Other') {
        return !Object.values(categories).flat().some(kw => 
          name.toLowerCase().includes(kw.toLowerCase())
        );
      }
      return keywords.some(kw => name.toLowerCase().includes(kw.toLowerCase()));
    });

    if (categoryScripts.length > 0) {
      doc += `## ${category}\n\n`;
      for (const [name, command] of categoryScripts) {
        doc += `### \`pppnpm run ${name}\`\n\n`;
        doc += `\`\`\`bash\n${command}\n\`\`\`\n\n`;
      }
    }
  }

  const docPath = path.join(BASE_DIR, 'docs/COMMAND_REFERENCE.md');
  fs.writeFileSync(docPath, doc, 'utf-8');

  logger.info(`   ✅ Generated: docs/COMMAND_REFERENCE.md (${Object.keys(scripts).length} commands)\n`);
  return Object.keys(scripts).length;
}

function updateMainReadme() {
  logger.info('📝 Updating main README...');
  
  const readmePath = path.join(BASE_DIR, 'README.md');
  let readme = fs.readFileSync(readmePath, 'utf-8');

  // Update last updated timestamp
  const timestamp = new Date().toISOString();
  if (readme.includes('Last Updated')) {
    readme = readme.replace(/Last Updated[^\n]*/g, `Last Updated: ${new Date().toLocaleDateString()}`);
  }

  fs.writeFileSync(readmePath, readme, 'utf-8');
  logger.info(`   ✅ Updated: README.md\n`);
}

function generateAllDocumentation() {
  logger.info('🏛️✨ Automated Documentation Generation');
  logger.info('=============================================\n');

  const toolCount = generateToolDocumentation();
  const commandCount = generateCommandReference();
  updateMainReadme();

  logger.info('📊 Documentation Summary');
  logger.info('=============================================');
  logger.info(`✅ Tools documented: ${toolCount}`);
  logger.info(`✅ Commands documented: ${commandCount}`);
  logger.info(`✅ README updated`);

  logger.info('Documentation generated', { toolCount, commandCount });
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllDocumentation();
}

export { generateToolDocumentation, generateCommandReference, generateAllDocumentation };

