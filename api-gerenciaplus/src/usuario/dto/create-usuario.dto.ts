export class CreateUsuarioDto {
  readonly nome: string;
  readonly sobreNome: string;
  readonly email: string;
  readonly senha: string;
  readonly nivelAcesso: string;
  readonly lojaId: number;
}
