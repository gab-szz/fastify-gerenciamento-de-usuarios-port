export type IUsuario = {
  id: number;
  nome: string;
  dataNascimento: Date;
  login: string;
  senha: string;
  perfilId?: number;
  enderecosId?: number[];
  ativo: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date;
  dataExclusao?: Date;
};
