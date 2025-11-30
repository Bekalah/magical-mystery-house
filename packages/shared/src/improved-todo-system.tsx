/**
 * Improved TODO System
 * 
 * @package @cathedral/shared
 * @license CC0-1.0 - Public Domain
 * 
 * Visual, geometric, trauma-informed TODO system
 * Replaces flat school systems that impaired executive function
 */

import React from 'react';
import '@cathedral/shared/src/styles/unified-professional.css';
import { ExecutiveFunctionTask, ExecutiveFunctionSupport } from './executive-function-support';

export interface ImprovedTODOProps {
  tasks: ExecutiveFunctionTask[];
  onTaskUpdate: (task: ExecutiveFunctionTask) => void;
  onTaskComplete: (taskId: string) => void;
  visualStyle?: 'geometric' | 'organic' | 'sacred' | 'minimal';
}

/**
 * Improved TODO Component
 * 
 * Features:
 * - 3D geometric visualization (not flat)
 * - Auto-correction with gentle guidance
 * - Sacred geometry patterns
 * - Color harmony based on master art principles
 * - Trauma-informed, accessible design
 */
export function ImprovedTODO({
  tasks,
  onTaskUpdate,
  onTaskComplete,
  visualStyle = 'geometric'
}: ImprovedTODOProps) {
  const support = new ExecutiveFunctionSupport();
  
  // Auto-correct all tasks
  const improvedTasks = tasks.map(task => support.autoCorrectTask(task));
  
  // Build better data visualization
  const visualization = support.buildBetterData(improvedTasks);
  
  return (
    <div className="improved-todo-system professional-theme" data-visual-style={visualStyle}>
      <div className="todo-header professional-theme">
        <h2>✨ Your Tasks</h2>
        <p>Organized beautifully, not flat</p>
      </div>
      
      <div className="todo-visualization professional-theme" data-type={visualization.visualization}>
        {improvedTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onTaskUpdate}
            onComplete={onTaskComplete}
            visualStyle={visualStyle}
          />
        ))}
      </div>
      
      <div className="todo-suggestions professional-theme">
        <h3>💫 Gentle Guidance</h3>
        <ul>
          {improvedTasks.map(task => (
            <li key={task.id}>
              {task.status === 'blocked' && (
                <span>🔄 {task.title} might be easier if broken into smaller steps</span>
              )}
              {task.status === 'pending' && task.energyLevel === 'high' && (
                <span>💫 {task.title} needs high energy - schedule for when you're ready</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface TaskCardProps {
  task: ExecutiveFunctionTask;
  onUpdate: (task: ExecutiveFunctionTask) => void;
  onComplete: (taskId: string) => void;
  visualStyle: string;
}

function TaskCard({ task, onUpdate, onComplete, visualStyle }: TaskCardProps) {
  const visual = task.visualRepresentation || {
    color: '#95E1D3',
    shape: 'circle',
    geometry: 'Golden Spiral'
  };
  
  return (
    <div
      className="task-card professional-theme"
      data-priority={task.priority}
      data-status={task.status}
      data-energy={task.energyLevel}
      style={{
        '--task-color': visual.color,
        '--task-shape': visual.shape,
        '--task-geometry': visual.geometry
      } as React.CSSProperties}
    >
      <div className="task-visual professional-theme">
        <div
          className={`task-shape task-shape-${visual.shape}`}
          style={{ backgroundColor: visual.color }}
        />
        <div className="task-geometry-pattern professional-theme" data-geometry={visual.geometry} />
      </div>
      
      <div className="task-content professional-theme">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        
        <div className="task-meta professional-theme">
          <span className="task-priority professional-theme" data-priority={task.priority}>
            {task.priority}
          </span>
          <span className="task-status professional-theme" data-status={task.status}>
            {task.status}
          </span>
          <span className="task-energy professional-theme" data-energy={task.energyLevel}>
            Energy: {task.energyLevel}
          </span>
        </div>
        
        <div className="task-actions professional-theme">
          <button
            onClick={() => onUpdate({ ...task, status: 'in_progress' })}
            disabled={task.status === 'completed'}
          >
            Start
          </button>
          <button
            onClick={() => onComplete(task.id)}
            disabled={task.status === 'completed'}
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * TODO System Styles
 * 
 * Beautiful, not flat - uses sacred geometry, color harmony, depth
 */
export const improvedTODOStyles = `
.improved-todo-system {
  padding: 2rem;
  background: radial-gradient(circle, rgba(79, 172, 254, 0.1), transparent);
  border-radius: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.todo-visualization {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.task-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.task-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--task-color);
  opacity: 0.8;
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.task-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  height: 80px;
  position: relative;
}

.task-shape {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  z-index: 1;
}

.task-shape-circle {
  border-radius: 50%;
}

.task-shape-square {
  border-radius: 0.5rem;
}

.task-shape-triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  border-radius: 0;
}

.task-shape-hexagon {
  clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
}

.task-shape-star {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.task-geometry-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: var(--task-geometry);
  pointer-events: none;
}

.task-content h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.25rem;
}

.task-content p {
  margin: 0 0 1rem 0;
  color: #7f8c8d;
  line-height: 1.6;
}

.task-meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.task-priority,
.task-status,
.task-energy {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.task-priority[data-priority="urgent"] {
  background: #FF6B6B;
  color: white;
}

.task-priority[data-priority="high"] {
  background: #4ECDC4;
  color: white;
}

.task-priority[data-priority="medium"] {
  background: #FFE66D;
  color: #2c3e50;
}

.task-priority[data-priority="low"] {
  background: #95E1D3;
  color: #2c3e50;
}

.task-status[data-status="completed"] {
  background: #A8E6CF;
  color: #2c3e50;
}

.task-status[data-status="in_progress"] {
  background: #FFD3A5;
  color: #2c3e50;
}

.task-status[data-status="blocked"] {
  background: #FF6B6B;
  color: white;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.task-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: var(--task-color);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.task-actions button:hover:not(:disabled) {
  opacity: 0.8;
}

.task-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.todo-suggestions {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
}

.todo-suggestions h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.todo-suggestions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-suggestions li {
  padding: 0.5rem 0;
  color: #7f8c8d;
  line-height: 1.6;
}
`;

