import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@/components/Checkbox/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const WithForm: Story = {
  args: {
    label: 'Label',
    hint: 'Hint',
  },
};

export const WithFormError: Story = {
  args: {
    label: 'Label',
    hint: 'Hint',
    error: 'Error',
  },
};

function CheckboxImage() {
  const imagesUrl = 'https://gtomy.net/images';
  const imageId = '5b46b9fd-8d41-4fbc-987f-3e7fd0e99600';
  return <img src={`${imagesUrl}/${imageId}/original`} alt="Checkbox image" />;
}

export const WithImage: Story = {
  args: {
    label: 'Label',
    hint: 'Hint',
    Image: CheckboxImage,
  },
  render: (args) => (
    <div className="w-52">
      <Checkbox {...args} />
    </div>
  ),
};
