import { useState } from 'react'
import { Card } from '../components/shared/Card'
import { Badge } from '../components/shared/Badge'
import { confirmedFacts, inferredHypotheses, unknowns, type Finding } from '../data/researchFindings'

const tabs = [
  { id: 'confirmed', label: 'Confirmed', data: confirmedFacts, tone: 'confirmed' as const },
  { id: 'inferred', label: 'Inferred', data: inferredHypotheses, tone: 'inferred' as const },
  { id: 'unknown', label: 'Unknown', data: unknowns, tone: 'unknown' as const },
]

function FindingRow({ f, tone }: { f: Finding; tone: 'confirmed' | 'inferred' | 'unknown' }) {
  return (
    <li className="border-b border-border py-3 last:border-0 dark:border-border-dark">
      <div className="mb-1 flex items-start justify-between gap-2">
        <p className="text-sm">{f.claim}</p>
        <Badge tone={tone} />
      </div>
      <p className="text-xs text-ink-dim dark:text-ink-dark-dim">Source: {f.source}</p>
    </li>
  )
}

export function Research() {
  const [active, setActive] = useState('confirmed')
  const tab = tabs.find((t) => t.id === active)!

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Research findings</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-dim dark:text-ink-dark-dim">
          Transcribed from <code className="font-mono text-xs">/research/*.md</code>. Confidence
          labels follow this project's own rule: marketing claims are never promoted to technical
          facts, and absence of disclosure is recorded as an open unknown rather than guessed at.
        </p>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              active === t.id
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-border text-ink-dim hover:border-accent/50 dark:border-border-dark dark:text-ink-dark-dim'
            }`}
          >
            {t.label} ({t.data.length})
          </button>
        ))}
      </div>

      <Card>
        {tab.data.length === 0 ? (
          <p className="text-sm text-ink-dim dark:text-ink-dark-dim">Nothing recorded in this category yet.</p>
        ) : (
          <ul>
            {tab.data.map((f) => (
              <FindingRow key={f.id} f={f} tone={tab.tone} />
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
