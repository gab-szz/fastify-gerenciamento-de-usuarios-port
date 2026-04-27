import { beforeEach, describe, expect, test, vi } from 'vitest';
import { UsuarioRepository } from './usuario.repository.js';
import { Usuario } from '../domain/usuario.domain.js';
import type { Repository } from 'typeorm';
import type { UsuarioEntity } from './usuario.entity.js';

describe('UsuarioRepository', () => {
  let usuarioRepository: UsuarioRepository;
  let mockTypeorm: any;

  const entityMock = (overrides: any = {}): UsuarioEntity => ({
    id: 1,
    nome: 'João Silva',
    login: 'joao@email.com',
    senha: 'Senha@123',
    perfilId: 1,
    setorId: 1,
    enderecos: [],
    ativo: true,
    dataCriacao: new Date(),
    dataNascimento: undefined as any,
    dataAtualizacao: undefined as any,
    dataExclusao: undefined,
    perfil: undefined as any,
    setor: undefined as any,
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();

    mockTypeorm = {
      save: vi.fn(),
      create: vi.fn(),
      findOneBy: vi.fn(),
      find: vi.fn(),
    };

    usuarioRepository = new UsuarioRepository(
      mockTypeorm as Repository<UsuarioEntity>,
    );
  });

  describe('inserir', () => {
    test('Deve inserir um usuário com sucesso', async () => {
      // ARRANGE
      const entrada = Usuario.hidratar({
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        perfilId: 1,
        setorId: 1,
        ativo: true,
        dataCriacao: new Date(),
      });

      mockTypeorm.create.mockReturnValue(entityMock());
      mockTypeorm.save.mockResolvedValue(entityMock({ id: 1 }));

      // ACT
      const saida = await usuarioRepository.inserir(entrada);

      // ASSERT
      expect(saida).toBeInstanceOf(Usuario);
      expect(saida.nome).toBe('João Silva');
      expect(saida.id).toBe(1);
      expect(mockTypeorm.save).toHaveBeenCalledOnce();
    });
  });

  describe('atualizar', () => {
    test('Deve atualizar um usuário com sucesso', async () => {
      // ARRANGE
      const entrada = Usuario.hidratar({
        id: 1,
        nome: 'João Santos',
        login: 'joao.santos@email.com',
        senha: 'Senha@123',
        perfilId: 2,
        setorId: 2,
        ativo: true,
        dataCriacao: new Date(2026, 0, 1),
        dataAtualizacao: new Date(),
      });

      const entityAtualizada = entityMock({
        nome: 'João Santos',
        login: 'joao.santos@email.com',
        dataAtualizacao: new Date(),
      });

      mockTypeorm.create.mockReturnValue(entityAtualizada);
      mockTypeorm.save.mockResolvedValue(entityAtualizada);

      // ACT
      const saida = await usuarioRepository.atualizar(entrada);

      // ASSERT
      expect(saida).toBeInstanceOf(Usuario);
      expect(saida.nome).toBe('João Santos');
      expect(mockTypeorm.save).toHaveBeenCalledOnce();
    });
  });

  describe('consultarTodos', () => {
    test('Deve retornar uma lista de usuários', async () => {
      // ARRANGE
      mockTypeorm.find.mockResolvedValue([
        entityMock({ id: 1, nome: 'João Silva' }),
        entityMock({ id: 2, nome: 'Maria Santos', login: 'maria@email.com' }),
      ]);

      // ACT
      const saida = await usuarioRepository.consultarTodos();

      // ASSERT
      expect(saida).toHaveLength(2);
      expect(saida[0]).toBeInstanceOf(Usuario);
      expect(saida[0]!.nome).toBe('João Silva');
      expect(saida[1]!.nome).toBe('Maria Santos');
      expect(mockTypeorm.find).toHaveBeenCalledOnce();
    });

    test('Deve retornar lista vazia quando não houver usuários', async () => {
      // ARRANGE
      mockTypeorm.find.mockResolvedValue([]);

      // ACT
      const saida = await usuarioRepository.consultarTodos();

      // ASSERT
      expect(saida).toHaveLength(0);
      expect(mockTypeorm.find).toHaveBeenCalledOnce();
    });
  });

  describe('consultarPorId', () => {
    test('Deve retornar um Usuario quando encontrado', async () => {
      // ARRANGE
      const entrada = 1;

      mockTypeorm.findOneBy.mockResolvedValue(entityMock({ id: 1 }));

      // ACT
      const saida = await usuarioRepository.consultarPorId(entrada);

      // ASSERT
      expect(saida).toBeInstanceOf(Usuario);
      expect(saida?.nome).toBe('João Silva');
      expect(saida?.id).toBe(1);
      expect(mockTypeorm.findOneBy).toHaveBeenCalledWith({ id: entrada });
    });

    test('Deve retornar null quando usuário não existe', async () => {
      // ARRANGE
      const entrada = 999;

      mockTypeorm.findOneBy.mockResolvedValue(null);

      // ACT
      const saida = await usuarioRepository.consultarPorId(entrada);

      // ASSERT
      expect(saida).toBeNull();
      expect(mockTypeorm.findOneBy).toHaveBeenCalledWith({ id: entrada });
    });

    test('Deve lançar erro se o repository falhar', async () => {
      // ARRANGE
      mockTypeorm.findOneBy.mockRejectedValue(
        new Error('Erro de conexão com banco'),
      );

      // ACT & ASSERT
      await expect(usuarioRepository.consultarPorId(1)).rejects.toThrow(
        'Erro de conexão com banco',
      );
    });
  });

  describe('consultarPorLogin', () => {
    test('Deve retornar um Usuario quando encontrado pelo login', async () => {
      // ARRANGE
      const entrada = 'joao@email.com';

      mockTypeorm.findOneBy.mockResolvedValue(entityMock({ login: entrada }));

      // ACT
      const saida = await usuarioRepository.consultarPorLogin(entrada);

      // ASSERT
      expect(saida).toBeInstanceOf(Usuario);
      expect(saida?.login).toBe('joao@email.com');
      expect(mockTypeorm.findOneBy).toHaveBeenCalledWith({ login: entrada });
    });

    test('Deve retornar null quando login não existe', async () => {
      // ARRANGE
      const entrada = 'naoexiste@email.com';

      mockTypeorm.findOneBy.mockResolvedValue(null);

      // ACT
      const saida = await usuarioRepository.consultarPorLogin(entrada);

      // ASSERT
      expect(saida).toBeNull();
      expect(mockTypeorm.findOneBy).toHaveBeenCalledWith({ login: entrada });
    });
  });
});
