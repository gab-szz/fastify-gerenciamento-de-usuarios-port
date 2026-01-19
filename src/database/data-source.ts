import { DataSource } from "typeorm";
import { env } from "../config/env.js";
import logger from "../logger/index.js";

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
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
  ssl: { rejectUnauthorized: false }, // Necessário para bancos na AWS
});

export async function inicializarConexaoComFonteDeDados() {
  fonteDeDados
    .initialize()
    .then(() => {
      logger.info("Fonte de Dados inicializada!");
      logger.info(`Aplicação rodando na porta ${env.PORTA}!`);
    })
    .catch((err) => {
      logger.error("Ocorreu um erro ao inicializar a fonte de dados", err);
    });
}

export async function destruirConexaoComFonteDeDados() {
  fonteDeDados
    .destroy()
    .then(() => {
      logger.info("Conexão com Fonte de Dados encerrada!");
    })
    .catch((err) => {
      logger.error("Ocorreu um erro ao encerrar a conexão fonte de dados", err);
    });
}
