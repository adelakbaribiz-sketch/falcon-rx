import { Card } from '../components/shared/Card'

const docs = [
  { path: 'README.md', desc: 'Project overview, status, install, and honest-status summary.' },
  { path: 'RESEARCH_STATUS.md', desc: 'Live phase tracker: completed / confirmed / inferred / unknown / assumed / blockers.' },
  { path: 'research/sources.md', desc: 'Every source consulted, with access dates and reliability notes.' },
  { path: 'research/confirmed_facts.md', desc: 'Facts sourced directly from vendor technical documentation.' },
  { path: 'research/inferred_hypotheses.md', desc: "This project's own hypotheses, not vendor-confirmed." },
  { path: 'research/unknowns.md', desc: 'Genuine open questions requiring hypothesis testing against market data.' },
  { path: 'docs/ARCHITECTURE.md', desc: 'System architecture and component responsibilities.' },
  { path: 'docs/STRATEGY_SPEC.md', desc: 'Formal strategy specification, state machine, and trigger math.' },
  { path: 'docs/SECURITY.md', desc: 'Security review and secret-handling policy.' },
  { path: 'docs/LIMITATIONS.md', desc: 'What this project does not do yet, stated plainly.' },
  { path: 'docs/ROADMAP.md', desc: 'Remaining phases and what unblocks each one.' },
]

export function Docs() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Documentation</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-dim dark:text-ink-dark-dim">
          This dashboard is one artifact of the project. The written documentation below is the
          source of truth — read it in the repository.
        </p>
      </div>
      <Card>
        <ul className="divide-y divide-border dark:divide-border-dark">
          {docs.map((d) => (
            <li key={d.path} className="flex flex-col gap-0.5 py-2.5 first:pt-0 last:pb-0">
              <code className="font-mono text-sm text-accent">{d.path}</code>
              <span className="text-xs text-ink-dim dark:text-ink-dark-dim">{d.desc}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
