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
import { Produto } from "@/app/inventory/columns";

export function Adicionar(props: AdicionarProps) {
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

	const fornecedores = Array.from(
		new Map(
			props.data
				.filter((p) => p.fornecedor)
				.map((p) => [p.fornecedor.id, p.fornecedor])
		).values()
	);

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
						<div className="flex-1 flex flex-col gap-1">
							<label htmlFor="nome" className="text-sm font-medium">
								Nome
							</label>
							<Input
								id="nome"
								name="nome"
								value={form.nome}
								onChange={handleChange}
								aria-invalid={!!errors.nome}
								className={errors.nome ? "border-red-500" : ""}
							/>
							{errors.nome && (
								<span className="text-red-500 text-xs">{errors.nome}</span>
							)}
						</div>
						<div className="flex-1 flex flex-col gap-1">
							<label htmlFor="sku" className="text-sm font-medium">
								SKU
							</label>
							<Input
								id="sku"
								name="sku"
								value={form.sku}
								onChange={handleChange}
								aria-invalid={!!errors.sku}
								className={errors.sku ? "border-red-500" : ""}
							/>
							{errors.sku && (
								<span className="text-red-500 text-xs">{errors.sku}</span>
							)}
						</div>
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
						<div className="flex-1 flex flex-col gap-1">
							<label htmlFor="preco_unitario" className="text-sm font-medium">
								Preço Unitário
							</label>
							<Input
								id="preco_unitario"
								name="preco_unitario"
								value={form.preco_unitario}
								onChange={handleChange}
								aria-invalid={!!errors.preco_unitario}
								type="number"
								className={errors.preco_unitario ? "border-red-500" : ""}
							/>
							{errors.preco_unitario && (
								<span className="text-red-500 text-xs">
									{errors.preco_unitario}
								</span>
							)}
						</div>
						<div className="flex-1 flex flex-col gap-1">
							<label htmlFor="preco_venda" className="text-sm font-medium">
								Preço de Venda
							</label>
							<Input
								id="preco_venda"
								name="preco_venda"
								value={form.preco_venda}
								onChange={handleChange}
								aria-invalid={!!errors.preco_venda}
								type="number"
								className={errors.preco_venda ? "border-red-500" : ""}
							/>
							{errors.preco_venda && (
								<span className="text-red-500 text-xs">
									{errors.preco_venda}
								</span>
							)}
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<div className="flex-1 flex flex-col gap-1">
							<label htmlFor="quantidade" className="text-sm font-medium">
								Quantidade
							</label>
							<Input
								id="quantidade"
								name="quantidade"
								value={form.quantidade}
								onChange={handleChange}
								aria-invalid={!!errors.quantidade}
								type="number"
								className={errors.quantidade ? "border-red-500" : ""}
							/>
							{errors.quantidade && (
								<span className="text-red-500 text-xs">
									{errors.quantidade}
								</span>
							)}
						</div>
						<div className="flex-1 flex flex-col gap-1">
							<label htmlFor="unidade_medida" className="text-sm font-medium">
								Unidade de Medida
							</label>
							<Input
								id="unidade_medida"
								name="unidade_medida"
								value={form.unidade_medida}
								onChange={handleChange}
								aria-invalid={!!errors.unidade_medida}
								className={errors.unidade_medida ? "border-red-500" : ""}
							/>
							{errors.unidade_medida && (
								<span className="text-red-500 text-xs">
									{errors.unidade_medida}
								</span>
							)}
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<div className="flex-1 flex flex-col gap-1">
							<label
								htmlFor="quantidade_reposicao"
								className="text-sm font-medium"
							>
								Quantidade de Reposição
							</label>
							<Input
								id="quantidade_reposicao"
								name="quantidade_reposicao"
								value={form.quantidade_reposicao}
								onChange={handleChange}
								aria-invalid={!!errors.quantidade_reposicao}
								type="number"
								className={errors.quantidade_reposicao ? "border-red-500" : ""}
							/>
							{errors.quantidade_reposicao && (
								<span className="text-red-500 text-xs">
									{errors.quantidade_reposicao}
								</span>
							)}
						</div>
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
									className={errors.fornecedor ? "border-red-500" : ""}
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
			</DialogContent>
		</Dialog>
	);
}
