"use client";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { DataTable } from "@/app/inventory/data-table";
import { columns, Produto } from "@/app/inventory/columns";
import { buscarTodosProdutos } from "@/services/produto.service";

async function getData(
	setLoading: (arg0: boolean) => void
): Promise<Produto[]> {
	const data = await buscarTodosProdutos();
	setLoading(false);
	return data;
}

export default function Inventory() {
	const [data, setData] = useState<Produto[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getData(setLoading).then(setData);
	}, []);

	return (
		<section className="h-screen bg-white">
			<Navbar />
			<DataTable data={data} columns={columns} loading={loading} />
		</section>
	);
}
