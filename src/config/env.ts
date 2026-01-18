import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

const EnvSchema = z.object({
  PORTA: z.coerce.number(),

  ENDERECO_BD: z.string().min(6),
  PORTA_BD: z.coerce.number(),
  NOME_BD: z.string(),
  SENHA_BD: z.string(),
});

export const env = z.parse(EnvSchema, process.env);
