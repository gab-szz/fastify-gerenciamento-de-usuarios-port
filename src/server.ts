import fastify, { type FastifyError } from 'fastify';
import { env } from './config/env.js';
import {
  destruirConexaoComFonteDeDados,
  inicializarConexaoComFonteDeDados,
} from './database/data-source.js';
import setorPlugin from './modules/setor/setor.plugin.js';
import { setorRoutes } from './modules/setor/setor.routes.js';
import { ZodError } from 'zod';
import logger from './logger/index.js';
import { ErroRegraNegocio } from './errors/ErroRegraNegocio.error.js';

const app = fastify();

app.addHook('onReady', async () => inicializarConexaoComFonteDeDados());

app.register(setorPlugin);
app.register(setorRoutes);

app.setErrorHandler(async (error, request, reply) => {
  if (error instanceof ZodError) {
    const problemas = error.issues.map((issue) => ({
      campo: issue.path.join('.') || 'body',
      message: issue.message,
    }));
    return reply
      .status(400)
      .send({ message: 'Validation error', data: problemas });
  }

  if (error instanceof ErroRegraNegocio) {
    return reply.status(400).send({ message: error.message });
  }

  logger.error(error);
  return reply.status(500).send({ mensagem: 'Erro interno do servidor' });
});

app.addHook('onClose', async () => destruirConexaoComFonteDeDados());

app.listen({ port: env.PORTA });
