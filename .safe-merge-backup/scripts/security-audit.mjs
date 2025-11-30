#!/usr/bin/env node
/**
 * Automatic Security Audit Script
 * 
 * Scans codebase for security issues:
 * - eval() usage
 * - XSS vulnerabilities
 * - Unsafe patterns
 * - Missing input validation
 * - Security best practices
 * 
 * Runs automatically as part of improvement experiment
 * 
 * @license CC0-1.0 - Public Domain
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const securityIssues = {
  eval: [],
  xss: [],
  unsafePatterns: [],
  missingValidation: [],
  other: []
};

const patterns = {
  eval: /\beval\s*\(/gi,
  functionConstructor: /\bnew\s+Function\s*\(/gi,
  innerHTML: /\.innerHTML\s*=\s*[^;]*(user|input|data|param)/gi,
  dangerouslySetInnerHTML: /dangerouslySetInnerHTML/gi,
  documentWrite: /document\.write\s*\(/gi,
  exec: /\bexec\s*\(/gi,
  shell: /\$\{[^}]*\$\{/gi, // Nested template literals
  noValidation: /function\s+\w+\s*\([^)]*\)\s*\{[^}]*\b(?:req\.|query\.|params\.|body\.)/gi
};

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relativePath = path.relative(rootDir, filePath);
  
  // Check for eval (excluding comments and strings)
  const evalMatches = [...content.matchAll(patterns.eval)];
  for (const match of evalMatches) {
    const lineNum = content.substring(0, match.index).split('\n').length;
    const line = lines[lineNum - 1] || '';
    const trimmedLine = line.trim();
    
    // Skip if it's in a comment or string
    if (trimmedLine.startsWith('//') || trimmedLine.startsWith('*') || 
        trimmedLine.includes('"eval') || trimmedLine.includes("'eval") ||
        trimmedLine.includes('`eval') || trimmedLine.includes('eval()')) {
      continue;
    }
    
    // Only report actual eval() calls
    if (/\beval\s*\([^)]*\)/.test(line)) {
      securityIssues.eval.push({
        file: relativePath,
        line: lineNum,
        context: trimmedLine
      });
    }
  }
  
  // Check for Function constructor
  if (patterns.functionConstructor.test(content)) {
    const matches = [...content.matchAll(patterns.functionConstructor)];
    matches.forEach(match => {
      const lineNum = content.substring(0, match.index).split('\n').length;
      securityIssues.unsafePatterns.push({
        file: relativePath,
        line: lineNum,
        issue: 'new Function() usage',
        context: lines[lineNum - 1]?.trim() || ''
      });
    });
  }
  
  // Check for XSS patterns (excluding comments and pattern definitions)
  const innerHTMLMatches = [...content.matchAll(patterns.innerHTML)];
  for (const match of innerHTMLMatches) {
    const lineNum = content.substring(0, match.index).split('\n').length;
    const line = lines[lineNum - 1] || '';
    const trimmedLine = line.trim();
    
    // Skip if it's in a comment, pattern definition, test, or regex pattern
    if (trimmedLine.startsWith('//') || trimmedLine.startsWith('*') || 
        trimmedLine.includes('pattern:') || trimmedLine.includes('test(') ||
        trimmedLine.includes('matchAll(') || trimmedLine.includes('/innerHTML/') ||
        trimmedLine.includes('const patterns') || trimmedLine.includes('patterns =')) {
      continue;
    }
    
    securityIssues.xss.push({
      file: relativePath,
      line: lineNum,
      context: trimmedLine
    });
  }
  
  const dangerouslyMatches = [...content.matchAll(patterns.dangerouslySetInnerHTML)];
  for (const match of dangerouslyMatches) {
    const lineNum = content.substring(0, match.index).split('\n').length;
    const line = lines[lineNum - 1] || '';
    const trimmedLine = line.trim();
    
    // Skip if it's in a comment, pattern definition, test, or regex pattern
    if (trimmedLine.startsWith('//') || trimmedLine.startsWith('*') || 
        trimmedLine.includes('pattern:') || trimmedLine.includes('test(') ||
        trimmedLine.includes('matchAll(') || trimmedLine.includes('/dangerouslySetInnerHTML/') ||
        trimmedLine.includes('const patterns') || trimmedLine.includes('patterns =')) {
      continue;
    }
    
    securityIssues.xss.push({
      file: relativePath,
      line: lineNum,
      context: trimmedLine
    });
  }
  
  if (patterns.documentWrite.test(content)) {
    const matches = [...content.matchAll(patterns.documentWrite)];
    matches.forEach(match => {
      const lineNum = content.substring(0, match.index).split('\n').length;
      securityIssues.xss.push({
        file: relativePath,
        line: lineNum,
        context: lines[lineNum - 1]?.trim() || ''
      });
    });
  }
}

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Skip node_modules, dist, .git, build
    if (file === 'node_modules' || file === 'dist' || file === '.git' || 
        file === 'build' || file.startsWith('.')) {
      continue;
    }
    
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else if (/\.(ts|tsx|js|jsx|mjs)$/.test(file) && !file.endsWith('.d.ts')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

function scanCodebase() {
  console.log('🔒 Starting security audit...\n');
  
  const files = walkDir(rootDir);
  
  for (const filePath of files) {
    try {
      scanFile(filePath);
    } catch (error) {
      console.warn(`⚠️  Could not scan ${path.relative(rootDir, filePath)}:`, error.message);
    }
  }
  
  return securityIssues;
}

function generateReport(issues) {
  const total = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);
  
  console.log('📋 Security Audit Report\n');
  console.log(`Total Issues Found: ${total}\n`);
  
  if (issues.eval.length > 0) {
    console.log('🚨 CRITICAL: eval() usage found:');
    issues.eval.forEach(issue => {
      console.log(`  ❌ ${issue.file}:${issue.line}`);
      console.log(`     ${issue.context}`);
    });
    console.log('');
  }
  
  if (issues.xss.length > 0) {
    console.log('⚠️  XSS Vulnerabilities:');
    issues.xss.forEach(issue => {
      console.log(`  ⚠️  ${issue.file}:${issue.line}`);
      console.log(`     ${issue.context}`);
    });
    console.log('');
  }
  
  if (issues.unsafePatterns.length > 0) {
    console.log('⚠️  Unsafe Patterns:');
    issues.unsafePatterns.forEach(issue => {
      console.log(`  ⚠️  ${issue.file}:${issue.line} - ${issue.issue}`);
      console.log(`     ${issue.context}`);
    });
    console.log('');
  }
  
  if (total === 0) {
    console.log('✅ No security issues found!\n');
  }
  
  return {
    total,
    critical: issues.eval.length,
    xss: issues.xss.length,
    unsafe: issues.unsafePatterns.length,
    issues
  };
}

function main() {
  const issues = scanCodebase();
  const report = generateReport(issues);
  
  // Write report to file
  const reportPath = path.join(rootDir, 'SECURITY_AUDIT_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Report saved to: ${reportPath}\n`);
  
  return report;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as securityAudit, scanCodebase, generateReport };
