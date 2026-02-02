import fastify, { type FastifyError } from 'fastify';
import { env } from './config/env.js';
import {
  destruirConexaoComFonteDeDados,
  inicializarConexaoComFonteDeDados,
} from './database/data-source.js';
import setorPlugin from './modules/setor/setor.plugin.js';
import { setorRoutes } from './modules/setor/setor.routes.js';
import { errorHandler } from './errors/error.handler.js';

const app = fastify();

app.addHook('onReady', async () => inicializarConexaoComFonteDeDados());

app.register(setorPlugin);
app.register(setorRoutes);

app.setErrorHandler(errorHandler);

app.addHook('onClose', async () => destruirConexaoComFonteDeDados());

app.listen({ port: env.PORTA });
