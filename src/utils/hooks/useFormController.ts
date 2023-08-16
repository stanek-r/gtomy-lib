import { FieldError, FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { useMemo } from 'react';
import { useCommonTranslation } from './useCommonTranslation';

function getFieldErrorMessage(error: FieldError | undefined): string | undefined {
  if (!error) {
    return undefined;
  }
  if (error.message !== '') {
    return error.message;
  }
  if (error.type === 'required') {
    return 'field.required';
  }
  return 'field.invalid';
}

function useFieldErrorMessage(error: FieldError | undefined): string | undefined {
  return useMemo(() => {
    return getFieldErrorMessage(error);
  }, [error]);
}

export function useFormController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName>) {
  const { st } = useCommonTranslation('form');
  const { field, fieldState, formState } = useController(props);
  const errorMessage = useFieldErrorMessage(fieldState.error);
  return {
    field,
    fieldState,
    formState,
    errorMessage: errorMessage ? st(errorMessage) : undefined,
  };
}
