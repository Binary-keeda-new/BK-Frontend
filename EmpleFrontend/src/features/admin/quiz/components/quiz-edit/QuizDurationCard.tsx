import { ThemeTokens } from "./quizEdit.types";
import QuizEditCard from "./QuizEditCard";
import QuizEditFieldLabel from "./QuizEditFieldLabel";
import QuizEditSectionTitle from "./QuizEditSectionTitle";

type Props = {
  hours: string;
  minutes: string;
  setHours: (value: string) => void;
  setMinutes: (value: string) => void;
  t: ThemeTokens;
};

export default function QuizDurationCard({
  hours,
  minutes,
  setHours,
  setMinutes,
  t,
}: Props) {
  return (
    <>
      <QuizEditSectionTitle sectionLabel={t.sectionLabel} divider={t.divider}>
        Duration
      </QuizEditSectionTitle>

      <QuizEditCard
        background={t.cardBg}
        borderColor={t.cardBorder}
        style={{ marginBottom: 32 }}
      >
        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
          {([
            ["Hours", hours, setHours, "0", "23", "hr"],
            ["Minutes", minutes, setMinutes, "0", "59", "min"],
          ] as const).map(([label, val, setter, mn, mx, unit]) => (
            <div key={label}>
              <QuizEditFieldLabel color={t.labelColor}>{label}</QuizEditFieldLabel>

              <div className="relative">
                <input
                  type="number"
                  min={mn}
                  max={mx}
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  className="qph w-full rounded-[10px] border px-4 py-3 pr-11 outline-none transition-all focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
                  style={{
                    background: t.inputBg,
                    borderColor: t.inputBorder,
                    color: t.inputText,
                  }}
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold"
                  style={{ color: t.labelColor }}
                >
                  {unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3.5 flex items-center gap-1.5 text-[13px]" style={{ color: t.subText }}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Total duration:
          <strong style={{ color: t.labelColor }}>
            {String(+hours).padStart(2, "0")}h {String(+minutes % 60).padStart(2, "0")}m
          </strong>
        </div>
      </QuizEditCard>
    </>
  );
}