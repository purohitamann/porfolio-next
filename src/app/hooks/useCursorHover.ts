'use client';
import { useCursor } from '../context/CursorContext';

export const useCursorHover = (type: 'hover' | 'link' = 'hover') => {
  const { setCursorType } = useCursor();

  const cursorHandlers = {
    onMouseEnter: () => setCursorType(type),
    onMouseLeave: () => setCursorType('default'),
    onMouseDown: () => setCursorType('click'),
    onMouseUp: () => setCursorType(type),
  };

  return cursorHandlers;
};
