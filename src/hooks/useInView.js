import { useState, useEffect, useRef } from 'react';

export default function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.05, // Mount as soon as 5% of the element is visible
      ...options
    });

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options]);

  return [ref, isInView];
}
