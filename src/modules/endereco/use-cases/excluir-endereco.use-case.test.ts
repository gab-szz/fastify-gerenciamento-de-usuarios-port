import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { IEnderecoRepository } from '../infra/endereco.repository.js';
import { ExcluirEnderecoUseCase } from './excluir-endereco.use-case.js';
import { Endereco } from '../domain/endereco.domain.js';

describe('ExcluirEnderecoUseCase', () => {
  let mockRepository: IEnderecoRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository = {
      inserir: vi.fn(),
      consultarTodos: vi.fn(),
      consultarPorId: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };
  });

  test('Deve excluir um endereço com sucesso', async () => {
    // ARRANGE
    const useCase = new ExcluirEnderecoUseCase(mockRepository as any);
    const enderecoAtivo = Endereco.hidratar({
      id: 1,
      rua: 'Rua A',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01000-000',
    });
    const enderecoExcluido = Endereco.hidratar({
      id: 1,
      rua: 'Rua A',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01000-000',
      excluidoEm: new Date(),
    });

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(enderecoAtivo);
    vi.mocked(mockRepository.atualizar).mockResolvedValue(enderecoExcluido);

    // ACT
    const saida = await useCase.executar(1);

    // ASSERT
    expect(saida).toBeInstanceOf(Endereco);
    expect(saida?.excluidoEm).toBeInstanceOf(Date);
    expect(mockRepository.consultarPorId).toHaveBeenCalledWith(1);
    expect(mockRepository.atualizar).toHaveBeenCalledOnce();
  });

  test('Deve lançar erro quando endereço não existir', async () => {
    // ARRANGE
    const useCase = new ExcluirEnderecoUseCase(mockRepository as any);
    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    // ACT & ASSERT
    await expect(useCase.executar(999)).rejects.toThrow('Not Exists');
  });
});
