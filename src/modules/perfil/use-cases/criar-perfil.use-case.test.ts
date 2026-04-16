import { beforeEach, describe, expect, it, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import type { IPerfilRepository } from '../infra/perfil.repository.interface.js';
import { PerfilRepository } from '../infra/perfil.repository.js';
import { Perfil } from '../domain/perfil.domain.js';
import { CriarPerfilUseCase } from './criar-perfil.use-case.js';

describe('CriarPerfilUseCase', () => {
  let mockRepository: IPerfilRepository;
  let useCase: CriarPerfilUseCase;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockRepository = {
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      consultarTodos: vi.fn(),
      inserir: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };

    useCase = await configureServiceTest({
      service: CriarPerfilUseCase,
      mocks: [{ provide: PerfilRepository, useValue: mockRepository as never }],
    });
  });

  it('Deve criar um perfil com sucesso', async () => {
    // ARRANGE
    const input = { nome: 'T.I.' };

    vi.mocked(mockRepository.inserir).mockResolvedValue(
      Perfil.hidratar({ id: 1, nome: input.nome, criadoEm: new Date() }),
    );

    // ACT
    const perfil = await useCase.exec(input);

    // ASSERT
    expect(perfil).toBeInstanceOf(Perfil);
    expect(perfil!.id!).toBe(1);
    expect(perfil!.nome).toBe('T.I.');
    expect(perfil?.criadoEm).toBeInstanceOf(Date);
    expect(mockRepository.inserir).toHaveBeenCalledOnce();
  });
});
