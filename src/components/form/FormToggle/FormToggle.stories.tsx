import { ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormToggle } from './FormToggle';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Form/FormToggle',
  component: FormToggle,
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
  test: boolean | null;
}

export const Default: ComponentStory<typeof FormToggle<FieldValues>> = () => {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { test: false },
  });

  const onHandleSubmit = (props: FieldValues) => {
    console.log('[onHandleSubmit] props', props);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
      <FormToggle control={control} name="test" rules={{ required: true }} label="FormToggle Label" />
      <Button type="submit">Submit</Button>
    </form>
  );
};
