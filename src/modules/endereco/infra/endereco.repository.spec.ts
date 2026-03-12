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
});
