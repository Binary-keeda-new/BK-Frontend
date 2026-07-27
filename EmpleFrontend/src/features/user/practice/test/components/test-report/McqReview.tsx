'use client';

import { useState, useMemo } from 'react';
import { ListChecks } from 'lucide-react';
import { UserTestReport } from '../../types/test.types';
import McqReviewFilters, { McqFilterType } from './McqReviewFilters';
import McqReviewCard from './McqReviewCard';
import ReportSection from './shared/ReportSection';
import EmptyState from './shared/EmptyState';

type Props = {
  report: UserTestReport;
};

export default function McqReview({ report }: Props) {
  const [filter, setFilter] = useState<McqFilterType>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { mcqReview, summary } = report;

  // Empty state handling
  if ((!mcqReview || mcqReview.length === 0) && summary.totalMcqQuestions === 0) {
    return null; // Will not render if no MCQ questions exist at all
  }

  if (!mcqReview || mcqReview.length === 0) {
    return (
      <ReportSection title="MCQ Detailed Review" icon={ListChecks}>
        <EmptyState message="No MCQ review data available." />
      </ReportSection>
    );
  }

  // Calculate counts for filters
  const counts = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    mcqReview.forEach((item) => {
      const isAttempted = item.selectedOptions && item.selectedOptions.length > 0;
      if (!isAttempted) {
        skipped++;
      } else if (item.isCorrect) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return {
      all: mcqReview.length,
      correct,
      incorrect,
      skipped,
    };
  }, [mcqReview]);

  // Apply Filter
  const filteredReview = useMemo(() => {
    return mcqReview.filter((item) => {
      if (filter === 'all') return true;
      const isAttempted = item.selectedOptions && item.selectedOptions.length > 0;
      
      if (filter === 'skipped') return !isAttempted;
      if (filter === 'correct') return isAttempted && item.isCorrect;
      if (filter === 'incorrect') return isAttempted && !item.isCorrect;
      return true;
    });
  }, [mcqReview, filter]);

  const handleToggle = (questionId: string) => {
    setExpandedId(prev => (prev === questionId ? null : questionId));
  };

  return (
    <ReportSection title="MCQ Detailed Review" icon={ListChecks}>
      <McqReviewFilters 
        currentFilter={filter} 
        onFilterChange={(f) => {
          setFilter(f);
          setExpandedId(null); // Close accordion on filter change
        }} 
        counts={counts} 
      />

      {filteredReview.length > 0 ? (
        <div className="space-y-4">
          {filteredReview.map((item, index) => {
            // Find original index to maintain correct numbering even when filtered
            const originalIndex = mcqReview.findIndex(q => q.questionId === item.questionId);
            
            return (
              <McqReviewCard 
                key={item.questionId}
                item={item}
                index={originalIndex !== -1 ? originalIndex : index}
                isExpanded={expandedId === item.questionId}
                onToggle={() => handleToggle(item.questionId)}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState message={`No questions match the "${filter}" filter.`} />
      )}
    </ReportSection>
  );
}
