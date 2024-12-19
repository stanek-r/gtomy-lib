import { StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormRating } from '@/components/form/FormRating/FormRating';
import { Button } from '@/components/atoms/Button/Button';

export default {
  title: 'Form/FormRating',
  component: FormRating,
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
  test: number;
}

type Story = StoryObj<typeof FormRating<FieldValues>>;

export const Default: Story = {
  render: () => {
    const { control, handleSubmit } = useForm<FieldValues>({
      defaultValues: { test: 4 },
    });

    const onHandleSubmit = (props: FieldValues) => {
      console.log('[onHandleSubmit] props', props);
    };

    return (
      <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
        <FormRating control={control} name="test" amount={10} label="FormRating Label" />
        <Button type="submit">Submit</Button>
      </form>
    );
  },
};
