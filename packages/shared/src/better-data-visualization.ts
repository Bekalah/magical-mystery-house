/**
 * Better Data Visualization
 * 
 * @package @cathedral/shared
 * @license CC0-1.0 - Public Domain
 * 
 * 3D, geometric, beautiful data visualization
 * Not flat - uses sacred geometry, master art principles
 */

import { ExecutiveFunctionTask } from './executive-function-support';

export interface DataVisualization {
  type: '3d' | 'geometric' | 'sacred' | 'interactive';
  data: any;
  visualElements: VisualElements;
  accessibility: AccessibilityFeatures;
}

export interface VisualElements {
  colors: ColorHarmony;
  geometry: string[];
  depth: number; // 0-10, how much 3D depth
  animations: string[];
  patterns: string[];
}

export interface ColorHarmony {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  harmony: 'complementary' | 'triadic' | 'analogous' | 'monochromatic';
}

export interface AccessibilityFeatures {
  highContrast: boolean;
  screenReader: string;
  keyboardNav: boolean;
  reducedMotion: boolean;
}

/**
 * Build Better Data Visualization
 * 
 * Creates 3D, geometric, beautiful visualizations
 * Uses sacred geometry and master art principles
 */
export class BetterDataVisualization {
  /**
   * Create 3D geometric visualization
   */
  create3DGeometric(tasks: ExecutiveFunctionTask[]): DataVisualization {
    const categories = this.groupByCategory(tasks);
    const colorHarmony = this.generateColorHarmony(tasks);
    
    return {
      type: '3d',
      data: {
        categories,
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'completed').length,
        inProgressTasks: tasks.filter(t => t.status === 'in_progress').length,
        sacredGeometry: 'Flower of Life',
        goldenRatio: 1.618,
        fibonacci: this.generateFibonacci(tasks.length)
      },
      visualElements: {
        colors: colorHarmony,
        geometry: [
          'Flower of Life',
          'Metatron\'s Cube',
          'Vesica Piscis',
          'Golden Spiral'
        ],
        depth: 8, // High 3D depth
        animations: [
          'gentle-rotation',
          'breathing',
          'flow'
        ],
        patterns: [
          'Fibonacci sequence',
          'Golden ratio grid',
          'Sacred geometry overlay'
        ]
      },
      accessibility: {
        highContrast: true,
        screenReader: this.generateScreenReaderText(tasks),
        keyboardNav: true,
        reducedMotion: false
      }
    };
  }
  
  /**
   * Create interactive geometric visualization
   */
  createInteractiveGeometric(tasks: ExecutiveFunctionTask[]): DataVisualization {
    const visualization = this.create3DGeometric(tasks);
    
    return {
      ...visualization,
      type: 'interactive',
      data: {
        ...visualization.data,
        interactions: [
          'hover-to-expand',
          'click-to-focus',
          'drag-to-reorganize',
          'pinch-to-zoom'
        ],
        tooltips: tasks.map(t => ({
          id: t.id,
          title: t.title,
          description: t.description,
          position: this.calculatePosition(t)
        }))
      }
    };
  }
  
  /**
   * Group tasks by category
   */
  private groupByCategory(tasks: ExecutiveFunctionTask[]): Record<string, any> {
    return tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = {
          tasks: [],
          color: this.generateCategoryColor(task.category),
          geometry: this.getSacredGeometryForCategory(task.category),
          totalTime: 0,
          completionRate: 0
        };
      }
      acc[task.category].tasks.push(task);
      acc[task.category].totalTime += task.estimatedTime || 0;
      if (task.status === 'completed') {
        acc[task.category].completionRate += 1;
      }
      return acc;
    }, {} as Record<string, any>);
  }
  
  /**
   * Generate color harmony using master art principles
   */
  private generateColorHarmony(tasks: ExecutiveFunctionTask[]): ColorHarmony {
    // Use golden ratio for color selection
    const primary = '#4ECDC4'; // Teal (golden ratio inspired)
    const secondary = '#FFE66D'; // Yellow (complementary)
    const accent = '#FF6B6B'; // Coral (triadic)
    const background = '#F8F9FA'; // Light gray
    
    return {
      primary,
      secondary,
      accent,
      background,
      harmony: 'triadic'
    };
  }
  
  /**
   * Generate Fibonacci sequence
   */
  private generateFibonacci(n: number): number[] {
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib.slice(0, n);
  }
  
  /**
   * Generate category color
   */
  private generateCategoryColor(category: string): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
      '#A8E6CF', '#FFD3A5', '#FD9853', '#A8DADC'
    ];
    const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  }
  
  /**
   * Get sacred geometry for category
   */
  private getSacredGeometryForCategory(category: string): string {
    const geometries = [
      'Flower of Life',
      'Metatron\'s Cube',
      'Vesica Piscis',
      'Golden Spiral',
      'Pentagram',
      'Octagon'
    ];
    const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return geometries[hash % geometries.length];
  }
  
  /**
   * Calculate 3D position for task
   */
  private calculatePosition(task: ExecutiveFunctionTask): { x: number; y: number; z: number } {
    // Use golden ratio for positioning
    const phi = 1.618;
    const angle = (task.priority === 'urgent' ? 0 : 
                   task.priority === 'high' ? Math.PI / 4 :
                   task.priority === 'medium' ? Math.PI / 2 : Math.PI) * phi;
    
    return {
      x: Math.cos(angle) * 100,
      y: Math.sin(angle) * 100,
      z: task.status === 'completed' ? 50 : task.status === 'in_progress' ? 0 : -50
    };
  }
  
  /**
   * Generate screen reader text
   */
  private generateScreenReaderText(tasks: ExecutiveFunctionTask[]): string {
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    
    return `Task visualization: ${tasks.length} total tasks. ${completed} completed, ${inProgress} in progress, ${pending} pending. ` +
           `Tasks organized by category with sacred geometry patterns. Use arrow keys to navigate.`;
  }
}

