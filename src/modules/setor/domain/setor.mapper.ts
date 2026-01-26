import { Setor } from './setor.domain.js';
import { SetorEntity } from '../infra/setor.entity.js';

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

  static entityParaDomain(entity: SetorEntity): Setor {
    return Setor.hidratar({
      id: entity.id,
      nome: entity.nome,
      criadoEm: entity.criadoEm,
      alteradoEm: entity.alteradoEm,
      excluidoEm: entity.excluidoEm,
    });
  }
}
