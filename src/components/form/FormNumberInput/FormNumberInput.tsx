import { ChangeEvent } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInput } from '@/components/atoms/TextInput';
import { useFormController } from '@/utils/hooks';
import { ControlledFormTransformer } from '@/utils';

/**
 * @group Components
 * @category Props
 */
export interface FormNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  hint?: string;
  placeholder?: string;
  className?: string;
  step?: number;
}

/**
 * @group Components
 * @category Form
 */
export function FormNumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, hint, placeholder, className, step, ...useControllerProps }: FormNumberInputProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
    errorMessage,
  } = useFormController(useControllerProps);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const convertedValue = ControlledFormTransformer.from(event.target.value);
    if (convertedValue == null) {
      onChange(null);
      return;
    }
    if (!Number.isNaN(+convertedValue)) {
      onChange(+convertedValue);
    }
  };

  return (
    <TextInput
      label={label}
      hint={hint}
      placeholder={placeholder}
      error={errorMessage}
      className={className}
      onChange={handleOnChange}
      type="number"
      step={step}
      value={ControlledFormTransformer.to(value)}
      {...other}
    />
  );
}
