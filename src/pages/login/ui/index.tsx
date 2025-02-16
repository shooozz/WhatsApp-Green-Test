import React from 'react';
import { useLogin } from '@/pages/login/hooks';
import { Form } from '@/shared/ui/Form';

export const LoginPage = () => {
  const { inputs, register, errors, onSubmit } = useLogin();

  return (
    <Form
      inputs={inputs}
      register={register}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};
