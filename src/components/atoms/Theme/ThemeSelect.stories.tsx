import React from 'react';
import type { ComponentStory, Meta } from '@storybook/react';
import { Button } from '@/components/atoms/Button';
import { ThemeSelect } from '@/components/atoms/Theme/ThemeSelect';
import { LayoutProvider } from '@/components/layout/LayoutProvider';
import { ButtonIcon } from '@/components/atoms/ButtonIcon';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { config } from '@/config';

const meta: Meta<typeof ThemeSelect> = {
  title: 'Atoms/ThemeSelect',
  component: ThemeSelect,
};

export default meta;
export const Default: ComponentStory<typeof ThemeSelect> = () => {
  config.themes = ['system', 'light', 'dark'];

  return (
    <LayoutProvider>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <Button>Test button</Button>
          <ButtonIcon icon={XMarkIcon} />
        </div>
        <ThemeSelect />
      </div>
    </LayoutProvider>
  );
};
