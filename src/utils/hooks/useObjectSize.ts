import { useMemo } from 'react';
import { Breakpoint, breakpointPoints, useBreakpoint } from '@/utils/hooks/useBreakpoint';

export interface UseObjectSizeReturn {
  width: number;
  height: number;
}

export interface UseObjectSize {
  breakpoint: Breakpoint;
  size: number | ((breakpoint: Breakpoint, width: number) => number);
}

export interface UseObjectSizeSettings {
  sizes: UseObjectSize[];
  aspectRatio: [number, number];
}

const defaultSettings: UseObjectSizeSettings = {
  sizes: [],
  aspectRatio: [16, 9],
};

export function useObjectSize(settings: UseObjectSizeSettings = defaultSettings): UseObjectSizeReturn {
  const { breakpoint, windowDimensions } = useBreakpoint();

  return useMemo(() => {
    const size = settings.sizes.find((s) => s.breakpoint === breakpoint);
    if (size) {
      const calculatedSize =
        typeof size.size === 'function' ? size.size(breakpoint, windowDimensions.width) : size.size;
      return {
        width: calculatedSize,
        height: (calculatedSize * settings.aspectRatio[1]) / settings.aspectRatio[0],
      };
    }
    const breakpoints = Object.keys(breakpointPoints) as Breakpoint[];
    const breakpointIndex = breakpoints.indexOf(breakpoint);
    const lowerBreakpoint = breakpoints[breakpointIndex === 0 ? 0 : breakpointIndex - 1] as Breakpoint;
    return {
      width: breakpointPoints[lowerBreakpoint],
      height: (breakpointPoints[lowerBreakpoint] * settings.aspectRatio[1]) / settings.aspectRatio[0],
    };
  }, [breakpoint, windowDimensions]);
}
