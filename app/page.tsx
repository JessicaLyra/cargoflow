import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <Logo />
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Identidade visual
          </h1>

          <p className="mt-2 text-base text-[var(--text-secondary)]">
            Base visual do CargoFlow para interfaces de gestão de documentos de
            importação.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-[var(--primary)] p-5 text-white">
            <p className="text-base opacity-80">Primary</p>
            <p className="mt-2 font-semibold">#2563EB</p>
          </div>

          <div className="rounded-xl bg-[#0F172A] p-5 text-white">
            <p className="text-base opacity-80">Dark</p>
            <p className="mt-2 font-semibold">#0F172A</p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <p className="text-base text-[var(--text-secondary)]">Surface</p>
            <p className="mt-2 font-semibold text-[var(--text-primary)]">
              #FFFFFF
            </p>
          </div>

          <div className="rounded-xl bg-[#F8FAFC] p-5">
            <p className="text-base text-[var(--text-secondary)]">Background</p>
            <p className="mt-2 font-semibold text-[var(--text-primary)]">
              #F8FAFC
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Status
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
  <StatusBadge status="success">
    Concluído
  </StatusBadge>

  <StatusBadge status="processing">
    Processando
  </StatusBadge>

  <StatusBadge status="error">
    Falha
  </StatusBadge>

  <StatusBadge status="info">
    Informação
  </StatusBadge>
</div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-white p-8">
  <h2 className="text-xl font-semibold text-[var(--text-primary)]">
    Componentes
  </h2>

  <div className="mt-6 space-y-8">
    <div>
      <h3 className="mb-4 text-base font-medium text-[var(--text-primary)]">
        Botões
      </h3>

      <div className="flex flex-wrap gap-3">
        <Button>Enviar averbação</Button>

        <Button variant="secondary">
          Cancelar
        </Button>

        <Button variant="danger">
          Excluir
        </Button>

        <Button disabled>
          Processando...
        </Button>
      </div>
    </div>

    <div>
      <h3 className="mb-4 text-base font-medium text-[var(--text-primary)]">
        Campos
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          id="dta-example"
          label="Número da DTA"
          placeholder="Informe o número da DTA"
        />

        <Input
          id="dta-error-example"
          label="Número da DTA"
          placeholder="Informe o número da DTA"
          error="Informe uma DTA válida."
        />
      </div>
    </div>
  </div>
</section>
      </div>
    </main>
  );
}