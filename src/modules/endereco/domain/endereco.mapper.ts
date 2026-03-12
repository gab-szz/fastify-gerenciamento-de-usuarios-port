import type { EnderecoEntity } from '../infra/endereco.entity.js';
import { Endereco } from './endereco.domain.js';

export class EnderecoMapper {
  constructor() {}

  static domainParaEntity(endereco: Endereco): Partial<EnderecoEntity> {
    return {
      id: endereco.id,
      rua: endereco.rua,
      numero: endereco.numero,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep,
      complemento: endereco.complemento,
      criadoEm: endereco.criadoEm,
      alteradoEm: endereco.alteradoEm,
      excluidoEm: endereco.excluidoEm,
    };
  }

  static entityParaDomain(entity: EnderecoEntity): Endereco {
    return Endereco.hidratar({
      id: entity.id,
      rua: entity.rua,
      numero: entity.numero,
      bairro: entity.bairro,
      cidade: entity.cidade,
      estado: entity.estado,
      cep: entity.cep,
      complemento: entity.complemento,
      criadoEm: entity.criadoEm,
      alteradoEm: entity.alteradoEm,
      excluidoEm: entity.excluidoEm,
    });
  }
}
