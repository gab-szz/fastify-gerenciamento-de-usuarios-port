import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { IPerfilRepository } from '../infra/perfil.repository.js';
import { Perfil } from '../domain/perfil.domain.js';
import { CriarPerfilUseCase } from './criar-perfil.use-case.js';

describe('CriarPerfilUseCase', () => {
  let mockRepository: IPerfilRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository = {
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      consultarTodos: vi.fn(),
      inserir: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };
  });

  it('Deve criar um perfil com sucesso', async () => {
    // ARRANGE
    const input = { nome: 'T.I.' };
    const useCase = new CriarPerfilUseCase(mockRepository);

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
