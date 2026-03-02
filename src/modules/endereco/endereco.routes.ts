import type { FastifyInstance } from 'fastify';
import { EnderecoController } from './endereco.controller.js';

export async function enderecoRoutes(fastify: FastifyInstance) {
  const controller = new EnderecoController();

  fastify.post('/endereco', controller.criar.bind(controller));
}
