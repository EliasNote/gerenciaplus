import { Fornecedor } from "@/app/inventory/columns";
import { buscarFornecedores } from "@/services/fornecedor.service";
import { useEffect, useState } from "react";

export function useFornecedores() {
	const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

	function adicionarFornecedor(novo: Fornecedor) {
		setFornecedores((prev) => [...prev, novo]);
	}

	useEffect(() => {
		async function carregarFornecedores() {
			try {
				const fornecedores = await buscarFornecedores();
				setFornecedores(fornecedores);
			} catch (error) {
				console.error("Erro ao carregar fornecedores:", error);
			}
		}
		carregarFornecedores();
	}, []);

	return { fornecedores, adicionarFornecedor };
}
