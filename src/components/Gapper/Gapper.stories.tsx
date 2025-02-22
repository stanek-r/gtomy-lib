import type { Meta, StoryObj } from '@storybook/react';
import { Gapper } from '@/components/Gapper/Gapper';

const meta: Meta<typeof Gapper> = {
  title: 'Components/Gapper',
  component: Gapper,
};

export default meta;
type Story = StoryObj<typeof Gapper>;

export const Default: Story = {};
