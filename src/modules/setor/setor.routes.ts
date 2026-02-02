import type { FastifyInstance } from 'fastify';
import { SetorController } from './setor.controller.js';

export async function setorRoutes(fastify: FastifyInstance) {
  const controller = new SetorController();

  fastify.post('/setor', controller.criar.bind(controller));
}
