'use client'

type Toast = { id: number; message: string; type: 'success' | 'error' }

type Props = {
  toasts: Toast[]
  removeToast?: (id: number) => void
}

export default function ToastContainer({ toasts, removeToast }: Props) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3">
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
          <span className="text-base">
            {t.type === 'success' ? '✓' : '⚠'}
          </span>

          <span className="flex-1">{t.message}</span>

          {removeToast && (
            <button
              onClick={() => removeToast(t.id)}
              className="text-white/70 hover:text-white text-sm"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  )
}