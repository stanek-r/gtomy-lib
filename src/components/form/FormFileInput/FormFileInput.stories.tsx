import { ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormFileInput } from './FormFileInput';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Form/FormFileInput',
  component: FormFileInput,
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
  test: string | null;
}

export const Default: ComponentStory<typeof FormFileInput<FieldValues>> = () => {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { test: null },
  });

  const onHandleSubmit = (props: FieldValues) => {
    console.log('[onHandleSubmit] props', props);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
      <FormFileInput
        control={control}
        name="test"
        rules={{ required: true }}
        label="FormFileInput Label"
        placeholder="FormFileInput placeholder"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
