import { z } from 'zod';

export const loginSchema = z.object({
    email: z
      .string({
        required_error: 'Missing email',
      })
      .email('Invalid email format'),    
  password: z
    .string({
      required_error: 'Missing password',
    })
    .min(4, 'Password must be at least 4 characters long'),
});


export const registerSchema = z.object({
    email: z
    .string({
      required_error: 'Missing email',
    })
    .email('Invalid email format'),
    password: z
      .string({
        required_error: 'Missing password',
      })
      .min(4, 'Password must be at least 4 characters long'),
  });