import { useMemo, useState, useEffect } from "react";
import type { Produto } from "@/app/inventory/columns";
import type { DefinitiveFilters } from "@/components/inventory/Filters";

export function useTableFilters(data: Produto[]) {
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

	useEffect(() => {
		setDefinitive((prev) => ({
			...prev,
			minVenda: precoVendaMin,
			maxVenda: precoVendaMax,
			minUnitario: precoUnitarioMin,
			maxUnitario: precoUnitarioMax,
		}));
	}, [precoVendaMin, precoVendaMax, precoUnitarioMin, precoUnitarioMax]);

	return {
		precoVendaMin,
		precoVendaMax,
		precoUnitarioMin,
		precoUnitarioMax,
		unidades,
		definitive,
		setDefinitive,
	};
}
