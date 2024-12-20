import { StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormNumberInput } from './FormNumberInput';
import { Button } from '@/components/atoms/Button/Button';

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

type Story = StoryObj<typeof FormNumberInput<FieldValues>>;

export const Default: Story = {
  render: () => {
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
  },
};
