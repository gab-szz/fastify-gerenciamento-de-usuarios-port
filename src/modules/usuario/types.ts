export type UsuarioType = {
  id?: number;
  nome: string;
  dataNascimento?: Date;
  login: string;
  senha: string;
  perfilId?: number;
  setorId?: number;
  enderecosId?: number[];
  ativo: boolean;
  dataCriacao: Date;
  dataAtualizacao?: Date;
  dataExclusao?: Date;
};
