'use client'

type Toast = { id: number; message: string; type: 'success' | 'error' }

type Props = {
  toasts: Toast[]
}

export default function ToastContainer({ toasts }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-medium shadow-xl backdrop-blur-md
          transition-all duration-300 ease-in-out
          animate-in slide-in-from-bottom-3 fade-in
          hover:scale-[1.02]
          ${
            t.type === 'success'
              ? 'bg-emerald-600/90 text-white ring-1 ring-emerald-400/30'
              : 'bg-red-600/90 text-white ring-1 ring-red-400/30'
          }`}
        >
          {/* Icon */}
          <span className="text-base">
            {t.type === 'success' ? '✓' : '⚠'}
          </span>

          {/* Message */}
          <span className="flex-1">{t.message}</span>
        </div>
      ))}
    </div>
  )
}