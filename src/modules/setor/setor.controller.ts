import type { FastifyReply, FastifyRequest } from 'fastify';
import { criarSetorSchema } from './dtos/criar-setor.dto.js';
import {
  consultarSetorPorIdSchema,
  consultarSetorPorNomeSchema,
} from './dtos/consultar-setor.dto.js';
import { atualizarSetorSchema } from './dtos/atualizar-setor.dto.js';
import { excluirSetorSchema } from './dtos/excluir-setor.dto.js';

export class SetorController {
  constructor() {}

  /**
   * Cria um novo setor
   * @param request Requisição com dados do setor no body
   * @param reply Resposta da API
   * @returns 201 com setor criado ou erro de validação
   */
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarSetorSchema.parse(request.body);
    const setor = await request.setorUseCases.criar.executar(input);
    return reply.status(201).send(setor);
  }

  /**
   * Lista todos os setores cadastrados
   * @param request Requisição da API
   * @param reply Resposta da API
   * @returns 200 com array de setores
   */
  async consultar(request: FastifyRequest, reply: FastifyReply) {
    const setores = await request.setorUseCases.consultar.todos();
    return reply.status(200).send(setores);
  }

  /**
   * Busca setores por nome
   * @param request Requisição com nome do setor nos params
   * @param reply Resposta da API
   * @returns 200 com array de setores encontrados
   */
  async consultarPorNome(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarSetorPorNomeSchema.parse(request.params);
    const setores = await request.setorUseCases.consultar.porNome(input.nome);
    return reply.status(200).send(setores);
  }

  /**
   * Busca um setor pelo ID
   * @param request Requisição com ID do setor nos params
   * @param reply Resposta da API
   * @returns 200 com setor encontrado
   */
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarSetorPorIdSchema.parse(request.params);
    const setor = await request.setorUseCases.consultar.porId(input.id);
    return reply.status(200).send(setor);
  }

  /**
   * Atualiza um setor existente
   * @param request Requisição com ID nos params e dados atualizados no body
   * @param reply Resposta da API
   * @returns 200 com setor atualizado
   */
  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const input = atualizarSetorSchema.parse({
      id: (request.params as any).id,
      nome: (request.body as any).nome,
    });
    const setor = await request.setorUseCases.atualizar.executar(input);
    return reply.status(200).send(setor);
  }

  /**
   * Remove um setor
   * @param request Requisição com ID do setor nos params
   * @param reply Resposta da API
   * @returns 200 com resposta da exclusão
   */
  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const input = excluirSetorSchema.parse(request.params);
    const setor = await request.setorUseCases.excluir.executar(input.id);
    return reply.status(200).send(setor);
  }
}
