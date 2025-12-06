import { useEffect, useRef } from 'react';

// Adds an `is-visible` class when the element is near the viewport to trigger CSS-driven reveals
const useReveal = (options = {}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observerOptions = {
      threshold: options.threshold ?? 0.2,
      rootMargin: options.rootMargin ?? '0px',
      once: options.once ?? false
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (observerOptions.once) {
            observer.unobserve(entry.target);
          }
        } else if (!observerOptions.once) {
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options.once, options.rootMargin, options.threshold]);

  return targetRef;
};

export default useReveal;
