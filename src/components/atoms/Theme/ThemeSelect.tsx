import React from 'react';
import { useTranslation } from '@/utils/hooks/useTranslation';
import { useThemeStore } from '@/utils/hooks/storage/useThemeStore';
import { config } from '@/config';
import { Option, SelectInput } from '@/components/atoms/SelectInput';

export interface ThemeSelectProps {
  className?: string;
}

/**
 * A React component that renders a `<select>` element for choosing a theme.
 * The component can be used to provide a simple way for users to choose between different themes, such as light and dark modes.
 *
 * @example
 * function MyComponent() {
 *   return (
 *     <ThemeSelect/>
 *   );
 * }
 *
 * @param props - Props for the ThemeSelect component, including className and other select element props.
 * @return The ThemeSelect component.
 */
export function ThemeSelect({ className }: ThemeSelectProps) {
  const { t } = useTranslation('common');

  const options: Option[] | null =
    config.themes?.map((theme) => ({
      label: t('theme.' + theme),
      value: theme,
    })) ?? null;
  const [theme, setTheme] = useThemeStore((state: any) => [state.theme, state.setTheme]);

  if (options != null && options.length > 1) {
    return (
      <SelectInput
        className={className}
        value={theme ?? options[0]}
        onChange={(event) => setTheme(event.target.value)}
        size="sm"
        options={options}
      />
    );
  }
  return null;
}
