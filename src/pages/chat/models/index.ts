import * as yup from 'yup';

export interface IMessageFormInputs {
  message: string;
}

export interface IMessageInput {
  label: string;
  name: keyof IMessageFormInputs;
}

export const messageValidationSchema = yup
  .object({
    message: yup
      .string()
      .trim()
      .required('Message is required')
      .min(1, 'Message is required')
      .max(1000, 'Message must not exceed 1000 characters')
  })
  .required();
