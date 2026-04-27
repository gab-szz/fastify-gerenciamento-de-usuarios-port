import { describe, expect, test, vi } from 'vitest';
import { UsuarioController } from './usuario.controller.js';

// Helper para criar mock de usuário
function criarMockUsuario(overrides: any = {}) {
  return {
    id: 1,
    nome: 'João Silva',
    login: 'joao@email.com',
    perfilId: 1,
    setorId: 1,
    ativo: true,
    dataCriacao: new Date(),
    dataAtualizacao: undefined,
    dataExclusao: undefined,
    ...overrides,
  };
}

// Helper para criar mock de reply
function criarMockReply() {
  return {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  } as any;
}

// Helper para criar mock de request
function criarMockRequest(overrides: any = {}) {
  return {
    body: {},
    params: {},
    query: {},
    ...overrides,
  } as any;
}

describe('UsuarioController', () => {
  test('Deve criar um usuário com sucesso', async () => {
    // ARRANGE
    const mockUsuario = criarMockUsuario();
    const mockCriarUseCase = { exec: vi.fn().mockResolvedValue(mockUsuario) };

    const controller = new UsuarioController();
    (controller as any).criarUseCase = mockCriarUseCase;

    const request = criarMockRequest({
      body: {
        nome: 'João Silva',
        login: 'joao@email.com',
        senha: 'Senha@123',
        perfilId: 1,
        setorId: 1,
      },
    });
    const reply = criarMockReply();

    // ACT
    await controller.criar(request, reply);

    // ASSERT
    expect(mockCriarUseCase.exec).toHaveBeenCalledWith({
      nome: 'João Silva',
      login: 'joao@email.com',
      senha: 'Senha@123',
      perfilId: 1,
      setorId: 1,
    });
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith(mockUsuario);
  });

  test('Deve consultar todos os usuários com sucesso', async () => {
    // ARRANGE
    const mockUsuarios = [
      criarMockUsuario(),
      criarMockUsuario({
        id: 2,
        nome: 'Maria Santos',
        login: 'maria@email.com',
      }),
    ];
    const mockConsultarUseCase = {
      todos: vi.fn().mockResolvedValue(mockUsuarios),
    };

    const controller = new UsuarioController();
    (controller as any).consultarUseCase = mockConsultarUseCase;

    const request = criarMockRequest();
    const reply = criarMockReply();

    // ACT
    await controller.consultarTodos(request, reply);

    // ASSERT
    expect(mockConsultarUseCase.todos).toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockUsuarios);
  });

  test('Deve consultar um usuário por ID com sucesso', async () => {
    // ARRANGE
    const mockUsuario = criarMockUsuario();
    const mockConsultarUseCase = {
      porId: vi.fn().mockResolvedValue(mockUsuario),
    };

    const controller = new UsuarioController();
    (controller as any).consultarUseCase = mockConsultarUseCase;

    const request = criarMockRequest({
      params: { id: 1 },
    });
    const reply = criarMockReply();

    // ACT
    await controller.consultarPorId(request, reply);

    // ASSERT
    expect(mockConsultarUseCase.porId).toHaveBeenCalledWith(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockUsuario);
  });

  test('Deve retornar 404 quando usuário não for encontrado por ID', async () => {
    // ARRANGE
    const mockConsultarUseCase = { porId: vi.fn().mockResolvedValue(null) };

    const controller = new UsuarioController();
    (controller as any).consultarUseCase = mockConsultarUseCase;

    const request = criarMockRequest({
      params: { id: 999 },
    });
    const reply = criarMockReply();

    // ACT
    await controller.consultarPorId(request, reply);

    // ASSERT
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith({
      message: 'Usuário não encontrado',
    });
  });

  test('Deve atualizar um usuário com sucesso', async () => {
    // ARRANGE
    const mockUsuario = criarMockUsuario({
      nome: 'João Santos',
      login: 'joao.santos@email.com',
      dataAtualizacao: new Date(),
    });
    const mockAtualizarUseCase = {
      exec: vi.fn().mockResolvedValue(mockUsuario),
    };

    const controller = new UsuarioController();
    (controller as any).atualizarUseCase = mockAtualizarUseCase;

    const request = criarMockRequest({
      params: { id: 1 },
      body: {
        nome: 'João Santos',
        login: 'joao.santos@email.com',
        perfilId: 1,
        setorId: 1,
      },
    });
    const reply = criarMockReply();

    // ACT
    await controller.atualizar(request, reply);

    // ASSERT
    expect(mockAtualizarUseCase.exec).toHaveBeenCalledWith({
      id: 1,
      nome: 'João Santos',
      login: 'joao.santos@email.com',
      perfilId: 1,
      setorId: 1,
    });
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockUsuario);
  });

  test('Deve excluir um usuário com sucesso', async () => {
    // ARRANGE
    const mockUsuario = criarMockUsuario({
      ativo: false,
      dataExclusao: new Date(),
    });
    const mockExcluirUseCase = { exec: vi.fn().mockResolvedValue(mockUsuario) };

    const controller = new UsuarioController();
    (controller as any).excluirUseCase = mockExcluirUseCase;

    const request = criarMockRequest({
      params: { id: 1 },
    });
    const reply = criarMockReply();

    // ACT
    await controller.excluir(request, reply);

    // ASSERT
    expect(mockExcluirUseCase.exec).toHaveBeenCalledWith(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockUsuario);
  });
});
