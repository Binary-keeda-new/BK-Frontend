'use client'

type Toast = { id: number; message: string; type: 'success' | 'error' }

type Props = {
  toasts: Toast[]
}

export default function ToastContainer({ toasts }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`rounded-2xl px-5 py-3 text-sm font-medium shadow-lg transition-all ${
            t.type === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}