'use client';

interface Props {
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export default function DifficultyBadge({
  difficulty,
}: Props) {
  const styles = {
    Easy: 'bg-green-500/15 text-green-500',

    Medium:
      'bg-yellow-500/15 text-yellow-500',

    Hard: 'bg-red-500/15 text-red-500',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}