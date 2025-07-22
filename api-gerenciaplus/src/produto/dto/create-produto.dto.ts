export class CreateProdutoDto {
  readonly nome: string;
  readonly sku: string;
  readonly descricao: string;
  readonly preco_unitario: number;
  readonly preco_venda: number;
  readonly quantidade: number;
  readonly unidade_medida: string;
  readonly quantidade_reposicao: number;
  readonly lojaId: number;
}
