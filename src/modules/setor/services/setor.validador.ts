import type { ISetorRepository } from '../infra/setor.repository.js';

export class SetorValidator {
  constructor(private setorRepository: ISetorRepository) {}

  async validarSeSetorExiste(nome: string): Promise<boolean> {
    const setor = await this.setorRepository.consultarPorNome(nome);
    return setor !== null;
  }

  async validarSetorPorId(id: number): Promise<boolean> {
    const setor = await this.setorRepository.consultarPorId(id);
    return setor !== null;
  }
}
