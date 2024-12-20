import { useThemeStore } from '@/utils/hooks/storage/useThemeStore';
import { Option, SelectInput } from '@/components/atoms/SelectInput/SelectInput';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@/utils/config/context';

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
  const { themes } = useConfig();

  const options: Option[] | null =
    themes?.map((theme) => ({
      label: t('theme.' + theme),
      value: theme,
    })) ?? null;
  const [theme, setTheme] = useThemeStore((state) => [state.theme, state.setTheme]);

  if (options != null && options.length > 1) {
    return (
      <SelectInput
        className={className}
        value={theme ?? options[0].value}
        onChange={(event) => setTheme(event.target.value)}
        size="sm"
        options={options}
      />
    );
  }
  return null;
}
