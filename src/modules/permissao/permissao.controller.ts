import { Controller, Inject, GET, POST, PUT, DELETE } from 'fastify-decorators';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { criarPermissaoSchema } from './dtos/criar-permissao.dto.js';
import {
  atualizarPermissaoBodySchema,
  atualizarPermissaoSchema,
} from './dtos/atualizar-permissao.dto.js';
import {
  permissaoIdParamSchema,
  permissaoNomeParamSchema,
  permissaoResponseSchema,
} from './types.js';
import { CriarPermissaoUseCase } from './useCases/criar-permissao.use-case.js';
import { AtualizarPermissaoUseCase } from './useCases/atualizar-permissao.use-case.js';
import { RemoverPermissaoUseCase } from './useCases/remover-permissao.use-case.js';
import { ConsultarPermissaoUseCase } from './useCases/consultar-permissao.use-case.js';

@Controller({ route: '/permissao' })
export class PermissaoController {
  @Inject(CriarPermissaoUseCase)
  private readonly criarPermissaoUseCase!: CriarPermissaoUseCase;

  @Inject(AtualizarPermissaoUseCase)
  private readonly atualizarPermissaoUseCase!: AtualizarPermissaoUseCase;

  @Inject(RemoverPermissaoUseCase)
  private readonly removerPermissaoUseCase!: RemoverPermissaoUseCase;

  @Inject(ConsultarPermissaoUseCase)
  private readonly consultarPermissaoUseCase!: ConsultarPermissaoUseCase;

  @GET({
    url: '/',
    options: {
      schema: {
        tags: ['Permissão'],
        summary: 'Consulta todas as permissões',
        response: { 200: z.array(permissaoResponseSchema) },
      },
    },
  })
  async consultarTodos(_request: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send(await this.consultarPermissaoUseCase.todas());
  }

  @GET({
    url: '/:id',
    options: {
      schema: {
        tags: ['Permissão'],
        summary: 'Consulta permissão por ID',
        params: permissaoIdParamSchema,
        response: {
          200: permissaoResponseSchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
  })
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const { id } = permissaoIdParamSchema.parse(request.params);
    return reply
      .status(200)
      .send(await this.consultarPermissaoUseCase.porId(id));
  }

  @GET({
    url: '/nome/:nome',
    options: {
      schema: {
        tags: ['Permissão'],
        summary: 'Consulta permissão por nome',
        params: permissaoNomeParamSchema,
        response: { 200: permissaoResponseSchema },
      },
    },
  })
  async consultarPorNome(request: FastifyRequest, reply: FastifyReply) {
    const { nome } = permissaoNomeParamSchema.parse(request.params);
    return reply
      .status(200)
      .send(await this.consultarPermissaoUseCase.porNome(nome));
  }

  @POST({
    url: '/',
    options: {
      schema: {
        tags: ['Permissão'],
        summary: 'Cria uma nova permissão',
        body: criarPermissaoSchema,
        response: { 201: permissaoResponseSchema },
      },
    },
  })
  async criarPermissao(request: FastifyRequest, reply: FastifyReply) {
    const input = criarPermissaoSchema.parse(request.body);
    return reply.status(201).send(await this.criarPermissaoUseCase.exec(input));
  }

  @PUT({
    url: '/:id',
    options: {
      schema: {
        tags: ['Permissão'],
        summary: 'Atualiza uma permissão',
        params: permissaoIdParamSchema,
        body: atualizarPermissaoBodySchema,
        response: { 200: permissaoResponseSchema },
      },
    },
  })
  async atualizarPermissao(request: FastifyRequest, reply: FastifyReply) {
    const { id } = permissaoIdParamSchema.parse(request.params);
    const input = atualizarPermissaoSchema.parse({
      id,
      ...(request.body as object),
    });
    return reply
      .status(200)
      .send(await this.atualizarPermissaoUseCase.exec(input));
  }

  @DELETE({
    url: '/:id',
    options: {
      schema: {
        tags: ['Permissão'],
        summary: 'Remove uma permissão',
        params: permissaoIdParamSchema,
        response: { 200: z.boolean() },
      },
    },
  })
  async removerPermissao(request: FastifyRequest, reply: FastifyReply) {
    const { id } = permissaoIdParamSchema.parse(request.params);
    return reply.status(200).send(await this.removerPermissaoUseCase.exec(id));
  }
}
