import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@/components/Switch/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const WithLabels: Story = {
  args: {
    startElement: 'Start element',
    endElement: 'End element',
  },
};
