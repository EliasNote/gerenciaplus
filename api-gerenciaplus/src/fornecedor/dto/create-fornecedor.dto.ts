import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateFornecedorDto {
  @IsString()
  nome: string;

  @IsString()
  @IsOptional()
  cnpj?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  telefone?: string;
}
