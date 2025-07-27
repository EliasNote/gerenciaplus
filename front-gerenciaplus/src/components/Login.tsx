"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";

export default function Login() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (
        error.message.includes("Email not confirmed") ||
        error.message.includes("Invalid Refresh Token") ||
        error.message.includes("Failed to load resource")
      ) {
        setError("Confirme seu e-mail antes de fazer login.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <section className="flex font-regular justify-center items-center w-screen h-screen bg-primary">
      <div className="color-black p-[40px] rounded-[10px] shadow-lg bg-white-custom max-w-[360px] w-full">
        <h2 className="mb-[20px] text-2xl font-bold text-center">Login</h2>
        <form className="flex flex-col gap-2 mb-[5px]" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 rounded border-gray-medium"
              placeholder="Digite seu email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link
              href="/reset"
              className="text-[13px] color-secondary font-bold"
            >
              Esqueci minha senha
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full font-semibold py-2 rounded cursor-pointer bg-button-custom"
          >
            Entrar
          </button>
        </form>
        <p className="text-[13px] color-secondary">
          Não possui conta?
          <Link href="/cadastro" className="font-bold ml-1">
            Cadastrar
          </Link>
        </p>
      </div>
    </section>
  );
}
