import { NavLink, Outlet } from 'react-router-dom'
import { Badge } from '../shared/Badge'

const navItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/research', label: 'Research' },
  { to: '/strategy', label: 'Strategy Parameters' },
  { to: '/backtest', label: 'Backtest Demo' },
  { to: '/docs', label: 'Documentation' },
]

export function Shell() {
  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-paper-dark dark:text-ink-dark">
      <header className="sticky top-0 z-10 border-b border-border bg-paper/90 backdrop-blur dark:border-border-dark dark:bg-paper-dark/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-semibold tracking-tight text-accent">FALCON-RX</span>
            <span className="hidden text-xs text-ink-dim sm:inline dark:text-ink-dark-dim">
              Independent micro-mean-reversion research
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="simulated">Research build — no live trading</Badge>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-accent-soft text-accent font-medium'
                    : 'text-ink-dim hover:bg-paper-raised dark:text-ink-dark-dim dark:hover:bg-paper-dark-raised'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-6xl px-4 py-6 text-xs text-ink-dim dark:text-ink-dark-dim">
        FALCON-RX is an independent research project. It is not affiliated with, endorsed by, or
        built from proprietary source of any third-party product referenced in its research notes.
        Demo/simulated data is labeled throughout — see{' '}
        <a className="underline hover:text-accent" href="/docs">
          Documentation
        </a>{' '}
        for status detail.
      </footer>
    </div>
  )
}
