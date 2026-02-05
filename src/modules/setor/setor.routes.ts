import type { FastifyInstance } from 'fastify';
import { SetorController } from './setor.controller.js';

export async function setorRoutes(fastify: FastifyInstance) {
  const controller = new SetorController();

  fastify.post('/setor', controller.criar.bind(controller));
  fastify.get('/setor', controller.consultar.bind(controller));
  fastify.get('/setor/:id', controller.consultarPorId.bind(controller));
  fastify.get(
    '/setor/nome/:nome',
    controller.consultarPorNome.bind(controller),
  );
  fastify.put('/setor/:id', controller.atualizar.bind(controller));
  fastify.delete('/setor/:id', controller.excluir.bind(controller));
}
