import { useEffect, useState } from 'react'
import Avatar from '../ui/Avatar'

export default function TopBar({ title }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="relative z-10 flex h-[76px] flex-shrink-0 items-center justify-center border-b border-[var(--color-border)] bg-white shadow-[0_1px_0_var(--color-border),0_4px_20px_rgba(13,17,23,0.05)]">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-hover)] to-transparent" />

      <div className="absolute left-6 hidden items-center md:flex">
        <div className="rounded-[var(--radius-sm)] border border-blue-200 bg-[var(--color-accent-light)] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
          v2.4
        </div>
      </div>

      <div className="flex min-w-0 items-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] border border-blue-200 bg-[var(--color-accent-light)] font-black text-[var(--color-accent)]">
          R
        </div>
        <h1 className="ml-3 bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-accent)] bg-clip-text text-lg font-black tracking-[0.08em] text-transparent">
          RSD
        </h1>
        <span className="mx-3 text-sm font-light text-[var(--color-border-strong)]">|</span>
        <div className="hidden font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)] sm:block">
          {title}
        </div>
      </div>

      <div className="absolute right-6 flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-risk-low)] sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-risk-low)] shadow-[0_0_6px_rgba(5,150,105,0.6)]" />
          Live
        </div>
        <div className="hidden font-mono text-xs text-[var(--color-text-secondary)] lg:block">
          {time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} · {time.toLocaleTimeString('en-GB')}
        </div>
        <div className="rounded-full border border-[var(--color-border-subtle)] bg-white p-1 shadow-[var(--shadow-card)]">
          <Avatar name="HR Manager" size="sm" />
        </div>
      </div>
    </header>
  )
}
