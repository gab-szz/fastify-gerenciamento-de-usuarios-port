import { DataSource } from "typeorm";
import { env } from "../config/env.js";

export const fonteDeDados = new DataSource({
  type: "postgres",
  host: env.ENDERECO_BD,
  port: env.PORTA_BD,
  username: env.USUARIO_BD,
  password: env.SENHA_BD,
  database: env.NOME_BD,
  synchronize: false,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
  ssl: { rejectUnauthorized: false }, // Necessário para bancos na AWS
});
