import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSelect } from '@/components/atoms/Theme/ThemeSelect';
import { LayoutProvider } from '@/components/layout/LayoutProvider';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { config } from '@/config';
import { Button } from '@/components/atoms/Button/Button';
import { ButtonIcon } from '@/components/atoms/ButtonIcon/ButtonIcon';

const meta: Meta<typeof ThemeSelect> = {
  title: 'Atoms/ThemeSelect',
  component: ThemeSelect,
};

type Story = StoryObj<typeof ThemeSelect>;

export default meta;
export const Default: Story = {
  render: () => {
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
  },
};
