import { object, string } from 'yup';
export const signupSchema = object({
  email: string().email().required(),
  password: string().required(),
});
