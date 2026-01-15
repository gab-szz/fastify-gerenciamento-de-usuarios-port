import z from "zod";

export const setorSchema = z.object({
  id: z.coerce.number().optional(),
  nome: z.string().min(4),
  criado_em: z.date(),
  alterado_em: z.date(),
  excluido_em: z.date(),
});

export type setorType = z.infer<typeof setorSchema>;
