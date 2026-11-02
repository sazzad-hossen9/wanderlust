export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-10 pb-24">
      <div className="flex items-center justify-between gap-3">
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        <div className="flex gap-2">
          <div className="h-9 w-24 animate-pulse rounded-[4px] bg-muted" />
          <div className="h-9 w-24 animate-pulse rounded-[4px] bg-muted" />
        </div>
      </div>

      <div className="mt-5 aspect-[2.8/1] w-full animate-pulse rounded-md bg-brand-tint" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_352px]">
        <div className="grid content-start gap-4">
          <div className="h-4 w-28 animate-pulse rounded bg-brand-tint" />
          <div className="h-10 w-72 animate-pulse rounded bg-brand-tint" />
          <div className="h-4 w-64 animate-pulse rounded bg-brand-tint" />
          <div className="mt-6 h-5 w-32 animate-pulse rounded bg-brand-tint" />
          <div className="h-4 w-full max-w-xl animate-pulse rounded bg-brand-tint" />
          <div className="h-4 w-3/4 max-w-xl animate-pulse rounded bg-brand-tint" />
        </div>
        <div className="h-96 animate-pulse rounded-[4px] bg-brand-tint" />
      </div>
    </main>
  );
}
