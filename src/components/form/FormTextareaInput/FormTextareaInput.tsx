import { ChangeEvent, useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextareaInput } from '@/components/atoms/TextareaInput';
import { useFormController } from '@/utils/hooks/useFormController';
import { ControlledFormTransformer } from '@/utils/typeHelpers';

/**
 * @group Components
 * @category Props
 */
export interface FormTextareaInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  hint?: string;
  placeholder?: string;
  className?: string;
}

/**
 * @group Components
 * @category Form
 */
export function FormTextareaInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, hint, placeholder, className, ...useControllerProps }: FormTextareaInputProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
    errorMessage,
  } = useFormController(useControllerProps);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(ControlledFormTransformer.from(event.target.value));
    },
    [onChange]
  );

  return (
    <TextareaInput
      label={label}
      hint={hint}
      placeholder={placeholder}
      error={errorMessage}
      className={className}
      onChange={handleOnChange}
      value={ControlledFormTransformer.to(value)}
      {...other}
    />
  );
}
