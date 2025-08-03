"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";
import PasswordEyeIcon from "../ui/PasswordEyeIcon";
import ValidationBox from "@/components/ui/ValidationBox";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";

function getLoginErrors(email: string, password: string) {
	const errors: string[] = [];
	if (!email) errors.push("Preencha o campo de e-mail.");
	if (!password) errors.push("Preencha o campo de senha.");
	return errors;
}

function translateError(msg: string) {
	if (msg.includes("missing email or phone")) {
		return "Preencha o campo de e-mail.";
	}
	if (msg.includes("Email not confirmed")) {
		return "Confirme seu e-mail antes de fazer login.";
	}
	if (
		msg.includes("Invalid Refresh Token") ||
		msg.includes("Failed to load resource")
	) {
		return "Confirme seu e-mail antes de fazer login.";
	}
	if (msg.includes("Invalid login credentials")) {
		return "E-mail ou senha inválidos.";
	}
	return msg;
}

export default function Login() {
	const supabase = createClient();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<string[]>([]);

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setFieldErrors([]);

		const errors = getLoginErrors(email, password);

		if (errors.length > 0) {
			setFieldErrors(errors);
			return;
		}

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(translateError(error.message));
		} else {
			router.replace("/dashboard");
		}
	};

	return (
		<section className="flex font-regular justify-center items-center w-screen h-screen bg-blizzard-blue bg-image p-8">
			<div className="flex flex-col gap-5 items-center text-eerie-black p-[40px] rounded-[10px] shadow-lg bg-white max-w-[360px] w-full">
				<h2 className="text-2xl font-bold text-center">Login</h2>
				<form className="flex flex-col gap-5" onSubmit={handleLogin}>
					<div className="">
						<label htmlFor="email" className="block mb-1 placeholder-color">
							E-mail
						</label>
						<Input
							type="email"
							id="email"
							name="email"
							placeholder="Digite seu email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={`${
								fieldErrors.find((e) => e.toLowerCase().includes("e-mail")) ||
								(error &&
									(error.toLowerCase().includes("e-mail") ||
										error.toLowerCase().includes("email") ||
										error.toLowerCase().includes("preencha")))
									? "border-error"
									: ""
							}`}
						/>
					</div>
					<div className="">
						<label htmlFor="password" className="block mb-1 placeholder-color">
							Senha
						</label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								placeholder="Digite sua senha"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={`pr-10 ${
									fieldErrors.find((e) => e.toLowerCase().includes("senha")) ||
									(error &&
										(error.toLowerCase().includes("senha") ||
											error.toLowerCase().includes("inválidos")))
										? "border-error"
										: ""
								}`}
							/>
							<PasswordEyeIcon
								showPassword={showPassword}
								onClick={() => setShowPassword((prev) => !prev)}
							/>
						</div>
						<Link href="/reset" className="text-[13px] text-sapphire font-bold">
							Recuperar senha
						</Link>
					</div>
					{(fieldErrors.length > 0 || error) && (
						<ValidationBox
							errors={[
								...fieldErrors,
								...(error ? [translateError(error)] : []),
							]}
						/>
					)}
					<button
						type="submit"
						className="w-full font-medium py-2 rounded cursor-pointer bg-sapphire text-static-white hover:bg-gun-powder-transparent"
					>
						Entrar
					</button>
				</form>
				<p className="text-[13px]">
					<span className="text-eerie-black">Não possui conta?</span>
					<Link href="/cadastro" className="font-bold ml-1 text-sapphire">
						Cadastrar
					</Link>
				</p>
			</div>
		</section>
	);
}
