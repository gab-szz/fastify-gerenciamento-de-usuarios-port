import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  atualizarEnderecoSchema,
  consultarEnderecoPorIdSchema,
  criarEnderecoSchema,
} from './endereco.type.js';

export class EnderecoController {
  constructor() {}

  /**
   * Cria um novo endereço
   * @param request Requisição contendo dados do endereço no body
   * @param reply Resposta da API
   * @returns 201 com endereço criado ou erro de validação
   */
  async criar(request: FastifyRequest, reply: FastifyReply) {
    const input = criarEnderecoSchema.parse(request.body);
    const endereco = await request.enderecoUseCases.criar.executar(input);
    return reply.status(201).send(endereco);
  }

  /**
   * Busca um endereço pelo ID
   * @param request Requisição com ID do endereço nos params
   * @param reply Resposta da API
   * @returns 200 com endereço ou 404 se não encontrado
   */
  async consultarPorId(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarEnderecoPorIdSchema.parse(request.params);

    const endereco = await request.enderecoUseCases.consultar.porId(input.id);
    if (!endereco) {
      return reply.status(404).send({ message: 'Endereço não encontrado' });
    }
    return reply.send(endereco);
  }

  /**
   * Lista todos os endereços cadastrados
   * @param request Requisição da API
   * @param reply Resposta da API
   * @returns 200 com array de endereços
   */
  async consultarTodos(request: FastifyRequest, reply: FastifyReply) {
    const enderecos = await request.enderecoUseCases.consultar.todos();
    return reply.send(enderecos);
  }

  /**
   * Atualiza um endereço existente
   * @param request Requisição com dados atualizados no body
   * @param reply Resposta da API
   * @returns 200 com endereço atualizado ou 404 se não encontrado
   */
  async atualizar(request: FastifyRequest, reply: FastifyReply) {
    const input = atualizarEnderecoSchema.parse(request.body);
    const endereco = await request.enderecoUseCases.atualizar.executar(input);
    if (!endereco) {
      return reply.status(404).send({ message: 'Endereço não encontrado' });
    }
    return reply.send(endereco);
  }

  /**
   * Remove um endereço
   * @param request Requisição com ID do endereço nos params
   * @param reply Resposta da API
   * @returns 204 sem conteúdo ou 404 se não encontrado
   */
  async excluir(request: FastifyRequest, reply: FastifyReply) {
    const input = consultarEnderecoPorIdSchema.parse(request.params);
    const sucesso = await request.enderecoUseCases.excluir.executar(input.id);
    if (!sucesso) {
      return reply.status(404).send({ message: 'Endereço não encontrado' });
    }
    return reply.status(204).send();
  }
}
