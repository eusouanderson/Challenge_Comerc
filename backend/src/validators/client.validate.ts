import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lastname: z.string().min(1, 'Lastname is required'),
  cpf: z
    .string()
    .min(11, 'CPF must be at least 11 characters')
    .max(14, 'CPF can be up to 14 characters including punctuation')
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'Invalid CPF format'),
  email: z.string().email('Invalid email'),
  cell: z.string().min(8, 'Cellphone is required'),
  cep: z.string().min(8, 'CEP is required'),
  street: z.string().min(1, 'Street is required'),
  neighborhood: z.string().min(1, 'Neighborhood is required'),
  city: z.string().min(1, 'City is required'),
  uf: z.string().length(2, 'UF must be exactly 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
