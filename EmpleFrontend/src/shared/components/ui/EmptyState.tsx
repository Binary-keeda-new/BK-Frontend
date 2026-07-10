import React from "react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function EmptyState({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center w-full h-full min-h-[250px] rounded-[16px]"
      style={{
        padding: "clamp(24px, 5vw, 40px)",
        background: "var(--surface)",
        border: "1px dashed var(--border)",
      }}
    >
      {icon && (
        <div
          className="flex items-center justify-center rounded-full mb-4"
          style={{
            width: "56px",
            height: "56px",
            background: "var(--surface2)",
            color: "var(--muted)",
          }}
        >
          {icon}
        </div>
      )}
      
      <h3
        className="font-syne font-bold mb-2"
        style={{
          fontSize: "clamp(16px, 4vw, 20px)",
          color: "var(--text)",
        }}
      >
        {title}
      </h3>
      
      <p
        className="max-w-[400px] mb-6"
        style={{
          fontSize: "clamp(13px, 3vw, 14px)",
          color: "var(--muted2)",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {primaryAction && (
            primaryAction.href ? (
              <Link
                href={primaryAction.href}
                className="rounded-[20px] font-bold transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  padding: "10px 24px",
                  fontSize: "13px",
                  background: "var(--orange)",
                  color: "#fff",
                  boxShadow: "0 2px 10px rgba(241,90,34,0.35)",
                  textDecoration: "none"
                }}
              >
                {primaryAction.label}
              </Link>
            ) : (
              <button
                onClick={primaryAction.onClick}
                className="rounded-[20px] font-bold transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  padding: "10px 24px",
                  fontSize: "13px",
                  background: "var(--orange)",
                  color: "#fff",
                  boxShadow: "0 2px 10px rgba(241,90,34,0.35)",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {primaryAction.label}
              </button>
            )
          )}
          
          {secondaryAction && (
            secondaryAction.href ? (
              <Link
                href={secondaryAction.href}
                className="rounded-[20px] font-bold transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  padding: "10px 24px",
                  fontSize: "13px",
                  background: "var(--surface2)",
                  color: "var(--muted2)",
                  border: "1.5px solid var(--border)",
                  textDecoration: "none"
                }}
              >
                {secondaryAction.label}
              </Link>
            ) : (
              <button
                onClick={secondaryAction.onClick}
                className="rounded-[20px] font-bold transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  padding: "10px 24px",
                  fontSize: "13px",
                  background: "var(--surface2)",
                  color: "var(--muted2)",
                  border: "1.5px solid var(--border)",
                  cursor: "pointer"
                }}
              >
                {secondaryAction.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
