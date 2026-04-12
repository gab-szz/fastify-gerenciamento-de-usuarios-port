import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { criarPerfilSchema } from './dtos/criar-perfil.dto.js';

export class PerfilController {
  constructor() {}

  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = z.parse(criarPerfilSchema, request.body);
    const perfil = await request.perfilUseCases.criar.exec(input);
    return reply.status(201).send(perfil);
  }
}
