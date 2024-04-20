import { ComponentStory } from '@storybook/react';
import { Menu } from '@/components/atoms/Menu/Menu';
import { BrowserRouter, Link } from 'react-router-dom';
import { MenuItem } from '@/components/atoms/Menu/MenuItem';
import { config } from '@/config';
import { CpuChipIcon } from '@heroicons/react/24/outline';

config.appDisplayName = 'App display name';

export default {
  title: 'Atoms/Menu',
  component: Menu,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default: ComponentStory<typeof Menu> = () => {
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
};

export const WithAuth: ComponentStory<typeof Menu> = () => {
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
};
