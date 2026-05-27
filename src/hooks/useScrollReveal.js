import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP ScrollTrigger reveal hook.
 * Attach to a container ref — will find all children with [data-reveal] and animate them.
 * 
 * @param {Object} options
 * @param {string} options.start - ScrollTrigger start position (default: 'top 85%')
 * @param {number} options.stagger - Stagger delay between child reveals (default: 0.12)
 * @param {number} options.duration - Animation duration (default: 0.9)
 * @param {string} options.ease - GSAP ease (default: 'power3.out')
 */
export default function useScrollReveal(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const {
      start = 'top 85%',
      stagger = 0.12,
      duration = 0.9,
      ease = 'power3.out',
    } = options;

    // Find all elements with data-reveal attribute
    const revealElements = container.querySelectorAll('[data-reveal]');

    if (revealElements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealElements,
        {
          opacity: 0,
          y: 40,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
