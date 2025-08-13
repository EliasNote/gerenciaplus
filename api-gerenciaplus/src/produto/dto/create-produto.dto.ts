import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  readonly nome: string;

  @IsString()
  readonly sku: string;

  @IsString()
  readonly descricao: string;

  @IsNumber()
  readonly preco_unitario: number;

  @IsNumber()
  readonly preco_venda: number;

  @IsNumber()
  readonly quantidade: number;

  @IsString()
  readonly unidade_medida: string;

  @IsNumber()
  readonly quantidade_reposicao: number;

  @IsUUID()
  readonly fornecedorId: string;

  @IsUUID()
  readonly lojaId: string;
}
