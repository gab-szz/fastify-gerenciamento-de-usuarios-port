import { describe, expect, test, vi } from 'vitest';
import { SetorController } from './setor.controller.js';

// Helper para criar mock de setor
function criarMockSetor(overrides: any = {}) {
  return {
    id: 1,
    nome: 'Setor de TI',
    criadoEm: new Date(),
    alteradoEm: undefined,
    excluidoEm: undefined,
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
    setorUseCases: {
      criar: {
        executar: vi.fn(),
      },
      consultar: {
        todos: vi.fn(),
        porNome: vi.fn(),
        porId: vi.fn(),
      },
      atualizar: {
        executar: vi.fn(),
      },
      excluir: {
        executar: vi.fn(),
      },
    },
    ...overrides,
  } as any;
}

describe('SetorController', () => {
  test('Deve criar um setor com sucesso', async () => {
    // ARRANGE
    const mockSetor = criarMockSetor();

    const request = criarMockRequest({
      body: { nome: 'Setor de TI' },
      setorUseCases: {
        criar: {
          executar: vi.fn().mockResolvedValue(mockSetor),
        },
      },
    });

    const reply = criarMockReply();
    const controller = new SetorController();

    // ACT
    await controller.criar(request, reply);

    // ASSERT
    expect(request.setorUseCases.criar.executar).toHaveBeenCalledWith({
      nome: 'Setor de TI',
    });
    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith(mockSetor);
  });

  test('Deve consultar todos os setores com sucesso', async () => {
    // ARRANGE
    const mockSetores = [
      criarMockSetor(),
      criarMockSetor({ id: 2, nome: 'Setor de RH' }),
    ];

    const request = criarMockRequest({
      setorUseCases: {
        consultar: {
          todos: vi.fn().mockResolvedValue(mockSetores),
        },
      },
    });

    const reply = criarMockReply();
    const controller = new SetorController();

    // ACT
    await controller.consultar(request, reply);

    // ASSERT
    expect(request.setorUseCases.consultar.todos).toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockSetores);
  });

  test('Deve consultar setores por nome com sucesso', async () => {
    // ARRANGE
    const mockSetores = [criarMockSetor()];

    const request = criarMockRequest({
      params: { nome: 'Setor de TI' },
      setorUseCases: {
        consultar: {
          porNome: vi.fn().mockResolvedValue(mockSetores),
        },
      },
    });

    const reply = criarMockReply();
    const controller = new SetorController();

    // ACT
    await controller.consultarPorNome(request, reply);

    // ASSERT
    expect(request.setorUseCases.consultar.porNome).toHaveBeenCalledWith(
      'Setor de TI',
    );
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockSetores);
  });

  test('Deve consultar um setor por ID com sucesso', async () => {
    // ARRANGE
    const mockSetor = criarMockSetor();

    const request = criarMockRequest({
      params: { id: 1 },
      setorUseCases: {
        consultar: {
          porId: vi.fn().mockResolvedValue(mockSetor),
        },
      },
    });

    const reply = criarMockReply();
    const controller = new SetorController();

    // ACT
    await controller.consultarPorId(request, reply);

    // ASSERT
    expect(request.setorUseCases.consultar.porId).toHaveBeenCalledWith(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockSetor);
  });

  test('Deve atualizar um setor com sucesso', async () => {
    // ARRANGE
    const mockSetor = criarMockSetor({
      nome: 'Setor de TI Atualizado',
      alteradoEm: new Date(),
    });

    const request = criarMockRequest({
      params: { id: 1 },
      body: { nome: 'Setor de TI Atualizado' },
      setorUseCases: {
        atualizar: {
          executar: vi.fn().mockResolvedValue(mockSetor),
        },
      },
    });

    const reply = criarMockReply();
    const controller = new SetorController();

    // ACT
    await controller.atualizar(request, reply);

    // ASSERT
    expect(request.setorUseCases.atualizar.executar).toHaveBeenCalledWith({
      id: 1,
      nome: 'Setor de TI Atualizado',
    });
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockSetor);
  });

  test('Deve excluir um setor com sucesso', async () => {
    // ARRANGE
    const mockSetor = criarMockSetor({
      excluidoEm: new Date(),
    });

    const request = criarMockRequest({
      params: { id: 1 },
      setorUseCases: {
        excluir: {
          executar: vi.fn().mockResolvedValue(mockSetor),
        },
      },
    });

    const reply = criarMockReply();
    const controller = new SetorController();

    // ACT
    await controller.excluir(request, reply);

    // ASSERT
    expect(request.setorUseCases.excluir.executar).toHaveBeenCalledWith(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockSetor);
  });
});
