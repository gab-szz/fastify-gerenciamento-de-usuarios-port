import { Controller, GET, POST, PUT, DELETE, Inject } from 'fastify-decorators';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { criarPerfilSchema } from './dtos/criar-perfil.dto.js';
import {
  atualizarPerfilBodySchema,
  atualizarPerfilSchema,
} from './dtos/atualizar-perfil.dto.js';
import { perfilIdParamSchema, perfilResponseSchema } from './types.js';
import { CriarPerfilUseCase } from './use-cases/criar-perfil.use-case.js';
import { AtualizarPerfilUseCase } from './use-cases/atualizar-perfil.use-case.js';
import { ConsultarPerfilUseCase } from './use-cases/consultar-perfil.use-case.js';
import { ExcluirPerfilUseCase } from './use-cases/excluir-perfil.use-case.js';

@Controller({ route: '/perfil' })
export class PerfilController {
  @Inject(CriarPerfilUseCase)
  private readonly criarUseCase!: CriarPerfilUseCase;

  @Inject(AtualizarPerfilUseCase)
  private readonly atualizarUseCase!: AtualizarPerfilUseCase;

  @Inject(ConsultarPerfilUseCase)
  private readonly consultarUseCase!: ConsultarPerfilUseCase;

  @Inject(ExcluirPerfilUseCase)
  private readonly excluirUseCase!: ExcluirPerfilUseCase;

  @POST({
    url: '/',
    options: {
      schema: {
        tags: ['Perfil'],
        summary: 'Cria um novo perfil',
        body: criarPerfilSchema,
        response: { 201: perfilResponseSchema },
      },
    },
  })
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarPerfilSchema.parse(request.body);
    const perfil = await this.criarUseCase.exec(input);
    return reply.status(201).send(perfil);
  }

  @GET({
    url: '/',
    options: {
      schema: {
        tags: ['Perfil'],
        summary: 'Consulta todos os perfis',
        response: { 200: z.array(perfilResponseSchema) },
      },
    },
  })
  async consultarTodos(_request: FastifyRequest, reply: FastifyReply) {
    const perfis = await this.consultarUseCase.todos();
    return reply.status(200).send(perfis);
  }

  @GET({
    url: '/:id',
    options: {
      schema: {
        tags: ['Perfil'],
        summary: 'Consulta perfil por ID',
        params: perfilIdParamSchema,
        response: {
          200: perfilResponseSchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
  })
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const { id } = perfilIdParamSchema.parse(request.params);
    const perfil = await this.consultarUseCase.porId(id);
    if (!perfil) {
      return reply.status(404).send({ message: 'Perfil não encontrado' });
    }
    return reply.status(200).send(perfil);
  }

  @PUT({
    url: '/:id',
    options: {
      schema: {
        tags: ['Perfil'],
        summary: 'Atualiza um perfil',
        params: perfilIdParamSchema,
        body: atualizarPerfilBodySchema,
        response: { 200: perfilResponseSchema },
      },
    },
  })
  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const { id } = perfilIdParamSchema.parse(request.params);
    const input = atualizarPerfilSchema.parse({
      id,
      nome: (request.body as { nome: string }).nome,
    });
    const perfil = await this.atualizarUseCase.exec(input);
    return reply.status(200).send(perfil);
  }

  @DELETE({
    url: '/:id',
    options: {
      schema: {
        tags: ['Perfil'],
        summary: 'Exclui um perfil (soft delete)',
        params: perfilIdParamSchema,
        response: { 200: perfilResponseSchema },
      },
    },
  })
  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const { id } = perfilIdParamSchema.parse(request.params);
    const perfil = await this.excluirUseCase.exec(id);
    return reply.status(200).send(perfil);
  }
}
