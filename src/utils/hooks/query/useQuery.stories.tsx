import React from 'react';
import { useQuery } from './useQuery';
import { QueryClient } from '@tanstack/react-query';
import { QueryWrapper } from '@/utils/hooks/query/QueryWrapper';

export default {
  title: 'Hooks/useQuery',
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const testCallFunction = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return 'test';
};

const queryClient = new QueryClient();

export const Default = () => {
  const { wrapperProps, data } = useQuery<string | null>(
    { fallbackValue: null, queryKey: ['test'], queryFn: () => testCallFunction(), showRetry: true },
    queryClient
  );

  return (
    <QueryWrapper {...wrapperProps}>
      <>{data}</>
    </QueryWrapper>
  );
};
