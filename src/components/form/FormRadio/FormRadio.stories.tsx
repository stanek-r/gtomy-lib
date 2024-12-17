import { useForm } from 'react-hook-form';
import { FormRadio } from './FormRadio';
import { Button } from '@/components/atoms/Button';
import { RadioGroup } from '@/components/atoms/Radio';
import { StoryObj } from '@storybook/react';

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
  test1: string | null;
  test2: boolean | null;
}

type Story = StoryObj<typeof FormRadio<FieldValues>>;

export const Default: Story = {
  render: () => {
    const { control, handleSubmit } = useForm<FieldValues>({
      defaultValues: { test1: null, test2: null },
    });

    const onHandleSubmit = (props: FieldValues) => {
      console.log('[onHandleSubmit] props', props);
    };

    return (
      <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col gap-y-4">
        <RadioGroup label="Multiline radio">
          <FormRadio control={control} name="test1" rules={{ required: true }} label="FormRadio Label" value="Radio1" />
          <FormRadio control={control} name="test1" rules={{ required: true }} label="FormRadio Label" value="Radio2" />
        </RadioGroup>
        <RadioGroup label="Yes or No Radio" horizontal>
          <FormRadio
            control={control}
            name="test2"
            rules={{ validate: (value) => value != null }}
            label="Yes"
            value={true}
            reversed
          />
          <FormRadio
            control={control}
            name="test2"
            rules={{ validate: (value) => value != null }}
            label="No"
            value={false}
            reversed
          />
        </RadioGroup>
        <Button type="submit">Submit</Button>
      </form>
    );
  },
};
