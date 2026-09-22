import { useState } from 'react'
import { states, transitions } from '../../data/stateMachine'

const cycle = ['FLAT', 'TRACKING_DIP', 'LONG', 'TRACKING_PEAK']

export function StateMachineDiagram({ activeState }: { activeState?: string }) {
  const [selected, setSelected] = useState<string>(activeState ?? 'FLAT')
  const selectedDef = states.find((s) => s.id === selected)
  const outgoing = transitions.filter((t) => t.from === selected)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {cycle.map((id, i) => {
          const def = states.find((s) => s.id === id)!
          const isActive = id === selected
          const isLive = id === activeState
          return (
            <div key={id} className="flex items-center gap-2">
              <button
                onClick={() => setSelected(id)}
                className={`rounded-md border px-3 py-2 text-left text-xs font-medium transition-colors ${
                  isActive
                    ? 'border-accent bg-accent-soft text-accent'
                    : 'border-border text-ink-dim hover:border-accent/50 dark:border-border-dark dark:text-ink-dark-dim'
                } ${isLive ? 'ring-2 ring-accent ring-offset-2 ring-offset-paper dark:ring-offset-paper-dark' : ''}`}
              >
                {def.label}
              </button>
              {i < cycle.length - 1 && <span className="text-ink-dim dark:text-ink-dark-dim">→</span>}
            </div>
          )
        })}
        <span className="text-ink-dim dark:text-ink-dark-dim">↺</span>
        <button
          onClick={() => setSelected('ERROR')}
          className={`rounded-md border px-3 py-2 text-xs font-medium transition-colors ${
            selected === 'ERROR'
              ? 'border-simulated bg-simulated-soft text-simulated'
              : 'border-border text-ink-dim hover:border-simulated/50 dark:border-border-dark dark:text-ink-dark-dim'
          }`}
        >
          Safety Stop
        </button>
      </div>

      {selectedDef && (
        <div className="rounded-md border border-border bg-paper p-3 text-sm dark:border-border-dark dark:bg-paper-dark">
          <p className="mb-2 text-ink-dim dark:text-ink-dark-dim">{selectedDef.description}</p>
          {outgoing.length > 0 && (
            <ul className="space-y-1 font-mono text-xs">
              {outgoing.map((t, i) => (
                <li key={i} className="text-ink-dim dark:text-ink-dark-dim">
                  <span className="text-accent">{t.to}</span> if <span className="tabular">{t.condition}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
