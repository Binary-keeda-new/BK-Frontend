import { ChangeEvent } from "react";
import { QUIZ_CATEGORIES } from "@/shared/constants/quizCategories";
import { ThemeTokens } from "./quizEdit.types";

type Props = {
  t: ThemeTokens;
  title: string;
  description: string;
  category: keyof typeof QUIZ_CATEGORIES | "";
  subcategory: string;
  marks: string;
  numberOfQuestions: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onCategoryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSave: () => void;
  saving?: boolean;
};

export default function QuizEditHeader({
  t,
  title,
  description,
  category,
  subcategory,
  marks,
  numberOfQuestions,
  onChange,
  onCategoryChange,
  onSave,
  saving = false,
}: Props) {
  return (
    <div
      className="mb-9 rounded-[24px] border p-5 sm:p-6"
      style={{ borderColor: t.cardBorder, background: t.cardBg }}
    >
      <p
        className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: t.subText }}
      >
        Edit Quiz
      </p>

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className="break-words text-[clamp(1.6rem,4vw,2.3rem)] font-extrabold leading-[1.1]"
            style={{
              fontFamily: "'Nunito',sans-serif",
              color: t.headingColor,
            }}
          >
            Quiz Details
          </h1>
        </div>
      </div>

      <div className="grid gap-5">
        <div>
          <label
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: t.labelColor }}
          >
            Title
          </label>
          <input
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Enter quiz title"
            className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
            style={{
              background: t.inputBg,
              color: t.inputText,
              borderColor: t.inputBorder,
            }}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: t.labelColor }}
          >
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            value={description}
            onChange={onChange}
            placeholder="Enter quiz description"
            className="w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
            style={{
              background: t.inputBg,
              color: t.inputText,
              borderColor: t.inputBorder,
            }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: t.labelColor }}
            >
              Category
            </label>
            <select
              name="category"
              value={category}
              onChange={onCategoryChange}
              className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
              style={{
                background: t.inputBg,
                color: t.inputText,
                borderColor: t.inputBorder,
              }}
            >
              <option value="">Select category</option>
              {Object.keys(QUIZ_CATEGORIES).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: t.labelColor }}
            >
              Subcategory
            </label>
            <select
              name="subcategory"
              value={subcategory}
              onChange={onChange}
              disabled={!category}
              className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
              style={{
                background: t.inputBg,
                color: t.inputText,
                borderColor: t.inputBorder,
              }}
            >
              <option value="">Select subcategory</option>
              {category &&
                QUIZ_CATEGORIES[category].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: t.labelColor }}
            >
              Total Marks
            </label>
            <input
              name="marks"
              type="number"
              value={marks}
              onChange={onChange}
              placeholder="100"
              className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
              style={{
                background: t.inputBg,
                color: t.inputText,
                borderColor: t.inputBorder,
              }}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: t.labelColor }}
            >
              Number of Questions
            </label>
            {/* <input
              name="numberOfQuestions"
              type="number"
              value={numberOfQuestions}
              onChange={onChange}
              placeholder="10"
              className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[var(--clr-accent)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
              style={{
                background: t.inputBg,
                color: t.inputText,
                borderColor: t.inputBorder,
              }}
            /> */}
            <div
  className="w-full rounded-2xl border px-4 py-3 text-sm"
  style={{
    background: t.inputBg,
    color: "grey",
    borderColor: t.inputBorder,
  }}
>
  {numberOfQuestions}
</div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="rounded-2xl bg-[var(--clr-accent)] px-5 py-3 text-sm font-semibold text-white transition disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Quiz Details"}
          </button>
        </div>
      </div>
    </div>
  );
}