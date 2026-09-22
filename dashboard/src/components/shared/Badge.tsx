import type { ReactNode } from 'react'

type BadgeTone = 'confirmed' | 'inferred' | 'unknown' | 'simulated' | 'accent'

const toneClasses: Record<BadgeTone, string> = {
  confirmed: 'bg-confirmed-soft text-confirmed border-confirmed/30',
  inferred: 'bg-inferred-soft text-inferred border-inferred/30',
  unknown: 'bg-unknown-soft text-unknown border-unknown/30',
  simulated: 'bg-simulated-soft text-simulated border-simulated/30',
  accent: 'bg-accent-soft text-accent border-accent/30',
}

const toneLabel: Record<BadgeTone, string> = {
  confirmed: 'Confirmed',
  inferred: 'Inferred',
  unknown: 'Unknown',
  simulated: 'Simulated',
  accent: '',
}

export function Badge({ tone, children }: { tone: BadgeTone; children?: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase ${toneClasses[tone]}`}
    >
      {children ?? toneLabel[tone]}
    </span>
  )
}
