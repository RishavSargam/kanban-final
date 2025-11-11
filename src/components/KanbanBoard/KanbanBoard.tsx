import React, { useMemo } from 'react';
import type { KanbanViewProps } from './types';
import { KanbanColumn } from './KanbanColumn';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

export const KanbanBoard: React.FC<KanbanViewProps> = ({ columns, tasks, onTaskMove, onTaskCreate, onTaskUpdate, onTaskDelete }) => {
  const { draggedId, start, end, keyboardGrab, keyboardRelease, keyboardSetTarget, keyboardGrabbedId, keyboardTargetColumnId, keyboardTargetIndex } = useDragAndDrop();

  const tasksByColumn = useMemo(() => {
    const map: Record<string, any[]> = {};
    columns.forEach(c => map[c.id] = c.taskIds.map(id => tasks[id]).filter(Boolean));
    return map;
  }, [columns, tasks]);

  const handleDropTask = (taskId: string, fromColumn: string, toColumn: string, index: number) => {
    const from = tasks[taskId]?.status || fromColumn;
    onTaskMove(taskId, from, toColumn, index);
    end();
  };

  const handleDragStart = (taskId: string, columnId: string) => start(taskId, columnId);

  // keyboard actions passed to cards
  const onKeyboardGrab = (taskId: string, columnId: string) => keyboardGrab(taskId, columnId);
  const onKeyboardRelease = () => {
    if (keyboardGrabbedId && keyboardTargetColumnId) {
      const toIndex = keyboardTargetIndex ?? (tasksByColumn[keyboardTargetColumnId]?.length ?? 0);
      const from = tasks[keyboardGrabbedId]?.status ?? keyboardTargetColumnId;
      onTaskMove(keyboardGrabbedId, from, keyboardTargetColumnId, toIndex);
    }
    keyboardRelease();
  };
  const onKeyboardSetTarget = (columnId: string, index: number | null) => keyboardSetTarget(columnId, index);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 px-4 py-6" style={{ scrollSnapType: 'x mandatory' }}>
        {columns.map(col => (
          <div key={col.id} style={{ scrollSnapAlign: 'start' }}>
            <KanbanColumn
              column={col}
              tasks={tasksByColumn[col.id] || []}
              onDropTask={handleDropTask}
              onOpenTask={(id)=>{}}
              onDragStart={handleDragStart}
              // keyboard props
              keyboardGrabbedId={keyboardGrabbedId}
              keyboardTargetColumnId={keyboardTargetColumnId}
              keyboardTargetIndex={keyboardTargetIndex ?? null}
              onKeyboardSetTarget={onKeyboardSetTarget}
              onKeyboardRelease={onKeyboardRelease}
              onKeyboardGrab={onKeyboardGrab}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
