import type { QuestionMode } from './testAttempt.types';

export function getQuestionMode(questionType?: string): QuestionMode {
  if (questionType === 'MCQ') return 'mcq';
  if (questionType === 'MSQ') return 'multi';
  return 'nat';
}

export function formatTimeLeft(timeLeftMs: number | null): string | null {
  if (timeLeftMs === null) return null;

  const totalSeconds = Math.floor(timeLeftMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
}
