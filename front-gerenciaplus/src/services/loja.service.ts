export async function criarLoja(nome_fantasia: string, cnpj: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL! + "/loja", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome_fantasia, cnpj }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar loja');
  }

  return response.json();
}

export async function criarProfile(id: string, username: string, nome:string, sobrenome: string, lojaId: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_GERENCIAPLUS_API_BASEURL! + "/profile", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, username, nome, sobrenome, lojaId }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar profile');
  }

  return response.json();
}