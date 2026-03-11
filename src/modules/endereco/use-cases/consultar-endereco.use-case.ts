import type { EnderecoEntity } from '../infra/endereco.entity.js';
import type { EnderecoRepository } from '../infra/endereco.repository.js';

export class ConsultarEnderecoUseCase {
  constructor(private readonly repository: EnderecoRepository) {}

  async porId(id: number) {
    return await this.repository.consultarPorId(id);
  }

  async todos() {
    return await this.repository.consultarTodos();
  }
}
