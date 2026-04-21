import { Controller, GET, POST, PUT, DELETE, Inject } from 'fastify-decorators';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { criarSetorSchema } from './dtos/criar-setor.dto.js';
import {
  atualizarSetorBodySchema,
  atualizarSetorSchema,
} from './dtos/atualizar-setor.dto.js';
import {
  setorIdParamSchema,
  setorNomeParamSchema,
  setorResponseSchema,
} from './types.js';
import { CriarSetorUseCase } from './use-cases/criar-setor.use-case.js';
import { ConsultarSetorUseCases } from './use-cases/consultar-setor.use-case.js';
import { AtualizarSetorUseCase } from './use-cases/atualizar-setor.use-case.js';
import { ExcluirSetorUseCase } from './use-cases/excluir-setor.use-case.js';

@Controller({ route: '/setor' })
export class SetorController {
  @Inject(CriarSetorUseCase)
  private readonly criarUseCase!: CriarSetorUseCase;

  @Inject(ConsultarSetorUseCases)
  private readonly consultarUseCase!: ConsultarSetorUseCases;

  @Inject(AtualizarSetorUseCase)
  private readonly atualizarUseCase!: AtualizarSetorUseCase;

  @Inject(ExcluirSetorUseCase)
  private readonly excluirUseCase!: ExcluirSetorUseCase;

  @POST({
    url: '/',
    options: {
      schema: {
        tags: ['Setor'],
        summary: 'Cria um novo setor',
        body: criarSetorSchema,
        response: { 201: setorResponseSchema },
      },
    },
  })
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarSetorSchema.parse(request.body);
    const setor = await this.criarUseCase.executar(input);
    return reply.status(201).send(setor);
  }

  @GET({
    url: '/',
    options: {
      schema: {
        tags: ['Setor'],
        summary: 'Consulta todos os setores',
        response: { 200: z.array(setorResponseSchema) },
      },
    },
  })
  async consultar(_request: FastifyRequest, reply: FastifyReply) {
    const setores = await this.consultarUseCase.todos();
    return reply.status(200).send(setores);
  }

  @GET({
    url: '/nome/:nome',
    options: {
      schema: {
        tags: ['Setor'],
        summary: 'Consulta setores por nome',
        params: setorNomeParamSchema,
        response: { 200: z.array(setorResponseSchema) },
      },
    },
  })
  async consultarPorNome(request: FastifyRequest, reply: FastifyReply) {
    const { nome } = setorNomeParamSchema.parse(request.params);
    const setores = await this.consultarUseCase.porNome(nome);
    return reply.status(200).send(setores);
  }

  @GET({
    url: '/:id',
    options: {
      schema: {
        tags: ['Setor'],
        summary: 'Consulta setor por ID',
        params: setorIdParamSchema,
        response: {
          200: setorResponseSchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
  })
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const { id } = setorIdParamSchema.parse(request.params);
    const setor = await this.consultarUseCase.porId(id);
    if (!setor) {
      return reply.status(404).send({ message: 'Setor não encontrado' });
    }
    return reply.status(200).send(setor);
  }

  @PUT({
    url: '/:id',
    options: {
      schema: {
        tags: ['Setor'],
        summary: 'Atualiza um setor',
        params: setorIdParamSchema,
        body: atualizarSetorBodySchema,
        response: { 200: setorResponseSchema },
      },
    },
  })
  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const { id } = setorIdParamSchema.parse(request.params);
    const input = atualizarSetorSchema.parse({
      id,
      nome: (request.body as { nome: string }).nome,
    });
    const setor = await this.atualizarUseCase.executar(input);
    return reply.status(200).send(setor);
  }

  @DELETE({
    url: '/:id',
    options: {
      schema: {
        tags: ['Setor'],
        summary: 'Exclui um setor (soft delete)',
        params: setorIdParamSchema,
        response: { 200: setorResponseSchema },
      },
    },
  })
  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const { id } = setorIdParamSchema.parse(request.params);
    const setor = await this.excluirUseCase.executar(id);
    return reply.status(200).send(setor);
  }
}
