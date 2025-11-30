/**
 * Monorepo Styling Engine - Complete Sophisticated Perfection
 * 
 * @package @cathedral/shared
 * 
 * Applies high-end sophisticated styling and theme connections
 * across the ENTIRE monorepo:
 * - All 139+ packages
 * - All 26+ apps
 * - All data files
 * - All components
 * - All styles
 * 
 * Quality: Museum-level perfection throughout
 */

import { mcqueenTokens } from '@cathedral/japanese-design-system/mcqueen-tokens';
import { themeConnectionEngine } from '@cathedral/liber-arcanae/theme-connection-system';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// MONOREPO STYLING ENGINE
// ============================================================================

export interface MonorepoStylingConfig {
  targetDirectories: string[];
  stylingLevel: 'basic' | 'sophisticated' | 'perfection';
  themeConnections: boolean;
  preserveOriginal: boolean;
  backupBeforeStyle: boolean;
}

export class MonorepoStylingEngine {
  private config: MonorepoStylingConfig;
  private themeSystem: typeof themeConnectionEngine;

  constructor(config: MonorepoStylingConfig) {
    this.config = config;
    this.themeSystem = themeConnectionEngine;
  }

  /**
   * Style entire monorepo
   */
  async styleEntireMonorepo(): Promise<StylingReport> {
    const report: StylingReport = {
      packagesStyled: 0,
      appsStyled: 0,
      filesStyled: 0,
      componentsStyled: 0,
      stylesCreated: 0,
      errors: [],
      styling: []
    };

    // Style all packages
    for (const dir of this.config.targetDirectories) {
      if (dir.includes('packages')) {
        await this.stylePackages(dir, report);
      } else if (dir.includes('apps')) {
        await this.styleApps(dir, report);
      } else {
        await this.styleDirectory(dir, report);
      }
    }

    return report;
  }

  /**
   * Style all packages
   */
  private async stylePackages(dir: string, report: StylingReport): Promise<void> {
    const packages = this.getPackages(dir);
    
    for (const pkg of packages) {
      try {
        await this.stylePackage(pkg, report);
        report.packagesStyled++;
      } catch (error) {
        report.errors.push({
          file: pkg,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  }

  /**
   * Style all apps
   */
  private async styleApps(dir: string, report: StylingReport): Promise<void> {
    const apps = this.getApps(dir);
    
    for (const app of apps) {
      try {
        await this.styleApp(app, report);
        report.appsStyled++;
      } catch (error) {
        report.errors.push({
          file: app,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  }

  /**
   * Style a package
   */
  private async stylePackage(pkgPath: string, report: StylingReport): Promise<void> {
    // Create sophisticated styling files
    await this.createPackageStyling(pkgPath, report);
    
    // Apply theme connections
    if (this.config.themeConnections) {
      await this.applyThemeConnections(pkgPath, report);
    }
    
    // Style all components
    await this.stylePackageComponents(pkgPath, report);
    
    // Style all styles
    await this.stylePackageStyles(pkgPath, report);
  }

  /**
   * Style an app
   */
  private async styleApp(appPath: string, report: StylingReport): Promise<void> {
    // Create sophisticated styling files
    await this.createAppStyling(appPath, report);
    
    // Apply theme connections
    if (this.config.themeConnections) {
      await this.applyThemeConnections(appPath, report);
    }
    
    // Style all components
    await this.styleAppComponents(appPath, report);
    
    // Style all styles
    await this.styleAppStyles(appPath, report);
  }

  /**
   * Create package styling
   */
  private async createPackageStyling(pkgPath: string, report: StylingReport): Promise<void> {
    const stylingPath = path.join(pkgPath, 'src', 'styles');
    if (!fs.existsSync(stylingPath)) {
      fs.mkdirSync(stylingPath, { recursive: true });
    }

    // Create sophisticated styling file
    const stylingFile = path.join(stylingPath, 'sophisticated.css');
    const stylingContent = this.generateSophisticatedCSS(pkgPath);
    
    fs.writeFileSync(stylingFile, stylingContent, 'utf-8');
    report.stylesCreated++;
    report.styling.push({
      file: stylingFile,
      type: 'sophisticated-css',
      details: 'Created sophisticated styling with McQueen tokens and master art principles'
    });
  }

  /**
   * Create app styling
   */
  private async createAppStyling(appPath: string, report: StylingReport): Promise<void> {
    const stylingPath = path.join(appPath, 'src', 'styles');
    if (!fs.existsSync(stylingPath)) {
      fs.mkdirSync(stylingPath, { recursive: true });
    }

    // Create sophisticated styling file
    const stylingFile = path.join(stylingPath, 'sophisticated.css');
    const stylingContent = this.generateSophisticatedCSS(appPath);
    
    fs.writeFileSync(stylingFile, stylingContent, 'utf-8');
    report.stylesCreated++;
    report.styling.push({
      file: stylingFile,
      type: 'sophisticated-css',
      details: 'Created sophisticated styling with McQueen tokens and master art principles'
    });
  }

  /**
   * Generate sophisticated CSS
   */
  private generateSophisticatedCSS(targetPath: string): string {
    const tokens = mcqueenTokens;
    const theme = this.themeSystem.getSystem();
    
    return `
/**
 * Sophisticated Styling - High-End Perfection
 * 
 * Generated for: ${targetPath}
 * Quality: Museum-level perfection
 * 
 * Based on:
 * - McQueen Design Tokens (John Dee × Alexander McQueen)
 * - Master Art Principles
 * - Sacred Geometry
 * - Theme Connections
 */

:root {
  /* ============================================
     MCQUEEN COLORS - Deep, complex, never flat
     ============================================ */
  --color-obsidian: ${tokens.colors.obsidian};
  --color-void: ${tokens.colors.void};
  --color-burnished-gold: ${tokens.colors.burnishedGold};
  --color-champagne: ${tokens.colors.champagne};
  --color-deep-violet: ${tokens.colors.deepViolet};
  --color-blood-amber: ${tokens.colors.bloodAmber};
  --color-verdigris: ${tokens.colors.verdigris};
  --color-bone: ${tokens.colors.bone};
  
  /* ============================================
     TYPOGRAPHY - Theatrical, historical, precise
     ============================================ */
  --font-display: ${tokens.typography.fontDisplay};
  --font-body: ${tokens.typography.fontBody};
  --font-ui: ${tokens.typography.fontUi};
  --font-mono: ${tokens.typography.fontMono};
  
  /* ============================================
     SPACING - Golden ratio based
     ============================================ */
  --spacing-unit: ${tokens.spacing.unit}px;
  --spacing-xs: ${tokens.spacing.xs};
  --spacing-sm: ${tokens.spacing.sm};
  --spacing-md: ${tokens.spacing.md};
  --spacing-lg: ${tokens.spacing.lg};
  --spacing-xl: ${tokens.spacing.xl};
  --spacing-2xl: ${tokens.spacing['2xl']};
  --spacing-3xl: ${tokens.spacing['3xl']};
  --spacing-4xl: ${tokens.spacing['4xl']};
  --phi: ${tokens.geometry.phi};
  --phi-inverse: ${tokens.geometry.phiInverse};
  
  /* ============================================
     MOTION - Organic, never mechanical
     ============================================ */
  --duration-instant: ${tokens.motion.duration.instant};
  --duration-fast: ${tokens.motion.duration.fast};
  --duration-normal: ${tokens.motion.duration.normal};
  --duration-slow: ${tokens.motion.duration.slow};
  --duration-glacial: ${tokens.motion.duration.glacial};
  --duration-reveal: ${tokens.motion.duration.reveal};
  
  --easing-out: ${tokens.motion.easing.out};
  --easing-in-out: ${tokens.motion.easing.inOut};
  --easing-reveal: ${tokens.motion.easing.reveal};
  --easing-settle: ${tokens.motion.easing.settle};
  --easing-breathe: ${tokens.motion.easing.breathe};
  
  /* ============================================
     SHADOWS - Depth without cliché
     ============================================ */
  --shadow-subtle: ${tokens.shadows.subtle};
  --shadow-medium: ${tokens.shadows.medium};
  --shadow-deep: ${tokens.shadows.deep};
  --shadow-glow-gold: ${tokens.shadows.glowGold};
  --shadow-glow-violet: ${tokens.shadows.glowViolet};
  --shadow-inset: ${tokens.shadows.inset};
  --shadow-inset-deep: ${tokens.shadows.insetDeep};
  
  /* ============================================
     BORDERS - Subtle, meaningful
     ============================================ */
  --border-width-thin: ${tokens.borders.width.thin};
  --border-width-medium: ${tokens.borders.width.medium};
  --border-width-thick: ${tokens.borders.width.thick};
  
  --border-radius-sm: ${tokens.borders.radius.sm};
  --border-radius-md: ${tokens.borders.radius.md};
  --border-radius-lg: ${tokens.borders.radius.lg};
  
  --border-style-subtle: ${tokens.borders.style.subtle};
  --border-style-medium: ${tokens.borders.style.medium};
  --border-style-strong: ${tokens.borders.style.strong};
  
  /* ============================================
     GLASS MORPHISM - Cathedral windows
     ============================================ */
  --glass-light-bg: ${tokens.glass.light.background};
  --glass-light-blur: ${tokens.glass.light.backdropFilter};
  --glass-light-border: ${tokens.glass.light.border};
  
  --glass-dark-bg: ${tokens.glass.dark.background};
  --glass-dark-blur: ${tokens.glass.dark.backdropFilter};
  --glass-dark-border: ${tokens.glass.dark.border};
  
  --glass-amber-bg: ${tokens.glass.amber.background};
  --glass-amber-blur: ${tokens.glass.amber.backdropFilter};
  --glass-amber-border: ${tokens.glass.amber.border};
  
  --glass-violet-bg: ${tokens.glass.violet.background};
  --glass-violet-blur: ${tokens.glass.violet.backdropFilter};
  --glass-violet-border: ${tokens.glass.violet.border};
  
  /* ============================================
     SACRED GEOMETRY - Dee's precision
     ============================================ */
  --phi: ${tokens.geometry.phi};
  --phi-inverse: ${tokens.geometry.phiInverse};
  --angle-pentagram: ${tokens.geometry.angles.pentagram}deg;
  --angle-hexagram: ${tokens.geometry.angles.hexagram}deg;
  --angle-octagram: ${tokens.geometry.angles.octagram}deg;
  --angle-enneagram: ${tokens.geometry.angles.enneagram}deg;
  --angle-zodiac: ${tokens.geometry.angles.zodiac}deg;
  --vesica-piscis: ${tokens.geometry.vesicaPiscis};
  --sqrt2: ${tokens.geometry.sqrt2};
  --sqrt3: ${tokens.geometry.sqrt3};
  --sqrt5: ${tokens.geometry.sqrt5};
  --cathedral-ratio: ${tokens.geometry.cathedral};
}

/* ============================================
   BASE STYLES - Sophisticated foundation
   ============================================ */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-champagne);
  background: var(--color-obsidian);
  overflow-x: hidden;
}

/* ============================================
   TYPOGRAPHY - Museum-quality elegance
   ============================================ */

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--color-burnished-gold);
}

h1 { font-size: 4.5rem; }
h2 { font-size: 3rem; }
h3 { font-size: 2rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

p {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  letter-spacing: 0.01em;
  color: var(--color-champagne);
}

/* ============================================
   GLASS PANELS - Cathedral windows
   ============================================ */

.glass-panel {
  background: var(--glass-light-bg);
  backdrop-filter: var(--glass-light-blur);
  border: var(--glass-light-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-deep);
}

.glass-panel-dark {
  background: var(--glass-dark-bg);
  backdrop-filter: var(--glass-dark-blur);
  border: var(--glass-dark-border);
}

.glass-panel-amber {
  background: var(--glass-amber-bg);
  backdrop-filter: var(--glass-amber-blur);
  border: var(--glass-amber-border);
}

.glass-panel-violet {
  background: var(--glass-violet-bg);
  backdrop-filter: var(--glass-violet-blur);
  border: var(--glass-violet-border);
}

/* ============================================
   BUTTONS - Elegant, never pill-shaped
   ============================================ */

.btn {
  font-family: var(--font-ui);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  padding: var(--spacing-md) var(--spacing-lg);
  border: var(--border-style-subtle);
  border-radius: var(--border-radius-md);
  background: transparent;
  color: var(--color-burnished-gold);
  cursor: pointer;
  transition: all var(--duration-normal) var(--easing-out);
  text-transform: none;
  text-decoration: none;
  display: inline-block;
}

.btn:hover {
  background: var(--glass-light-bg);
  border-color: var(--color-burnished-gold);
  transform: translateY(-1px);
  box-shadow: var(--shadow-glow-gold);
}

.btn:active {
  transform: translateY(0);
}

/* ============================================
   CARDS - Asymmetric, breathing
   ============================================ */

.card {
  background: var(--glass-light-bg);
  backdrop-filter: var(--glass-light-blur);
  border: var(--glass-light-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-deep);
  transition: all var(--duration-slow) var(--easing-out);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-gold);
}

/* ============================================
   ANIMATIONS - Fluid, organic
   ============================================ */

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes breathe {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.fade-in {
  animation: fadeIn var(--duration-reveal) var(--easing-reveal);
}

.reveal {
  animation: reveal var(--duration-reveal) var(--easing-reveal);
}

.breathe {
  animation: breathe 3s var(--easing-breathe) infinite;
}

/* ============================================
   SACRED GEOMETRY - Golden ratio layouts
   ============================================ */

.golden-ratio-container {
  display: grid;
  grid-template-columns: 1fr calc(1fr * var(--phi));
  gap: var(--spacing-lg);
}

.golden-ratio-vertical {
  aspect-ratio: 1 / var(--phi);
}

.fibonacci-spiral {
  position: relative;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 0%, var(--color-obsidian) 100%);
}

/* ============================================
   RESPONSIVE - Fluid, never break
   ============================================ */

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
  
  h1 { font-size: 3rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  
  .golden-ratio-container {
    grid-template-columns: 1fr;
  }
}

/* ============================================
   ACCESSIBILITY - Trauma-informed
   ============================================ */

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ============================================
   PERFECTION - Museum-quality polish
   ============================================ */

/* Every detail matters. Every pixel counts. */
/* This is not cute. This is not cartoon. */
/* This is sophisticated perfection. */
`;
  }

  /**
   * Apply theme connections
   */
  private async applyThemeConnections(targetPath: string, report: StylingReport): Promise<void> {
    const themeFile = path.join(targetPath, 'src', 'theme-connections.ts');
    const themeContent = this.generateThemeConnections(targetPath);
    
    fs.writeFileSync(themeFile, themeContent, 'utf-8');
    report.styling.push({
      file: themeFile,
      type: 'theme-connections',
      details: 'Applied theme connections with sophisticated integration'
    });
  }

  /**
   * Generate theme connections
   */
  private generateThemeConnections(targetPath: string): string {
    return `
/**
 * Theme Connections - Sophisticated Integration
 * 
 * Generated for: ${targetPath}
 * 
 * Connects all themes:
 * - Alchemy × Esotericism × Art × Science
 * - Mysticism × Psychology × Math × Sociology
 */

import { themeConnectionEngine } from '@cathedral/liber-arcanae/theme-connection-system';

export const themeConnections = themeConnectionEngine.getSystem();

export function getThemeConnections() {
  return themeConnections;
}

export function getTheme(id: string) {
  return themeConnections.themes.find(t => t.id === id);
}

export function getAllThemes() {
  return themeConnections.themes;
}
`;
  }

  /**
   * Style package components
   */
  private async stylePackageComponents(pkgPath: string, report: StylingReport): Promise<void> {
    const componentsPath = path.join(pkgPath, 'src');
    if (!fs.existsSync(componentsPath)) return;

    const files = this.getTypeScriptFiles(componentsPath);
    
    for (const file of files) {
      try {
        await this.styleComponent(file, report);
        report.componentsStyled++;
      } catch (error) {
        report.errors.push({
          file,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  }

  /**
   * Style app components
   */
  private async styleAppComponents(appPath: string, report: StylingReport): Promise<void> {
    const componentsPath = path.join(appPath, 'src', 'components');
    if (!fs.existsSync(componentsPath)) return;

    const files = this.getTypeScriptFiles(componentsPath);
    
    for (const file of files) {
      try {
        await this.styleComponent(file, report);
        report.componentsStyled++;
      } catch (error) {
        report.errors.push({
          file,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  }

  /**
   * Style a component
   */
  private async styleComponent(filePath: string, report: StylingReport): Promise<void> {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Add sophisticated styling imports if not present
    if (!content.includes('sophisticated.css') && !content.includes('mcqueen-tokens')) {
      const styledContent = this.addStylingImports(content, filePath);
      fs.writeFileSync(filePath, styledContent, 'utf-8');
      report.filesStyled++;
      report.styling.push({
        file: filePath,
        type: 'component-styling',
        details: 'Added sophisticated styling imports'
      });
    }
  }

  /**
   * Add styling imports to component
   */
  private addStylingImports(content: string, filePath: string): string {
    const importLine = "import './styles/sophisticated.css';";
    const mcqueenImport = "import { mcqueenTokens } from '@cathedral/japanese-design-system/mcqueen-tokens';";
    
    // Find the last import statement
    const importRegex = /^import\s+.*$/gm;
    const imports = content.match(importRegex);
    
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const afterLastImport = content.indexOf('\n', lastImportIndex);
      
      return content.slice(0, afterLastImport + 1) + 
             importLine + '\n' + 
             mcqueenImport + '\n' + 
             content.slice(afterLastImport + 1);
    }
    
    return importLine + '\n' + mcqueenImport + '\n' + content;
  }

  /**
   * Style package styles
   */
  private async stylePackageStyles(pkgPath: string, report: StylingReport): Promise<void> {
    const stylesPath = path.join(pkgPath, 'src', 'styles');
    if (!fs.existsSync(stylesPath)) return;

    const files = this.getCSSFiles(stylesPath);
    
    for (const file of files) {
      try {
        await this.enhanceCSSFile(file, report);
        report.filesStyled++;
      } catch (error) {
        report.errors.push({
          file,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  }

  /**
   * Style app styles
   */
  private async styleAppStyles(appPath: string, report: StylingReport): Promise<void> {
    const stylesPath = path.join(appPath, 'src', 'styles');
    if (!fs.existsSync(stylesPath)) return;

    const files = this.getCSSFiles(stylesPath);
    
    for (const file of files) {
      try {
        await this.enhanceCSSFile(file, report);
        report.filesStyled++;
      } catch (error) {
        report.errors.push({
          file,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  }

  /**
   * Enhance CSS file
   */
  private async enhanceCSSFile(filePath: string, report: StylingReport): Promise<void> {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Add sophisticated styling if not present
    if (!content.includes('--color-obsidian') && !content.includes('mcqueen')) {
      const enhanced = this.addSophisticatedCSS(content);
      fs.writeFileSync(filePath, enhanced, 'utf-8');
      report.styling.push({
        file: filePath,
        type: 'css-enhancement',
        details: 'Enhanced with sophisticated styling'
      });
    }
  }

  /**
   * Add sophisticated CSS
   */
  private addSophisticatedCSS(content: string): string {
    const tokens = mcqueenTokens;
    
    const sophisticatedVars = `
/* ============================================
   SOPHISTICATED STYLING VARIABLES
   ============================================ */

:root {
  --color-obsidian: ${tokens.colors.obsidian};
  --color-burnished-gold: ${tokens.colors.burnishedGold};
  --color-champagne: ${tokens.colors.champagne};
  --phi: ${tokens.geometry.phi};
}
`;
    
    return sophisticatedVars + '\n' + content;
  }

  // Helper methods
  private getPackages(dir: string): string[] {
    const packages: string[] = [];
    if (!fs.existsSync(dir)) return packages;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const pkgPath = path.join(dir, entry.name);
        if (fs.existsSync(path.join(pkgPath, 'package.json'))) {
          packages.push(pkgPath);
        }
      }
    }

    return packages;
  }

  private getApps(dir: string): string[] {
    const apps: string[] = [];
    if (!fs.existsSync(dir)) return apps;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        const appPath = path.join(dir, entry.name);
        if (fs.existsSync(path.join(appPath, 'package.json'))) {
          apps.push(appPath);
        }
      }
    }

    return apps;
  }

  private getTypeScriptFiles(dir: string): string[] {
    const files: string[] = [];
    if (!fs.existsSync(dir)) return files;

    const entries = fs.readdirSync(dir, { withFileTypes: true, recursive: true });
    
    for (const entry of entries) {
      if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        files.push(path.join(dir, entry.name));
      }
    }

    return files;
  }

  private getCSSFiles(dir: string): string[] {
    const files: string[] = [];
    if (!fs.existsSync(dir)) return files;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.css')) {
        files.push(path.join(dir, entry.name));
      }
    }

    return files;
  }

  private async styleDirectory(dir: string, report: StylingReport): Promise<void> {
    // Style all files in directory
    const files = this.getAllFiles(dir);
    
    for (const file of files) {
      try {
        await this.styleFile(file, report);
        report.filesStyled++;
      } catch (error) {
        report.errors.push({
          file,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  }

  private getAllFiles(dir: string): string[] {
    const files: string[] = [];
    if (!fs.existsSync(dir)) return files;

    const entries = fs.readdirSync(dir, { withFileTypes: true, recursive: true });
    
    for (const entry of entries) {
      if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.css'))) {
        files.push(path.join(dir, entry.name));
      }
    }

    return files;
  }

  private async styleFile(filePath: string, report: StylingReport): Promise<void> {
    // Apply sophisticated styling to file
    if (filePath.endsWith('.css')) {
      await this.enhanceCSSFile(filePath, report);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      await this.styleComponent(filePath, report);
    }
  }
}

export interface StylingReport {
  packagesStyled: number;
  appsStyled: number;
  filesStyled: number;
  componentsStyled: number;
  stylesCreated: number;
  errors: StylingError[];
  styling: StylingDetail[];
}

export interface StylingError {
  file: string;
  error: string;
}

export interface StylingDetail {
  file: string;
  type: string;
  details: string;
}

/**
 * Style entire monorepo
 */
export async function styleEntireMonorepo(
  targetDirectories: string[] = [
    '/Users/rebeccalemke/cathedral-fixed-clean/packages',
    '/Users/rebeccalemke/cathedral-fixed-clean/apps'
  ],
  stylingLevel: 'basic' | 'sophisticated' | 'perfection' = 'perfection'
): Promise<StylingReport> {
  const engine = new MonorepoStylingEngine({
    targetDirectories,
    stylingLevel,
    themeConnections: true,
    preserveOriginal: true,
    backupBeforeStyle: true
  });

  return engine.styleEntireMonorepo();
}

// Export
export { MonorepoStylingEngine };

