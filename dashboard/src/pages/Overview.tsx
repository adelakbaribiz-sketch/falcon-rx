import { Card } from '../components/shared/Card'
import { Badge } from '../components/shared/Badge'
import { StateMachineDiagram } from '../components/statemachine/StateMachineDiagram'
import { defaultParams, paramLabels } from '../data/strategyParams'
import { confirmedFacts, unknowns } from '../data/researchFindings'

export function Overview() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">FALCON-RX Research Dashboard</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-dim dark:text-ink-dark-dim">
          Independent research and behavioral modeling of a micro-mean-reversion crypto trading
          strategy, informed by publicly documented third-party product behavior. No proprietary
          source or trade secret material is used. See{' '}
          <a href="/research" className="underline hover:text-accent">
            Research
          </a>{' '}
          for full sourcing.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card title="Project status">
          <Badge tone="simulated">Research / Prototype</Badge>
          <p className="mt-2 text-sm text-ink-dim dark:text-ink-dark-dim">
            Phase 1 (research) checkpointed. No historical market data acquired yet. No live or
            paper trading connected. Nothing here trades real funds.
          </p>
        </Card>
        <Card title="Confirmed facts">
          <p className="text-2xl font-semibold tabular">{confirmedFacts.length}</p>
          <p className="text-sm text-ink-dim dark:text-ink-dark-dim">from vendor technical docs</p>
        </Card>
        <Card title="Open unknowns">
          <p className="text-2xl font-semibold tabular">{unknowns.length}</p>
          <p className="text-sm text-ink-dim dark:text-ink-dark-dim">require hypothesis testing, not more search</p>
        </Card>
      </div>

      <Card title="Independent state machine">
        <StateMachineDiagram />
      </Card>

      <Card title="Baseline parameters (confirmed defaults)">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.keys(defaultParams) as (keyof typeof defaultParams)[]).map((k) => (
            <div key={k}>
              <p className="text-xs text-ink-dim dark:text-ink-dark-dim">{paramLabels[k]}</p>
              <p className="font-mono text-sm tabular">{defaultParams[k]}%</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
