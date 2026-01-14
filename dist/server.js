import fastify from "fastify";
import { env } from "./config/env.js";
const app = fastify({ logger: true });
app.get("/", async (request, reply) => {
    return { hello: "world" };
});
app.listen({ port: env.PORTA });
//# sourceMappingURL=server.js.map