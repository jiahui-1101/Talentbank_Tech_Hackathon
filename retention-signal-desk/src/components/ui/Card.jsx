import { cn } from '../../lib/cn'

export default function Card({
  children,
  className,
  onClick,
  hover = false,
  style,
}) {
  return (
    <div
      className={cn(
        'rounded-[30px] border border-black/[0.06] bg-white p-5 shadow-[0_12px_34px_rgba(25,26,22,0.055)] sm:p-6 lg:p-7',
        hover && 'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_22px_48px_rgba(25,26,22,0.11)] active:translate-y-0 active:scale-[0.99]',
        className,
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}
