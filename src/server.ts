import fastify from "fastify";
import { env } from "./config/env.js";
import { fonteDeDados } from "./database/data-source.js";

const app = fastify({ logger: true });

app.get("/", async (_request, _reply) => {
  return { hello: "world" };
});

app.addHook("onReady", async () => {
  fonteDeDados
    .initialize()
    .then(() => {
      console.log("Fonte de Dados inicializada!");
      console.log(`Aplicação rodando na porta ${env.PORTA}!`);
    })
    .catch((err) => {
      console.error("Ocorreu um erro ao inicializar a fonte de dados", err);
    });
});

app.listen({ port: env.PORTA });
