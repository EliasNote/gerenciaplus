import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export function AdicionarFornecedor({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Novo Fornecedor</DialogTitle>
				</DialogHeader>
				<form
					// onSubmit={handleSubmit}
					className="flex flex-col gap-4"
				>
					{/* Campos do fornecedor aqui */}
				</form>
			</DialogContent>
		</Dialog>
	);
}
