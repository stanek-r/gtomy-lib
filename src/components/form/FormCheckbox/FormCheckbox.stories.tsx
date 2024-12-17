import { StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormCheckbox } from './FormCheckbox';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Form/FormCheckbox',
  component: FormCheckbox,
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

type Story = StoryObj<typeof FormCheckbox<FieldValues>>;

export const Default: Story = {
  render: () => {
    const { control, handleSubmit } = useForm<FieldValues>({
      defaultValues: { test: false },
    });

    const onHandleSubmit = (props: FieldValues) => {
      console.log('[onHandleSubmit] props', props);
    };

    return (
      <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
        <FormCheckbox control={control} name="test" rules={{ required: true }} label="FormCheckbox Label" />
        <Button type="submit">Submit</Button>
      </form>
    );
  },
};
