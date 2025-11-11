import { useCallback, useState } from 'react';
import type { KanbanColumn, KanbanTask } from '../components/KanbanBoard/types';

export function useKanbanBoard(initialColumns: KanbanColumn[], initialTasks: Record<string, KanbanTask>) {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(initialTasks);

  const moveTask = useCallback((taskId: string, fromColumn: string, toColumn: string, index: number) => {
    setColumns(prev => {
      const copy = prev.map(c => ({ ...c }));
      const source = copy.find(c => c.id === fromColumn);
      const dest = copy.find(c => c.id === toColumn);
      if (!source || !dest) return prev;
      const removedIndex = source.taskIds.indexOf(taskId);
      if (removedIndex !== -1) source.taskIds.splice(removedIndex,1);
      dest.taskIds.splice(index, 0, taskId);
      return copy;
    });
    setTasks(prev => ({ ...prev, [taskId]: { ...prev[taskId], status: toColumn } }));
  }, []);

  const createTask = useCallback((columnId: string, task: KanbanTask) => {
    setTasks(prev => ({ ...prev, [task.id]: task }));
    setColumns(prev => prev.map(c => c.id === columnId ? { ...c, taskIds: [...c.taskIds, task.id] } : c));
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<KanbanTask>) => {
    setTasks(prev => ({ ...prev, [taskId]: { ...prev[taskId], ...updates } }));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => {
      const copy = { ...prev }; delete copy[taskId]; return copy;
    });
    setColumns(prev => prev.map(c => ({ ...c, taskIds: c.taskIds.filter(id => id !== taskId) })));
  }, []);

  return { columns, tasks, moveTask, createTask, updateTask, deleteTask } as const;
}
