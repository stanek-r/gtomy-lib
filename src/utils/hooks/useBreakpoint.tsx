import { useEffect, useMemo, useState } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
const breakpointPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export interface UseBreakpoint {
  breakpoint: Breakpoint;
  isOverBreakpoint?: boolean;
}

export function useBreakpoint(breakpoint?: Breakpoint): UseBreakpoint {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const selectedBreakpoint = breakpoint ? breakpointPoints[breakpoint] : undefined;

  const currentBreakpoint = useMemo((): Breakpoint => {
    if (windowDimensions.width >= breakpointPoints['2xl']) {
      return '2xl';
    }
    if (windowDimensions.width >= breakpointPoints.xl) {
      return 'xl';
    }
    if (windowDimensions.width >= breakpointPoints.lg) {
      return 'lg';
    }
    if (windowDimensions.width >= breakpointPoints.md) {
      return 'md';
    }
    return 'sm';
  }, [windowDimensions]);
  const isOverBreakpoint =
    selectedBreakpoint != null ? selectedBreakpoint <= breakpointPoints[currentBreakpoint] : undefined;

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(selectedBreakpoint);
  console.log(breakpointPoints[currentBreakpoint]);
  console.log(isOverBreakpoint);

  return {
    breakpoint: currentBreakpoint,
    isOverBreakpoint: isOverBreakpoint,
  };
}
