import React from 'react';
import { Form } from '@/shared/ui/Form';
import { usePhoneNumber } from '@/pages/phone-number/hooks';

export const PhoneNumberPage = () => {
  const { inputs, register, errors, onSubmit } = usePhoneNumber();

  return (
    <Form
      inputs={inputs}
      register={register}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};
