import { Controller, GET, POST, PUT, DELETE, Inject } from 'fastify-decorators';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { criarUsuarioSchema } from './dtos/criar-usuario.dto.js';
import {
  atualizarUsuarioBodySchema,
  atualizarUsuarioSchema,
} from './dtos/atualizar-usuario.dto.js';
import { usuarioIdParamSchema, usuarioResponseSchema } from './types.js';
import { CriarUsuarioUseCase } from './use-cases/criar-usuario.use-case.js';
import { AtualizarUsuarioUseCase } from './use-cases/atualizar-usuario.use-case.js';
import { ConsultarUsuarioUseCase } from './use-cases/consultar-usuario.use-case.js';
import { ExcluirUsuarioUseCase } from './use-cases/excluir-usuario.use-case.js';

@Controller({ route: '/usuario' })
export class UsuarioController {
  @Inject(CriarUsuarioUseCase)
  private readonly criarUseCase!: CriarUsuarioUseCase;

  @Inject(AtualizarUsuarioUseCase)
  private readonly atualizarUseCase!: AtualizarUsuarioUseCase;

  @Inject(ConsultarUsuarioUseCase)
  private readonly consultarUseCase!: ConsultarUsuarioUseCase;

  @Inject(ExcluirUsuarioUseCase)
  private readonly excluirUseCase!: ExcluirUsuarioUseCase;

  @POST({
    url: '/',
    options: {
      schema: {
        tags: ['Usuário'],
        summary: 'Cria um novo usuário',
        body: criarUsuarioSchema,
        response: { 201: usuarioResponseSchema },
      },
    },
  })
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarUsuarioSchema.parse(request.body);
    const usuario = await this.criarUseCase.exec(input);
    return reply.status(201).send(usuario);
  }

  @GET({
    url: '/',
    options: {
      schema: {
        tags: ['Usuário'],
        summary: 'Lista todos os usuários',
        response: { 200: z.array(usuarioResponseSchema) },
      },
    },
  })
  async consultarTodos(_request: FastifyRequest, reply: FastifyReply) {
    const usuarios = await this.consultarUseCase.todos();
    return reply.status(200).send(usuarios);
  }

  @GET({
    url: '/:id',
    options: {
      schema: {
        tags: ['Usuário'],
        summary: 'Consulta usuário por ID',
        params: usuarioIdParamSchema,
        response: {
          200: usuarioResponseSchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
  })
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const { id } = usuarioIdParamSchema.parse(request.params);
    const usuario = await this.consultarUseCase.porId(id);
    if (!usuario) {
      return reply.status(404).send({ message: 'Usuário não encontrado' });
    }
    return reply.status(200).send(usuario);
  }

  @PUT({
    url: '/:id',
    options: {
      schema: {
        tags: ['Usuário'],
        summary: 'Atualiza um usuário',
        params: usuarioIdParamSchema,
        body: atualizarUsuarioBodySchema,
        response: { 200: usuarioResponseSchema },
      },
    },
  })
  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const { id } = usuarioIdParamSchema.parse(request.params);
    const input = atualizarUsuarioSchema.parse({
      id,
      ...(request.body as object),
    });
    const usuario = await this.atualizarUseCase.exec(input);
    return reply.status(200).send(usuario);
  }

  @DELETE({
    url: '/:id',
    options: {
      schema: {
        tags: ['Usuário'],
        summary: 'Exclui um usuário (soft delete)',
        params: usuarioIdParamSchema,
        response: { 200: usuarioResponseSchema },
      },
    },
  })
  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const { id } = usuarioIdParamSchema.parse(request.params);
    const usuario = await this.excluirUseCase.exec(id);
    return reply.status(200).send(usuario);
  }
}
