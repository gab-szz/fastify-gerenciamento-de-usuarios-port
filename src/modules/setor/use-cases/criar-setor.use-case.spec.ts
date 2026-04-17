import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import type { ISetorRepository } from '../infra/setor.repository.interface.js';
import { SetorRepository } from '../infra/setor.repository.js';
import { CriarSetorUseCase } from './criar-setor.use-case.js';
import { Setor } from '../domain/setor.domain.js';

describe('CriarSetorUseCase', () => {
  let mockRepository: ISetorRepository;
  let useCase: CriarSetorUseCase;

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
      service: CriarSetorUseCase,
      mocks: [{ provide: SetorRepository, useValue: mockRepository as never }],
    });
  });

  test('Deve criar um setor com sucesso', async () => {
    //ARRANGE
    const entrada = { nome: 'Tecnologia da Informação' };

    vi.mocked(mockRepository.consultarPorNome).mockResolvedValue(null);
    vi.mocked(mockRepository.inserir).mockResolvedValue(
      Setor.hidratar({
        id: 1,
        nome: 'Tecnologia da Informação',
      }),
    );

    //ACT
    const saida = await useCase.executar(entrada);

    //ASSERT
    expect(saida).toBeInstanceOf(Setor);
    expect(saida.nome).toBe('Tecnologia da Informação');
    expect(saida.id).toBe(1);
  });

  test('Deve retornar erro ao criar um setor com nome já existente', async () => {
    //ARRANGE
    const entrada = { nome: 'Tecnologia da Informação' };

    vi.mocked(mockRepository.consultarPorNome).mockResolvedValue({
      nome: 'Tecnologia da Informação',
    } as Setor);

    //ACT & ASSERT
    await expect(useCase.executar(entrada)).rejects.toThrow('Already exists');
  });
});
