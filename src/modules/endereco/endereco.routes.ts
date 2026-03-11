import type { FastifyInstance } from 'fastify';
import { EnderecoController } from './endereco.controller.js';

export async function enderecoRoutes(fastify: FastifyInstance) {
  const controller = new EnderecoController();

  fastify.post('/endereco', controller.criar.bind(controller));
  fastify.get('/endereco/:id', controller.consultarPorId.bind(controller));
  fastify.get('/endereco', controller.consultarTodos.bind(controller));
}
