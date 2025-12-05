#!/usr/bin/env node
/**
 * Comprehensive Security Audit
 * 
 * Scans all code for security issues, vulnerabilities, and unsafe patterns
 * across all repos and directories.
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REPORTS_DIR = path.join(rootDir, 'docs/reports/3-hour');

/**
 * Scan for security issues
 */
function scanSecurityIssues() {
  const issues = {
    eval: [],
    xss: [],
    unsafe: [],
    secrets: [],
    injection: []
  };
  
  function scanFile(filePath: string) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(rootDir, filePath);
      
      // Check for eval
      if (content.includes('eval(') || content.includes('Function(')) {
        issues.eval.push(relativePath);
      }
      
      // Check for XSS patterns
      if (content.includes('innerHTML') || content.includes('dangerouslySetInnerHTML')) {
        issues.xss.push(relativePath);
      }
      
      // Check for unsafe patterns
      if (content.includes('require(') && content.includes('child_process')) {
        issues.unsafe.push(relativePath);
      }
      
      // Check for potential secrets
      if (content.match(/password\s*[:=]\s*['"]/i) || content.match(/api[_-]?key\s*[:=]\s*['"]/i)) {
        issues.secrets.push(relativePath);
      }
      
      // Check for SQL injection patterns
      if (content.includes('query(') && content.includes('${')) {
        issues.injection.push(relativePath);
      }
    } catch (e) {
      // Skip if can't read
    }
  }
  
  function scanDirectory(dir: string, depth = 0, maxDepth = 5) {
    if (depth > maxDepth) return;
    
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      items.forEach(item => {
        const itemPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          if (!item.name.startsWith('.') && item.name !== 'node_modules') {
            scanDirectory(itemPath, depth + 1, maxDepth);
          }
        } else if (item.isFile()) {
          const ext = path.extname(item.name);
          if (['.js', '.ts', '.jsx', '.tsx', '.mjs'].includes(ext)) {
            scanFile(itemPath);
          }
        }
      });
    } catch (e) {
      // Skip if can't read
    }
  }
  
  // Scan packages and apps
  ['packages', 'apps', 'scripts', 'tools'].forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath)) {
      scanDirectory(dirPath);
    }
  });
  
  return issues;
}

/**
 * Generate security report
 */
function generateSecurityReport(issues: any) {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }
  
  const totalIssues = Object.values(issues).reduce((sum: number, arr: any) => sum + arr.length, 0);
  
  const report = `# Comprehensive Security Audit Report

**Generated**: ${new Date().toISOString()}
**Total Issues Found**: ${totalIssues}

---

## Security Issues by Category

### Eval Usage (${issues.eval.length})
${issues.eval.length > 0 ? issues.eval.map((f: string) => `- ⚠️  ${f}`).join('\n') : '- ✅ No eval usage found'}

### XSS Vulnerabilities (${issues.xss.length})
${issues.xss.length > 0 ? issues.xss.map((f: string) => `- ⚠️  ${f}`).join('\n') : '- ✅ No XSS patterns found'}

### Unsafe Patterns (${issues.unsafe.length})
${issues.unsafe.length > 0 ? issues.unsafe.map((f: string) => `- ⚠️  ${f}`).join('\n') : '- ✅ No unsafe patterns found'}

### Potential Secrets (${issues.secrets.length})
${issues.secrets.length > 0 ? issues.secrets.map((f: string) => `- ⚠️  ${f}`).join('\n') : '- ✅ No hardcoded secrets found'}

### Injection Risks (${issues.injection.length})
${issues.injection.length > 0 ? issues.injection.map((f: string) => `- ⚠️  ${f}`).join('\n') : '- ✅ No injection risks found'}

---

## Recommendations

1. **Replace eval()**: Use safer alternatives like JSON.parse() or Function constructors with validation
2. **Sanitize HTML**: Use DOMPurify or similar for innerHTML
3. **Validate Input**: Always validate and sanitize user input
4. **Use Environment Variables**: Move secrets to environment variables
5. **Parameterized Queries**: Use parameterized queries for database operations

---

**This report identifies security issues that need attention.**
`;

  fs.writeFileSync(path.join(REPORTS_DIR, 'security-report.md'), report, 'utf-8');
  console.log('✅ Security report generated');
  
  return totalIssues;
}

// Main execution
const issues = scanSecurityIssues();
const totalIssues = generateSecurityReport(issues);

console.log('\n🔒 Security Audit Complete');
console.log(`   Total Issues: ${totalIssues}`);
console.log(`   Eval: ${issues.eval.length}`);
console.log(`   XSS: ${issues.xss.length}`);
console.log(`   Unsafe: ${issues.unsafe.length}`);
console.log(`   Secrets: ${issues.secrets.length}`);
console.log(`   Injection: ${issues.injection.length}`);
console.log(`   Report: docs/reports/3-hour/security-report.md\n`);

process.exit(totalIssues > 0 ? 1 : 0);

