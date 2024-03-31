import { useEffect, useMemo, useState } from 'react';

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export const breakpointPoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export interface UseBreakpoint {
  breakpoint: Breakpoint;
  isOverBreakpoint?: boolean;
  windowDimensions: { width: number; height: number };
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
    if (windowDimensions.width >= breakpointPoints.sm) {
      return 'sm';
    }
    return 'xs';
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

  return {
    breakpoint: currentBreakpoint,
    isOverBreakpoint: isOverBreakpoint,
    windowDimensions,
  };
}
