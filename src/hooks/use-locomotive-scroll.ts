'use client';

import { useEffect, useRef } from 'react';

interface LocomotiveScrollInstance {
  update: () => void;
  destroy: () => void;
}

export function useLocomotiveScroll() {
  const scrollContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let locomotiveScroll: LocomotiveScrollInstance | null = null;

    const initLocomotiveScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        if (scrollContainer.current) {
          locomotiveScroll = new LocomotiveScroll({
            el: scrollContainer.current,
            smooth: true,
            multiplier: 1,
            class: 'is-revealed',
            smartphone: {
              smooth: true
            },
            tablet: {
              smooth: true,
              breakpoint: 768
            }
          }) as LocomotiveScrollInstance;

          // Update scroll on route changes
          locomotiveScroll.update();
        }
      } catch (error) {
        console.log('Locomotive Scroll not available:', error);
      }
    };

    if (scrollContainer.current) {
      initLocomotiveScroll();
    }

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return scrollContainer;
}