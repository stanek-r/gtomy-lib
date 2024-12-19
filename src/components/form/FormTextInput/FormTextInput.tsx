import { ChangeEvent, useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { useFormController } from '@/utils/hooks/useFormController';
import { ControlledFormTransformer } from '@/utils/typeHelpers';
import { TextInput } from '@/components/atoms/TextInput/TextInput';

/**
 * @group Components
 * @category Props
 */
export interface FormTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  hint?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

/**
 * @group Components
 * @category Form
 */
export function FormTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, hint, placeholder, className, type, ...useControllerProps }: FormTextInputProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
    errorMessage,
  } = useFormController(useControllerProps);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(ControlledFormTransformer.from(event.target.value));
    },
    [onChange]
  );

  return (
    <TextInput
      label={label}
      hint={hint}
      placeholder={placeholder}
      error={errorMessage}
      className={className}
      onChange={handleOnChange}
      type={type}
      value={ControlledFormTransformer.to(value)}
      {...other}
    />
  );
}
