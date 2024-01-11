import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Menu } from '@/components/atoms/Menu/Menu';
import { MenuLink } from '@/components/atoms/Menu/MenuLink';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Atoms/Menu',
  component: Menu,
  decorators: [(Story: any) => <BrowserRouter>{Story()}</BrowserRouter>],
};

export const Default: ComponentStory<typeof Menu> = () => {
  return (
    <Menu>
      <MenuLink to="/">Test list 1</MenuLink>
      <MenuLink to="/">Test list 2</MenuLink>
      <MenuLink to="/">Test list 3</MenuLink>
      <MenuLink to="/">Test list 4</MenuLink>
    </Menu>
  );
};
