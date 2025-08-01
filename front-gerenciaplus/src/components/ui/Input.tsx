export const Input = ({
	className,
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
	<input
		{...props}
		className={`w-full px-3 py-2 rounded border-gray-medium ${className}`}
	/>
);
