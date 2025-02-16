import * as yup from 'yup';

export interface ILoginFormInputs {
  idInstance: string;
  apiTokenInstance: string;
}

export interface ILoginInput {
  label: string;
  name: keyof ILoginFormInputs;
}

export const loginValidationSchema = yup
  .object({
    idInstance: yup.string().trim().required('ID instance is required'),
    apiTokenInstance: yup.string().trim().required('API token is required')
  })
  .required();
