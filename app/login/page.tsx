"use client";

import {
  ArrowRight,
  FileCheck2,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import {
  loginSchema,
  type LoginFormData,
} from "@/lib/validations/login";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    router.push("/dashboard");
  }

  return (
    <main className="grid min-h-screen w-full lg:grid-cols-[1.02fr_0.98fr]">
      {/* Painel visual */}
      <section
        aria-label="Apresentação do CargoFlow"
        className="relative hidden min-h-screen overflow-hidden bg-cover bg-center lg:flex"
        style={{
          backgroundImage: "url('/images/bg-login.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#07152C]/82" />

        <div className="absolute inset-0 bg-gradient-to-br from-[#07152C]/35 via-[#0B1D3A]/30 to-[#1D4ED8]/20" />

        <div className="animate-fade-right relative z-10 flex w-full flex-col justify-between p-10 xl:p-14 2xl:p-16">
          <Logo variant="light" />

          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
              Gestão de importações
            </p>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.035em] text-white xl:text-6xl">
              Operações mais simples, organizadas e seguras.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-200">
              Centralize documentos e acompanhe processos de importação em uma
              interface desenvolvida para facilitar sua operação.
            </p>

            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <FileCheck2
                    aria-hidden="true"
                    size={22}
                    strokeWidth={2}
                  />
                </div>

                <p className="mt-4 text-base font-semibold text-white">
                  Documentos organizados
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Informações centralizadas para facilitar a operação.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <ShieldCheck
                    aria-hidden="true"
                    size={22}
                    strokeWidth={2}
                  />
                </div>

                <p className="mt-4 text-base font-semibold text-white">
                  Operação segura
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
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
      <section
        aria-labelledby="login-title"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[url('/images/bg-login.jpg')] bg-cover bg-center px-4 py-8 sm:px-6 lg:bg-[url('/images/bg-login-light.png')] lg:bg-cover lg:bg-center lg:px-10 xl:px-14"
      >
        {/* Overlay mobile: igual ao painel esquerdo */}
        <div className="absolute inset-0 bg-[#07152C]/82 lg:hidden" />

        {/* Overlay desktop: mantém o fundo claro */}
        <div className="absolute inset-0 hidden bg-white/45 backdrop-blur-[1px] lg:block" />

        {/* Detalhe decorativo somente no desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[7%] top-[8%] hidden grid-cols-4 gap-3 lg:grid"
        >
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="size-1.5 rounded-full bg-blue-400/60"
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[520px]">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo variant="light" />
          </div>

          <div className="animate-fade-up rounded-[28px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mb-9">
              <p className="mb-3 text-base font-semibold text-[var(--primary)]">
                Bem-vindo de volta
              </p>

              <h2
                id="login-title"
                className="text-3xl font-semibold tracking-[-0.025em] text-[var(--text-primary)] sm:text-4xl"
              >
                Acesse sua conta
              </h2>

              <p className="mt-4 max-w-md text-base leading-7 text-[var(--text-secondary)]">
                Informe seus dados para acessar o CargoFlow.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2.5 block text-sm font-semibold text-[var(--text-primary)]"
                >
                  E-mail
                </label>

                <div className="relative">
                  <Mail
                    aria-hidden="true"
                    size={19}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="email"
                    type="email"
                    placeholder="nome@empresa.com.br"
                    autoComplete="email"
                    error={errors.email?.message}
                    className="h-14 rounded-xl pl-12 text-base"
                    {...register("email")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2.5 block text-sm font-semibold text-[var(--text-primary)]"
                >
                  Senha
                </label>

                <div className="relative">
                  <LockKeyhole
                    aria-hidden="true"
                    size={19}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    error={errors.password?.message}
                    className="h-14 rounded-xl pl-12 text-base"
                    {...register("password")}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-xl text-base font-semibold shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle
                        size={19}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight
                        aria-hidden="true"
                        size={19}
                      />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[var(--border)]" />

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Acesso exclusivo
              </span>

              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>

            <p className="mt-6 text-center text-sm leading-6 text-[var(--text-secondary)]">
              Acesso exclusivo para usuários autorizados.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}