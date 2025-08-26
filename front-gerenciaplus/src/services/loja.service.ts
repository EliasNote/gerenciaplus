import { createClient } from "@/lib/supabase-browser";

const url =
	process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL! +
	process.env.NEXT_PUBLIC_GERENCIAPLIS_API_LOJA_URI!;

async function getToken() {
	const supabase = createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session?.access_token;
}

export async function criarLoja(nome_fantasia: string, cnpj: string) {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ nome_fantasia, cnpj }),
	});

	if (!response.ok) {
		throw new Error("Erro ao criar loja");
	}

	return response.json();
}
