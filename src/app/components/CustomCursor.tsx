'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { cursorType } = useCursor();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      transition: {
        type: 'spring',
        mass: 0.3
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      transition: {
        type: 'spring',
        mass: 0.3
      }
    },
    link: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      transition: {
        type: 'spring',
        mass: 0.3
      }
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      scale: 0.8,
      transition: {
        type: 'spring',
        mass: 0.3
      }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 shadow-lg "
      animate={cursorType}
      variants={variants}
      style={{
        imageRendering: 'pixelated',
        clipPath: 'polygon(0% 0%, 25% 0%, 25% 25%, 50% 25%, 50% 0%, 75% 0%, 75% 25%, 100% 25%, 100% 50%, 75% 50%, 75% 75%, 100% 75%, 100% 100%, 75% 100%, 75% 75%, 50% 75%, 50% 100%, 25% 100%, 25% 75%, 0% 75%, 0% 50%, 25% 50%, 25% 25%, 0% 25%)',
      }}
    />
  );
};

export default CustomCursor;
