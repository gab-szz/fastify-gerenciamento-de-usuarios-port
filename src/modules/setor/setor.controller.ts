import { Controller, GET, POST, PUT, DELETE } from 'fastify-decorators';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { criarSetorSchema } from './dtos/criar-setor.dto.js';
import {
  consultarSetorPorIdSchema,
  consultarSetorPorNomeSchema,
} from './dtos/consultar-setor.dto.js';
import { atualizarSetorSchema } from './dtos/atualizar-setor.dto.js';
import { excluirSetorSchema } from './dtos/excluir-setor.dto.js';

type SetorUseCases = {
  criar: { executar: (input: any) => Promise<any> };
  consultar: {
    todos: () => Promise<any>;
    porNome: (nome: string) => Promise<any>;
    porId: (id: number) => Promise<any>;
  };
  atualizar: { executar: (input: any) => Promise<any> };
  excluir: { executar: (id: number) => Promise<any> };
};

type SetorRequest = FastifyRequest & { setorUseCases: SetorUseCases };

@Controller({ route: '/setor' })
export class SetorController {
  @POST({ url: '/' })
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarSetorSchema.parse(request.body);
    const setor = await (request as SetorRequest).setorUseCases.criar.executar(
      input,
    );
    return reply.status(201).send(setor);
  }

  @GET({ url: '/' })
  async consultar(request: FastifyRequest, reply: FastifyReply) {
    const setores = await (
      request as SetorRequest
    ).setorUseCases.consultar.todos();
    return reply.status(200).send(setores);
  }

  @GET({ url: '/nome/:nome' })
  async consultarPorNome(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarSetorPorNomeSchema.parse(request.params);
    const setores = await (
      request as SetorRequest
    ).setorUseCases.consultar.porNome(input.nome);
    return reply.status(200).send(setores);
  }

  @GET({ url: '/:id' })
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarSetorPorIdSchema.parse(request.params);
    const setor = await (request as SetorRequest).setorUseCases.consultar.porId(
      input.id,
    );
    return reply.status(200).send(setor);
  }

  @PUT({ url: '/:id' })
  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const input = atualizarSetorSchema.parse({
      id: (request.params as { id: number }).id,
      nome: (request.body as { nome: string }).nome,
    });
    const setor = await (
      request as SetorRequest
    ).setorUseCases.atualizar.executar(input);
    return reply.status(200).send(setor);
  }

  @DELETE({ url: '/:id' })
  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const input = excluirSetorSchema.parse(request.params);
    const setor = await (
      request as SetorRequest
    ).setorUseCases.excluir.executar(input.id);
    return reply.status(200).send(setor);
  }
}
