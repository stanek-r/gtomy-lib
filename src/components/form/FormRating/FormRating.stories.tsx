import { ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { FormRating } from '@/components/form/FormRating/FormRating';

export default {
  title: 'Form/FormRating',
  component: FormRating,
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

interface FieldValues {
  test: number;
}

export const Default: ComponentStory<typeof FormRating<FieldValues>> = () => {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { test: 4 },
  });

  const onHandleSubmit = (props: FieldValues) => {
    console.log('[onHandleSubmit] props', props);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
      <FormRating control={control} name="test" amount={10} label="FormRating Label" />
      <Button type="submit">Submit</Button>
    </form>
  );
};
