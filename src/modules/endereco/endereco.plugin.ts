import fp from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';
import { CriarEnderecoUseCase } from './use-cases/criar-endereco.use-case.js';
import { fonteDeDados } from '../../database/data-source.js';
import { EnderecoEntity } from './infra/endereco.entity.js';
import { EnderecoRepository } from './infra/endereco.repository.js';
import { ConsultarEnderecoUseCase } from './use-cases/consultar-endereco.use-case.js';
import { AtualizarEnderecoUseCase } from './use-cases/atualizar-endereco.use-case.js';
import { ExcluirEnderecoUseCase } from './use-cases/excluir-endereco.use-case.js';

declare module 'fastify' {
  interface FastifyRequest {
    enderecoUseCases: {
      criar: CriarEnderecoUseCase;
      consultar: ConsultarEnderecoUseCase;
      atualizar: AtualizarEnderecoUseCase;
      excluir: ExcluirEnderecoUseCase;
    };
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const typeormRepository = fonteDeDados.getRepository(EnderecoEntity);
  const enderecoRepository = new EnderecoRepository(typeormRepository);

  const criarEnderecoUseCase = new CriarEnderecoUseCase(enderecoRepository);
  const atualizarEnderecoUseCase = new AtualizarEnderecoUseCase(
    enderecoRepository,
  );
  const excluirEnderecoUseCase = new ExcluirEnderecoUseCase(enderecoRepository);
  const consultarEnderecoUseCase = new ConsultarEnderecoUseCase(
    enderecoRepository,
  );

  fastify.decorateRequest('enderecoUseCases', {
    getter() {
      return {
        criar: criarEnderecoUseCase,
        atualizar: atualizarEnderecoUseCase,
        excluir: excluirEnderecoUseCase,
        consultar: consultarEnderecoUseCase,
      };
    },
  });
});
