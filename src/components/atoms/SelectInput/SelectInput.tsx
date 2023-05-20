import classNames from 'classnames';
import React, { ComponentPropsWithRef, useId } from 'react';

export interface Option {
  value: string;
  label: string;
}

export interface SelectInputProps extends Omit<ComponentPropsWithRef<'select'>, 'children'> {
  label?: string;
  hint?: string;
  options: Option[];
  allowEmpty?: boolean;
}

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, label, hint, options, allowEmpty, ...other }: SelectInputProps, ref) => {
    const id = useId();

    return (
      <div className="form-control">
        {label && (
          <label className="label" htmlFor={id}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <select id={id} ref={ref} className={classNames('select select-bordered', className)} {...other}>
          {allowEmpty && <option value="">Not selected</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {hint && (
          <div className="label">
            <span className="label-text-alt">{hint}</span>
          </div>
        )}
      </div>
    );
  }
);

SelectInput.displayName = 'SelectInput';
