import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormTextareaInput } from './FormTextareaInput';
import { Button } from '../../atoms/Button';

export default {
  title: 'Form/FormTextareaInput',
  component: FormTextareaInput,
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof FormTextareaInput>;

interface FieldValues {
  test: string;
}

export const Default: ComponentStory<typeof FormTextareaInput<FieldValues>> = (args) => {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { test: 'Test value' },
  });

  const onHandleSubmit = (props: FieldValues) => {
    console.log('[onHandleSubmit] props', props);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
      <FormTextareaInput
        control={control}
        name="test"
        rules={{ required: true }}
        label="FormTextareaInput Label"
        placeholder="FormTextareaInput placeholder"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
