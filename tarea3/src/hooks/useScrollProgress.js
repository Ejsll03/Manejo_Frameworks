import { useEffect } from 'react';

// Keeps CSS variables in sync with scroll progression for parallax-style animations
const useScrollProgress = () => {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const doc = document.documentElement;
    let frame = null;

    const updateVars = () => {
      frame = null;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      doc.style.setProperty('--scroll-progress', progress.toFixed(4));
      doc.style.setProperty('--scroll-y', `${scrollY}px`);
      doc.style.setProperty('--scroll-velocity', `${Math.min(Math.max(scrollY / 800, 0), 1)}`);
    };

    const onScroll = () => {
      if (frame !== null) {
        return;
      }
      frame = window.requestAnimationFrame(updateVars);
    };

    updateVars();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);
};

export default useScrollProgress;
