import { type StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormTextInput } from './FormTextInput';
import { Button } from '@/components/atoms/Button';

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
};

interface FieldValues {
  test: string | null;
}

type Story = StoryObj<typeof FormTextInput<FieldValues>>;

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
  },
};
