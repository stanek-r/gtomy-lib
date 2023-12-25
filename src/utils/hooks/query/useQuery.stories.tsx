import React from 'react';
import { useQuery } from './useQuery';
import { QueryClient } from '@tanstack/react-query';

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
  const { Wrapper, data } = useQuery(
    { queryKey: ['test'], queryFn: () => testCallFunction(), showRetry: true },
    queryClient
  );

  return (
    <Wrapper>
      <>{data}</>
    </Wrapper>
  );
};
