import { Produto } from "@/app/inventory/columns";
import { createClient } from "@/lib/supabase-browser";

async function getToken() {
	const supabase = createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session?.access_token;
}

export async function criarLoja(nome_fantasia: string, cnpj: string) {
	const response = await fetch(
		process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL! + "/loja",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ nome_fantasia, cnpj }),
		}
	);

	if (!response.ok) {
		throw new Error("Erro ao criar loja");
	}

	return response.json();
}

export async function criarProfile(
	id: string,
	username: string,
	nome: string,
	sobrenome: string,
	lojaId: string
) {
	const response = await fetch(
		process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL! + "/profile",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, username, nome, sobrenome, lojaId }),
		}
	);

	if (!response.ok) {
		throw new Error("Erro ao criar profile");
	}

	return response.json();
}

export async function buscarProfilePorId(id: string) {
	const token = await getToken();

	const response = await fetch(
		process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL! + `/profile/${id}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		}
	);

	if (!response.ok) {
		throw new Error("Erro ao buscar profile");
	}

	return response.json();
}

export async function buscarTodosProdutos(): Promise<Produto[]> {
	const token = await getToken();

	const response = await fetch(
		process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL! + `/produto`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		}
	);

	if (!response.ok) {
		throw new Error("Erro ao buscar profile");
	}

	return response.json();
}
