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

interface PriceProps {
	min: number;
	max: number;
	setMin: (value: number) => void;
	setMax: (value: number) => void;
	minLimit: number;
	maxLimit: number;
}

interface TableAdvancedFilters {
	dialogOpen: boolean;
	setDialogOpen: (open: boolean) => void;
	venda: PriceProps;
	unitario: PriceProps;
	unidades: string[];
	tempUnidadesSelecionadas: string[];
	setTempUnidadesSelecionadas: React.Dispatch<React.SetStateAction<string[]>>;
	onApply: () => void;
	onClear: () => void;
}

export function TableAdvancedFilters(props: TableAdvancedFilters) {
	return (
		<Dialog open={props.dialogOpen} onOpenChange={props.setDialogOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Filtros Avançados</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-3">
					{/* Preço Venda */}
					<RangeSliderFilter
						label={"Preço Venda"}
						min={props.venda.minLimit}
						max={props.venda.maxLimit}
						value={[props.venda.min, props.venda.max]}
						onChange={([min, max]) => {
							props.venda.setMin(min);
							props.venda.setMax(max);
						}}
						minInputId={"venda-min-input"}
						maxInputId={"venda-max-input"}
					/>
					<hr />
					{/* Preço Unitário */}
					<RangeSliderFilter
						label={"Preço Unitário"}
						min={props.unitario.minLimit}
						max={props.unitario.maxLimit}
						value={[props.unitario.min, props.unitario.max]}
						onChange={([min, max]) => {
							props.unitario.setMin(min);
							props.unitario.setMax(max);
						}}
						minInputId={"unitario-min-input"}
						maxInputId={"unitario-max-input"}
					/>
					<hr />
					{/* Unidades */}
					<div>
						<label className="font-medium text-sm">Unidades</label>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{props.unidades.map((item) => (
								<label key={item} className="flex items-center gap-1 text-sm">
									<Checkbox
										checked={props.tempUnidadesSelecionadas.includes(item)}
										onCheckedChange={(checked) => {
											props.setTempUnidadesSelecionadas((prev) =>
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
					<Button variant="secondary" onClick={props.onClear}>
						Limpar filtros
					</Button>
					<Button onClick={props.onApply}>Aplicar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export function ColumnFilter<TData>({
	table,
	columnLabels,
}: {
	table: Table<TData>;
	columnLabels: Record<string, string>;
}) {
	return (
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
