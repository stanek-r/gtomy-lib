import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Menu } from '@/components/atoms/Menu/Menu';
import { BrowserRouter, Link } from 'react-router-dom';
import { MenuItem } from '@/components/atoms/Menu/MenuItem';
import { config } from '@/config';

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
    <Menu>
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
