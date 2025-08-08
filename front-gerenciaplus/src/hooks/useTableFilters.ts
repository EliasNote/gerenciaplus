import { useMemo, useState } from "react";

export interface FilterState {
	minVenda: number;
	maxVenda: number;
	minUnitario: number;
	maxUnitario: number;
	unidadesSelecionadas: string[];
}

export interface UseTableFiltersProps<TData> {
	data: TData[];
}
