"use client";

import { FileCheck2, ShieldCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormData,
} from "@/lib/validations/login";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit() {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula uma requisição
        setIsLoading(false);
        router.push("/");
    }
  return (
    <main className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Painel visual */}
      <section
        className="relative hidden min-h-screen overflow-hidden bg-cover bg-center lg:flex"
        style={{
          backgroundImage: "url('/images/bg-login.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0F172A]/80" />

        {/* Gradiente adicional */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/40 via-transparent to-[#2563EB]/20" />

        {/* Conteúdo */}
        <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
          <Logo variant="light" />

          <div className="max-w-xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-blue-300">
              Gestão de importações
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
              Operações mais simples, organizadas e seguras.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
              Centralize documentos e acompanhe processos de importação em uma
              interface desenvolvida para facilitar sua operação.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <FileCheck2
                  className="text-blue-300"
                  size={22}
                  strokeWidth={2}
                />

                <p className="mt-3 text-sm font-medium text-white">
                  Documentos organizados
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-300">
                  Informações centralizadas para facilitar a operação.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <ShieldCheck
                  className="text-blue-300"
                  size={22}
                  strokeWidth={2}
                />

                <p className="mt-3 text-sm font-medium text-white">
                  Operação segura
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-300">
                  Processos organizados com maior controle e clareza.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400">
            CargoFlow · Gestão inteligente de importações
          </p>
        </div>
      </section>

      {/* Área de login */}
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[url('/images/bg-login.jpg')] bg-cover bg-center px-5 py-10 sm:px-10 lg:bg-none lg:bg-[var(--background)]">        {/* Detalhes sutis de fundo */}
        <div className="absolute inset-0 bg-[#0F172A]/80 lg:hidden" />
        <div className="pointer-events-none absolute -right-32 -top-32 hidden size-80 rounded-full bg-blue-100/60 blur-3xl lg:block" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 hidden size-96 rounded-full bg-slate-200/70 blur-3xl lg:block" />
        <div className="relative z-10 w-full max-w-md">
          {/* Logo mobile */}
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo variant="light" />
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-[var(--primary)]">
                Bem-vindo de volta
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                Acesse sua conta
              </h2>

              <p className="mt-3 text-base leading-6 text-[var(--text-secondary)]">
                Informe seus dados para acessar o CargoFlow.
              </p>
            </div>

            <form  onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                id="email"
                name="email"
                type="email"
                label="E-mail"
                placeholder="nome@empresa.com.br"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Senha"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password")}
              />

              <div className="pt-2">
                <Button type="submit"
                    className="w-full"
                    disabled={isLoading}
                    >
                    {isLoading && (
                        <LoaderCircle
                        size={18}
                        className="animate-spin"
                        aria-hidden="true"
                        />
                    )}

                    {isLoading ? "Entrando..." : "Entrar"}
                  
                </Button>
              </div>
            </form>

            <div className="mt-7 border-t border-[var(--border)] pt-6">
              <p className="text-center text-sm text-[var(--text-secondary)]">
                Acesso exclusivo para usuários autorizados.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}