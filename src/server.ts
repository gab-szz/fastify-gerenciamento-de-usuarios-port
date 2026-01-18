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
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
});

app.listen({ port: env.PORTA });
