export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-8 w-72 max-w-full rounded bg-slate-200" />
          <div className="h-5 w-96 max-w-full rounded bg-slate-200" />
        </div>

        <div className="h-11 w-40 rounded-xl bg-slate-200" />
      </div>

      <section className="rounded-2xl border border-[var(--border)] bg-white p-6 lg:p-8">
        <div className="space-y-3">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="h-7 w-64 max-w-full rounded bg-slate-200" />
          <div className="h-4 w-80 max-w-full rounded bg-slate-100" />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center gap-4">
              <div className="size-16 shrink-0 rounded-full bg-slate-200" />

              <div className="flex-1 space-y-3">
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="h-8 w-14 rounded bg-slate-200" />
                <div className="h-3 w-28 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-2xl border border-[var(--border)] bg-white p-6">
            <div className="flex items-center gap-5">
              <div className="size-16 rounded-2xl bg-slate-200" />

              <div className="space-y-3">
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="h-9 w-16 rounded bg-slate-200" />
              </div>
            </div>

            <div className="mt-7 h-4 w-44 rounded bg-slate-100" />
          </div>
        ))}
      </section>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1.7fr)_minmax(360px,0.8fr)]">
        <div className="h-96 rounded-2xl border border-[var(--border)] bg-white" />
        <div className="h-96 rounded-2xl border border-[var(--border)] bg-white" />
      </section>
    </div>
  );
}