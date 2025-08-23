import { Fornecedor } from "@/app/inventory/columns";
import { createClient } from "@/lib/supabase-browser";

async function getToken() {
	const supabase = createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session?.access_token;
}

export interface CreateFornecedor {
	nome: string;
	cnpj: string;
	email?: string;
	telefone?: string;
}

export async function criarFornecedor(
	data: CreateFornecedor
): Promise<Fornecedor> {
	const token = await getToken();

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL}/fornecedores`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify(data),
		}
	);

	if (!res.ok) {
		const error = await res.text();
		throw new Error(error || "Erro ao criar fornecedor");
	}

	return res.json();
}

export async function buscarFornecedores(): Promise<Fornecedor[]> {
	const token = await getToken();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL}/fornecedores`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		}
	);
	if (!response.ok) {
		throw new Error("Erro ao buscar fornecedores");
	}
	return response.json();
}
