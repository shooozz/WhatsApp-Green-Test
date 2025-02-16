import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GreenApiClient } from '@/shared/api/green-api/green-api-client';
import {
  ILoginFormInputs,
  ILoginInput,
  loginValidationSchema
} from '@/pages/login/models';
import { useGreenApiCtx } from '@/app/providers/with-green-api-context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setGreenApiClient } = useGreenApiCtx();

  const onSubmit: SubmitHandler<ILoginFormInputs> = async (data) => {
    setGreenApiClient(
      new GreenApiClient(data.idInstance, data.apiTokenInstance)
    );
    toast.success('Success');
    navigate('/phone-number');
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginFormInputs>({
    defaultValues: {
      idInstance: '',
      apiTokenInstance: ''
    },
    resolver: yupResolver(loginValidationSchema)
  });

  const inputs: Array<ILoginInput> = [
    { label: 'Id', name: 'idInstance' },
    { label: 'API Token', name: 'apiTokenInstance' }
  ];

  return {
    onSubmit: handleSubmit(onSubmit),
    inputs,
    register,
    errors
  };
};
