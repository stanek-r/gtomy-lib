import type { Meta, StoryObj } from '@storybook/react';
import { Gapper } from '@/components/Gapper/Gapper';

const meta: Meta<typeof Gapper> = {
  title: 'Components/Gapper',
  component: Gapper,
  argTypes: {
    horizontal: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Gapper>;

export const Default: Story = {
  render: (args) => (
    <Gapper {...args}>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </Gapper>
  ),
};
