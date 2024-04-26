import { ComponentStory } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormRadio } from './FormRadio';
import { Button } from '@/components/atoms/Button';

export default {
  title: 'Form/FormRadio',
  component: FormRadio,
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

export const Default: ComponentStory<typeof FormRadio<FieldValues>> = () => {
  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: { test: false },
  });

  const onHandleSubmit = (props: FieldValues) => {
    console.log('[onHandleSubmit] props', props);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
      <FormRadio control={control} name="test" rules={{ required: true }} label="FormRadio Label" value="Radio1" />
      <FormRadio control={control} name="test" rules={{ required: true }} label="FormRadio Label" value="Radio2" />
      <Button type="submit">Submit</Button>
    </form>
  );
};
