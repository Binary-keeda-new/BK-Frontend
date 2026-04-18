import { ThemeTokens } from "./quizEdit.types";

type Props = {
  t: ThemeTokens;
};

export default function QuizPublishBar({ t }: Props) {
  return (
    <div
      className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-8"
      style={{ borderColor: t.divider }}
    >
      <div>
        <p className="text-[13px] font-semibold" style={{ color: t.headingColor }}>
          Ready to go live?
        </p>
        <p className="mt-[3px] text-xs" style={{ color: t.subText }}>
          Review all settings before publishing this quiz.
        </p>
      </div>

      <div className="flex gap-2.5">
        <button className="flex items-center gap-2 rounded-xl bg-[var(--clr-accent)] px-7 py-[11px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(241,90,34,0.25)] active:translate-y-0">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
            <path
              d="M5 12l5 5L20 7"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Save & Publish
        </button>
      </div>
    </div>
  );
}