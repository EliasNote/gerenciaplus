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

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [min, setMin] = useState("");
	const [max, setMax] = useState("");
	const [unidade, setUnidade] = useState("");
	const precoVendaMax = Math.max(
		...data.map((item) => Number(item.preco_venda) || 0)
	);
	const precoUnitarioMax = Math.max(
		...data.map((item) => Number(item.preco_unitario) || 0)
	);

	const table = useReactTable({
		data,
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

	const selectedRows = table.getSelectedRowModel().rows;

	function handleShowSelected() {
		const nomes = selectedRows.map((row) => row.original.nome).join(", ");
		alert(`Selecionados: ${nomes}`);
	}

	return (
		<div className="flex flex-col max-w-[1366px] bg-card rounded border m-auto mt-20">
			<div className="flex items-center max-[550px]:flex-col p-2">
				<Input
					placeholder="Pesquise em todas as colunas"
					value={globalFilter}
					onChange={(e) => setGlobalFilter(e.target.value)}
					className="max-w-sm"
				/>
				<div className="flex items-center gap-2 ml-auto max-[550px]:mr-auto">
					<DropdownMenu>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" size="lg">
									Filtros
									<Filter className="ml-2 h-4 w-4" />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Filtros Avançados</DialogTitle>
								</DialogHeader>
								<div className="flex flex-col gap-3">
									<label className="font-medium text-sm">Valor</label>
									<Slider
										value={[Number(min) || 0, Number(max) || precoVendaMax]}
										min={0}
										max={precoVendaMax}
										onChange={(_, newValue) => {
											if (Array.isArray(newValue)) {
												setMin(String(newValue[0]));
												setMax(String(newValue[1]));
											}
										}}
										valueLabelDisplay="auto"
									/>

									<div className="flex justify-between text-xs text-muted-foreground">
										<span>Mín: {min || 0}</span>
										<span>Máx: {max || precoVendaMax}</span>
									</div>
									<select
										value={unidade}
										onChange={(e) => setUnidade(e.target.value)}
										className="border rounded px-2 py-1"
									>
										<option value="">Todas unidades</option>
										<option value="unid">Unidade</option>
										<option value="kg">Kg</option>
									</select>
									{/* Adicione outros filtros aqui */}
								</div>
								<DialogFooter>
									<Button
										variant="secondary"
										onClick={() => {
											setMin("");
											setMax("");
											setUnidade("");
										}}
									>
										Limpar filtros
									</Button>
									<Button
										onClick={() => {
											/* aplicar filtros */
										}}
									>
										Aplicar
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
						<DropdownMenuContent align="end" className="min-w-[220px] p-2">
							<div className="flex flex-col gap-2">
								<Input
									type="number"
									placeholder="Valor mínimo"
									value={min}
									onChange={(e) => setMin(e.target.value)}
									className="max-w-full"
								/>
								<Input
									type="number"
									placeholder="Valor máximo"
									value={max}
									onChange={(e) => setMax(e.target.value)}
									className="max-w-full"
								/>
								<select
									value={unidade}
									onChange={(e) => setUnidade(e.target.value)}
									className="border rounded px-2 py-1"
								>
									<option value="">Todas unidades</option>
									<option value="unid">Unidade</option>
									<option value="kg">Kg</option>
									{/* ...outras opções */}
								</select>
								{/* Adicione outros filtros aqui */}
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="lg">
								Colunas
								<ChevronDown className=" h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
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
