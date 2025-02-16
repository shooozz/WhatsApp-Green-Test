import React, { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path
} from 'react-hook-form';

interface Input<V extends FieldValues> {
  label: string;
  name: Path<V>;
}

interface Props<V extends FieldValues>
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  inputs: Array<Input<V>>;
  register: UseFormRegister<V>;
  errors: FieldErrors<V>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export const Form = <V extends FieldValues>({
  inputs,
  register,
  errors,
  onSubmit,
  ...props
}: Props<V>) => {
  return (
    <form onSubmit={onSubmit} {...props}>
      {inputs.map((input) => (
        <div key={input.name}>
          <label htmlFor={input.name}>{input.label}</label>
          <input id={input.name} {...register(input.name)} />
          {/* @ts-expect-error bcs ts sometimes stupid */}
          <p role='alert'>{errors[input.name]?.message}</p>
        </div>
      ))}
      <input type='submit' />
    </form>
  );
};
