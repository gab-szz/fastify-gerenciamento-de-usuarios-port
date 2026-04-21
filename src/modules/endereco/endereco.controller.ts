import { Controller, GET, POST, PUT, DELETE, Inject } from 'fastify-decorators';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { criarEnderecoSchema } from './dtos/criar-endereco.dto.js';
import {
  atualizarEnderecoBodySchema,
  atualizarEnderecoSchema,
} from './dtos/atualizar-endereco.dto.js';
import { enderecoIdParamSchema, enderecoResponseSchema } from './types.js';
import { CriarEnderecoUseCase } from './use-cases/criar-endereco.use-case.js';
import { ConsultarEnderecoUseCase } from './use-cases/consultar-endereco.use-case.js';
import { AtualizarEnderecoUseCase } from './use-cases/atualizar-endereco.use-case.js';
import { ExcluirEnderecoUseCase } from './use-cases/excluir-endereco.use-case.js';

@Controller({ route: '/endereco' })
export class EnderecoController {
  @Inject(CriarEnderecoUseCase)
  private readonly criarUseCase!: CriarEnderecoUseCase;

  @Inject(ConsultarEnderecoUseCase)
  private readonly consultarUseCase!: ConsultarEnderecoUseCase;

  @Inject(AtualizarEnderecoUseCase)
  private readonly atualizarUseCase!: AtualizarEnderecoUseCase;

  @Inject(ExcluirEnderecoUseCase)
  private readonly excluirUseCase!: ExcluirEnderecoUseCase;

  @POST({
    url: '/',
    options: {
      schema: {
        tags: ['Endereço'],
        summary: 'Cria um novo endereço',
        body: criarEnderecoSchema,
        response: { 201: enderecoResponseSchema },
      },
    },
  })
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarEnderecoSchema.parse(request.body);
    const endereco = await this.criarUseCase.executar(input);
    return reply.status(201).send(endereco);
  }

  @GET({
    url: '/',
    options: {
      schema: {
        tags: ['Endereço'],
        summary: 'Consulta todos os endereços',
        response: { 200: z.array(enderecoResponseSchema) },
      },
    },
  })
  async consultarTodos(_request: FastifyRequest, reply: FastifyReply) {
    const enderecos = await this.consultarUseCase.todos();
    return reply.status(200).send(enderecos);
  }

  @GET({
    url: '/:id',
    options: {
      schema: {
        tags: ['Endereço'],
        summary: 'Consulta endereço por ID',
        params: enderecoIdParamSchema,
        response: {
          200: enderecoResponseSchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
  })
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const { id } = enderecoIdParamSchema.parse(request.params);
    const endereco = await this.consultarUseCase.porId(id);
    if (!endereco) {
      return reply.status(404).send({ message: 'Endereço não encontrado' });
    }
    return reply.status(200).send(endereco);
  }

  @PUT({
    url: '/:id',
    options: {
      schema: {
        tags: ['Endereço'],
        summary: 'Atualiza um endereço',
        params: enderecoIdParamSchema,
        body: atualizarEnderecoBodySchema,
        response: {
          200: enderecoResponseSchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
  })
  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const { id } = enderecoIdParamSchema.parse(request.params);
    const input = atualizarEnderecoSchema.parse({
      ...(request.body as object),
      id,
    });
    const endereco = await this.atualizarUseCase.executar(input);
    if (!endereco) {
      return reply.status(404).send({ message: 'Endereço não encontrado' });
    }
    return reply.status(200).send(endereco);
  }

  @DELETE({
    url: '/:id',
    options: {
      schema: {
        tags: ['Endereço'],
        summary: 'Exclui um endereço (soft delete)',
        params: enderecoIdParamSchema,
        response: { 204: z.null() },
      },
    },
  })
  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const { id } = enderecoIdParamSchema.parse(request.params);
    const sucesso = await this.excluirUseCase.executar(id);
    if (!sucesso) {
      return reply.status(404).send({ message: 'Endereço não encontrado' });
    }
    return reply.status(204).send();
  }
}
