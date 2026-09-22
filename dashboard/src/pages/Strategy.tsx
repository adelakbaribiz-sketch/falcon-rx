import { useState, type ChangeEvent } from 'react'
import { Card } from '../components/shared/Card'
import { Badge } from '../components/shared/Badge'
import {
  buyTrigger,
  defaultParams,
  paramLabels,
  paramRanges,
  sellTrigger,
  type StrategyParams,
} from '../data/strategyParams'

export function Strategy() {
  const [params, setParams] = useState<StrategyParams>(defaultParams)
  const [samplePrice, setSamplePrice] = useState(60000)

  const set = (key: keyof StrategyParams) => (e: ChangeEvent<HTMLInputElement>) =>
    setParams((p) => ({ ...p, [key]: Number(e.target.value) }))

  const reference = samplePrice
  const dipLow = samplePrice * 0.995
  const entryPrice = samplePrice * 0.997
  const peakHigh = samplePrice * 1.01

  const buy = buyTrigger(reference, dipLow, params)
  const sell = sellTrigger(entryPrice, peakHigh, params)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Strategy parameters</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-dim dark:text-ink-dark-dim">
          Client-side only — no backend, no live order execution. Adjust the sliders to see how
          the confirmed public parameters translate into threshold prices for a sample reference
          price. Trailing-trigger math uses this project's own{' '}
          <Badge tone="inferred">ASSUMED</Badge> Model B interpretation — see{' '}
          <a href="/research" className="underline hover:text-accent">
            Research
          </a>
          .
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Parameters">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-ink-dim dark:text-ink-dark-dim">Sample reference price (€)</span>
              <input
                type="number"
                value={samplePrice}
                onChange={(e) => setSamplePrice(Number(e.target.value))}
                className="rounded-md border border-border bg-paper px-2 py-1 font-mono text-sm tabular dark:border-border-dark dark:bg-paper-dark"
              />
            </label>
            {(Object.keys(defaultParams) as (keyof StrategyParams)[]).map((k) => (
              <label key={k} className="flex flex-col gap-1 text-sm">
                <span className="flex justify-between text-ink-dim dark:text-ink-dark-dim">
                  <span>{paramLabels[k]}</span>
                  <span className="font-mono tabular">{params[k]}%</span>
                </span>
                <input
                  type="range"
                  min={paramRanges[k].min}
                  max={paramRanges[k].max}
                  step={paramRanges[k].step}
                  value={params[k]}
                  onChange={set(k)}
                  className="accent-accent"
                />
              </label>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card title="Buy side (from FLAT)">
            <dl className="space-y-1 font-mono text-sm">
              <Row label="buy threshold" value={buy.buyThreshold} />
              <Row label="buy floor" value={buy.buyFloor} />
              <Row label="trailing trigger" value={buy.trailingTrigger} highlight />
            </dl>
          </Card>
          <Card title="Sell side (from LONG)">
            <dl className="space-y-1 font-mono text-sm">
              <Row label="sell threshold" value={sell.sellThreshold} />
              <Row label="sell floor" value={sell.sellFloor} />
              <Row label="trailing trigger" value={sell.trailingTrigger} highlight />
            </dl>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink-dim dark:text-ink-dark-dim">{label}</dt>
      <dd className={`tabular ${highlight ? 'font-semibold text-accent' : ''}`}>
        €{value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </dd>
    </div>
  )
}
