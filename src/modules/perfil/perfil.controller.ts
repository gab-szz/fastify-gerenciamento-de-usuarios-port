import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { criarPerfilSchema } from './dtos/criar-perfil.dto.js';

export class PerfilController {
  constructor() {}

  /**
   * Cria um novo perfil.
   * @param request Requisição recebida
   * @param reply Retorno da requisição
   * @returns Perfil criado
   */
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = z.parse(criarPerfilSchema, request.body);
    const perfil = await request.perfilUseCases.criar.exec(input);
    return reply.status(201).send(perfil);
  }
}
