'use client'; 

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { criarLoja, criarProfile } from '@/services/loja.service';

export default function Cadastro() {
    const router = useRouter();
    const supabase = createClient();

    const [step, setStep] = useState(1);

    const [enterpriseName, setEnterpriseName] = useState('');
    const [cnpj, setCnpj] = useState('');

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (!enterpriseName || !cnpj) {
            setError('Preencha todos os campos.');
            return;
        }
        setError(null);
        setStep(2);
    };

    const handleCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        let lojaId: string | undefined;
        try {
            const loja = await criarLoja(enterpriseName, cnpj);
            lojaId = loja.id;
            if (!lojaId) {
                setError('Erro ao criar loja: ID não retornado.');
                return;
            }
        } catch (e: any) {
            setError(e.message || 'Erro ao criar loja');
            return;
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        });

        try {
            const loja = await criarProfile(data.user!.id, username, name, lastName, lojaId);
            lojaId = loja.id;
            if (!lojaId) {
                setError('Erro ao criar profile: ID não retornado.');
                return;
            }
        } catch (e: any) {
            setError(e.message || 'Erro ao criar profile');
            return;
        }

        if (signUpError) {
            setError(signUpError.message);
            return;
        }

        router.push('/login');
    };

    return (
        <section className="flex font-mono justify-center items-center w-screen h-screen bg-primary">
            <div className="text-color-primary p-[40px] rounded-[10px] shadow-lg bg-white-custom max-w-[360px] w-full">
                <h2 className="mb-[20px] text-2xl font-bold text-center">Cadastro</h2>
                {step === 1 ? (
                    <form className="flex flex-col gap-2" onSubmit={handleNext}>
                        <div className="mb-4">
                            <label htmlFor="enterpriseName" className="block mb-1">
                                Nome da empresa
                            </label>
                            <input
                                type="text"
                                id="enterpriseName"
                                name="enterpriseName"
                                className="w-full px-3 py-2 rounded border-gray-medium"
                                placeholder="Digite o nome da empresa"
                                required
                                value={enterpriseName}
                                onChange={(e) => setEnterpriseName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cnpj" className="block mb-1">
                                Cnpj
                            </label>
                            <input
                                type="text"
                                id="cnpj"
                                name="cnpj"
                                className="w-full px-3 py-2 rounded border-gray-medium"
                                placeholder="Digite o CNPJ"
                                required
                                value={cnpj}
                                onChange={(e) => setCnpj(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full font-semibold py-2 rounded cursor-pointer bg-button-custom"
                        >
                            Próximo
                        </button>
                    </form>
                ) : (
                    <form className="flex flex-col gap-2" onSubmit={handleCadastro}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-1">
                                Nome de Usuário
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full px-3 py-2 rounded border-gray-medium"
                                placeholder="Digite seu nome de usuário"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-1">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 py-2 rounded border-gray-medium"
                                placeholder="Digite seu nome"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block mb-1">
                                Sobrenome
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="w-full px-3 py-2 rounded border-gray-medium"
                                placeholder="Digite seu sobrenome"
                                required
                                value={lastName}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
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
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block mb-1">
                                Confirmar Senha
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="w-full px-3 py-2 rounded border-gray-medium"
                                placeholder="Confirme sua senha"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full font-semibold py-2 rounded cursor-pointer bg-button-custom"
                        >
                            Concluir
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}