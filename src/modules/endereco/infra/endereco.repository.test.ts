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
      find: vi.fn(),
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
      vi.mocked(mockTypeorm.save).mockResolvedValue({
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
      vi.mocked(mockTypeorm.find).mockResolvedValue([
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
      vi.mocked(mockTypeorm.findOneBy).mockResolvedValue({
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
      vi.mocked(mockTypeorm.findOneBy).mockResolvedValue(null);

      //ACT
      const saida = await enderecoRepository.consultarPorId(inputId);

      //ASSERT
      expect(saida).toBeNull();
      expect(mockTypeorm.findOneBy).toHaveBeenCalledWith({ id: inputId });
    });
  });

  describe('atualizar', () => {
    test('Deve atualizar endereço', async () => {
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

      vi.mocked(mockTypeorm.save).mockResolvedValue({
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
    test('Deve remover um endereço com sucesso', async () => {
      // ARRANGE
      const endereco = Endereco.hidratar({
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

      vi.mocked(mockTypeorm.delete).mockResolvedValue({
        affected: 1,
      });

      // ACT
      const resultado = await enderecoRepository.remover(endereco);

      // ASSERT
      expect(resultado).toBe(true);
      expect(mockTypeorm.delete).toHaveBeenCalledWith(1);
      expect(mockTypeorm.delete).toHaveBeenCalledOnce();
    });

    test('Deve retornar false quando endereço não for encontrado', async () => {
      // ARRANGE
      const endereco = Endereco.hidratar({
        id: 999,
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

      vi.mocked(mockTypeorm.delete).mockResolvedValue({
        affected: 0,
      });

      // ACT
      const resultado = await enderecoRepository.remover(endereco);

      // ASSERT
      expect(resultado).toBe(false);
      expect(mockTypeorm.delete).toHaveBeenCalledWith(999);
    });
  });

  describe('consultarTodos (branches)', () => {
    test('Deve retornar lista vazia quando find retornar null', async () => {
      // ARRANGE
      vi.mocked(mockTypeorm.find).mockResolvedValue(null as any);

      // ACT
      const saida = await enderecoRepository.consultarTodos();

      // ASSERT
      expect(saida).toHaveLength(0);
    });
  });

  describe('atualizar (branches)', () => {
    test('Deve retornar null quando save retornar null', async () => {
      // ARRANGE
      const input = Endereco.hidratar({
        id: 1,
        rua: 'Rua A',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
      });
      vi.mocked(mockTypeorm.save).mockResolvedValue(null as any);

      // ACT
      const saida = await enderecoRepository.atualizar(input);

      // ASSERT
      expect(saida).toBeNull();
    });
  });
});
