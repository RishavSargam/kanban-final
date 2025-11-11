import { useState, useCallback } from 'react';

export type DragState = {
  draggedId: string | null;
  sourceColumnId: string | null;
  isDragging: boolean;
  // keyboard-specific state
  keyboardGrabbedId: string | null;
  keyboardSourceColumnId: string | null;
  keyboardTargetColumnId: string | null;
  keyboardTargetIndex: number | null;
};

export const useDragAndDrop = () => {
  const [state, setState] = useState<DragState>({
    draggedId: null,
    sourceColumnId: null,
    isDragging: false,
    keyboardGrabbedId: null,
    keyboardSourceColumnId: null,
    keyboardTargetColumnId: null,
    keyboardTargetIndex: null
  });

  const start = useCallback((taskId: string, columnId: string) => setState(s => ({ ...s, draggedId: taskId, sourceColumnId: columnId, isDragging: true })), []);
  const end = useCallback(() => setState(s => ({ ...s, draggedId: null, sourceColumnId: null, isDragging: false })), []);

  const keyboardGrab = useCallback((taskId: string, columnId: string) => setState(s => ({ ...s, keyboardGrabbedId: taskId, keyboardSourceColumnId: columnId, keyboardTargetColumnId: columnId, keyboardTargetIndex: null })), []);
  const keyboardRelease = useCallback(() => setState(s => ({ ...s, keyboardGrabbedId: null, keyboardSourceColumnId: null, keyboardTargetColumnId: null, keyboardTargetIndex: null })), []);
  const keyboardSetTarget = useCallback((columnId: string, index: number | null) => setState(s => ({ ...s, keyboardTargetColumnId: columnId, keyboardTargetIndex: index })), []);

  return { ...state, start, end, keyboardGrab, keyboardRelease, keyboardSetTarget };
};
