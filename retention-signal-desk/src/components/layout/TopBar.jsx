import { useEffect, useState } from 'react'
import Avatar from '../ui/Avatar'

export default function TopBar({ title, children }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="relative z-10 flex h-[76px] flex-shrink-0 items-center justify-between border-b border-black/[0.055] bg-[#f4f4ec]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-[180px] items-center gap-3">
        <img 
          src="/logo.svg" 
          alt="NexTalent Icon" 
          className="h-11 w-11 object-contain mix-blend-multiply" 
        />
        
        <div className="flex flex-col justify-center">
          <img 
            src="/wordmark.svg" 
            alt="NexTalent" 
            className="h-12 w-auto object-contain object-left mix-blend-multiply" 
          />
          <div className="-mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-black/35 leading-none pl-0.5">
            {title}
          </div>
        </div>
      </div>

      {children}

      <div className="flex min-w-[180px] items-center justify-end gap-3">
        <div className="hidden text-right lg:block">
          <div className="font-mono text-[10px] font-bold text-black/55">
            {time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} · {time.toLocaleTimeString('en-GB')}
          </div>
        </div>
        <div className="rounded-full border border-black/[0.07] bg-white p-1 shadow-[0_6px_18px_rgba(20,21,18,0.07)]">
          <Avatar name="HR Manager" size="sm" />
        </div>
      </div>
    </header>
  )
}