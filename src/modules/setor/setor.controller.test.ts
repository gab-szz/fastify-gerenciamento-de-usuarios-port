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
    ...overrides,
  } as any;
}

describe('SetorController', () => {
  test('Deve criar um setor com sucesso', async () => {
    // ARRANGE
    const mockSetor = criarMockSetor();
    const mockCriarUseCase = { executar: vi.fn().mockResolvedValue(mockSetor) };

    const controller = new SetorController();
    (controller as any).criarUseCase = mockCriarUseCase;

    const request = criarMockRequest({ body: { nome: 'Setor de TI' } });
    const reply = criarMockReply();

    // ACT
    await controller.criar(request, reply);

    // ASSERT
    expect(mockCriarUseCase.executar).toHaveBeenCalledWith({
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
    const mockConsultarUseCase = {
      todos: vi.fn().mockResolvedValue(mockSetores),
    };

    const controller = new SetorController();
    (controller as any).consultarUseCase = mockConsultarUseCase;

    const request = criarMockRequest();
    const reply = criarMockReply();

    // ACT
    await controller.consultar(request, reply);

    // ASSERT
    expect(mockConsultarUseCase.todos).toHaveBeenCalled();
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockSetores);
  });

  test('Deve consultar setores por nome com sucesso', async () => {
    // ARRANGE
    const mockSetores = [criarMockSetor()];
    const mockConsultarUseCase = {
      porNome: vi.fn().mockResolvedValue(mockSetores),
    };

    const controller = new SetorController();
    (controller as any).consultarUseCase = mockConsultarUseCase;

    const request = criarMockRequest({ params: { nome: 'Setor de TI' } });
    const reply = criarMockReply();

    // ACT
    await controller.consultarPorNome(request, reply);

    // ASSERT
    expect(mockConsultarUseCase.porNome).toHaveBeenCalledWith('Setor de TI');
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockSetores);
  });

  test('Deve consultar um setor por ID com sucesso', async () => {
    // ARRANGE
    const mockSetor = criarMockSetor();
    const mockConsultarUseCase = {
      porId: vi.fn().mockResolvedValue(mockSetor),
    };

    const controller = new SetorController();
    (controller as any).consultarUseCase = mockConsultarUseCase;

    const request = criarMockRequest({ params: { id: 1 } });
    const reply = criarMockReply();

    // ACT
    await controller.consultarPorId(request, reply);

    // ASSERT
    expect(mockConsultarUseCase.porId).toHaveBeenCalledWith(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockSetor);
  });

  test('Deve retornar 404 quando setor não for encontrado por ID', async () => {
    // ARRANGE
    const mockConsultarUseCase = { porId: vi.fn().mockResolvedValue(null) };

    const controller = new SetorController();
    (controller as any).consultarUseCase = mockConsultarUseCase;

    const request = criarMockRequest({ params: { id: 999 } });
    const reply = criarMockReply();

    // ACT
    await controller.consultarPorId(request, reply);

    // ASSERT
    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith({
      message: 'Setor não encontrado',
    });
  });

  test('Deve atualizar um setor com sucesso', async () => {
    // ARRANGE
    const mockSetor = criarMockSetor({
      nome: 'Setor de TI Atualizado',
      alteradoEm: new Date(),
    });
    const mockAtualizarUseCase = {
      executar: vi.fn().mockResolvedValue(mockSetor),
    };

    const controller = new SetorController();
    (controller as any).atualizarUseCase = mockAtualizarUseCase;

    const request = criarMockRequest({
      params: { id: 1 },
      body: { nome: 'Setor de TI Atualizado' },
    });
    const reply = criarMockReply();

    // ACT
    await controller.atualizar(request, reply);

    // ASSERT
    expect(mockAtualizarUseCase.executar).toHaveBeenCalledWith({
      id: 1,
      nome: 'Setor de TI Atualizado',
    });
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockSetor);
  });

  test('Deve excluir um setor com sucesso', async () => {
    // ARRANGE
    const mockSetor = criarMockSetor({ excluidoEm: new Date() });
    const mockExcluirUseCase = {
      executar: vi.fn().mockResolvedValue(mockSetor),
    };

    const controller = new SetorController();
    (controller as any).excluirUseCase = mockExcluirUseCase;

    const request = criarMockRequest({ params: { id: 1 } });
    const reply = criarMockReply();

    // ACT
    await controller.excluir(request, reply);

    // ASSERT
    expect(mockExcluirUseCase.executar).toHaveBeenCalledWith(1);
    expect(reply.status).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(mockSetor);
  });
});
