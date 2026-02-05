import fp from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';
import { CriarSetorUseCase } from './use-cases/criar-setor.use-case.js';
import { fonteDeDados } from '../../database/data-source.js';
import { SetorEntity } from './infra/setor.entity.js';
import { SetorRepository } from './infra/setor.repository.js';
import { ConsultarSetorUseCases } from './use-cases/consultar-setor.use-case.js';
import { AtualizarSetorUseCase } from './use-cases/atualizar-setor.use-case.js';
import { ExcluirSetorUseCase } from './use-cases/remover-setor.use-case.js';

declare module 'fastify' {
  interface FastifyRequest {
    setorUseCases: {
      criar: CriarSetorUseCase;
      consultar: ConsultarSetorUseCases;
      atualizar: AtualizarSetorUseCase;
      excluir: ExcluirSetorUseCase;
    };
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const typeormRepository = fonteDeDados.getRepository(SetorEntity);
  const setorRepository = new SetorRepository(typeormRepository);

  const criarSetorUseCase = new CriarSetorUseCase(setorRepository);
  const consultarSetorUseCases = new ConsultarSetorUseCases(setorRepository);
  const atualizarSetorUseCase = new AtualizarSetorUseCase(setorRepository);
  const excluirSetorUseCase = new ExcluirSetorUseCase(setorRepository);

  fastify.decorateRequest('setorUseCases', {
    getter() {
      return {
        criar: criarSetorUseCase,
        consultar: consultarSetorUseCases,
        atualizar: atualizarSetorUseCase,
        excluir: excluirSetorUseCase,
      };
    },
  });
});
