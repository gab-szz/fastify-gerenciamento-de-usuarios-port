import z from 'zod';

export const atualizarUsuarioBodySchema = z.object({
  nome: z.string().min(4),
  dataNascimento: z.coerce.date().optional(),
  login: z.string().email(),
  perfilId: z.number().min(1),
  setorId: z.number().min(1),
  enderecosId: z.array(z.number()).optional(),
});

export const atualizarUsuarioSchema = atualizarUsuarioBodySchema.extend({
  id: z.number().min(1),
});

export type atualizarUsuarioBodyDTO = z.infer<
  typeof atualizarUsuarioBodySchema
>;
export type atualizarUsuarioDTO = z.infer<typeof atualizarUsuarioSchema>;
