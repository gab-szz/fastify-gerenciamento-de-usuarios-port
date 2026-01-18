import fastify from "fastify";
import { env } from "./config/env.js";
import { fonteDeDados } from "./database/data-source.js";
import logger from "./logger/index.js";

const app = fastify();

app.get("/", async (_request, _reply) => {
  return { hello: "world" };
});

app.addHook("onReady", async () => {
  fonteDeDados
    .initialize()
    .then(() => {
      logger.info("Fonte de Dados inicializada!");
      logger.info(`Aplicação rodando na porta ${env.PORTA}!`);
    })
    .catch((err) => {
      logger.error("Ocorreu um erro ao inicializar a fonte de dados", err);
    });
});

app.listen({ port: env.PORTA });
