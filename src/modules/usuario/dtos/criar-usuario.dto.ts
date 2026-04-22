import z from 'zod';

export const criarUsuarioSchema = z.object({
  nome: z.string().min(4),
  dataNascimento: z.coerce.date().optional(),
  login: z.string().email(),
  senha: z.string().min(8),
  perfilId: z.number().min(1),
  setorId: z.number().min(1),
  enderecosId: z.array(z.number()).optional(),
});

export type criarUsuarioDTO = z.infer<typeof criarUsuarioSchema>;
