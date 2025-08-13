import { IsString, Matches } from 'class-validator';

export class CreateLojaDto {
  @IsString()
  readonly nome_fantasia: string;

  @IsString()
  @Matches(/^\d{14}$/)
  readonly cnpj: string;
}
