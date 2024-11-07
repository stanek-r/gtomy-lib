import { useEffect, useMemo, useState } from 'react';

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
  width: number;
}

export function useBreakpoint(breakpoint?: Breakpoint): UseBreakpoint {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const currentBreakpoint = useMemo((): Breakpoint => {
    if (width >= breakpointPoints['2xl']) {
      return '2xl';
    }
    if (width >= breakpointPoints.xl) {
      return 'xl';
    }
    if (width >= breakpointPoints.lg) {
      return 'lg';
    }
    if (width >= breakpointPoints.md) {
      return 'md';
    }
    if (width >= breakpointPoints.sm) {
      return 'sm';
    }
    return 'xs';
  }, [width]);

  const isOverBreakpoint = useMemo(() => {
    const selectedBreakpoint = breakpoint ? breakpointPoints[breakpoint] : undefined;
    return selectedBreakpoint != null ? selectedBreakpoint <= breakpointPoints[currentBreakpoint] : undefined;
  }, [breakpoint, currentBreakpoint]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint: currentBreakpoint,
    isOverBreakpoint: isOverBreakpoint,
    width,
  };
}
