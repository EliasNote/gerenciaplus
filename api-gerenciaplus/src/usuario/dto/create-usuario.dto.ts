export class CreateUsuarioDto {
  readonly nome: string;
  readonly email: string;
  readonly senha: string;
  readonly nivel_acesso: string;
  readonly lojaId: number;
}
