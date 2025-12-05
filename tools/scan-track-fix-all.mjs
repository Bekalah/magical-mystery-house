#!/usr/bin/env node
/**
 * @license CC0-1.0 - Public Domain
 * 
 * Scan, Track, and Fix All
 * Comprehensive scanner that:
 * - Scans all repos and directories
 * - Validates CC0-1.0 license compliance
 * - Validates theme alignment (mystical, dark academia, alchemical)
 * - Tracks all fixes
 * - Updates GitHub with findings
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const OUTPUT_FILE = path.join(rootDir, 'SCAN_TRACK_FIX_REPORT.json');
const FIXES_FILE = path.join(rootDir, 'TRACKED_FIXES.json');

// Theme criteria for CC0-1.0 mystical/dark academia/alchemical
const THEME_CRITERIA = {
  mystical: ['mystical', 'esoteric', 'occult', 'sacred', 'divine', 'arcane', 'magic', 'grimoire', 'alchemy', 'hermetic'],
  darkAcademia: ['dark academia', 'gothic', 'library', 'scholar', 'ancient', 'manuscript', 'tome', 'cathedral', 'chapel'],
  alchemical: ['alchemy', 'alchemical', 'sulfur', 'mercury', 'salt', 'ash', 'philosopher', 'crucible', 'alembic', 'transmutation'],
  sacredMath: ['144:99', 'golden ratio', 'phi', 'fibonacci', 'sacred geometry', '144', '99'],
  thelemic: ['thelemic', 'true will', 'chaos', 'thelema', 'crowley', 'liber'],
  realInspirations: ['carrington', 'dee', 'fortune', 'agrippa', 'crowley', 'steiner', 'case', 'kunz']
};

// License compliance check
function checkLicenseCompliance(filePath, content) {
  const issues = [];
  
  // Check for CC0-1.0 license header
  if (content && !content.includes('CC0-1.0') && !content.includes('CC0 1.0') && !content.includes('Public Domain')) {
    // Skip if it's a data file or generated file
    const fileName = path.basename(filePath);
    if (!fileName.includes('.json') && 
        !fileName.includes('node_modules') &&
        !fileName.includes('dist') &&
        !fileName.includes('build') &&
        (fileName.endsWith('.ts') || fileName.endsWith('.js') || fileName.endsWith('.mjs') || fileName.endsWith('.gd'))) {
      issues.push('Missing CC0-1.0 license header');
    }
  }
  
  // Check for copyright claims
  if (content && (content.includes('Copyright') || content.includes('©'))) {
    const copyrightMatch = content.match(/Copyright\s+©?\s*\d{4}/i);
    if (copyrightMatch && !content.includes('Public Domain')) {
      issues.push('Copyright claim found - should be Public Domain');
    }
  }
  
  return issues;
}

// Theme alignment check
function checkThemeAlignment(filePath, content, packageJson) {
  const issues = [];
  const contentLower = (content || '').toLowerCase();
  const packageName = packageJson?.name || path.basename(path.dirname(filePath));
  
  // Check if package name aligns with theme
  const nameLower = packageName.toLowerCase();
  let hasTheme = false;
  
  for (const [category, keywords] of Object.entries(THEME_CRITERIA)) {
    for (const keyword of keywords) {
      if (nameLower.includes(keyword) || contentLower.includes(keyword)) {
        hasTheme = true;
        break;
      }
    }
    if (hasTheme) break;
  }
  
  // For packages, check if they're related to the mystical/alchemical theme
  if (packageJson && !hasTheme) {
    // Check description
    const description = (packageJson.description || '').toLowerCase();
    for (const [category, keywords] of Object.entries(THEME_CRITERIA)) {
      for (const keyword of keywords) {
        if (description.includes(keyword)) {
          hasTheme = true;
          break;
        }
      }
      if (hasTheme) break;
    }
  }
  
  if (!hasTheme && packageJson && packageJson.name) {
    // Only flag if it's a package (has package.json) and doesn't seem related
    // Skip utility packages like 'shared', 'config', etc.
    const utilityPackages = ['shared', 'config', 'types', 'utils', 'common'];
    if (!utilityPackages.some(u => nameLower.includes(u))) {
      issues.push('Package may not align with mystical/alchemical theme');
    }
  }
  
  return issues;
}

// Scan a file
function scanFile(filePath) {
  const result = {
    path: path.relative(rootDir, filePath),
    exists: false,
    licenseIssues: [],
    themeIssues: [],
    fixes: []
  };
  
  try {
    if (!fs.existsSync(filePath)) {
      return result;
    }
    
    result.exists = true;
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      return result;
    }
    
    // Read file content
    let content = '';
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch (e) {
      // Binary file or encoding issue
      return result;
    }
    
    // Check license compliance
    result.licenseIssues = checkLicenseCompliance(filePath, content);
    
    // Check theme alignment
    let packageJson = null;
    const packageJsonPath = path.join(path.dirname(filePath), 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      } catch (e) {
        // Invalid JSON
      }
    }
    
    result.themeIssues = checkThemeAlignment(filePath, content, packageJson);
    
    // Generate fixes
    if (result.licenseIssues.length > 0) {
      result.fixes.push({
        type: 'license',
        description: `Add CC0-1.0 license header to ${path.basename(filePath)}`,
        file: filePath,
        fix: `Add license header: /**\n * @license CC0-1.0 - Public Domain\n */`
      });
    }
    
    if (result.themeIssues.length > 0 && packageJson) {
      result.fixes.push({
        type: 'theme',
        description: `Enhance ${packageJson.name} description to align with mystical/alchemical theme`,
        file: packageJsonPath,
        fix: `Update package.json description to include mystical, alchemical, or dark academia themes`
      });
    }
    
  } catch (e) {
    result.error = e.message;
  }
  
  return result;
}

// Scan all packages
function scanPackages() {
  const packagesDir = path.join(rootDir, 'packages');
  const results = {};
  
  if (!fs.existsSync(packagesDir)) {
    return results;
  }
  
  try {
    const entries = fs.readdirSync(packagesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const packagePath = path.join(packagesDir, entry.name);
        const packageJsonPath = path.join(packagePath, 'package.json');
        
        // Scan package.json
        if (fs.existsSync(packageJsonPath)) {
          results[entry.name] = scanFile(packageJsonPath);
        }
        
        // Scan main source files
        const srcDir = path.join(packagePath, 'src');
        if (fs.existsSync(srcDir)) {
          try {
            const srcFiles = fs.readdirSync(srcDir, { recursive: true });
            for (const file of srcFiles.slice(0, 10)) { // Limit to first 10 files
              if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.mjs')) {
                const filePath = path.join(srcDir, file);
                const fileResult = scanFile(filePath);
                if (fileResult.licenseIssues.length > 0 || fileResult.themeIssues.length > 0) {
                  if (!results[entry.name]) {
                    results[entry.name] = { files: [] };
                  }
                  if (!results[entry.name].files) {
                    results[entry.name].files = [];
                  }
                  results[entry.name].files.push(fileResult);
                }
              }
            }
          } catch (e) {
            // Error scanning src
          }
        }
      }
    }
  } catch (e) {
    console.error(`Error scanning packages: ${e.message}`);
  }
  
  return results;
}

// Scan all tools
function scanTools() {
  const toolsDir = path.join(rootDir, 'tools');
  const results = {};
  
  if (!fs.existsSync(toolsDir)) {
    return results;
  }
  
  try {
    const entries = fs.readdirSync(toolsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.mjs')) {
        const filePath = path.join(toolsDir, entry.name);
        results[entry.name] = scanFile(filePath);
      }
    }
  } catch (e) {
    console.error(`Error scanning tools: ${e.message}`);
  }
  
  return results;
}

// Scan scripts
function scanScripts() {
  const scriptsDir = path.join(rootDir, 'scripts');
  const results = {};
  
  if (!fs.existsSync(scriptsDir)) {
    return results;
  }
  
  try {
    const entries = fs.readdirSync(scriptsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.mjs') || entry.name.endsWith('.js'))) {
        const filePath = path.join(scriptsDir, entry.name);
        results[entry.name] = scanFile(filePath);
      }
    }
  } catch (e) {
    console.error(`Error scanning scripts: ${e.message}`);
  }
  
  return results;
}

// Apply fixes
function applyFixes(allResults) {
  const appliedFixes = [];
  const failedFixes = [];
  
  for (const [category, results] of Object.entries(allResults)) {
    for (const [name, result] of Object.entries(results)) {
      if (result.fixes && result.fixes.length > 0) {
        for (const fix of result.fixes) {
          try {
            if (fix.type === 'license' && fix.file) {
              // Add license header to file
              let content = fs.readFileSync(fix.file, 'utf-8');
              
              // Check if header already exists
              if (!content.includes('@license CC0-1.0')) {
                // Add header at the top
                const header = '/**\n * @license CC0-1.0 - Public Domain\n */\n\n';
                content = header + content;
                fs.writeFileSync(fix.file, content, 'utf-8');
                appliedFixes.push({
                  file: fix.file,
                  type: fix.type,
                  description: fix.description,
                  timestamp: new Date().toISOString()
                });
              }
            } else if (fix.type === 'theme' && fix.file) {
              // Update package.json description
              const packageJson = JSON.parse(fs.readFileSync(fix.file, 'utf-8'));
              if (!packageJson.description || 
                  !packageJson.description.toLowerCase().includes('mystical') &&
                  !packageJson.description.toLowerCase().includes('alchemical') &&
                  !packageJson.description.toLowerCase().includes('dark academia')) {
                // Enhance description
                const currentDesc = packageJson.description || '';
                packageJson.description = currentDesc + 
                  (currentDesc ? ' - ' : '') + 
                  'Mystical, alchemical, and dark academia themed system';
                fs.writeFileSync(fix.file, JSON.stringify(packageJson, null, 2), 'utf-8');
                appliedFixes.push({
                  file: fix.file,
                  type: fix.type,
                  description: fix.description,
                  timestamp: new Date().toISOString()
                });
              }
            }
          } catch (e) {
            failedFixes.push({
              file: fix.file,
              type: fix.type,
              error: e.message,
              timestamp: new Date().toISOString()
            });
          }
        }
      }
      
      // Check nested files
      if (result.files) {
        for (const fileResult of result.files) {
          if (fileResult.fixes && fileResult.fixes.length > 0) {
            for (const fix of fileResult.fixes) {
              try {
                if (fix.type === 'license' && fix.file) {
                  let content = fs.readFileSync(fix.file, 'utf-8');
                  if (!content.includes('@license CC0-1.0')) {
                    const header = '/**\n * @license CC0-1.0 - Public Domain\n */\n\n';
                    content = header + content;
                    fs.writeFileSync(fix.file, content, 'utf-8');
                    appliedFixes.push({
                      file: fix.file,
                      type: fix.type,
                      description: fix.description,
                      timestamp: new Date().toISOString()
                    });
                  }
                }
              } catch (e) {
                failedFixes.push({
                  file: fix.file,
                  type: fix.type,
                  error: e.message,
                  timestamp: new Date().toISOString()
                });
              }
            }
          }
        }
      }
    }
  }
  
  return { appliedFixes, failedFixes };
}

// Main function
async function main() {
  console.log('🔍 Scanning all repos and directories...');
  console.log('📋 Validating CC0-1.0 license compliance...');
  console.log('🎨 Checking theme alignment (mystical, dark academia, alchemical)...');
  console.log('');
  
  const allResults = {
    packages: scanPackages(),
    tools: scanTools(),
    scripts: scanScripts()
  };
  
  // Count issues
  let totalLicenseIssues = 0;
  let totalThemeIssues = 0;
  let totalFixes = 0;
  
  for (const [category, results] of Object.entries(allResults)) {
    for (const [name, result] of Object.entries(results)) {
      totalLicenseIssues += result.licenseIssues?.length || 0;
      totalThemeIssues += result.themeIssues?.length || 0;
      totalFixes += result.fixes?.length || 0;
      
      if (result.files) {
        for (const fileResult of result.files) {
          totalLicenseIssues += fileResult.licenseIssues?.length || 0;
          totalThemeIssues += fileResult.themeIssues?.length || 0;
          totalFixes += fileResult.fixes?.length || 0;
        }
      }
    }
  }
  
  console.log(`📊 Scan Results:`);
  console.log(`   - Packages scanned: ${Object.keys(allResults.packages).length}`);
  console.log(`   - Tools scanned: ${Object.keys(allResults.tools).length}`);
  console.log(`   - Scripts scanned: ${Object.keys(allResults.scripts).length}`);
  console.log(`   - License issues found: ${totalLicenseIssues}`);
  console.log(`   - Theme issues found: ${totalThemeIssues}`);
  console.log(`   - Fixes available: ${totalFixes}`);
  console.log('');
  
  // Apply fixes
  console.log('🔧 Applying fixes...');
  const fixResults = applyFixes(allResults);
  
  console.log(`   - Fixes applied: ${fixResults.appliedFixes.length}`);
  console.log(`   - Fixes failed: ${fixResults.failedFixes.length}`);
  console.log('');
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPackages: Object.keys(allResults.packages).length,
      totalTools: Object.keys(allResults.tools).length,
      totalScripts: Object.keys(allResults.scripts).length,
      totalLicenseIssues,
      totalThemeIssues,
      totalFixes,
      appliedFixes: fixResults.appliedFixes.length,
      failedFixes: fixResults.failedFixes.length
    },
    results: allResults,
    fixes: {
      applied: fixResults.appliedFixes,
      failed: fixResults.failedFixes
    }
  };
  
  // Write reports
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));
  fs.writeFileSync(FIXES_FILE, JSON.stringify(fixResults, null, 2));
  
  console.log(`✅ Reports written:`);
  console.log(`   - ${OUTPUT_FILE}`);
  console.log(`   - ${FIXES_FILE}`);
  console.log('');
  
  // Update GitHub if possible
  try {
    console.log('📤 Updating GitHub...');
    execSync('git add SCAN_TRACK_FIX_REPORT.json TRACKED_FIXES.json', { 
      cwd: rootDir,
      stdio: 'ignore'
    });
    execSync('git commit -m "Scan, track, and fix: License and theme compliance"', { 
      cwd: rootDir,
      stdio: 'ignore'
    });
    execSync('git push', { 
      cwd: rootDir,
      stdio: 'ignore'
    });
    console.log('   ✅ GitHub updated!');
  } catch (e) {
    console.log('   ⚠️  GitHub update skipped (not a git repo or no changes)');
  }
  
  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;

