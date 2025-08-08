import { Slider } from "@mui/material";

interface RangeSliderFilterProps {
	label: string;
	min: number;
	max: number;
	value: [number, number];
	onChange: (value: [number, number]) => void;
	minInputId: string;
	maxInputId: string;
}

export function RangeSliderFilter({
	label,
	min,
	max,
	value,
	onChange,
	minInputId,
	maxInputId,
}: RangeSliderFilterProps) {
	return (
		<div>
			<label className="font-medium text-sm">{label}</label>
			<Slider
				value={value}
				min={min}
				max={max}
				onChange={(_, newValue) => {
					onChange([newValue[0], newValue[1]]);
				}}
				valueLabelDisplay="auto"
			/>
			<div className="flex gap-2 justify-between">
				<div className="flex flex-col items-start">
					<label
						htmlFor={minInputId}
						className="text-xs text-muted-foreground mb-1"
					>
						Mín
					</label>
					<input
						id={minInputId}
						type="number"
						className="w-24 px-2 py-1 rounded border text-[14px] bg-background"
						value={value[0]}
						min={min}
						max={max}
						onChange={(e) => onChange([Number(e.target.value), value[1]])}
					/>
				</div>
				<div className="flex flex-col items-end">
					<label
						htmlFor={maxInputId}
						className="text-xs text-muted-foreground mb-1"
					>
						Máx
					</label>
					<input
						id={maxInputId}
						type="number"
						className="w-24 px-2 py-1 rounded border text-[14px] bg-background"
						value={value[1]}
						min={min}
						max={max}
						onChange={(e) => onChange([value[0], Number(e.target.value)])}
					/>
				</div>
			</div>
		</div>
	);
}
