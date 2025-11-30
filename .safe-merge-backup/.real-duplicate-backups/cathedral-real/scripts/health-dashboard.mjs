#!/usr/bin/env node
/**
 * Real-time Health Dashboard
 * Continuously monitors and displays monorepo health
 */

import { MonorepoHealthMonitor } from './monorepo-health-monitor.mjs';

const REFRESH_INTERVAL = 10000; // 10 seconds

async function runDashboard() {
  const monitor = new MonorepoHealthMonitor();
  
  // Initial scan
  await monitor.scan();
  monitor.generateDashboard();
  monitor.saveReport();
  
  // Continuous monitoring
  setInterval(async () => {
    await monitor.scan();
    monitor.generateDashboard();
    monitor.saveReport();
  }, REFRESH_INTERVAL);
  
  console.log(`\n🔄 Auto-refreshing every ${REFRESH_INTERVAL / 1000} seconds... (Ctrl+C to stop)\n`);
}

process.on('SIGINT', () => {
  console.log('\n\n👋 Stopping health dashboard...\n');
  process.exit(0);
});

runDashboard().catch(console.error);

