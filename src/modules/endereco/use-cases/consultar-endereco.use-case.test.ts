import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import { EnderecoRepository } from '../infra/endereco.repository.js';
import { ConsultarEnderecoUseCase } from './consultar-endereco.use-case.js';
import { Endereco } from '../domain/endereco.domain.js';
import type { IEnderecoRepository } from '../infra/endereco.repository.interface.js';

describe('ConsultarEnderecoUseCase', () => {
  let mockRepository: IEnderecoRepository;
  let useCase: ConsultarEnderecoUseCase;

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
      service: ConsultarEnderecoUseCase,
      mocks: [
        { provide: EnderecoRepository, useValue: mockRepository as never },
      ],
    });
  });

  describe('porId', () => {
    test('Deve retornar um endereço pelo ID com sucesso', async () => {
      // ARRANGE
      const enderecoEsperado = Endereco.hidratar({
        id: 1,
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
      });
      vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
        enderecoEsperado,
      );

      // ACT
      const saida = await useCase.porId(1);

      // ASSERT
      expect(saida).toBeInstanceOf(Endereco);
      expect(saida?.id).toBe(1);
      expect(mockRepository.consultarPorId).toHaveBeenCalledWith(1);
    });

    test('Deve retornar null quando endereço não existir', async () => {
      // ARRANGE
      vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

      // ACT
      const saida = await useCase.porId(999);

      // ASSERT
      expect(saida).toBeNull();
    });
  });

  describe('todos', () => {
    test('Deve retornar todos os endereços', async () => {
      // ARRANGE
      const endereco1 = Endereco.hidratar({
        id: 1,
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
      });
      const endereco2 = Endereco.hidratar({
        id: 2,
        rua: 'Rua B',
        numero: '456',
        bairro: 'Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01310-100',
      });
      vi.mocked(mockRepository.consultarTodos).mockResolvedValue([
        endereco1,
        endereco2,
      ]);

      // ACT
      const saida = await useCase.todos();

      // ASSERT
      expect(saida).toHaveLength(2);
      expect(saida[0]).toBeInstanceOf(Endereco);
      expect(mockRepository.consultarTodos).toHaveBeenCalledOnce();
    });

    test('Deve retornar lista vazia quando não houver endereços', async () => {
      // ARRANGE
      vi.mocked(mockRepository.consultarTodos).mockResolvedValue([]);

      // ACT
      const saida = await useCase.todos();

      // ASSERT
      expect(saida).toHaveLength(0);
    });
  });
});
