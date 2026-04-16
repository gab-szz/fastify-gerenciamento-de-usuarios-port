import { Controller, GET, POST, PUT, DELETE, Inject } from 'fastify-decorators';
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { criarPerfilSchema } from './dtos/criar-perfil.dto.js';
import { atualizarPerfilSchema } from './dtos/atualizar-perfil.dto.js';
import { CriarPerfilUseCase } from './use-cases/criar-perfil.use-case.js';
import { AtualizarPerfilUseCase } from './use-cases/atualizar-perfil.use-case.js';
import { ConsultarPerfilUseCase } from './use-cases/consultar-perfil.use-case.js';
import { ExcluirPerfilUseCase } from './use-cases/excluir-perfil.use-case.js';

const idSchema = z.object({ id: z.coerce.number().min(1) });

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

  @POST({ url: '/' })
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarPerfilSchema.parse(request.body);
    const perfil = await this.criarUseCase.exec(input);
    return reply.status(201).send(perfil);
  }

  @GET({ url: '/:id' })
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params);
    const perfil = await this.consultarUseCase.porId(id);
    if (!perfil) {
      return reply.status(404).send({ message: 'Perfil não encontrado' });
    }
    return reply.status(200).send(perfil);
  }

  @GET({ url: '/' })
  async consultarTodos(_request: FastifyRequest, reply: FastifyReply) {
    const perfis = await this.consultarUseCase.todos();
    return reply.status(200).send(perfis);
  }

  @PUT({ url: '/:id' })
  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const input = atualizarPerfilSchema.parse({
      id: (request.params as { id: number }).id,
      nome: (request.body as { nome: string }).nome,
    });
    const perfil = await this.atualizarUseCase.exec(input);
    return reply.status(200).send(perfil);
  }

  @DELETE({ url: '/:id' })
  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idSchema.parse(request.params);
    const perfil = await this.excluirUseCase.exec(id);
    return reply.status(200).send(perfil);
  }
}
