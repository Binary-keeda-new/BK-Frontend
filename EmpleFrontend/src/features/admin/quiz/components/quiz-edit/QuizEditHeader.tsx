import { ThemeMode, ThemeTokens } from "./quizEdit.types";
import ThemeToggle from "./themeToggle";

type Props = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  t: ThemeTokens;
};

export default function QuizEditHeader({ theme, setTheme, t }: Props) {
  return (
    <div className="mb-9 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p
          className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]"
          style={{ color: t.subText }}
        >
          Admin Panel
        </p>

        <h1
          className="text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold leading-[1.15]"
          style={{
            fontFamily: "'Nunito',sans-serif",
            color: t.headingColor,
          }}
        >
          Edit <span className="text-[var(--clr-accent)]">Quiz</span>
        </h1>

        <p className="mt-1.5 text-[13px]" style={{ color: t.subText }}>
          Configure settings, security rules and manage questions below.
        </p>
      </div>

      <ThemeToggle theme={theme} setTheme={setTheme} t={t} />
    </div>
  );
}