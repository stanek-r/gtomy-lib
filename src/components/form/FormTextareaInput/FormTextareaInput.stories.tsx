import { StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormTextareaInput } from './FormTextareaInput';
import { Button } from '@/components/atoms/Button';

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
};

interface FieldValues {
  test: string;
}

type Story = StoryObj<typeof FormTextareaInput<FieldValues>>;

export const Default: Story = {
  render: () => {
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
  },
};
