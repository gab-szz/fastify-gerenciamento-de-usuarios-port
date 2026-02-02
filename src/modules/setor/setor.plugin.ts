import fp from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';
import { CriarSetorUseCase } from './use-cases/criar-setor.use-case.js';
import { fonteDeDados } from '../../database/data-source.js';
import { SetorEntity } from './infra/setor.entity.js';
import { SetorRepository } from './infra/setor.repository.js';

declare module 'fastify' {
  interface FastifyRequest {
    setorUseCases: {
      criar: CriarSetorUseCase;
    };
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const typeormRepository = fonteDeDados.getRepository(SetorEntity);
  const setorRepository = new SetorRepository(typeormRepository);

  const criarSetorUseCase = new CriarSetorUseCase(setorRepository);

  fastify.decorateRequest('setorUseCases', {
    getter() {
      return {
        criar: criarSetorUseCase,
      };
    },
  });
});
