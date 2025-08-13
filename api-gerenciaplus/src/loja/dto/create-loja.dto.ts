import { IsString, IsNumber } from 'class-validator';

export class CreateLojaDto {
  @IsString()
  readonly nome_fantasia: string;

  @IsNumber()
  readonly cnpj: number;
}
