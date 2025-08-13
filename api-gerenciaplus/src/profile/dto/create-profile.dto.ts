import { IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly nome: string;

  @IsString()
  readonly sobrenome: string;

  @IsUUID()
  readonly lojaId: string;
}
