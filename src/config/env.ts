import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

const EnvSchema = z.object({
  PORTA: z.coerce.number(),
});

export const env = z.parse(EnvSchema, process.env);
