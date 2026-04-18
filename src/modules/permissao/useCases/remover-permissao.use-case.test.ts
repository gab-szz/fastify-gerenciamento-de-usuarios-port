import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import { RemoverPermissaoUseCase } from './remover-permissao.use-case.js';
import { PermissaoRepository } from '../infra/permissao.repository.js';
import { Permissao } from '../domain/permissao.domain.js';
import type { IPermissaoRepository } from '../infra/permissao.repository.interface.js';

describe('RemoverPermissaoUseCase', () => {
  let mockRepository: IPermissaoRepository;
  let useCase: RemoverPermissaoUseCase;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockRepository = {
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      consultarTodas: vi.fn(),
      salvar: vi.fn(),
      remover: vi.fn(),
    };

    useCase = await configureServiceTest({
      service: RemoverPermissaoUseCase,
      mocks: [
        { provide: PermissaoRepository, useValue: mockRepository as never },
      ],
    });
  });

  test('Deve remover uma permissão com sucesso', async () => {
    // ARRANGE
    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
      Permissao.hidratar({
        id: 1,
        nome: 'CRIAR_USUARIO',
        criadoEm: new Date(),
      }),
    );
    vi.mocked(mockRepository.remover).mockResolvedValue(true);

    // ACT
    const saida = await useCase.exec(1);

    // ASSERT
    expect(saida).toBe(true);
    expect(mockRepository.consultarPorId).toHaveBeenCalledWith(1);
    expect(mockRepository.remover).toHaveBeenCalledWith(1);
  });

  test('Deve lançar erro quando permissão não for encontrada', async () => {
    // ARRANGE
    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    // ACT & ASSERT
    await expect(useCase.exec(99)).rejects.toThrow(
      'Não foi encontrada uma permissão com id 99',
    );
    expect(mockRepository.remover).not.toHaveBeenCalled();
  });
});
