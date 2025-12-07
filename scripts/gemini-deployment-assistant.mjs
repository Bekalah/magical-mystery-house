#!/usr/bin/env node
/**
 * ⚗️ Cathedral of Circuits - Gemini 3 Deployment Assistant
 * 
 * Magnum Opus Version 1.0
 * Author: Rebecca Respawn (pen name)
 * 
 * Connects Google Gemini 3 (Antigravity) to GitHub for FREE-ONLY self-deployment assistance
 * 
 * IMPORTANT: Only recommends 100% FREE platforms with no charges or subscriptions
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 && args[index + 1] ? args[index + 1] : null;
};

const deploymentTarget = getArg('--target') || 'render';
const context = getArg('--context') || '';
const outputFile = getArg('--output') || 'gemini-strategy.json';

// FREE-ONLY deployment platforms configuration
// IMPORTANT: Only 100% free platforms with no charges, subscriptions, or billing
const DEPLOYMENT_PLATFORMS = {
  render: {
    name: 'Render',
    free: true,
    freeTier: '750 hours/month - completely free',
    noCharges: true,
    features: ['Auto-deploy', 'HTTPS', 'Custom domains'],
    script: './scripts/deploy-render.sh',
    envVars: ['RENDER_API_TOKEN'],
    url: 'https://render.com',
    warning: 'Stay within free tier limits to avoid charges'
  },
  surge: {
    name: 'Surge.sh',
    free: true,
    freeTier: 'Unlimited static hosting - completely free',
    noCharges: true,
    features: ['Static hosting', 'Custom domains', 'CDN'],
    script: 'pnpm deploy:surge',
    envVars: ['SURGE_TOKEN'],
    url: 'https://surge.sh',
    warning: 'Free tier only - no paid features'
  },
  coolify: {
    name: 'Coolify',
    free: true,
    freeTier: 'Self-hosted - free software (you provide VPS)',
    noCharges: true,
    note: 'Self-hosted (requires your own VPS server)',
    features: ['Full PaaS', 'Docker', 'CI/CD'],
    script: './scripts/deploy-coolify.sh',
    envVars: ['COOLIFY_HOST', 'COOLIFY_TOKEN'],
    url: 'https://coolify.io',
    warning: 'Free software - you pay for VPS hosting only'
  },
  'self-host': {
    name: 'Self-Hosted',
    free: true,
    freeTier: '100% free - your own server',
    noCharges: true,
    features: ['Docker', 'Caddy/Nginx', 'Full control'],
    script: 'pnpm deploy:self-host',
    envVars: [],
    url: 'https://github.com/your-repo',
    warning: 'Free - you control all costs'
  }
};

// Gemini API integration
async function queryGemini(prompt, apiKey) {
  if (!apiKey) {
    console.warn('⚠️  GEMINI_API_KEY not set. Using fallback recommendations.');
    return generateFallbackRecommendations();
  }

  try {
    // Try Gemini 2.0 Flash first, fallback to Gemini 1.5 Pro
    const models = [
      'gemini-2.0-flash-exp',
      'gemini-1.5-pro',
      'gemini-1.5-flash'
    ];
    
    let lastError = null;
    for (const model of models) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            }
          })
        });

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          return data.candidates[0].content.parts[0].text;
        }
        throw new Error('Invalid response format');
      } catch (error) {
        lastError = error;
        if (model !== models[models.length - 1]) {
          continue; // Try next model
        }
        throw error; // All models failed
      }
    }
  } catch (error) {
    console.warn(`⚠️  Gemini API error: ${error.message}. Using fallback.`);
    return generateFallbackRecommendations();
  }
}

function generateFallbackRecommendations() {
  const platform = DEPLOYMENT_PLATFORMS[deploymentTarget];
  
  return JSON.stringify({
    platform: platform.name,
    recommendations: [
      `✅ ${platform.name} is configured for FREE deployment`,
      `💰 Cost: 100% FREE - No charges expected`,
      `📦 Build command: pnpm build`,
      `🚀 Deploy script: ${platform.script}`,
      platform.freeTier ? `🆓 Free Tier: ${platform.freeTier}` : '',
      `🔧 Required env vars: ${platform.envVars.join(', ') || 'None'}`,
      `📚 Documentation: ${platform.url}`,
      platform.warning ? `⚠️  ${platform.warning}` : ''
    ].filter(Boolean),
    steps: [
      '1. Install dependencies: pnpm install',
      `2. Build project: pnpm build`,
      `3. Run deployment: ${platform.script}`,
      '4. Verify deployment in platform dashboard',
      '5. Check health endpoints',
      '6. Monitor usage to stay within free tier limits'
    ],
    warnings: [
      ...(platform.envVars.length > 0 
        ? [`⚠️  Make sure these environment variables are set: ${platform.envVars.join(', ')}`]
        : []),
      ...(platform.warning ? [`⚠️  ${platform.warning}`] : []),
      '⚠️  Always monitor usage to avoid unexpected charges',
      '⚠️  Stay within free tier limits - no paid features'
    ]
  }, null, 2);
}

async function generateDeploymentStrategy() {
  const apiKey = process.env.GEMINI_API_KEY;
  const platform = DEPLOYMENT_PLATFORMS[deploymentTarget];
  
  // Read project context
  let projectContext = '';
  try {
    const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
    projectContext = `
Project: ${packageJson.name}
Version: ${packageJson.version}
Description: ${packageJson.description || 'Cathedral of Circuits monorepo'}
Apps: ${packageJson.scripts ? Object.keys(packageJson.scripts).filter(s => s.startsWith('deploy')).join(', ') : 'None'}
    `.trim();
  } catch (e) {
    // Ignore
  }

  const prompt = `You are a deployment assistant for the Cathedral of Circuits project, a monorepo with multiple apps.

${projectContext}

CRITICAL: The user wants to deploy to ${platform.name} (${deploymentTarget}) for FREE ONLY.

IMPORTANT CONSTRAINTS:
- Only recommend 100% FREE options
- Warn about any potential charges
- Emphasize staying within free tier limits
- No paid features, subscriptions, or billing
- User wants zero unexpected charges

Changed files in this deployment:
${context || 'No specific files changed'}

Provide a JSON response with:
1. recommendations: Array of deployment recommendations (emphasize FREE only)
2. steps: Array of numbered deployment steps
3. warnings: Array of warnings about charges, billing, or paid features
4. estimated_time: Estimated deployment time in minutes

Focus on:
- FREE tier limitations and how to stay within them
- How to avoid any charges or billing
- Best practices for FREE deployment
- Common pitfalls that lead to charges
- Optimization tips for free tier

Return ONLY valid JSON, no markdown formatting.`;

  console.log('🤖 Querying Gemini for deployment strategy...');
  const geminiResponse = await queryGemini(prompt, apiKey);
  
  let strategy;
  try {
    // Try to parse as JSON first
    strategy = JSON.parse(geminiResponse);
  } catch (e) {
    // If not JSON, use fallback
    console.warn('⚠️  Gemini response not in expected format, using fallback');
    strategy = JSON.parse(generateFallbackRecommendations());
  }

  // Enhance with platform-specific info
  strategy.platform = platform.name;
  strategy.platform_info = {
    free: platform.free,
    features: platform.features,
    url: platform.url,
    script: platform.script,
    envVars: platform.envVars
  };

  return strategy;
}

async function main() {
  console.log('⚗️  Gemini Deployment Assistant\n');
  console.log(`🎯 Target: ${deploymentTarget}`);
  console.log(`📦 Platform: ${DEPLOYMENT_PLATFORMS[deploymentTarget].name}\n`);

  const strategy = await generateDeploymentStrategy();
  
  // Write strategy to file
  writeFileSync(join(rootDir, outputFile), JSON.stringify(strategy, null, 2));
  
  console.log('\n✅ Deployment strategy generated!\n');
  console.log('📋 Recommendations:');
  strategy.recommendations.forEach(rec => console.log(`   ${rec}`));
  
  console.log('\n📝 Steps:');
  strategy.steps.forEach(step => console.log(`   ${step}`));
  
  if (strategy.warnings && strategy.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    strategy.warnings.forEach(warn => console.log(`   ${warn}`));
  }
  
  console.log(`\n💾 Strategy saved to: ${outputFile}`);
  console.log(`\n🚀 Ready to deploy! Run: ${DEPLOYMENT_PLATFORMS[deploymentTarget].script}`);
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

