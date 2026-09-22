import type { ReactNode } from 'react'

export function Card({
  title,
  action,
  children,
  className = '',
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-lg border border-border bg-paper-raised dark:border-border-dark dark:bg-paper-dark-raised ${className}`}
    >
      {title && (
        <header className="flex items-center justify-between border-b border-border px-4 py-3 dark:border-border-dark">
          <h3 className="text-sm font-semibold text-ink dark:text-ink-dark">{title}</h3>
          {action}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  )
}
