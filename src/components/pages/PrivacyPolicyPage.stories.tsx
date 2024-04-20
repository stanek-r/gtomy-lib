import { BrowserRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { PrivacyPolicyPage } from '@/components/pages/PrivacyPolicyPage';

const meta: Meta<typeof PrivacyPolicyPage> = {
  title: 'Pages/PrivacyPolicyPage',
  component: PrivacyPolicyPage,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PrivacyPolicyPage>;

export const Default: Story = {};
