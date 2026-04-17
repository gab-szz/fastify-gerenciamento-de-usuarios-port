import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import { ExcluirSetorUseCase } from './excluir-setor.use-case.js';
import { SetorRepository } from '../infra/setor.repository.js';
import { Setor } from '../domain/setor.domain.js';
import type { ISetorRepository } from '../infra/setor.repository.interface.js';

describe('ExcluirSetorUseCase', () => {
  let mockRepository: ISetorRepository;
  let useCase: ExcluirSetorUseCase;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockRepository = {
      inserir: vi.fn(),
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      consultarTodos: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };

    useCase = await configureServiceTest({
      service: ExcluirSetorUseCase,
      mocks: [{ provide: SetorRepository, useValue: mockRepository as never }],
    });
  });

  test('Deve remover um setor com sucesso', async () => {
    //ARRANGE
    const inputId = 1;

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
      Setor.hidratar({
        id: 1,
        nome: 'Tecnologia da Informação',
        excluidoEm: undefined,
      }),
    );
    vi.mocked(mockRepository.atualizar).mockResolvedValue(
      Setor.hidratar({
        id: 1,
        nome: 'Tecnologia da Informação',
        excluidoEm: new Date(),
      }),
    );
    //TODO -> Mockar retorno do objeto setor com os dados (data de exclusão)

    //ACT
    const saida = await useCase.executar(inputId);

    //ASSERT
    expect(saida).toBeInstanceOf(Setor);
    expect(saida?.excluidoEm).toBeDefined();
  });

  test('Deve retornar erro: Setor já removido', async () => {
    //ARRANGE
    const inputId = 1;

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
      Setor.hidratar({
        id: 1,
        nome: 'Tecnologia da Informação',
        excluidoEm: new Date(),
      }),
    );
    vi.mocked(mockRepository.atualizar).mockResolvedValue(
      Setor.hidratar({
        id: 1,
        nome: 'Tecnologia da Informação',
        excluidoEm: new Date(),
      }),
    );
    //TODO -> Mockar retorno do objeto setor com os dados (data de exclusão)

    //ACT/ASSERT
    await expect(useCase.executar(inputId)).rejects.toThrow(
      'Erro ao remove setor: o mesmo já se encontra excluído.',
    );
  });

  test('Deve dar erro quando setor não existir', async () => {
    //ARRANGE
    const entrada = 1;

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    //ACT & ASSERT
    await expect(useCase.executar(entrada)).rejects.toThrow('Not exists');
  });
});
