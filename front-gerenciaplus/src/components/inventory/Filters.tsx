import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RangeSliderFilter } from "./RangeSliderFilter";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

export interface DefinitiveFilters {
	minVenda: number;
	maxVenda: number;
	minUnitario: number;
	maxUnitario: number;
	unidadesSelecionadas: string[];
}

interface TableAdvancedFiltersProps {
	dialogOpen: boolean;
	setDialogOpen: (open: boolean) => void;
	unidades: string[];
	definitive: DefinitiveFilters;
	setDefinitive: React.Dispatch<React.SetStateAction<DefinitiveFilters>>;
	precoVendaMin: number;
	precoVendaMax: number;
	precoUnitarioMin: number;
	precoUnitarioMax: number;
}

export function TableAdvancedFilters(props: TableAdvancedFiltersProps) {
	const [tempMinVenda, setTempMinVenda] = useState(props.definitive.minVenda);
	const [tempMaxVenda, setTempMaxVenda] = useState(props.definitive.maxVenda);
	const [tempMinUnitario, setTempMinUnitario] = useState(
		props.definitive.minUnitario
	);
	const [tempMaxUnitario, setTempMaxUnitario] = useState(
		props.definitive.maxUnitario
	);
	const [tempUnidadesSelecionadas, setTempUnidadesSelecionadas] = useState<
		string[]
	>(props.definitive.unidadesSelecionadas);

	function onClear() {
		props.setDefinitive({
			minVenda: props.precoVendaMin,
			maxVenda: props.precoVendaMax,
			minUnitario: props.precoUnitarioMin,
			maxUnitario: props.precoUnitarioMax,
			unidadesSelecionadas: [],
		});
		setTempMinVenda(props.precoVendaMin);
		setTempMaxVenda(props.precoVendaMax);
		setTempMinUnitario(props.precoUnitarioMin);
		setTempMaxUnitario(props.precoUnitarioMax);
		setTempUnidadesSelecionadas([]);
	}

	function onApply() {
		props.setDefinitive({
			minVenda: tempMinVenda,
			maxVenda: tempMaxVenda,
			minUnitario: tempMinUnitario,
			maxUnitario: tempMaxUnitario,
			unidadesSelecionadas: [...tempUnidadesSelecionadas],
		});
		props.setDialogOpen(false);
	}

	return (
		<Dialog open={props.dialogOpen} onOpenChange={props.setDialogOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Filtros Avançados</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-3">
					<RangeSliderFilter
						label={"Preço Venda"}
						min={props.precoVendaMin}
						max={props.precoVendaMax}
						value={[tempMinVenda, tempMaxVenda]}
						onChange={([min, max]) => {
							setTempMinVenda(min);
							setTempMaxVenda(max);
						}}
						minInputId={"venda-min-input"}
						maxInputId={"venda-max-input"}
					/>
					<hr />
					<RangeSliderFilter
						label={"Preço Unitário"}
						min={props.precoUnitarioMin}
						max={props.precoUnitarioMax}
						value={[tempMinUnitario, tempMaxUnitario]}
						onChange={([min, max]) => {
							setTempMinUnitario(min);
							setTempMaxUnitario(max);
						}}
						minInputId={"unitario-min-input"}
						maxInputId={"unitario-max-input"}
					/>
					<hr />
					<div>
						<label className="font-medium text-sm">Unidades</label>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{props.unidades.map((item) => (
								<label key={item} className="flex items-center gap-1 text-sm">
									<Checkbox
										checked={tempUnidadesSelecionadas.includes(item)}
										onCheckedChange={(checked) => {
											setTempUnidadesSelecionadas((prev) =>
												checked
													? [...prev, item]
													: prev.filter((u) => u !== item)
											);
										}}
									/>
									{item}
								</label>
							))}
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="secondary" onClick={onClear}>
						Limpar filtros
					</Button>
					<Button onClick={onApply}>Aplicar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

import { ReactNode } from "react";

export function ColumnFilter<TData>({
	table,
	columnLabels,
	children,
}: {
	table: Table<TData>;
	columnLabels: Record<string, string>;
	children?: ReactNode;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="lg">
					{children}
					<ChevronDown className=" h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						const label = columnLabels[column.id] || column.id;
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{label}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
