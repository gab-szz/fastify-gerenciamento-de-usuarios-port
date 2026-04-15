import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { ISetorRepository } from '../infra/setor.repository.js';
import { AtualizarSetorUseCase } from './atualizar-setor.use-case.js';
import { Setor } from '../domain/setor.domain.js';

describe('group', () => {
  let mockRepository: ISetorRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository = {
      inserir: vi.fn(),
      consultarPorId: vi.fn(),
      consultarPorNome: vi.fn(),
      consultarTodos: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };
  });

  test('Deve atualizar um setor com sucesso', async () => {
    //ARRANGE
    const entrada = { id: 1, nome: 'Recursos Humanos' };
    const useCase = new AtualizarSetorUseCase(mockRepository);

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
      Setor.hidratar({
        id: 1,
        nome: 'Recursos Humanos',
      }),
    );
    vi.mocked(mockRepository.atualizar).mockResolvedValue(
      Setor.hidratar({
        id: 1,
        nome: 'Tecnologia da Informação',
      }),
    );

    //ACT
    const saida = await useCase.executar(entrada);

    //ASSERT
    expect(saida).toBeInstanceOf(Setor);
    expect(saida!.nome).toBe('Tecnologia da Informação');
    expect(saida!.id).toBe(1);
  });

  test('Deve dar erro quando setor não existir', async () => {
    //ARRANGE
    const entrada = { id: 1, nome: 'Recursos Humanos' };
    const useCase = new AtualizarSetorUseCase(mockRepository);

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    //ACT & ASSERT
    await expect(useCase.executar(entrada)).rejects.toThrow('Not exists');
  });
});
