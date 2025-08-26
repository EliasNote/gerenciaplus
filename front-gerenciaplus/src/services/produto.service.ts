import { Produto } from "@/app/inventory/columns";
import { createClient } from "@/lib/supabase-browser";

const url =
	process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL! +
	process.env.NEXT_PUBLIC_GERENCIAPLIS_API_PRODUTO_URI!;

export interface CreateProdutoDto {
	nome: string;
	sku: string;
	descricao: string;
	preco_unitario: number;
	preco_venda: number;
	quantidade: number;
	unidade_medida: string;
	quantidade_reposicao: number;
	fornecedorId: string;
	lojaId: string;
}

async function getToken() {
	const supabase = createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session?.access_token;
}

export async function criarProduto(produto: CreateProdutoDto) {
	const token = await getToken();

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		body: JSON.stringify(produto),
	});

	if (!response.ok) {
		throw new Error("Erro ao buscar profile");
	}

	return response.json();
}

export async function buscarTodosProdutos(): Promise<Produto[]> {
	const token = await getToken();

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});

	if (!response.ok) {
		throw new Error("Erro ao buscar profile");
	}

	return response.json();
}
