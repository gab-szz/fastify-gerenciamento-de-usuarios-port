import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import type { IUsuarioRepository } from '../infra/usuario.repository.interface.js';
import { UsuarioRepository } from '../infra/usuario.repository.js';
import { ExcluirUsuarioUseCase } from './excluir-usuario.use-case.js';
import { Usuario } from '../domain/usuario.domain.js';

describe('ExcluirUsuarioUseCase', () => {
  let mockRepository: IUsuarioRepository;
  let useCase: ExcluirUsuarioUseCase;

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

  beforeEach(async () => {
    vi.clearAllMocks();

    mockRepository = {
      inserir: vi.fn(),
      atualizar: vi.fn(),
      consultarTodos: vi.fn(),
      consultarPorId: vi.fn(),
      consultarPorLogin: vi.fn(),
    };

    useCase = await configureServiceTest({
      service: ExcluirUsuarioUseCase,
      mocks: [
        { provide: UsuarioRepository, useValue: mockRepository as never },
      ],
    });
  });

  test('Deve excluir um usuário com sucesso (soft delete)', async () => {
    // ARRANGE
    const inputId = 1;

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
      usuarioHidratado({ ativo: true }),
    );
    vi.mocked(mockRepository.atualizar).mockResolvedValue(
      usuarioHidratado({ ativo: false, dataExclusao: new Date() }),
    );

    // ACT
    const saida = await useCase.exec(inputId);

    // ASSERT
    expect(saida).toBeInstanceOf(Usuario);
    expect(saida.ativo).toBe(false);
    expect(saida.dataExclusao).toBeDefined();
  });

  test('Deve dar erro quando usuário não existir', async () => {
    // ARRANGE
    const inputId = 999;

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    // ACT & ASSERT
    await expect(useCase.exec(inputId)).rejects.toThrow(
      'Usuario com ID 999 nao encontrado',
    );
  });
});
