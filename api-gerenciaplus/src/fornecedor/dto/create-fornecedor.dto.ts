import { IsString, IsOptional, IsEmail, Matches } from 'class-validator';

export class CreateFornecedorDto {
  @IsString()
  nome: string;

  @IsString()
  @Matches(/^\d{14}$/)
  readonly cnpj: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  telefone?: string;
}
