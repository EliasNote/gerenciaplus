"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Filter, Trash2 } from "lucide-react";

import {
	TableAdvancedFilters,
	ColumnFilter,
	DefinitiveFilters,
} from "@/components/inventory/Filters";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Produto } from "./columns";

export interface DataTableProps {
	columns: ColumnDef<Produto, unknown>[];
	data: Produto[];
}

const columnLabels: Record<string, string> = {
	nome: "Nome",
	sku: "SKU",
	preco_venda: "Preço de Venda",
	preco_unitario: "Preço Unitário",
	quantidade: "Quantidade",
	quantidade_reposicao: "Quantidade de Reposição",
	unidade_medida: "Unidade",
	loja_nome: "Fornecedor",
};

export function DataTable({ columns, data }: DataTableProps) {
	const precoVendaMin = 0;
	const precoVendaMax = useMemo(
		() => Math.max(...data.map((d) => Number(d.preco_venda) || 0), 0),
		[data]
	);
	const precoUnitarioMin = 0;
	const precoUnitarioMax = useMemo(
		() => Math.max(...data.map((d) => Number(d.preco_unitario) || 0), 0),
		[data]
	);
	const unidades = useMemo(
		() =>
			Array.from(new Set(data.map((d) => d.unidade_medida))).filter(Boolean),
		[data]
	);

	const [definitive, setDefinitive] = useState<DefinitiveFilters>({
		minVenda: precoVendaMin,
		maxVenda: precoVendaMax,
		minUnitario: precoUnitarioMin,
		maxUnitario: precoUnitarioMax,
		unidadesSelecionadas: [],
	});

	const [dialogOpen, setDialogOpen] = useState(false);

	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const filteredData = useMemo(() => {
		return data.filter((item: Produto) => {
			const pv = Number(item.preco_venda) || 0;
			const pu = Number(item.preco_unitario) || 0;
			const unidadeOk =
				!definitive.unidadesSelecionadas.length ||
				definitive.unidadesSelecionadas.includes(item.unidade_medida);
			const textOk =
				!globalFilter ||
				JSON.stringify(item).toLowerCase().includes(globalFilter.toLowerCase());

			return (
				pv >= definitive.minVenda &&
				pv <= definitive.maxVenda &&
				pu >= definitive.minUnitario &&
				pu <= definitive.maxUnitario &&
				unidadeOk &&
				textOk
			);
		});
	}, [data, definitive, globalFilter]);

	const table = useReactTable({
		data: filteredData,
		columns,
		state: { sorting, columnVisibility, rowSelection, globalFilter },
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	const selectedRows = table.getSelectedRowModel().rows;
	function handleShowSelected() {
		const nomes = selectedRows
			.map((r) => (r.original as Produto).nome)
			.join(", ");
		alert(`Selecionados: ${nomes}`);
	}

	return (
		<div className="flex flex-col max-w-[1366px] bg-card rounded border m-auto mt-20">
			<div className="flex items-center justify-between gap-2 p-2 flex-wrap">
				<Input
					placeholder="Pesquise em todas as colunas"
					value={globalFilter}
					onChange={(e) => setGlobalFilter(e.target.value)}
					className="max-w-[240px] text-[14px]"
				/>
				<div className="flex flex-wrap items-center gap-2">
					<Button
						variant="outline"
						size="lg"
						onClick={() => setDialogOpen(true)}
					>
						Filtros <Filter className="ml-2 h-4 w-4" />
					</Button>
					<ColumnFilter table={table} columnLabels={columnLabels} />
					<Button
						variant="destructive"
						size="lg"
						disabled={!selectedRows.length}
						onClick={handleShowSelected}
					>
						<Trash2 className="h-4 w-4" /> Excluir
					</Button>
				</div>
			</div>
			<TableAdvancedFilters
				dialogOpen={dialogOpen}
				setDialogOpen={setDialogOpen}
				unidades={unidades}
				definitive={definitive}
				setDefinitive={setDefinitive}
				precoVendaMin={precoVendaMin}
				precoVendaMax={precoVendaMax}
				precoUnitarioMin={precoUnitarioMin}
				precoUnitarioMax={precoUnitarioMax}
			/>

			<div className="overflow-hidden border">
				<Table className="bg-card text-card-foreground">
					<TableHeader className="bg-muted text-muted-foreground">
						{table.getHeaderGroups().map((hg) => (
							<TableRow key={hg.id} className="border-b border-border">
								{hg.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="text-foreground">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2 p-2">
				<span className="text-sm text-muted-foreground pr-4">
					Página {table.getState().pagination.pageIndex + 1} de{" "}
					{table.getPageCount()}
				</span>
				<Button
					variant="outline"
					size="lg"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Anterior
				</Button>
				<Button
					variant="outline"
					size="lg"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Próximo
				</Button>
			</div>
		</div>
	);
}
