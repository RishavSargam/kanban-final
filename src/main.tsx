import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import { KanbanBoard } from './components/KanbanBoard/KanbanBoard';
import type { KanbanColumn, KanbanTask } from './components/KanbanBoard/types';

const columns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', taskIds: ['task-1','task-2'] },
  { id: 'in-progress', title: 'In Progress', taskIds: ['task-3'] },
  { id: 'review', title: 'Review', taskIds: [] },
  { id: 'done', title: 'Done', taskIds: ['task-4'] }
];

const tasks: Record<string, KanbanTask> = {
  'task-1': { id: 'task-1', title: 'Implement drag and drop', status: 'todo', priority: 'high', assignee: 'John Doe', tags: ['frontend'], createdAt: new Date().toISOString() },
  'task-2': { id: 'task-2', title: 'Design task modal', status: 'todo', priority: 'medium', assignee: 'Jane Smith', tags: ['design'], createdAt: new Date().toISOString() },
  'task-3': { id: 'task-3', title: 'Setup TypeScript', status: 'in-progress', priority: 'urgent', assignee: 'John Doe', tags: ['setup'], createdAt: new Date().toISOString() },
  'task-4': { id: 'task-4', title: 'Create project structure', status: 'done', priority: 'low', assignee: 'Jane Smith', tags: ['setup'], createdAt: new Date().toISOString() }
};

function App() {
  return <div className="min-h-screen bg-neutral-50 p-6"><KanbanBoard columns={columns} tasks={tasks} onTaskMove={()=>{}} onTaskCreate={()=>{}} onTaskUpdate={()=>{}} onTaskDelete={()=>{}} /></div>;
}

createRoot(document.getElementById('root')!).render(<App />);
