'use client';

interface Props {
  topic: string;
}

export default function TopicBadge({
  topic,
}: Props) {
  return (
    <span
      className="
      rounded-full
      border
      border-[var(--clr-border)]
      bg-[var(--clr-accent)]/10
      px-3
      py-1
      text-sm
      text-[var(--clr-accent)]
    "
    >
      {topic}
    </span>
  );
}