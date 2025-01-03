import { ChangeEvent, useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { Radio } from '@/components/atoms/Radio/Radio';
import { useFormController } from '@/utils/hooks/useFormController';

/**
 * @group Components
 * @category Props
 */
export interface FormRadioProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  hint?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value: string | boolean | number;
  reversed?: boolean;
}

/**
 * @group Components
 * @category Form
 */
export function FormRadio<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  hint,
  placeholder,
  className,
  type,
  value: radioValue,
  reversed,
  ...useControllerProps
}: FormRadioProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
    errorMessage,
  } = useFormController(useControllerProps);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(JSON.parse(event.target.value));
    },
    [onChange]
  );

  return (
    <Radio
      label={label}
      placeholder={placeholder}
      error={errorMessage}
      className={className}
      onChange={handleOnChange}
      type={type}
      hint={hint}
      value={JSON.stringify(radioValue)}
      checked={radioValue === value}
      reversed={reversed}
      {...other}
    />
  );
}
