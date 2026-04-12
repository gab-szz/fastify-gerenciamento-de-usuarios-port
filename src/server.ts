import fastify from 'fastify';
import cors from '@fastify/cors';
import { env } from './config/env.js';
import {
  destruirConexaoComFonteDeDados,
  inicializarConexaoComFonteDeDados,
} from './database/data-source.js';
import setorPlugin from './modules/setor/setor.plugin.js';
import { setorRoutes } from './modules/setor/setor.routes.js';
import { errorHandler } from './errors/error.handler.js';
import enderecoPlugin from './modules/endereco/endereco.plugin.js';
import { enderecoRoutes } from './modules/endereco/endereco.routes.js';
import perfilPlugin from './modules/perfil/perfil.plugin.js';
import { perfilRoutes } from './modules/perfil/perfil.routes.js';

const app = fastify();

await app.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
});

await inicializarConexaoComFonteDeDados();

app.register(setorPlugin);
app.register(setorRoutes);

app.register(enderecoPlugin);
app.register(enderecoRoutes);

app.register(perfilPlugin);
app.register(perfilRoutes);

app.setErrorHandler(errorHandler);

app.addHook('onClose', async () => destruirConexaoComFonteDeDados());

await app.listen({ port: env.PORTA });
