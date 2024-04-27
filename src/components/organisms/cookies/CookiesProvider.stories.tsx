import type { Meta, StoryObj } from '@storybook/react';
import { CookiesProvider } from '@/components/organisms/cookies/CookiesProvider';

const meta: Meta<typeof CookiesProvider> = {
  title: 'Organisms/Cookies',
  component: CookiesProvider,
};

export default meta;
type Story = StoryObj<typeof CookiesProvider>;

export const Default: Story = {};
