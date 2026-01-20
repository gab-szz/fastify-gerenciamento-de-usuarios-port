import type { Setor } from './setor.domain.js';
import { SetorEntity } from './setor.entity.js';

export class SetorMapper {
  constructor() {}

  static domainParaEntity(setor: Setor): Partial<SetorEntity> {
    return {
      id: setor.id,
      nome: setor.nome,
      criadoEm: setor.criadoEm,
      alteradoEm: setor.alteradoEm,
      excluidoEm: setor.excluidoEm,
    };
  }
}
