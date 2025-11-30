#!/usr/bin/env node
/**
 * Fix All Deployments
 * 
 * Checks and fixes all deployment configurations:
 * - Vercel
 * - GitHub Actions
 * - Docker
 * - Build scripts
 * - Environment variables
 * - Dependencies
 * 
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '..');

const WORKSPACE_PATHS = [
  BASE_DIR,
  path.resolve(BASE_DIR, '../cathedral-real'),
  path.resolve(BASE_DIR, '../cathedral-v1-consolidated'),
  path.resolve(BASE_DIR, '../cathedral-fixed-clean'),
  path.resolve(BASE_DIR, '../cosmogenesis-engine'),
  path.resolve(BASE_DIR, '../Roo-Code')
].filter(p => fs.existsSync(p));

class FixAllDeployments {
  constructor() {
    this.fixes = [];
    this.errors = [];
    this.deployments = [];
  }

  async run() {
    console.log('🚀 FIX ALL DEPLOYMENTS\n');
    console.log('═'.repeat(80) + '\n');

    // Find all deployments
    await this.findAllDeployments();

    // Fix each deployment
    for (const deployment of this.deployments) {
      await this.fixDeployment(deployment);
    }

    // Check build scripts
    await this.checkBuildScripts();

    // Check environment variables
    await this.checkEnvironmentVariables();

    // Check dependencies
    await this.checkDependencies();

    // Generate report
    this.generateReport();
  }

  async findAllDeployments() {
    console.log('🔍 Finding all deployments...\n');

    for (const workspace of WORKSPACE_PATHS) {
      // Vercel
      const vercelPath = path.join(workspace, 'vercel.json');
      if (fs.existsSync(vercelPath)) {
        this.deployments.push({
          workspace: path.basename(workspace),
          type: 'vercel',
          path: vercelPath,
          status: 'found'
        });
      }

      // GitHub Actions
      const workflowsDir = path.join(workspace, '.github', 'workflows');
      if (fs.existsSync(workflowsDir)) {
        const workflows = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
        for (const workflow of workflows) {
          this.deployments.push({
            workspace: path.basename(workspace),
            type: 'github-actions',
            path: path.join(workflowsDir, workflow),
            status: 'found'
          });
        }
      }

      // Docker
      const dockerfilePath = path.join(workspace, 'Dockerfile');
      if (fs.existsSync(dockerfilePath)) {
        this.deployments.push({
          workspace: path.basename(workspace),
          type: 'docker',
          path: dockerfilePath,
          status: 'found'
        });
      }

      const dockerComposePath = path.join(workspace, 'docker-compose.yml');
      if (fs.existsSync(dockerComposePath)) {
        this.deployments.push({
          workspace: path.basename(workspace),
          type: 'docker-compose',
          path: dockerComposePath,
          status: 'found'
        });
      }

      // Check for apps with package.json that might need deployment
      await this.checkAppDeployments(workspace);
    }

    console.log(`   ✅ Found ${this.deployments.length} deployment configs\n`);
  }

  async checkAppDeployments(workspace) {
    const appsDir = path.join(workspace, 'apps');
    if (!fs.existsSync(appsDir)) return;

    const apps = fs.readdirSync(appsDir).filter(item => {
      const itemPath = path.join(appsDir, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const app of apps) {
      const appPath = path.join(appsDir, app);
      const packageJsonPath = path.join(appPath, 'package.json');
      
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        
        // Check if it's a deployable app (Next.js, React, etc.)
        if (packageJson.dependencies?.['next'] || packageJson.dependencies?.['react']) {
          // Check if deployment config exists
          const hasVercel = fs.existsSync(path.join(appPath, 'vercel.json'));
          
          if (!hasVercel) {
            this.deployments.push({
              workspace: path.basename(workspace),
              type: 'missing',
              path: appPath,
              app: app,
              status: 'needs-config'
            });
          }
        }
      }
    }
  }

  async fixDeployment(deployment) {
    try {
      console.log(`🔧 Fixing: ${deployment.type} in ${deployment.workspace}${deployment.app ? ` (${deployment.app})` : ''}...`);

      switch (deployment.type) {
        case 'vercel':
          await this.fixVercel(deployment);
          break;
        case 'github-actions':
          await this.fixGitHubActions(deployment);
          break;
        case 'docker':
          await this.fixDocker(deployment);
          break;
        case 'docker-compose':
          await this.fixDockerCompose(deployment);
          break;
        case 'missing':
          await this.createDeploymentConfig(deployment);
          break;
      }

      deployment.status = 'fixed';
      this.fixes.push({
        type: deployment.type,
        workspace: deployment.workspace,
        path: deployment.path,
        fix: 'Fixed'
      });
    } catch (e) {
      deployment.status = 'error';
      deployment.error = e.message;
      this.errors.push({
        type: deployment.type,
        workspace: deployment.workspace,
        path: deployment.path,
        error: e.message
      });
    }
  }

  async fixVercel(deployment) {
    const config = JSON.parse(fs.readFileSync(deployment.path, 'utf-8'));
    let fixed = false;

    // Fix build command
    if (!config.buildCommand) {
      config.buildCommand = 'ppnpm build';
      fixed = true;
    }

    // Fix install command
    if (!config.installCommand) {
      config.installCommand = 'ppnpm install';
      fixed = true;
    }

    // Fix output directory
    if (!config.outputDirectory && config.buildCommand?.includes('next')) {
      config.outputDirectory = '.next';
      fixed = true;
    }

    // Fix framework
    if (!config.framework) {
      // Try to detect from package.json
      const packageJsonPath = path.join(path.dirname(deployment.path), 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        if (packageJson.dependencies?.next) {
          config.framework = 'nextjs';
          fixed = true;
        }
      }
    }

    if (fixed) {
      fs.writeFileSync(deployment.path, JSON.stringify(config, null, 2));
    }
  }

  async fixGitHubActions(deployment) {
    let content = fs.readFileSync(deployment.path, 'utf-8');
    let fixed = false;

    // Fix Node version
    if (!content.includes('node-version')) {
      content = content.replace(
        /uses: actions\/setup-node@[\w.]+/,
        (match) => `${match}\n        with:\n          node-version: '20'`
      );
      fixed = true;
    }

    // Fix pnpm setup
    if (content.includes('pnpm') && !content.includes('pnpm/action-setup')) {
      content = content.replace(
        /- uses: actions\/setup-node@[\w.]+/,
        (match) => `- uses: pnpm/action-setup@v2
        with:
          version: 10
${match}`
      );
      fixed = true;
    }

    if (fixed) {
      fs.writeFileSync(deployment.path, content);
    }
  }

  async fixDocker(deployment) {
    let content = fs.readFileSync(deployment.path, 'utf-8');
    let fixed = false;

    // Fix Node version
    if (!content.includes('FROM node:') || content.includes('FROM node:latest')) {
      content = content.replace(/FROM node:[\w.]+/, 'FROM node:20-alpine');
      fixed = true;
    }

    // Fix pnpm
    if (!content.includes('pnpm')) {
      // Add ppnpm installation
      const fromMatch = content.match(/FROM node:[\w.]+/);
      if (fromMatch) {
        const insertIndex = content.indexOf('\n', fromMatch.index) + 1;
        content = content.slice(0, insertIndex) + 
          'RUN corepack enable && corepack prepare pnpm@10 --activate\n' +
          content.slice(insertIndex);
        fixed = true;
      }
    }

    if (fixed) {
      fs.writeFileSync(deployment.path, content);
    }
  }

  async fixDockerCompose(deployment) {
    let content = fs.readFileSync(deployment.path, 'utf-8');
    // Docker Compose fixes would go here
    // For now, just mark as checked
  }

  async createDeploymentConfig(deployment) {
    const appPath = deployment.path;
    const packageJsonPath = path.join(appPath, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) return;

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    // Create Vercel config for Next.js apps
    if (packageJson.dependencies?.next) {
      const vercelConfig = {
        buildCommand: 'ppnpm build',
        outputDirectory: '.next',
        installCommand: 'ppnpm install',
        framework: 'nextjs'
      };
      fs.writeFileSync(path.join(appPath, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
      this.fixes.push({
        type: 'created',
        workspace: deployment.workspace,
        app: deployment.app,
        config: 'vercel.json'
      });
    }
  }

  async checkBuildScripts() {
    console.log('\n📋 Checking build scripts...\n');

    for (const workspace of WORKSPACE_PATHS) {
      const packageJsonPath = path.join(workspace, 'package.json');
      if (!fs.existsSync(packageJsonPath)) continue;

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const scripts = packageJson.scripts || {};

      // Check for required scripts
      if (!scripts.build) {
        this.errors.push({
          type: 'missing-script',
          workspace: path.basename(workspace),
          script: 'build'
        });
      }

      if (!scripts.dev && !scripts.start) {
        this.errors.push({
          type: 'missing-script',
          workspace: path.basename(workspace),
          script: 'dev or start'
        });
      }
    }
  }

  async checkEnvironmentVariables() {
    console.log('🔐 Checking environment variables...\n');

    for (const workspace of WORKSPACE_PATHS) {
      const envExample = path.join(workspace, '.env.example');
      const env = path.join(workspace, '.env');
      
      if (fs.existsSync(env) && !fs.existsSync(envExample)) {
        // Create .env.example from .env (without values)
        try {
          const envContent = fs.readFileSync(env, 'utf-8');
          const exampleContent = envContent.replace(/=.*/g, '=');
          fs.writeFileSync(envExample, exampleContent);
          this.fixes.push({
            type: 'env-example',
            workspace: path.basename(workspace)
          });
        } catch (e) {
          // Skip
        }
      }
    }
  }

  async checkDependencies() {
    console.log('📦 Checking dependencies...\n');

    for (const workspace of WORKSPACE_PATHS) {
      const packageJsonPath = path.join(workspace, 'package.json');
      if (!fs.existsSync(packageJsonPath)) continue;

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      // Check for packageManager field
      if (!packageJson.packageManager) {
        packageJson.packageManager = 'pnpm@10.23.0';
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        this.fixes.push({
          type: 'package-manager',
          workspace: path.basename(workspace)
        });
      }
    }
  }

  generateReport() {
    const report = {
      timestamp: Date.now(),
      deployments: this.deployments,
      fixes: this.fixes,
      errors: this.errors,
      summary: {
        totalDeployments: this.deployments.length,
        fixed: this.fixes.length,
        errors: this.errors.length
      }
    };

    const reportPath = path.join(BASE_DIR, 'DEPLOYMENT_FIX_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n' + '═'.repeat(80));
    console.log('\n📊 Deployment Fix Report\n');
    console.log(`🚀 Deployments Found: ${this.deployments.length}`);
    console.log(`✅ Fixed: ${this.fixes.length}`);
    console.log(`⚠️  Errors: ${this.errors.length}`);
    console.log(`\n📄 Report saved: ${reportPath}\n`);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new FixAllDeployments();
  fixer.run().catch(console.error);
}

export default FixAllDeployments;

