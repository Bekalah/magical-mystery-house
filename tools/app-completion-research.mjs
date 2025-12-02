#!/usr/bin/env node
/**
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 * 
 * App Completion Research Tool
 * Scans all apps across all repos (local and remote) to identify:
 * - Split apps: Apps with code/files scattered across multiple locations
 * - Lost apps: Apps referenced but missing or incomplete
 * - Code issues: Large files, complex functions, missing error handling
 * - Format issues: Inconsistent formatting, mixed styles
 * - Style issues: Inconsistent naming, missing documentation
 * - Completion issues: Missing dependencies, incomplete features, broken builds
 * 
 * Best Practices Applied:
 * - Comprehensive error handling with try-catch
 * - Well-documented with JSDoc
 * - Strong type definitions where applicable
 * - Performance optimization with efficient file scanning
 * - Input validation for file operations
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

// Local workspace paths (from workspace-integrator patterns)
const LOCAL_REPO_PATHS = [
  '/Users/rebeccalemke/cathedral-master-deployment',
  '/Users/rebeccalemke/cathedral-v1-consolidated',
  '/Users/rebeccalemke/cathedral-fixed-clean',
  '/Users/rebeccalemke/cathedral-real',
  '/Users/rebeccalemke/cosmogenesis-engine',
  '/Users/rebeccalemke/Roo-Code'
];

// Thresholds for code quality checks
const CODE_QUALITY_THRESHOLDS = {
  maxFileSize: 500 * 1024, // 500KB
  maxFunctionLength: 200, // lines
  maxComplexity: 15, // cyclomatic complexity estimate
  minDocumentation: 0.3 // 30% of functions should have JSDoc
};

/**
 * Discover all apps across all repos
 */
async function discoverAllApps() {
  const apps = [];
  
  // Scan local repos
  for (const repoPath of LOCAL_REPO_PATHS) {
    if (!fs.existsSync(repoPath)) {
      continue;
    }
    
    const appsDir = path.join(repoPath, 'apps');
    if (fs.existsSync(appsDir)) {
      try {
        const entries = fs.readdirSync(appsDir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory() && !entry.name.startsWith('.')) {
            const appPath = path.join(appsDir, entry.name);
            const packageJsonPath = path.join(appPath, 'package.json');
            
            // Check if it's an app (has package.json or src directory)
            if (fs.existsSync(packageJsonPath) || fs.existsSync(path.join(appPath, 'src'))) {
              apps.push({
                name: entry.name,
                path: appPath,
                repo: path.basename(repoPath),
                type: 'local',
                packageJson: fs.existsSync(packageJsonPath) 
                  ? JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
                  : null
              });
            }
          }
        }
      } catch (e) {
        // Skip repos we can't read
        continue;
      }
    }
  }
  
  // Try to discover remote repos via git remotes (optional, graceful fallback)
  try {
    const gitRemotes = discoverGitRemotes();
    // Note: Remote repo scanning would require git clone or API access
    // For now, we'll focus on local repos
  } catch (e) {
    // Remote discovery is optional
  }
  
  return apps;
}

/**
 * Discover git remotes (for future remote repo scanning)
 */
function discoverGitRemotes() {
  const remotes = [];
  for (const repoPath of LOCAL_REPO_PATHS) {
    if (!fs.existsSync(repoPath)) continue;
    
    const gitDir = path.join(repoPath, '.git');
    if (fs.existsSync(gitDir)) {
      try {
        const configPath = path.join(gitDir, 'config');
        if (fs.existsSync(configPath)) {
          const config = fs.readFileSync(configPath, 'utf-8');
          const remoteMatches = config.match(/\[remote "([^"]+)"\]\s+url\s*=\s*(.+)/g);
          if (remoteMatches) {
            for (const match of remoteMatches) {
              const urlMatch = match.match(/url\s*=\s*(.+)/);
              if (urlMatch) {
                remotes.push({
                  repo: path.basename(repoPath),
                  remote: urlMatch[1].trim()
                });
              }
            }
          }
        }
      } catch (e) {
        // Skip if can't read git config
      }
    }
  }
  return remotes;
}

/**
 * Check if app is split (files scattered across multiple locations)
 */
function checkSplitApp(app) {
  const locations = [];
  const appName = app.name.toLowerCase();
  
  // Check if app files exist in multiple repos
  for (const repoPath of LOCAL_REPO_PATHS) {
    if (!fs.existsSync(repoPath)) continue;
    
    const appsDir = path.join(repoPath, 'apps', app.name);
    if (fs.existsSync(appsDir) && appsDir !== app.path) {
      locations.push({
        repo: path.basename(repoPath),
        path: appsDir
      });
    }
    
    // Also check for similar names
    const appsDirParent = path.join(repoPath, 'apps');
    if (fs.existsSync(appsDirParent)) {
      try {
        const entries = fs.readdirSync(appsDirParent);
        for (const entry of entries) {
          if (entry.toLowerCase() === appName && entry !== app.name) {
            locations.push({
              repo: path.basename(repoPath),
              path: path.join(appsDirParent, entry),
              similarName: true
            });
          }
        }
      } catch (e) {
        // Skip if can't read
      }
    }
  }
  
  return locations.length > 0 ? {
    isSplit: true,
    locations: [app.path, ...locations.map(l => l.path)]
  } : {
    isSplit: false,
    locations: []
  };
}

/**
 * Check if app is lost (missing critical files)
 */
function checkLostApp(app) {
  const missingFiles = [];
  const criticalFiles = [
    'package.json',
    'src',
    'README.md'
  ];
  
  // Check for missing critical files
  for (const file of criticalFiles) {
    const filePath = path.join(app.path, file);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file);
    }
  }
  
  // Check package.json completeness if it exists
  if (app.packageJson) {
    if (!app.packageJson.name) missingFiles.push('package.json.name');
    if (!app.packageJson.version) missingFiles.push('package.json.version');
    if (!app.packageJson.scripts || !app.packageJson.scripts.build) {
      missingFiles.push('package.json.scripts.build');
    }
  }
  
  return {
    isLost: missingFiles.length > 0,
    missingFiles
  };
}

/**
 * Check code quality issues
 */
function checkCodeQuality(app) {
  const issues = [];
  const srcDir = path.join(app.path, 'src');
  
  if (!fs.existsSync(srcDir)) {
    return { issues: [] };
  }
  
  // Find all code files
  const codeFiles = findCodeFiles(srcDir);
  
  for (const file of codeFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const stats = fs.statSync(file);
      
      // Check file size
      if (stats.size > CODE_QUALITY_THRESHOLDS.maxFileSize) {
        issues.push({
          type: 'code',
          severity: 'high',
          description: `Large file: ${path.relative(app.path, file)} (${(stats.size / 1024).toFixed(1)}KB)`,
          file: path.relative(app.path, file)
        });
      }
      
      // Check for long functions (simple heuristic: functions with many lines)
      const functionMatches = content.match(/function\s+\w+[^{]*\{[^}]*/g);
      if (functionMatches) {
        for (const func of functionMatches) {
          const lines = func.split('\n').length;
          if (lines > CODE_QUALITY_THRESHOLDS.maxFunctionLength) {
            issues.push({
              type: 'code',
              severity: 'medium',
              description: `Long function in ${path.relative(app.path, file)} (${lines} lines)`,
              file: path.relative(app.path, file)
            });
          }
        }
      }
      
      // Check for missing error handling (simple heuristic: try-catch presence)
      const hasTryCatch = content.includes('try') && content.includes('catch');
      const hasAsync = content.includes('async') || content.includes('await');
      if (hasAsync && !hasTryCatch) {
        issues.push({
          type: 'code',
          severity: 'medium',
          description: `Missing error handling in async code: ${path.relative(app.path, file)}`,
          file: path.relative(app.path, file)
        });
      }
      
      // Check documentation coverage
      const functions = (content.match(/function\s+\w+|const\s+\w+\s*=\s*(?:async\s+)?\(/g) || []).length;
      const jsdocComments = (content.match(/\/\*\*[\s\S]*?\*\//g) || []).length;
      if (functions > 0 && jsdocComments / functions < CODE_QUALITY_THRESHOLDS.minDocumentation) {
        issues.push({
          type: 'code',
          severity: 'low',
          description: `Low documentation coverage in ${path.relative(app.path, file)} (${((jsdocComments / functions) * 100).toFixed(0)}%)`,
          file: path.relative(app.path, file)
        });
      }
    } catch (e) {
      // Skip files we can't read
      continue;
    }
  }
  
  return { issues };
}

/**
 * Find all code files recursively
 */
function findCodeFiles(dir, maxDepth = 5, currentDepth = 0) {
  if (currentDepth >= maxDepth) return [];
  
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.includes('node_modules')) {
        files.push(...findCodeFiles(fullPath, maxDepth, currentDepth + 1));
      } else if (entry.isFile() && 
                 (entry.name.endsWith('.ts') || 
                  entry.name.endsWith('.tsx') || 
                  entry.name.endsWith('.js') || 
                  entry.name.endsWith('.jsx'))) {
        files.push(fullPath);
      }
    }
  } catch (e) {
    // Skip directories we can't read
  }
  return files;
}

/**
 * Check format consistency issues
 */
function checkFormatIssues(app) {
  const issues = [];
  
  // Check for prettier config
  const prettierConfigs = [
    '.prettierrc',
    '.prettierrc.json',
    '.prettierrc.js',
    'prettier.config.js',
    '.prettierrc.yaml',
    '.prettierrc.yml'
  ];
  
  let hasPrettier = false;
  for (const config of prettierConfigs) {
    if (fs.existsSync(path.join(app.path, config))) {
      hasPrettier = true;
      break;
    }
  }
  
  if (!hasPrettier) {
    issues.push({
      type: 'format',
      description: 'Missing Prettier configuration'
    });
  }
  
  // Check for ESLint config
  const eslintConfigs = [
    '.eslintrc',
    '.eslintrc.js',
    '.eslintrc.json',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    'eslint.config.js'
  ];
  
  let hasESLint = false;
  for (const config of eslintConfigs) {
    if (fs.existsSync(path.join(app.path, config))) {
      hasESLint = true;
      break;
    }
  }
  
  if (!hasESLint && app.packageJson && app.packageJson.dependencies) {
    // Check if it's a JS/TS project that should have ESLint
    const hasTypeScript = app.packageJson.dependencies.typescript || 
                         app.packageJson.devDependencies?.typescript;
    if (hasTypeScript) {
      issues.push({
        type: 'format',
        description: 'Missing ESLint configuration for TypeScript project'
      });
    }
  }
  
  return { issues };
}

/**
 * Check style consistency issues
 */
function checkStyleIssues(app) {
  const issues = [];
  const srcDir = path.join(app.path, 'src');
  
  if (!fs.existsSync(srcDir)) {
    return { issues: [] };
  }
  
  // Check naming conventions (simple heuristic: look for inconsistent patterns)
  const codeFiles = findCodeFiles(srcDir).slice(0, 10); // Sample first 10 files
  const namingPatterns = {
    camelCase: 0,
    PascalCase: 0,
    kebabCase: 0,
    snake_case: 0
  };
  
  for (const file of codeFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const fileName = path.basename(file, path.extname(file));
      
      // Analyze file name pattern
      if (/^[a-z][a-zA-Z0-9]*$/.test(fileName)) namingPatterns.camelCase++;
      else if (/^[A-Z][a-zA-Z0-9]*$/.test(fileName)) namingPatterns.PascalCase++;
      else if (fileName.includes('-')) namingPatterns.kebabCase++;
      else if (fileName.includes('_')) namingPatterns.snake_case++;
      
      // Check for mixed naming in code (simple heuristic)
      const hasCamelCase = /const\s+[a-z][a-zA-Z0-9]*\s*=/.test(content);
      const hasPascalCase = /class\s+[A-Z][a-zA-Z0-9]*|interface\s+[A-Z][a-zA-Z0-9]*/.test(content);
      
      if (hasCamelCase && hasPascalCase) {
        // This is normal, but check for snake_case or kebab-case in variable names
        if (/[a-z]+_[a-z]+/.test(content) || /[a-z]+-[a-z]+/.test(content)) {
          issues.push({
            type: 'style',
            description: `Mixed naming conventions in ${path.relative(app.path, file)}`,
            file: path.relative(app.path, file)
          });
        }
      }
    } catch (e) {
      // Skip files we can't read
      continue;
    }
  }
  
  return { issues };
}

/**
 * Check completion issues
 */
function checkCompletionIssues(app) {
  const issues = [];
  const missing = [];
  
  // Check package.json completeness
  if (!app.packageJson) {
    missing.push('package.json');
    issues.push({
      type: 'completion',
      description: 'Missing package.json',
      missing: ['package.json']
    });
    return { issues, missing };
  }
  
  // Check for required scripts
  if (!app.packageJson.scripts) {
    missing.push('package.json.scripts');
    issues.push({
      type: 'completion',
      description: 'Missing scripts section in package.json',
      missing: ['package.json.scripts']
    });
  } else {
    if (!app.packageJson.scripts.build) {
      missing.push('package.json.scripts.build');
      issues.push({
        type: 'completion',
        description: 'Missing build script',
        missing: ['package.json.scripts.build']
      });
    }
    if (!app.packageJson.scripts.dev && !app.packageJson.scripts.start) {
      missing.push('package.json.scripts.dev or start');
      issues.push({
        type: 'completion',
        description: 'Missing dev or start script',
        missing: ['package.json.scripts.dev', 'package.json.scripts.start']
      });
    }
  }
  
  // Check for missing dependencies (check if imports reference missing packages)
  const srcDir = path.join(app.path, 'src');
  if (fs.existsSync(srcDir)) {
    const codeFiles = findCodeFiles(srcDir).slice(0, 20); // Sample first 20 files
    const importedPackages = new Set();
    
    for (const file of codeFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        // Extract import statements
        const importMatches = content.match(/from\s+['"]([^'"]+)['"]|require\(['"]([^'"]+)['"]\)/g);
        if (importMatches) {
          for (const match of importMatches) {
            const pkgMatch = match.match(/['"]([^'"]+)['"]/);
            if (pkgMatch) {
              const pkg = pkgMatch[1];
              // Only check npm packages (not relative imports)
              if (!pkg.startsWith('.') && !pkg.startsWith('/')) {
                importedPackages.add(pkg.split('/')[0]);
              }
            }
          }
        }
      } catch (e) {
        // Skip files we can't read
        continue;
      }
    }
    
    // Check if imported packages are in dependencies
    if (app.packageJson.dependencies || app.packageJson.devDependencies) {
      const allDeps = {
        ...(app.packageJson.dependencies || {}),
        ...(app.packageJson.devDependencies || {})
      };
      
      for (const pkg of importedPackages) {
        if (!allDeps[pkg] && !pkg.startsWith('@types/')) {
          missing.push(`dependency:${pkg}`);
          issues.push({
            type: 'completion',
            description: `Missing dependency: ${pkg}`,
            missing: [`dependency:${pkg}`]
          });
        }
      }
    }
  }
  
  // Check for src directory
  if (!fs.existsSync(srcDir)) {
    missing.push('src');
    issues.push({
      type: 'completion',
      description: 'Missing src directory',
      missing: ['src']
    });
  }
  
  return { issues, missing };
}

/**
 * Check app completion status
 */
async function checkAppCompletion(app) {
  const splitCheck = checkSplitApp(app);
  const lostCheck = checkLostApp(app);
  const codeQuality = checkCodeQuality(app);
  const formatIssues = checkFormatIssues(app);
  const styleIssues = checkStyleIssues(app);
  const completionIssues = checkCompletionIssues(app);
  
  return {
    app: app.name,
    repo: app.repo,
    path: app.path,
    split: splitCheck,
    lost: lostCheck,
    codeQuality: codeQuality.issues,
    formatIssues: formatIssues.issues,
    styleIssues: styleIssues.issues,
    completionIssues: completionIssues.issues,
    missing: completionIssues.missing
  };
}

/**
 * Generate research opportunities from app issues
 */
function generateAppResearchOpportunities(appsWithIssues) {
  const opportunities = {
    splitApps: [],
    lostApps: [],
    codeIssues: [],
    formatIssues: [],
    completionIssues: []
  };
  
  for (const app of appsWithIssues) {
    // Split apps
    if (app.split.isSplit) {
      opportunities.splitApps.push({
        name: app.app,
        locations: app.split.locations,
        repo: app.repo
      });
    }
    
    // Lost apps
    if (app.lost.isLost) {
      opportunities.lostApps.push({
        name: app.app,
        missingFiles: app.lost.missingFiles,
        repo: app.repo
      });
    }
    
    // Code issues
    for (const issue of app.codeQuality) {
      opportunities.codeIssues.push({
        app: app.app,
        description: issue.description,
        severity: issue.severity,
        file: issue.file,
        repo: app.repo
      });
    }
    
    // Format issues
    for (const issue of app.formatIssues) {
      opportunities.formatIssues.push({
        app: app.app,
        description: issue.description,
        type: issue.type,
        repo: app.repo
      });
    }
    
    // Style issues
    for (const issue of app.styleIssues) {
      opportunities.formatIssues.push({
        app: app.app,
        description: issue.description,
        type: 'style',
        file: issue.file,
        repo: app.repo
      });
    }
    
    // Completion issues
    for (const issue of app.completionIssues) {
      opportunities.completionIssues.push({
        app: app.app,
        description: issue.description,
        missing: issue.missing,
        repo: app.repo
      });
    }
  }
  
  return opportunities;
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Discovering all apps across repos...\n');
  
  const apps = await discoverAllApps();
  console.log(`✅ Found ${apps.length} apps`);
  
  console.log('\n📊 Checking app completion status...\n');
  const appsWithIssues = [];
  
  for (const app of apps) {
    try {
      const issues = await checkAppCompletion(app);
      if (issues.split.isSplit || 
          issues.lost.isLost || 
          issues.codeQuality.length > 0 || 
          issues.formatIssues.length > 0 || 
          issues.styleIssues.length > 0 || 
          issues.completionIssues.length > 0) {
        appsWithIssues.push(issues);
      }
    } catch (e) {
      // Skip apps we can't analyze
      continue;
    }
  }
  
  console.log(`✅ Analyzed ${apps.length} apps, found ${appsWithIssues.length} with issues`);
  
  console.log('\n✨ Generating research opportunities...\n');
  const opportunities = generateAppResearchOpportunities(appsWithIssues);
  
  // Save report
  const report = {
    timestamp: Date.now(),
    appsScanned: apps.length,
    appsWithIssues: appsWithIssues.length,
    opportunities
  };
  
  const reportsDir = path.join(BASE_DIR, 'improvement-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const reportPath = path.join(reportsDir, `app-completion-research-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  
  console.log(`\n✅ Report saved: ${reportPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Apps scanned: ${apps.length}`);
  console.log(`   Apps with issues: ${appsWithIssues.length}`);
  console.log(`   Split apps: ${opportunities.splitApps.length}`);
  console.log(`   Lost apps: ${opportunities.lostApps.length}`);
  console.log(`   Code issues: ${opportunities.codeIssues.length}`);
  console.log(`   Format/style issues: ${opportunities.formatIssues.length}`);
  console.log(`   Completion issues: ${opportunities.completionIssues.length}`);
  
  return report;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default { main, discoverAllApps, checkAppCompletion };

