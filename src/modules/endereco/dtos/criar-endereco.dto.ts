import z from 'zod';

export const criarEnderecoSchema = z.object({
  rua: z.string().min(3),
  numero: z.string().min(1),
  bairro: z.string().min(3),
  cidade: z.string().min(3),
  estado: z.string().min(2),
  cep: z.string().min(7),
  complemento: z.string().optional(),
  usuarioId: z.number().min(1),
});

export type criarEnderecoDTO = z.infer<typeof criarEnderecoSchema>;
