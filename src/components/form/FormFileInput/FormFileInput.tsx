import { ChangeEvent, useCallback } from 'react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { FileInput } from '@/components/atoms/FileInput';
import { useFormController } from '@/utils/hooks/useFormController';

export interface SingleFormFile {
  multiple: false;
  value: string;
  file: File;
}

export interface MultipleFormFile {
  multiple: true;
  value: string;
  file: FileList;
}

export type FormFile = SingleFormFile | MultipleFormFile;

/**
 * @group Components
 * @category Props
 */
export interface FormFileInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  hint?: string;
  placeholder?: string;
  className?: string;
  accept?: string;
  multiple?: boolean;
}

/**
 * @group Components
 * @category Form
 */
export function FormFileInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  hint,
  placeholder,
  accept,
  multiple = false,
  className,
  ...useControllerProps
}: FormFileInputProps<TFieldValues, TName>) {
  const {
    field: { onChange, value, ...other },
    errorMessage,
  } = useFormController(useControllerProps);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files == null || event.target.files.length === 0) {
        onChange(null);
        return;
      }
      if (multiple) {
        onChange({
          file: event.target.files,
          value: event.target.value,
          multiple: true,
        } as MultipleFormFile);
        return;
      }
      onChange({
        file: event.target.files?.[0],
        value: event.target.value,
        multiple: false,
      } as SingleFormFile);
    },
    [onChange, multiple]
  );

  return (
    <FileInput
      label={label}
      hint={hint}
      placeholder={placeholder}
      error={errorMessage}
      className={className}
      onChange={handleOnChange}
      value={value == null ? '' : value.value}
      accept={accept}
      multiple={multiple}
      {...other}
    />
  );
}
