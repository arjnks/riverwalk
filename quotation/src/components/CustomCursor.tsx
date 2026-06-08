import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Instant tracking, no spring/slippery feel
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); 
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
        zIndex: 10000,
        x: cursorX,
        y: cursorY,
        mixBlendMode: 'difference',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 45 : 0
      }}
      transition={{ duration: 0.1 }}
    >
      {/* Crosshair lines */}
      <div style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'var(--accent)' }} />
      <div style={{ position: 'absolute', width: '2px', height: '100%', backgroundColor: 'var(--accent)' }} />
      {/* Center dot */}
      <div style={{ position: 'absolute', width: '6px', height: '6px', backgroundColor: '#fff', borderRadius: '50%' }} />
    </motion.div>
  );
};
