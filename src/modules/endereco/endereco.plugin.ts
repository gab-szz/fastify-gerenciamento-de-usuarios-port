import fp from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';
import { CriarEnderecoUseCase } from './use-cases/criar-endereco.use-case.js';
import { fonteDeDados } from '../../database/data-source.js';
import { EnderecoEntity } from './infra/endereco.entity.js';
import { EnderecoRepository } from './infra/endereco.repository.js';

declare module 'fastify' {
  interface FastifyRequest {
    enderecoUseCases: {
      criar: CriarEnderecoUseCase;
    };
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const typeormRepository = fonteDeDados.getRepository(EnderecoEntity);
  const enderecoRepository = new EnderecoRepository(typeormRepository);

  const criarEnderecoUseCase = new CriarEnderecoUseCase(enderecoRepository);

  fastify.decorateRequest('enderecoUseCases', {
    getter() {
      return {
        criar: criarEnderecoUseCase,
      };
    },
  });
});
