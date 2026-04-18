import { ThemeMode, ThemeTokens } from "./quizEdit.types";

type Props = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  t: ThemeTokens;
};

export default function ThemeToggle({ theme, setTheme, t }: Props) {
  return (
    <div
      className="flex flex-shrink-0 items-center rounded-xl border p-1 transition-colors duration-300"
      style={{
        background: t.toggleBg,
        borderColor: t.toggleBorder,
      }}
    >
      {(["dark", "light"] as const).map((mode) => (
        <button
          key={mode}
          onClick={() => setTheme(mode)}
          className="flex items-center gap-[5px] rounded-[9px] px-[14px] py-[7px] text-xs font-semibold transition-all duration-300"
          style={{
            background: theme === mode ? t.toggleActiveBg : "transparent",
            color: theme === mode ? t.toggleActiveText : t.toggleInactiveText,
          }}
        >
          {mode === "dark" ? (
            <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          ) : (
            <svg
              width="11"
              height="11"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  );
}