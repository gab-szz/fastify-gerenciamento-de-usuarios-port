import { beforeEach, describe, it, vi, expect } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import type { IPerfilRepository } from '../infra/perfil.repository.interface.js';
import { PerfilRepository } from '../infra/perfil.repository.js';
import { Perfil } from '../domain/perfil.domain.js';
import { ExcluirPerfilUseCase } from './excluir-perfil.use-case.js';

describe('ExcluirPerfilUseCase', () => {
  let mockRepository: IPerfilRepository;
  let excluirPerfilUseCase: ExcluirPerfilUseCase;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockRepository = {
      consultarTodos: vi.fn(),
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      inserir: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };

    excluirPerfilUseCase = await configureServiceTest({
      service: ExcluirPerfilUseCase,
      mocks: [{ provide: PerfilRepository, useValue: mockRepository as never }],
    });
  });

  it('Deve excluir com sucesso um perfil', async () => {
    // ARRANGE
    const perfilOriginal = Perfil.hidratar({
      id: 1,
      nome: 'Tecnólogo',
      criadoEm: new Date(),
    });

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(perfilOriginal);
    vi.mocked(mockRepository.atualizar).mockResolvedValue(perfilOriginal);

    // ACT
    const resultado = await excluirPerfilUseCase.exec(1);

    // ASSERT
    expect(mockRepository.consultarPorId).toHaveBeenCalledWith(1);
    expect(mockRepository.atualizar).toHaveBeenCalledWith(perfilOriginal);
    expect(resultado).toEqual(perfilOriginal);
  });

  it('Deve lançar erro quando perfil não existe', async () => {
    // ARRANGE
    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    // ACT & ASSERT
    await expect(excluirPerfilUseCase.exec(999)).rejects.toThrow(
      'Não foi encontrado um perfil com id 999',
    );
  });
});
