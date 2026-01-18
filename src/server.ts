import fastify from "fastify";
import { env } from "./config/env.js";
import {
  destruirConexaoComFonteDeDados,
  inicializarConexaoComFonteDeDados,
} from "./database/data-source.js";

const app = fastify();

app.get("/", async (_request, _reply) => {
  return { hello: "world" };
});

app.addHook("onReady", async () => inicializarConexaoComFonteDeDados());
app.addHook("onClose", async () => destruirConexaoComFonteDeDados());

app.listen({ port: env.PORTA });
