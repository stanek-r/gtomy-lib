import { Menu } from '@/components/atoms/Menu/Menu';
import { BrowserRouter, Link } from 'react-router-dom';
import { MenuItem } from '@/components/atoms/Menu/MenuItem';
import { CpuChipIcon } from '@heroicons/react/24/outline';
import { StoryObj } from '@storybook/react';
import { ConfigProvider } from '@/utils/ConfigProvider';

export default {
  title: 'Atoms/Menu',
  component: Menu,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <ConfigProvider config={{ appName: '', appDisplayName: 'App display name' }}>
          <Story />
        </ConfigProvider>
      </BrowserRouter>
    ),
  ],
};

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => {
    return (
      <Menu showIcon icon={CpuChipIcon}>
        <MenuItem as={Link} to="/">
          Test link 1
        </MenuItem>
        <MenuItem as={Link} to="/">
          Test link 2
        </MenuItem>
        <MenuItem as={Link} to="/">
          Test link 3
        </MenuItem>
        <MenuItem as={Link} to="/">
          Test link 4
        </MenuItem>
      </Menu>
    );
  },
};

export const WithAuth: Story = {
  render: () => {
    return (
      <Menu showAuth>
        <MenuItem as={Link} to="/">
          Test link 1
        </MenuItem>
        <MenuItem as={Link} to="/">
          Test link 2
        </MenuItem>
        <MenuItem as={Link} to="/">
          Test link 3
        </MenuItem>
        <MenuItem as={Link} to="/">
          Test link 4
        </MenuItem>
      </Menu>
    );
  },
};
