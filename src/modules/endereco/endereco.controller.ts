import { Controller, GET, POST, PUT, DELETE, Inject } from 'fastify-decorators';
import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  atualizarEnderecoSchema,
  consultarEnderecoPorIdSchema,
  criarEnderecoSchema,
} from './endereco.type.js';
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

  @POST({ url: '/' })
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarEnderecoSchema.parse(request.body);
    const endereco = await this.criarUseCase.executar(input);
    return reply.status(201).send(endereco);
  }

  @GET({ url: '/:id' })
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarEnderecoPorIdSchema.parse(request.params);
    const endereco = await this.consultarUseCase.porId(input.id);
    if (!endereco) {
      return reply.status(404).send({ message: 'Endereço não encontrado' });
    }
    return reply.status(200).send(endereco);
  }

  @GET({ url: '/' })
  async consultarTodos(_request: FastifyRequest, reply: FastifyReply) {
    const enderecos = await this.consultarUseCase.todos();
    return reply.status(200).send(enderecos);
  }

  @PUT({ url: '/:id' })
  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const input = atualizarEnderecoSchema.parse({
      ...(request.body as object),
      id: (request.params as { id: number }).id,
    });
    const endereco = await this.atualizarUseCase.executar(input);
    if (!endereco) {
      return reply.status(404).send({ message: 'Endereço não encontrado' });
    }
    return reply.status(200).send(endereco);
  }

  @DELETE({ url: '/:id' })
  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarEnderecoPorIdSchema.parse(request.params);
    const sucesso = await this.excluirUseCase.executar(input.id);
    if (!sucesso) {
      return reply.status(404).send({ message: 'Endereço não encontrado' });
    }
    return reply.status(204).send();
  }
}
