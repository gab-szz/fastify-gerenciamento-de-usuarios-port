import { Controller, GET, POST, PUT, DELETE, Inject } from 'fastify-decorators';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { criarSetorSchema } from './dtos/criar-setor.dto.js';
import {
  consultarSetorPorIdSchema,
  consultarSetorPorNomeSchema,
} from './dtos/consultar-setor.dto.js';
import { atualizarSetorSchema } from './dtos/atualizar-setor.dto.js';
import { excluirSetorSchema } from './dtos/excluir-setor.dto.js';
import { CriarSetorUseCase } from './use-cases/criar-setor.use-case.js';
import { ConsultarSetorUseCases } from './use-cases/consultar-setor.use-case.js';
import { AtualizarSetorUseCase } from './use-cases/atualizar-setor.use-case.js';
import { ExcluirSetorUseCase } from './use-cases/excluir-setor.use-case.js';

@Controller({ route: '/setor' })
export class SetorController {
  @Inject(CriarSetorUseCase)
  private readonly criarUseCase!: CriarSetorUseCase;

  @Inject(ConsultarSetorUseCases)
  private readonly consultarUseCases!: ConsultarSetorUseCases;

  @Inject(AtualizarSetorUseCase)
  private readonly atualizarUseCase!: AtualizarSetorUseCase;

  @Inject(ExcluirSetorUseCase)
  private readonly excluirUseCase!: ExcluirSetorUseCase;

  @POST({ url: '/' })
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarSetorSchema.parse(request.body);
    const setor = await this.criarUseCase.executar(input);
    return reply.status(201).send(setor);
  }

  @GET({ url: '/' })
  async consultar(_request: FastifyRequest, reply: FastifyReply) {
    const setores = await this.consultarUseCases.todos();
    return reply.status(200).send(setores);
  }

  @GET({ url: '/nome/:nome' })
  async consultarPorNome(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarSetorPorNomeSchema.parse(request.params);
    const setores = await this.consultarUseCases.porNome(input.nome);
    return reply.status(200).send(setores);
  }

  @GET({ url: '/:id' })
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarSetorPorIdSchema.parse(request.params);
    const setor = await this.consultarUseCases.porId(input.id);
    return reply.status(200).send(setor);
  }

  @PUT({ url: '/:id' })
  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const input = atualizarSetorSchema.parse({
      id: (request.params as { id: number }).id,
      nome: (request.body as { nome: string }).nome,
    });
    const setor = await this.atualizarUseCase.executar(input);
    return reply.status(200).send(setor);
  }

  @DELETE({ url: '/:id' })
  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const input = excluirSetorSchema.parse(request.params);
    const setor = await this.excluirUseCase.executar(input.id);
    return reply.status(200).send(setor);
  }
}
