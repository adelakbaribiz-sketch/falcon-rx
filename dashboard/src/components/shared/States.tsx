// Honest UI-state demonstrations (empty / loading / error), per the portfolio checklist —
// these are shown deliberately in the Backtest Demo page via a state toggle, not hidden away.

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-border py-12 text-center dark:border-border-dark">
      <p className="text-sm font-medium text-ink-dim dark:text-ink-dark-dim">{title}</p>
      {hint && <p className="max-w-sm text-xs text-ink-dim dark:text-ink-dark-dim">{hint}</p>}
    </div>
  )
}

export function LoadingState({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border py-12 px-4 justify-center dark:border-border-dark">
      <span className="h-3 w-3 animate-pulse rounded-full bg-accent" />
      <span className="text-sm text-ink-dim dark:text-ink-dark-dim">{label}…</span>
    </div>
  )
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-md border border-simulated/40 bg-simulated-soft py-12 text-center">
      <p className="text-sm font-medium text-simulated">Something went wrong</p>
      <p className="max-w-sm text-xs text-simulated/80">{message}</p>
    </div>
  )
}
