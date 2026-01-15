import z from "zod";

export const setorSchema = z.object({
  id: z.coerce.number().optional(),
  nome: z.string().min(4),
  criado_em: z.date().optional(),
  alterado_em: z.date().optional(),
  excluido_em: z.date().optional(),
});

export type setorType = z.infer<typeof setorSchema>;
