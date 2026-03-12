import { describe, expect, test, vi } from 'vitest';
import { SetorController } from './setor.controller.js';

describe('SetorController', () => {
  test('Deve criar um setor com sucesso', async () => {
    // ARRANGE
    const mockSetor = {
      id: 1,
      nome: 'Setor de TI',
      criadoEm: new Date(),
      alteradoEm: undefined,
      excluidoEm: undefined,
    };

    const request: any = {
      body: {
        nome: 'Setor de TI',
      },
      setorUseCases: {
        criar: {
          executar: vi.fn().mockResolvedValue(mockSetor),
        },
      },
    };

    const reply: any = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };

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
});
