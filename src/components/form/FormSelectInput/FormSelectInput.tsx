import React, { ChangeEvent } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { ControlledFormTransformer, useFormController } from '@/utils';
import { SelectInput, Option } from '@/components/atoms/SelectInput';

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
  placeholder?: string;
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
>({
  label,
  hint,
  placeholder,
  className,
  options,
  allowEmpty,
  ...useControllerProps
}: FormSelectInputProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
    errorMessage,
  } = useFormController(useControllerProps);

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(ControlledFormTransformer.from(event.target.value));
  };

  return (
    <SelectInput
      label={label}
      hint={hint}
      placeholder={placeholder}
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
