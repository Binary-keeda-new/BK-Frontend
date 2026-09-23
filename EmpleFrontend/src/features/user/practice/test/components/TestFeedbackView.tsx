'use client';

import { useState } from 'react';

type Props = {
  countdown?: number | null;
  onBack?: () => void;
  onSubmit: (payload: {
    rating: number;
    comment: string;
  }) => Promise<void>;
};

export default function TestFeedbackView({
  countdown,
  onBack,
  onSubmit,
}: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      setError('Please select a rating between 1 and 5 stars.');
      return;
    }
    if (comment.length > 1000) {
      setError('Comment cannot exceed 1000 characters.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      await onSubmit({ rating, comment });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[760px] p-6">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange)]">
            FEEDBACK
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[var(--text)]">
            How was your experience?
          </h1>

          <p className="mt-3 text-sm text-[var(--muted2)]">
            Please share your feedback about the test platform and content.
          </p>
        </div>

        {success ? (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
            <h2 className="text-xl font-bold text-emerald-500">Feedback Submitted</h2>
            <p className="mt-2 text-sm text-emerald-600/80">Thank you! Your feedback has been recorded.</p>
            
            {countdown !== null && countdown !== undefined && (
              <p className="mt-4 text-center text-sm font-semibold text-[var(--orange)]">
                Redirecting to dashboard in {countdown}...
              </p>
            )}
            
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 rounded-xl border border-emerald-500/50 bg-transparent px-4 py-2 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-500/10"
            >
              Update Feedback
            </button>
          </div>
        ) : (
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
            
            <div className="mt-8">
              <label htmlFor="feedback-comment" className="mb-2 block text-sm font-semibold text-[var(--text)]">
                Additional Comments (Optional)
              </label>
              <textarea
                id="feedback-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={1000}
                rows={4}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-sm text-[var(--text)] placeholder-[var(--muted2)] focus:border-[var(--orange)] focus:outline-none focus:ring-1 focus:ring-[var(--orange)]"
                placeholder="Tell us what you liked or what could be improved..."
              />
              <div className="mt-2 text-right text-xs text-[var(--muted2)]">
                {comment.length} / 1000
              </div>
            </div>

            {error && (
              <p className="mt-4 text-center text-sm text-red-500">{error}</p>
            )}

            <div className="mt-8 flex justify-end gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  disabled={isSubmitting}
                  className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted2)] disabled:opacity-50"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || rating === 0}
                className="rounded-xl bg-[var(--orange)] px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}