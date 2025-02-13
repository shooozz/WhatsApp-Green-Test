import * as yup from 'yup';

export interface IFormInputs {
  idInstance: string;
  apiTokenInstance: string;
  phoneNumber: string;
  message: string;
}

export interface IInput {
  label: string;
  name: keyof IFormInputs;
}

export const validationSchema = yup
  .object({
    idInstance: yup.string().trim().required('ID instance is required'),
    apiTokenInstance: yup.string().trim().required('API token is required'),
    phoneNumber: yup.string().trim().required('Phone number is required'),
    message: yup
      .string()
      .trim()
      .required('Message is required')
      .min(1, 'Message is required')
      .max(1000, 'Message must not exceed 1000 characters')
  })
  .required();
