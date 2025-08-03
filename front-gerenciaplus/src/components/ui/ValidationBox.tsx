import React from "react";

interface ValidationBoxProps {
	errors: string[];
}

export default function ValidationBox({ errors }: ValidationBoxProps) {
	if (!errors.length) return null;
	return (
		<div className="bg-red-100 border border-red-400 rounded p-3 text-red-700 text-sm flex flex-col gap-2">
			<span className="font-semibold mb-1">Corrija os seguintes erros:</span>
			<ul className="list-disc ml-4">
				{errors.map((err, idx) => (
					<li key={idx}>{err}</li>
				))}
			</ul>
		</div>
	);
}
