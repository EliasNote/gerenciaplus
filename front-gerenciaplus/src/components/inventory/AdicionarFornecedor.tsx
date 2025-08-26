import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { criarFornecedor } from "@/services/fornecedor.service";
import { Fornecedor } from "@/app/inventory/columns";
import { FormField } from "./FormField";

export function AdicionarFornecedor({
	open,
	setOpen,
	onFornecedorAdicionado,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	onFornecedorAdicionado: (fornecedor: Fornecedor) => void;
}) {
	function validate() {
		const newErrors: { [k: string]: string } = {};
		if (!form.nome) newErrors.nome = "Nome obrigatório";
		if (form.cnpj) {
			const cnpjNum = form.cnpj.replace(/\D/g, "");
			if (cnpjNum.length !== 14) newErrors.cnpj = "CNPJ deve ter 14 dígitos";
		}
		if (form.email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(form.email)) newErrors.email = "Email inválido";
		}
		if (form.telefone) {
			const telNum = form.telefone.replace(/\D/g, "");
			if (telNum.length < 8)
				newErrors.telefone = "Telefone deve ter pelo menos 8 dígitos";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	const [form, setForm] = useState({
		nome: "",
		cnpj: "",
		email: "",
		telefone: "",
	});
	const [errors, setErrors] = useState<{ [k: string]: string }>({});

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!validate()) return;
		onFornecedorAdicionado(await criarFornecedor(form));
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Novo Fornecedor</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-row gap-4">
						<FormField
							id="nome"
							label="Nome"
							value={form.nome}
							onChange={handleChange}
							error={errors.nome}
						/>
						<FormField
							id="cnpj"
							label="CNPJ"
							value={form.cnpj}
							onChange={handleChange}
							error={errors.cnpj}
						/>
					</div>
					<div className="flex flex-row gap-4">
						<FormField
							id="email"
							label="Email"
							value={form.email}
							onChange={handleChange}
							error={errors.email}
						/>
						<FormField
							id="telefone"
							label="Telefone"
							value={form.telefone}
							onChange={handleChange}
							error={errors.telefone}
						/>
					</div>
					<DialogFooter>
						<Button variant="outline" type="submit">
							Adicionar
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
