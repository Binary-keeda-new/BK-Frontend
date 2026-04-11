'use client'

type Props = {
  index: number
  value: string
  isCorrect: boolean
  onChange: (val: string) => void
  onToggleCorrect: () => void
  onRemove: () => void
  canRemove: boolean
}

export default function OptionRow({
  index,
  value,
  isCorrect,
  onChange,
  onToggleCorrect,
  onRemove,
  canRemove,
}: Props) {
  const label = String.fromCharCode(65 + index)

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onToggleCorrect}
        title={isCorrect ? 'Mark incorrect' : 'Mark correct'}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all ${
          isCorrect
            ? 'border-green-500 bg-green-500 text-white'
            : 'border-white/20 bg-transparent text-white/50 hover:border-white/40'
        }`}
      >
        {label}
      </button>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Option ${label}`}
        className="flex-1 rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
      />

      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-white/30 transition hover:text-red-400"
          title="Remove option"
        >
          ✕
        </button>
      )}
    </div>
  )
}