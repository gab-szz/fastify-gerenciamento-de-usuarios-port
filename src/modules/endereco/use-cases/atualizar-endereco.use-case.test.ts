import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import { EnderecoRepository } from '../infra/endereco.repository.js';
import { Endereco } from '../domain/endereco.domain.js';
import { AtualizarEnderecoUseCase } from './atualizar-endereco.use-case.js';
import type { IEnderecoRepository } from '../infra/endereco.repository.interface.js';

describe('AtualizarEnderecoUseCase', () => {
  let mockRepository: IEnderecoRepository;
  let useCase: AtualizarEnderecoUseCase;

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
      service: AtualizarEnderecoUseCase,
      mocks: [
        { provide: EnderecoRepository, useValue: mockRepository as never },
      ],
    });
  });

  test('Deve atualizar um endereço com sucesso', async () => {
    // ARRANGE
    const input = {
      id: 1,
      rua: 'Baio',
      numero: '59',
      bairro: 'Jardim Jockey Club',
      cidade: 'Cuiabá',
      estado: 'MT',
      cep: '78090756',
      complemento: 'Perto da casa de container',
    };
    const enderecoEsperado = Endereco.hidratar({ ...input, id: 1 });
    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
      enderecoEsperado,
    );
    vi.mocked(mockRepository.atualizar).mockResolvedValue(enderecoEsperado);

    // ACT
    const retorno = await useCase.executar(input);

    // ASSERT
    expect(retorno).toBeInstanceOf(Endereco);
    expect(retorno!.id).toBe(1);
    expect(retorno!.rua).toBe(input.rua);
    expect(retorno!.numero).toBe(input.numero);
    expect(retorno!.bairro).toBe(input.bairro);
    expect(retorno!.cidade).toBe(input.cidade);
    expect(retorno!.estado).toBe(input.estado);
    expect(retorno!.cep).toBe(input.cep);
    expect(retorno!.complemento).toBe(input.complemento);
    expect(mockRepository.atualizar).toHaveBeenCalledOnce();
    expect(mockRepository.atualizar).toHaveBeenCalledWith(expect.any(Endereco));
  });

  test('Deve dar erro quando não encontrar o ID', async () => {
    // ARRANGE
    const input = {
      id: 999,
      rua: 'Baio',
      numero: '59',
      bairro: 'Jardim Jockey Club',
      cidade: 'Cuiabá',
      estado: 'MT',
      cep: '78090756',
      complemento: 'Perto da casa de container',
    };

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    // ACT
    await expect(useCase.executar(input)).rejects.toThrow(
      'Endereço com ID 999 não encontrado',
    );

    // ASSERT
  });
});
