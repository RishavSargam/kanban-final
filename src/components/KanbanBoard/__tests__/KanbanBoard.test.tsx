import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { KanbanBoard } from '../KanbanBoard';
import type { KanbanColumn, KanbanTask } from '../types';

const columns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', taskIds: ['task-1'] },
  { id: 'done', title: 'Done', taskIds: [] }
];

const tasks: Record<string, KanbanTask> = {
  'task-1': { id: 'task-1', title: 'Test Task', status: 'todo', createdAt: new Date().toISOString() }
};

test('keyboard grab and move triggers onTaskMove', () => {
  const moveMock = jest.fn();
  render(<KanbanBoard columns={columns} tasks={tasks} onTaskMove={moveMock} onTaskCreate={()=>{}} onTaskUpdate={()=>{}} onTaskDelete={()=>{}} />);

  const card = screen.getByRole('button', { name: /Test Task/i });
  card.focus();
  // press space to grab (handled by card)
  fireEvent.keyDown(card, { key: ' ' });
  // now simulate arrow down to set target and release (escape or space again)
  fireEvent.keyDown(card, { key: 'ArrowDown' });
  fireEvent.keyDown(card, { key: ' ' });
  // onTaskMove should have been called once (moving task-1 into 'done' or same column depending on target)
  expect(moveMock).toHaveBeenCalled();
});
