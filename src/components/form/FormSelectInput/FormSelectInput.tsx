import { ChangeEvent, useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { useFormController } from '@/utils/hooks/useFormController';
import { ControlledFormTransformer } from '@/utils/typeHelpers';
import { Option, SelectInput } from '@/components/atoms/SelectInput/SelectInput';

/**
 * @group Components
 * @category Props
 */
export interface FormSelectInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  hint?: string;
  className?: string;
  options: Option[];
  allowEmpty?: boolean;
}

/**
 * @group Components
 * @category Form
 */
export function FormSelectInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, hint, className, options, allowEmpty, ...useControllerProps }: FormSelectInputProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
    errorMessage,
  } = useFormController(useControllerProps);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(ControlledFormTransformer.from(event.target.value));
    },
    [onChange]
  );

  return (
    <SelectInput
      label={label}
      hint={hint}
      error={errorMessage}
      className={className}
      onChange={handleOnChange}
      value={ControlledFormTransformer.to(value)}
      options={options}
      allowEmpty={allowEmpty}
      {...other}
    />
  );
}
