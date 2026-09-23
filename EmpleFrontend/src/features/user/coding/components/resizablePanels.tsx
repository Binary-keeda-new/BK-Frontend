'use client';

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function ResizablePanels({
  left,
  right,
}: Props) {
  return (
    <div className="flex h-full">

      <div className="w-[40%] border-r border-[var(--clr-border)]">
        {left}
      </div>

      <div className="flex-1">
        {right}
      </div>

    </div>
  );
}