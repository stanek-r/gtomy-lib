import { ChangeEvent, ReactNode, useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { useFormController } from '@/utils/hooks/useFormController';
import { Switch } from '@/components/atoms/Switch/Switch';

/**
 * @group Components
 * @category Props
 */
export interface FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  type?: string;
  className?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

/**
 * @group Components
 * @category Form
 */
export function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ className, type, size, startElement, endElement, ...useControllerProps }: FormSwitchProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
  } = useFormController(useControllerProps);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked);
    },
    [onChange]
  );

  return (
    <Switch
      className={className}
      onChange={handleOnChange}
      type={type}
      checked={value}
      size={size}
      startElement={startElement}
      endElement={endElement}
      {...other}
    />
  );
}
