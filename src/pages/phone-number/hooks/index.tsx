import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IPhoneNumberFormInputs,
  IPhoneNumberInput,
  phoneNumberValidationSchema
} from '@/pages/phone-number/models';
import { usePhoneNumberCtx } from '@/app/providers/with-phone-number-context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGreenApiCtx } from '@/app/providers/with-green-api-context';
import React from 'react';

export const usePhoneNumber = () => {
  const navigate = useNavigate();
  const { greenApiClient} = useGreenApiCtx();
  const { setPhoneNumber } = usePhoneNumberCtx();

  React.useEffect(() => {
    if (!greenApiClient) {
      toast.error('GreenApiClient is not defined');
      navigate('/');
    }
  }, [])

  const onSubmit: SubmitHandler<IPhoneNumberFormInputs> = async (data) => {
    setPhoneNumber(data.phoneNumber);
    toast.success('Success');
    navigate('/chat');
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IPhoneNumberFormInputs>({
    defaultValues: {
      phoneNumber: ''
    },
    resolver: yupResolver(phoneNumberValidationSchema)
  });

  const inputs: Array<IPhoneNumberInput> = [
    { label: 'Phone number', name: 'phoneNumber' }
  ];

  return {
    onSubmit: handleSubmit(onSubmit),
    inputs,
    register,
    errors
  };
};
