import z from 'zod';
import { Controller, Inject, GET, POST, PUT, DELETE } from 'fastify-decorators';
import { CriarPermissaoUseCase } from './useCases/criar-permissao.use-case.js';
import { AtualizarPermissaoUseCase } from './useCases/atualizar-permissao.use-case.js';
import { RemoverPermissaoUseCase } from './useCases/remover-permissao.use-case.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { ConsultarPermissaoUseCase } from './useCases/consultar-permissao.use-case.js';
import { criarPermissaoSchema } from './dtos/criar-permissao.dto.js';

const idSchema = z.object({ id: z.coerce.number().min(1) });
const nomeSchema = z.object({ nome: z.string() });

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

  @GET({ url: '/' })
  async consultarTodos(_request: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send(await this.consultarPermissaoUseCase.todas());
  }

  @GET({ url: '/:id' })
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params);
    return reply
      .status(200)
      .send(await this.consultarPermissaoUseCase.porId(id));
  }

  @GET({ url: '/nome/:nome' })
  async consultarPorNome(request: FastifyRequest, reply: FastifyReply) {
    const { nome } = nomeSchema.parse(request.params);
    return reply
      .status(200)
      .send(await this.consultarPermissaoUseCase.porNome(nome));
  }

  @POST({ url: '/' })
  async criarPermissao(request: FastifyRequest, reply: FastifyReply) {
    const input = criarPermissaoSchema.parse(request.body);
    return reply.status(201).send(await this.criarPermissaoUseCase.exec(input));
  }

  @PUT({ url: '/:id' })
  async atualizarPermissao(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params);
    const input = criarPermissaoSchema.parse(request.body);
    return reply
      .status(200)
      .send(await this.atualizarPermissaoUseCase.exec({ id, ...input }));
  }

  @DELETE({ url: '/:id' })
  async removerPermissao(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params);
    return reply.status(200).send(await this.removerPermissaoUseCase.exec(id));
  }
}
