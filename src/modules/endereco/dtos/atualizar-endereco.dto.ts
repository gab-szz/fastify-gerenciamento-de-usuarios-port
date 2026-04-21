import z from 'zod';

export const atualizarEnderecoBodySchema = z.object({
  rua: z.string().min(3),
  numero: z.string().min(1),
  bairro: z.string().min(3),
  cidade: z.string().min(3),
  estado: z.string().min(2),
  cep: z.string().min(7),
  complemento: z.string().optional(),
});

export const atualizarEnderecoSchema = z.object({
  id: z.coerce.number().min(1),
  rua: z.string().min(3),
  numero: z.string().min(1),
  bairro: z.string().min(3),
  cidade: z.string().min(3),
  estado: z.string().min(2),
  cep: z.string().min(7),
  complemento: z.string().optional(),
});

export type atualizarEnderecoDTO = z.infer<typeof atualizarEnderecoSchema>;
