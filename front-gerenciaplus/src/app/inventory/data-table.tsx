"use client";
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, Filter, Trash2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Slider from "@mui/material/Slider";
import {
	ColumnFilter,
	TableAdvancedFilters,
} from "@/components/inventory/Filters";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
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

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const precoVendaMin = 0;
	const precoVendaMax = Math.max(
		...data.map((item) => Number(item.preco_venda) || 0)
	);

	const precoUnitarioMin = 0;
	const precoUnitarioMax = Math.max(
		...data.map((item) => Number(item.preco_unitario) || 0)
	);

	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [minVenda, setMinVenda] = useState<number>(0);
	const [maxVenda, setMaxVenda] = useState<number>(precoVendaMax);
	const [minUnitario, setMinUnitario] = useState<number>(0);
	const [maxUnitario, setMaxUnitario] = useState<number>(precoUnitarioMax);
	const [unidadesSelecionadas, setUnidadesSelecionadas] = useState<string[]>(
		[]
	);

	const [tempMinVenda, setTempMinVenda] = useState<number>(0);
	const [tempMaxVenda, setTempMaxVenda] = useState<number>(precoVendaMax);
	const [tempMinUnitario, setTempMinUnitario] = useState<number>(0);
	const [tempMaxUnitario, setTempMaxUnitario] =
		useState<number>(precoUnitarioMax);
	const [tempUnidadesSelecionadas, setTempUnidadesSelecionadas] = useState<
		string[]
	>([]);

	const [dialogOpen, setDialogOpen] = useState(false);

	const filteredData = useMemo(() => {
		return data.filter((item: any) => {
			// Filtro de preço de venda
			const precoVendaOk =
				Number(item.preco_venda) >= minVenda &&
				Number(item.preco_venda) <= maxVenda;

			// Filtro de preço unitário
			const precoUnitarioOk =
				Number(item.preco_unitario) >= minUnitario &&
				Number(item.preco_unitario) <= maxUnitario;

			// Filtro de unidades
			const unidadeOk =
				unidadesSelecionadas.length === 0 ||
				unidadesSelecionadas.includes(item.unidade_medida);

			// Item passa no filtro apenas se atender a todos os critérios
			return precoVendaOk && precoUnitarioOk && unidadeOk;
		});
	}, [
		data,
		minVenda,
		maxVenda,
		minUnitario,
		maxUnitario,
		unidadesSelecionadas,
	]);

	const table = useReactTable({
		data: filteredData,
		columns,
		onGlobalFilterChange: setGlobalFilter,
		getFilteredRowModel: getFilteredRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
	});

	const unSetFilters = () => {
		setMinVenda(0);
		setMaxVenda(precoVendaMax);
		setMinUnitario(0);
		setMaxUnitario(precoUnitarioMax);
		setUnidadesSelecionadas([]);

		setTempMinVenda(0);
		setTempMaxVenda(precoVendaMax);
		setTempMinUnitario(0);
		setTempMaxUnitario(precoUnitarioMax);
		setTempUnidadesSelecionadas([]);
	};

	const setFilters = () => {
		setMinVenda(tempMinVenda);
		setMaxVenda(tempMaxVenda);
		setMinUnitario(tempMinUnitario);
		setMaxUnitario(tempMaxUnitario);
		setUnidadesSelecionadas(tempUnidadesSelecionadas);

		setDialogOpen(false);
	};

	const unidades = Array.from(
		new Set(data.map((item) => item.unidade_medida))
	).filter(Boolean);

	const selectedRows = table.getSelectedRowModel().rows;

	function handleShowSelected() {
		const nomes = selectedRows.map((row) => row.original.nome).join(", ");
		alert(`Selecionados: ${nomes}`);
	}

	return (
		<div className="flex flex-col max-w-[1366px] bg-card rounded border m-auto mt-20">
			<div className="flex items-center justify-between max-[570px]:items-start max-[570px]:flex-col gap-2 p-2">
				<Input
					placeholder="Pesquise em todas as colunas"
					value={globalFilter}
					onChange={(e) => setGlobalFilter(e.target.value)}
					className="max-w-[240px] text-[14px]"
				/>
				<div className="flex flex-wrap items-center max-[570px]:items-start gap-2 max-[570px]:mr-auto">
					<div>
						<TableAdvancedFilters
							dialogOpen={dialogOpen}
							setDialogOpen={setDialogOpen}
							venda={{
								min: tempMinVenda,
								max: tempMaxVenda,
								setMin: setTempMinVenda,
								setMax: setTempMaxVenda,
								minLimit: precoVendaMin,
								maxLimit: precoVendaMax,
							}}
							unitario={{
								min: tempMinUnitario,
								max: tempMaxUnitario,
								setMin: setTempMinUnitario,
								setMax: setTempMaxUnitario,
								minLimit: precoUnitarioMin,
								maxLimit: precoUnitarioMax,
							}}
							unidades={unidades}
							tempUnidadesSelecionadas={tempUnidadesSelecionadas}
							setTempUnidadesSelecionadas={setTempUnidadesSelecionadas}
							onApply={setFilters}
							onClear={unSetFilters}
						/>
						<Button
							variant="outline"
							size="lg"
							onClick={() => setDialogOpen(true)}
						>
							Filtros
							<Filter className="ml-2 h-4 w-4" />
						</Button>
					</div>
					<ColumnFilter table={table} columnLabels={columnLabels} />
					<Button
						variant="destructive"
						size="lg"
						disabled={selectedRows.length === 0}
						onClick={handleShowSelected}
					>
						<Trash2 className="h-4 w-4" />
						Excluir
					</Button>
				</div>
			</div>
			<div className="overflow-hidden border">
				<Table className="bg-card text-card-foreground">
					<TableHeader className="bg-muted text-muted-foreground">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className="border-b border-border" key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell className="text-foreground" key={cell.id}>
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
