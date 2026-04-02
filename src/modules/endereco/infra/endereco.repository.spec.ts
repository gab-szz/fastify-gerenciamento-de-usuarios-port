import { beforeEach, describe, expect, test, vi } from 'vitest';
import { EnderecoRepository } from './endereco.repository.js';
import type { Repository } from 'typeorm';
import type { EnderecoEntity } from './endereco.entity.js';
import { Endereco } from '../domain/endereco.domain.js';

describe('EnderecoRepository', () => {
  let enderecoRepository: EnderecoRepository;
  let mockTypeorm: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockTypeorm = {
      save: vi.fn(),
      findOneBy: vi.fn(),
      delete: vi.fn(),
    };

    enderecoRepository = new EnderecoRepository(
      mockTypeorm as Repository<EnderecoEntity>,
    );
  });

  describe('inserir', () => {
    test('Deve inserir um endereço com sucesso', async () => {
      // ARRANGE
      const entrada = Endereco.criar({
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        complemento: 'Apto 101',
      });

      const dataCriacao = new Date();

      // Mock retorna uma EnderecoEntity (objeto plano), não um Endereco (domínio)
      mockTypeorm.save.mockResolvedValue({
        id: 1,
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        complemento: 'Apto 101',
        criadoEm: dataCriacao,
        alteradoEm: undefined,
        excluidoEm: undefined,
      });

      //ACT
      const resultado = await enderecoRepository.inserir(entrada);

      //ASSERT
      expect(resultado).toBeInstanceOf(Endereco);
      expect(resultado.id).toBe(1);
      expect(resultado.rua).toBe('Rua A');
      expect(resultado.numero).toBe('123');
      expect(resultado.bairro).toBe('Centro');
      expect(resultado.cidade).toBe('São Paulo');
      expect(resultado.estado).toBe('SP');
      expect(resultado.cep).toBe('01000-000');
      expect(resultado.complemento).toBe('Apto 101');
      expect(resultado.criadoEm).toEqual(dataCriacao);
      expect(resultado.alteradoEm).toBeUndefined();
      expect(resultado.excluidoEm).toBeUndefined();
      expect(mockTypeorm.save).toHaveBeenCalledOnce();
    });
  });

  describe('consultarTodos', () => {
    test('Deve retornar uma lista de endereços', async () => {
      //ARRANGE
      mockTypeorm.find = vi.fn();
      mockTypeorm.find.mockResolvedValue([
        {
          id: 1,
          rua: 'Rua A',
          numero: '123',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01000-000',
          complemento: 'Apto 101',
          criadoEm: new Date(),
          alteradoEm: undefined,
          excluidoEm: undefined,
        },
      ]);

      //ACT
      const saida = await enderecoRepository.consultarTodos();

      //ASSERT
      expect(saida).toHaveLength(1);
      expect(saida[0]).toBeInstanceOf(Endereco);
      expect(saida[0]!.id).toBe(1);
      expect(saida[0]!.rua).toBe('Rua A');
      expect(saida[0]!.numero).toBe('123');
      expect(saida[0]!.bairro).toBe('Centro');
      expect(saida[0]!.cidade).toBe('São Paulo');
      expect(saida[0]!.estado).toBe('SP');
      expect(saida[0]!.cep).toBe('01000-000');
      expect(saida[0]!.complemento).toBe('Apto 101');
      expect(saida[0]!.alteradoEm).toBeUndefined();
      expect(saida[0]!.excluidoEm).toBeUndefined();
    });

    test('Deve retornar um endereço pelo ID', async () => {
      //ARRANGE
      const inputId = 1;
      mockTypeorm.findOneBy.mockResolvedValue({
        id: 1,
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        complemento: 'Apto 101',
        criadoEm: new Date(),
        alteradoEm: undefined,
        excluidoEm: undefined,
      });

      //ACT
      const saida = await enderecoRepository.consultarPorId(inputId);

      //ASSERT
      expect(saida).toBeInstanceOf(Endereco);
      expect(saida!.id).toBe(1);
      expect(saida!.rua).toBe('Rua A');
      expect(saida!.numero).toBe('123');
      expect(saida!.bairro).toBe('Centro');
      expect(saida!.cidade).toBe('São Paulo');
      expect(saida!.estado).toBe('SP');
      expect(saida!.cep).toBe('01000-000');
      expect(saida!.complemento).toBe('Apto 101');
      expect(saida!.alteradoEm).toBeUndefined();
      expect(saida!.excluidoEm).toBeUndefined();
    });

    test('Deve retornar null quando endereço não existir', async () => {
      //ARRANGE
      const inputId = 999;
      mockTypeorm.findOneBy.mockResolvedValue(null);

      //ACT
      const saida = await enderecoRepository.consultarPorId(inputId);

      //ASSERT
      expect(saida).toBeNull();
      expect(mockTypeorm.findOneBy).toHaveBeenCalledWith({ id: inputId });
    });
  });

  describe('atualizar', () => {
    test('Deve atualizar setor', async () => {
      //ARRANGE
      const input = Endereco.hidratar({
        id: 1,
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        complemento: 'Apto 101',
        criadoEm: new Date(2026, 1, 23),
        alteradoEm: undefined,
        excluidoEm: undefined,
      });

      mockTypeorm.save.mockResolvedValue({
        id: 1,
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        complemento: 'Apto 101',
        criadoEm: new Date(2026, 1, 23),
        alteradoEm: new Date(),
        excluidoEm: undefined,
      });

      //ACT
      const saida = await enderecoRepository.atualizar(input);

      //ASSERT
      expect(saida).toBeInstanceOf(Endereco);
      expect(saida!.id).toBe(1);
      expect(saida!.rua).toBe('Rua A');
      expect(saida!.numero).toBe('123');
      expect(saida!.bairro).toBe('Centro');
      expect(saida!.cidade).toBe('São Paulo');
      expect(saida!.estado).toBe('SP');
      expect(saida!.cep).toBe('01000-000');
      expect(saida!.complemento).toBe('Apto 101');
      expect(saida!.criadoEm).toEqual(new Date(2026, 1, 23));
      expect(saida!.alteradoEm).toBeInstanceOf(Date);
      expect(saida!.excluidoEm).toBeUndefined();
      expect(mockTypeorm.save).toHaveBeenCalledOnce();
    });
  });

  describe('remover', () => {
    test('Deve remover um endereço', async () => {
      //ARRANGE
      //ACT
      //ASSERT
    });
  });
});
