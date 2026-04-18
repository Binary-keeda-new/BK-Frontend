import { ThemeMode, ThemeTokens } from "./quizEdit.types";
import ThemeToggle from "./themeToggle";

type Props = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  t: ThemeTokens;
  title?: string;
  category?: string;
  subcategory?: string;
};

export default function QuizEditHeader({
  theme,
  setTheme,
  t,
  title,
  category,
  subcategory,
}: Props) {
  const hasMeta = Boolean(category || subcategory);

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
          Edit{" "}
          <span className="text-[var(--clr-accent)]">
            {title?.trim() ? title : "Quiz"}
          </span>
        </h1>

        <p className="mt-1.5 text-[13px]" style={{ color: t.subText }}>
          Configure settings, manage questions, and review publishing options.
        </p>

        {hasMeta && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {category && (
              <span
                className="rounded-full border px-3 py-1 text-[11px] font-semibold"
                style={{
                  borderColor: t.cardBorder,
                  background: t.inputBg,
                  color: t.labelColor,
                }}
              >
                {category}
              </span>
            )}

            {subcategory && (
              <span
                className="rounded-full border px-3 py-1 text-[11px] font-semibold"
                style={{
                  borderColor: t.cardBorder,
                  background: t.inputBg,
                  color: t.labelColor,
                }}
              >
                {subcategory}
              </span>
            )}
          </div>
        )}
      </div>

      <ThemeToggle theme={theme} setTheme={setTheme} t={t} />
    </div>
  );
}