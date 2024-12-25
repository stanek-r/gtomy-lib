import { useForm } from 'react-hook-form';
import { FormSelectInput } from './FormSelectInput';
import { StoryObj } from '@storybook/react';
import { Button } from '@/components/atoms/Button/Button';
import { Option } from '@/components/atoms/SelectInput/SelectInput';

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
};

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

type Story = StoryObj<typeof FormSelectInput<FieldValues>>;

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
        <FormSelectInput
          control={control}
          name="test"
          rules={{ required: true }}
          label="FormSelectInput Label"
          options={options}
          allowEmpty
        />
        <Button type="submit">Submit</Button>
      </form>
    );
  },
};
