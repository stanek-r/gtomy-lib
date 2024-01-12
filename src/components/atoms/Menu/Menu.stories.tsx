import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Menu } from '@/components/atoms/Menu/Menu';
import { MenuLink } from '@/components/atoms/Menu/MenuLink';
import { BrowserRouter } from 'react-router-dom';
import { DialogProvider } from '@/components/organisms/dialog';

export default {
  title: 'Atoms/Menu',
  component: Menu,
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <DialogProvider>{Story()}</DialogProvider>
      </BrowserRouter>
    ),
  ],
};

export const Default: ComponentStory<typeof Menu> = () => {
  return (
    <Menu>
      <MenuLink to="/">Test link 1</MenuLink>
      <MenuLink to="/">Test link 2</MenuLink>
      <MenuLink to="/">Test link 3</MenuLink>
      <MenuLink to="/">Test link 4</MenuLink>
    </Menu>
  );
};

export const WitAuth: ComponentStory<typeof Menu> = () => {
  return (
    <Menu showAuth>
      <MenuLink to="/">Test link 1</MenuLink>
      <MenuLink to="/">Test link 2</MenuLink>
      <MenuLink to="/">Test link 3</MenuLink>
      <MenuLink to="/">Test link 4</MenuLink>
    </Menu>
  );
};
