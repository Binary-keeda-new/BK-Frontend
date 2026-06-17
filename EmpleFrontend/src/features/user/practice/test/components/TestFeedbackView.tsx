'use client';

import { useState } from 'react';

type Props = {
  onBack?: () => void;
  onSubmit: (payload: {
    rating: number;
    comment: string;
  }) => void;
};

export default function TestFeedbackView({
  onBack,
  onSubmit,
}: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="mx-auto w-full max-w-[760px] p-6">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange)]">
            TEST COMPLETED
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[var(--text)]">
            Thank You
          </h1>

          <p className="mt-3 text-sm text-[var(--muted2)]">
            You have completed all sections of the test.
            Please share your feedback before viewing results.
          </p>
        </div>

        <div className="mt-8">
          <p className="mb-4 text-center text-sm font-semibold text-[var(--text)]">
            Rate your experience
          </p>

          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-4xl transition hover:scale-110"
              >
                {star <= rating ? '⭐' : '☆'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-semibold text-[var(--text)]">
            Additional Feedback (Optional)
          </label>

          <textarea
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm text-[var(--text)] outline-none"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted2)]"
            >
              Back
            </button>
          )}

          <button
            onClick={() =>
              onSubmit({
                rating,
                comment,
              })
            }
            className="rounded-xl bg-[var(--orange)] px-5 py-3 text-sm font-bold text-white"
          >
            Submit Feedback →
          </button>
        </div>
      </div>
    </div>
  );
}