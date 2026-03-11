import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  consultarEnderecoPorIdSchema,
  criarEnderecoSchema,
} from './endereco.type.js';

export class EnderecoController {
  constructor() {}

  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarEnderecoSchema.parse(request.body);
    const endereco = await request.enderecoUseCases.criar.executar(input);
    return reply.status(201).send(endereco);
  }

  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarEnderecoPorIdSchema.parse(request.params);

    const endereco = await request.enderecoUseCases.consultar.porId(input.id);
    if (!endereco) {
      return reply.status(404).send({ message: 'Endereço não encontrado' });
    }
    return reply.send(endereco);
  }

  async consultarTodos(request: FastifyRequest, reply: FastifyReply) {
    const enderecos = await request.enderecoUseCases.consultar.todos();
    return reply.send(enderecos);
  }
}
