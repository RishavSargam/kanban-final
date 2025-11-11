import React, { useCallback } from 'react';
import type { KanbanColumn as KC, KanbanTask } from './types';
import { KanbanCard } from './KanbanCard';
import clsx from 'clsx';

type Props = {
  column: KC;
  tasks: KanbanTask[];
  onDropTask: (taskId: string, fromColumn: string, toColumn: string, index: number) => void;
  onOpenTask?: (id: string) => void;
  onDragStart?: (taskId: string, columnId: string) => void;
  // keyboard props
  keyboardGrabbedId?: string | null;
  keyboardTargetColumnId?: string | null;
  keyboardTargetIndex?: number | null;
  onKeyboardSetTarget?: (columnId: string, index: number | null) => void;
  onKeyboardRelease?: () => void;
  onKeyboardGrab?: (taskId: string, columnId: string) => void;
};

export const KanbanColumn: React.FC<Props> = ({ column, tasks, onDropTask, onOpenTask, onDragStart, keyboardGrabbedId, keyboardTargetColumnId, keyboardTargetIndex, onKeyboardSetTarget, onKeyboardRelease, onKeyboardGrab }) => {
  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;
    onDropTask(taskId, '', column.id, tasks.length);
  }, [column.id, onDropTask, tasks.length]);

  // compute placeholder index for this column when keyboard dragging
  const isPlaceholderActive = keyboardGrabbedId && keyboardTargetColumnId === column.id;
  const placeholderIndex = isPlaceholderActive ? (keyboardTargetIndex ?? tasks.length) : -1;

  return (
    <div role="region" aria-label={`${column.title} column. ${tasks.length} tasks.`} className="w-72 flex-shrink-0 bg-neutral-50 rounded-lg border border-neutral-100">
      <div className="sticky top-0 bg-neutral-50 p-3 border-b border-neutral-200 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{column.title}</h3>
          <div className="text-sm text-neutral-500">{tasks.length}</div>
        </div>
      </div>

      <div className="p-3 space-y-3 min-h-[120px]" onDragOver={handleDragOver} onDrop={handleDrop} onKeyDown={(e)=>{ /* prevent page scroll when using arrows */ if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault(); }}>
        {tasks.length === 0 && placeholderIndex === -1 ? (
          <div className="text-sm text-neutral-500 p-4">No tasks</div>
        ) : (
          tasks.map((t, i) => {
            // if placeholder should be rendered before this index
            const showBefore = placeholderIndex === i;
            return (
              <React.Fragment key={t.id}>
                {showBefore && (
                  <div className={clsx('h-12 rounded border-2 border-dashed border-neutral-200 animate-pulse bg-neutral-100', 'transition-all')} aria-hidden> </div>
                )}
                <KanbanCard
                  task={t}
                  index={i}
                  onClick={onOpenTask}
                  onDragStart={onDragStart}
                  // keyboard handlers passed down to card so it can move target
                  onKeyboardGrab={onKeyboardGrab}
                  onKeyboardSetTarget={onKeyboardSetTarget ? ((idx:number|null)=>onKeyboardSetTarget(column.id, idx)) : undefined}
                  onKeyboardRelease={onKeyboardRelease}
                />
              </React.Fragment>
            );
          })
        )}
        {placeholderIndex === tasks.length && (
          <div className={clsx('h-12 rounded border-2 border-dashed border-neutral-200 animate-pulse bg-neutral-100', 'transition-all')} aria-hidden> </div>
        )}
      </div>

      <div className="p-3">
        <button className="w-full text-sm py-2 rounded bg-neutral-100">Add Task</button>
      </div>
    </div>
  );
};
