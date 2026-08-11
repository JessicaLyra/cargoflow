import { AppLayout } from "@/components/layout/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div>
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Área de conteúdo
        </h2>

        <p className="mt-2 text-base text-[var(--text-secondary)]">
          O conteúdo das páginas será exibido aqui.
        </p>
      </div>
    </AppLayout>
  );
}