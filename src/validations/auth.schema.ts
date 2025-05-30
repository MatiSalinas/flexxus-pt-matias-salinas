import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string({
      required_error: 'Missing username',
    })
    .min(1, 'Username cannot be empty')
    .max(25, 'Username cannot exceed 25 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'),
    
  password: z
    .string({
      required_error: 'Missing password',
    })
    .min(4, 'Password must be at least 4 characters long'),
});


export const registerSchema = z.object({
    username: z
      .string({
        required_error: 'Missing username',
      })
      .min(1, 'Username cannot be empty')
      .max(25, 'Username cannot exceed 25 characters')
      .regex(/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'),
      
    password: z
      .string({
        required_error: 'Missing password',
      })
      .min(4, 'Password must be at least 4 characters long'),
      
    email: z
      .string({
        required_error: 'Missing email',
      })
      .email('Invalid email format'),
  });