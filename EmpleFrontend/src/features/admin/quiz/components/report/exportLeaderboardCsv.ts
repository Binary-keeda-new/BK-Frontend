import type { QuizReport } from './quizReport.types';

export function exportLeaderboardCsv(report: QuizReport) {
  const header = ['Name', 'Email', 'Score'];

  const rows = report.leaderboard.map((student) => [
    student.name,
    student.email,
    String(student.score),
  ]);

  const escapeCell = (cell: string) => {
    if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
      return `"${cell.replace(/"/g, '""')}"`;
    }
    return cell;
  };

  const csvContent = [header, ...rows]
    .map((row) => row.map(escapeCell).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `quiz-${report.quizId}-leaderboard.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}