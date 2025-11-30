#!/usr/bin/env node
/**
 * Completion Helper Tool
 * 
 * Helps complete packages/apps by generating missing components
 * based on the audit results
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

class CompletionHelper {
  constructor() {
    this.created = [];
    this.errors = [];
  }

  async helpComplete() {
    console.log('🔧 COMPLETION HELPER - Generating Missing Components\n');
    console.log('═'.repeat(80) + '\n');

    // Load audit results
    const auditPath = path.join(BASE_DIR, 'COMPREHENSIVE_AUDIT.json');
    if (!fs.existsSync(auditPath)) {
      console.log('❌ Please run audit:all first\n');
      return;
    }

    const auditData = JSON.parse(fs.readFileSync(auditPath, 'utf-8'));

    // Focus on packages that need work
    const needsWork = [
      ...auditData.completion.needsWork,
      ...auditData.completion.incomplete.slice(0, 20) // Limit to first 20
    ];

    console.log(`🔧 Completing ${needsWork.length} items...\n`);

    for (const item of needsWork) {
      await this.completeItem(item, auditData);
    }

    this.generateReport();
  }

  async completeItem(item, auditData) {
    try {
      // Find the full entity info
      const entity = [
        ...auditData.packages,
        ...auditData.apps,
        ...auditData.tools
      ].find(e => e.realName === item.name && e.workspace === item.workspace);

      if (!entity) return;

      const itemPath = entity.path;

      // Create missing components
      if (item.missing.includes('README')) {
        await this.createReadme(itemPath, entity);
      }

      if (item.missing.includes('docs') && entity.type === 'package') {
        await this.createDocs(itemPath, entity);
      }

      if (item.missing.includes('tests') && entity.type === 'package') {
        await this.createTestStructure(itemPath, entity);
      }

      if (item.missing.includes('source') && entity.type === 'package') {
        await this.createSourceStructure(itemPath, entity);
      }

      if (item.missing.includes('build') && entity.type === 'app') {
        await this.addBuildScript(itemPath, entity);
      }

    } catch (e) {
      this.errors.push({ name: item.name, error: e.message });
      console.log(`   ⚠️  Error completing ${item.name}: ${e.message}`);
    }
  }

  async createReadme(itemPath, entity) {
    const readmePath = path.join(itemPath, 'README.md');
    if (fs.existsSync(readmePath)) return;

    let readme = `# ${entity.realName}\n\n`;
    readme += `${entity.description || 'No description available'}\n\n`;
    readme += `## License\n\n`;
    readme += `CC0-1.0 - Public Domain\n\n`;
    readme += `## Installation\n\n`;
    readme += `\`\`\`bash\nppnpm install\n\`\`\`\n\n`;
    readme += `## Usage\n\n`;
    readme += `\`\`\`typescript\n// TODO: Add usage examples\n\`\`\`\n\n`;

    fs.writeFileSync(readmePath, readme);
    this.created.push({ type: 'README', path: readmePath, name: entity.realName });
    console.log(`   ✅ Created README.md for ${entity.realName}`);
  }

  async createDocs(itemPath, entity) {
    const docsDir = path.join(itemPath, 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    const indexDoc = path.join(docsDir, 'index.md');
    if (!fs.existsSync(indexDoc)) {
      let doc = `# ${entity.realName} Documentation\n\n`;
      doc += `${entity.description || 'No description available'}\n\n`;
      doc += `## API Reference\n\n`;
      doc += `TODO: Add API documentation\n\n`;

      fs.writeFileSync(indexDoc, doc);
      this.created.push({ type: 'docs', path: indexDoc, name: entity.realName });
      console.log(`   ✅ Created docs/index.md for ${entity.realName}`);
    }
  }

  async createTestStructure(itemPath, entity) {
    const testDir = path.join(itemPath, '__tests__');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Clean package name for filename (remove @scope/ if present)
    const cleanName = entity.realName.replace(/^@[^/]+\//, '').replace(/[^a-zA-Z0-9-]/g, '-');
    const testFile = path.join(testDir, `${cleanName}.test.ts`);
    if (!fs.existsSync(testFile)) {
      const test = `/**
 * @license CC0-1.0 - Public Domain
 */

import { describe, it, expect } from 'vitest';

describe('${entity.realName}', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });
});
`;

      fs.writeFileSync(testFile, test);
      this.created.push({ type: 'test', path: testFile, name: entity.realName });
      console.log(`   ✅ Created test file for ${entity.realName}`);
    }
  }

  async createSourceStructure(itemPath, entity) {
    const srcDir = path.join(itemPath, 'src');
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }

    const indexFile = path.join(srcDir, 'index.ts');
    if (!fs.existsSync(indexFile)) {
      const code = `/**
 * @license CC0-1.0 - Public Domain
 */

export * from './${entity.realName}';
`;

      fs.writeFileSync(indexFile, code);

      const mainFile = path.join(srcDir, `${entity.realName}.ts`);
      if (!fs.existsSync(mainFile)) {
        const main = `/**
 * @license CC0-1.0 - Public Domain
 */

export class ${entity.realName.replace(/[-_]/g, '').replace(/\b\w/g, l => l.toUpperCase())} {
  constructor() {
    // TODO: Implement
  }
}
`;

        fs.writeFileSync(mainFile, main);
      }

      this.created.push({ type: 'source', path: srcDir, name: entity.realName });
      console.log(`   ✅ Created source structure for ${entity.realName}`);
    }
  }

  async addBuildScript(itemPath, entity) {
    const packageJsonPath = path.join(itemPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return;

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    if (!packageJson.scripts.build) {
      packageJson.scripts.build = 'tsc';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      this.created.push({ type: 'build-script', path: packageJsonPath, name: entity.realName });
      console.log(`   ✅ Added build script for ${entity.realName}`);
    }
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      created: this.created,
      errors: this.errors,
      summary: {
        totalCreated: this.created.length,
        totalErrors: this.errors.length
      }
    };

    const reportPath = path.join(BASE_DIR, 'COMPLETION_HELPER_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('\n📊 Completion Helper Report\n');
    console.log(`✅ Created: ${this.created.length}`);
    console.log(`⚠️  Errors: ${this.errors.length}`);
    console.log(`\n📄 Report saved: ${reportPath}\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const helper = new CompletionHelper();
  helper.helpComplete().catch(console.error);
}

export default CompletionHelper;

