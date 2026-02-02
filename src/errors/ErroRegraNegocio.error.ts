export class ErroRegraNegocio extends Error {
  constructor(public message: string) {
    super(message);
  }
}
