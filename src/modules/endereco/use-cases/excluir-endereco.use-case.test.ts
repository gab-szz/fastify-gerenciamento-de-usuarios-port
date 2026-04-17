import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import { EnderecoRepository } from '../infra/endereco.repository.js';
import { ExcluirEnderecoUseCase } from './excluir-endereco.use-case.js';
import { Endereco } from '../domain/endereco.domain.js';
import type { IEnderecoRepository } from '../infra/endereco.repository.interface.js';

describe('ExcluirEnderecoUseCase', () => {
  let mockRepository: IEnderecoRepository;
  let useCase: ExcluirEnderecoUseCase;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockRepository = {
      inserir: vi.fn(),
      consultarTodos: vi.fn(),
      consultarPorId: vi.fn(),
      atualizar: vi.fn(),
      remover: vi.fn(),
    };

    useCase = await configureServiceTest({
      service: ExcluirEnderecoUseCase,
      mocks: [
        { provide: EnderecoRepository, useValue: mockRepository as never },
      ],
    });
  });

  test('Deve excluir um endereço com sucesso', async () => {
    // ARRANGE
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
    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    // ACT & ASSERT
    await expect(useCase.executar(999)).rejects.toThrow('Not Exists');
  });
});
