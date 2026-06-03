import React from "react";

type QuizEditCardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  background: string;
  borderColor: string;
};

export default function QuizEditCard({
  children,
  style,
  className = "",
  background,
  borderColor,
}: QuizEditCardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 transition-colors duration-300 ${className}`}
      style={{
        background,
        borderColor,
        ...style,
      }}
    >
      {children}
    </div>
  );
}