import { beforeEach, describe, expect, test, vi, type Mock } from 'vitest';
import { CriarEnderecoUseCase } from './criar-endereco.use-case.js';
import type { IEnderecoRepository } from '../infra/endereco.repository.js';
import { Endereco } from '../domain/endereco.domain.js';

describe('CriarEnderecoUseCase', () => {
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

  test('Deve criar um endereço com sucesso', async () => {
    // ARRANGE
    const input = {
      rua: 'Baio',
      numero: '59',
      bairro: 'Jardim Jockey Club',
      cidade: 'Cuiabá',
      estado: 'MT',
      cep: '78090756',
      complemento: 'Perto da casa de container',
    };
    const criarEnderecoUseCase = new CriarEnderecoUseCase(mockRepository);

    const enderecoEsperado = Endereco.hidratar({ ...input, id: 1 });
    (mockRepository.inserir as Mock).mockResolvedValue(enderecoEsperado);

    // ACT
    const retorno = await criarEnderecoUseCase.executar(input);

    // ASSERT
    expect(retorno).toBeInstanceOf(Endereco);
    expect(retorno.id).toBe(1);
    expect(retorno.rua).toBe(input.rua);
    expect(retorno.numero).toBe(input.numero);
    expect(retorno.bairro).toBe(input.bairro);
    expect(retorno.cidade).toBe(input.cidade);
    expect(retorno.estado).toBe(input.estado);
    expect(retorno.cep).toBe(input.cep);
    expect(retorno.complemento).toBe(input.complemento);
    expect(mockRepository.inserir).toHaveBeenCalledOnce();
    expect(mockRepository.inserir).toHaveBeenCalledWith(expect.any(Endereco));
  });
});
