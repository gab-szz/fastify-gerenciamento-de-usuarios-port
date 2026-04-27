import { beforeEach, describe, expect, test, vi } from 'vitest';
import { configureServiceTest } from 'fastify-decorators/testing';
import type { IUsuarioRepository } from '../infra/usuario.repository.interface.js';
import { UsuarioRepository } from '../infra/usuario.repository.js';
import { AtualizarUsuarioUseCase } from './atualizar-usuario.use-case.js';
import { Usuario } from '../domain/usuario.domain.js';

describe('AtualizarUsuarioUseCase', () => {
  let mockRepository: IUsuarioRepository;
  let useCase: AtualizarUsuarioUseCase;

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
      service: AtualizarUsuarioUseCase,
      mocks: [
        { provide: UsuarioRepository, useValue: mockRepository as never },
      ],
    });
  });

  test('Deve atualizar um usuário com sucesso', async () => {
    // ARRANGE
    const entrada = {
      id: 1,
      nome: 'João Santos',
      login: 'joao.santos@email.com',
      perfilId: 2,
      setorId: 2,
    };

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(
      Usuario.hidratar({
        id: 1,
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        perfilId: 1,
        setorId: 1,
        ativo: true,
        dataCriacao: new Date(2026, 0, 1),
      }),
    );
    vi.mocked(mockRepository.atualizar).mockResolvedValue(
      Usuario.hidratar({
        id: 1,
        nome: 'João Santos',
        login: 'joao.santos@email.com',
        senha: 'Senha@123',
        perfilId: 2,
        setorId: 2,
        ativo: true,
        dataCriacao: new Date(2026, 0, 1),
        dataAtualizacao: new Date(),
      }),
    );

    // ACT
    const saida = await useCase.exec(entrada);

    // ASSERT
    expect(saida).toBeInstanceOf(Usuario);
    expect(saida.nome).toBe('João Santos');
    expect(saida.id).toBe(1);
  });

  test('Deve dar erro quando usuário não existir', async () => {
    // ARRANGE
    const entrada = {
      id: 999,
      nome: 'João Santos',
      login: 'joao.santos@email.com',
      perfilId: 1,
      setorId: 1,
    };

    vi.mocked(mockRepository.consultarPorId).mockResolvedValue(null);

    // ACT & ASSERT
    await expect(useCase.exec(entrada)).rejects.toThrow(
      'Usuário com ID 999 não encontrado',
    );
  });
});
