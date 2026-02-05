import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  atualizarSetorSchema,
  consultarSetorPorIdSchema,
  consultarSetorPorNomeSchema,
  criarSetorSchema,
  excluirSetorSchema,
} from './setor.type.js';

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

  async consultarPorNome(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarSetorPorNomeSchema.parse(request.params);
    const setores = await request.setorUseCases.consultar.porNome(input.nome);
    return reply.status(200).send(setores);
  }

  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarSetorPorIdSchema.parse(request.params);
    const setor = await request.setorUseCases.consultar.porId(input.id);
    return reply.status(200).send(setor);
  }

  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const input = atualizarSetorSchema.parse({
      id: (request.params as any).id,
      nome: (request.body as any).nome,
    });
    const setor = await request.setorUseCases.atualizar.executar(input);
    return reply.status(200).send(setor);
  }

  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const input = excluirSetorSchema.parse(request.params);
    const setor = await request.setorUseCases.excluir.executar(input.id);
    return reply.status(200).send(setor);
  }
}
