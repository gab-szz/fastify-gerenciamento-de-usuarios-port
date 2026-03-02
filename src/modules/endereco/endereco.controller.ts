import type { FastifyReply, FastifyRequest } from 'fastify';
import { criarEnderecoSchema } from './endereco.type.js';

export class EnderecoController {
  constructor() {}

  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarEnderecoSchema.parse(request.body);
    const endereco = await request.enderecoUseCases.criar.executar(input);
    return reply.status(201).send(endereco);
  }
}
