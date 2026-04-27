import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ConsultarUsuarioUseCase } from './consultar-usuario.use-case.js';
import { Usuario } from '../domain/usuario.domain.js';
import type { IUsuarioRepository } from '../infra/usuario.repository.interface.js';

describe('ConsultarUsuarioUseCase', () => {
  let mockRepository: IUsuarioRepository;
  let useCase: ConsultarUsuarioUseCase;

  const usuarioHidratado = (overrides: any = {}) =>
    Usuario.hidratar({
      id: 1,
      nome: 'João Silva',
      login: 'joao@email.com',
      senha: 'Senha@123',
      perfilId: 1,
      setorId: 1,
      ativo: true,
      dataCriacao: new Date(),
      ...overrides,
    });

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository = {
      inserir: vi.fn(),
      atualizar: vi.fn(),
      consultarTodos: vi.fn(),
      consultarPorId: vi.fn(),
      consultarPorLogin: vi.fn(),
    };

    useCase = new ConsultarUsuarioUseCase(mockRepository);
  });

  describe('todos', () => {
    test('Deve consultar todos os usuários com sucesso', async () => {
      // ARRANGE
      vi.mocked(mockRepository.consultarTodos).mockResolvedValue([
        usuarioHidratado({ id: 1, nome: 'João Silva' }),
        usuarioHidratado({
          id: 2,
          nome: 'Maria Santos',
          login: 'maria@email.com',
        }),
      ]);

      // ACT
      const saida = await useCase.todos();

      // ASSERT
      expect(saida).toHaveLength(2);
      expect(saida[0]).toBeInstanceOf(Usuario);
      expect(mockRepository.consultarTodos).toHaveBeenCalledTimes(1);
    });

    test('Deve retornar lista vazia quando não houver usuários', async () => {
      // ARRANGE
      vi.mocked(mockRepository.consultarTodos).mockResolvedValue([]);

      // ACT
      const saida = await useCase.todos();

      // ASSERT
      expect(saida).toHaveLength(0);
      expect(mockRepository.consultarTodos).toHaveBeenCalledTimes(1);
    });
  });

  describe('porId', () => {
    test('Deve consultar um usuário por ID com sucesso', async () => {
      // ARRANGE
      vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
        usuarioHidratado({ id: 1 }),
      );

      // ACT
      const saida = await useCase.porId(1);

      // ASSERT
      expect(saida).toBeInstanceOf(Usuario);
      expect(saida?.id).toBe(1);
      expect(mockRepository.consultarPorId).toHaveBeenCalledWith(1);
    });

    test('Deve retornar null quando usuário não existir', async () => {
      // ARRANGE
      vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

      // ACT
      const saida = await useCase.porId(999);

      // ASSERT
      expect(saida).toBeNull();
      expect(mockRepository.consultarPorId).toHaveBeenCalledWith(999);
    });
  });

  describe('porLogin', () => {
    test('Deve consultar um usuário por login com sucesso', async () => {
      // ARRANGE
      vi.mocked(mockRepository.consultarPorLogin).mockResolvedValue(
        usuarioHidratado({ login: 'joao@email.com' }),
      );

      // ACT
      const saida = await useCase.porLogin('joao@email.com');

      // ASSERT
      expect(saida).toBeInstanceOf(Usuario);
      expect(saida?.login).toBe('joao@email.com');
      expect(mockRepository.consultarPorLogin).toHaveBeenCalledWith(
        'joao@email.com',
      );
    });

    test('Deve retornar null quando login não existir', async () => {
      // ARRANGE
      vi.mocked(mockRepository.consultarPorLogin).mockResolvedValue(null);

      // ACT
      const saida = await useCase.porLogin('naoexiste@email.com');

      // ASSERT
      expect(saida).toBeNull();
      expect(mockRepository.consultarPorLogin).toHaveBeenCalledWith(
        'naoexiste@email.com',
      );
    });
  });
});
