import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Button } from '../../atoms/Button';
import { FormSelectInput } from './FormSelectInput';
import { Option } from '../../atoms/SelectInput';

export default {
  title: 'Form/FormSelectInput',
  component: FormSelectInput,
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof FormSelectInput>;

const options: Option[] = [
  {
    value: '1',
    label: 'Option 1',
  },
  {
    value: '2',
    label: 'Option 2',
  },
  {
    value: '3',
    label: 'Option 3',
  },
];

interface FieldValues {
  test: string | null;
}

export const Default: ComponentStory<typeof FormSelectInput<FieldValues>> = () => {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { test: null },
  });

  const onHandleSubmit = (props: FieldValues) => {
    console.log('[onHandleSubmit] props', props);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
      <FormSelectInput
        control={control}
        name="test"
        rules={{ required: true }}
        label="FormSelectInput Label"
        placeholder="FormSelectInput placeholder"
        options={options}
        allowEmpty
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
