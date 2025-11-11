import React, { useCallback } from 'react';
import type { KanbanTask } from './types';
import { formatDate, getInitials, isOverdue, priorityColor } from '../../utils/task.utils';

type Props = {
  task: KanbanTask;
  index: number;
  onClick?: (id: string) => void;
  onDragStart?: (taskId: string, columnId: string) => void;
  // keyboard handlers
  onKeyboardGrab?: (taskId: string, columnId: string) => void;
  onKeyboardSetTarget?: (index: number | null) => void;
  onKeyboardRelease?: () => void;
};

export const KanbanCard: React.FC<Props> = React.memo(({ task, index, onClick, onDragStart, onKeyboardGrab, onKeyboardSetTarget, onKeyboardRelease }) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Space to pick up / release
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      onKeyboardGrab?.(task.id, task.status);
      return;
    }
    // Enter to open maybe
    if (e.key === 'Enter') {
      onClick?.(task.id);
      return;
    }
    // Arrow keys will move the placeholder within a column — card provides index context
    if (e.key === 'ArrowUp') { onKeyboardSetTarget?.(Math.max(0, index-1)); e.preventDefault(); return; }
    if (e.key === 'ArrowDown') { onKeyboardSetTarget?.(index+1); e.preventDefault(); return; }
    if (e.key === 'Escape') { onKeyboardRelease?.(); e.preventDefault(); return; }
  }, [task, index, onClick, onKeyboardGrab, onKeyboardSetTarget, onKeyboardRelease]);

  return (
    <div
      role="button"
      aria-label={`${task.title}. Status: ${task.status}. Priority: ${task.priority || 'none'}.`}
      tabIndex={0}
      draggable
      onDragStart={(e) => { e.dataTransfer.setData('text/plain', task.id); e.dataTransfer.effectAllowed = 'move'; onDragStart?.(task.id, task.status); }}
      onKeyDown={handleKeyDown}
      className={`bg-white border border-neutral-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${priorityColor(task.priority)}`}
      onClick={() => onClick?.(task.id)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm text-neutral-900 line-clamp-2">{task.title}</h4>
        {task.priority && (<span className="text-xs px-2 py-0.5 rounded bg-neutral-100">{task.priority}</span>)}
      </div>
      {task.description && <p className="text-xs text-neutral-600 mb-2 line-clamp-2">{task.description}</p>}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">{task.tags?.slice(0,3).map(t => <span key={t} className="text-xs bg-neutral-100 px-2 py-0.5 rounded">{t}</span>)}</div>
        {task.assignee && <div className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">{getInitials(task.assignee)}</div>}
      </div>
      {task.dueDate && <div className={`text-xs mt-2 ${isOverdue(task.dueDate) ? 'text-red-600' : 'text-neutral-500'}`}>Due: {formatDate(task.dueDate)}</div>}
    </div>
  );
});
KanbanCard.displayName = 'KanbanCard';
