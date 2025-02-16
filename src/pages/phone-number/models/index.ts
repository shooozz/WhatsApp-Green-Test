import * as yup from 'yup';

export interface IPhoneNumberFormInputs {
  phoneNumber: string;
}

export interface IPhoneNumberInput {
  label: string;
  name: keyof IPhoneNumberFormInputs;
}

export const phoneNumberValidationSchema = yup
  .object({
    phoneNumber: yup.string().trim().required('Phone number is required')
  })
  .required();
