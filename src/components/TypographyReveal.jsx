import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * TypographyReveal
 * A premium SplitText-like component for cinematic enterprise-grade typography reveals.
 * Animates text elements using custom staggers, masking, character tracking, or skew angles.
 */
export default function TypographyReveal({
  text,
  type = 'words', // 'words' | 'chars'
  animationType = 'mask', // 'mask' | 'tracking' | 'skew' | 'reveal'
  className = '',
  style = {},
  tag = 'h2', // HTML tag to render
  delay = 0,
  duration = 0.85,
  stagger = 0.04,
  scrollTriggerStart = 'top 85%'
}) {
  const containerRef = useRef(null);
  const items = type === 'chars' ? text.split('') : text.split(' ');
  const Tag = tag;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.reveal-item');
    const needsElements = animationType === 'mask' || animationType === 'skew';
    if (needsElements && elements.length === 0) return;

    const ctx = gsap.context(() => {
      // Different animation personalities for alternate sections
      if (animationType === 'mask') {
        // Stripe/Linear-style upward slide reveal with overflow mask
        gsap.fromTo(
          elements,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: duration,
            ease: 'power4.out',
            stagger: stagger,
            delay: delay,
            scrollTrigger: {
              trigger: container,
              start: scrollTriggerStart,
              toggleActions: 'play none none none'
            }
          }
        );
      } else if (animationType === 'tracking') {
        // Apple/Framer-style kinetic letter tracking expand + blur reveal
        gsap.fromTo(
          container,
          { letterSpacing: '-0.25em', filter: 'blur(8px)', opacity: 0 },
          {
            letterSpacing: 'normal',
            filter: 'blur(0px)',
            opacity: 1,
            duration: duration * 1.3,
            ease: 'expo.out',
            delay: delay,
            scrollTrigger: {
              trigger: container,
              start: scrollTriggerStart,
              toggleActions: 'play none none none'
            }
          }
        );
      } else if (animationType === 'skew') {
        // Creative agency style slanted rotation slide
        gsap.fromTo(
          elements,
          { yPercent: 120, rotate: 6, skewX: 8, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            skewX: 0,
            opacity: 1,
            duration: duration * 1.1,
            ease: 'power3.out',
            stagger: stagger * 1.2,
            delay: delay,
            scrollTrigger: {
              trigger: container,
              start: scrollTriggerStart,
              toggleActions: 'play none none none'
            }
          }
        );
      } else if (animationType === 'reveal') {
        // Elegant diagonal clip-path swipe reveal
        gsap.fromTo(
          container,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0 },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            duration: duration * 1.4,
            ease: 'power4.inOut',
            delay: delay,
            scrollTrigger: {
              trigger: container,
              start: scrollTriggerStart,
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [text, type, animationType, delay, duration, stagger, scrollTriggerStart]);

  return (
    <Tag
      ref={containerRef}
      className={`typography-reveal ${className}`}
      style={{
        margin: 0,
        position: 'relative',
        ...style
      }}
    >
      {animationType === 'tracking' || animationType === 'reveal' ? (
        // For whole-container tracking/clip reveals, keep text continuous
        text
      ) : (
        // For staggers, wrap each word/character in an overflow masked container
        items.map((item, idx) => (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              lineHeight: '1.2'
            }}
          >
            <span
              className="reveal-item"
              style={{
                display: 'inline-block',
                whiteSpace: type === 'chars' ? 'pre' : 'normal'
              }}
            >
              {item}
              {type === 'words' && idx < items.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        ))
      )}
    </Tag>
  );
}
