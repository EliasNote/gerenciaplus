import { Input } from "../ui/input";

export function FormField({
	id,
	label,
	value,
	onChange,
	error,
	type = "text",
}: {
	id: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	type?: string;
}) {
	return (
		<div className="flex-1 flex flex-col gap-1">
			<label htmlFor={id} className="text-sm font-medium">
				{label}
			</label>
			<Input
				id={id}
				name={id}
				value={value}
				onChange={onChange}
				aria-invalid={!!error}
				type={type}
				className={error ? "border-red-500" : ""}
			/>
			{error && <span className="text-red-500 text-xs">{error}</span>}
		</div>
	);
}
