import { Profile } from "@/app/inventory/columns";
import { createClient } from "@/lib/supabase-browser";

const url =
	process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL! +
	process.env.NEXT_PUBLIC_GERENCIAPLIS_API_PROFILE_URI!;

async function getToken() {
	const supabase = createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session?.access_token;
}

export async function criarProfile(
	id: string,
	username: string,
	nome: string,
	sobrenome: string,
	lojaId: string
) {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id, username, nome, sobrenome, lojaId }),
	});

	if (!response.ok) {
		throw new Error("Erro ao criar profile");
	}

	return response.json();
}

export async function buscarProfilePorId(
	id: string,
	token?: string
): Promise<Profile> {
	if (!token) {
		token = await getToken();
	}

	const response = await fetch(`${url}/${id}`, {
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
