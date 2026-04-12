import fp from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';
import { fonteDeDados } from '../../database/data-source.js';
import { CriarPerfilUseCase } from './use-cases/criar-perfil.use-case.js';
import { AtualizarPerfilUseCase } from './use-cases/atualizar-perfil.use-case.js';
import { PerfilEntity } from './infra/perfil.entity.js';
import { PerfilRepository } from './infra/perfil.repository.js';

declare module 'fastify' {
  interface FastifyRequest {
    perfilUseCases: {
      criar: CriarPerfilUseCase;
      atualizar: AtualizarPerfilUseCase;
    };
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const typeormRepository = fonteDeDados.getRepository(PerfilEntity);
  const perfilRepository = new PerfilRepository(typeormRepository);

  const criarPerfilUseCase = new CriarPerfilUseCase(perfilRepository);
  const atualizarPerfilUseCase = new AtualizarPerfilUseCase(perfilRepository);

  fastify.decorateRequest('perfilUseCases', {
    getter() {
      return {
        criar: criarPerfilUseCase,
        atualizar: atualizarPerfilUseCase,
      };
    },
  });
});
