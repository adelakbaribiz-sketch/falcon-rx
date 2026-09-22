import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '../components/shared/Card'
import { Badge } from '../components/shared/Badge'
import { EmptyState, ErrorState, LoadingState } from '../components/shared/States'
import { runSimulatedDemo } from '../data/demoBacktest'
import { defaultParams } from '../data/strategyParams'

type DemoUiState = 'success' | 'loading' | 'error' | 'empty'

export function BacktestDemo() {
  const [uiState, setUiState] = useState<DemoUiState>('success')
  const [seed, setSeed] = useState(42)

  const result = useMemo(() => runSimulatedDemo(defaultParams, seed, 2000), [seed])
  const chartData = useMemo(
    () => result.ticks.filter((_, i) => i % 4 === 0).map((t) => ({ t: t.t, price: t.price, reference: t.reference })),
    [result],
  )
  const equityData = useMemo(
    () => result.ticks.filter((_, i) => i % 4 === 0).map((t) => ({ t: t.t, equity: t.equity })),
    [result],
  )

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          Backtest demo
          <Badge tone="simulated" />
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-dim dark:text-ink-dark-dim">
          Every number on this page comes from a synthetic random-walk price series generated in
          the browser, not from real Bitvavo BTC/EUR market data. No historical dataset has been
          acquired yet (see project status). This page exists to demonstrate the state machine and
          dashboard UI end-to-end, not to report a trading result.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-ink-dim dark:text-ink-dark-dim">UI state demo:</span>
        {(['success', 'loading', 'error', 'empty'] as DemoUiState[]).map((s) => (
          <button
            key={s}
            onClick={() => setUiState(s)}
            className={`rounded-md border px-2 py-1 capitalize transition-colors ${
              uiState === s
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-border text-ink-dim hover:border-accent/50 dark:border-border-dark dark:text-ink-dark-dim'
            }`}
          >
            {s}
          </button>
        ))}
        {uiState === 'success' && (
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="ml-auto rounded-md border border-border px-2 py-1 text-ink-dim hover:border-accent/50 dark:border-border-dark dark:text-ink-dark-dim"
          >
            Re-roll synthetic seed
          </button>
        )}
      </div>

      {uiState === 'loading' && <LoadingState label="Simulating" />}
      {uiState === 'error' && <ErrorState message="Synthetic simulation failed to converge (demo of the error state — not a real fault)." />}
      {uiState === 'empty' && (
        <EmptyState
          title="No simulation run yet"
          hint="This is a demo of the empty state a real backtest run would show before any data exists."
        />
      )}

      {uiState === 'success' && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card title="Final equity multiple">
              <p className="text-2xl font-semibold tabular">{result.finalEquityMultiple.toFixed(3)}×</p>
              <p className="text-xs text-ink-dim dark:text-ink-dark-dim">simulated, {result.trades.length} synthetic trades</p>
            </Card>
            <Card title="Max drawdown">
              <p className="text-2xl font-semibold tabular">{result.maxDrawdownPercent.toFixed(2)}%</p>
              <p className="text-xs text-ink-dim dark:text-ink-dark-dim">on synthetic equity curve</p>
            </Card>
            <Card title="Synthetic trades">
              <p className="text-2xl font-semibold tabular">{result.trades.length}</p>
              <p className="text-xs text-ink-dim dark:text-ink-dark-dim">over 2000 simulated ticks</p>
            </Card>
          </div>

          <Card title="Synthetic price vs. reference (SIMULATED)">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="t" tick={{ fontSize: 11 }} stroke="var(--color-ink-dim)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-ink-dim)" domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="price" stroke="var(--color-accent)" dot={false} strokeWidth={1.5} />
                <Line type="monotone" dataKey="reference" stroke="var(--color-unknown)" dot={false} strokeWidth={1} strokeDasharray="4 3" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Synthetic equity curve (SIMULATED)">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={equityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="t" tick={{ fontSize: 11 }} stroke="var(--color-ink-dim)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-ink-dim)" domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="equity" stroke="var(--color-confirmed)" fill="var(--color-confirmed-soft)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}
    </div>
  )
}
