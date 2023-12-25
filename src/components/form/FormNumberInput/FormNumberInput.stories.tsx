import React from 'react';
import { ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { FormNumberInput } from './FormNumberInput';

export default {
  title: 'Form/FormNumberInput',
  component: FormNumberInput,
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

export const Default: ComponentStory<typeof FormNumberInput<FieldValues>> = () => {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { test: null },
  });

  const onHandleSubmit = (props: FieldValues) => {
    console.log('[onHandleSubmit] props', props);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
      <FormNumberInput
        control={control}
        name="test"
        rules={{ required: true }}
        label="FormSelectInput Label"
        placeholder="FormSelectInput placeholder"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
