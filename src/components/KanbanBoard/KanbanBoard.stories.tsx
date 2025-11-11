    import React from 'react';
    import type { Meta, StoryObj } from '@storybook/react';
    import { KanbanBoard } from './KanbanBoard';
    import type { KanbanColumn, KanbanTask } from './types';

    const sampleColumns: KanbanColumn[] = [
      { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-1','task-2'] },
      { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-3'] },
      { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [] },
      { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-4'] }
    ];

    const sampleTasks: Record<string, KanbanTask> = {
      'task-1': { id: 'task-1', title: 'Implement drag and drop', status: 'todo', priority: 'high', assignee: 'John Doe', tags: ['frontend'], createdAt: new Date().toISOString() },
      'task-2': { id: 'task-2', title: 'Design task modal', status: 'todo', priority: 'medium', assignee: 'Jane Smith', tags: ['design'], createdAt: new Date().toISOString() },
      'task-3': { id: 'task-3', title: 'Setup TypeScript', status: 'in-progress', priority: 'urgent', assignee: 'John Doe', tags: ['setup'], createdAt: new Date().toISOString() },
      'task-4': { id: 'task-4', title: 'Create project structure', status: 'done', priority: 'low', assignee: 'Jane Smith', tags: ['setup'], createdAt: new Date().toISOString() }
    };

    const meta: Meta<typeof KanbanBoard> = { title: 'Components/KanbanBoard', component: KanbanBoard, parameters: { a11y: { element: '#root' } } };
export default meta;

type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
  args: {
    columns: sampleColumns,
    tasks: sampleTasks,
    onTaskMove: (taskId, from, to, i) => console.log('move', taskId, from, to, i),
    onTaskCreate: (col, task) => console.log('create', col, task),
    onTaskUpdate: (id, updates) => console.log('update', id, updates),
    onTaskDelete: (id) => console.log('delete', id)
  }
};

export const Empty: Story = { args: { columns: sampleColumns.map(c=>({ ...c, taskIds: [] })), tasks: {}, onTaskMove: ()=>{}, onTaskCreate: ()=>{}, onTaskUpdate: ()=>{}, onTaskDelete: ()=>{} } };

export const LargeDataset: Story = { args: {
  columns: (() => {
    const cols: KanbanColumn[] = [ 'todo','in-progress','review','done'].map((id,i)=> ({ id, title: ['To Do','In Progress','Review','Done'][i], color: '', taskIds: [] }));
    for(let t=1;t<=40;t++){ const col = cols[t%4]; col.taskIds.push('task-'+t); }
    return cols;
  })(),
  tasks: (() => { const out: Record<string, KanbanTask> = {}; for(let t=1;t<=40;t++){ out['task-'+t] = { id: 'task-'+t, title: `Task ${t}`, status: ['todo','in-progress','review','done'][t%4], createdAt: new Date().toISOString() }; } return out; })(),
  onTaskMove: ()=>{}, onTaskCreate: ()=>{}, onTaskUpdate: ()=>{}, onTaskDelete: ()=>{}
} };

export const Interactive: Story = {
  args: Default.args
};
