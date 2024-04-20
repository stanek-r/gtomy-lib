import { ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormSwitch } from './FormSwitch';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Form/FormSwitch',
  component: FormSwitch,
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

export const Default: ComponentStory<typeof FormSwitch<FieldValues>> = () => {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { test: false },
  });

  const onHandleSubmit = (props: FieldValues) => {
    console.log('[onHandleSubmit] props', props);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
      <FormSwitch control={control} name="test" />
      <Button type="submit">Submit</Button>
    </form>
  );
};
