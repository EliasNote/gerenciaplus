import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface AdicionarProps {
	adicionarOpen: boolean;
	setAdicionarOpen: (open: boolean) => void;
	data: Produto[];
}

import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Fornecedor, Produto } from "@/app/inventory/columns";
import { AdicionarFornecedor } from "./AdicionarFornecedor";
import { useFornecedores } from "@/hooks/useFornecedores";
import { FormField } from "./FormField";

export function Adicionar(props: AdicionarProps) {
	const [addFornecedorOpen, setAddFornecedorOpen] = useState(false);
	const { fornecedores, adicionarFornecedor } = useFornecedores();

	function handleFornecedorAdicionado(novoFornecedor: Fornecedor) {
		adicionarFornecedor(novoFornecedor);
		setForm((prev) => ({ ...prev, fornecedor: novoFornecedor.id }));
	}

	const [form, setForm] = useState({
		nome: "",
		sku: "",
		descricao: "",
		preco_unitario: "",
		preco_venda: "",
		quantidade: "",
		unidade_medida: "",
		quantidade_reposicao: "",
		fornecedor: "",
	});
	const [errors, setErrors] = useState<{ [k: string]: string }>({});

	function validate() {
		const newErrors: { [k: string]: string } = {};
		if (!form.nome) newErrors.nome = "Nome obrigatório";
		if (!form.sku) newErrors.sku = "SKU obrigatório";
		if (!form.preco_unitario || isNaN(Number(form.preco_unitario)))
			newErrors.preco_unitario = "Preço unitário obrigatório e numérico";
		if (!form.preco_venda || isNaN(Number(form.preco_venda)))
			newErrors.preco_venda = "Preço de venda obrigatório e numérico";
		if (!form.quantidade || isNaN(Number(form.quantidade)))
			newErrors.quantidade = "Quantidade obrigatória e numérica";
		if (!form.unidade_medida) newErrors.unidade_medida = "Unidade obrigatória";
		if (!form.quantidade_reposicao || isNaN(Number(form.quantidade_reposicao)))
			newErrors.quantidade_reposicao = "Qtd. reposição obrigatória e numérica";
		if (!form.fornecedor) newErrors.fornecedor = "Fornecedor obrigatório";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!validate()) return;
		// Aqui você pode chamar a função de adicionar produto
		// Exemplo: onAdd(form)
		props.setAdicionarOpen(false);
	}

	return (
		<Dialog open={props.adicionarOpen} onOpenChange={props.setAdicionarOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar Produto</DialogTitle>
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
							id="sku"
							label="SKU"
							value={form.sku}
							onChange={handleChange}
							error={errors.sku}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="descricao" className="text-sm font-medium">
							Descrição
						</label>
						<Textarea
							id="descricao"
							name="descricao"
							value={form.descricao}
							onChange={handleChange}
						/>
						{errors.descricao && (
							<span className="text-red-500 text-xs">{errors.descricao}</span>
						)}
					</div>
					<div className="flex flex-row gap-4">
						<FormField
							id="preco_unitario"
							label="Preço Unitário"
							value={form.preco_unitario}
							onChange={handleChange}
							error={errors.preco_unitario}
						/>
						<FormField
							id="preco_venda"
							label="Preço de Venda"
							value={form.preco_venda}
							onChange={handleChange}
							error={errors.preco_venda}
						/>
					</div>
					<div className="flex flex-row gap-4">
						<FormField
							id="quantidade"
							label="Quantidade"
							value={form.quantidade}
							onChange={handleChange}
							error={errors.quantidade}
						/>
						<FormField
							id="unidade_medida"
							label="Unidade de Medida"
							value={form.unidade_medida}
							onChange={handleChange}
							error={errors.unidade_medida}
						/>
					</div>
					<div className="flex flex-row gap-4">
						<FormField
							id="quantidade_reposicao"
							label="Quantidade de Reposição"
							value={form.quantidade_reposicao}
							onChange={handleChange}
							error={errors.quantidade_reposicao}
						/>
						<div className="flex-1 flex flex-col gap-1">
							<label htmlFor="fornecedor" className="text-sm font-medium">
								Fornecedor
							</label>
							<Select
								value={form.fornecedor}
								onValueChange={(value) =>
									setForm((prev) => ({ ...prev, fornecedor: value }))
								}
							>
								<SelectTrigger
									id="fornecedor"
									aria-invalid={!!errors.fornecedor}
									className={`w-full ${
										errors.fornecedor ? "border-red-500" : ""
									}`}
								>
									<SelectValue placeholder="Selecione um fornecedor" />
								</SelectTrigger>

								<SelectContent>
									{fornecedores.map((f) => (
										<SelectItem key={f.id} value={f.id}>
											{f.nome}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<button
								type="button"
								onClick={() => setAddFornecedorOpen(true)}
								className="text-sapphire hover:underline font-semibold text-[14px]"
							>
								Novo Fornecedor
							</button>
							{errors.fornecedor && (
								<span className="text-red-500 text-xs">
									{errors.fornecedor}
								</span>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" type="submit">
							Adicionar
						</Button>
					</DialogFooter>
				</form>
				<AdicionarFornecedor
					open={addFornecedorOpen}
					setOpen={setAddFornecedorOpen}
					onFornecedorAdicionado={handleFornecedorAdicionado}
				/>
			</DialogContent>
		</Dialog>
	);
}
