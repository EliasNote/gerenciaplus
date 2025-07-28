"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { criarLoja, criarProfile } from "@/services/loja.service";
import Lottie from "lottie-react";
import mailAnimation from "@/../public/animation/mail.json";
import loadingAnimation from "@/../public/animation/Loading.json";
import successAnimation from "@/../public/animation/Success.json";
import Link from "next/link";
import PasswordEyeIcon from "../../hooks/PasswordEyeIcon";
import ValidationBox from "@/hooks/ValidationBox";

function getStep1Errors(enterpriseName: string, cnpj: string) {
  const errors: string[] = [];
  if (!enterpriseName) errors.push("Digite o nome da empresa.");
  if (!cnpj) errors.push("Digite o CNPJ.");
  return errors;
}

function getStep2Errors(
  username: string,
  name: string,
  lastName: string,
  email: string,
  password: string
) {
  const errors: string[] = [];
  if (!username) errors.push("Digite o nome de usuário.");
  if (!name) errors.push("Digite seu nome.");
  if (!lastName) errors.push("Digite seu sobrenome.");
  if (!email || !email.includes("@")) errors.push("E-mail inválido.");
  if (!password || password.length < 6)
    errors.push("A senha deve ter pelo menos 6 caracteres.");
  return errors;
}

export default function Cadastro() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [enterpriseName, setEnterpriseName] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  const handleClose = () => {
    router.push("/login");
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    const errors = getStep1Errors(enterpriseName, cnpj);

    if (errors.length > 0) {
      setError("Preencha todos os campos.");
      setFieldErrors(errors);
      return;
    }
    setError(null);
    setFieldErrors([]);
    setStep(2);
    setShowValidation(false);
  };

  const handleCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowValidation(true);
    setError(null);

    const errors = getStep2Errors(username, name, lastName, email, password);

    setFieldErrors(errors);

    if (errors.length > 0) {
      setLoading(false);
      return;
    }

    setLoading(true);

    let lojaId: string | undefined;
    try {
      const loja = await criarLoja(enterpriseName, cnpj);
      lojaId = loja.id;
      if (!lojaId) {
        throw new Error("ID da loja não retornado.");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao criar loja");
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    try {
      const profile = await criarProfile(
        data.user!.id,
        username,
        name,
        lastName,
        lojaId
      );
      if (!profile.id) {
        throw new Error("ID do perfil não retornado.");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao criar perfil");
      setLoading(false);
      return;
    }

    setLoading(false);
    setShowSuccessIcon(true);
    setTimeout(() => {
      setShowSuccessIcon(false);
      setSuccess(true);
      setShowConfirmEmail(true);
    }, 1500);
  };

  return (
    <section className="flex font-regular justify-center items-center w-full h-screen bg-primary bg-image">
      {success ? (
        <div className="flex flex-col items-center text-center p-8  w-full max-w-[460px] bg-white-custom rounded-[10px] shadow-lg">
          <Lottie
            animationData={mailAnimation}
            loop={false}
            className="w-[280px]"
          />
          <div
            className={`transition-opacity duration-700 ease-in-out ${
              showConfirmEmail ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mb-[20px]">
              <h3 className="text-xl font-bold color-secondary mb-2">
                Cadastro realizado com sucesso!
              </h3>
              <p>Verifique seu e-mail para confirmar o cadastro.</p>
            </div>
            <button
              className="w-1/2 font-semibold py-2 rounded cursor-pointer border-gray-dark bg-button-email"
              onClick={handleClose}
            >
              Ir para Login
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 color-black p-[40px] rounded-[10px] shadow-lg bg-white-custom max-w-[360px] w-full">
          <h2 className="text-2xl font-bold text-center">Cadastro</h2>
          <div className="w-full flex flex-row gap-4">
            <div
              className={`h-[6px] w-md rounded transition-all duration-500 ${
                step === 1
                  ? "bg-secondary scale-x-100"
                  : "bg-gray-light scale-x-100"
              }`}
            ></div>
            <div
              className={`h-[6px] w-md rounded transition-all duration-500 ${
                step === 2
                  ? "bg-secondary scale-x-100"
                  : "bg-gray-light scale-x-100"
              }`}
            ></div>
          </div>
          {step === 1 && (
            <form className="flex flex-col gap-5" onSubmit={handleNext}>
              <div className="">
                <label htmlFor="enterpriseName" className="block mb-1">
                  Nome da empresa
                </label>
                <input
                  type="text"
                  id="enterpriseName"
                  name="enterpriseName"
                  className={`w-full px-3 py-2 rounded border-gray-medium ${
                    error && !enterpriseName ? "border-error" : ""
                  }`}
                  placeholder="Digite o nome da empresa"
                  value={enterpriseName}
                  onChange={(e) => setEnterpriseName(e.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="cnpj" className="block mb-1">
                  CNPJ
                </label>
                <input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  className={`w-full px-3 py-2 rounded border-gray-medium ${
                    error && !cnpj ? "border-error" : ""
                  }`}
                  placeholder="Digite o CNPJ"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </div>
              {showValidation && (
                <ValidationBox errors={getStep1Errors(enterpriseName, cnpj)} />
              )}
              <button
                type="submit"
                className="w-full font-semibold py-2 rounded cursor-pointer bg-button-custom"
              >
                Próximo
              </button>
            </form>
          )}
          {step === 2 && (
            <form
              className={`flex flex-col gap-5 mb-[5px] ${
                loading ? "opacity-60 pointer-events-none" : ""
              }`}
              onSubmit={handleCadastro}
            >
              <div className="">
                <label htmlFor="username" className="block mb-1">
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={`w-full px-3 py-2 rounded border-gray-medium ${
                    fieldErrors.find((e) => e.toLowerCase().includes("usuário"))
                      ? "border-error"
                      : ""
                  }`}
                  placeholder="Digite seu nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="">
                <label htmlFor="name" className="block mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full px-3 py-2 rounded border-gray-medium ${
                    fieldErrors.find((e) => e.toLowerCase().includes("nome."))
                      ? "border-error"
                      : ""
                  }`}
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="">
                <label htmlFor="lastName" className="block mb-1">
                  Sobrenome
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`w-full px-3 py-2 rounded border-gray-medium ${
                    fieldErrors.find((e) =>
                      e.toLowerCase().includes("sobrenome")
                    )
                      ? "border-error"
                      : ""
                  }`}
                  placeholder="Digite seu sobrenome"
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="">
                <label htmlFor="email" className="block mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-3 py-2 rounded border-gray-medium ${
                    fieldErrors.find((e) => e.toLowerCase().includes("e-mail"))
                      ? "border-error"
                      : ""
                  }`}
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="">
                <label htmlFor="password" className="block mb-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`w-full px-3 py-2 rounded border-gray-medium pr-10 ${
                      fieldErrors.find((e) => e.toLowerCase().includes("senha"))
                        ? "border-error"
                        : ""
                    }`}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <PasswordEyeIcon
                    showPassword={showPassword}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </div>
              </div>
              {showValidation && (
                <ValidationBox
                  errors={getStep2Errors(
                    username,
                    name,
                    lastName,
                    email,
                    password
                  )}
                />
              )}
              <div className="flex justify-center gap-2">
                {loading ? (
                  <Lottie
                    animationData={loadingAnimation}
                    className="w-[100px]"
                  />
                ) : showSuccessIcon ? (
                  <Lottie
                    animationData={successAnimation}
                    className="w-[100px]"
                  />
                ) : (
                  <>
                    <button
                      type="button"
                      className="w-1/2 font-semibold py-2 rounded cursor-pointer bg-button-back"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 font-semibold py-2 rounded cursor-pointer bg-button-custom"
                    >
                      Concluir
                    </button>
                  </>
                )}
              </div>
            </form>
          )}
          <p className="text-[13px] color-secondary m-auto">
            <span className="text-foreground dark:text-white">
              Já possui conta?
            </span>
            <Link href="/login" className="font-bold ml-1">
              Login
            </Link>
          </p>
        </div>
      )}
    </section>
  );
}
