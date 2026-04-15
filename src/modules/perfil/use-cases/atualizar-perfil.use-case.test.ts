import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { IPerfilRepository } from '../infra/perfil.repository.js';
import { AtualizarPerfilUseCase } from './atualizar-perfil.use-case.js';
import { Perfil } from '../domain/perfil.domain.js';

describe('AtualizarPerfilUseCase', () => {
  let mockRepository: IPerfilRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository = {
      consultarTodos: vi.fn(),
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      inserir: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };
  });

  it('Deve atualizar um perfil com sucesso', async () => {
    // ARRANGE
    const input = { id: 1, nome: 'T.I.' };
    const useCase = new AtualizarPerfilUseCase(mockRepository);

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
      Perfil.hidratar({
        id: input.id,
        nome: 'Tecnólogo',
        criadoEm: new Date(),
      }),
    );
    vi.mocked(mockRepository.atualizar).mockResolvedValue(
      Perfil.hidratar({
        id: input.id,
        nome: input.nome,
        criadoEm: new Date(),
        alteradoEm: new Date(),
      }),
    );

    // ACT
    const perfil = await useCase.exec(input);

    // ASSERT
    expect(perfil).toBeInstanceOf(Perfil);
    expect(perfil!.id!).toBe(1);
    expect(perfil!.nome).toBe('T.I.');
    expect(perfil?.criadoEm).toBeInstanceOf(Date);
    expect(perfil?.alteradoEm).toBeInstanceOf(Date);
    expect(mockRepository.consultarPorId).toHaveBeenCalledOnce();
    expect(mockRepository.atualizar).toHaveBeenCalledOnce();
  });

  it('Deve dar erro quando não encontrar o id', async () => {
    // ARRANGE
    const input = { id: 999, nome: 'T.I.' };
    const useCase = new AtualizarPerfilUseCase(mockRepository);

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    // ACT & ASSERT
    await expect(useCase.exec(input)).rejects.toThrow(
      'Perfil com id 999 não encontrado.',
    );
  });
});
