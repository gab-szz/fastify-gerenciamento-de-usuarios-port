import type { FastifyInstance } from 'fastify';
import { PerfilController } from './perfil.controller.js';

export async function perfilRoutes(fastify: FastifyInstance) {
  const controller = new PerfilController();

  fastify.post('/perfil', controller.criar.bind(controller));
}
