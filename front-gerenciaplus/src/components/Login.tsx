export default function Home() {
	return (
		<section className="flex font-mono justify-center items-center w-screen h-screen bg-primary">
			<div className="text-color-primary p-[40px] rounded-[10px] shadow-lg bg-white-custom max-w-[380px] w-full">
				<h2 className="mb-[20px] text-2xl font-bold text-center">Login</h2>
				<form className="flex flex-col gap-2">
					<div className="mb-4">
						<label htmlFor="email" className="block mb-1">
							E-mail
						</label>
						<input
							type="text"
							id="email"
							name="email"
							className="w-full px-3 py-2 rounded border-gray-medium"
							placeholder="Digite seu email"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="block mb-1">
							Senha
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full px-3 py-2 rounded border-gray-medium"
							placeholder="Digite sua senha"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full font-semibold py-2 rounded cursor-pointer bg-button-custom"
					>
						Entrar
					</button>
				</form>
			</div>
		</section>
	);
}
