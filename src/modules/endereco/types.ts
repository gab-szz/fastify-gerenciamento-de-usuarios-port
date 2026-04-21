import z from 'zod';

export const enderecoSchema = z.object({
  id: z.coerce.number().optional(),
  rua: z.string().min(3),
  numero: z.string().min(1),
  bairro: z.string().min(3),
  cidade: z.string().min(3),
  estado: z.string().min(2),
  cep: z.string().min(7),
  complemento: z.string().optional(),
  criadoEm: z.date().optional(),
  alteradoEm: z.date().optional(),
  excluidoEm: z.date().optional(),
});

export type enderecoType = z.infer<typeof enderecoSchema>;

export const enderecoIdParamSchema = z.object({ id: z.coerce.number().min(1) });

export const enderecoResponseSchema = z.object({
  id: z.number().optional(),
  rua: z.string(),
  numero: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  cep: z.string(),
  complemento: z.string().optional(),
  usuarioId: z.number(),
  criadoEm: z.date().optional(),
  alteradoEm: z.date().optional(),
  excluidoEm: z.date().optional(),
});
