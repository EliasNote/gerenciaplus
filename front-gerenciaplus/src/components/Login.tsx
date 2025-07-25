'use client'; 

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const supabase = createClient();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/');
            router.refresh();
        }
    };

    return (
        <section className="flex font-mono justify-center items-center w-screen h-screen bg-primary">
            <div className="text-color-primary p-[40px] rounded-[10px] shadow-lg bg-white-custom max-w-[360px] w-full">
                <h2 className="mb-[20px] text-2xl font-bold text-center">Login</h2>
                <form className="flex flex-col gap-2" onSubmit={handleLogin}>
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
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
