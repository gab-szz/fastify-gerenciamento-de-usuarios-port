import { ZodError } from 'zod';
import { ErroRegraNegocio } from './ErroRegraNegocio.error.js';
import logger from '../logger/index.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function errorHandler(
  error: unknown,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
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
}
