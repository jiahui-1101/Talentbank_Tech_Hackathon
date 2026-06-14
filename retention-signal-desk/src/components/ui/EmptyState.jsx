import { Inbox } from 'lucide-react'
import Button from './Button'

export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox size={48} className="text-[var(--color-text-tertiary)]" />
      <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
        {title}
      </h3>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
        {description}
      </p>
      {action ? (
        <Button className="mt-6" onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </div>
  )
}
