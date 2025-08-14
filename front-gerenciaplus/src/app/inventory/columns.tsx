"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export interface Fornecedor {
	id: string;
	nome: string;
	cnpj?: string | null;
	email?: string | null;
	telefone?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface Loja {
	id: string;
	nome: string;
}

export interface Produto {
	id: string;
	nome: string;
	sku: string;
	descricao: string;
	preco_unitario: number;
	preco_venda: number;
	quantidade: number;
	unidade_medida: string;
	quantidade_reposicao: number;
	fornecedor: Fornecedor;
	loja: Loja;
}

export const header = ({
	column,
	name,
}: {
	column: HeaderContext<Produto, unknown>["column"];
	name: string;
}) => (
	<Button
		variant="ghost"
		onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
	>
		{name}
		<ArrowUpDown className="ml-2 h-4 w-4" />
	</Button>
);

export const columns: ColumnDef<Produto>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Selecionar todos"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Selecionar linha"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "nome",
		header: (props) => header({ ...props, name: "Nome" }),
	},
	{
		accessorKey: "sku",
		header: (props) => header({ ...props, name: "SKU" }),
	},
	{
		accessorKey: "preco_venda",
		header: (props) => header({ ...props, name: "P. Venda" }),
		cell: ({ row }) => {
			const valor = row.getValue("preco_venda") as number;
			return `R$ ${valor.toFixed(2)}`;
		},
	},
	{
		accessorKey: "preco_unitario",
		header: (props) => header({ ...props, name: "P. Unit." }),
		cell: ({ row }) => {
			const valor = row.getValue("preco_unitario") as number;
			return `R$ ${valor.toFixed(2)}`;
		},
	},
	{
		accessorKey: "quantidade",
		header: (props) => header({ ...props, name: "Quant." }),
	},
	{
		accessorKey: "quantidade_reposicao",
		header: (props) => header({ ...props, name: "Qtd. Rep." }),
	},
	{
		accessorKey: "unidade_medida",
		header: (props) => header({ ...props, name: "Unid." }),
	},
	// {
	// 	accessorKey: "loja.nome",
	// 	header: (props) => header({ ...props, name: "Forn." }),
	// },
	{
		id: "actions",
		cell: ({ row }) => {
			const produto = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Ações</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(produto.id)}
							className="cursor-pointer"
						>
							Editar
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							Excluir
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
