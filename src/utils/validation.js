import { z } from 'zod';
import { hash, HashAlgorithms, Encoders } from 'crypto-react';

export const hashPassword = async (pass) => {
  const res = await hash(pass, HashAlgorithms.SHA224, Encoders.hex);
  return res;
};

export const userSchema = z
  .object({
    email: z.string().email('Please enter the correct email'),
    password: z
      .string()
      .min(8, 'Must have at least 8 character(s)')
      .regex(/(?=.*[A-Z])/, 'At least one uppercase character')
      .regex(/(?=.*[a-z])/, 'At least one lowercase character')
      .regex(/^[^ ]+$/, 'No spaces allowed')
      .regex(/(?=.*\d)/, 'At least one number'),
    registrationDate: z.number(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // path of error
    message: "Passwords don't match",
  });
