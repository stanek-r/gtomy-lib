import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormTextInput } from './FormTextInput';
import { Button } from '../../atoms/Button';

export default {
  title: 'Form/FormTextInput',
  component: FormTextInput,
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof FormTextInput>;

interface FieldValues {
  test: string;
}

export const Default: ComponentStory<typeof FormTextInput<FieldValues>> = (args) => {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { test: 'Test value' },
  });

  const onHandleSubmit = (props: FieldValues) => {
    console.log('[onHandleSubmit] props', props);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
      <FormTextInput
        control={control}
        name="test"
        rules={{ required: true }}
        label="FormTextInput Label"
        placeholder="FormTextInput placeholder"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
