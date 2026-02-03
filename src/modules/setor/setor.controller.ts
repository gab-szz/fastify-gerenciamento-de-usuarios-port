import type { FastifyReply, FastifyRequest } from 'fastify';
import { criarSetorSchema } from './setor.type.js';
import { ZodError } from 'zod';

export class SetorController {
  constructor() {}

  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarSetorSchema.parse(request.body);
    const setor = await request.setorUseCases.criar.executar(input);
    return reply.status(201).send(setor);
  }

  async consultar(request: FastifyRequest, reply: FastifyReply) {
    const setores = await request.setorUseCases.consultar.todos();
    return reply.status(200).send(setores);
  }
}
