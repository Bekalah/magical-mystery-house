# 🏛️ Cathedral Monorepo Health Monitoring System

## Overview

Comprehensive monitoring system for your modular monorepo architecture. Tracks every package, module, and component with real-time health status.

## Quick Start

### View Health Dashboard
```bash
ppnpm run health
```

### Real-time Monitoring
```bash
ppnpm run health:watch
# or
ppnpm run monitor
```

### Scope Analysis
```bash
ppnpm run scope
```

## Features

### 📊 Health Monitoring
- **Package Health**: Individual health scores for each package
- **Build Status**: Real-time build success/failure tracking
- **TypeScript Status**: Error and warning counts
- **Dependencies**: Outdated packages and vulnerabilities
- **Overall Health**: Aggregated health score (0-100%)

### 📦 Package Analysis
- Package.json validation
- Source file tracking
- Build output verification
- TypeScript configuration
- Documentation presence
- Export analysis

### 🔗 Scope Analysis
- Dependency mapping
- Internal vs external relationships
- Module boundaries
- Export tracking
- File structure analysis

### 📈 Real-time Dashboard
- Auto-refreshing every 10 seconds
- Visual health indicators
- Color-coded status (🟢 healthy, 🟡 warning, 🔴 critical)
- Progress bars for health scores
- Issue tracking

## Health Score Calculation

Health scores are calculated based on:
- **Package Structure** (50%): package.json, src/, dist/, tsconfig.json
- **Build Status** (30%): Successful builds, errors, warnings
- **TypeScript** (20%): Type errors, warnings

## Status Indicators

- ✅ **Healthy** (90-100%): All systems operational
- ⚠️ **Warning** (70-89%): Minor issues detected
- ❌ **Critical** (<70%): Major issues requiring attention

## Reports

### Health Report
Saved to: `monorepo-health-report.json`

Contains:
- Overall health metrics
- Individual package health
- Build status
- TypeScript status
- Dependencies status
- Timestamp

### Scope Report
Saved to: `monorepo-scope-report.json`

Contains:
- Package analysis
- Dependency mapping
- Relationship graph
- Export information
- File structure

## Integration

The monitoring system integrates with:
- ✅ Improvement experiment
- ✅ Build system
- ✅ TypeScript compiler
- ✅ Package manager (pnpm)
- ✅ Fix tracking system

## Commands Reference

```bash
# One-time health check
ppnpm run health

# Continuous monitoring
ppnpm run health:watch

# Scope analysis
ppnpm run scope

# Fix monitoring
ppnpm run fixes:watch
```

## Current Status

**Overall Health**: 🟡 88% WARNING

**Packages**: 23 total
- ✅ 9 healthy (100%)
- ⚠️ 14 need attention (missing package.json)

**Build**: ✅ SUCCESS
**TypeScript**: ✅ CLEAN
**Dependencies**: ✅ UP TO DATE

## Next Steps

1. **Fix Missing package.json**: Many packages need package.json files
2. **Add src/ directories**: Some packages missing source structure
3. **Improve documentation**: Add README files where missing
4. **Monitor continuously**: Use `ppnpm run health:watch` for real-time monitoring

## Architecture

The monitoring system is modular and extensible:
- `monorepo-health-monitor.mjs`: Core health checking
- `health-dashboard.mjs`: Real-time dashboard
- `scope-analyzer.mjs`: Dependency and scope analysis

All components work together to provide comprehensive visibility into your monorepo's health.

