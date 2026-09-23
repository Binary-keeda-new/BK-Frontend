import { ReactNode } from 'react';

type Props = {
  message: string | ReactNode;
};

export default function EmptyState({ message }: Props) {
  return (
    <div className="rounded-3xl  bg-[var(--surface)] p-8 text-center">
      <p className="text-sm font-medium text-[var(--muted2)]">
        {message}
      </p>
    </div>
  );
}
