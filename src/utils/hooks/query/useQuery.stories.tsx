import { useQuery } from './useQuery';
import { QueryClient } from '@tanstack/react-query';
import { QueryWrapper } from '@/utils/hooks/query/QueryWrapper';
import { PageQueryData, usePageQuery } from '@/utils/hooks/query/usePageQuery';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';

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
const testCallFunction2 = async (page: number, results: number) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { isLast: page >= 10, numberOfPages: 10, data: 'test ' + page + ' ' + results };
};

const queryClient = new QueryClient();

export const Default = () => {
  const { wrapperProps, data } = useQuery<string | null>(
    { queryKey: ['test'], queryFn: testCallFunction, showRetry: true },
    queryClient
  );

  return (
    <QueryWrapper {...wrapperProps}>
      <>{data}</>
    </QueryWrapper>
  );
};

interface StoryPage extends PageQueryData {
  data: string | null;
}

export const Page = () => {
  const { wrapperProps, data, page, nextPage, prevPage, numberOfPages } = usePageQuery<StoryPage>(
    {
      queryKey: ['test'],
      queryFn: testCallFunction2,
      showRetry: true,
      resultsPerPage: 10,
    },
    queryClient
  );

  return (
    <QueryWrapper {...wrapperProps}>
      <>
        <Typography>{data?.data}</Typography>
        <div className="flex items-center justify-between gap-2">
          <Button onClick={prevPage}>Prev</Button>
          <Button>
            {page}/{numberOfPages}
          </Button>
          <Button onClick={nextPage}>Next</Button>
        </div>
      </>
    </QueryWrapper>
  );
};
