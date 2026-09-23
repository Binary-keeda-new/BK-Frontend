export const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
};

export const formatPercentage = (value: number) => {
  return `${Math.round(value)}%`;
};

export const formatReportDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleString();
};

export type McqReviewItem = {
  questionId: string;
  question: string;
  difficulty: string;
  topic: string;
  selectedOptions: string[];
  isCorrect: boolean;
  marks: number;
};

export type AggregationResult = {
  name: string;
  total: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number;
};

export const aggregateByField = (
  items: McqReviewItem[],
  field: 'topic' | 'difficulty'
): AggregationResult[] => {
  const map = new Map<string, AggregationResult>();

  items.forEach((item) => {
    const key = item[field]?.trim() || 'Unspecified';
    const isAttempted = item.selectedOptions && item.selectedOptions.length > 0;
    const isSkipped = !isAttempted;
    const isCorrect = item.isCorrect;
    const isIncorrect = isAttempted && !isCorrect;

    if (!map.has(key)) {
      map.set(key, {
        name: key,
        total: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        skipped: 0,
        accuracy: 0,
      });
    }

    const agg = map.get(key)!;
    agg.total += 1;
    if (isAttempted) agg.attempted += 1;
    if (isCorrect) agg.correct += 1;
    if (isIncorrect) agg.incorrect += 1;
    if (isSkipped) agg.skipped += 1;
    agg.accuracy = agg.attempted > 0 ? (agg.correct / agg.attempted) * 100 : 0;
  });

  return Array.from(map.values());
};

export const calculateRate = (numerator: number, denominator: number): number => {
  if (!denominator || denominator === 0) return 0;
  return (numerator / denominator) * 100;
};

export type LanguageAggregation = {
  language: string;
  count: number;
};

export const aggregateCodingLanguages = (
  codingReview: Array<{ language: string }>
): LanguageAggregation[] => {
  const map = new Map<string, number>();

  codingReview.forEach((item) => {
    const lang = item.language?.trim() || 'Unknown';
    map.set(lang, (map.get(lang) || 0) + 1);
  });

  return Array.from(map.entries())
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);
};
