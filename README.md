# Kanban Component — Final Submission

## Overview
This project contains a from-scratch Kanban Board component built using **React**, **TypeScript**, **Tailwind CSS**, and **Storybook**. It demonstrates a working Kanban UI with basic HTML5 drag-and-drop, TypeScript types, and Storybook stories for component review.

## How to run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run Storybook (recommended for review):
   ```bash
   npm run storybook
   ```
3. (Optional) Run the demo app locally:
   ```bash
   npm run dev
   ```

## What is included
- `src/components/KanbanBoard` — KanbanBoard, KanbanColumn, KanbanCard, types and stories
- `src/hooks` — `useDragAndDrop`, `useKanbanBoard` (state helpers)
- `src/utils` — small helpers (formatting, priority color)
- Tailwind CSS configuration and global styles
- Storybook config and stories: Default, Empty, LargeDataset, Interactive

## Notes on compliance
- No UI libraries or AI builders used; everything is handwritten from scratch.
- Accessibility basics included: ARIA roles and focus-visible outline.
- Drag-and-drop uses HTML5 drag events. For more robust production usage consider adding pointer-based DnD or a maintained drag library if allowed.

## Next improvements (optional)
- Keyboard drag-and-drop accessibility (Space + arrows)
- Animated placeholder and reordering during drag
- Per-column virtualization for very large lists
- Unit & integration tests for components

## Tech
- React 18, TypeScript, Tailwind CSS, Storybook


## Running tests

Install deps then run:
```bash
npm run test
```

## Notes
- Tests are basic smoke tests to validate keyboard interactions. Add more comprehensive tests for production readiness.


Author

Rishav Raj
   -rishavani24@gmail.com
   - github.com/RishavSargam
