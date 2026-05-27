import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let isHidden = true;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (isHidden) {
        cursor.style.opacity = '1';
        dot.style.opacity = '1';
        isHidden = false;
      }
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
      dot.style.opacity = '0';
      isHidden = true;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;

      cursor.style.transform = `translate3d(${cursorX - 16}px, ${cursorY - 16}px, 0)`;
      dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    // Initial opacity is 0 so it doesn't flash in the corner
    cursor.style.opacity = '0';
    dot.style.opacity = '0';

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      dot.style.display = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(173, 51, 45, 0.5)',
          backgroundColor: 'rgba(173, 51, 45, 0.02)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'opacity 0.3s ease',
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#ad332d',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          boxShadow: '0 0 10px rgba(173, 51, 45, 0.8)',
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  );
}
